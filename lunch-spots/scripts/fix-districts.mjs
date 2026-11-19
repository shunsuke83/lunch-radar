// Backfill district/area to 시·군·구 when a road name (or bare province) was stored.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseRegion, isValidDistrict, PROVINCES } from "./lib/region-parse.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");
const envFile = path.join(root, ".env.local");

for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const kakaoKey = process.env.KAKAO_REST_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function regionFromCoords(lat, lng) {
  if (!kakaoKey || lat == null || lng == null) return undefined;
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${kakaoKey}` } });
  if (!res.ok) return undefined;
  const data = await res.json();
  const docs = data.documents ?? [];
  const b = docs.find((d) => d.region_type === "B") ?? docs[0];
  if (!b) return undefined;
  const provinceName = b.region_1depth_name;
  const aliases = {
    서울특별시: "서울",
    부산광역시: "부산",
    대구광역시: "대구",
    인천광역시: "인천",
    광주광역시: "광주",
    대전광역시: "대전",
    울산광역시: "울산",
    세종특별자치시: "세종",
    경기도: "경기",
    강원특별자치도: "강원",
    강원도: "강원",
    충청북도: "충북",
    충청남도: "충남",
    전북특별자치도: "전북",
    전라북도: "전북",
    전라남도: "전남",
    경상북도: "경북",
    경상남도: "경남",
    제주특별자치도: "제주",
  };
  const province = aliases[provinceName] ?? provinceName;
  if (!PROVINCES[province]) return undefined;
  if (province === "세종") return { province, district: "세종" };
  const district = b.region_2depth_name?.replace(/\s+/g, "") || undefined;
  if (!district || !isValidDistrict(district)) return undefined;
  return { province, district };
}

const ID_TO_LABEL = Object.fromEntries(Object.entries(PROVINCES).map(([, v]) => [v.id, v.label]));
const LABEL_TO_ID = Object.fromEntries(Object.entries(PROVINCES).map(([k, v]) => [k, v.id]));

const now = new Date().toISOString();
let fixed = 0;
let viaKakao = 0;
let unresolved = 0;
const byProvince = new Map();

for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json"))) {
  const id = file.replace(/\.json$/, "");
  const label = ID_TO_LABEL[id];
  if (!label) continue;
  const rows = JSON.parse(readFileSync(path.join(outDir, file), "utf8")).restaurants ?? [];
  byProvince.set(label, rows);
}

const all = [...byProvince.entries()].flatMap(([province, rows]) =>
  rows.map((r) => ({ province, r })),
);

for (const { province: fileProvince, r } of all) {
  if (isValidDistrict(r.district)) continue;

  let region = parseRegion(r.address, fileProvince);
  if (!region && r.location?.lat != null) {
    region = await regionFromCoords(r.location.lat, r.location.lng);
    await sleep(80);
    if (region) viaKakao++;
  }
  if (!region || !isValidDistrict(region.district)) {
    unresolved++;
    console.log("unresolved", r.name, r.district, r.address ?? "(no addr)");
    continue;
  }

  // Move row if province file differs
  if (region.province !== fileProvince) {
    const from = byProvince.get(fileProvince) ?? [];
    byProvince.set(
      fileProvince,
      from.filter((x) => x !== r),
    );
    const to = byProvince.get(region.province) ?? [];
    to.push(r);
    byProvince.set(region.province, to);
  }
  r.district = region.district;
  r.area = region.district;
  r.updatedAt = now;
  fixed++;
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
console.log(`fixed ${fixed} (kakao ${viaKakao}), unresolved ${unresolved}`);
