// Export D1/local SQLite back to the current multi-file JSON layout.
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openDb } from "./client.mjs";
import { rowToRestaurant } from "./map.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");

const SUMMARY_FIELDS = [
  "slug",
  "name",
  "area",
  "district",
  "category",
  "subcategory",
  "location",
  "naverReviews",
  "naverScore",
  "rating",
  "collections",
  "addedAt",
  "updatedAt",
  "mentionCount",
  "tags",
  "walkMeters",
  "hours",
];

function summarize(r) {
  const out = {};
  for (const k of SUMMARY_FIELDS) {
    if (r[k] !== undefined) out[k] = r[k];
  }
  if (r.hours) {
    out.hours = {
      open: r.hours.open,
      close: r.hours.close,
      breakStart: r.hours.breakStart,
      breakEnd: r.hours.breakEnd,
      closedDays: r.hours.closedDays,
    };
  }
  return out;
}

function metaMap(db) {
  const rows = db.query(`SELECT key, value FROM meta`).results;
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function exportCatalog({ outRoot = webDir, backend = "local" } = {}) {
  const db = openDb(backend);
  const meta = metaMap(db);
  const now = new Date().toISOString();
  const places = db
    .query(`SELECT * FROM places WHERE deleted_at IS NULL`)
    .results;

  const byRegion = new Map();
  const office = [];
  for (const row of places) {
    const r = rowToRestaurant(row);
    if (row.in_office) office.push(r);
    if (row.in_region && row.region) {
      const list = byRegion.get(row.region) ?? [];
      list.push(r);
      byRegion.set(row.region, list);
    }
  }

  const regionsDir = path.join(outRoot, "public", "regions");
  mkdirSync(regionsDir, { recursive: true });
  mkdirSync(path.join(outRoot, "data"), { recursive: true });

  const index = [];
  for (const [regionId, rows] of [...byRegion.entries()].sort((a, b) => b[1].length - a[1].length)) {
    rows.sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
    const pretty = false;
    const payload = { updatedAt: now, restaurants: rows };
    writeFileSync(
      path.join(regionsDir, `${regionId}.json`),
      `${pretty ? JSON.stringify(payload, null, 2) : JSON.stringify(payload)}\n`,
    );
    const summary = {
      updatedAt: now,
      restaurants: rows.map(summarize),
    };
    writeFileSync(
      path.join(regionsDir, `${regionId}.summary.json`),
      `${JSON.stringify(summary)}\n`,
    );
    const districts = new Map();
    for (const r of rows) {
      const d = r.district || r.area || "기타";
      districts.set(d, (districts.get(d) ?? 0) + 1);
    }
    const label = {
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
    }[regionId] ?? regionId;
    index.push({
      id: regionId,
      label,
      count: rows.length,
      districts: [...districts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0], "ko"))
        .map(([name, count]) => ({ name, count })),
    });
  }
  index.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko"));
  writeFileSync(
    path.join(outRoot, "data", "regions.json"),
    `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`,
  );

  office.sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
  let officeBlob = null;
  try {
    officeBlob = meta.office ? JSON.parse(meta.office) : null;
  } catch {
    officeBlob = null;
  }
  // Preserve office coords from existing file if meta missing
  if (!officeBlob && existsSync(path.join(outRoot, "data", "restaurants.json"))) {
    try {
      officeBlob = JSON.parse(readFileSync(path.join(outRoot, "data", "restaurants.json"), "utf8")).office;
    } catch {
      /* ignore */
    }
  }
  const officeCatalog = {
    updatedAt: now,
    source: meta.catalog_source || "d1-export",
    ...(meta.last_message_ts ? { lastMessageTs: meta.last_message_ts } : {}),
    ...(officeBlob ? { office: officeBlob } : {}),
    restaurants: office,
  };
  writeFileSync(
    path.join(outRoot, "data", "restaurants.json"),
    `${JSON.stringify(officeCatalog, null, 2)}\n`,
  );

  db.close?.();
  return {
    regions: index.length,
    regionPlaces: places.filter((p) => p.in_region).length,
    officePlaces: office.length,
    outRoot,
  };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]).includes("export-catalog");
if (isCli) {
  const out = process.argv.includes("--to-tmp")
    ? path.join(root, ".cache", "export-out", "web")
    : webDir;
  if (process.argv.includes("--to-tmp")) mkdirSync(out, { recursive: true });
  console.log(JSON.stringify(exportCatalog({ outRoot: out, backend: "local" }), null, 2));
}
