// Import validation report: coord/address mismatch, missing category, near-dupes.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseRegion, locationInProvince, isValidDistrict, PROVINCES } from "./lib/region-parse.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const regionsDir = path.resolve(root, "..", "web", "public", "regions");
const ID_TO_LABEL = Object.fromEntries(Object.entries(PROVINCES).map(([label, v]) => [v.id, label]));

function haversineM(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

const report = {
  coordMismatch: [],
  missingCategory: [],
  invalidDistrict: [],
  nearDupes: [],
};

for (const file of readdirSync(regionsDir).filter((f) => f.endsWith(".json") && !f.includes(".summary"))) {
  const id = file.replace(/\.json$/, "");
  const label = ID_TO_LABEL[id];
  if (!label) continue;
  const rows = JSON.parse(readFileSync(path.join(regionsDir, file), "utf8")).restaurants ?? [];
  for (const r of rows) {
    const parsed = parseRegion(r.address || "", label);
    if (parsed && parsed.province !== label) {
      report.coordMismatch.push({
        kind: "province-file",
        slug: r.slug,
        name: r.name,
        file: id,
        addressProvince: parsed.province,
      });
    }
    if (r.location && !locationInProvince(label, r.location.lat, r.location.lng)) {
      report.coordMismatch.push({
        kind: "bbox",
        slug: r.slug,
        name: r.name,
        file: id,
        location: r.location,
        address: r.address,
      });
    }
    if (!r.category) {
      report.missingCategory.push({ slug: r.slug, name: r.name, file: id, collections: r.collections });
    }
    if (r.district && !isValidDistrict(r.district)) {
      report.invalidDistrict.push({ slug: r.slug, name: r.name, district: r.district, file: id });
    }
  }
  const byName = new Map();
  for (const r of rows) {
    if (!r.location || !r.name) continue;
    const list = byName.get(r.name) ?? [];
    list.push(r);
    byName.set(r.name, list);
  }
  for (const [name, list] of byName) {
    if (list.length < 2) continue;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (haversineM(list[i].location, list[j].location) < 150) {
          report.nearDupes.push({ a: list[i].slug, b: list[j].slug, name, file: id });
        }
      }
    }
  }
}

const out = {
  generatedAt: new Date().toISOString(),
  counts: {
    coordMismatch: report.coordMismatch.length,
    missingCategory: report.missingCategory.length,
    invalidDistrict: report.invalidDistrict.length,
    nearDupes: report.nearDupes.length,
  },
  samples: {
    coordMismatch: report.coordMismatch.slice(0, 20),
    missingCategory: report.missingCategory.slice(0, 20),
    invalidDistrict: report.invalidDistrict.slice(0, 20),
    nearDupes: report.nearDupes.slice(0, 20),
  },
};
const outPath = path.join(root, ".cache", "region-validation.json");
writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`);
console.log(JSON.stringify(out.counts, null, 2));
console.log("wrote", outPath);
