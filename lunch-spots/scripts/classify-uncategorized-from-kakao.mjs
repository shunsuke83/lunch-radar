// Classify foodish uncategorized places via Kakao Local category_name,
// then purge non-food candidates from region/office catalogs.
//
//   node lunch-spots/scripts/classify-uncategorized-from-kakao.mjs
//   node lunch-spots/scripts/classify-uncategorized-from-kakao.mjs --check
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { groupOf } from "./category-rules.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const officeFile = path.join(webDir, "data", "restaurants.json");
const check = process.argv.includes("--check");

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

const review = JSON.parse(readFileSync(path.join(here, "uncategorized-review.json"), "utf8"));
const CATEGORIES = new Set(review.categories);

/** Map Kakao category_name path → our group. */
function fromKakaoCategory(categoryName) {
  if (!categoryName) return undefined;
  const parts = categoryName.split(">").map((s) => s.trim()).filter(Boolean);
  const joined = parts.join(" ");
  // Strong path signals first.
  if (/술집|호프|요리주점|이자카야|바$|와인|칵테일/.test(joined)) return "주점";
  if (/카페|디저트|베이커리|커피|차\b|도넛|아이스크림/.test(joined)) return "카페·디저트";
  if (/중식|중국요리|중국음식/.test(joined)) return "중식";
  if (/일식|일본식|초밥|스시|라멘|돈가스|돈까스/.test(joined)) return "일식";
  if (/양식|이탈리|프렌치|스테이크|패밀리레스토랑|햄버거|피자|파스타/.test(joined)) return "양식";
  if (/아시아음식|베트남|태국|인도|멕시코|중동/.test(joined)) return "아시안";
  if (/분식|김밥|떡볶이|만두/.test(joined)) return "분식";
  if (/샐러드|샌드위치|도시락/.test(joined) && /샐러드/.test(joined)) return "샐러드";
  if (/한식|육류|해물|국수|국밥|백반|찌개|치킨|닭|구이|족발|보쌈/.test(joined)) return "한식";
  if (/음식점/.test(joined) && !/카페|술집/.test(joined)) {
    // Fall back to leaf segment rules.
    const leaf = parts[parts.length - 1] || "";
    return groupOf(leaf) || groupOf(joined);
  }
  // Non-food kakao groups
  if (/가정|생활|스포츠|여행|교통|교육|의료|금융|부동산|기업|공공/.test(parts[0] || "")) {
    return "__nonfood__";
  }
  return groupOf(joined);
}

async function kakaoKeyword(name, near) {
  const attempts = near
    ? [
        { x: near.lng, y: near.lat, radius: 500, category: "FD6" },
        { x: near.lng, y: near.lat, radius: 1000, category: "FD6" },
        { x: near.lng, y: near.lat, radius: 1000, category: "CE7" },
        { x: near.lng, y: near.lat, radius: 2000, category: "" },
      ]
    : [{ category: "FD6" }, { category: "CE7" }, { category: "" }];

  for (const a of attempts) {
    const params = new URLSearchParams({
      query: name,
      size: "5",
      sort: near ? "distance" : "accuracy",
    });
    if (a.x != null) {
      params.set("x", String(a.x));
      params.set("y", String(a.y));
      params.set("radius", String(a.radius ?? 1000));
    }
    if (a.category) params.set("category_group_code", a.category);
    const res = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?${params}`, {
      headers: { Authorization: `KakaoAK ${KAKAO_KEY}` },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Kakao HTTP ${res.status}: ${body.slice(0, 160)}`);
    }
    const { documents = [] } = await res.json();
    const norm = (s) => s.replace(/\s+/g, "").toLowerCase();
    const want = norm(name);
    const hit =
      documents.find((d) => norm(d.place_name) === want) ||
      documents.find((d) => norm(d.place_name).includes(want) || want.includes(norm(d.place_name)));
    if (hit) return hit;
  }
  return undefined;
}

function loadCatalogIndex() {
  const byKey = new Map();
  for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json") && !n.includes(".summary"))) {
    const region = f.replace(/\.json$/, "");
    const file = path.join(regionsDir, f);
    const j = JSON.parse(readFileSync(file, "utf8"));
    for (const r of j.restaurants ?? []) {
      byKey.set(`${region}/${r.slug}`, { region, file, r, pretty: false });
    }
  }
  if (existsSync(officeFile)) {
    const j = JSON.parse(readFileSync(officeFile, "utf8"));
    for (const r of j.restaurants ?? []) {
      byKey.set(`office/${r.slug}`, { region: "office", file: officeFile, r, pretty: false });
    }
  }
  return byKey;
}

const catalog = loadCatalogIndex();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const foodish = review.places.filter((p) => !p.nonFoodCandidate);
const nonFoodKeys = review.places.filter((p) => p.nonFoodCandidate).map((p) => p.key);

const classifications = {};
const stats = {
  foodish: foodish.length,
  classified: 0,
  nonfoodFromKakao: 0,
  missed: 0,
  errors: 0,
  byCategory: {},
};

for (let i = 0; i < foodish.length; i++) {
  const item = foodish[i];
  const entry = catalog.get(item.key);
  const near = entry?.r?.location;
  try {
    const hit = await kakaoKeyword(item.name, near);
    await sleep(120);
    if (!hit) {
      stats.missed++;
      continue;
    }
    const cat = fromKakaoCategory(hit.category_name || "");
    if (!cat) {
      stats.missed++;
      continue;
    }
    if (cat === "__nonfood__") {
      classifications[item.key] = "__nonfood__";
      stats.nonfoodFromKakao++;
      continue;
    }
    if (!CATEGORIES.has(cat)) {
      stats.missed++;
      continue;
    }
    classifications[item.key] = cat;
    stats.classified++;
    stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
  } catch (err) {
    stats.errors++;
    console.error(`fail ${item.key}: ${err instanceof Error ? err.message : err}`);
    await sleep(500);
  }
  if ((i + 1) % 25 === 0) {
    console.error(`progress ${i + 1}/${foodish.length} classified=${stats.classified} missed=${stats.missed}`);
  }
}

// Merge into review template + overrides
const templateFile = path.join(here, "uncategorized-review-template.json");
const template = JSON.parse(readFileSync(templateFile, "utf8"));
for (const key of nonFoodKeys) template.places[key] = "__nonfood__";
for (const [key, value] of Object.entries(classifications)) {
  template.places[key] = value;
}

const overridesFile = path.join(here, "category-overrides.json");
const overrides = JSON.parse(readFileSync(overridesFile, "utf8"));
let overrideChanges = 0;
for (const [key, value] of Object.entries(classifications)) {
  if (value === "__nonfood__") {
    if (overrides.places[key] !== null) {
      overrides.places[key] = null;
      overrideChanges++;
    }
    continue;
  }
  if (overrides.places[key] !== value) {
    overrides.places[key] = value;
    overrideChanges++;
  }
}
for (const key of nonFoodKeys) {
  if (overrides.places[key] !== null) {
    overrides.places[key] = null;
    overrideChanges++;
  }
}

const purgeKeys = new Set([
  ...nonFoodKeys,
  ...Object.entries(classifications)
    .filter(([, v]) => v === "__nonfood__")
    .map(([k]) => k),
]);

console.log(
  JSON.stringify(
    {
      mode: check ? "check" : "apply",
      ...stats,
      overrideChanges,
      purgeCount: purgeKeys.size,
      sampleMissed: foodish
        .filter((p) => !(p.key in classifications))
        .slice(0, 15)
        .map((p) => p.key),
    },
    null,
    2,
  ),
);

if (check) process.exit(0);

writeFileSync(templateFile, `${JSON.stringify(template, null, 2)}\n`);
overrides.updatedAt = new Date().toISOString();
writeFileSync(overridesFile, `${JSON.stringify(overrides, null, 2)}\n`);

writeFileSync(
  path.join(here, "nonfood-candidates.json"),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      about: "Purged from region/office catalogs (non-restaurants).",
      count: purgeKeys.size,
      keys: [...purgeKeys].sort(),
    },
    null,
    2,
  )}\n`,
);

/** Remove purgeKeys from a catalog JSON file. */
function purgeFile(file) {
  if (!existsSync(file)) return 0;
  const text = readFileSync(file, "utf8");
  const j = JSON.parse(text);
  const region =
    file === officeFile ? "office" : path.basename(file, ".json").replace(/\.summary$/, "");
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
for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json"))) {
  purged += purgeFile(path.join(regionsDir, f));
}
purged += purgeFile(officeFile);

// Drop purged keys from overrides to keep list tidy
for (const key of purgeKeys) {
  if (key in overrides.places) delete overrides.places[key];
}
writeFileSync(overridesFile, `${JSON.stringify(overrides, null, 2)}\n`);

console.log(JSON.stringify({ purgedRows: purged, overridesLeft: Object.keys(overrides.places).length }, null, 2));
