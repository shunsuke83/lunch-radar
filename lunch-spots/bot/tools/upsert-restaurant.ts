import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { updateKey } from "../lib/kv-atomic.js";
import {
  INDEX_KEY,
  mentionId,
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
    Duplicate names merge. mentionCount increments once per distinct source
    message (sourceChannelId + sourceMessageTs); repeating the same message
    does not count again. Safe to retry after an error.
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
    const kv = ctx.host.kv;
    const name = input.name.trim();
    const slug = toSlug(name);
    const now = new Date().toISOString();

    const messageTs = input.sourceMessageTs?.trim();
    const mention = messageTs
      ? mentionId(input.sourceChannelId?.trim() ?? "", messageTs)
      : undefined;

    let created = false;
    let newMention = false;
    const restaurant = await updateKey<Restaurant>(
      kv,
      restaurantKey(slug),
      (prior) => {
        created = !prior;
        const counted = prior?.countedMessages ?? [];
        newMention = !mention || !counted.includes(mention);
        const sameName =
          prior && normalizeName(prior.name) === normalizeName(name);
        return {
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
                  messageTs: messageTs ?? prior?.source?.messageTs,
                  permalink: input.sourcePermalink ?? prior?.source?.permalink,
                  author: input.sourceAuthor ?? prior?.source?.author,
                }
              : undefined,
          addedAt: prior?.addedAt ?? now,
          updatedAt: now,
          mentionCount: (prior?.mentionCount ?? 0) + (newMention ? 1 : 0),
          countedMessages:
            mention && newMention ? [...counted, mention] : counted,
        };
      },
    );

    // Runs after the record write, so a retry of a failed call re-adds the
    // slug without counting the message twice.
    await updateKey<string[]>(kv, INDEX_KEY, (index = []) =>
      index.includes(slug) ? index : [...index, slug],
    );

    return {
      ok: true,
      created,
      counted: newMention,
      restaurant,
    };
  },
});
