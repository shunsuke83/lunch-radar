import {
  CATEGORY_GROUPS,
  type CategoryGroup,
  type MenuItem,
  type OpeningHours,
  type Restaurant,
  type Weekday,
} from "./restaurants.js";

// Same order/rules as web fix-categories / import-naver (first match wins).
// Keep in sync with scripts/category-rules.mjs
const GROUP_RULES: [CategoryGroup, RegExp][] = [
  ["한식", /사찰요리|사찰음식|발우공양|한식뷔페|보리밥뷔페/],
  [
    "주점",
    /술집|요리주점|전통주|한식주점|(?<![가-힣])주점(?![가-힣])|바\(BAR\)|^바$|호프|맥주|이자카야|야키토리|포차|포장마차|와인|칵테일|양조장|오뎅·꼬치|오뎅\/꼬치/,
  ],
  ["일식", /일식|일본|일본식라면|초밥|스시|라멘|돈카츠|돈까스|돈가스|텐동|사케동|참치|모밀|소바|오마카세|카레|사케|쿠시아게|쿠시가츠|가라아게|우동/],
  ["분식", /분식|김밥|떡볶이|김말이|후토마키|찐빵|토스트/],
  ["카페·디저트", /카페|디저트|베이커리|빵|케이크|도넛|아이스크림|빙수|(?<!빈대)떡(?!볶이)|호떡|호두과자|와플|초콜릿|전통찻집|커피|베이글/],
  ["샐러드", /샐러드|포케|비건|비건카페|비건베이/],
  ["아시안", /태국|베트남|쌀국수|팟타이|반미|인도|커리|아시안|중동|멕시코|동남아|대만|네팔|터키/],
  ["중식", /중식|중국|짬뽕|짜장|마라(?!도)|딤섬|탕수육|유산슬|양꼬치/],
  [
    "양식",
    /양식|파스타|스파게티|피자|버거|햄버거|스테이크|샌드위치|브런치|이탈리|프랑스|스페인|멕시칸|그리스|유럽|아메리칸|패밀리레스토랑|경양식|(?<!밥)(?<!한식\s*)뷔페|프렌치|(?<!한식\s*)컨템포러리/,
  ],
  [
    "한식",
    /한식|한정식|국밥|국수|냉면|밀면|감자탕|곱창|막창|육회|삼겹|갈비|백반|찌개|전골|보쌈|족발|닭볶|찜닭|오리|막국수|칼국수|해장|한우|돼지|소고기|해물|생선|회$|횟집|도시락|죽$|정식|순대|순댓국|육류|고기요리|고기집|고기$|치킨|치맥|닭강정|닭요리|닭갈비|닭발|곰탕|설렁탕|도가니|뼈해장|부대찌개|된장|김치찌개|순두부|비빔밥|돌솥|콩국|수제비|만두|빈대떡|파전|추어|매운탕|아구|백숙|삼계|불고기|제육|두루치기|쌈밥|주먹밥|컵밥|덮밥|샤브|육개장|설렁|감자옹심|보리밥|산채|비빔|기사식당|두부|쭈꾸미|주꾸미|낙지|복어|정육식당|조개|향토음식|게요리|굴요리|오징어|전복|이북음식|장어|양갈비/,
  ],
];

/** Import-only memos — never treat as menu (aligned with web INTERNAL_NOTES). */
const INTERNAL_NOTE =
  /Eat my Seoul|RIBBON_|Neon Vetted|Neon Heart|\bSelected\b|MATJIDO|Sikr|내부\s*메모|내부메모|\bimport\b|scrape|^※/i;

export function isGroup(value: string | undefined): value is CategoryGroup {
  return CATEGORY_GROUPS.includes(value as CategoryGroup);
}

function classify(text: string): CategoryGroup | undefined {
  if (!text?.trim()) return undefined;
  if (/경양식/.test(text)) return "양식";
  // First-match on the full hint (same as web fix-categories), so a name
  // signal like 짬뽕 wins over a weak subcategory like 쭈꾸미.
  for (const [group, rule] of GROUP_RULES) {
    if (rule.test(text)) return group;
  }
  return undefined;
}

/**
 * Split a category into a group (one of CATEGORY_GROUPS) and the detail.
 * Classify from subcategory only when present — never from shop-name fragments (R3).
 * Keep an existing group when the subcategory does not match; never invent 한식.
 */
export function normalizeCategory(r: {
  category?: string;
  subcategory?: string;
  name: string;
  tags?: string[];
}): { category?: CategoryGroup; subcategory?: string } {
  const rawCategory = r.category?.trim() || undefined;
  const subcategory =
    r.subcategory?.trim() || (rawCategory && !isGroup(rawCategory) ? rawCategory : undefined) || undefined;

  if (subcategory) {
    const fromSub = classify(subcategory);
    if (fromSub) return { category: fromSub, subcategory };
    if (isGroup(rawCategory)) return { category: rawCategory, subcategory };
    return { category: undefined, subcategory };
  }

  if (isGroup(rawCategory)) {
    return { category: rawCategory, subcategory: undefined };
  }

  // Name/tags only when there is no subcategory and no group yet.
  return {
    category: classify([r.name, ...(r.tags ?? [])].join("·")),
    subcategory: undefined,
  };
}

const NUM = String.raw`(\d{1,3}(?:,\d{3})+|\d{4,6})`;
const ITEM = new RegExp(
  String.raw`^(.*?)\s*${NUM}\s*원?(?:\s*\(\s*1인\s*${NUM}\s*원?\s*\))?(?:\s*[.。].*)?$`,
);
const HOURS =
  /^(\d{1,2}:\d{2})\s*[-~]\s*(\d{1,2}:\d{2})(?:\s*\(\s*(\d{1,2}:\d{2})\s*[-~]\s*(\d{1,2}:\d{2})\s*브레이크\s*\))?$/;
const WALK = /도보\s*약?\s*([\d,]+)\s*m\b/;
const CLOSED =
  /^([월화수목금토일](?:\s*[·,、\/]\s*[월화수목금토일])*)\s*휴무$/;
const WEEKDAY_SET = new Set<string>(["월", "화", "수", "목", "금", "토", "일"]);

const toWon = (s: string) => Number(s.replace(/,/g, ""));
const pad = (t: string) => t.padStart(5, "0");

function parseClosedDays(segment: string): Weekday[] | undefined {
  const m = CLOSED.exec(segment.trim());
  if (!m) return undefined;
  const days = m[1]
    .split(/\s*[·,、\/]\s*/)
    .map((d) => d.trim())
    .filter((d): d is Weekday => WEEKDAY_SET.has(d));
  return days.length ? days : undefined;
}

function parseMenu(segment: string, allowPriceless: boolean): MenuItem[] {
  if (INTERNAL_NOTE.test(segment)) return [];
  const items: MenuItem[] = [];
  let lastBase = "";
  for (const raw of segment.split(/\s+\/\s+/)) {
    const text = raw.trim();
    if (INTERNAL_NOTE.test(text)) continue;
    const m = ITEM.exec(text);
    if (!m) {
      // Skip Latin-only priceless text (often a romanized shop name, not a dish).
      if (
        allowPriceless &&
        text &&
        !/\d/.test(text) &&
        text.length <= 30 &&
        /[가-힣]/.test(text)
      ) {
        items.push({ name: text });
      }
      continue;
    }
    let name = m[1].trim();
    let price = toWon(m[2]);
    // "즉석떡볶이 2인 17,000 (1인 8,500)" / "3인 17,500 (1인 5,830)"
    const party = /^(.*?)\s*(\d+인)$/.exec(name);
    if (party && m[3]) {
      const base = party[1].trim() || lastBase;
      name = `${base} 1인(${party[2]} 주문)`;
      price = toWon(m[3]);
      lastBase = base;
    } else {
      lastBase = name;
    }
    if (name && !INTERNAL_NOTE.test(name)) items.push({ name, price });
  }
  return items;
}

/** Pull menu / hours / walking distance out of the collector's notes format. */
export function parseNotes(notes: string | undefined): {
  menu?: MenuItem[];
  hours?: OpeningHours;
  walkMeters?: number;
  closedDays?: Weekday[];
} {
  const out: {
    menu?: MenuItem[];
    hours?: OpeningHours;
    walkMeters?: number;
    closedDays?: Weekday[];
  } = {};
  if (!notes?.trim()) return out;
  notes
    .split(/\s+·\s+/)
    .map((s) => s.trim())
    .forEach((segment, i) => {
      if (INTERNAL_NOTE.test(segment)) return;
      const walk = WALK.exec(segment);
      if (walk) {
        out.walkMeters = toWon(walk[1]);
        return;
      }
      const closed = parseClosedDays(segment);
      if (closed) {
        out.closedDays = closed;
        return;
      }
      if (segment === "24시간") {
        out.hours = { open: "00:00", close: "24:00" };
        return;
      }
      const h = HOURS.exec(segment);
      if (h) {
        out.hours = { open: pad(h[1]), close: pad(h[2]) };
        if (h[3] && h[4]) {
          out.hours.breakStart = pad(h[3]);
          out.hours.breakEnd = pad(h[4]);
        }
        return;
      }
      if (!out.menu) {
        const menu = parseMenu(segment, i === 0);
        if (menu.length > 0) out.menu = menu;
      }
    });
  if (out.hours && out.closedDays?.length) {
    out.hours = { ...out.hours, closedDays: out.closedDays };
  }
  return out;
}

/**
 * Fill category group/detail and the structured fields. Explicit values on the
 * record win; missing ones are derived from notes.
 */
export function structureRestaurant<T extends Restaurant>(r: T): T {
  const parsed = parseNotes(r.notes);
  const { category, subcategory } = normalizeCategory(r);
  const next: T = { ...r, category, subcategory };
  // Drop internal-memo menu rows that may already be on the record.
  const cleanedMenu = (r.menu ?? []).filter((m) => m.name && !INTERNAL_NOTE.test(m.name));
  const menu = cleanedMenu.length ? cleanedMenu : parsed.menu;
  let hours = r.hours ?? parsed.hours;
  // A break time added to the notes later still reaches an explicit hours value.
  if (
    hours &&
    !hours.breakStart &&
    parsed.hours?.breakStart &&
    parsed.hours.open === hours.open &&
    parsed.hours.close === hours.close
  ) {
    hours = { ...hours, breakStart: parsed.hours.breakStart, breakEnd: parsed.hours.breakEnd };
  }
  const closedDays = hours?.closedDays ?? parsed.closedDays ?? parsed.hours?.closedDays;
  if (hours && closedDays?.length && !hours.closedDays?.length) {
    hours = { ...hours, closedDays };
  }
  const walkMeters = r.walkMeters ?? parsed.walkMeters;
  if (menu?.length) next.menu = menu;
  else delete (next as { menu?: MenuItem[] }).menu;
  if (hours) next.hours = hours;
  if (walkMeters !== undefined) next.walkMeters = walkMeters;
  // Strip notes that are only internal memos so re-export cannot revive them as menu.
  if (r.notes?.trim()) {
    const kept = r.notes
      .split(/\s+·\s+/)
      .map((s) => s.trim())
      .filter((s) => s && !INTERNAL_NOTE.test(s));
    if (kept.length) next.notes = kept.join(" · ");
    else delete (next as { notes?: string }).notes;
  }
  for (const key of ["category", "subcategory"] as const) {
    if (next[key] === undefined) delete next[key];
  }
  return next;
}
