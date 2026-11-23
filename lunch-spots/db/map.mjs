import { rowHash } from "./hash.mjs";

const j = (v) => (v == null ? null : JSON.stringify(v));
const parseJ = (s, fallback = undefined) => {
  if (s == null || s === "") return fallback;
  try {
    return JSON.parse(s);
  } catch {
    return fallback;
  }
};

/** Build a places row from a catalog restaurant + scope flags. */
export function restaurantToRow(r, scope) {
  const {
    region = null,
    in_office = 0,
    in_region = 0,
    category_source = null,
    legacy_slugs = null,
    naver_address = null,
    naver_category = null,
  } = scope;
  const fields = {
    slug: r.slug,
    name: r.name,
    region,
    district: r.district ?? r.area ?? null,
    area: r.area ?? null,
    in_office: in_office ? 1 : 0,
    in_region: in_region ? 1 : 0,
    category: r.category ?? null,
    subcategory: r.subcategory ?? null,
    category_source,
    naver_category,
    address: r.address ?? null,
    lat: r.location?.lat ?? null,
    lng: r.location?.lng ?? null,
    naver_place_id: r.naver?.placeId ?? null,
    naver_url: r.naver?.url ?? null,
    naver_address,
    naver_reviews: r.naverReviews ?? null,
    naver_score: r.naverScore ?? null,
    naver_checked_at: r.naverCheckedAt ?? null,
    kakao_id: r.place?.kakaoId ?? null,
    kakao_url: r.place?.kakaoUrl ?? null,
    kakao_address: r.place?.address ?? null,
    rating_score: r.rating?.score ?? null,
    rating_count: r.rating?.count ?? null,
    rating_source: r.rating?.source ?? null,
    rating_url: r.rating?.url ?? null,
    rating_fetched_at: r.rating?.fetchedAt ?? null,
    rating_checked_at: r.ratingCheckedAt ?? null,
    menu: j(r.menu ?? null),
    hours: j(r.hours ?? null),
    collections: j(r.collections ?? null),
    tags: j(r.tags ?? []),
    price_range: r.priceRange ?? null,
    notes: r.notes ?? null,
    curated_by: r.curated?.by ?? null,
    curated_url: r.curated?.url ?? null,
    walk_meters: r.walkMeters ?? null,
    walk_minutes: r.walkMinutes ?? null,
    walk_from_map: r.walkFromMap == null ? null : r.walkFromMap ? 1 : 0,
    mention_count: r.mentionCount ?? 0,
    legacy_slugs: j(legacy_slugs),
    added_at: r.addedAt,
    updated_at: r.updatedAt,
    deleted_at: null,
    deleted_reason: null,
    row_version: 1,
  };
  fields.row_hash = rowHash(fields);
  return fields;
}

/** Convert a places row back to a public Restaurant object. */
export function rowToRestaurant(row) {
  const tags = parseJ(row.tags, []) ?? [];
  const r = {
    slug: row.slug,
    name: row.name,
    tags: Array.isArray(tags) ? tags : [],
    addedAt: row.added_at,
    updatedAt: row.updated_at,
    mentionCount: row.mention_count ?? 0,
  };
  if (row.area) r.area = row.area;
  if (row.district) r.district = row.district;
  if (row.category) r.category = row.category;
  if (row.subcategory) r.subcategory = row.subcategory;
  if (row.price_range) r.priceRange = row.price_range;
  if (row.notes) r.notes = row.notes;
  if (row.walk_meters != null) r.walkMeters = row.walk_meters;
  if (row.walk_minutes != null) r.walkMinutes = row.walk_minutes;
  if (row.walk_from_map != null) r.walkFromMap = Boolean(row.walk_from_map);
  const hours = parseJ(row.hours);
  if (hours) r.hours = hours;
  const menu = parseJ(row.menu);
  if (menu) r.menu = menu;
  if (row.address) r.address = row.address;
  if (row.lat != null && row.lng != null) r.location = { lat: row.lat, lng: row.lng };
  if (row.kakao_id && row.kakao_url) {
    r.place = {
      kakaoId: row.kakao_id,
      kakaoUrl: row.kakao_url,
      ...(row.kakao_address ? { address: row.kakao_address } : {}),
    };
  }
  if (row.naver_place_id) {
    r.naver = {
      placeId: row.naver_place_id,
      url: row.naver_url || `https://map.naver.com/p/entry/place/${row.naver_place_id}`,
    };
  }
  if (row.curated_by) {
    r.curated = {
      by: row.curated_by,
      ...(row.curated_url ? { url: row.curated_url } : {}),
    };
  }
  if (row.rating_score != null && row.rating_count != null && row.rating_fetched_at) {
    r.rating = {
      score: row.rating_score,
      count: row.rating_count,
      source: row.rating_source || "kakao",
      fetchedAt: row.rating_fetched_at,
      ...(row.rating_url ? { url: row.rating_url } : {}),
    };
  }
  if (row.rating_checked_at) r.ratingCheckedAt = row.rating_checked_at;
  if (row.naver_reviews != null) r.naverReviews = row.naver_reviews;
  if (row.naver_score != null) r.naverScore = row.naver_score;
  if (row.naver_checked_at) r.naverCheckedAt = row.naver_checked_at;
  const collections = parseJ(row.collections);
  if (Array.isArray(collections) && collections.length) r.collections = collections;
  return r;
}

export const PLACE_COLUMNS = [
  "slug",
  "name",
  "region",
  "district",
  "area",
  "in_office",
  "in_region",
  "category",
  "subcategory",
  "category_source",
  "naver_category",
  "address",
  "lat",
  "lng",
  "naver_place_id",
  "naver_url",
  "naver_address",
  "naver_reviews",
  "naver_score",
  "naver_checked_at",
  "kakao_id",
  "kakao_url",
  "kakao_address",
  "rating_score",
  "rating_count",
  "rating_source",
  "rating_url",
  "rating_fetched_at",
  "rating_checked_at",
  "menu",
  "hours",
  "collections",
  "tags",
  "price_range",
  "notes",
  "curated_by",
  "curated_url",
  "walk_meters",
  "walk_minutes",
  "walk_from_map",
  "mention_count",
  "legacy_slugs",
  "added_at",
  "updated_at",
  "deleted_at",
  "deleted_reason",
  "row_version",
  "row_hash",
];
