// Kakao Map place + review score for the Naver-folder places, cached in
// .cache/kakao-places.json; `npm run catalog:naver-folders` merges it into the
// region files as `place` and `rating`. Resumable: cached places are skipped
// unless older than --refresh-days.
// Needs KAKAO_REST_API_KEY (place search). Run catalog:naver-folders once first.
// Usage: npm run catalog:kakao-regions [-- --refresh-days 30]
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { kakaoRating, kakaoSearch, setHostDelay, type KakaoCacheEntry } from "./lib/place-sources.js";

const root = path.resolve(import.meta.dirname, "..");
const bookmarksFile = path.join(root, ".cache", "naver-bookmarks.json");
const detailsFile = path.join(root, ".cache", "naver-places.json");
const cacheFile = path.join(root, ".cache", "kakao-places.json");

const KAKAO_KEY = process.env.KAKAO_REST_API_KEY?.trim();
const argValue = (name: string) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const REFRESH_MS = Number(argValue("--refresh-days") ?? 30) * 24 * 60 * 60 * 1000;
/** Bookmark coordinates can sit a little off the Kakao pin. */
const RADIUS_M = 300;

setHostDelay("place-api.map.kakao.com", 1000);

if (!KAKAO_KEY) {
  console.error("KAKAO_REST_API_KEY is not set (lunch-spots/.env.local).");
  process.exit(1);
}
if (!existsSync(bookmarksFile)) {
  console.error("Run `npm run catalog:naver-folders` first (needs .cache/naver-bookmarks.json).");
  process.exit(1);
}

const bookmarks = JSON.parse(await readFile(bookmarksFile, "utf8")) as {
  sid: string;
  name: string;
  px: number;
  py: number;
}[];
const details = existsSync(detailsFile)
  ? (JSON.parse(await readFile(detailsFile, "utf8")) as Record<string, { name?: string }>)
  : {};
const cache: Record<string, KakaoCacheEntry> = existsSync(cacheFile)
  ? JSON.parse(await readFile(cacheFile, "utf8"))
  : {};

const fresh = (e?: KakaoCacheEntry) => e && Date.now() - Date.parse(e.checkedAt) < REFRESH_MS;
const todo = bookmarks.filter((b) => !fresh(cache[b.sid]));
console.log(`places ${bookmarks.length}, cached ${bookmarks.length - todo.length}, to look up ${todo.length}`);

const stats = { found: 0, rated: 0, missed: 0, failed: 0 };
let lastSave = Date.now();
for (const [i, b] of todo.entries()) {
  const name = details[b.sid]?.name ?? b.name;
  try {
    const place = await kakaoSearch(KAKAO_KEY, name, { lat: b.py, lng: b.px }, RADIUS_M);
    const entry: KakaoCacheEntry = { checkedAt: new Date().toISOString() };
    if (place) {
      entry.kakaoId = place.id;
      entry.kakaoUrl = place.place_url.replace(/^http:/, "https:");
      stats.found++;
      const rating = await kakaoRating(place.id);
      if (rating) {
        entry.score = rating.score;
        entry.count = rating.count;
        stats.rated++;
      }
    } else {
      stats.missed++;
    }
    cache[b.sid] = entry;
  } catch (err) {
    stats.failed++;
    if (err instanceof Error && /HTTP 40[13]/.test(err.message)) throw err;
  }
  if ((i + 1) % 50 === 0 || Date.now() - lastSave > 60_000) {
    lastSave = Date.now();
    await writeFile(cacheFile, JSON.stringify(cache));
    console.log(
      `kakao ${i + 1}/${todo.length} (found ${stats.found}, rated ${stats.rated}, missed ${stats.missed}, failed ${stats.failed}) ${new Date().toLocaleTimeString("ko-KR")}`,
    );
  }
}
await writeFile(cacheFile, JSON.stringify(cache));
console.log(
  `done: found ${stats.found}, rated ${stats.rated}, missed ${stats.missed}, failed ${stats.failed}` +
    (stats.failed ? " (rerun to retry)" : ""),
);
