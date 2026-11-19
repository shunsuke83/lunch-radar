// Remove non-food themes and places from web/public/regions + regions index.
// Also drop those folder lines from .naver-folders.local so future imports skip them.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");
const listFile = path.join(root, ".naver-folders.local");

const NON_FOOD_THEMES = new Set([
  "저장 많은 글램핑장 100선",
  "저장 많은 오토캠핑장 100선",
  "저장 많은 독립서점 30선",
  "저장 많은 온천 스파 50선",
  "저장 많은 키즈카페/놀이터 100선",
  "저장 많은 템플스테이 30선",
]);

/** Subcategory / category text that is not a place to eat or drink. */
const NON_FOOD_SUB =
  /동물원|워터파크|테마파크|놀이공원|캠핑|야영|글램핑|독립서점|^서점$|서점|도서|온천|스파(?!게티)|호텔|모텔|펜션|리조트|키즈카페|실내놀이터|^놀이터|템플스테이|미용실|이발소|안경원|꽃집|꽃배달|가전|수족관|편의점|세탁|약국|한약|병원|의원|학원|부동산|주유|주차장|박물관|미술관|갤러리|헬스|피트니스|찜질방|목욕탕|사우나|PC방|노래방|볼링|당구|영화관|은행|우체국|농업|농수산물|전자·가전|종합가전|신발|의류|옷가게|네일|교회|성당|사찰(?!요리|음식)|공방|화원|마트|슈퍼|오락|게임|골프장|요가|필라테스|문구|팬시|생활용품|인테리어|가구|휴대폰|통신|사진관|스튜디오|인쇄|복사|세탁소|코인세탁/;

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

function isNonFoodPlace(r) {
  const sub = `${r.subcategory ?? ""} ${r.category ?? ""}`;
  // Keep pasta (스파게티) despite 스파 in the regex via (?!게티) above
  if (NON_FOOD_SUB.test(sub)) return true;
  return false;
}

const now = new Date().toISOString();
let removedPlaces = 0;
let strippedThemes = 0;
const byProvince = new Map();

for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json"))) {
  const id = file.replace(/\.json$/, "");
  const label = ID_TO_LABEL[id];
  if (!label) continue;
  const j = JSON.parse(readFileSync(path.join(outDir, file), "utf8"));
  const kept = [];
  for (const r of j.restaurants ?? []) {
    if (isNonFoodPlace(r)) {
      removedPlaces++;
      continue;
    }
    const before = r.collections?.length ?? 0;
    const collections = (r.collections ?? []).filter((c) => !NON_FOOD_THEMES.has(c));
    strippedThemes += before - collections.length;
    // Drop places that only existed via non-food themes and have no food signal left
    if (before > 0 && collections.length === 0 && !r.category && !r.menu?.length) {
      // still keep if it has a food-ish subcategory already checked; only drop empty shells
      removedPlaces++;
      continue;
    }
    kept.push({
      ...r,
      ...(collections.length ? { collections } : { collections: undefined }),
      updatedAt: collections.length !== before ? now : r.updatedAt,
    });
    if (!collections.length) delete kept[kept.length - 1].collections;
  }
  byProvince.set(label, kept);
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

if (existsSync(listFile)) {
  const lines = readFileSync(listFile, "utf8").split(/\r?\n/);
  const filtered = lines.filter((line) => {
    const t = line.trim();
    if (!t || t.startsWith("#")) return true;
    const theme = t.split(/\s+/).slice(1).join(" ");
    return !theme || !NON_FOOD_THEMES.has(theme);
  });
  writeFileSync(listFile, filtered.join("\n").replace(/\n+$/, "\n"));
}

const total = index.reduce((s, r) => s + r.count, 0);
console.log(
  `removed places ${removedPlaces}, stripped theme tags ${strippedThemes}, remaining ${total}`,
);
console.log(
  "dropped themes:",
  [...NON_FOOD_THEMES].join(", "),
);
