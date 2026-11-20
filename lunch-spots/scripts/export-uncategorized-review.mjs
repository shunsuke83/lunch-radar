// Build a review pack for remaining uncategorized places.
//
//   node lunch-spots/scripts/export-uncategorized-review.mjs
//
// Writes:
//   uncategorized-review.md
//   uncategorized-review.json
//   uncategorized-review-template.json
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.resolve(here, "..", "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const officeFile = path.join(webDir, "data", "restaurants.json");
const priorMd = path.join(here, "uncategorized-places-reviewed-chatgpt.md");

const CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "분식",
  "샐러드",
  "카페·디저트",
  "주점",
];

const NON_FOOD =
  /동물원|워터파크|테마파크|놀이공원|서점|도서|사진|스튜디오|신발|의류|옷가게|미용|헤어|네일|병원|약국|호텔|리조트|펜션|캠핑|주차장|주유소|은행|부동산|학원|교회|성당|사찰(?!요리|음식)|박물관|미술관|갤러리|공방|꽃집|화원|세탁|편의점|마트|슈퍼|PC방|노래방|볼링|당구|골프|헬스|피트니스|요가|필라테스|사우나|목욕|찜질|온천|스파(?!게티)|키즈카페|만화|오락|게임|남성정장|자동차정비|자동차용품|침구|커튼|귀금속|시계|식료품|사무용품|지역명소|주방용품|결혼예물|벽지|장판|마루|건축|토목|이용원|폐백|이바지|옥외|전시광고|농공|곡류|곡물|축산|뜨개|보청기|건강기능|웨딩|목공예|건어물|종합패션|판촉|기념품|금고|도배|오토바이|트로피|상패|도장|산업용품|육류가공|건축자재|퀼트|악기|유원지|자연명소|민박|페리|해운|테마공원|디지털인화|이불|담요|원단|섬유|직물|전시관|정장|양복|혼수|창호|바버|광고|문구|지물|영농|농산|굴비|한복|테일러|카정비/;

const NONFOOD_MARKER = "__nonfood__";

function esc(s) {
  return String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function naverUrl(r) {
  const u = r.naver?.url;
  if (u) return u.replace(/^http:/, "https:");
  const m = /^naver-(\d+)$/.exec(r.slug ?? "");
  if (m) return `https://m.place.naver.com/restaurant/${m[1]}/home`;
  return "";
}

function kakaoUrl(r) {
  const u = r.place?.kakaoUrl;
  if (u) return u.replace(/^http:/, "https:");
  const m = /^kakao-(\d+)$/.exec(r.slug ?? "");
  if (m) return `https://place.map.kakao.com/${m[1]}`;
  if (r.place?.kakaoId) return `https://place.map.kakao.com/${r.place.kakaoId}`;
  return "";
}

/** Parse prior review MD table rows that carry a `region/slug` key. */
function loadPriorNotes(file) {
  const out = new Map();
  if (!existsSync(file)) return out;
  const text = readFileSync(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith("|")) continue;
    const keyMatch = /`([a-z]+\/[a-z0-9-]+)`/.exec(line);
    if (!keyMatch) continue;
    const cells = line.split("|").map((c) => c.trim());
    // | region | name | district | `key` | label | note |
    if (cells.length < 7) continue;
    const key = keyMatch[1];
    const label = cells[5] || "";
    const note = cells[6] || "";
    if (!label || label === "유형" || label === "분류") continue;
    let priorLabel = "미확정";
    if (label.includes("비식당")) priorLabel = "비식당";
    else if (label.includes("미확정")) priorLabel = "미확정";
    else if (CATEGORIES.includes(label)) priorLabel = "이미분류됨";
    else priorLabel = label.slice(0, 40);
    out.set(key, { priorLabel, priorNote: note });
  }
  return out;
}

function collectUncategorized() {
  const rows = [];
  for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json") && !n.includes(".summary"))) {
    const region = f.replace(/\.json$/, "");
    const j = JSON.parse(readFileSync(path.join(regionsDir, f), "utf8"));
    for (const r of j.restaurants ?? []) {
      if (r.category) continue;
      rows.push({ region, r });
    }
  }
  if (existsSync(officeFile)) {
    const j = JSON.parse(readFileSync(officeFile, "utf8"));
    for (const r of j.restaurants ?? []) {
      if (r.category) continue;
      rows.push({ region: "office", r });
    }
  }
  return rows;
}

function toItem({ region, r }, prior) {
  const key = `${region}/${r.slug}`;
  const sub = (r.subcategory ?? "").trim();
  const priorHit = prior.get(key);
  const subNonFood = sub && NON_FOOD.test(sub);
  let priorLabel = priorHit?.priorLabel ?? "";
  let priorNote = priorHit?.priorNote ?? "";
  if (!priorLabel && subNonFood) {
    priorLabel = "비식당후보";
    priorNote = priorNote || `종류 값 '${sub}'이 비식당 패턴과 맞음`;
  }
  if (!priorLabel) priorLabel = "없음";

  return {
    key,
    name: r.name ?? "",
    region,
    slug: r.slug ?? "",
    subcategory: sub || null,
    district: r.district || r.area || null,
    address: r.place?.address || r.address || null,
    collections: r.collections ?? [],
    naverUrl: naverUrl(r) || null,
    kakaoUrl: kakaoUrl(r) || null,
    priorLabel,
    priorNote: priorNote || null,
    suggestedCategory: null,
    nonFoodCandidate: priorLabel === "비식당" || priorLabel === "비식당후보" || !!subNonFood,
  };
}

const prior = loadPriorNotes(priorMd);
const items = collectUncategorized()
  .map((row) => toItem(row, prior))
  .sort((a, b) => {
    if (a.nonFoodCandidate !== b.nonFoodCandidate) return a.nonFoodCandidate ? -1 : 1;
    if (a.region !== b.region) return a.region.localeCompare(b.region);
    return a.name.localeCompare(b.name, "ko");
  });

const nonFood = items.filter((i) => i.nonFoodCandidate);
const foodish = items.filter((i) => !i.nonFoodCandidate);

function linkCell(url, label) {
  if (!url) return "—";
  return `[${label}](${url})`;
}

function sectionMd(title, list) {
  const lines = [`## ${title} (${list.length})`, ""];
  const byRegion = new Map();
  for (const i of list) {
    if (!byRegion.has(i.region)) byRegion.set(i.region, []);
    byRegion.get(i.region).push(i);
  }
  const regionOrder = [...byRegion.keys()].sort((a, b) => {
    if (a === "office") return 1;
    if (b === "office") return -1;
    return byRegion.get(b).length - byRegion.get(a).length || a.localeCompare(b);
  });
  for (const region of regionOrder) {
    const label = region === "office" ? "회사 근처" : region;
    const rows = byRegion.get(region);
    lines.push(`### ${label} (${rows.length})`, "");
    lines.push(
      "| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |",
    );
    lines.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |");
    for (const i of rows) {
      const cols = (i.collections ?? []).join(", ") || "—";
      lines.push(
        `| ${esc(i.name)} | ${esc(i.district || "—")} | ${esc(i.subcategory || "—")} | ${esc(cols)} | ${esc(i.priorLabel)} | ${esc(i.priorNote || "—")} | ${linkCell(i.naverUrl, "N")} | ${linkCell(i.kakaoUrl, "K")} | \`${i.key}\` |  |`,
      );
    }
    lines.push("");
  }
  return lines;
}

const md = [
  "# 미분류 재분류 검토",
  "",
  `- 생성: ${new Date().toISOString()}`,
  `- 총 **${items.length}**곳 (비식당 후보 ${nonFood.length} · 음식점 후보 ${foodish.length})`,
  "",
  "## 사용 방법",
  "",
  "1. 아래 표에서 네이버(N)·카카오(K) 링크를 열어 확인한다.",
  "2. 음식 종류면 `uncategorized-review-template.json`의 해당 키에 `한식`·`중식`·`일식`·`양식`·`아시안`·`분식`·`샐러드`·`카페·디저트`·`주점` 중 하나를 적는다.",
  `3. 식당이 아니면 \`\"${NONFOOD_MARKER}\"\` 를 적는다 (카탈로그에서 당장 삭제하지 않고 후보 목록으로만 모음).`,
  "4. 적용: `node lunch-spots/scripts/apply-uncategorized-review.mjs`",
  "",
  "| 지역 | 비식당 후보 | 음식점 후보 | 합계 |",
  "| --- | ---: | ---: | ---: |",
];

const regions = [...new Set(items.map((i) => i.region))];
for (const region of regions.sort((a, b) => {
  const ca = items.filter((i) => i.region === a).length;
  const cb = items.filter((i) => i.region === b).length;
  return cb - ca || a.localeCompare(b);
})) {
  const label = region === "office" ? "회사 근처" : region;
  const nf = nonFood.filter((i) => i.region === region).length;
  const fd = foodish.filter((i) => i.region === region).length;
  md.push(`| ${label} | ${nf} | ${fd} | ${nf + fd} |`);
}
md.push("");
md.push(...sectionMd("비식당 후보", nonFood));
md.push(...sectionMd("음식점 후보 (미확정)", foodish));

const reviewJson = {
  generatedAt: new Date().toISOString(),
  categories: CATEGORIES,
  nonFoodMarker: NONFOOD_MARKER,
  count: items.length,
  nonFoodCount: nonFood.length,
  foodishCount: foodish.length,
  places: items,
};

const template = {
  generatedAt: new Date().toISOString(),
  about:
    "Fill each key with a food category, null (keep uncategorized), or __nonfood__. Then run apply-uncategorized-review.mjs.",
  categories: CATEGORIES,
  nonFoodMarker: NONFOOD_MARKER,
  places: Object.fromEntries(items.map((i) => [i.key, null])),
};

writeFileSync(path.join(here, "uncategorized-review.md"), `${md.join("\n")}\n`);
writeFileSync(path.join(here, "uncategorized-review.json"), `${JSON.stringify(reviewJson, null, 2)}\n`);
writeFileSync(
  path.join(here, "uncategorized-review-template.json"),
  `${JSON.stringify(template, null, 2)}\n`,
);

console.log(
  JSON.stringify(
    {
      total: items.length,
      nonFood: nonFood.length,
      foodish: foodish.length,
      priorHits: items.filter((i) => i.priorLabel !== "없음" && i.priorLabel !== "비식당후보").length,
      wrote: [
        "uncategorized-review.md",
        "uncategorized-review.json",
        "uncategorized-review-template.json",
      ],
    },
    null,
    2,
  ),
);
