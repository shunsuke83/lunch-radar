// Run --fix-curated in batches until the checkpoint covers all curated places.
import { spawn } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const checkpointFile = path.join(here, "matzido-geo-checkpoint.json");
const LIMIT = 150;
const PAUSE_MS = 45_000;

function curatedKeys() {
  const keys = [];
  for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json") && !n.includes(".summary"))) {
    const id = f.replace(/\.json$/, "");
    const j = JSON.parse(readFileSync(path.join(regionsDir, f), "utf8"));
    for (const r of j.restaurants ?? []) {
      if (r.curated?.by === "naver-matzido-2026" && /^naver-\d+$/.test(r.slug)) {
        keys.push(`${id}/${r.slug}`);
      }
    }
  }
  return keys;
}

function remaining() {
  const done = existsSync(checkpointFile)
    ? Object.keys(JSON.parse(readFileSync(checkpointFile, "utf8")).done ?? {})
    : [];
  const doneSet = new Set(done);
  return curatedKeys().filter((k) => !doneSet.has(k)).length;
}

function runBatch() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [path.join(here, "fix-matzido-naver-geo.mjs"), "--fix-curated", `--limit=${LIMIT}`],
      { cwd: path.resolve(root, ".."), stdio: "inherit" },
    );
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let left = remaining();
console.log(JSON.stringify({ startRemaining: left }, null, 2));
while (left > 0) {
  console.log(`batch start remaining=${left}`);
  await runBatch();
  left = remaining();
  console.log(`batch done remaining=${left}`);
  if (left > 0) {
    console.log(`pause ${PAUSE_MS / 1000}s`);
    await sleep(PAUSE_MS);
  }
}
console.log(JSON.stringify({ finished: true, remaining: left }, null, 2));
