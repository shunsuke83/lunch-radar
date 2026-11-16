import type { FilterState } from "@/components/restaurant-filters";
import { LEGACY_NO_BREAK_THEME, OFFICE_REGION, type SortKey } from "@/lib/catalog";

export const EMPTY_FILTERS: FilterState = {
  q: "",
  category: "all",
  tag: "all",
  theme: "all",
  district: "all",
  near: false,
  openNow: false,
  budget: false,
  noBreak: false,
  sort: "reviews",
};

/** The removed "늦은 점심" theme now lives on as the 브레이크 없음 chip. */
function migrateLegacyTheme(filters: FilterState): FilterState {
  return filters.theme === LEGACY_NO_BREAK_THEME ? { ...filters, theme: "all", noBreak: true } : filters;
}

export type ExplorerState = {
  region: string;
  view: "list" | "map";
  filters: FilterState;
};

const SORTS = new Set<SortKey>(["reviews", "rating", "distance", "price"]);
export const FILTER_STORAGE_KEY = "lunch-radar:filters:v1";

function flag(v: string | null): boolean {
  return v === "1" || v === "true";
}

/** Read region / view / filters from a query string (leading `?` optional). */
export function parseExplorerSearch(search: string): Partial<ExplorerState> {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const out: Partial<ExplorerState> = {};
  const region = q.get("region");
  if (region) out.region = region;
  const view = q.get("view");
  if (view === "list" || view === "map") out.view = view;

  const filters: FilterState = { ...EMPTY_FILTERS };
  let touched = false;
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    filters[key] = value;
    touched = true;
  };
  if (q.has("q")) set("q", q.get("q") ?? "");
  if (q.has("category")) set("category", q.get("category") || "all");
  if (q.has("tag")) set("tag", q.get("tag") || "all");
  if (q.has("theme")) set("theme", q.get("theme") || "all");
  if (q.has("district")) set("district", q.get("district") || "all");
  if (q.has("near")) set("near", flag(q.get("near")));
  if (q.has("open")) set("openNow", flag(q.get("open")));
  if (q.has("budget")) set("budget", flag(q.get("budget")));
  if (q.has("nobreak")) set("noBreak", flag(q.get("nobreak")));
  const sort = q.get("sort");
  if (sort && SORTS.has(sort as SortKey)) set("sort", sort as SortKey);
  if (touched) out.filters = migrateLegacyTheme(filters);
  return out;
}

/** Build a query string with only non-default values (no leading `?`). */
export function serializeExplorerSearch(state: ExplorerState): string {
  const q = new URLSearchParams();
  if (state.region !== OFFICE_REGION) q.set("region", state.region);
  if (state.view !== "list") q.set("view", state.view);
  const f = state.filters;
  if (f.q.trim()) q.set("q", f.q.trim());
  if (f.category !== "all") q.set("category", f.category);
  if (f.tag !== "all") q.set("tag", f.tag);
  if (f.theme !== "all") q.set("theme", f.theme);
  if (f.district !== "all") q.set("district", f.district);
  if (f.near) q.set("near", "1");
  if (f.openNow) q.set("open", "1");
  if (f.budget) q.set("budget", "1");
  if (f.noBreak) q.set("nobreak", "1");
  if (f.sort !== "reviews") q.set("sort", f.sort);
  return q.toString();
}

export function readStoredExplorer(): Partial<ExplorerState> | null {
  try {
    const raw = localStorage.getItem(FILTER_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<ExplorerState>;
    const out: Partial<ExplorerState> = {};
    if (typeof data.region === "string" && data.region) out.region = data.region;
    if (data.view === "list" || data.view === "map") out.view = data.view;
    if (data.filters && typeof data.filters === "object") {
      out.filters = migrateLegacyTheme({ ...EMPTY_FILTERS, ...data.filters });
      if (!SORTS.has(out.filters.sort)) out.filters.sort = "reviews";
    }
    return out;
  } catch {
    return null;
  }
}

export function writeStoredExplorer(state: ExplorerState): void {
  try {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode / quota */
  }
}

/** Absolute share URL for the current filters (uses location.origin + pathname). */
export function explorerShareUrl(state: ExplorerState): string {
  const qs = serializeExplorerSearch(state);
  const path = typeof window !== "undefined" ? window.location.pathname : `${BASE_PATH || ""}/`;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return qs ? `${origin}${path}?${qs}` : `${origin}${path}`;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
