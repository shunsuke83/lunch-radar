import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const web = path.resolve(root, "..", "web");
const envFile = path.join(root, ".env.local");
for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const key = process.env.KAKAO_REST_API_KEY;

async function kakao(query) {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=5`,
    { headers: { Authorization: `KakaoAK ${key}` } },
  );
  const data = await res.json();
  return data.documents?.[0] ?? null;
}

const seoulPath = path.join(web, "public/regions/seoul.json");
const seoul = JSON.parse(readFileSync(seoulPath, "utf8"));
const bawi = seoul.restaurants.find((r) => r.slug === "naver-1023957785" || r.name === "바위드");
if (bawi) {
  const hit = await kakao("바위드 마포 양화로8길");
  // Prefer same road address even if name differs (위드 etc.)
  const addrHit =
    hit ??
    (await kakao("서울 마포구 양화로8길 38"));
  if (addrHit) {
    bawi.location = { lat: Number(addrHit.y), lng: Number(addrHit.x) };
    bawi.address = addrHit.road_address_name || addrHit.address_name || bawi.address;
    console.log("바위드", bawi.location);
  }
}

// Scrub addedAt for nationwide (already done by fix-geo, but restore wiped it)
let scrubbed = 0;
for (const r of seoul.restaurants) {
  if (r.addedAt && Date.parse(r.addedAt) >= Date.parse("2026-11-18T00:00:00.000Z")) {
    r.addedAt = "2026-11-01T00:00:00.000Z";
    scrubbed++;
  }
}
writeFileSync(seoulPath, `${JSON.stringify({ updatedAt: seoul.updatedAt, restaurants: seoul.restaurants })}\n`);
console.log("seoul scrubbed", scrubbed);
