import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  INDEX_KEY,
  matchesQuery,
  restaurantKey,
  type Restaurant,
} from "../lib/restaurants.js";
import { presentRestaurants, type PresentedRestaurant } from "../lib/slack-people.js";

function pickRandom<T>(items: T[], count: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export default defineTool({
  description: prompt`
    Pick 1–3 lunch spots from the saved store for "오늘 뭐 먹지?" style requests.
    Prefer higher mentionCount, then randomize among strong matches.
  `,
  effect: "read",
  inputSchema: z.object({
    query: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    area: z.string().optional(),
    count: z.number().int().min(1).max(3).optional(),
  }),
  async execute(input, ctx) {
    const index = ((await ctx.host.kv.get(INDEX_KEY)) as string[] | null) ?? [];
    const count = input.count ?? 3;
    const matches: Restaurant[] = [];

    for (const slug of index) {
      const row = (await ctx.host.kv.get(restaurantKey(slug))) as
        | Restaurant
        | null;
      if (!row) continue;
      if (
        !matchesQuery(
          row,
          input.query,
          input.tags,
          input.category,
          input.area,
        )
      ) {
        continue;
      }
      matches.push(row);
    }

    if (matches.length === 0) {
      return {
        empty: true,
        picks: [] as PresentedRestaurant[],
        message: "저장된 맛집이 없습니다. 채널에서 추천을 모아 주세요.",
      };
    }

    matches.sort((a, b) => b.mentionCount - a.mentionCount);
    const top = matches.slice(0, Math.max(count * 3, count));
    const picks = pickRandom(top, Math.min(count, top.length));

    return {
      empty: false,
      picks: await presentRestaurants(ctx.host, picks),
      considered: matches.length,
    };
  },
});
