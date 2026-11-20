// Fix matzido places whose Kakao name-match put them in the wrong region,
// and restore matzido restaurants wrongly purged as non-food.
//
//   node lunch-spots/scripts/fix-matzido-naver-geo.mjs --restore-v2
//   node lunch-spots/scripts/fix-matzido-naver-geo.mjs --fix-curated
//   node lunch-spots/scripts/fix-matzido-naver-geo.mjs --fix-curated --check
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseRegion, isValidDistrict, PROVINCES } from "./lib/region-parse.mjs";
import { groupOf } from "./category-rules.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const webDir = path.resolve(root, "..", "web");
const regionsDir = path.join(webDir, "public", "regions");
const check = process.argv.includes("--check");
const doRestore = process.argv.includes("--restore-v2");
const doFix = process.argv.includes("--fix-curated");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.slice("--limit=".length)) : Infinity;
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ID_TO_LABEL = Object.fromEntries(Object.entries(PROVINCES).map(([, v]) => [v.id, v.label]));
const LABEL_TO_ID = Object.fromEntries(Object.entries(PROVINCES).map(([k, v]) => [k, v.id]));

const V2_NAMES = new Set([
  "만개",
  "이창",
  "오엔",
  "위트",
  "나드리슈퍼",
  "올드페퍼",
  "ChapChap",
  "씨에스타",
  "다정채",
  "오브제",
  "범",
  "고고캠",
  "에그하우스",
  "월하동",
  "우디",
  "누아",
  "하루한모",
  "이케",
  "비오",
  "넓은마당",
]);

function apolloState(html) {
  const m = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{.*?\});\s*window\./s);
  if (m) return JSON.parse(m[1]);
  const m2 = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{[\s\S]*?\});/);
  return m2 ? JSON.parse(m2[1]) : {};
}

async function naverPlace(sid) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(`https://m.place.naver.com/restaurant/${sid}/home`, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "ko-KR,ko;q=0.9",
        Referer: "https://map.naver.com/",
      },
    });
    if (res.status === 404) return { status: 404 };
    if (res.status === 429 || res.status >= 500) {
      const wait = 60_000 * (attempt + 1);
      console.error(`naver ${res.status} for ${sid}; pause ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`Naver HTTP ${res.status} for ${sid}`);
    const html = await res.text();
    const state = apolloState(html);
    const base = state[`PlaceDetailBase:${sid}`] ?? {};
    const coord = base.coordinate ?? {};
    return {
      status: 200,
      name: base.name,
      category: base.category,
      roadAddress: base.roadAddress,
      address: base.address,
      lat: coord.y != null ? Number(coord.y) : undefined,
      lng: coord.x != null ? Number(coord.x) : undefined,
      reviews: base.visitorReviewsTotal,
      score: typeof base.visitorReviewsScore === "number" ? base.visitorReviewsScore : undefined,
    };
  }
  throw new Error(`Naver HTTP 429 for ${sid}`);
}

function fromNaverCategory(category) {
  if (!category) return undefined;
  const c = String(category).trim();
  const mapped = groupOf(c);
  if (mapped) return mapped;
  if (/퓨전/.test(c)) return "양식";
  if (/^음식점$|^식당$|^레스토랑$/.test(c)) return "한식";
  if (/술집|호프|바$|주점|이자카야|와인|칵테일|포차|포장마차|야장/.test(c)) return "주점";
  if (/카페|디저트|베이커리|커피/.test(c)) return "카페·디저트";
  return undefined;
}

function regionKey(address) {
  const r = parseRegion(address);
  if (!r || !isValidDistrict(r.district)) return null;
  return { province: r.province, district: r.district, id: LABEL_TO_ID[r.province] };
}

function loadRegions() {
  /** @type {Map<string, { file: string, j: any, pretty: boolean }>} */
  const map = new Map();
  for (const f of readdirSync(regionsDir).filter((n) => n.endsWith(".json") && !n.includes(".summary"))) {
    const id = f.replace(/\.json$/, "");
    const file = path.join(regionsDir, f);
    const text = readFileSync(file, "utf8");
    map.set(id, {
      file,
      j: JSON.parse(text),
      pretty: /^\{\r?\n\s+"/.test(text),
    });
  }
  return map;
}

function writeRegion(entry) {
  const { file, j, pretty } = entry;
  j.updatedAt = new Date().toISOString();
  writeFileSync(file, `${pretty ? JSON.stringify(j, null, 2) : JSON.stringify(j)}\n`);
}

function naverSid(slugOrKey) {
  const m = String(slugOrKey).match(/naver-(\d+)/);
  return m?.[1];
}

/** Compare catalog vs Naver region; true if province or district differs. */
function regionMismatch(catalogAddress, catalogDistrict, naverAddress) {
  const a = regionKey(catalogAddress) || (catalogDistrict ? { district: catalogDistrict } : null);
  const b = regionKey(naverAddress);
  if (!b) return { mismatch: false, reason: "naver-unparsed" };
  if (!a) return { mismatch: true, reason: "catalog-unparsed", naver: b };
  if (a.province && b.province && a.province !== b.province) {
    return { mismatch: true, reason: "province", catalog: a, naver: b };
  }
  if (a.district && b.district && a.district !== b.district) {
    return { mismatch: true, reason: "district", catalog: a, naver: b };
  }
  return { mismatch: false, catalog: a, naver: b };
}

async function restoreV2() {
  const review = JSON.parse(readFileSync(path.join(here, "uncategorized-review.json"), "utf8"));
  const nf = new Set(
    JSON.parse(readFileSync(path.join(here, "nonfood-candidates.json"), "utf8")).keys ?? [],
  );
  const targets = (review.places ?? []).filter((p) => V2_NAMES.has(p.name) && nf.has(p.key));
  console.log(JSON.stringify({ restoreTargets: targets.length }, null, 2));

  const regions = loadRegions();
  const restored = [];
  const failed = [];

  for (const p of targets) {
    const sid = naverSid(p.slug || p.key);
    if (!sid) {
      failed.push({ key: p.key, reason: "no-sid" });
      continue;
    }
    // already present?
    let exists = false;
    for (const entry of regions.values()) {
      if ((entry.j.restaurants ?? []).some((r) => r.slug === `naver-${sid}`)) {
        exists = true;
        break;
      }
    }
    if (exists) {
      restored.push({ key: p.key, status: "already-present" });
      continue;
    }

    try {
      const hit = await naverPlace(sid);
      await sleep(1100);
      if (hit.status !== 200 || !hit.roadAddress && !hit.address) {
        failed.push({ key: p.key, reason: "naver-miss", hit });
        continue;
      }
      const addr = hit.roadAddress || hit.address;
      const reg = regionKey(addr);
      if (!reg || hit.lat == null || hit.lng == null) {
        failed.push({ key: p.key, reason: "bad-geo", addr, hit });
        continue;
      }
      const cat = fromNaverCategory(hit.category) || "한식";
      const entry = regions.get(reg.id);
      if (!entry) {
        failed.push({ key: p.key, reason: "no-region-file", reg });
        continue;
      }
      const rec = {
        slug: `naver-${sid}`,
        name: hit.name || p.name,
        area: reg.district,
        district: reg.district,
        category: cat,
        tags: [],
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        mentionCount: 0,
        address: addr,
        location: { lat: hit.lat, lng: hit.lng },
        collections: p.collections?.length ? p.collections : ["맛지도 2026"],
        curated: { by: "naver-matzido-2026", restoredFrom: "nonfood-purge-v2" },
        naver: {
          placeId: sid,
          url: p.naverUrl || `https://map.naver.com/p/entry/place/${sid}`,
        },
        ...(hit.reviews != null ? { naverReviews: hit.reviews } : {}),
        ...(hit.score != null ? { naverScore: hit.score } : {}),
      };
      if (!check) {
        entry.j.restaurants = [...(entry.j.restaurants ?? []), rec];
      }
      restored.push({
        key: p.key,
        status: "restored",
        to: `${reg.id}/${rec.slug}`,
        category: cat,
        address: addr,
        naverCategory: hit.category,
      });
    } catch (err) {
      failed.push({ key: p.key, reason: String(err?.message || err) });
    }
  }

  if (!check) {
    for (const entry of regions.values()) writeRegion(entry);
  }

  const report = { mode: check ? "check" : "apply", restored, failed };
  writeFileSync(path.join(here, "matzido-v2-restore-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    JSON.stringify(
      {
        restored: restored.filter((r) => r.status === "restored").length,
        already: restored.filter((r) => r.status === "already-present").length,
        failed: failed.length,
        sample: restored.filter((r) => r.status === "restored").slice(0, 5),
      },
      null,
      2,
    ),
  );
}

async function fixCurated() {
  const checkpointFile = path.join(here, "matzido-geo-checkpoint.json");
  const checkpoint = existsSync(checkpointFile)
    ? JSON.parse(readFileSync(checkpointFile, "utf8"))
    : { done: {}, mismatches: [], ok: 0, miss: 0, errors: 0 };

  const regions = loadRegions();
  /** @type {{ regionId: string, r: any }[]} */
  const queue = [];
  for (const [regionId, entry] of regions) {
    for (const r of entry.j.restaurants ?? []) {
      if (r.curated?.by !== "naver-matzido-2026") continue;
      const sid = naverSid(r.slug);
      if (!sid) continue;
      const key = `${regionId}/${r.slug}`;
      if (checkpoint.done[key]) continue;
      queue.push({ regionId, r });
    }
  }
  if (Number.isFinite(LIMIT) && LIMIT > 0) queue.splice(LIMIT);
  console.log(
    JSON.stringify(
      { remaining: queue.length, alreadyDone: Object.keys(checkpoint.done).length, limit: LIMIT },
      null,
      2,
    ),
  );

  // Moves: remove from old region, add to new (deferred until end of batch write)
  const moves = [];

  for (let i = 0; i < queue.length; i++) {
    const { regionId, r } = queue[i];
    const key = `${regionId}/${r.slug}`;
    const sid = naverSid(r.slug);
    try {
      const hit = await naverPlace(sid);
      await sleep(5000);
      if (hit.status !== 200 || !(hit.roadAddress || hit.address)) {
        checkpoint.miss++;
        checkpoint.done[key] = { status: "miss" };
        continue;
      }
      const naverAddr = hit.roadAddress || hit.address;
      const cmp = regionMismatch(r.address, r.district, naverAddr);
      if (!cmp.mismatch) {
        // still refresh coords/address if Naver has fuller road address
        if (!check && hit.lat != null && hit.lng != null) {
          const entry = regions.get(regionId);
          const row = entry.j.restaurants.find((x) => x.slug === r.slug);
          if (row) {
            let changed = false;
            if (naverAddr && naverAddr !== row.address && /\d/.test(naverAddr)) {
              row.address = naverAddr;
              changed = true;
            }
            if (hit.lat && hit.lng) {
              row.location = { lat: hit.lat, lng: hit.lng };
              changed = true;
            }
            if (!row.category && hit.category) {
              const cat = fromNaverCategory(hit.category);
              if (cat) {
                row.category = cat;
                changed = true;
              }
            }
            if (changed) row.updatedAt = new Date().toISOString();
          }
        }
        checkpoint.ok++;
        checkpoint.done[key] = { status: "ok" };
      } else {
        const dest = cmp.naver;
        const rec = {
          key,
          name: r.name,
          from: { regionId, address: r.address, district: r.district },
          to: {
            regionId: dest.id,
            province: dest.province,
            district: dest.district,
            address: naverAddr,
            lat: hit.lat,
            lng: hit.lng,
          },
          naverCategory: hit.category,
          reason: cmp.reason,
        };
        checkpoint.mismatches.push(rec);
        moves.push({ ...rec, sid, hit, r });
        checkpoint.done[key] = { status: "mismatch", to: dest.id };
      }
    } catch (err) {
      checkpoint.errors++;
      checkpoint.done[key] = { status: "error", message: String(err?.message || err) };
    }

    if ((i + 1) % 25 === 0 || i === queue.length - 1) {
      writeFileSync(checkpointFile, `${JSON.stringify(checkpoint, null, 2)}\n`);
      console.error(
        `progress ${i + 1}/${queue.length} ok=${checkpoint.ok} mismatch=${checkpoint.mismatches.length} miss=${checkpoint.miss} err=${checkpoint.errors}`,
      );
    }
  }

  if (!check && moves.length) {
    for (const m of moves) {
      const from = regions.get(m.from.regionId);
      const toId = m.to.regionId;
      const to = regions.get(toId);
      if (!from || !to) continue;
      const idx = (from.j.restaurants ?? []).findIndex((x) => x.slug === m.r.slug);
      if (idx < 0) continue;
      const [row] = from.j.restaurants.splice(idx, 1);
      // avoid dup in dest
      if ((to.j.restaurants ?? []).some((x) => x.slug === row.slug)) continue;
      row.address = m.to.address;
      row.district = m.to.district;
      row.area = m.to.district;
      if (m.to.lat != null && m.to.lng != null) row.location = { lat: m.to.lat, lng: m.to.lng };
      const cat = fromNaverCategory(m.naverCategory);
      if (cat) row.category = cat;
      row.updatedAt = new Date().toISOString();
      row.curated = { ...(row.curated ?? {}), geoFixedFrom: m.from.regionId };
      to.j.restaurants.push(row);
    }
  }

  if (!check) {
    for (const entry of regions.values()) {
      entry.j.restaurants = (entry.j.restaurants ?? []).sort((a, b) =>
        String(a.name).localeCompare(String(b.name), "ko"),
      );
      writeRegion(entry);
    }
  }

  writeFileSync(checkpointFile, `${JSON.stringify(checkpoint, null, 2)}\n`);
  writeFileSync(
    path.join(here, "matzido-geo-mismatches.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), count: checkpoint.mismatches.length, mismatches: checkpoint.mismatches }, null, 2)}\n`,
  );
  console.log(
    JSON.stringify(
      {
        mode: check ? "check" : "apply",
        ok: checkpoint.ok,
        mismatches: checkpoint.mismatches.length,
        miss: checkpoint.miss,
        errors: checkpoint.errors,
        sampleMismatch: checkpoint.mismatches.slice(0, 8).map((m) => ({
          name: m.name,
          from: `${m.from.regionId} ${m.from.address}`,
          to: `${m.to.regionId} ${m.to.address}`,
        })),
      },
      null,
      2,
    ),
  );
}

if (!doRestore && !doFix) {
  console.error("Pass --restore-v2 and/or --fix-curated");
  process.exit(2);
}
if (doRestore) await restoreV2();
if (doFix) await fixCurated();
