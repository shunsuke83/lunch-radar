// Re-derive category groups and menu/hours/walkMeters for every restaurant in
// ../web/data/restaurants.json (same rules as upsert/export). Usage:
//   npm run catalog:structure            rewrite the file
//   npm run catalog:structure -- --check print the result, change nothing
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Restaurant } from "../bot/lib/restaurants.js";
import { structureRestaurant } from "../bot/lib/structure.js";

const file = path.resolve(import.meta.dirname, "..", "..", "web", "data", "restaurants.json");
const check = process.argv.includes("--check");

const catalog = JSON.parse(await readFile(file, "utf8")) as { restaurants: Restaurant[] };
catalog.restaurants = catalog.restaurants.map((r) => structureRestaurant(r));

const missing = (key: keyof Restaurant) =>
  catalog.restaurants.filter((r) => r[key] === undefined).map((r) => r.name);
const groups = new Map<string, number>();
for (const r of catalog.restaurants) {
  groups.set(r.category ?? "(none)", (groups.get(r.category ?? "(none)") ?? 0) + 1);
}
console.log(`restaurants: ${catalog.restaurants.length}`);
console.log(`groups: ${[...groups].map(([g, n]) => `${g} ${n}`).join(", ")}`);
for (const key of ["category", "menu", "hours", "walkMeters"] as const) {
  const names = missing(key);
  console.log(`no ${key}: ${names.length}${names.length ? ` (${names.join(", ")})` : ""}`);
}

if (check) {
  for (const r of catalog.restaurants) {
    console.log(
      `${r.category ?? "-"}/${r.subcategory ?? "-"} | ${r.name} | ${r.walkMeters ?? "-"}m | ` +
        `${r.hours ? `${r.hours.open}-${r.hours.close}${r.hours.breakStart ? ` brk ${r.hours.breakStart}-${r.hours.breakEnd}` : ""}` : "-"} | ` +
        (r.menu ?? []).map((m) => `${m.name}=${m.price ?? "?"}`).join(", "),
    );
  }
} else {
  await writeFile(file, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`wrote ${file}`);
}
