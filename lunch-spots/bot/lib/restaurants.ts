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

export const INDEX_KEY = "restaurant:index";

export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

export function toSlug(name: string): string {
  const base = normalizeName(name)
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `spot-${Date.now().toString(36)}`;
}

export function restaurantKey(slug: string): string {
  return `restaurant:${slug}`;
}

export function mergeTags(a: string[] = [], b: string[] = []): string[] {
  const out = new Set<string>();
  for (const tag of [...a, ...b]) {
    const t = tag.trim();
    if (t) out.add(t);
  }
  return [...out];
}

export function matchesQuery(
  restaurant: Restaurant,
  query?: string,
  tags?: string[],
  category?: string,
  area?: string,
): boolean {
  if (category) {
    const c = category.trim().toLowerCase();
    if ((restaurant.category ?? "").toLowerCase() !== c) return false;
  }
  if (area) {
    const a = area.trim().toLowerCase();
    if (!(restaurant.area ?? "").toLowerCase().includes(a)) return false;
  }
  if (tags && tags.length > 0) {
    const have = new Set(restaurant.tags.map((t) => t.toLowerCase()));
    if (!tags.every((t) => have.has(t.trim().toLowerCase()))) return false;
  }
  if (query) {
    const q = query.trim().toLowerCase();
    const hay = [
      restaurant.name,
      restaurant.area,
      restaurant.category,
      restaurant.priceRange,
      restaurant.notes,
      ...restaurant.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}
