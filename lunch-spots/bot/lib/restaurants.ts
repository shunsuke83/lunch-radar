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
  /**
   * `channelId:messageTs` of every message already counted in mentionCount.
   * Kept on the record so the dedupe check and the increment are one write.
   */
  countedMessages?: string[];
};

/** A catch-up that has not reached the watermark yet (Slack pages newest-first). */
export type CatchupProgress = {
  /** Watermark the catch-up started from; messages at or below it are done. */
  boundaryTs: string;
  /** next_cursor for the next older page above boundaryTs. */
  cursor?: string;
  /** Newest ts fetched so far; becomes newestTs once the catch-up finishes. */
  maxTs?: string;
};

/** Slack conversations.history pagination / catch-up watermark per channel. */
export type HistoryState = {
  channelId: string;
  /**
   * Every message at or below this ts has been fetched. Only advances when a
   * backfill or catch-up reaches the end without errors.
   */
  newestTs?: string;
  /** Oldest message ts reached during backfill. */
  oldestTs?: string;
  /** Slack response_metadata.next_cursor for older pages; null when done. */
  pageCursor?: string | null;
  backfillComplete: boolean;
  /** Unfinished catch-up; resumed by the next catchup/auto call. */
  catchup?: CatchupProgress | null;
  updatedAt: string;
  lastIngestAt?: string;
  lastFetchedCount?: number;
};

export const INDEX_KEY = "restaurant:index";

export function historyStateKey(channelId: string): string {
  return `restaurant:history:${channelId}`;
}

export type KvLike = {
  get(key: string): Promise<unknown>;
};

export async function isRestaurantStoreEmpty(kv: KvLike): Promise<boolean> {
  const index = (await kv.get(INDEX_KEY)) as string[] | null;
  return !Array.isArray(index) || index.length === 0;
}

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

export function mentionId(channelId: string, messageTs: string): string {
  return `${channelId}:${messageTs}`;
}

/** True when history has no gaps: backfill finished and no catch-up pending. */
export function isHistoryComplete(state: HistoryState | null | undefined): boolean {
  return Boolean(state?.newestTs && state.backfillComplete && !state.catchup);
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
