// Reclassify mis-tagged categories from subcategory text; dedupe collections.
// Does not invent 한식 from a catch-all — only upgrades/clears when subcategory speaks.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");

const CATEGORY_RULES = [
  ["카페·디저트", /카페|디저트|베이커리|빵|케이크|도넛|아이스크림|빙수|떡|와플|초콜릿|차$|전통찻집|커피/],
  ["주점", /술집|주점|바\(BAR\)|^바$|호프|맥주|이자카야|포차|와인|칵테일|요리주점|전통주/],
  ["분식", /분식|김밥|떡볶이|순대$|라면|만두/],
  ["샐러드", /샐러드|포케|비건/],
  ["아시안", /베트남|태국|인도|아시아|쌀국수|중동|멕시코|동남아|대만|네팔|터키/],
  ["중식", /중식|중국|마라|양꼬치|딤섬|짬뽕|짜장/],
  ["일식", /일식|일본|초밥|스시|라멘|돈가스|돈까스|우동|소바|오마카세|이자카야|덮밥|카레|사케|장어/],
  ["양식", /양식|이탈리|프랑스|스페인|스테이크|파스타|피자|햄버거|버거|브런치|멕시칸|그리스|유럽|아메리칸|패밀리레스토랑|뷔페/],
  [
    "한식",
    /한식|한정식|국밥|국수|냉면|밀면|감자탕|곱창|막창|육회|삼겹|갈비|백반|찌개|전골|보쌈|족발|닭볶|찜닭|오리|막국수|칼국수|해장|한우|돼지|소고기|해물|생선|회$|횟집|도시락|죽$|정식|순대|순댓국|육류|고기요리|고기$|치킨|닭강정|닭요리|닭갈비|곰탕|설렁탕|도가니|뼈해장|부대찌개|된장|김치찌개|순두부|비빔밥|돌솥|콩국|수제비|만두|빈대떡|파전|추어|매운탕|아구|백숙|삼계|불고기|제육|두루치기|쌈밥|주먹밥|컵밥|덮밥|샤브|육개장|설렁|감자옹심|보리밥|산채|비빔|사찰요리|사찰음식|발우|한정식|국밥|곰탕/,
  ],
];

function groupOf(text) {
  if (!text) return undefined;
  return CATEGORY_RULES.find(([, re]) => re.test(text))?.[0];
}

const now = new Date().toISOString();
let reclassed = 0;
let cleared = 0;
let deduped = 0;

for (const file of readdirSync(outDir).filter((f) => f.endsWith(".json") && !f.includes(".summary"))) {
  const fp = path.join(outDir, file);
  const j = JSON.parse(readFileSync(fp, "utf8"));
  let changed = false;
  for (const r of j.restaurants ?? []) {
    const hint = String(r.subcategory ?? "").trim();
    if (hint) {
      const next = groupOf(hint);
      if (next) {
        if (r.category !== next) {
          r.category = next;
          reclassed++;
          changed = true;
        }
      } else if (r.category === "한식") {
        // Subcategory present but no food signal — drop false catch-all 한식.
        delete r.category;
        cleared++;
        changed = true;
      }
    }
    if (Array.isArray(r.collections) && r.collections.length) {
      const unique = [...new Set(r.collections)];
      if (unique.length !== r.collections.length) {
        r.collections = unique.sort((a, b) => a.localeCompare(b, "ko"));
        deduped++;
        changed = true;
      }
    }
  }
  if (changed) {
    j.updatedAt = now;
    writeFileSync(fp, `${JSON.stringify(j)}\n`);
  }
}

console.log(`reclassed ${reclassed}, cleared false 한식 ${cleared}, deduped collections ${deduped}`);
