const KEY = "lunch-radar:wishlist:v1";

export function getWishlist(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? data.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function toggleWishlist(slug: string): string[] {
  const set = new Set(getWishlist());
  if (set.has(slug)) set.delete(slug);
  else set.add(slug);
  const next = [...set];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function wishlistShareQuery(slugs: string[]): string {
  if (!slugs.length) return "";
  return `wishlist=${encodeURIComponent(slugs.join(","))}`;
}
