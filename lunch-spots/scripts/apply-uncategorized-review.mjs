// Merge filled uncategorized-review-template.json into category-overrides.json,
// collect __nonfood__ keys into nonfood-candidates.json, then run apply-category-overrides.
//
//   node lunch-spots/scripts/apply-uncategorized-review.mjs
//   node lunch-spots/scripts/apply-uncategorized-review.mjs --check
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = path.dirname(fileURLToPath(import.meta.url));
const check = process.argv.includes("--check");
const templateFile = path.join(here, "uncategorized-review-template.json");
const overridesFile = path.join(here, "category-overrides.json");
const nonfoodFile = path.join(here, "nonfood-candidates.json");

if (!existsSync(templateFile)) {
  throw new Error(`Missing ${templateFile}. Run export-uncategorized-review.mjs first.`);
}
if (!existsSync(overridesFile)) {
  throw new Error(`Missing ${overridesFile}`);
}

const template = JSON.parse(readFileSync(templateFile, "utf8"));
const overrides = JSON.parse(readFileSync(overridesFile, "utf8"));
const categories = new Set(overrides.categories ?? template.categories ?? []);
const marker = template.nonFoodMarker || "__nonfood__";

const foodUpdates = {};
const nonfood = [];
let keptNull = 0;
let invalid = 0;

for (const [key, value] of Object.entries(template.places ?? {})) {
  if (value === null || value === undefined) {
    keptNull++;
    continue;
  }
  if (value === marker) {
    nonfood.push(key);
    // Keep catalog uncategorized (null) until a purge step decides otherwise.
    foodUpdates[key] = null;
    continue;
  }
  if (!categories.has(value)) {
    invalid++;
    console.error(`Invalid category "${value}" for ${key}`);
    continue;
  }
  foodUpdates[key] = value;
}

if (invalid) {
  throw new Error(`${invalid} invalid categor(ies); fix the template and retry.`);
}

let changedOverrides = 0;
for (const [key, value] of Object.entries(foodUpdates)) {
  if (!(key in overrides.places)) {
    // Still merge — place may exist in catalog even if missing from overrides snapshot.
    overrides.places[key] = value;
    changedOverrides++;
    continue;
  }
  if (overrides.places[key] !== value) {
    overrides.places[key] = value;
    changedOverrides++;
  }
}

const nonfoodPayload = {
  generatedAt: new Date().toISOString(),
  about:
    "Keys marked __nonfood__ in uncategorized-review-template.json. Catalog not deleted yet; category stays null.",
  count: nonfood.length,
  keys: nonfood.sort(),
};

console.log(
  JSON.stringify(
    {
      mode: check ? "check (nothing written)" : "merge",
      foodUpdates: Object.keys(foodUpdates).filter((k) => foodUpdates[k] !== null).length,
      nonfoodMarked: nonfood.length,
      keptNull,
      changedOverrides,
    },
    null,
    2,
  ),
);

if (check) process.exit(0);

overrides.updatedAt = new Date().toISOString();
writeFileSync(overridesFile, `${JSON.stringify(overrides, null, 2)}\n`);
writeFileSync(nonfoodFile, `${JSON.stringify(nonfoodPayload, null, 2)}\n`);

const apply = spawnSync(process.execPath, [path.join(here, "apply-category-overrides.mjs")], {
  cwd: path.resolve(here, "..", ".."),
  encoding: "utf8",
  stdio: "inherit",
});
process.exit(apply.status ?? 1);
