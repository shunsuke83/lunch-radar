// Add map coordinates (Kakao Local) and web ratings (Google Places) to
// ../web/data/restaurants.json. Each source runs only when its key is set:
//   KAKAO_REST_API_KEY     office geocode + place search → location, place
//   GOOGLE_PLACES_API_KEY  Text Search → rating (refreshed after RATING_TTL_DAYS)
//   LUNCH_SPOTS_SLACK_USER_TOKEN + LUNCH_SPOTS_CHANNEL_ID
//                          naver.me / place links in the channel → naver (+ location if Kakao missed)
// Usage: npm run catalog:enrich [-- --dry-run] [-- --force]
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { GeoPoint, PlaceRating, Restaurant } from "../bot/lib/restaurants.js";
import { matchesPlaceName } from "../bot/lib/place-match.js";

const OFFICE_NAME = process.env.LUNCH_OFFICE_NAME ?? "플래그원";
const OFFICE_ADDRESS = process.env.LUNCH_OFFICE_ADDRESS ?? "서울 강남구 남부순환로 2621";
const SEARCH_RADIUS_M = 2000;
const RATING_TTL_DAYS = 7;
/** A Google result farther than this from the Kakao point is another branch. */
const SAME_PLACE_M = 300;

const KAKAO_KEY = process.env.KAKAO_REST_API_KEY?.trim();
const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY?.trim();
const SLACK_TOKEN = process.env.LUNCH_SPOTS_SLACK_USER_TOKEN?.trim();
const CHANNEL_ID = process.env.LUNCH_SPOTS_CHANNEL_ID?.trim();
const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");

type Office = { name: string; address: string } & GeoPoint;
type Catalog = { office?: Office; restaurants: Restaurant[] } & Record<string, unknown>;

const file = path.resolve(import.meta.dirname, "..", "..", "web", "data", "restaurants.json");

function distanceM(a: GeoPoint, b: GeoPoint): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
}

async function kakao<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const url = `https://dapi.kakao.com/v2/local/search/${endpoint}.json?${new URLSearchParams(params)}`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${KAKAO_KEY}` } });
  if (!res.ok) {
    const body = (await res.text()).slice(0, 300);
    throw new Error(`Kakao ${endpoint} HTTP ${res.status}: ${body}`);
  }
  return (await res.json()) as T;
}

type KakaoPlace = {
  id: string;
  place_name: string;
  place_url: string;
  x: string;
  y: string;
  road_address_name?: string;
  address_name?: string;
};

async function geocodeOffice(): Promise<Office> {
  const data = await kakao<{ documents: { x: string; y: string }[] }>("address", {
    query: OFFICE_ADDRESS,
  });
  const doc = data.documents[0];
  if (!doc) throw new Error(`Kakao could not geocode ${OFFICE_ADDRESS}`);
  return { name: OFFICE_NAME, address: OFFICE_ADDRESS, lat: Number(doc.y), lng: Number(doc.x) };
}

async function findKakaoPlace(r: Restaurant, office: Office): Promise<KakaoPlace | undefined> {
  for (const category of ["FD6", "CE7", ""]) {
    const params: Record<string, string> = {
      query: r.name,
      x: String(office.lng),
      y: String(office.lat),
      radius: String(SEARCH_RADIUS_M),
      sort: "accuracy",
      size: "5",
    };
    if (category) params.category_group_code = category;
    const data = await kakao<{ documents: KakaoPlace[] }>("keyword", params);
    const hit = data.documents.find((d) => matchesPlaceName(r.name, d.place_name));
    if (hit) return hit;
  }
  return undefined;
}

type GooglePlace = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  location?: { latitude: number; longitude: number };
};

async function findGoogleRating(r: Restaurant, near: GeoPoint, strict: boolean) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_KEY!,
      "X-Goog-FieldMask":
        "places.displayName,places.rating,places.userRatingCount,places.googleMapsUri,places.location",
    },
    body: JSON.stringify({
      textQuery: r.name,
      languageCode: "ko",
      regionCode: "KR",
      maxResultCount: 5,
      locationBias: {
        circle: { center: { latitude: near.lat, longitude: near.lng }, radius: 1000 },
      },
    }),
  });
  if (!res.ok) throw new Error(`Google Places HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const { places = [] } = (await res.json()) as { places?: GooglePlace[] };
  return places.find((p) => {
    if (!p.location || typeof p.rating !== "number") return false;
    const d = distanceM(near, { lat: p.location.latitude, lng: p.location.longitude });
    const nameOk = matchesPlaceName(r.name, p.displayName?.text ?? "");
    // With a Kakao point the distance pins the branch; without one require the name too.
    return strict ? d <= SAME_PLACE_M : nameOk && d <= SEARCH_RADIUS_M;
  });
}

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
const stats = { located: 0, notFound: [] as string[], rated: 0, unrated: [] as string[], kept: 0 };
/** After the first Google failure, skip Google but still save the Kakao results. */
let googleError: string | undefined;

const naverStats = { linked: 0, unmatched: [] as string[] };
let naverLinks: NaverLink[] = [];
if (SLACK_TOKEN && CHANNEL_ID) {
  try {
    naverLinks = await collectNaverLinks();
  } catch (err) {
    console.error(`naver: skipped (${err instanceof Error ? err.message : String(err)})`);
  }
}

if (!KAKAO_KEY && !GOOGLE_KEY && naverLinks.length === 0) {
  console.log("No Kakao/Google key and no Naver links; nothing to do.");
  process.exit(0);
}

if (KAKAO_KEY && (force || !catalog.office || catalog.office.address !== OFFICE_ADDRESS)) {
  catalog.office = await geocodeOffice();
}
const office = catalog.office;

for (const r of catalog.restaurants) {
  if (KAKAO_KEY && office && (force || !r.location)) {
    const place = await findKakaoPlace(r, office);
    if (place) {
      r.location = { lat: Number(place.y), lng: Number(place.x) };
      r.place = {
        kakaoId: place.id,
        kakaoUrl: place.place_url.replace(/^http:/, "https:"),
        address: place.road_address_name || place.address_name || undefined,
      };
      stats.located++;
    } else {
      stats.notFound.push(r.name);
    }
  }

  const naver = naverLinks.find((l) => matchesPlaceName(r.name, l.title));
  if (naver) {
    r.naver = { placeId: naver.placeId, url: `https://map.naver.com/p/entry/place/${naver.placeId}` };
    naverStats.linked++;
    const nearOffice = !office || !naver.point || distanceM(office, naver.point) <= SEARCH_RADIUS_M;
    if (!r.location && naver.point && nearOffice) {
      r.location = naver.point;
      // Retry Google now that the branch is pinned.
      if (!r.rating) delete r.ratingCheckedAt;
    }
  }

  // Misses are timestamped too, so an unmatched place is retried weekly, not daily
  // (Text Search with rating fields is a paid SKU past the free monthly cap).
  const stale =
    !r.ratingCheckedAt ||
    Date.now() - Date.parse(r.ratingCheckedAt) > RATING_TTL_DAYS * 24 * 60 * 60 * 1000;
  const near = r.location ?? office;
  if (GOOGLE_KEY && !googleError && near && (force || stale)) {
    let hit: GooglePlace | undefined;
    try {
      hit = await findGoogleRating(r, near, Boolean(r.location));
    } catch (err) {
      googleError = err instanceof Error ? err.message : String(err);
      if (r.rating) stats.kept++;
      continue;
    }
    r.ratingCheckedAt = new Date().toISOString();
    if (hit && typeof hit.rating === "number") {
      const rating: PlaceRating = {
        score: hit.rating,
        count: hit.userRatingCount ?? 0,
        source: "google",
        url: hit.googleMapsUri,
        fetchedAt: new Date().toISOString(),
      };
      r.rating = rating;
      stats.rated++;
    } else {
      stats.unrated.push(r.name);
    }
  } else if (r.rating) {
    stats.kept++;
  }
}

console.log(
  [
    office ? `office: ${office.name} (${office.lat.toFixed(5)}, ${office.lng.toFixed(5)})` : "office: -",
    KAKAO_KEY ? `kakao located ${stats.located}, not found ${stats.notFound.length}` : "kakao: skipped (no key)",
    GOOGLE_KEY ? `google rated ${stats.rated}, no rating ${stats.unrated.length}, kept ${stats.kept}` : "google: skipped (no key)",
  ].join("\n"),
);
if (SLACK_TOKEN && CHANNEL_ID) {
  naverStats.unmatched = naverLinks
    .filter((l) => !catalog.restaurants.some((r) => matchesPlaceName(r.name, l.title)))
    .map((l) => l.title);
  console.log(`naver links ${naverLinks.length}, linked ${naverStats.linked} spots`);
  if (naverStats.unmatched.length) console.log(`naver links with no spot: ${naverStats.unmatched.join(", ")}`);
}
if (stats.notFound.length) console.log(`kakao not found: ${stats.notFound.join(", ")}`);
if (stats.unrated.length) console.log(`google no rating: ${stats.unrated.join(", ")}`);

if (!dryRun) {
  await writeFile(file, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`wrote ${file}`);
}
if (googleError) {
  console.error(`google stopped: ${googleError}`);
  process.exit(1);
}
