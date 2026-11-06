import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as z from "zod/v4";
import { lunchChannelId } from "../lib/config.js";
import { structureRestaurant } from "../lib/structure.js";
import {
  INDEX_KEY,
  historyStateKey,
  isHistoryComplete,
  restaurantKey,
  type HistoryState,
  type Restaurant,
} from "../lib/restaurants.js";

export default defineTool({
  description: prompt`
    Export all saved restaurants as JSON for the public web catalog
    (Slack user/channel/message ids are stripped).
    Writes to ../web/data/restaurants.json when that folder exists (local
    checkout or the GitHub Actions collector) and always returns the payload.
    A hosted deployment has no web folder: the published site is updated only
    by the GitHub Actions collector, not by this tool.
  `,
  effect: "idempotent",
  inputSchema: z.object({
    channelId: z.string().optional(),
    writeFile: z
      .boolean()
      .optional()
      .describe("Write ../web/data/restaurants.json (default true)"),
    allowIncomplete: z
      .boolean()
      .optional()
      .describe(
        "Write even while history has gaps (no lastMessageTs, so the next collector run rebuilds). Default false.",
      ),
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

    const channelId = input.channelId?.trim() || lunchChannelId();
    const history = channelId
      ? ((await ctx.host.kv.get(historyStateKey(channelId))) as HistoryState | null)
      : null;

    // The collector resumes from lastMessageTs, so a catalog written while
    // history still has gaps would make the next run skip those messages.
    const complete = isHistoryComplete(history);

    // The web catalog is published on public GitHub Pages: no Slack user,
    // channel, or message identifiers leave the store.
    const catalog = {
      updatedAt: new Date().toISOString(),
      source: "slack-export",
      lastMessageTs: complete ? history?.newestTs : undefined,
      restaurants: restaurants.map((r) => {
        const { source: _source, countedMessages: _counted, ...rest } =
          structureRestaurant(r);
        return rest;
      }),
    };

    let writtenPath: string | null = null;
    let writeError: string | null = null;
    if (input.writeFile !== false && !complete && !input.allowIncomplete) {
      writeError =
        "History is incomplete (backfill or catch-up has hasMore). Keep calling ingest-channel-history with mode auto until hasMore is false, then export again.";
    } else if (input.writeFile !== false) {
      try {
        const outPath = path.resolve(
          process.cwd(),
          "..",
          "web",
          "data",
          "restaurants.json",
        );
        // The office point comes from the enrich script, not the store.
        const office = await readFile(outPath, "utf8")
          .then((text) => (JSON.parse(text) as { office?: unknown }).office)
          .catch(() => undefined);
        await mkdir(path.dirname(outPath), { recursive: true });
        await writeFile(
          outPath,
          `${JSON.stringify({ ...catalog, office }, null, 2)}\n`,
          "utf8",
        );
        writtenPath = outPath;
      } catch (err) {
        writeError = err instanceof Error ? err.message : String(err);
      }
    }

    return {
      ok: writeError === null,
      complete,
      count: restaurants.length,
      writtenPath,
      writeError,
      catalog,
      nextStep:
        "If the web app is running, POST catalog to /api/restaurants with replace:true, or refresh after a successful file write.",
    };
  },
});
