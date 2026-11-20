// Rebuild web/data/regions.json counts from current public/regions/*.json.
//
//   node lunch-spots/scripts/rebuild-regions-index.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");

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

const now = new Date().toISOString();
const index = [];

for (const file of readdirSync(outDir).filter(
  (f) => f.endsWith(".json") && !f.includes(".summary"),
)) {
  const id = file.replace(/\.json$/, "");
  const label = ID_TO_LABEL[id];
  if (!label) continue;
  const j = JSON.parse(readFileSync(path.join(outDir, file), "utf8"));
  const rows = j.restaurants ?? [];
  const districts = new Map();
  for (const r of rows) {
    const d = r.district || r.area || "기타";
    districts.set(d, (districts.get(d) ?? 0) + 1);
  }
  index.push({
    id,
    label,
    count: rows.length,
    districts: [...districts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "ko"))
      .map(([name, count]) => ({ name, count })),
  });
}

index.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko"));
writeFileSync(indexFile, `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`);

const seoul = index.find((r) => r.id === "seoul");
console.log(
  JSON.stringify(
    {
      updatedAt: now,
      total: index.reduce((s, r) => s + r.count, 0),
      seoul: seoul?.count,
      districtSum: seoul?.districts.reduce((s, d) => s + d.count, 0),
      regions: index.map((r) => ({ id: r.id, count: r.count })),
    },
    null,
    2,
  ),
);
