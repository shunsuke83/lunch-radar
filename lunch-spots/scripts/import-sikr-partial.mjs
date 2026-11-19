// Merge partial Sikr list: theme by Korean name, else Kakao geocode + insert.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseRegion } from "./lib/region-parse.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");
const officeFile = path.join(webDir, "data", "restaurants.json");
const envFile = path.join(root, ".env.local");

for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const kakaoKey = process.env.KAKAO_REST_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ID_TO_LABEL = {
  seoul: "서울",
  busan: "부산",
  daegu: "대구",
  incheon: "인천",
  gwangju: "광주",
  daejeon: "대전",
  ulsan: "울산",
  sejong: "세종",
  gyeonggi: "경기",
  gangwon: "강원",
  chungbuk: "충북",
  chungnam: "충남",
  jeonbuk: "전북",
  jeonnam: "전남",
  gyeongbuk: "경북",
  gyeongnam: "경남",
  jeju: "제주",
};
const LABEL_TO_ID = Object.fromEntries(Object.entries(ID_TO_LABEL).map(([k, v]) => [v, k]));
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
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=5`;
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
function regionOf(address) {
  return parseRegion(address, "서울");
}

const byProvince = new Map();
for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json"))) {
  const id = file.replace(/\.json$/, "");
  const label = ID_TO_LABEL[id];
  if (!label) continue;
  byProvince.set(label, JSON.parse(readFileSync(path.join(outDir, file), "utf8")).restaurants ?? []);
}
const office = JSON.parse(readFileSync(officeFile, "utf8"));
const allRows = () => [...byProvince.values()].flat().concat(office.restaurants);

function findDup(name, lat, lng, kakaoId) {
  const n = normName(name);
  for (const r of allRows()) {
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

function addTheme(row) {
  const set = new Set(row.collections ?? []);
  set.add("Sikr");
  row.collections = [...set].sort();
  row.updatedAt = new Date().toISOString();
}

const sikr = JSON.parse(readFileSync(path.join(root, ".cache", "sikr-partial.json"), "utf8"));
const now = new Date().toISOString();
let themed = 0;
let added = 0;
let skipped = 0;

for (const s of sikr) {
  const nameKo = s.nameKo;
  if (!nameKo) {
    skipped++;
    continue;
  }
  // 1) name match in existing catalog
  const n = normName(nameKo);
  let existing = allRows().find((r) => {
    const rn = normName(r.name);
    return rn === n || rn.includes(n) || n.includes(rn);
  });
  if (existing) {
    addTheme(existing);
    themed++;
    continue;
  }
  // 2) Kakao resolve
  const hits = await kakaoKeyword(`${nameKo} 서울`);
  await sleep(150);
  const hit =
    hits.find((h) => normName(h.name) === n || normName(h.name).includes(n.slice(0, Math.min(4, n.length)))) ??
    hits[0];
  if (!hit) {
    skipped++;
    console.log("skip", nameKo);
    continue;
  }
  existing = findDup(nameKo, hit.lat, hit.lng, hit.kakaoId);
  if (existing) {
    addTheme(existing);
    themed++;
    continue;
  }
  const region = regionOf(hit.address);
  const row = {
    slug: `kakao-${hit.kakaoId}`,
    name: nameKo,
    area: region.district,
    district: region.district,
    tags: [],
    addedAt: now,
    updatedAt: now,
    mentionCount: 0,
    address: hit.address,
    location: { lat: hit.lat, lng: hit.lng },
    collections: ["Sikr"],
    curated: { by: "sikr", url: "https://sikr.app/" },
    place: { kakaoId: String(hit.kakaoId), kakaoUrl: hit.kakaoUrl },
    ...(s.nameEn ? { notes: s.nameEn } : {}),
  };
  const list = byProvince.get(region.province) ?? [];
  list.push(row);
  byProvince.set(region.province, list);
  added++;
}

const index = [];
for (const [province, rows] of [...byProvince.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const id = LABEL_TO_ID[province];
  // dedupe slug
  const seen = new Set();
  const unique = [];
  for (const r of rows) {
    if (seen.has(r.slug)) {
      const hit = unique.find((x) => x.slug === r.slug);
      if (hit) for (const t of r.collections ?? []) {
        const set = new Set(hit.collections ?? []);
        set.add(t);
        hit.collections = [...set].sort();
      }
      continue;
    }
    seen.add(r.slug);
    unique.push(r);
  }
  unique.sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
  writeFileSync(path.join(outDir, `${id}.json`), `${JSON.stringify({ updatedAt: now, restaurants: unique })}\n`);
  const districts = new Map();
  for (const r of unique) districts.set(r.district, (districts.get(r.district) ?? 0) + 1);
  index.push({
    id,
    label: province,
    count: unique.length,
    districts: [...districts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "ko"))
      .map(([name, count]) => ({ name, count })),
  });
}
writeFileSync(indexFile, `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`);
console.log(
  `sikr: themed ${themed}, added ${added}, skipped ${skipped}; total ${index.reduce((s, r) => s + r.count, 0)}`,
);
