import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  INDEX_KEY,
  mergeTags,
  normalizeName,
  restaurantKey,
  toSlug,
  type Restaurant,
} from "../lib/restaurants.js";

export default defineTool({
  description: prompt`
    Save or update a lunch restaurant in the shared store.
    Use when a Slack message names a place people recommend for lunch.
    Duplicate names merge (mentionCount increments).
  `,
  effect: "idempotent",
  inputSchema: z.object({
    name: z.string().min(1).describe("Restaurant display name"),
    area: z.string().optional().describe("Neighborhood or address hint"),
    category: z.string().optional().describe("Cuisine, e.g. 한식, 중식, 일식"),
    priceRange: z.string().optional().describe("e.g. 1만원대, 가성비"),
    notes: z.string().optional().describe("Menu highlights or caveats"),
    tags: z.array(z.string()).optional(),
    sourceChannelId: z.string().optional(),
    sourceMessageTs: z.string().optional(),
    sourcePermalink: z.string().optional(),
    sourceAuthor: z.string().optional(),
  }),
  async execute(input, ctx) {
    const name = input.name.trim();
    const slug = toSlug(name);
    const key = restaurantKey(slug);
    const now = new Date().toISOString();

    const prior = (await ctx.host.kv.get(key)) as Restaurant | null;
    const sameName =
      prior && normalizeName(prior.name) === normalizeName(name);

    const restaurant: Restaurant = {
      slug,
      name: sameName ? prior.name : name,
      area: input.area?.trim() || prior?.area,
      category: input.category?.trim() || prior?.category,
      priceRange: input.priceRange?.trim() || prior?.priceRange,
      notes: input.notes?.trim() || prior?.notes,
      tags: mergeTags(prior?.tags ?? [], input.tags ?? []),
      source:
        input.sourceChannelId || prior?.source
          ? {
              channelId:
                input.sourceChannelId ?? prior?.source?.channelId ?? "",
              messageTs: input.sourceMessageTs ?? prior?.source?.messageTs,
              permalink: input.sourcePermalink ?? prior?.source?.permalink,
              author: input.sourceAuthor ?? prior?.source?.author,
            }
          : undefined,
      addedAt: prior?.addedAt ?? now,
      updatedAt: now,
      mentionCount: (prior?.mentionCount ?? 0) + 1,
    };

    await ctx.host.kv.put(key, restaurant);

    const index = ((await ctx.host.kv.get(INDEX_KEY)) as string[] | null) ?? [];
    if (!index.includes(slug)) {
      await ctx.host.kv.put(INDEX_KEY, [...index, slug]);
    }

    return {
      ok: true,
      created: !prior,
      restaurant,
    };
  },
});
