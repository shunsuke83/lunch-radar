import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  INDEX_KEY,
  matchesQuery,
  restaurantKey,
  type Restaurant,
} from "../lib/restaurants.js";
import { presentRestaurants } from "../lib/slack-people.js";

export default defineTool({
  description: prompt`
    List saved lunch restaurants from the shared store.
    Filter by keyword, tags, category, or area when the user asks for a subset.
  `,
  effect: "read",
  inputSchema: z.object({
    query: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    area: z.string().optional(),
    limit: z.number().int().min(1).max(50).optional(),
  }),
  async execute(input, ctx) {
    const index = ((await ctx.host.kv.get(INDEX_KEY)) as string[] | null) ?? [];
    const limit = input.limit ?? 25;
    const restaurants: Restaurant[] = [];

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
      restaurants.push(row);
    }

    restaurants.sort(
      (a, b) =>
        b.mentionCount - a.mentionCount ||
        a.name.localeCompare(b.name, "ko"),
    );

    return {
      total: restaurants.length,
      restaurants: await presentRestaurants(ctx.host, restaurants.slice(0, limit)),
    };
  },
});
