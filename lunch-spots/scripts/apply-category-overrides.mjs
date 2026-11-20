// Apply per-place categories from category-overrides.json.
// Touches only `category` (and each changed file's top-level `updatedAt`); every other field stays as it is,
// so it is safe to run on top of whatever the bot or other scripts wrote.
//
//   node scripts/apply-category-overrides.mjs           apply
//   node scripts/apply-category-overrides.mjs --check   report only, write nothing
//
// Keys in the JSON are "<region file id>/<slug>" ("office/<slug>" for web/data/restaurants.json).
// A null value means "uncategorized" (the category field is removed).
// Places that are not listed (added after the file was generated) are left untouched and reported.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.resolve(here, "..", "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const officeFile = path.join(webDir, "data", "restaurants.json");
const check = process.argv.includes("--check");

const { places, categories } = JSON.parse(readFileSync(path.join(here, "category-overrides.json"), "utf8"));
const allowed = new Set(categories);
for (const [key, value] of Object.entries(places)) {
  if (value !== null && !allowed.has(value)) throw new Error(`Unknown category "${value}" for ${key}`);
}

const seen = new Set();
const unlisted = [];
let changedPlaces = 0;
let changedFiles = 0;

/** Put `category` where the catalog keeps it: right after district/area/name. */
function withCategory(r, category) {
  if ("category" in r) return { ...r, category };
  const anchor = ["district", "area", "name", "slug"].find((k) => k in r);
  const out = {};
  for (const [k, v] of Object.entries(r)) {
    out[k] = v;
    if (k === anchor) out.category = category;
  }
  if (!("category" in out)) out.category = category;
  return out;
}

function processFile(file, regionId, { countUnlisted }) {
  if (!existsSync(file)) return;
  const text = readFileSync(file, "utf8");
  const json = JSON.parse(text);
  let changed = false;
  json.restaurants = (json.restaurants ?? []).map((r) => {
    const key = `${regionId}/${r.slug}`;
    if (!(key in places)) {
      if (countUnlisted) unlisted.push(`${regionId}: ${r.name}`);
      return r;
    }
    seen.add(key);
    const next = places[key];
    if ((r.category ?? null) === next) return r;
    changed = true;
    if (countUnlisted) changedPlaces++;
    if (next === null) {
      const { category: _drop, ...rest } = r;
      return rest;
    }
    return withCategory(r, next);
  });
  if (!changed) return;
  changedFiles++;
  if (check) return;
  json.updatedAt = now;
  const pretty = /^\{\r?\n\s+"/.test(text);
  writeFileSync(file, `${pretty ? JSON.stringify(json, null, 2) : JSON.stringify(json)}\n`);
}

const now = new Date().toISOString();
for (const f of readdirSync(regionsDir).filter((f) => f.endsWith(".json") && !f.includes(".summary"))) {
  const id = f.replace(/\.json$/, "");
  processFile(path.join(regionsDir, f), id, { countUnlisted: true });
  processFile(path.join(regionsDir, `${id}.summary.json`), id, { countUnlisted: false });
}
processFile(officeFile, "office", { countUnlisted: true });

const missing = Object.keys(places).filter((k) => !seen.has(k));
console.log(
  JSON.stringify(
    {
      mode: check ? "check (nothing written)" : "applied",
      listed: Object.keys(places).length,
      changedPlaces,
      changedFiles,
      notInCatalogAnymore: missing.length,
      notListedYet: unlisted.length,
      notListedSample: unlisted.slice(0, 20),
    },
    null,
    2,
  ),
);
