// Full geo audit: compare stored lat/lng to Kakao address/keyword geocode.
// Fixes pins that are far from their address (e.g. 분당 주소 + 서초 좌표).
//
// Usage:
//   node scripts/audit-fix-geo.mjs           # audit + fix
//   node scripts/audit-fix-geo.mjs --dry-run # report only
//
// Cache: lunch-spots/.cache/geo-audit.json (resume-safe)
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PROVINCES, parseRegion, locationInProvince } from "./lib/region-parse.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");
const envFile = path.join(root, ".env.local");
const cacheDir = path.join(root, ".cache");
const cacheFile = path.join(cacheDir, "geo-audit.json");
const reportFile = path.join(cacheDir, "geo-mismatch-report.json");
const dryRun = process.argv.includes("--dry-run");

/** Meters — beyond this, treat as wrong pin. */
const MISMATCH_M = 1500;
/** Prefer keyword hit if within this of address geocode. */
const NAME_OK_M = 800;

for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const kakaoKey = process.env.KAKAO_REST_API_KEY;
if (!kakaoKey) {
  console.error("KAKAO_REST_API_KEY missing in .env.local");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ID_TO_LABEL = Object.fromEntries(Object.entries(PROVINCES).map(([label, v]) => [v.id, label]));
const LABEL_TO_ID = Object.fromEntries(Object.entries(PROVINCES).map(([label, v]) => [label, v.id]));

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

async function kakaoGet(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { Authorization: `KakaoAK ${kakaoKey}` } });
    if (res.status === 429) {
      await sleep(1000 * (attempt + 1));
      continue;
    }
    if (!res.ok) return null;
    return res.json();
  }
  return null;
}

async function geocodeAddress(address) {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
  const data = await kakaoGet(url);
  const d = data?.documents?.[0];
  if (!d) return null;
  const road = d.road_address;
  const addr = d.address;
  return {
    lat: Number(road?.y ?? addr?.y ?? d.y),
    lng: Number(road?.x ?? addr?.x ?? d.x),
    address: road?.address_name || addr?.address_name || address,
    source: "address",
  };
}

async function geocodeKeyword(query) {
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=5`;
  const data = await kakaoGet(url);
  const d = data?.documents?.[0];
  if (!d) return null;
  return {
    lat: Number(d.y),
    lng: Number(d.x),
    address: d.road_address_name || d.address_name,
    kakaoId: d.id,
    kakaoUrl: d.place_url,
    placeName: d.place_name,
    source: "keyword",
  };
}

mkdirSync(cacheDir, { recursive: true });
const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, "utf8")) : {};
let cacheDirty = 0;
function saveCache() {
  writeFileSync(cacheFile, `${JSON.stringify(cache)}\n`);
}

async function resolveTruth(r, provinceHint) {
  const key = r.slug;
  if (cache[key]?.ok) return cache[key].hit;
  const address = (r.address || r.place?.address || "").trim();
  if (!address) {
    cache[key] = { ok: false, reason: "no-address" };
    return null;
  }

  let addrHit = await geocodeAddress(address);
  await sleep(80);
  let nameHit = null;
  const q = `${r.name} ${address.split(/\s+/).slice(0, 4).join(" ")}`;
  nameHit = await geocodeKeyword(q);
  await sleep(80);

  let hit = null;
  if (addrHit && nameHit) {
    const dist = haversineM(addrHit, nameHit);
    // Prefer named place when it agrees with the address neighborhood.
    hit = dist <= NAME_OK_M ? nameHit : addrHit;
  } else {
    hit = nameHit || addrHit;
  }

  if (!hit) {
    cache[key] = { ok: false, reason: "no-geocode", address };
    cacheDirty++;
    return null;
  }

  const parsed = parseRegion(hit.address || address, provinceHint);
  cache[key] = { ok: true, hit, address, parsed };
  cacheDirty++;
  if (cacheDirty % 40 === 0) saveCache();
  return hit;
}

const byId = new Map();
for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json") && !f.includes(".summary"))) {
  const id = file.replace(/\.json$/, "");
  if (!ID_TO_LABEL[id]) continue;
  const raw = JSON.parse(readFileSync(path.join(outDir, file), "utf8"));
  byId.set(id, { updatedAt: raw.updatedAt, restaurants: raw.restaurants ?? [] });
}

const mismatches = [];
let checked = 0;
let fixed = 0;
let dropped = 0;
let skippedNoLoc = 0;
let skippedOk = 0;
let noGeocode = 0;
const now = new Date().toISOString();

const todos = [];
for (const [id, pack] of byId) {
  const label = ID_TO_LABEL[id];
  for (const r of pack.restaurants) {
    if (!r.location?.lat || !r.location?.lng) {
      skippedNoLoc++;
      continue;
    }
    if (!(r.address || r.place?.address)) continue;
    todos.push({ id, label, r });
  }
}

console.log(`to check ${todos.length} (no-location skipped ${skippedNoLoc}), dryRun=${dryRun}`);

for (const { id, label, r } of todos) {
  checked++;
  const hit = await resolveTruth(r, label);
  if (!hit) {
    noGeocode++;
    continue;
  }
  const dist = haversineM(r.location, hit);
  if (dist <= MISMATCH_M) {
    skippedOk++;
    continue;
  }

  const parsed = parseRegion(hit.address || r.address || "", label);
  const targetProvince = parsed?.province ?? label;
  const entry = {
    slug: r.slug,
    name: r.name,
    file: id,
    address: r.address,
    old: { ...r.location },
    new: { lat: hit.lat, lng: hit.lng },
    distM: Math.round(dist),
    truthAddress: hit.address,
    source: hit.source,
    targetProvince,
  };
  mismatches.push(entry);

  if (dryRun) continue;

  r.location = { lat: hit.lat, lng: hit.lng };
  if (hit.address) r.address = hit.address;
  if (parsed?.district) {
    r.district = parsed.district;
    r.area = parsed.district;
  }
  if (hit.kakaoId && hit.kakaoUrl) {
    r.place = {
      ...(r.place ?? {}),
      kakaoId: hit.kakaoId,
      kakaoUrl: hit.kakaoUrl,
      address: hit.address || r.place?.address,
    };
  }
  r.updatedAt = now;
  fixed++;

  // Re-home across province files when address province differs.
  const targetId = LABEL_TO_ID[targetProvince];
  if (targetId && targetId !== id) {
    const dest = byId.get(targetId);
    if (dest) {
      pack.restaurants = pack.restaurants.filter((x) => x.slug !== r.slug);
      if (!dest.restaurants.some((x) => x.slug === r.slug)) dest.restaurants.push(r);
    }
  }

  if (fixed % 25 === 0) {
    console.log(`fixed ${fixed} / checked ${checked}, last ${r.name} ${Math.round(dist)}m`);
  }
}

saveCache();

// Drop locations still outside target province bbox after fix attempt.
if (!dryRun) {
  for (const [id, pack] of byId) {
    const label = ID_TO_LABEL[id];
    for (const r of pack.restaurants) {
      if (!r.location) continue;
      const parsed = parseRegion(r.address || "", label);
      const prov = parsed?.province ?? label;
      if (!locationInProvince(prov, r.location.lat, r.location.lng)) {
        delete r.location;
        dropped++;
      }
    }
  }
}

mismatches.sort((a, b) => b.distM - a.distM);
writeFileSync(
  reportFile,
  `${JSON.stringify(
    {
      generatedAt: now,
      dryRun,
      thresholdM: MISMATCH_M,
      checked,
      skippedOk,
      noGeocode,
      mismatchCount: mismatches.length,
      fixed,
      dropped,
      worst: mismatches.slice(0, 50),
      all: mismatches,
    },
    null,
    2,
  )}\n`,
);

if (!dryRun) {
  const index = [];
  for (const [id, pack] of [...byId.entries()].sort((a, b) => b[1].restaurants.length - a[1].restaurants.length)) {
    const label = ID_TO_LABEL[id];
    const seen = new Set();
    const unique = [];
    for (const r of pack.restaurants) {
      if (seen.has(r.slug)) continue;
      seen.add(r.slug);
      unique.push(r);
    }
    unique.sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
    pack.restaurants = unique;
    pack.updatedAt = now;
    writeFileSync(path.join(outDir, `${id}.json`), `${JSON.stringify({ updatedAt: now, restaurants: unique })}\n`);
    const districts = new Map();
    for (const r of unique) districts.set(r.district, (districts.get(r.district) ?? 0) + 1);
    index.push({
      id,
      label,
      count: unique.length,
      districts: [...districts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0], "ko"))
        .map(([name, count]) => ({ name, count })),
    });
  }
  writeFileSync(indexFile, `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`);
}

console.log(
  JSON.stringify(
    {
      checked,
      skippedOk,
      noGeocode,
      mismatches: mismatches.length,
      fixed,
      dropped,
      report: reportFile,
      sample: mismatches.slice(0, 5).map((m) => ({ name: m.name, distM: m.distM, file: m.file })),
    },
    null,
    2,
  ),
);
