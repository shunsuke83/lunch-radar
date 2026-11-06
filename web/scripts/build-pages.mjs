// Static export for GitHub Pages. Route handlers (src/app/api) cannot be
// exported, so they are moved aside for the duration of the build.
import { spawnSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const apiDir = path.join(root, "src", "app", "api");
const parkedDir = path.join(root, ".api-parked");

const parked = existsSync(apiDir);
if (parked) renameSync(apiDir, parkedDir);

let status = 1;
try {
  const result = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, STATIC_EXPORT: "true" },
  });
  status = result.status ?? 1;
} finally {
  if (parked) renameSync(parkedDir, apiDir);
}

process.exit(status);
