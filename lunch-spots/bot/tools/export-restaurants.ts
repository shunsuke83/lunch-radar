import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import { mkdir, writeFile } from "node:fs/promises";
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

export default defineTool({
  description: prompt`
    Export all saved restaurants as JSON for the web catalog.
    Writes to ../web/data/restaurants.json when possible (monorepo layout),
    and always returns the payload so it can be POSTed to the web app
    /api/restaurants endpoint.
  `,
  effect: "idempotent",
  inputSchema: z.object({
    channelId: z.string().optional(),
    writeFile: z
      .boolean()
      .optional()
      .describe("Write ../web/data/restaurants.json (default true)"),
  }),
  async execute(input, ctx) {
    const index = ((await ctx.host.kv.get(INDEX_KEY)) as string[] | null) ?? [];
    const restaurants: Restaurant[] = [];
    for (const slug of index) {
      const row = (await ctx.host.kv.get(restaurantKey(slug))) as
        | Restaurant
        | null;
      if (row) restaurants.push(row);
    }
    restaurants.sort(
      (a, b) =>
        b.mentionCount - a.mentionCount || a.name.localeCompare(b.name, "ko"),
    );

    const channelId = input.channelId?.trim() || DEFAULT_CHANNEL;
    const history = (await ctx.host.kv.get(
      historyStateKey(channelId),
    )) as HistoryState | null;

    const catalog = {
      updatedAt: new Date().toISOString(),
      source: "slack-export",
      channelId,
      lastMessageTs: history?.newestTs,
      restaurants,
    };

    let writtenPath: string | null = null;
    let writeError: string | null = null;
    if (input.writeFile !== false) {
      try {
        const outPath = path.resolve(
          process.cwd(),
          "..",
          "web",
          "data",
          "restaurants.json",
        );
        await mkdir(path.dirname(outPath), { recursive: true });
        await writeFile(outPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
        writtenPath = outPath;
      } catch (err) {
        writeError = err instanceof Error ? err.message : String(err);
      }
    }

    return {
      ok: true,
      count: restaurants.length,
      writtenPath,
      writeError,
      catalog,
      nextStep:
        "If the web app is running, POST catalog to /api/restaurants with replace:true, or refresh after a successful file write.",
    };
  },
});
