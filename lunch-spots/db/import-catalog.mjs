// Import current JSON catalogs into D1/local SQLite.
// Merges office∩region overlaps per db/DECISIONS.md.
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openDb, insertPlaceSql, placeParams } from "./client.mjs";
import { restaurantToRow } from "./map.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const officeFile = path.join(webDir, "data", "restaurants.json");
const dryRun = process.argv.includes("--dry-run");

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

function unionArr(a = [], b = []) {
  return [...new Set([...(a ?? []), ...(b ?? [])])].sort((x, y) => String(x).localeCompare(String(y), "ko"));
}

function earliest(...vals) {
  const ok = vals.filter(Boolean).sort();
  return ok[0];
}
function latest(...vals) {
  const ok = vals.filter(Boolean).sort();
  return ok[ok.length - 1];
}

/** Merge office + region restaurant into one canonical object + legacy slugs. */
export function mergeOfficeRegion(officeR, regionR, regionId) {
  const officeNaver = officeR?.naver?.placeId;
  const regionNaver = regionR?.naver?.placeId;
  const naverId = officeNaver || regionNaver;
  let slug =
    (naverId ? `naver-${naverId}` : null) ||
    officeR?.slug ||
    regionR?.slug;
  const legacy = new Set();
  for (const s of [officeR?.slug, regionR?.slug]) {
    if (s && s !== slug) legacy.add(s);
  }
  const base = {
    ...(regionR ?? {}),
    ...(officeR ?? {}),
    slug,
    name: officeR?.name || regionR?.name,
    tags: unionArr(officeR?.tags, regionR?.tags),
    collections: unionArr(officeR?.collections, regionR?.collections),
    mentionCount: Math.max(officeR?.mentionCount ?? 0, regionR?.mentionCount ?? 0),
    addedAt: earliest(officeR?.addedAt, regionR?.addedAt),
    updatedAt: latest(officeR?.updatedAt, regionR?.updatedAt),
  };
  // Office wins map/enrich fields when present
  if (officeR?.address) base.address = officeR.address;
  if (officeR?.location) base.location = officeR.location;
  if (officeR?.naver) base.naver = officeR.naver;
  if (officeR?.place) base.place = officeR.place;
  if (officeR?.rating) base.rating = officeR.rating;
  if (officeR?.walkMeters != null) base.walkMeters = officeR.walkMeters;
  if (officeR?.walkMinutes != null) base.walkMinutes = officeR.walkMinutes;
  if (officeR?.walkFromMap != null) base.walkFromMap = officeR.walkFromMap;
  if (officeR?.naverReviews != null) base.naverReviews = officeR.naverReviews;
  if (officeR?.naverScore != null) base.naverScore = officeR.naverScore;
  if (officeR?.menu) base.menu = officeR.menu;
  if (officeR?.hours) base.hours = officeR.hours;
  if (officeR?.notes) base.notes = officeR.notes;
  if (officeR?.curated) base.curated = officeR.curated;
  if (officeR?.category) base.category = officeR.category;
  else if (regionR?.category) base.category = regionR.category;
  if (officeR?.subcategory) base.subcategory = officeR.subcategory;
  else if (regionR?.subcategory) base.subcategory = regionR.subcategory;
  if (!base.district && regionR?.district) base.district = regionR.district;
  if (!base.area && (officeR?.area || regionR?.area)) base.area = officeR?.area || regionR?.area;

  const category_source =
    officeR?.category && regionR?.category && officeR.category !== regionR.category
      ? "manual"
      : officeR?.category || regionR?.category
        ? "rule"
        : null;

  return {
    restaurant: base,
    legacy_slugs: [...legacy],
    region: regionId,
    in_office: Boolean(officeR),
    in_region: Boolean(regionR),
    category_source,
  };
}

function loadRegions() {
  /** @type {Map<string, { id: string, restaurants: any[] }>} */
  const map = new Map();
  for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json") && !n.includes(".summary"))) {
    const id = f.replace(/\.json$/, "");
    const j = JSON.parse(readFileSync(path.join(regionsDir, f), "utf8"));
    map.set(id, { id, restaurants: j.restaurants ?? [] });
  }
  return map;
}

export function loadOffice() {
  if (!existsSync(officeFile)) return { restaurants: [], meta: {} };
  const j = JSON.parse(readFileSync(officeFile, "utf8"));
  return {
    restaurants: j.restaurants ?? [],
    meta: {
      updatedAt: j.updatedAt,
      source: j.source,
      lastMessageTs: j.lastMessageTs,
      office: j.office,
    },
  };
}

/** Collapse office rows that share the same naver place id (양재순대 pair). */
function collapseOfficeByNaver(restaurants) {
  const byNaver = new Map();
  const out = [];
  const merges = [];
  for (const r of restaurants) {
    const nid = r.naver?.placeId;
    if (!nid) {
      out.push(r);
      continue;
    }
    if (!byNaver.has(nid)) {
      byNaver.set(nid, r);
      continue;
    }
    const prev = byNaver.get(nid);
    const merged = mergeOfficeRegion(prev, r, "seoul");
    // Prefer naver-{id} slug
    merged.restaurant.slug = `naver-${nid}`;
    if (prev.slug !== merged.restaurant.slug) merged.legacy_slugs.push(prev.slug);
    if (r.slug !== merged.restaurant.slug) merged.legacy_slugs.push(r.slug);
    merged.legacy_slugs = [...new Set(merged.legacy_slugs)];
    byNaver.set(nid, { ...merged.restaurant, __legacy: merged.legacy_slugs });
    merges.push({ naver: nid, from: [prev.slug, r.slug], to: merged.restaurant.slug });
  }
  for (const r of byNaver.values()) out.push(r);
  return { restaurants: out, merges };
}

export function buildPlaceRows() {
  const regions = loadRegions();
  const office = loadOffice();
  const { restaurants: officeRows, merges: yangjaeMerges } = collapseOfficeByNaver(office.restaurants);

  const officeBySlug = new Map(officeRows.map((r) => [r.slug, r]));
  const officeByNaver = new Map();
  for (const r of officeRows) {
    if (r.naver?.placeId) officeByNaver.set(String(r.naver.placeId), r);
  }

  /** @type {Map<string, ReturnType<typeof mergeOfficeRegion>>} */
  const bySlug = new Map();
  const overlapKeys = [];

  for (const [regionId, pack] of regions) {
    for (const r of pack.restaurants) {
      let officeHit =
        officeBySlug.get(r.slug) ||
        (r.naver?.placeId ? officeByNaver.get(String(r.naver.placeId)) : null);
      if (officeHit) {
        const merged = mergeOfficeRegion(officeHit, r, regionId);
        bySlug.set(merged.restaurant.slug, merged);
        overlapKeys.push({
          officeSlug: officeHit.slug,
          regionSlug: r.slug,
          canonical: merged.restaurant.slug,
          regionId,
        });
        officeBySlug.delete(officeHit.slug);
        if (officeHit.naver?.placeId) officeByNaver.delete(String(officeHit.naver.placeId));
      } else {
        bySlug.set(
          r.slug,
          mergeOfficeRegion(null, r, regionId),
        );
      }
    }
  }

  // Remaining office-only
  for (const r of officeBySlug.values()) {
    const legacy = r.__legacy ?? [];
    const row = mergeOfficeRegion(r, null, "seoul");
    row.legacy_slugs = [...new Set([...(row.legacy_slugs ?? []), ...legacy])];
    row.in_region = 0;
    row.region = "seoul";
    bySlug.set(row.restaurant.slug, row);
  }

  const placeRows = [];
  for (const m of bySlug.values()) {
    placeRows.push(
      restaurantToRow(m.restaurant, {
        region: m.region,
        in_office: m.in_office,
        in_region: m.in_region,
        category_source: m.category_source,
        legacy_slugs: m.legacy_slugs?.length ? m.legacy_slugs : null,
      }),
    );
  }

  return {
    placeRows,
    officeMeta: office.meta,
    overlapKeys,
    yangjaeMerges,
    stats: {
      places: placeRows.length,
      inOffice: placeRows.filter((p) => p.in_office).length,
      inRegion: placeRows.filter((p) => p.in_region).length,
      both: placeRows.filter((p) => p.in_office && p.in_region).length,
      overlapsDetected: overlapKeys.length,
      yangjaeMerges: yangjaeMerges.length,
    },
  };
}


export async function importCatalog({ dryRun: dry = false, backend = "local" } = {}) {
  const built = buildPlaceRows();
  const reportPath = path.join(here, "import-report.json");
  writeFileSync(
    reportPath,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), ...built.stats, overlapSample: built.overlapKeys.slice(0, 10), yangjaeMerges: built.yangjaeMerges }, null, 2)}\n`,
  );
  if (dry) return { dryRun: true, ...built.stats, reportPath };

  const db = openDb(backend);
  const now = new Date().toISOString();
  db.query("DELETE FROM place_changes");
  db.query("DELETE FROM runs");
  db.query("DELETE FROM places");
  db.query("DELETE FROM meta");

  const runId = `import-${now}`;
  db.query(
    `INSERT INTO runs (id, kind, started_at, finished_at, status, summary) VALUES (?, ?, ?, ?, ?, ?)`,
    [runId, "import", now, now, "ok", JSON.stringify(built.stats)],
  );

  const sql = insertPlaceSql();
  for (const row of built.placeRows) {
    db.query(sql, placeParams(row));
  }

  const metaEntries = [
    ["schema_version", "1"],
    ["last_message_ts", built.officeMeta.lastMessageTs ?? ""],
    ["catalog_source", built.officeMeta.source ?? ""],
    ["office", JSON.stringify(built.officeMeta.office ?? null)],
    ["imported_at", now],
  ];
  for (const [key, value] of metaEntries) {
    db.query(
      `INSERT INTO meta (key, value, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
      [key, value ?? "", now],
    );
  }

  const count = db.query(`SELECT COUNT(*) AS n FROM places`).results[0].n;
  db.close?.();
  return { dryRun: false, imported: count, db: db.path || db.kind, ...built.stats, reportPath };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]).includes("import-catalog");
if (isCli) {
  importCatalog({ dryRun, backend: "local" })
    .then((r) => console.log(JSON.stringify(r, null, 2)))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
