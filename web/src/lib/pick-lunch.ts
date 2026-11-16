import type { Restaurant } from "@/lib/catalog";
import { displayWalkMinutes, minPrice } from "@/lib/catalog";

/** Fisher–Yates sample of up to `n` places. */
export function sampleRestaurants(list: Restaurant[], n: number): Restaurant[] {
  const pool = [...list];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}

export function slackVoteText(picks: Restaurant[]): string {
  const lines = picks.map((r, i) => {
    const parts = [`${i + 1}. ${r.name}`];
    if (r.category) parts.push(r.category);
    const price = minPrice(r);
    if (price !== undefined) parts.push(`${price.toLocaleString("ko-KR")}원~`);
    const walk = displayWalkMinutes(r);
    if (walk !== undefined) parts.push(`도보 ${walk}분`);
    return parts.join(" · ");
  });
  return ["오늘 점심 후보예요. 이모지로 투표해 주세요!", "", ...lines].join("\n");
}
