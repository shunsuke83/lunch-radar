// Add map places, ratings, and Naver review counts to ../web/data/restaurants.json:
//   KAKAO_REST_API_KEY     office geocode + place search → location, place (Kakao Local API)
//   (no key)               Kakao Map review score → rating; Naver place search →
//                          naver, naverReviews, naverScore (both refreshed after REFRESH_DAYS)
//   LUNCH_SPOTS_SLACK_USER_TOKEN + LUNCH_SPOTS_CHANNEL_ID
//                          naver.me / place links in the channel → naver (+ location if Kakao missed)
// Usage: npm run catalog:enrich [-- --dry-run] [-- --force]
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { GeoPoint, PlaceRating, Restaurant } from "../bot/lib/restaurants.js";
import { matchesPlaceName } from "../bot/lib/place-match.js";
import { distanceM, kakaoRating, kakaoSearch, naverSearch, setHostDelay } from "./lib/place-sources.js";

setHostDelay("place-api.map.kakao.com", 1000);

const OFFICE_NAME = process.env.LUNCH_OFFICE_NAME ?? "플래그원";
const OFFICE_ADDRESS = process.env.LUNCH_OFFICE_ADDRESS ?? "서울 강남구 남부순환로 2621";
const SEARCH_RADIUS_M = 2000;
const REFRESH_DAYS = 7;
/**
 * Origin of the "도보 약 Nm" figures in the channel's daily picks, fitted from
 * 63 of them: they are straight-line meters from here (RMS error ≈18m). The
 * office geocode is ~170m off, so rows without a Slack figure use this point
 * to stay comparable.
 */
const WALK_ORIGIN: GeoPoint = { lat: 37.48487, lng: 127.03472 };

const KAKAO_KEY = process.env.KAKAO_REST_API_KEY?.trim();
const SLACK_TOKEN = process.env.LUNCH_SPOTS_SLACK_USER_TOKEN?.trim();
const CHANNEL_ID = process.env.LUNCH_SPOTS_CHANNEL_ID?.trim();
const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");

type Office = { name: string; address: string } & GeoPoint;
type Catalog = { office?: Office; restaurants: Restaurant[] } & Record<string, unknown>;

const file = path.resolve(import.meta.dirname, "..", "..", "web", "data", "restaurants.json");

async function kakaoAddress(query: string): Promise<GeoPoint | undefined> {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?${new URLSearchParams({ query })}`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${KAKAO_KEY}` } });
  if (!res.ok) throw new Error(`Kakao address HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const doc = ((await res.json()) as { documents: { x: string; y: string }[] }).documents[0];
  return doc ? { lat: Number(doc.y), lng: Number(doc.x) } : undefined;
}

const stale = (checkedAt: string | undefined) =>
  force || !checkedAt || Date.now() - Date.parse(checkedAt) > REFRESH_DAYS * 24 * 60 * 60 * 1000;

type NaverLink = { placeId: string; title: string; point?: GeoPoint };

type SlackMessage = {
  text?: string;
  /** Link unfurls; for Naver Map the place name is in `text`. */
  attachments?: { from_url?: string; original_url?: string; service_name?: string; text?: string }[];
};

async function slackMessages(): Promise<SlackMessage[]> {
  const messages: SlackMessage[] = [];
  let cursor = "";
  do {
    const params = new URLSearchParams({ channel: CHANNEL_ID!, limit: "200" });
    if (cursor) params.set("cursor", cursor);
    const res = await fetch(`https://slack.com/api/conversations.history?${params}`, {
      headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
    });
    const data = (await res.json()) as {
      ok: boolean;
      error?: string;
      messages?: SlackMessage[];
      response_metadata?: { next_cursor?: string };
    };
    if (!data.ok) throw new Error(`Slack conversations.history: ${data.error}`);
    messages.push(...(data.messages ?? []));
    cursor = data.response_metadata?.next_cursor ?? "";
  } while (cursor);
  return messages;
}

/** Reads a map.naver.com place URL: `?pinId=&lat=&lng=&title=` or `.../place/<id>`. */
function parseNaverUrl(raw: string): (Omit<NaverLink, "title"> & { title?: string }) | undefined {
  let url: URL;
  try {
    url = new URL(raw.replaceAll("&amp;", "&"));
  } catch {
    return undefined;
  }
  const placeId = url.searchParams.get("pinId") ?? url.pathname.match(/\/place\/(\d+)/)?.[1];
  if (!placeId) return undefined;
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  return {
    placeId,
    title: url.searchParams.get("title") ?? undefined,
    point: lat && lng ? { lat, lng } : undefined,
  };
}

/** The name in a Naver app share: "[네이버지도]\n<name>\n<address>\n<link>". */
function sharedName(text: string): string | undefined {
  return text.match(/\[네이버지도\]\s*\n\s*([^\n<]+)/)?.[1]?.trim();
}

/** "4번 양재순대 : <link>" → "양재순대". */
function nameBeforeLink(text: string, href: string): string | undefined {
  const line = text.split("\n").find((l) => l.includes(href)) ?? "";
  const before = line.slice(0, line.indexOf("<")).replace(/^\s*\d+\s*번\s*/, "").replace(/[\s:：\-–]+$/, "");
  return before.trim() || undefined;
}

/** Place links people shared in the channel; plain search links (/p/search/<q>) carry no place. */
async function collectNaverLinks(): Promise<NaverLink[]> {
  const found = new Map<string, NaverLink>();
  const pattern = /<(https:\/\/(?:naver\.me|(?:m\.)?map\.naver\.com)\/[^|>]+)(?:\|[^>]*)?>/g;
  for (const m of await slackMessages()) {
    const text = m.text ?? "";
    for (const [, href] of text.matchAll(pattern)) {
      let target = href;
      if (href.startsWith("https://naver.me/")) {
        const res = await fetch(href, { redirect: "manual" }).catch(() => null);
        target = res?.headers.get("location") ?? "";
      }
      const link = target ? parseNaverUrl(target) : undefined;
      if (!link || found.has(link.placeId)) continue;
      const plain = (u?: string) => u?.replaceAll("&amp;", "&");
      const unfurls = m.attachments?.filter((a) => a.service_name === "map.naver.com") ?? [];
      const unfurl =
        unfurls.find((a) => [a.from_url, a.original_url].some((u) => plain(u) === plain(href))) ??
        (unfurls.length === 1 ? unfurls[0] : undefined);
      const title =
        link.title || unfurl?.text?.trim() || sharedName(text) || nameBeforeLink(text, href);
      if (title) found.set(link.placeId, { ...link, title });
    }
  }
  return [...found.values()];
}

const catalog = JSON.parse(await readFile(file, "utf8")) as Catalog;
const stats = {
  located: 0,
  notFound: [] as string[],
  walkComputed: 0,
  rated: 0,
  unrated: 0,
  naverFound: 0,
  naverMissed: [] as string[],
  errors: [] as string[],
};

let naverLinks: NaverLink[] = [];
if (SLACK_TOKEN && CHANNEL_ID) {
  try {
    naverLinks = await collectNaverLinks();
  } catch (err) {
    console.error(`naver links: skipped (${err instanceof Error ? err.message : String(err)})`);
  }
}

if (KAKAO_KEY && (force || !catalog.office || catalog.office.address !== OFFICE_ADDRESS)) {
  const point = await kakaoAddress(OFFICE_ADDRESS);
  if (!point) throw new Error(`Kakao could not geocode ${OFFICE_ADDRESS}`);
  catalog.office = { name: OFFICE_NAME, address: OFFICE_ADDRESS, ...point };
}
const office = catalog.office;

for (const r of catalog.restaurants) {
  // A Kakao place gives the map link and the review score, so look it up even
  // when coordinates came from elsewhere (a Naver link, a curated row).
  if (KAKAO_KEY && office && (force || !r.place)) {
    const place = await kakaoSearch(KAKAO_KEY, r.name, r.location ?? office, r.location ? 300 : SEARCH_RADIUS_M);
    if (place) {
      r.location = { lat: Number(place.y), lng: Number(place.x) };
      r.place = {
        kakaoId: place.id,
        kakaoUrl: place.place_url.replace(/^http:/, "https:"),
        address: place.road_address_name || place.address_name || undefined,
      };
      stats.located++;
    } else if (!r.location) {
      const point = r.address ? await kakaoAddress(r.address) : undefined;
      if (point) {
        r.location = point;
        stats.located++;
      } else {
        stats.notFound.push(r.name);
      }
    }
  }

  const link = naverLinks.find((l) => matchesPlaceName(r.name, l.title));
  if (link) {
    r.naver = { placeId: link.placeId, url: `https://map.naver.com/p/entry/place/${link.placeId}` };
    const nearOffice = !office || !link.point || distanceM(office, link.point) <= SEARCH_RADIUS_M;
    if (!r.location && link.point && nearOffice) r.location = link.point;
  }

  if (r.location && (r.walkMeters === undefined || r.walkFromMap)) {
    r.walkMeters = Math.round(distanceM(WALK_ORIGIN, r.location));
    r.walkFromMap = true;
    stats.walkComputed++;
  }

  if (r.rating && r.rating.source !== "kakao" && !r.place?.kakaoId) {
    delete r.rating;
    delete r.ratingCheckedAt;
  }

  try {
    if (r.place?.kakaoId && (stale(r.ratingCheckedAt) || r.rating?.source !== "kakao")) {
      const score = await kakaoRating(r.place.kakaoId);
      r.ratingCheckedAt = new Date().toISOString();
      if (score) {
        const rating: PlaceRating = {
          ...score,
          source: "kakao",
          url: r.place.kakaoUrl,
          fetchedAt: r.ratingCheckedAt,
        };
        r.rating = rating;
        stats.rated++;
      } else {
        delete r.rating;
        stats.unrated++;
      }
    }

    const near = r.location ?? office;
    if (near && stale(r.naverCheckedAt)) {
      const hit = await naverSearch(r.name, near, r.location ? 300 : SEARCH_RADIUS_M);
      r.naverCheckedAt = new Date().toISOString();
      if (hit && (!r.naver || r.naver.placeId === hit.placeId)) {
        r.naver = { placeId: hit.placeId, url: `https://map.naver.com/p/entry/place/${hit.placeId}` };
        if (hit.reviews) r.naverReviews = hit.reviews;
        else delete r.naverReviews;
        if (hit.score) r.naverScore = hit.score;
        else delete r.naverScore;
        if (!r.location) r.location = hit.point;
        stats.naverFound++;
      } else {
        stats.naverMissed.push(r.name);
      }
    }
  } catch (err) {
    stats.errors.push(`${r.name}: ${err instanceof Error ? err.message : String(err)}`);
  }
}

console.log(
  [
    office ? `office: ${office.name} (${office.lat.toFixed(5)}, ${office.lng.toFixed(5)})` : "office: -",
    KAKAO_KEY ? `kakao located ${stats.located}, not found ${stats.notFound.length}` : "kakao search: skipped (no key)",
    `walk distance from coordinates: ${stats.walkComputed}`,
    `kakao rating: rated ${stats.rated}, no reviews ${stats.unrated}`,
    `naver: found ${stats.naverFound}, missed ${stats.naverMissed.length}`,
    naverLinks.length ? `naver links from Slack: ${naverLinks.length}` : "",
  ]
    .filter(Boolean)
    .join("\n"),
);
if (stats.notFound.length) console.log(`kakao not found: ${stats.notFound.join(", ")}`);
if (stats.naverMissed.length) console.log(`naver missed: ${stats.naverMissed.join(", ")}`);
if (stats.errors.length) console.log(`errors:\n  ${stats.errors.join("\n  ")}`);

if (!dryRun) {
  await writeFile(file, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`wrote ${file}`);
}
