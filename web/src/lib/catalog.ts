export type RestaurantSource = {
  channelId: string;
  messageTs?: string;
  permalink?: string;
  author?: string;
};

export const CATEGORY_GROUPS = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "분식",
  "샐러드",
] as const;

export type MenuItem = {
  name: string;
  /** Won per person. */
  price?: number;
};

/** "HH:MM" in Asia/Seoul; close may be "24:00" or earlier than open (past midnight). */
export type OpeningHours = {
  open: string;
  close: string;
  breakStart?: string;
  breakEnd?: string;
};

export type Restaurant = {
  slug: string;
  name: string;
  area?: string;
  /** One of CATEGORY_GROUPS. */
  category?: string;
  /** Detailed cuisine, e.g. "돈까스·경양식". */
  subcategory?: string;
  priceRange?: string;
  notes?: string;
  walkMeters?: number;
  hours?: OpeningHours;
  menu?: MenuItem[];
  tags: string[];
  source?: RestaurantSource;
  addedAt: string;
  updatedAt: string;
  mentionCount: number;
};

export type RestaurantCatalog = {
  updatedAt: string;
  source: string;
  channelId?: string;
  /** Newest Slack message ts already processed by the collector. */
  lastMessageTs?: string;
  restaurants: Restaurant[];
};

export type SortKey = "popular" | "distance" | "price";

export type RestaurantFilters = {
  q?: string;
  category?: string;
  area?: string;
  tag?: string;
  /** Walking distance within NEAR_METERS. */
  near?: boolean;
  /** Minutes since midnight (Asia/Seoul); keeps only places open then. */
  openAt?: number | null;
  /** Some menu item at or under BUDGET_WON. */
  budget?: boolean;
  sort?: SortKey;
};

const METERS_PER_MINUTE = 80;
export const NEAR_MINUTES = 5;
export const NEAR_METERS = NEAR_MINUTES * METERS_PER_MINUTE;
export const BUDGET_WON = 10_000;

export function walkMinutes(meters: number): number {
  return Math.max(1, Math.ceil(meters / METERS_PER_MINUTE));
}

export function minPrice(r: Restaurant): number | undefined {
  const prices = (r.menu ?? [])
    .map((m) => m.price)
    .filter((p): p is number => typeof p === "number");
  return prices.length ? Math.min(...prices) : undefined;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function within(now: number, start: number, end: number): boolean {
  return start <= end ? now >= start && now < end : now >= start || now < end;
}

/** Open at `now` (minutes since midnight), outside the break. Unknown hours → false. */
export function isOpenAt(hours: OpeningHours | undefined, now: number): boolean {
  if (!hours) return false;
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const allDay = open === close || (open === 0 && close === 24 * 60);
  if (!allDay && !within(now, open, close)) return false;
  if (hours.breakStart && hours.breakEnd) {
    return !within(now, toMinutes(hours.breakStart), toMinutes(hours.breakEnd));
  }
  return true;
}

export function seoulMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

const byPopular = (a: Restaurant, b: Restaurant) =>
  b.mentionCount - a.mentionCount || a.name.localeCompare(b.name, "ko");

/** Ascending by a numeric key; rows without a value go last. */
function byKey(key: (r: Restaurant) => number | undefined) {
  return (a: Restaurant, b: Restaurant) => {
    const x = key(a);
    const y = key(b);
    if (x === undefined && y === undefined) return byPopular(a, b);
    if (x === undefined) return 1;
    if (y === undefined) return -1;
    return x - y || byPopular(a, b);
  };
}

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: RestaurantFilters,
): Restaurant[] {
  const q = filters.q?.trim().toLowerCase();
  const category = filters.category?.trim().toLowerCase();
  const area = filters.area?.trim().toLowerCase();
  const tag = filters.tag?.trim().toLowerCase();
  const openAt = filters.openAt;

  const rows = restaurants.filter((r) => {
    if (category && category !== "all") {
      const group = (r.category ?? "").toLowerCase();
      const detail = (r.subcategory ?? "").toLowerCase();
      if (group !== category && !detail.includes(category)) return false;
    }
    if (area && area !== "all") {
      if (!(r.area ?? "").toLowerCase().includes(area)) return false;
    }
    if (tag && tag !== "all") {
      if (!r.tags.some((t) => t.toLowerCase() === tag)) return false;
    }
    if (filters.near && !(r.walkMeters !== undefined && r.walkMeters <= NEAR_METERS)) {
      return false;
    }
    if (typeof openAt === "number" && !isOpenAt(r.hours, openAt)) return false;
    if (filters.budget) {
      const p = minPrice(r);
      if (p === undefined || p > BUDGET_WON) return false;
    }
    if (q) {
      const hay = [
        r.name,
        r.area,
        r.category,
        r.subcategory,
        r.priceRange,
        r.notes,
        ...r.tags,
        ...(r.menu ?? []).map((m) => m.name),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const sort =
    filters.sort === "distance"
      ? byKey((r) => r.walkMeters)
      : filters.sort === "price"
        ? byKey(minPrice)
        : byPopular;
  return rows.sort(sort);
}

export function uniqueValues(
  restaurants: Restaurant[],
  key: "category" | "area",
): string[] {
  const set = new Set<string>();
  for (const r of restaurants) {
    const v = r[key]?.trim();
    if (v) set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "ko"));
}

/** Category groups present in the data, in CATEGORY_GROUPS order. */
export function presentGroups(restaurants: Restaurant[]): string[] {
  const have = new Set(restaurants.map((r) => r.category));
  return CATEGORY_GROUPS.filter((g) => have.has(g));
}

export function uniqueTags(restaurants: Restaurant[]): string[] {
  const set = new Set<string>();
  for (const r of restaurants) {
    for (const t of r.tags) {
      const v = t.trim();
      if (v) set.add(v);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b, "ko"));
}
