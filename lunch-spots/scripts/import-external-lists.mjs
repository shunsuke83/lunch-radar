// Merge eatmyseoul + Google Maps saved list into web/public/regions/*.json
// Dedup by: existing naver/kakao id, or normalized Korean name + ~80m, or ~40m alone.
import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");
const officeFile = path.join(webDir, "data", "restaurants.json");
const envFile = path.join(root, ".env.local");

const PROVINCES = {
  서울: { id: "seoul", label: "서울" },
  부산: { id: "busan", label: "부산" },
  대구: { id: "daegu", label: "대구" },
  인천: { id: "incheon", label: "인천" },
  광주: { id: "gwangju", label: "광주" },
  대전: { id: "daejeon", label: "대전" },
  울산: { id: "ulsan", label: "울산" },
  세종: { id: "sejong", label: "세종" },
  경기: { id: "gyeonggi", label: "경기" },
  강원: { id: "gangwon", label: "강원" },
  충북: { id: "chungbuk", label: "충북" },
  충남: { id: "chungnam", label: "충남" },
  전북: { id: "jeonbuk", label: "전북" },
  전남: { id: "jeonnam", label: "전남" },
  경북: { id: "gyeongbuk", label: "경북" },
  경남: { id: "gyeongnam", label: "경남" },
  제주: { id: "jeju", label: "제주" },
};
const PROVINCE_ALIASES = {
  서울특별시: "서울",
  부산광역시: "부산",
  대구광역시: "대구",
  인천광역시: "인천",
  광주광역시: "광주",
  대전광역시: "대전",
  울산광역시: "울산",
  세종특별자치시: "세종",
  경기도: "경기",
  강원도: "강원",
  강원특별자치도: "강원",
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전북특별자치도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
  제주특별자치도: "제주",
  Seoul: "서울",
  Busan: "부산",
  Incheon: "인천",
  Daegu: "대구",
  Daejeon: "대전",
  Gwangju: "광주",
  Ulsan: "울산",
  Sejong: "세종",
  Gyeonggi: "경기",
  Gangwon: "강원",
  Jeju: "제주",
};

function loadEnv() {
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const normName = (s) =>
  String(s ?? "")
    .normalize("NFC")
    .replace(/\s+/g, "")
    .replace(/[()（）\[\]【】·・.,，、'’"“”]/g, "")
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

function regionOf(address, fallbackCity) {
  const text = `${address ?? ""} ${fallbackCity ?? ""}`.trim();
  const parts = text.split(/\s+/);
  for (const p of parts) {
    const head = PROVINCE_ALIASES[p] ?? (PROVINCES[p] ? p : undefined);
    if (head && PROVINCES[head]) {
      if (head === "세종") return { province: head, district: "세종" };
      const idx = parts.indexOf(p);
      const district = parts[idx + 1]?.replace(/,$/, "") ?? head;
      return { province: head, district };
    }
  }
  // English "Seocho-gu, Seoul"
  if (/Seoul/i.test(text)) {
    const gu = text.match(/([A-Za-z-]+)-gu/i)?.[1];
    const district = gu ? `${gu[0].toUpperCase()}${gu.slice(1).toLowerCase()}구` : "서울";
    // Prefer Korean district from address_ko when available upstream
    return { province: "서울", district: /구$/.test(district) ? district : "서울" };
  }
  if (/Gyeonggi|경기/i.test(text)) return { province: "경기", district: parts[1] ?? "경기" };
  return undefined;
}

function regionOfKoAddress(addressKo, city) {
  const parts = String(addressKo ?? "").trim().split(/\s+/);
  let head = PROVINCE_ALIASES[parts[0]] ?? parts[0];
  if (!PROVINCES[head] && city) {
    const c = PROVINCE_ALIASES[city] ?? city;
    if (PROVINCES[c]) head = c;
  }
  // "서초구 반포대로..." without 서울 prefix
  if (!PROVINCES[head] && /구$/.test(parts[0] ?? "")) {
    return { province: "서울", district: parts[0] };
  }
  if (!PROVINCES[head]) return regionOf(addressKo, city);
  if (head === "세종") return { province: head, district: "세종" };
  return { province: head, district: parts[1] ?? head };
}

loadEnv();
const kakaoKey = process.env.KAKAO_REST_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function kakaoKeyword(query) {
  if (!kakaoKey || !query) return undefined;
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=1`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${kakaoKey}` } });
  if (!res.ok) return undefined;
  const data = await res.json();
  const d = data.documents?.[0];
  if (!d) return undefined;
  return {
    name: d.place_name,
    address: d.road_address_name || d.address_name,
    lat: Number(d.y),
    lng: Number(d.x),
    kakaoId: d.id,
    kakaoUrl: d.place_url,
  };
}

// ---- load existing regions ----
const byProvince = new Map();
for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json"))) {
  const j = JSON.parse(readFileSync(path.join(outDir, file), "utf8"));
  const id = file.replace(/\.json$/, "");
  const province = Object.values(PROVINCES).find((p) => p.id === id)?.label;
  if (!province) continue;
  byProvince.set(province, j.restaurants ?? []);
}

const office = JSON.parse(readFileSync(officeFile, "utf8"));
const officeNaver = new Set(office.restaurants.map((r) => r.naver?.placeId).filter(Boolean));
const officeKakao = new Set(office.restaurants.map((r) => r.place?.kakaoId).filter(Boolean));

const allRows = () => [...byProvince.values()].flat();

function findDup(candidate) {
  const n = normName(candidate.name);
  for (const r of allRows()) {
    if (candidate.kakaoId && r.place?.kakaoId && String(r.place.kakaoId) === String(candidate.kakaoId)) {
      return r;
    }
    if (candidate.naverId && r.naver?.placeId && String(r.naver.placeId) === String(candidate.naverId)) {
      return r;
    }
    const sameName = n && normName(r.name) === n;
    if (r.location?.lat != null && candidate.lat != null) {
      const dist = haversineM(r.location, { lat: candidate.lat, lng: candidate.lng });
      if (sameName && dist < 80) return r;
      if (dist < 40) return r;
    } else if (sameName) {
      return r;
    }
  }
  for (const r of office.restaurants) {
    if (candidate.kakaoId && r.place?.kakaoId && String(r.place.kakaoId) === String(candidate.kakaoId)) return r;
    if (candidate.naverId && r.naver?.placeId && officeNaver.has(String(candidate.naverId))) return r;
    if (normName(r.name) === n && r.location?.lat != null && candidate.lat != null) {
      if (haversineM(r.location, { lat: candidate.lat, lng: candidate.lng }) < 80) return r;
    }
  }
  return undefined;
}

function addTheme(row, theme) {
  const set = new Set(row.collections ?? []);
  set.add(theme);
  row.collections = [...set].sort();
  row.updatedAt = new Date().toISOString();
}

const now = new Date().toISOString();
let added = 0;
let themed = 0;
let skipped = 0;

function upsert(candidate, theme) {
  if (officeKakao.has(String(candidate.kakaoId ?? "")) || officeNaver.has(String(candidate.naverId ?? ""))) {
    skipped++;
    return;
  }
  const existing = findDup(candidate);
  if (existing) {
    addTheme(existing, theme);
    themed++;
    return;
  }
  const region = candidate.region ?? regionOfKoAddress(candidate.address, candidate.city);
  if (!region || !PROVINCES[region.province]) {
    skipped++;
    return;
  }
  const slugBase = candidate.kakaoId
    ? `kakao-${candidate.kakaoId}`
    : `ext-${normName(candidate.name).slice(0, 24) || "place"}-${Math.round(candidate.lat * 1e5)}`;
  const row = {
    slug: slugBase,
    name: candidate.name,
    area: region.district,
    district: region.district,
    ...(candidate.category ? { category: candidate.category } : {}),
    ...(candidate.subcategory ? { subcategory: candidate.subcategory } : {}),
    tags: [],
    addedAt: now,
    updatedAt: now,
    mentionCount: 0,
    address: candidate.address,
    location: { lat: candidate.lat, lng: candidate.lng },
    collections: [theme],
    curated: { by: candidate.source },
    ...(candidate.kakaoId && candidate.kakaoUrl
      ? { place: { kakaoId: String(candidate.kakaoId), kakaoUrl: candidate.kakaoUrl } }
      : {}),
    ...(candidate.notes ? { notes: candidate.notes } : {}),
  };
  const list = byProvince.get(region.province) ?? [];
  list.push(row);
  byProvince.set(region.province, list);
  added++;
}

// ---- eatmyseoul ----
const geoPath = path.join(root, ".cache", "eatmyseoul-places.geojson");
const geo = JSON.parse(readFileSync(geoPath, "utf8"));
console.log(`eatmyseoul features ${geo.features.length}`);
for (const f of geo.features) {
  const p = f.properties ?? {};
  const [lng, lat] = f.geometry?.coordinates ?? [];
  if (typeof lat !== "number" || typeof lng !== "number") {
    skipped++;
    continue;
  }
  const name = p.name_ko || p.name;
  if (!name) {
    skipped++;
    continue;
  }
  upsert(
    {
      name,
      address: p.address_ko || p.address,
      city: p.city,
      lat,
      lng,
      kakaoId: p.kakao_id,
      kakaoUrl: p.kakao_url,
      category: undefined,
      subcategory: p.cuisine_ko || p.cuisine,
      source: "eatmyseoul",
      notes: p.category ? `Eat my Seoul: ${p.category}` : undefined,
      region: regionOfKoAddress(p.address_ko || p.address, p.city),
    },
    "Eat my Seoul",
  );
}
console.log(`after eatmyseoul: added ${added}, themed ${themed}, skipped ${skipped}`);

// ---- google goat list ----
const goatPath = path.join(root, ".cache", "gmaps-goat-places.json");
const goat = JSON.parse(readFileSync(goatPath, "utf8"));
console.log(`google goat ${goat.length}`);
let gAdded = 0;
let gThemed = 0;
let gSkip = 0;
const addedBefore = added;
const themedBefore = themed;
const skippedBefore = skipped;

for (const g of goat) {
  if (typeof g.lat !== "number" || typeof g.lng !== "number") {
    gSkip++;
    continue;
  }
  // Prefer Kakao Korean name via coordinate+name search
  let resolved;
  const q = g.nameEn ? `${g.nameEn} ${g.address ?? ""}` : g.address;
  resolved = await kakaoKeyword(q);
  await sleep(120);
  const name =
    resolved?.name ||
    (g.nameEn && /[\uac00-\ud7a3]/.test(g.nameEn) ? g.nameEn : undefined) ||
    g.nameEn;
  if (!name) {
    gSkip++;
    continue;
  }
  const beforeA = added;
  const beforeT = themed;
  upsert(
    {
      name,
      address: resolved?.address || g.address,
      lat: resolved?.lat ?? g.lat,
      lng: resolved?.lng ?? g.lng,
      kakaoId: resolved?.kakaoId,
      kakaoUrl: resolved?.kakaoUrl,
      source: "google-goat",
      notes: g.note,
      region: regionOfKoAddress(resolved?.address || g.address, "Seoul"),
    },
    "GOAT Seoul (Google)",
  );
  if (added > beforeA) gAdded++;
  else if (themed > beforeT) gThemed++;
  else gSkip++;
}
console.log(
  `google: new ${added - addedBefore}, themed ${themed - themedBefore}, skipped/dup ${skipped - skippedBefore + gSkip}`,
);

// ---- write ----
const index = [];
for (const [province, rows] of [...byProvince.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const { id, label } = PROVINCES[province];
  // de-dupe slugs inside province
  const seen = new Set();
  const unique = [];
  for (const r of rows) {
    if (seen.has(r.slug)) {
      const hit = unique.find((x) => x.slug === r.slug);
      if (hit) for (const t of r.collections ?? []) addTheme(hit, t);
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
    label,
    count: unique.length,
    districts: [...districts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "ko"))
      .map(([name, count]) => ({ name, count })),
  });
}
writeFileSync(indexFile, `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`);
console.log(
  `wrote ${index.length} regions, ${index.reduce((s, r) => s + r.count, 0)} places (added ${added}, themed-only ${themed})`,
);
