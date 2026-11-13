// Unofficial Naver / Kakao place lookups shared by the enrich and import
// scripts. Both sites answer 429 to fast clients, so every call goes through
// `politeFetch`, which spaces requests and backs off for everyone at once.
import type { GeoPoint } from "../../bot/lib/restaurants.js";
import { matchesPlaceName } from "../../bot/lib/place-match.js";

const MOBILE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function distanceM(a: GeoPoint, b: GeoPoint): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
}

type Host = { delayMs: number; pausedUntil: number };
const hosts = new Map<string, Host>();

/** Per-host pacing: `delayMs` after each request, shared cooldown on 429/5xx. */
export function setHostDelay(host: string, delayMs: number): void {
  hosts.set(host, { delayMs, pausedUntil: hosts.get(host)?.pausedUntil ?? 0 });
}

export async function politeFetch(url: string, headers: Record<string, string>): Promise<string> {
  const host = new URL(url).host;
  const state = hosts.get(host) ?? { delayMs: 3000, pausedUntil: 0 };
  hosts.set(host, state);
  for (let attempt = 0; attempt < 6; attempt++) {
    const wait = state.pausedUntil - Date.now();
    if (wait > 0) await sleep(wait);
    let status = "network error";
    try {
      const res = await fetch(url, { headers });
      const text = await res.text();
      await sleep(state.delayMs);
      if (res.ok && text) return text;
      status = `HTTP ${res.status}`;
      if (res.status === 404) throw new Error(`${host} ${status}`);
    } catch (err) {
      if (err instanceof Error && err.message.endsWith("HTTP 404")) throw err;
    }
    const cooldown = 60_000 * (attempt + 1);
    if (Date.now() + cooldown > state.pausedUntil) {
      state.pausedUntil = Date.now() + cooldown;
      console.log(`${host} throttled (${status}); pausing ${cooldown / 1000}s`);
    }
  }
  throw new Error(`fetch failed: ${url}`);
}

type Apollo = Record<string, Record<string, unknown>>;

export function apolloState(html: string): Apollo {
  const m = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{.*?\});\s*window\./s);
  return m ? (JSON.parse(m[1]) as Apollo) : {};
}

const num = (v: unknown): number | undefined => {
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export type NaverHit = {
  placeId: string;
  name: string;
  point: GeoPoint;
  reviews?: number;
  /** Only when the owner publishes it. */
  score?: number;
};

/**
 * Naver Map place search (the mobile list page), nearest name match within
 * `maxMeters` of `near`. The list carries the review count and, unlike the
 * place page, the star score when the owner publishes it.
 */
export async function naverSearch(name: string, near: GeoPoint, maxMeters = 500): Promise<NaverHit | undefined> {
  const url = `https://m.place.naver.com/restaurant/list?query=${encodeURIComponent(name)}&x=${near.lng}&y=${near.lat}`;
  const state = apolloState(
    await politeFetch(url, { "User-Agent": MOBILE_UA, "Accept-Language": "ko-KR,ko;q=0.9" }),
  );
  const hits = Object.entries(state)
    .filter(([k]) => k.startsWith("PlaceListBusinessesItem:"))
    .map(([, v]) => ({
      placeId: String(v.id),
      name: String(v.name ?? ""),
      point: { lat: Number(v.y), lng: Number(v.x) },
      reviews: num(v.visitorReviewCount),
      score: num(v.visitorReviewScore),
    }))
    .filter((h) => matchesPlaceName(name, h.name) && distanceM(near, h.point) <= maxMeters)
    .sort((a, b) => distanceM(near, a.point) - distanceM(near, b.point));
  return hits[0];
}

export type KakaoPlace = {
  id: string;
  place_name: string;
  place_url: string;
  category_name?: string;
  x: string;
  y: string;
  road_address_name?: string;
  address_name?: string;
};

/** Kakao Local keyword search (official API, REST key), nearest name match. */
export async function kakaoSearch(
  key: string,
  name: string,
  near: GeoPoint,
  radius = 500,
): Promise<KakaoPlace | undefined> {
  for (const category of ["FD6", "CE7", ""]) {
    const params = new URLSearchParams({
      query: name,
      x: String(near.lng),
      y: String(near.lat),
      radius: String(radius),
      sort: "distance",
      size: "5",
    });
    if (category) params.set("category_group_code", category);
    const res = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?${params}`, {
      headers: { Authorization: `KakaoAK ${key}` },
    });
    if (!res.ok) throw new Error(`Kakao keyword HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const { documents = [] } = (await res.json()) as { documents?: KakaoPlace[] };
    const hit = documents.find((d) => matchesPlaceName(name, d.place_name));
    if (hit) return hit;
  }
  return undefined;
}

/** One row of .cache/kakao-places.json, keyed by Naver place id; no kakaoId = not on Kakao Map. */
export type KakaoCacheEntry = {
  checkedAt: string;
  kakaoId?: string;
  kakaoUrl?: string;
  score?: number;
  count?: number;
};

/** Kakao Map review score from the place panel (no official API). */
export async function kakaoRating(kakaoId: string): Promise<{ score: number; count: number } | undefined> {
  const text = await politeFetch(`https://place-api.map.kakao.com/places/panel3/${kakaoId}`, {
    "User-Agent": "Mozilla/5.0",
    Referer: "https://place.map.kakao.com/",
    pf: "web",
    appversion: "6.6.0",
  });
  const data = JSON.parse(text) as {
    kakaomap_review?: { score_set?: { average_score?: number; review_count?: number } };
  };
  const set = data.kakaomap_review?.score_set;
  if (!set?.review_count || typeof set.average_score !== "number") return undefined;
  return { score: Math.round(set.average_score * 10) / 10, count: set.review_count };
}
