// Dry-run: 47 office∩region overlaps + yangjae sundae merge + legacy_slugs.
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPlaceRows } from "./import-catalog.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const built = buildPlaceRows();

const both = built.placeRows
  .filter((p) => p.in_office && p.in_region)
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    region: p.region,
    legacy_slugs: p.legacy_slugs ? JSON.parse(p.legacy_slugs) : [],
    category: p.category,
    category_source: p.category_source,
    hasNaver: Boolean(p.naver_place_id),
    hasKakao: Boolean(p.kakao_id),
  }));

const officeOnly = built.placeRows.filter((p) => p.in_office && !p.in_region).length;
const withLegacy = built.placeRows.filter((p) => p.legacy_slugs).map((p) => ({
  slug: p.slug,
  legacy_slugs: JSON.parse(p.legacy_slugs),
}));

const report = {
  generatedAt: new Date().toISOString(),
  stats: built.stats,
  overlapCount: both.length,
  overlaps: both,
  yangjaeMerges: built.yangjaeMerges,
  officeOnly,
  legacySlugRows: withLegacy,
  metaRequired: {
    last_message_ts: "required on pull — collector aborts if empty after pull",
    office: "required — map center blob",
  },
};

writeFileSync(path.join(here, "merge-dry-run-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      overlapCount: both.length,
      yangjaeMerges: built.yangjaeMerges,
      officeOnly,
      legacySlugRows: withLegacy.length,
      stats: built.stats,
    },
    null,
    2,
  ),
);
