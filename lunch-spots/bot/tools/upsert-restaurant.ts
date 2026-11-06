import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { updateKey } from "../lib/kv-atomic.js";
import { isGroup, structureRestaurant } from "../lib/structure.js";
import {
  CATEGORY_GROUPS,
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
    category: z
      .string()
      .optional()
      .describe(`One of ${CATEGORY_GROUPS.join(", ")}. Any other value is stored as the subcategory and grouped automatically.`),
    subcategory: z.string().optional().describe("Detailed cuisine, e.g. 돈까스·경양식, 마라탕"),
    priceRange: z.string().optional().describe("e.g. 1만원대, 가성비"),
    notes: z
      .string()
      .optional()
      .describe("Format: '메뉴 가격 / 메뉴 가격 · HH:MM-HH:MM · 도보 약 Nm'. menu/hours/walkMeters are parsed from it when not given."),
    menu: z
      .array(z.object({ name: z.string().min(1), price: z.number().int().positive().optional() }))
      .optional()
      .describe("Menu items with per-person price in won"),
    hours: z
      .object({
        open: z.string().regex(/^\d{2}:\d{2}$/),
        close: z.string().regex(/^\d{2}:\d{2}$/),
        breakStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
        breakEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
      })
      .optional()
      .describe("Opening hours (Asia/Seoul), close may be 24:00"),
    walkMeters: z.number().int().nonnegative().optional().describe("Walking distance from the office in meters"),
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
        const category = input.category?.trim();
        // New notes re-derive the parsed fields unless they are passed too.
        const notesChanged = Boolean(input.notes?.trim());
        return structureRestaurant({
          slug,
          name: sameName ? prior.name : name,
          area: input.area?.trim() || prior?.area,
          category: category || prior?.category,
          subcategory:
            input.subcategory?.trim() ||
            (category && !isGroup(category) ? undefined : prior?.subcategory),
          priceRange: input.priceRange?.trim() || prior?.priceRange,
          notes: input.notes?.trim() || prior?.notes,
          menu: input.menu ?? (notesChanged ? undefined : prior?.menu),
          hours: input.hours ?? (notesChanged ? undefined : prior?.hours),
          walkMeters:
            input.walkMeters ?? (notesChanged ? undefined : prior?.walkMeters),
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
        });
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
