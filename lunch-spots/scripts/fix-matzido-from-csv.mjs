// Fix curated matzido places using the source CSV address (authoritative),
// then Kakao-geocode with name+address (not bare name).
//
//   node lunch-spots/scripts/fix-matzido-from-csv.mjs
//   node lunch-spots/scripts/fix-matzido-from-csv.mjs --check
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseRegion, isValidDistrict, PROVINCES } from "./lib/region-parse.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const check = process.argv.includes("--check");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadEnv() {
  const envPath = path.join(root, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadEnv();
const KAKAO_KEY = process.env.KAKAO_REST_API_KEY?.trim();
if (!KAKAO_KEY) throw new Error("KAKAO_REST_API_KEY missing");

const csvPath = process.argv.find((a) => a.endsWith(".csv"))
  ? path.resolve(process.argv.find((a) => a.endsWith(".csv")))
  : path.join(root, "..", "tmp-matzido", "matzido_collector", "naver_matzido_2026_places.csv");

const LABEL_TO_ID = Object.fromEntries(Object.entries(PROVINCES).map(([k, v]) => [k, v.id]));

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
    for (let c = 0; c < header.length; c++) row[header[c]] = readCell();
    rows.push(row);
  }
  return rows;
}

function regionOf(address, districtHint) {
  const r = parseRegion(address);
  if (!r || !isValidDistrict(r.district)) return null;
  return { ...r, id: LABEL_TO_ID[r.province] };
}

function sameRegion(a, b) {
  if (!a || !b) return false;
  return a.province === b.province && a.district === b.district;
}

async function kakaoGeocode(name, address) {
  const districtHint = address.split(/\s+/).find((t) => /(시|군|구)$/.test(t));
  const queries = [
    `${name} ${address}`,
    districtHint ? `${name} ${districtHint}` : null,
    address,
    name,
  ].filter(Boolean);
  for (const query of queries) {
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=5`;
    const res = await fetch(url, { headers: { Authorization: `KakaoAK ${KAKAO_KEY}` } });
    if (!res.ok) {
      if (res.status === 429) {
        await sleep(5000);
        continue;
      }
      continue;
    }
    const { documents = [] } = await res.json();
    const want = regionOf(address);
    const norm = (s) => String(s ?? "").replace(/\s+/g, "").toLowerCase();
    const wantName = norm(name);
    const ranked = documents
      .map((d) => ({
        name: d.place_name,
        address: d.road_address_name || d.address_name,
        lat: Number(d.y),
        lng: Number(d.x),
        kakaoId: d.id,
        kakaoUrl: d.place_url,
      }))
      .filter((h) => Number.isFinite(h.lat) && Number.isFinite(h.lng));
    // Prefer same region + name match
    const hit =
      ranked.find((h) => {
        const hr = regionOf(h.address);
        return sameRegion(want, hr) && (norm(h.name) === wantName || norm(h.name).includes(wantName) || wantName.includes(norm(h.name)));
      }) ||
      ranked.find((h) => sameRegion(want, regionOf(h.address))) ||
      ranked.find((h) => norm(h.name) === wantName);
    if (hit) return hit;
    await sleep(80);
  }
  return null;
}

if (!existsSync(csvPath)) throw new Error(`missing csv ${csvPath}`);
const csv = parseCsv(readFileSync(csvPath, "utf8"));
/** @type {Map<string, { name: string, address: string }>} */
const byId = new Map();
for (const row of csv) {
  const id = String(row["플레이스 ID"] ?? "").trim();
  const name = String(row["상호명(네이버 표기)"] ?? row["상호명(화면표시)"] ?? "").trim();
  const address = String(row["주소"] ?? "").trim();
  if (id && address) byId.set(id, { name, address });
}
console.log(JSON.stringify({ csvRows: csv.length, withAddress: byId.size }, null, 2));

const regions = new Map();
for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json") && !n.includes(".summary"))) {
  const id = f.replace(/\.json$/, "");
  const file = path.join(regionsDir, f);
  const text = readFileSync(file, "utf8");
  regions.set(id, { file, j: JSON.parse(text), pretty: /^\{\r?\n\s+"/.test(text) });
}

const stats = {
  scanned: 0,
  noCsv: 0,
  ok: 0,
  mismatch: 0,
  moved: 0,
  refreshed: 0,
  geocodeFail: 0,
  shortAddr: 0,
};
const mismatches = [];
const moves = [];

for (const [regionId, entry] of regions) {
  for (const r of entry.j.restaurants ?? []) {
    if (r.curated?.by !== "naver-matzido-2026") continue;
    const m = /^naver-(\d+)$/.exec(r.slug);
    if (!m) continue;
    stats.scanned++;
    const csvRow = byId.get(m[1]);
    if (!csvRow) {
      stats.noCsv++;
      continue;
    }
    const csvReg = regionOf(csvRow.address);
    const catReg = regionOf(r.address) || (r.district ? { district: r.district, province: undefined } : null);
    if (!csvReg) {
      stats.shortAddr++;
      continue;
    }
    const mismatch =
      !catReg ||
      (catReg.province && csvReg.province && catReg.province !== csvReg.province) ||
      (catReg.district && csvReg.district && catReg.district !== csvReg.district);

    if (!mismatch) {
      stats.ok++;
      // Still upgrade bare village-only address if CSV is richer
      if (!check && csvRow.address && csvRow.address !== r.address && /\d/.test(csvRow.address)) {
        r.address = csvRow.address;
        r.updatedAt = new Date().toISOString();
        stats.refreshed++;
      }
      continue;
    }

    stats.mismatch++;
    mismatches.push({
      key: `${regionId}/${r.slug}`,
      name: r.name,
      from: { regionId, address: r.address, district: r.district },
      csv: csvRow.address,
      to: csvReg,
    });
    moves.push({ regionId, r, csvRow, csvReg, sid: m[1] });
  }
}

console.log(JSON.stringify({ ...stats, moveQueue: moves.length }, null, 2));

for (let i = 0; i < moves.length; i++) {
  const { regionId, r, csvRow, csvReg, sid } = moves[i];
  const hit = await kakaoGeocode(csvRow.name || r.name, csvRow.address);
  await sleep(120);
  if (!hit) {
    stats.geocodeFail++;
    // Still move with CSV address; keep old coords as last resort but prefer CSV region
    if (!check) {
      const from = regions.get(regionId);
      const to = regions.get(csvReg.id);
      if (from && to) {
        const idx = (from.j.restaurants ?? []).findIndex((x) => x.slug === r.slug);
        if (idx >= 0) {
          const [row] = from.j.restaurants.splice(idx, 1);
          row.address = csvRow.address;
          row.district = csvReg.district;
          row.area = csvReg.district;
          row.updatedAt = new Date().toISOString();
          row.curated = { ...(row.curated ?? {}), geoFixedFrom: regionId, geoSource: "csv" };
          if (!(to.j.restaurants ?? []).some((x) => x.slug === row.slug)) to.j.restaurants.push(row);
          stats.moved++;
        }
      }
    }
  } else if (!check) {
    const from = regions.get(regionId);
    const to = regions.get(csvReg.id);
    if (from && to) {
      const idx = (from.j.restaurants ?? []).findIndex((x) => x.slug === r.slug);
      if (idx >= 0) {
        const [row] = from.j.restaurants.splice(idx, 1);
        row.address = csvRow.address;
        row.district = csvReg.district;
        row.area = csvReg.district;
        row.location = { lat: hit.lat, lng: hit.lng };
        row.place = { kakaoId: String(hit.kakaoId), kakaoUrl: hit.kakaoUrl };
        row.updatedAt = new Date().toISOString();
        row.curated = { ...(row.curated ?? {}), geoFixedFrom: regionId, geoSource: "csv+kakao" };
        if (!(to.j.restaurants ?? []).some((x) => x.slug === row.slug)) to.j.restaurants.push(row);
        stats.moved++;
      }
    }
  }
  if ((i + 1) % 50 === 0 || i === moves.length - 1) {
    console.error(`geocode ${i + 1}/${moves.length} moved=${stats.moved} fail=${stats.geocodeFail}`);
  }
}

if (!check) {
  for (const entry of regions.values()) {
    entry.j.restaurants = (entry.j.restaurants ?? []).sort((a, b) =>
      String(a.name).localeCompare(String(b.name), "ko"),
    );
    entry.j.updatedAt = new Date().toISOString();
    writeFileSync(
      entry.file,
      `${entry.pretty ? JSON.stringify(entry.j, null, 2) : JSON.stringify(entry.j)}\n`,
    );
  }
}

writeFileSync(
  path.join(here, "matzido-csv-geo-report.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), stats, mismatches }, null, 2)}\n`,
);
console.log(JSON.stringify({ mode: check ? "check" : "apply", stats, sample: mismatches.slice(0, 10) }, null, 2));
