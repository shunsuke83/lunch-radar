import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import { readFile } from "node:fs/promises";
import path from "node:path";
import * as z from "zod/v4";
import {
  INDEX_KEY,
  historyStateKey,
  restaurantKey,
  type HistoryState,
  type Restaurant,
} from "../lib/restaurants.js";

const DEFAULT_CHANNEL = "REDACTED_CHANNEL";

type Catalog = {
  channelId?: string;
  lastMessageTs?: string;
  restaurants?: Restaurant[];
};

export default defineTool({
  description: prompt`
    Load ../web/data/restaurants.json into the store so a fresh run can
    continue from the last exported catalog instead of rebuilding it.
    Only seeds when the catalog has lastMessageTs; it then sets the history
    watermark so ingest-channel-history (mode auto) returns only newer messages.
    When seeded is false, rebuild from full history instead.
  `,
  effect: "write",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const file = path.resolve(process.cwd(), "..", "web", "data", "restaurants.json");
    let catalog: Catalog;
    try {
      catalog = JSON.parse(await readFile(file, "utf8")) as Catalog;
    } catch (err) {
      return {
        ok: false,
        seeded: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }

    const lastMessageTs = catalog.lastMessageTs?.trim();
    const restaurants = catalog.restaurants ?? [];
    if (!lastMessageTs || restaurants.length === 0) {
      return {
        ok: true,
        seeded: false,
        reason: "Catalog has no lastMessageTs; rebuild from full history (mode reset).",
      };
    }

    const index: string[] = [];
    for (const r of restaurants) {
      if (!r?.slug || !r?.name) continue;
      await ctx.host.kv.put(restaurantKey(r.slug), r);
      index.push(r.slug);
    }
    await ctx.host.kv.put(INDEX_KEY, index);

    const channelId = catalog.channelId || DEFAULT_CHANNEL;
    const now = new Date().toISOString();
    const state: HistoryState = {
      channelId,
      newestTs: lastMessageTs,
      pageCursor: null,
      backfillComplete: true,
      updatedAt: now,
    };
    await ctx.host.kv.put(historyStateKey(channelId), state);

    return { ok: true, seeded: true, count: index.length, lastMessageTs };
  },
});
