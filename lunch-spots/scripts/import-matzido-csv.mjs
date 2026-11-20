// Import Naver Matjido (맛동여지도) CSV into web/public/regions.
// Dedup by naver placeId, else Korean name + ~80m / ~40m.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseRegion, isValidDistrict, PROVINCES } from "./lib/region-parse.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");
const officeFile = path.join(webDir, "data", "restaurants.json");
const envFile = path.join(root, ".env.local");

const csvPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "..", "tmp-matzido", "matzido_collector", "naver_matzido_2026_places.csv");

for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const kakaoKey = process.env.KAKAO_REST_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseCsv(text) {
  const rows = [];
  let i = 0;
  const len = text.length;
  const readCell = () => {
    if (text[i] === '"') {
      i++;
      let s = "";
      while (i < len) {
        if (text[i] === '"' && text[i + 1] === '"') {
          s += '"';
          i += 2;
          continue;
        }
        if (text[i] === '"') {
          i++;
          break;
        }
        s += text[i++];
      }
      if (text[i] === ",") i++;
      return s;
    }
    let s = "";
    while (i < len && text[i] !== "," && text[i] !== "\n" && text[i] !== "\r") s += text[i++];
    if (text[i] === "\r") i++;
    if (text[i] === "\n") i++;
    else if (text[i] === ",") i++;
    return s;
  };
  const header = [];
  while (i < len && text[i] !== "\n" && text[i] !== "\r") {
    header.push(readCell());
    if (text[i - 1] === "\n" || text[i - 1] === "\r") break;
  }
  if (text[i] === "\r") i++;
  if (text[i] === "\n") i++;
  while (i < len) {
    if (text[i] === "\r" || text[i] === "\n") {
      i++;
      continue;
    }
    const row = {};
    for (let c = 0; c < header.length; c++) {
      row[header[c]] = readCell();
    }
    rows.push(row);
  }
  return rows;
}

const normName = (s) =>
  String(s ?? "")
    .normalize("NFC")
    .replace(/\s+/g, "")
    .replace(/[()（）\[\]【】·・.,，、'’"“”\-]/g, "")
    .toLowerCase();

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

async function kakaoKeyword(query) {
  if (!kakaoKey || !query) return [];
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=3`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${kakaoKey}` } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.documents ?? []).map((d) => ({
    name: d.place_name,
    address: d.road_address_name || d.address_name,
    lat: Number(d.y),
    lng: Number(d.x),
    kakaoId: d.id,
    kakaoUrl: d.place_url,
  }));
}

const ID_TO_LABEL = Object.fromEntries(Object.entries(PROVINCES).map(([, v]) => [v.id, v.label]));
const LABEL_TO_ID = Object.fromEntries(Object.entries(PROVINCES).map(([k, v]) => [k, v.id]));

if (!existsSync(csvPath)) {
  console.error("missing csv", csvPath);
  process.exit(1);
}

const byProvince = new Map();
const existingAdded = new Map();
for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json"))) {
  const id = file.replace(/\.json$/, "");
  const label = ID_TO_LABEL[id];
  if (!label) continue;
  const rows = JSON.parse(readFileSync(path.join(outDir, file), "utf8")).restaurants ?? [];
  byProvince.set(label, rows);
  for (const r of rows) if (r.slug && r.addedAt) existingAdded.set(r.slug, r.addedAt);
}
const office = JSON.parse(readFileSync(officeFile, "utf8"));
const allRows = () => [...byProvince.values()].flat().concat(office.restaurants);

function findDup(name, lat, lng, naverId, kakaoId) {
  const n = normName(name);
  for (const r of allRows()) {
    if (naverId && r.naver?.placeId && String(r.naver.placeId) === String(naverId)) return r;
    if (kakaoId && r.place?.kakaoId && String(r.place.kakaoId) === String(kakaoId)) return r;
    const same = n && normName(r.name) === n;
    if (r.location?.lat != null && lat != null) {
      const d = haversineM(r.location, { lat, lng });
      if (same && d < 80) return r;
      if (d < 40) return r;
    } else if (same) return r;
  }
  return undefined;
}

function addTheme(row, theme) {
  const set = new Set(row.collections ?? []);
  set.add(theme);
  row.collections = [...set].sort();
  row.updatedAt = new Date().toISOString();
}

const csv = parseCsv(readFileSync(csvPath, "utf8"));
const now = new Date().toISOString();
let themed = 0;
let added = 0;
let skipped = 0;

for (const row of csv) {
  const naverId = String(row["플레이스 ID"] ?? "").trim();
  const name = String(row["상호명(네이버 표기)"] ?? row["상호명(화면표시)"] ?? "").trim();
  const address = String(row["주소"] ?? "").trim();
  const campaign = String(row["기획전"] ?? "").trim();
  const placeUrl =
    String(row["개별 네이버 플레이스 URL"] ?? "").trim() ||
    (naverId ? `https://map.naver.com/p/entry/place/${naverId}` : undefined);
  if (!name || !naverId) {
    skipped++;
    continue;
  }

  const theme = campaign ? `맛지도 2026 · ${campaign}` : "맛지도 2026";
  let existing = findDup(name, undefined, undefined, naverId, undefined);
  if (existing) {
    addTheme(existing, theme);
    addTheme(existing, "맛지도 2026");
    if (!existing.naver && placeUrl) existing.naver = { placeId: naverId, url: placeUrl };
    themed++;
    continue;
  }

  let lat;
  let lng;
  let kakaoId;
  let kakaoUrl;
  let resolvedAddress = address;
  // Prefer address-scoped queries so short names ("우주", "범") do not bind
  // to a same-named place in another city. Bare name is last resort only.
  const districtHint = address.split(/\s+/).find((t) => /(시|군|구)$/.test(t));
  let hits = [];
  if (address) hits = await kakaoKeyword(`${name} ${address}`);
  if (!hits.length && districtHint) hits = await kakaoKeyword(`${name} ${districtHint}`);
  if (!hits.length && address) hits = await kakaoKeyword(address);
  if (!hits.length) hits = await kakaoKeyword(name);
  await sleep(120);
  const wantRegion = resolvedAddress ? parseRegion(resolvedAddress) : undefined;
  const hit =
    (wantRegion &&
      hits.find((h) => {
        const hr = parseRegion(h.address);
        return hr && hr.province === wantRegion.province && hr.district === wantRegion.district;
      })) ||
    hits[0];
  if (hit) {
    lat = hit.lat;
    lng = hit.lng;
    kakaoId = hit.kakaoId;
    kakaoUrl = hit.kakaoUrl;
    // Never fill a missing CSV address from an unscoped Kakao hit — that is how
    // short names landed in the wrong 시·도.
    if (!resolvedAddress && wantRegion) resolvedAddress = hit.address;
  }

  existing = findDup(name, lat, lng, naverId, kakaoId);
  if (existing) {
    addTheme(existing, theme);
    addTheme(existing, "맛지도 2026");
    if (!existing.naver && placeUrl) existing.naver = { placeId: naverId, url: placeUrl };
    themed++;
    continue;
  }

  const region = parseRegion(resolvedAddress);
  if (!region || !isValidDistrict(region.district)) {
    skipped++;
    console.log("skip region", name, resolvedAddress);
    continue;
  }
  if (lat == null) {
    skipped++;
    console.log("skip coords", name);
    continue;
  }

  const rec = {
    slug: `naver-${naverId}`,
    name,
    area: region.district,
    district: region.district,
    tags: [],
    addedAt: existingAdded.get(`naver-${naverId}`) ?? now,
    updatedAt: now,
    mentionCount: 0,
    address: resolvedAddress,
    location: { lat, lng },
    collections: ["맛지도 2026", theme].sort(),
    curated: { by: "naver-matzido-2026" },
    naver: { placeId: naverId, url: placeUrl },
    ...(kakaoId && kakaoUrl ? { place: { kakaoId: String(kakaoId), kakaoUrl } } : {}),
  };
  const list = byProvince.get(region.province) ?? [];
  list.push(rec);
  byProvince.set(region.province, list);
  added++;
}

const index = [];
for (const [province, rows] of [...byProvince.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const id = LABEL_TO_ID[province];
  rows.sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
  writeFileSync(path.join(outDir, `${id}.json`), `${JSON.stringify({ updatedAt: now, restaurants: rows })}\n`);
  const districts = new Map();
  for (const r of rows) districts.set(r.district, (districts.get(r.district) ?? 0) + 1);
  index.push({
    id,
    label: province,
    count: rows.length,
    districts: [...districts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "ko"))
      .map(([name, count]) => ({ name, count })),
  });
}
writeFileSync(indexFile, `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`);
console.log(
  `matzido: themed ${themed}, added ${added}, skipped ${skipped}; total ${index.reduce((s, r) => s + r.count, 0)}`,
);
