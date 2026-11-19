// Remove import-only memos from region JSON notes (B15).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.resolve(root, "..", "web", "public", "regions");
const INTERNAL =
  /^(Eat my Seoul|RIBBON_|Neon Vetted|MATJIDO|Sikr|내부|import|scrape)/i;

const now = new Date().toISOString();
let cleared = 0;
let trimmed = 0;

for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json") && !f.includes(".summary"))) {
  const fp = path.join(outDir, file);
  const j = JSON.parse(readFileSync(fp, "utf8"));
  let changed = false;
  for (const r of j.restaurants ?? []) {
    if (!r.notes) continue;
    const parts = String(r.notes)
      .split(/\s+·\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((p) => !INTERNAL.test(p));
    if (parts.length === 0) {
      delete r.notes;
      cleared++;
      changed = true;
    } else if (parts.join(" · ") !== r.notes) {
      r.notes = parts.join(" · ");
      trimmed++;
      changed = true;
    }
  }
  if (changed) {
    j.updatedAt = now;
    writeFileSync(fp, `${JSON.stringify(j)}\n`);
  }
}

console.log(`cleared notes ${cleared}, trimmed ${trimmed}`);
