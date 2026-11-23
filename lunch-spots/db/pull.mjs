// db:pull — write current D1/local DB out to JSON for bot/scripts.
// Default writes to .cache/pull-out/web. Pass --write-web to overwrite repo web/.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";
import { exportCatalog } from "./export-catalog.mjs";
import { openDb } from "./client.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");
const writeWeb = process.argv.includes("--write-web");
const outRoot = writeWeb
  ? webDir
  : path.join(root, ".cache", "pull-out", "web");
if (!writeWeb) mkdirSync(outRoot, { recursive: true });

const backend = process.env.LUNCH_RADAR_D1_BACKEND || "local";
const db = openDb(backend);
const meta = Object.fromEntries(
  db.query(`SELECT key, value FROM meta`).results.map((r) => [r.key, r.value]),
);
db.close?.();

if (!meta.last_message_ts) {
  console.error(
    JSON.stringify({
      error: "missing_meta",
      message: "meta.last_message_ts is required before collector runs. Re-import or set meta.",
    }),
  );
  process.exit(2);
}
if (!meta.office || meta.office === "null") {
  console.error(
    JSON.stringify({
      error: "missing_office",
      message: "meta.office blob is required for map center.",
    }),
  );
  process.exit(2);
}

const result = exportCatalog({ backend, outRoot });
console.log(
  JSON.stringify(
    { ok: true, pulled: result, last_message_ts: meta.last_message_ts, writeWeb },
    null,
    2,
  ),
);
