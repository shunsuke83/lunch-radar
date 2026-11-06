import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type RestaurantSource = {
  channelId: string;
  messageTs?: string;
  permalink?: string;
  author?: string;
};

export type Restaurant = {
  slug: string;
  name: string;
  area?: string;
  category?: string;
  priceRange?: string;
  notes?: string;
  tags: string[];
  source?: RestaurantSource;
  addedAt: string;
  updatedAt: string;
  mentionCount: number;
};

export type RestaurantCatalog = {
  updatedAt: string;
  source: string;
  channelId: string;
  restaurants: Restaurant[];
};

export type RestaurantFilters = {
  q?: string;
  category?: string;
  area?: string;
  tag?: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");

export function dataPath(): string {
  return DATA_PATH;
}

export async function loadCatalog(): Promise<RestaurantCatalog> {
  const raw = await readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as RestaurantCatalog;
}

export async function saveCatalog(catalog: RestaurantCatalog): Promise<void> {
  const payload: RestaurantCatalog = {
    ...catalog,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(DATA_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: RestaurantFilters,
): Restaurant[] {
  const q = filters.q?.trim().toLowerCase();
  const category = filters.category?.trim().toLowerCase();
  const area = filters.area?.trim().toLowerCase();
  const tag = filters.tag?.trim().toLowerCase();

  return restaurants
    .filter((r) => {
      if (category && category !== "all") {
        if ((r.category ?? "").toLowerCase() !== category) return false;
      }
      if (area && area !== "all") {
        if (!(r.area ?? "").toLowerCase().includes(area)) return false;
      }
      if (tag && tag !== "all") {
        if (!r.tags.some((t) => t.toLowerCase() === tag)) return false;
      }
      if (q) {
        const hay = [
          r.name,
          r.area,
          r.category,
          r.priceRange,
          r.notes,
          ...r.tags,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    })
    .sort(
      (a, b) =>
        b.mentionCount - a.mentionCount || a.name.localeCompare(b.name, "ko"),
    );
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
