// Import Naver Map shared bookmark folders into per-province files the web
// app loads on demand (../web/public/regions/<id>.json + ../web/data/regions.json).
// Folder share ids live in .naver-folders.local (gitignored), one per line:
//   <shareId> [theme name]
// Place details (category, hours, menu) are cached in .cache/naver-places.json,
// so an interrupted run resumes where it stopped.
// Usage: npm run catalog:naver-folders [-- --concurrency 1 --delay 3000] [-- --offline]
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const webDir = path.resolve(root, "..", "web");
const listFile = path.join(root, ".naver-folders.local");
const cacheFile = path.join(root, ".cache", "naver-places.json");
const officeFile = path.join(webDir, "data", "restaurants.json");
const outDir = path.join(webDir, "public", "regions");
const indexFile = path.join(webDir, "data", "regions.json");

const argValue = (name: string) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const CONCURRENCY = Number(argValue("--concurrency") ?? 1);
/** Pause after each request; Naver answers 429 when this is too short. */
const DELAY_MS = Number(argValue("--delay") ?? 3000);
/** Rebuild the region files from .cache only (no requests). */
const offline = process.argv.includes("--offline");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
  "Accept-Language": "ko-KR,ko;q=0.9",
  Referer: "https://map.naver.com/",
};

const PROVINCES: Record<string, { id: string; label: string }> = {
  서울: { id: "seoul", label: "서울" },
  부산: { id: "busan", label: "부산" },
  대구: { id: "daegu", label: "대구" },
  인천: { id: "incheon", label: "인천" },
  광주: { id: "gwangju", label: "광주" },
  대전: { id: "daejeon", label: "대전" },
  울산: { id: "ulsan", label: "울산" },
  세종: { id: "sejong", label: "세종" },
  경기: { id: "gyeonggi", label: "경기" },
  강원: { id: "gangwon", label: "강원" },
  충북: { id: "chungbuk", label: "충북" },
  충남: { id: "chungnam", label: "충남" },
  전북: { id: "jeonbuk", label: "전북" },
  전남: { id: "jeonnam", label: "전남" },
  경북: { id: "gyeongbuk", label: "경북" },
  경남: { id: "gyeongnam", label: "경남" },
  제주: { id: "jeju", label: "제주" },
};
const PROVINCE_ALIASES: Record<string, string> = {
  서울특별시: "서울",
  부산광역시: "부산",
  대구광역시: "대구",
  인천광역시: "인천",
  광주광역시: "광주",
  대전광역시: "대전",
  울산광역시: "울산",
  세종특별자치시: "세종",
  경기도: "경기",
  강원도: "강원",
  강원특별자치도: "강원",
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전북특별자치도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
  제주특별자치도: "제주",
};

/** Naver category text → web CATEGORY_GROUPS; first match wins. */
const CATEGORY_RULES: [string, RegExp][] = [
  ["카페·디저트", /카페|디저트|베이커리|빵|케이크|도넛|아이스크림|빙수|떡|와플|초콜릿|차$|전통찻집|커피/],
  ["주점", /술집|주점|바\(BAR\)|^바$|호프|맥주|이자카야|포차|와인|칵테일|요리주점|전통주/],
  ["분식", /분식|김밥|떡볶이|순대$|라면|만두/],
  ["샐러드", /샐러드|포케|비건/],
  ["아시안", /베트남|태국|인도|아시아|쌀국수|중동|멕시코|동남아|대만|네팔|터키/],
  ["중식", /중식|중국|마라|양꼬치|딤섬|짬뽕|짜장/],
  ["일식", /일식|일본|초밥|스시|라멘|돈가스|돈까스|우동|소바|오마카세|이자카야|덮밥|카레|사케|장어/],
  ["양식", /양식|이탈리|프랑스|스페인|스테이크|파스타|피자|햄버거|버거|브런치|멕시칸|그리스|유럽|아메리칸|패밀리레스토랑|뷔페/],
  ["한식", /./],
];

type MenuItem = { name: string; price?: number };
type Hours = { open: string; close: string; breakStart?: string; breakEnd?: string };
type PlaceDetail = {
  name?: string;
  category?: string;
  roadAddress?: string;
  address?: string;
  reviews?: number;
  hours?: Hours;
  closedDays?: string[];
  menu?: MenuItem[];
  fetchedAt: string;
};
type Bookmark = {
  name: string;
  sid: string;
  address?: string;
  px: number;
  py: number;
  mcidName?: string;
  available?: boolean;
  type?: string;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Shared by all workers: once Naver throttles, everyone waits. */
let pausedUntil = 0;

async function fetchText(url: string): Promise<string> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const wait = pausedUntil - Date.now();
    if (wait > 0) await sleep(wait);
    let status = "network error";
    try {
      const res = await fetch(url, { headers: HEADERS });
      const text = await res.text();
      await sleep(DELAY_MS);
      if (res.ok && text) return text;
      status = `HTTP ${res.status}`;
    } catch {
      // retried below
    }
    const cooldown = 60_000 * (attempt + 1);
    if (Date.now() + cooldown > pausedUntil) {
      pausedUntil = Date.now() + cooldown;
      console.log(`throttled (${status}); pausing ${cooldown / 1000}s`);
    }
  }
  throw new Error(`fetch failed: ${url}`);
}

async function folderBookmarks(shareId: string): Promise<{ name: string; list: Bookmark[] }> {
  const text = await fetchText(
    `https://pages.map.naver.com/save-pages/api/maps-bookmark/v3/shares/${shareId}/bookmarks?start=0&limit=5000&sort=lastUseTime`,
  );
  const data = JSON.parse(text) as { folder?: { name?: string }; bookmarkList?: Bookmark[] };
  return { name: data.folder?.name ?? shareId, list: data.bookmarkList ?? [] };
}

type Apollo = Record<string, Record<string, unknown>>;

function apollo(html: string): Apollo {
  const m = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{.*?\});\s*window\./s);
  return m ? (JSON.parse(m[1]) as Apollo) : {};
}

type WorkingDay = {
  day: string;
  businessHours?: { start: string; end: string } | null;
  breakHours?: { start: string; end: string }[] | null;
  description?: string | null;
};

async function placeDetail(sid: string): Promise<PlaceDetail> {
  const home = apollo(await fetchText(`https://m.place.naver.com/restaurant/${sid}/home`));
  const base = (home[`PlaceDetailBase:${sid}`] ?? {}) as Record<string, unknown>;
  const rootQuery = home.ROOT_QUERY ?? {};
  const detailKey = Object.keys(rootQuery).find((k) => k.startsWith("placeDetail"));
  const detail = (detailKey ? rootQuery[detailKey] : {}) as Record<string, unknown>;
  const hoursKey = Object.keys(detail).find((k) => k.startsWith("newBusinessHours"));
  const days = ((hoursKey ? (detail[hoursKey] as { businessHours?: WorkingDay[] }[]) : [])[0]?.businessHours ?? []);
  const weekday = days.find((d) => "월화수목금".includes(d.day) && d.businessHours);
  const hours: Hours | undefined = weekday?.businessHours
    ? {
        open: weekday.businessHours.start,
        close: weekday.businessHours.end,
        ...(weekday.breakHours?.[0]
          ? { breakStart: weekday.breakHours[0].start, breakEnd: weekday.breakHours[0].end }
          : {}),
      }
    : undefined;
  const closedDays = days.filter((d) => /휴무/.test(d.description ?? "")).map((d) => d.day);

  const menuState = apollo(await fetchText(`https://m.place.naver.com/restaurant/${sid}/menu/list`));
  const items = Object.entries(menuState)
    .filter(([k]) => k.startsWith("PlaceMenuItem:"))
    .map(([, v]) => {
      const price = v.price as { priceType?: string; displayText?: string } | undefined;
      const value =
        price?.priceType === "fixed" ? Number(String(price.displayText ?? "").replace(/[^\d]/g, "")) : NaN;
      return {
        name: String(v.name ?? "").trim(),
        price: Number.isFinite(value) && value > 0 ? value : undefined,
        repr: ((v.badges as string[] | undefined) ?? []).includes("repr"),
      };
    })
    .filter((m) => m.name);
  const menu = [...items.filter((m) => m.repr), ...items.filter((m) => !m.repr)]
    .slice(0, 4)
    .map(({ name, price }) => (price ? { name, price } : { name }));

  return {
    name: base.name as string | undefined,
    category: base.category as string | undefined,
    roadAddress: base.roadAddress as string | undefined,
    address: base.address as string | undefined,
    reviews: base.visitorReviewsTotal as number | undefined,
    hours,
    closedDays,
    menu,
    fetchedAt: new Date().toISOString(),
  };
}

function regionOf(address: string | undefined): { province: string; district: string } | undefined {
  const parts = (address ?? "").trim().split(/\s+/);
  const head = PROVINCE_ALIASES[parts[0]] ?? parts[0];
  if (!PROVINCES[head]) return undefined;
  if (head === "세종") return { province: head, district: "세종" };
  return { province: head, district: parts[1] ?? head };
}

function groupOf(category: string | undefined): string {
  const text = category ?? "";
  return CATEGORY_RULES.find(([, re]) => re.test(text))?.[0] ?? "한식";
}

const fmt = (n: number) => n.toLocaleString("ko-KR");

// ---- run ----
if (!existsSync(listFile)) {
  console.error(`missing ${listFile}`);
  process.exit(1);
}
const folders = (await readFile(listFile, "utf8"))
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const [shareId, ...theme] = l.split(/\s+/);
    return { shareId, theme: theme.join(" ") || undefined };
  });

const places = new Map<string, Bookmark & { collections: Set<string> }>();
const bookmarksFile = path.join(root, ".cache", "naver-bookmarks.json");
await mkdir(path.dirname(bookmarksFile), { recursive: true });
if (offline) {
  const saved = JSON.parse(await readFile(bookmarksFile, "utf8")) as (Bookmark & { collections: string[] })[];
  for (const b of saved) places.set(b.sid, { ...b, collections: new Set(b.collections) });
} else {
  for (const f of folders) {
    const { name, list } = await folderBookmarks(f.shareId);
    let kept = 0;
    for (const b of list) {
      if (b.type && b.type !== "place") continue;
      if (b.available === false || !b.sid) continue;
      const entry = places.get(b.sid) ?? { ...b, collections: new Set<string>() };
      if (f.theme) entry.collections.add(f.theme);
      places.set(b.sid, entry);
      kept++;
    }
    console.log(`folder ${name}: ${kept}${f.theme ? ` → theme "${f.theme}"` : ""}`);
    await sleep(1500);
  }
  await writeFile(
    bookmarksFile,
    JSON.stringify([...places.values()].map((p) => ({ ...p, collections: [...p.collections] }))),
  );
}

const office = JSON.parse(await readFile(officeFile, "utf8")) as {
  restaurants: { naver?: { placeId: string } }[];
};
const inOffice = new Set(office.restaurants.map((r) => r.naver?.placeId).filter(Boolean));
const todo = [...places.values()].filter((p) => !inOffice.has(p.sid));
console.log(`unique places ${places.size}, already in office list ${places.size - todo.length}`);

await mkdir(path.dirname(cacheFile), { recursive: true });
const cache: Record<string, PlaceDetail> = existsSync(cacheFile)
  ? JSON.parse(await readFile(cacheFile, "utf8"))
  : {};
const missing = offline ? [] : todo.filter((p) => !cache[p.sid]);
const cachedCount = todo.filter((p) => cache[p.sid]).length;
console.log(`details cached ${cachedCount}, to fetch ${offline ? 0 : missing.length}`);

let done = 0;
let failed = 0;
let lastSave = Date.now();
const queue = [...missing];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let p = queue.shift(); p; p = queue.shift()) {
      try {
        cache[p.sid] = await placeDetail(p.sid);
      } catch {
        failed++;
      }
      done++;
      if (done % 50 === 0 || Date.now() - lastSave > 60_000) {
        lastSave = Date.now();
        await writeFile(cacheFile, JSON.stringify(cache));
        console.log(`details ${done}/${missing.length} (failed ${failed}) ${new Date().toLocaleTimeString("ko-KR")}`);
      }
    }
  }),
);
await writeFile(cacheFile, JSON.stringify(cache));

type Row = Record<string, unknown> & { district: string; collections?: string[] };
const byProvince = new Map<string, Row[]>();
let unplaced = 0;
const now = new Date().toISOString();
for (const p of todo) {
  const d = cache[p.sid];
  const region = regionOf(d?.roadAddress ?? p.address);
  if (!region) {
    unplaced++;
    continue;
  }
  const menu = d?.menu ?? [];
  const prices = menu.map((m) => m.price).filter((v): v is number => typeof v === "number");
  const lo = prices.length ? Math.min(...prices) : undefined;
  const hi = prices.length ? Math.max(...prices) : undefined;
  const url = `https://map.naver.com/p/entry/place/${p.sid}`;
  const name = d?.name ?? p.name;
  const row: Row = {
    slug: `naver-${p.sid}`,
    name,
    area: region.district,
    district: region.district,
    category: groupOf(d?.category ?? p.mcidName),
    ...(d?.category ? { subcategory: d.category.replace(/,/g, "·") } : {}),
    ...(lo !== undefined ? { priceRange: lo === hi ? `${fmt(lo)}원` : `${fmt(lo)}~${fmt(hi!)}원` } : {}),
    ...(d?.closedDays?.length ? { notes: `${d.closedDays.join("·")} 휴무` } : {}),
    tags: [],
    addedAt: now,
    updatedAt: now,
    mentionCount: 0,
    address: d?.roadAddress ?? p.address,
    ...(menu.length ? { menu } : {}),
    ...(d?.hours ? { hours: d.hours } : {}),
    location: { lat: p.py, lng: p.px },
    naver: { placeId: p.sid, url },
    ...(p.collections.size ? { collections: [...p.collections].sort() } : {}),
  };
  const list = byProvince.get(region.province) ?? [];
  list.push(row);
  byProvince.set(region.province, list);
}

await mkdir(outDir, { recursive: true });
const index = [];
for (const [province, rows] of [...byProvince.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const { id, label } = PROVINCES[province];
  rows.sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
  await writeFile(path.join(outDir, `${id}.json`), `${JSON.stringify({ updatedAt: now, restaurants: rows })}\n`);
  const districts = new Map<string, number>();
  for (const r of rows) districts.set(r.district, (districts.get(r.district) ?? 0) + 1);
  index.push({
    id,
    label,
    count: rows.length,
    districts: [...districts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "ko"))
      .map(([name, count]) => ({ name, count })),
  });
}
await writeFile(indexFile, `${JSON.stringify({ updatedAt: now, regions: index }, null, 2)}\n`);
console.log(
  `wrote ${index.length} regions, ${index.reduce((s, r) => s + r.count, 0)} places` +
    (unplaced ? `, ${unplaced} without a province` : "") +
    (failed ? `, ${failed} detail fetches failed (rerun to retry)` : ""),
);
