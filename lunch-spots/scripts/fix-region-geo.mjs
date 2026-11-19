// Re-home misplaced province rows, fix outlier coords via Kakao, scrub bulk addedAt.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PROVINCES,
  parseRegion,
  isValidDistrict,
  locationInProvince,
} from "./lib/region-parse.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");
const envFile = path.join(root, ".env.local");
const BULK_ADDED = "2026-11-01T00:00:00.000Z";

for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const kakaoKey = process.env.KAKAO_REST_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ID_TO_LABEL = Object.fromEntries(Object.entries(PROVINCES).map(([label, v]) => [v.id, label]));
const LABEL_TO_ID = Object.fromEntries(Object.entries(PROVINCES).map(([label, v]) => [label, v.id]));

async function kakaoKeyword(query) {
  if (!kakaoKey) return null;
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=5`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${kakaoKey}` } });
  if (!res.ok) return null;
  const data = await res.json();
  const d = data.documents?.[0];
  if (!d) return null;
  return {
    lat: Number(d.y),
    lng: Number(d.x),
    address: d.road_address_name || d.address_name,
    kakaoId: d.id,
    kakaoUrl: d.place_url,
  };
}

const byId = new Map();
for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json") && !f.includes(".summary"))) {
  const id = file.replace(/\.json$/, "");
  if (!ID_TO_LABEL[id]) continue;
  const raw = JSON.parse(readFileSync(path.join(outDir, file), "utf8"));
  byId.set(id, { updatedAt: raw.updatedAt, restaurants: raw.restaurants ?? [] });
}

let moved = 0;
let fixedCoord = 0;
let droppedLoc = 0;
let scrubbedAdded = 0;
let districtFix = 0;

const now = new Date().toISOString();

for (const [id, pack] of byId) {
  const label = ID_TO_LABEL[id];
  const keep = [];
  for (const r of pack.restaurants) {
    // Scrub bulk "newly added" stamps from nationwide imports.
    if (r.addedAt && Date.parse(r.addedAt) >= Date.parse("2026-11-18T00:00:00.000Z")) {
      r.addedAt = BULK_ADDED;
      scrubbedAdded++;
    }

    const parsed = parseRegion(r.address || r.place?.address || "", label);
    if (parsed?.district && isValidDistrict(parsed.district) && r.district !== parsed.district) {
      if (!isValidDistrict(r.district) || /[A-Za-z]/.test(String(r.district))) {
        r.district = parsed.district;
        r.area = parsed.district;
        districtFix++;
      }
    }

    const targetProvince = parsed?.province ?? label;
    const targetId = LABEL_TO_ID[targetProvince] ?? id;

    // Fix coords outside province bbox.
    if (r.location && !locationInProvince(targetProvince, r.location.lat, r.location.lng)) {
      const q = `${r.name} ${r.address || parsed?.district || targetProvince}`;
      const hit = await kakaoKeyword(q);
      await sleep(120);
      if (hit && locationInProvince(targetProvince, hit.lat, hit.lng)) {
        r.location = { lat: hit.lat, lng: hit.lng };
        if (hit.address) r.address = hit.address;
        if (!r.place) r.place = { kakaoId: hit.kakaoId, kakaoUrl: hit.kakaoUrl, address: hit.address };
        fixedCoord++;
      } else {
        delete r.location;
        droppedLoc++;
      }
    }

    if (targetId !== id) {
      const dest = byId.get(targetId);
      if (dest) {
        if (parsed?.district && isValidDistrict(parsed.district)) {
          r.district = parsed.district;
          r.area = parsed.district;
        }
        dest.restaurants.push(r);
        moved++;
        continue;
      }
    }
    keep.push(r);
  }
  pack.restaurants = keep;
  pack.updatedAt = now;
}

function writeRegion(id, pack) {
  const seen = new Set();
  const unique = [];
  for (const r of pack.restaurants) {
    if (seen.has(r.slug)) {
      const hit = unique.find((x) => x.slug === r.slug);
      if (hit && r.collections?.length) {
        hit.collections = [...new Set([...(hit.collections ?? []), ...r.collections])].sort();
      }
      continue;
    }
    seen.add(r.slug);
    unique.push(r);
  }
  unique.sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
  pack.restaurants = unique;
  writeFileSync(path.join(outDir, `${id}.json`), `${JSON.stringify({ updatedAt: pack.updatedAt, restaurants: unique })}\n`);
}

const index = [];
for (const [id, pack] of [...byId.entries()].sort((a, b) => b[1].restaurants.length - a[1].restaurants.length)) {
  writeRegion(id, pack);
  const districts = new Map();
  for (const r of pack.restaurants) {
    const d = isValidDistrict(r.district) ? r.district : "기타";
    districts.set(d, (districts.get(d) ?? 0) + 1);
  }
  index.push({
    id,
    label: ID_TO_LABEL[id],
    count: pack.restaurants.length,
    districts: [...districts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko")),
  });
}
writeFileSync(indexFile, `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`);

console.log(
  JSON.stringify(
    { moved, fixedCoord, droppedLoc, scrubbedAdded, districtFix, total: index.reduce((s, r) => s + r.count, 0) },
    null,
    2,
  ),
);
