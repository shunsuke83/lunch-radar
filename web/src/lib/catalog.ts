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
  "카페·디저트",
  "주점",
] as const;

export type MenuItem = {
  name: string;
  /** Won per person. */
  price?: number;
};

export type Weekday = "월" | "화" | "수" | "목" | "금" | "토" | "일";

/** JS getDay() order: 0=Sun … 6=Sat → Korean short names. */
export const WEEKDAYS: readonly Weekday[] = ["일", "월", "화", "수", "목", "금", "토"];

/** "HH:MM" in Asia/Seoul; close may be "24:00" or earlier than open (past midnight). */
export type OpeningHours = {
  open: string;
  close: string;
  breakStart?: string;
  breakEnd?: string;
  /** Days the place is closed (Korean short names). Holidays are out of scope. */
  closedDays?: Weekday[];
};

export type GeoPoint = { lat: number; lng: number };

export type MapPlace = {
  kakaoId: string;
  kakaoUrl: string;
  address?: string;
};

export type CuratedInfo = {
  by: string;
  url?: string;
};

export type NaverPlace = {
  placeId: string;
  url: string;
};

export type PlaceRating = {
  score: number;
  count: number;
  source: "kakao" | "google";
  url?: string;
  fetchedAt: string;
};

export type Office = GeoPoint & { name: string; address: string };

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
  walkFromMap?: boolean;
  /** Walking minutes from Kakao walk routing when available. */
  walkMinutes?: number;
  hours?: OpeningHours;
  menu?: MenuItem[];
  address?: string;
  location?: GeoPoint;
  place?: MapPlace;
  naver?: NaverPlace;
  curated?: CuratedInfo;
  rating?: PlaceRating;
  ratingCheckedAt?: string;
  /** Naver visitor review count. */
  naverReviews?: number;
  /** Naver visitor star score, only where the owner publishes it. */
  naverScore?: number;
  tags: string[];
  /** Region files only: 시·군·구 from the address. */
  district?: string;
  /** Curated lists the place came from (e.g. a Naver Map folder), shown as themes. */
  collections?: string[];
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
  /** Map center; set by the enrich script. */
  office?: Office;
  restaurants: Restaurant[];
};

export type SortKey = "reviews" | "distance" | "price" | "rating" | "nearby";

/** Province files under public/regions/<id>.json, listed in data/regions.json. */
export type RegionIndex = {
  updatedAt: string;
  regions: { id: string; label: string; count: number; districts: { name: string; count: number }[] }[];
};

/** The embedded office catalog. */
export const OFFICE_REGION = "office";

/** Place pages when the enrich script found them, otherwise name searches. */
export function mapLinks(r: Restaurant): { naver: string; kakao: string } {
  const area = r.area && !r.name.includes(r.area) ? ` ${r.area}` : "";
  const query = encodeURIComponent(`${r.name}${area}`);
  return {
    naver: r.naver?.url ?? `https://map.naver.com/p/search/${query}`,
    kakao: r.place?.kakaoUrl ?? `https://map.kakao.com/?q=${query}`,
  };
}

/** Theme chip rows: situations, dishes, and curated lists (region files). */
export type ThemeGroup = "상황" | "메뉴" | "모음";

export type ThemeDef = {
  id: string;
  group: Exclude<ThemeGroup, "모음">;
  /** Any keyword in the name, subcategory, tags, or menu names. */
  keywords?: readonly string[];
  /** Match keywords on the name, subcategory, and tags only (side dishes in menus are noise). */
  coreOnly?: boolean;
  /** Restrict to these CATEGORY_GROUPS. */
  categories?: readonly string[];
  /** Extra condition for themes that keywords cannot express (hours, price). */
  test?: (r: Restaurant) => boolean;
};

/** Cheapest menu item at or above this suggests a sit-down meal for guests or team dinners. */
const HOSTING_MIN_WON = 18_000;

/** Cross-category themes. Order here is chip order within each group. */
export const THEMES: readonly ThemeDef[] = [
  { id: "점심특선", group: "상황", keywords: ["점심", "런치", "lunch", "Lunch", "LUNCH"] },
  {
    id: "해장",
    group: "상황",
    keywords: ["해장", "국밥", "순대국", "곰탕", "설렁탕", "감자탕", "선지", "콩나물", "내장탕", "우거지"],
  },
  {
    id: "비 오는 날",
    group: "상황",
    keywords: ["파전", "부침개", "빈대떡", "감자전", "김치전", "해물전", "모듬전", "육전", "칼국수", "수제비", "짬뽕"],
  },
  {
    id: "회식·접대",
    group: "상황",
    test: (r) =>
      (minPrice(r) ?? 0) >= HOSTING_MIN_WON ||
      ["한정식", "코스", "오마카세", "호텔"].some((k) => r.subcategory?.includes(k)),
  },
  {
    id: "집밥·백반",
    group: "메뉴",
    categories: ["한식"],
    keywords: [
      "백반", "집밥", "한식뷔페", "점심뷔페", "기사식당", "쌈밥", "보리밥", "제육볶음", "청국장",
      "된장찌개", "생선구이", "나물", "산채", "곤드레", "한상", "정식", "두부",
    ],
  },
  {
    id: "면 요리",
    group: "메뉴",
    keywords: [
      "국수", "국시", "칼국수", "냉면", "막국수", "라멘", "라면", "우동", "소바", "모밀", "메밀", "짬뽕",
      "짜장", "파스타", "스파게티", "쫄면", "콩국수", "탄탄면", "팟타이", "꾸아이띠아오", "분짜", "밀면",
      "비빔면", "온면", "수제비",
    ],
  },
  {
    id: "찌개·전골",
    group: "메뉴",
    keywords: ["찌개", "전골", "순두부", "샤브샤브", "닭한마리", "짜글이"],
  },
  {
    id: "덮밥·한 그릇",
    group: "메뉴",
    keywords: [
      "덮밥", "비빔밥", "카레", "커리", "솥밥", "오므라이스", "볶음밥", "규동", "사케동", "텐동", "가츠동",
      "부타동", "에비동", "돈부리", "포케", "나시고랭",
    ],
  },
  { id: "돈까스·카츠", group: "메뉴", keywords: ["돈까스", "돈가스", "돈카츠", "카츠", "가츠", "까스"] },
  {
    id: "고기 든든",
    group: "메뉴",
    categories: ["한식"],
    keywords: ["제육", "불고기", "불백", "갈비", "보쌈", "수육", "두루치기", "차돌", "육회", "고깃집", "숯불", "정육", "족발", "삼겹"],
  },
  {
    id: "매콤한",
    group: "메뉴",
    keywords: [
      "매운", "매콤", "얼큰", "마라", "짬뽕", "불닭", "떡볶이", "낙지", "쭈꾸미", "주꾸미", "닭갈비", "육개장",
      "부대찌개", "땡초", "김치찌개",
    ],
  },
  {
    id: "회·초밥",
    group: "메뉴",
    // Menus alone mislead here (참치김밥, 연어샐러드).
    coreOnly: true,
    keywords: ["초밥", "스시", "사시미", "회덮밥", "물회", "참치", "횟집", "뭉티기", "세꼬시"],
  },
  {
    id: "가벼운 한 끼",
    group: "메뉴",
    coreOnly: true,
    keywords: ["샐러드", "포케", "샌드위치", "김밥", "브런치", "반미", "베이글", "토스트", "보울"],
  },
  { id: "버거·피자", group: "메뉴", keywords: ["버거", "피자"] },
  {
    id: "생선구이",
    group: "메뉴",
    keywords: ["생선", "고등어구이", "삼치구이", "갈치구이", "조기구이", "임연수구이"],
  },
];

export type ThemeOption = { value: string; label: string; group: ThemeGroup };

/** Built-in themes in THEMES order, then collection names present in `restaurants`. */
export function themeOptions(restaurants: Restaurant[]): ThemeOption[] {
  const collections = new Map<string, number>();
  for (const r of restaurants) {
    for (const c of r.collections ?? []) collections.set(c, (collections.get(c) ?? 0) + 1);
  }
  const counted: { value: string; group: ThemeGroup; count: number }[] = [
    ...THEMES.map((t) => ({
      value: t.id,
      group: t.group,
      count: restaurants.filter((r) => matchesThemeDef(r, t)).length,
    })),
    ...[...collections.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "ko"))
      .map(([id, count]) => ({ value: id, group: "모음" as const, count })),
  ];
  return counted
    .filter((t) => t.count > 0)
    .map(({ value, group, count }) => ({ value, group, label: `${value} (${count})` }));
}

function matchesThemeDef(r: Restaurant, def: ThemeDef): boolean {
  if (def.categories && !def.categories.includes(r.category ?? "")) return false;
  if (def.keywords?.length) {
    const fields = def.coreOnly
      ? [r.name, r.subcategory, ...r.tags]
      : [r.name, r.subcategory, ...r.tags, ...(r.menu ?? []).map((m) => m.name)];
    const hay = fields.filter(Boolean).join(" ");
    if (def.keywords.some((k) => hay.includes(k))) return true;
  }
  return def.test?.(r) ?? false;
}

export function matchesTheme(r: Restaurant, theme: string): boolean {
  const def = THEMES.find((t) => t.id === theme);
  if (!def) return r.collections?.includes(theme) ?? false;
  return matchesThemeDef(r, def);
}

export type RestaurantFilters = {
  q?: string;
  category?: string;
  area?: string;
  tag?: string;
  /** A THEMES id or collection name, or "all". */
  theme?: string;
  /** 시·군·구 for region files, or "all". */
  district?: string;
  /** Walking distance within NEAR_METERS. */
  near?: boolean;
  /** Minutes since midnight (Asia/Seoul); keeps only places open then. */
  openAt?: number | null;
  /** Seoul weekday for openAt / closedDays checks. */
  weekday?: Weekday | null;
  /** Max menu price in won; true means BUDGET_WON for legacy callers. */
  budget?: boolean | number;
  /** Known hours with no break time. */
  noBreak?: boolean;
  /** Hide places the visitor marked as visited/disliked. */
  unvisitedOnly?: boolean;
  /** Slugs the visitor has recorded (visited or disliked). */
  recordedSlugs?: ReadonlySet<string>;
  /** Viewer lat/lng for nationwide "nearby" sort. */
  viewer?: GeoPoint | null;
  sort?: SortKey;
};

/** Theme id that became the "브레이크 없음" quick filter; old links map onto it. */
export const LEGACY_NO_BREAK_THEME = "늦은 점심";

/** Hours are known and there is no break time. Unknown hours → false. */
export function hasNoBreak(hours: OpeningHours | undefined): boolean {
  return !!hours && !(hours.breakStart && hours.breakEnd);
}

const METERS_PER_MINUTE = 80;
export const NEAR_MINUTES = 5;
export const NEAR_METERS = NEAR_MINUTES * METERS_PER_MINUTE;
export const BUDGET_WON = 10_000;
export const BUDGET_OPTIONS = [8_000, 10_000, 12_000, 15_000] as const;
/** Bayesian prior strength for rating sort. */
const RATING_PRIOR_N = 10;
/** Places added within this many days show a "새로 추가" badge. */
export const NEW_DAYS = 7;

export function walkMinutes(meters: number): number {
  return Math.max(1, Math.ceil(meters / METERS_PER_MINUTE));
}

/** Prefer Kakao routing minutes when present. */
export function displayWalkMinutes(r: Restaurant): number | undefined {
  if (r.walkMinutes !== undefined) return r.walkMinutes;
  if (r.walkMeters !== undefined) return walkMinutes(r.walkMeters);
  return undefined;
}

export function isClosedOn(hours: OpeningHours | undefined, weekday: Weekday | null | undefined): boolean {
  return !!weekday && !!hours?.closedDays?.includes(weekday);
}

export function closedDaysLabel(days: Weekday[] | undefined): string | null {
  if (!days?.length) return null;
  return `${days.join("·")} 휴무`;
}

export function isRecentlyAdded(r: Restaurant, now = Date.now()): boolean {
  const t = Date.parse(r.addedAt);
  return Number.isFinite(t) && now - t <= NEW_DAYS * 24 * 60 * 60 * 1000;
}

/** Search synonyms so 돈가스 hits 돈까스, etc. */
const SEARCH_SYNONYMS: [RegExp, string][] = [
  [/돈가스|돈카츠|돈까스|카츠|가츠|까스/g, "돈까스"],
  [/순댓국|순대국/g, "순대국"],
  [/짬뽕|참뽕/g, "짬뽕"],
  [/라멘|라면(?!사리)/g, "라멘"],
];

export function normalizeSearchText(text: string): string {
  let s = text.toLowerCase();
  for (const [re, to] of SEARCH_SYNONYMS) s = s.replace(re, to);
  return s;
}

export function bayesianRating(score: number, count: number, priorMean: number, priorN = RATING_PRIOR_N): number {
  return (count / (count + priorN)) * score + (priorN / (count + priorN)) * priorMean;
}

export function haversineM(a: GeoPoint, b: GeoPoint): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
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

/** Typical office lunch window (Asia/Seoul minutes since midnight). */
export const LUNCH_START = 11 * 60 + 30;
export const LUNCH_END = 13 * 60 + 30;
const CLOSING_SOON_MIN = 30;

/** Open at `now` (minutes since midnight), outside the break. Unknown hours → false. */
export function isOpenAt(
  hours: OpeningHours | undefined,
  now: number,
  weekday?: Weekday | null,
): boolean {
  if (!hours) return false;
  if (isClosedOn(hours, weekday)) return false;
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const allDay = open === close || (open === 0 && close === 24 * 60);
  if (!allDay && !within(now, open, close)) return false;
  if (hours.breakStart && hours.breakEnd) {
    return !within(now, toMinutes(hours.breakStart), toMinutes(hours.breakEnd));
  }
  return true;
}

export type OpenKind = "open" | "break" | "closingSoon" | "closed" | "unknown";

export type OpenStatus = {
  kind: OpenKind;
  label: string;
  /** True when the place is open for some time during the lunch window today. */
  lunchOk: boolean;
};

/** Badge copy for the list/map: open now, on break, closing soon, or closed. */
export function openStatus(
  hours: OpeningHours | undefined,
  now: number | null,
  weekday: Weekday | null = null,
): OpenStatus {
  const lunchOk =
    !!hours &&
    !isClosedOn(hours, weekday) &&
    (isOpenAt(hours, LUNCH_START, weekday) ||
      isOpenAt(hours, Math.floor((LUNCH_START + LUNCH_END) / 2), weekday) ||
      isOpenAt(hours, LUNCH_END - 1, weekday));
  if (!hours || now === null) return { kind: "unknown", label: "시간 미확인", lunchOk };
  if (isClosedOn(hours, weekday)) {
    return { kind: "closed", label: closedDaysLabel(hours.closedDays) ?? "휴무", lunchOk: false };
  }
  if (hours.breakStart && hours.breakEnd) {
    const bs = toMinutes(hours.breakStart);
    const be = toMinutes(hours.breakEnd);
    if (within(now, bs, be)) {
      return { kind: "break", label: `브레이크 ${hours.breakStart}–${hours.breakEnd}`, lunchOk };
    }
  }
  if (!isOpenAt(hours, now, weekday)) return { kind: "closed", label: "영업 전·종료", lunchOk };
  const close = toMinutes(hours.close);
  const allDay = toMinutes(hours.open) === close || close === 24 * 60;
  if (!allDay) {
    const minsLeft = close >= now ? close - now : close + 24 * 60 - now;
    if (minsLeft <= CLOSING_SOON_MIN) {
      return { kind: "closingSoon", label: `${minsLeft}분 후 마감`, lunchOk };
    }
  }
  return { kind: "open", label: "영업 중", lunchOk };
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

/** Korean weekday short name in Asia/Seoul. */
export function seoulWeekday(date: Date): Weekday {
  const day = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", weekday: "short" }).format(date);
  const map: Record<string, Weekday> = {
    Sun: "일",
    Mon: "월",
    Tue: "화",
    Wed: "수",
    Thu: "목",
    Fri: "금",
    Sat: "토",
  };
  return map[day] ?? WEEKDAYS[date.getDay()];
}

const byReviews = (a: Restaurant, b: Restaurant) =>
  (b.naverReviews ?? 0) - (a.naverReviews ?? 0) || a.name.localeCompare(b.name, "ko");

/** Ascending by a numeric key; rows without a value go last. */
function byKey(key: (r: Restaurant) => number | undefined) {
  return (a: Restaurant, b: Restaurant) => {
    const x = key(a);
    const y = key(b);
    if (x === undefined && y === undefined) return byReviews(a, b);
    if (x === undefined) return 1;
    if (y === undefined) return -1;
    return x - y || byReviews(a, b);
  };
}

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: RestaurantFilters,
): Restaurant[] {
  const q = filters.q?.trim() ? normalizeSearchText(filters.q.trim()) : "";
  const category = filters.category?.trim().toLowerCase();
  const area = filters.area?.trim().toLowerCase();
  const tag = filters.tag?.trim().toLowerCase();
  const openAt = filters.openAt;
  const weekday = filters.weekday ?? null;
  const budgetCap =
    filters.budget === true ? BUDGET_WON : typeof filters.budget === "number" ? filters.budget : null;

  const rows = restaurants.filter((r) => {
    if (filters.district && filters.district !== "all" && r.district !== filters.district) return false;
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
    if (filters.theme && filters.theme !== "all" && !matchesTheme(r, filters.theme)) return false;
    if (filters.near && !(r.walkMeters !== undefined && r.walkMeters <= NEAR_METERS)) {
      return false;
    }
    if (typeof openAt === "number" && !isOpenAt(r.hours, openAt, weekday)) return false;
    if (filters.noBreak && !hasNoBreak(r.hours)) return false;
    if (budgetCap !== null) {
      const p = minPrice(r);
      if (p === undefined || p > budgetCap) return false;
    }
    if (filters.unvisitedOnly && filters.recordedSlugs?.has(r.slug)) return false;
    if (q) {
      const hay = normalizeSearchText(
        [
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
          .join(" "),
      );
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const rated = rows.filter((r) => r.rating?.source === "kakao");
  const priorMean =
    rated.length > 0 ? rated.reduce((s, r) => s + r.rating!.score, 0) / rated.length : 3.5;

  const sort =
    filters.sort === "distance"
      ? byKey((r) => r.walkMeters)
      : filters.sort === "nearby" && filters.viewer
        ? byKey((r) => (r.location ? haversineM(filters.viewer!, r.location) : undefined))
        : filters.sort === "price"
          ? byKey(minPrice)
          : filters.sort === "rating"
            ? byKey((r) =>
                r.rating
                  ? -(
                      bayesianRating(r.rating.score, r.rating.count, priorMean) * 1e6 +
                      r.rating.count
                    )
                  : undefined,
              )
            : byReviews;
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

/** Scraped/meta tags that should not appear on the public site. */
const INTERNAL_TAGS = new Set(["신규조사", "도보10분권", "양재", "영업확인필요"]);
const CATEGORY_TAG_SET = new Set<string>(CATEGORY_GROUPS);

/** Needs a manual hours check; shown as a warning badge, not a tag chip. */
export function needsHoursCheck(r: Restaurant): boolean {
  return r.tags.some((t) => t.trim() === "영업확인필요");
}

/** Tags worth showing next to the category badge (drops internals and kind duplicates). */
export function displayTags(r: Restaurant): string[] {
  return r.tags.filter((t) => {
    const v = t.trim();
    if (!v || INTERNAL_TAGS.has(v) || CATEGORY_TAG_SET.has(v)) return false;
    if (r.category && v === r.category) return false;
    return true;
  });
}

export function uniqueTags(restaurants: Restaurant[]): string[] {
  return tagOptions(restaurants).map((t) => t.value);
}

/** Display tags with counts, most used first (for chip filters). */
export function tagOptions(restaurants: Restaurant[]): { value: string; label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of restaurants) {
    for (const t of displayTags(r)) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko"))
    .map(([value, count]) => ({ value, label: `${value} (${count})`, count }));
}
