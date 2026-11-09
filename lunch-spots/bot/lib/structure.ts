import {
  CATEGORY_GROUPS,
  type CategoryGroup,
  type MenuItem,
  type OpeningHours,
  type Restaurant,
} from "./restaurants.js";

// Checked per "·" segment of the subcategory, in order; the first segment
// that matches decides, so "파스타·샐러드" is 양식 and "샐러드·스테이크" is 샐러드.
const GROUP_RULES: [CategoryGroup, RegExp][] = [
  ["샐러드", /샐러드/],
  ["분식", /분식|김밥|떡볶이|김말이|후토마키/],
  ["아시안", /태국|베트남|쌀국수|팟타이|반미|인도|커리|아시안/],
  ["중식", /중식|짬뽕|짜장|마라|딤섬|탕수육|유산슬|양꼬치/],
  ["일식", /일식|라멘|우동|초밥|스시|돈카츠|돈까스|텐동|사케동|장어|참치|모밀/],
  ["양식", /양식|파스타|스파게티|피자|버거|스테이크|샌드위치|브런치/],
];

export function isGroup(value: string | undefined): value is CategoryGroup {
  return CATEGORY_GROUPS.includes(value as CategoryGroup);
}

function classify(text: string): CategoryGroup | undefined {
  if (/경양식/.test(text)) return "양식";
  for (const segment of text.split(/[·,/]/)) {
    for (const [group, rule] of GROUP_RULES) {
      if (rule.test(segment)) return group;
    }
  }
  return undefined;
}

/**
 * Split a category into a group (one of CATEGORY_GROUPS) and the detail.
 * A non-group category is treated as the detail. With a detail but no rule
 * match the group is 한식; with no detail, name/tags are tried and the group
 * stays empty when nothing matches.
 */
export function normalizeCategory(r: {
  category?: string;
  subcategory?: string;
  name: string;
  tags?: string[];
}): { category?: CategoryGroup; subcategory?: string } {
  const category = r.category?.trim() || undefined;
  if (isGroup(category)) {
    return { category, subcategory: r.subcategory?.trim() || undefined };
  }
  const subcategory = r.subcategory?.trim() || category;
  if (subcategory) {
    return { category: classify(subcategory) ?? "한식", subcategory };
  }
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

const toWon = (s: string) => Number(s.replace(/,/g, ""));
const pad = (t: string) => t.padStart(5, "0");

function parseMenu(segment: string, allowPriceless: boolean): MenuItem[] {
  const items: MenuItem[] = [];
  let lastBase = "";
  for (const raw of segment.split(/\s+\/\s+/)) {
    const text = raw.trim();
    const m = ITEM.exec(text);
    if (!m) {
      if (allowPriceless && text && !/\d/.test(text) && text.length <= 30) {
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
    if (name) items.push({ name, price });
  }
  return items;
}

/** Pull menu / hours / walking distance out of the collector's notes format. */
export function parseNotes(notes: string | undefined): {
  menu?: MenuItem[];
  hours?: OpeningHours;
  walkMeters?: number;
} {
  const out: { menu?: MenuItem[]; hours?: OpeningHours; walkMeters?: number } = {};
  if (!notes?.trim()) return out;
  notes
    .split(/\s+·\s+/)
    .map((s) => s.trim())
    .forEach((segment, i) => {
      const walk = WALK.exec(segment);
      if (walk) {
        out.walkMeters = toWon(walk[1]);
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
  const menu = r.menu?.length ? r.menu : parsed.menu;
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
  const walkMeters = r.walkMeters ?? parsed.walkMeters;
  if (menu) next.menu = menu;
  if (hours) next.hours = hours;
  if (walkMeters !== undefined) next.walkMeters = walkMeters;
  for (const key of ["category", "subcategory"] as const) {
    if (next[key] === undefined) delete next[key];
  }
  return next;
}
