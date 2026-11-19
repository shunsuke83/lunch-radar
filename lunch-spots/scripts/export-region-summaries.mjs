// Build lightweight region summary JSON for first paint (~map/list fields only).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const regionsDir = path.resolve(root, "..", "web", "public", "regions");

let files = 0;
let places = 0;
for (const file of readdirSync(regionsDir).filter(
  (f) => f.endsWith(".json") && !f.includes(".summary") && f !== "places",
)) {
  const id = file.replace(/\.json$/, "");
  const raw = JSON.parse(readFileSync(path.join(regionsDir, file), "utf8"));
  const restaurants = (raw.restaurants ?? []).map((r) => {
    places++;
    return {
      slug: r.slug,
      name: r.name,
      area: r.area,
      district: r.district,
      category: r.category,
      subcategory: r.subcategory,
      location: r.location,
      naverReviews: r.naverReviews,
      naverScore: r.naverScore,
      rating: r.rating,
      collections: r.collections,
      addedAt: r.addedAt,
      updatedAt: r.updatedAt,
      mentionCount: r.mentionCount ?? 0,
      tags: r.tags ?? [],
      walkMeters: r.walkMeters,
      hours: r.hours
        ? {
            open: r.hours.open,
            close: r.hours.close,
            breakStart: r.hours.breakStart,
            breakEnd: r.hours.breakEnd,
            closedDays: r.hours.closedDays,
          }
        : undefined,
      naver: r.naver,
      place: r.place
        ? { kakaoId: r.place.kakaoId, kakaoUrl: r.place.kakaoUrl }
        : undefined,
    };
  });
  writeFileSync(
    path.join(regionsDir, `${id}.summary.json`),
    `${JSON.stringify({ updatedAt: raw.updatedAt, restaurants })}\n`,
  );
  files++;
}
console.log(JSON.stringify({ files, places }, null, 2));
