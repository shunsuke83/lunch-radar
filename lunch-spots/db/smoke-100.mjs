// Stage 0 gate: insert 100 rows via json_each (D1 write pattern).
import { unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openLocal, insertViaJsonEachSql, defaultLocalDbPath } from "./client.mjs";
import { buildPlaceRows } from "./import-catalog.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

const dbPath = path.join(path.dirname(defaultLocalDbPath()), "smoke-100.sqlite");
try {
  unlinkSync(dbPath);
} catch {
  /* fresh */
}

const db = openLocal(dbPath);
db.query("DELETE FROM places");

const { placeRows } = buildPlaceRows();
const sample = placeRows.slice(0, 100);
const payload = JSON.stringify(sample);
const sql = insertViaJsonEachSql();

const t0 = Date.now();
db.query(sql, [payload]);
const ms = Date.now() - t0;
const n = db.query(`SELECT COUNT(*) AS n FROM places`).results[0].n;
const one = db.query(`SELECT slug, name, row_hash FROM places LIMIT 1`).results[0];

const report = {
  generatedAt: new Date().toISOString(),
  pattern: "json_each INSERT",
  requested: 100,
  inserted: n,
  elapsedMs: ms,
  dbPath,
  sample: one,
  ok: n === 100,
};
writeFileSync(path.join(here, "smoke-100-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
db.close();
if (!report.ok) process.exit(1);
