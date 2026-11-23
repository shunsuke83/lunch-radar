import { readFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { PLACE_COLUMNS } from "./map.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const migrationSql = readFileSync(path.join(here, "migrations", "0001_init.sql"), "utf8");

export function loadEnv() {
  const envPath = path.join(root, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!(k in process.env)) process.env[k] = v;
  }
}

loadEnv();

export function defaultLocalDbPath() {
  const dir = path.join(root, ".cache");
  mkdirSync(dir, { recursive: true });
  return path.join(dir, "lunch-radar.d1.sqlite");
}

function splitStatements(sql) {
  const noLineComments = sql
    .split(/\r?\n/)
    .map((line) => {
      const i = line.indexOf("--");
      return i >= 0 ? line.slice(0, i) : line;
    })
    .join("\n");
  return noLineComments
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Local SQLite that mirrors the D1 schema (Stage 0 / offline / CI without CF). */
export function openLocal(dbPath = process.env.LUNCH_RADAR_D1_LOCAL || defaultLocalDbPath()) {
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA journal_mode = WAL;");
  for (const stmt of splitStatements(migrationSql)) {
    db.exec(`${stmt};`);
  }
  return {
    kind: "local",
    path: dbPath,
    raw: db,
    exec(sql) {
      db.exec(sql);
    },
    query(sql, params = []) {
      const stmt = db.prepare(sql);
      if (/^\s*SELECT/i.test(sql) || /^\s*WITH/i.test(sql) || /^\s*PRAGMA/i.test(sql)) {
        return { results: stmt.all(...params) };
      }
      stmt.run(...params);
      return { results: [] };
    },
    batch(statements) {
      const tx = db.prepare("BEGIN");
      const commit = db.prepare("COMMIT");
      const rollback = db.prepare("ROLLBACK");
      tx.run();
      try {
        for (const { sql, params = [] } of statements) {
          db.prepare(sql).run(...params);
        }
        commit.run();
      } catch (e) {
        rollback.run();
        throw e;
      }
      return { results: [] };
    },
    close() {
      db.close();
    },
  };
}

/**
 * Cloudflare D1 HTTP API (account token).
 * Requires CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID.
 */
export function openCloudflare() {
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID?.trim();
  if (!token || !accountId || !databaseId) {
    throw new Error(
      "Cloudflare D1 needs CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID",
    );
  }
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  async function runQuery(sql, params = []) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    });
    const body = await res.json();
    if (!res.ok || body.success === false) {
      const msg = body?.errors?.[0]?.message || JSON.stringify(body).slice(0, 200);
      throw new Error(`D1 query failed: ${msg}`);
    }
    const first = body.result?.[0];
    return { results: first?.results ?? [], meta: first?.meta };
  }

  return {
    kind: "cloudflare",
    async migrate() {
      for (const stmt of splitStatements(migrationSql)) {
        await runQuery(`${stmt};`);
      }
    },
    async query(sql, params = []) {
      return runQuery(sql, params);
    },
    async batch(statements) {
      // D1 HTTP accepts one SQL string with multiple statements in some cases;
      // safer: sequential queries in one logical batch.
      for (const { sql, params = [] } of statements) {
        await runQuery(sql, params);
      }
      return { results: [] };
    },
    close() {},
  };
}

export function openDb(prefer = process.env.LUNCH_RADAR_D1_BACKEND || "auto") {
  if (prefer === "cloudflare" || (prefer === "auto" && process.env.CLOUDFLARE_D1_DATABASE_ID)) {
    try {
      return openCloudflare();
    } catch (e) {
      if (prefer === "cloudflare") throw e;
    }
  }
  return openLocal();
}

export function insertPlaceSql() {
  const cols = PLACE_COLUMNS.join(", ");
  const placeholders = PLACE_COLUMNS.map(() => "?").join(", ");
  return `INSERT INTO places (${cols}) VALUES (${placeholders})`;
}

export function upsertPlaceSql() {
  const cols = PLACE_COLUMNS.filter((c) => c !== "slug");
  const sets = cols.map((c) => `${c} = excluded.${c}`).join(", ");
  return `${insertPlaceSql()} ON CONFLICT(slug) DO UPDATE SET ${sets}`;
}

export function placeParams(row) {
  return PLACE_COLUMNS.map((c) => row[c] ?? null);
}

/** Insert many rows via a JSON payload + json_each (D1 Stage 0 proof pattern). */
export function insertViaJsonEachSql() {
  const cols = PLACE_COLUMNS.join(", ");
  const selects = PLACE_COLUMNS.map((c) => {
    if (["in_office", "in_region", "walk_from_map", "mention_count", "row_version"].includes(c)) {
      return `CAST(json_extract(value, '$.${c}') AS INTEGER)`;
    }
    if (["lat", "lng", "naver_score", "rating_score", "walk_meters", "walk_minutes"].includes(c)) {
      return `CAST(json_extract(value, '$.${c}') AS REAL)`;
    }
    if (["naver_reviews", "rating_count"].includes(c)) {
      return `CAST(json_extract(value, '$.${c}') AS INTEGER)`;
    }
    return `json_extract(value, '$.${c}')`;
  }).join(",\n    ");
  return `INSERT INTO places (${cols})
SELECT
    ${selects}
FROM json_each(?)`;
}
