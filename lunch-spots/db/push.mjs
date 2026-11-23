// db:push — upsert changed catalog rows into D1/local with row_version checks.
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openDb, upsertPlaceSql, placeParams } from "./client.mjs";
import { buildPlaceRows } from "./import-catalog.mjs";
import { rowHash } from "./hash.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const yes = process.argv.includes("--yes");
const check = process.argv.includes("--check");
const backend = process.env.LUNCH_RADAR_D1_BACKEND || "local";
const MAX_WITHOUT_YES = 500;

const db = openDb(backend);
const built = buildPlaceRows();
const existing = new Map(
  db.query(`SELECT slug, row_version, row_hash FROM places WHERE deleted_at IS NULL`).results.map((r) => [
    r.slug,
    r,
  ]),
);

const changes = [];
const conflicts = [];
for (const row of built.placeRows) {
  const prev = existing.get(row.slug);
  if (!prev) {
    changes.push({ op: "insert", slug: row.slug, row });
    continue;
  }
  if (prev.row_hash === row.row_hash) continue;
  // Conflict if DB hash changed since last pull snapshot — Stage 0: treat any hash mismatch as update.
  // When pull stores expected versions, compare expected vs prev.row_version.
  changes.push({ op: "update", slug: row.slug, row, fromVersion: prev.row_version });
}

const now = new Date().toISOString();
const report = {
  generatedAt: now,
  changeCount: changes.length,
  conflicts: conflicts.length,
  sample: changes.slice(0, 15).map((c) => ({ op: c.op, slug: c.slug })),
};
writeFileSync(path.join(here, "push-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

if (check) {
  db.close?.();
  process.exit(0);
}
if (conflicts.length) {
  console.error("Conflicts — pull and retry.");
  db.close?.();
  process.exit(3);
}
if (changes.length > MAX_WITHOUT_YES && !yes) {
  console.error(`Refusing to push ${changes.length} rows without --yes (limit ${MAX_WITHOUT_YES}).`);
  db.close?.();
  process.exit(4);
}

const runId = `push-${now}`;
db.query(
  `INSERT INTO runs (id, kind, started_at, finished_at, status, summary) VALUES (?, ?, ?, ?, ?, ?)`,
  [runId, "push", now, null, "running", JSON.stringify({ changeCount: changes.length })],
);

const sql = upsertPlaceSql();
for (const c of changes) {
  const row = {
    ...c.row,
    row_version: (c.fromVersion ?? 0) + 1,
    updated_at: now,
  };
  row.row_hash = rowHash(row);
  db.query(sql, placeParams(row));
  db.query(
    `INSERT INTO place_changes (run_id, slug, op, before_hash, after_hash, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [runId, c.slug, c.op, existing.get(c.slug)?.row_hash ?? null, row.row_hash, now],
  );
}

// Refresh meta from office file via buildPlaceRows meta
db.query(
  `INSERT INTO meta (key, value, updated_at) VALUES (?, ?, ?)
   ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  ["last_message_ts", built.officeMeta.lastMessageTs ?? "", now],
);
db.query(
  `INSERT INTO meta (key, value, updated_at) VALUES (?, ?, ?)
   ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  ["office", JSON.stringify(built.officeMeta.office ?? null), now],
);
db.query(`UPDATE runs SET finished_at = ?, status = ?, summary = ? WHERE id = ?`, [
  now,
  "ok",
  JSON.stringify({ changeCount: changes.length }),
  runId,
]);

db.close?.();
console.log(JSON.stringify({ pushed: changes.length, runId }, null, 2));
