// Classify remaining uncategorized places via Naver Place category,
// then apply overrides (and purge __nonfood__ if any).
//
//   node lunch-spots/scripts/classify-uncategorized-from-naver.mjs
//   node lunch-spots/scripts/classify-uncategorized-from-naver.mjs --check
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { groupOf } from "./category-rules.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const check = process.argv.includes("--check");

const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function apolloState(html) {
  const m = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{.*?\});\s*window\./s);
  if (m) return JSON.parse(m[1]);
  const m2 = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{[\s\S]*?\});/);
  return m2 ? JSON.parse(m2[1]) : {};
}

async function naverCategory(sid) {
  const res = await fetch(`https://m.place.naver.com/restaurant/${sid}/home`, {
    headers: {
      "User-Agent": UA,
      "Accept-Language": "ko-KR,ko;q=0.9",
      Referer: "https://map.naver.com/",
    },
  });
  if (res.status === 404) return { status: 404 };
  if (!res.ok) throw new Error(`Naver HTTP ${res.status} for ${sid}`);
  const html = await res.text();
  const state = apolloState(html);
  const base = state[`PlaceDetailBase:${sid}`] ?? {};
  return {
    status: 200,
    name: base.name,
    category: base.category,
    roadAddress: base.roadAddress,
    address: base.address,
  };
}

/** Map Naver category string → our group (or __nonfood__). */
function fromNaverCategory(category) {
  if (!category) return undefined;
  const c = String(category).trim();
  if (!c) return undefined;
  const mapped = groupOf(c);
  if (mapped) return mapped;
  // Broad food buckets Naver sometimes uses alone
  if (/퓨전/.test(c)) return "양식";
  if (/^음식점$|^식당$|^레스토랑$/.test(c)) return "한식";
  if (/술집|호프|바$|주점|이자카야|와인|칵테일/.test(c)) return "주점";
  if (/카페|디저트|베이커리|커피/.test(c)) return "카페·디저트";
  // Non-food signals
  if (
    /관광|명소|숙박|민박|펜션|호텔|캠핑|유원지|공원|전시|박물관|미술관|사진|정비|수리|의류|패션|정장|침구|문구|자재|금고|오토바이|도장|트로피|귀금속|시계|원단|섬유|보청기|뜨개|축산|건어물|식료품|곡류|농공|폐백|이용원|웨딩|건축|광고|산업용품|목공예|퀼트|악기|이불|담요|페리|해운|테마공원/.test(
      c,
    )
  ) {
    return "__nonfood__";
  }
  return undefined;
}

function loadUncategorized() {
  const out = [];
  for (const f of readdirSync(regionsDir).filter(
    (n) => n.endsWith(".json") && !n.includes(".summary"),
  )) {
    const region = f.replace(/\.json$/, "");
    const j = JSON.parse(readFileSync(path.join(regionsDir, f), "utf8"));
    for (const r of j.restaurants ?? []) {
      if (r.category && r.category !== "미분류") continue;
      out.push({
        key: `${region}/${r.slug}`,
        region,
        slug: r.slug,
        name: r.name,
        area: r.area,
        address: r.address || r.roadAddress || "",
        lat: r.location?.lat,
        lng: r.location?.lng,
      });
    }
  }
  return out;
}

const places = loadUncategorized();
console.log(JSON.stringify({ remaining: places.length }, null, 2));

const classifications = {};
const details = {};
const stats = { classified: 0, nonfood: 0, missed: 0, errors: 0, byCategory: {} };

for (let i = 0; i < places.length; i++) {
  const p = places[i];
  const m = /^naver-(\d+)$/.exec(p.slug);
  if (!m) {
    stats.missed++;
    details[p.key] = { reason: "no-naver-id", name: p.name };
    continue;
  }
  const sid = m[1];
  try {
    const hit = await naverCategory(sid);
    await sleep(1200);
    if (hit.status === 404 || !hit.category) {
      stats.missed++;
      details[p.key] = { reason: hit.status === 404 ? "404" : "no-category", sid, ...hit };
      continue;
    }
    const cat = fromNaverCategory(hit.category);
    details[p.key] = {
      sid,
      naverName: hit.name,
      naverCategory: hit.category,
      naverAddress: hit.roadAddress || hit.address,
      mapped: cat ?? null,
    };
    if (!cat) {
      stats.missed++;
      continue;
    }
    classifications[p.key] = cat;
    if (cat === "__nonfood__") {
      stats.nonfood++;
    } else {
      stats.classified++;
      stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
    }
  } catch (err) {
    stats.errors++;
    details[p.key] = { reason: "error", message: String(err?.message || err) };
  }
  if ((i + 1) % 5 === 0 || i === places.length - 1) {
    console.error(
      `progress ${i + 1}/${places.length} classified=${stats.classified} nonfood=${stats.nonfood} missed=${stats.missed}`,
    );
  }
}

console.log(JSON.stringify({ mode: check ? "check" : "apply", ...stats }, null, 2));
writeFileSync(
  path.join(here, "naver-classify-details.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), details, classifications }, null, 2)}\n`,
);

if (check) process.exit(0);

const overridesFile = path.join(here, "category-overrides.json");
const overrides = JSON.parse(readFileSync(overridesFile, "utf8"));
let overrideChanges = 0;
const purgeKeys = new Set();

for (const [key, value] of Object.entries(classifications)) {
  if (value === "__nonfood__") {
    purgeKeys.add(key);
    if (key in overrides.places) {
      delete overrides.places[key];
      overrideChanges++;
    }
    continue;
  }
  if (overrides.places[key] !== value) {
    overrides.places[key] = value;
    overrideChanges++;
  }
}

overrides.updatedAt = new Date().toISOString();
writeFileSync(overridesFile, `${JSON.stringify(overrides, null, 2)}\n`);

/** Remove purgeKeys from a catalog JSON file. */
function purgeFile(file) {
  if (!existsSync(file)) return 0;
  const text = readFileSync(file, "utf8");
  const j = JSON.parse(text);
  const region = path.basename(file, ".json").replace(/\.summary$/, "");
  const before = (j.restaurants ?? []).length;
  j.restaurants = (j.restaurants ?? []).filter((r) => !purgeKeys.has(`${region}/${r.slug}`));
  const removed = before - j.restaurants.length;
  if (!removed) return 0;
  j.updatedAt = new Date().toISOString();
  const pretty = /^\{\r?\n\s+"/.test(text);
  writeFileSync(file, `${pretty ? JSON.stringify(j, null, 2) : JSON.stringify(j)}\n`);
  return removed;
}

let purged = 0;
if (purgeKeys.size) {
  for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json"))) {
    purged += purgeFile(path.join(regionsDir, f));
  }
}

console.log(
  JSON.stringify(
    { overrideChanges, purgeKeys: [...purgeKeys], purgedRows: purged, sampleMissed: places.filter((p) => !(p.key in classifications)).slice(0, 15).map((p) => p.key) },
    null,
    2,
  ),
);
