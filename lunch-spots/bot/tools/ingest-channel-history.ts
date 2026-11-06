import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  historyStateKey,
  type HistoryState,
} from "../lib/restaurants.js";

const TARGET_CHANNEL = "REDACTED_CHANNEL";

type SlackMessage = {
  ts?: string;
  user?: string;
  text?: string;
  subtype?: string;
};

type HistoryResponse = {
  ok?: boolean;
  error?: string;
  messages?: SlackMessage[];
  has_more?: boolean;
  response_metadata?: { next_cursor?: string };
};

type SlackHistoryClient = {
  conversations: {
    history: (args: {
      channel: string;
      limit: number;
      cursor?: string;
      oldest?: string;
      latest?: string;
      inclusive?: boolean;
    }) => Promise<HistoryResponse>;
  };
};

type MappedMessage = {
  ts?: string;
  user?: string;
  text: string;
};

function emptyResult(
  channelId: string,
  error: string,
  state: HistoryState | null,
) {
  return {
    ok: false as const,
    channelId,
    error,
    mode: "none" as const,
    count: 0,
    messages: [] as MappedMessage[],
    hasMore: false,
    state,
    nextStep:
      "Fix Slack credentials / channel invite, then retry ingest-channel-history.",
  };
}

function mapMessages(raw: SlackMessage[]): MappedMessage[] {
  return raw
    .filter((m) => !m.subtype && typeof m.text === "string" && m.text.trim())
    .map((m) => ({
      ts: m.ts,
      user: m.user,
      text: (m.text ?? "").trim(),
    }));
}

function maxTs(a?: string, b?: string): string | undefined {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}

function minTs(a?: string, b?: string): string | undefined {
  if (!a) return b;
  if (!b) return a;
  return a < b ? a : b;
}

export default defineTool({
  description: prompt`
    Fetch top-level messages from the lunch Slack channel (default REDACTED_CHANNEL)
    as evidence for restaurant upserts. Supports pagination via a kv cursor and
    catch-up of messages newer than the last watermark.
    Modes: auto (default), backfill, catchup, reset.
    After this returns, call upsert-restaurant for each restaurant you can identify.
    Do not invent places that are not in the messages.
  `,
  effect: "read",
  inputSchema: z.object({
    channelId: z
      .string()
      .optional()
      .describe(`Slack channel id. Defaults to ${TARGET_CHANNEL}`),
    limit: z
      .number()
      .int()
      .min(1)
      .max(200)
      .optional()
      .describe("Messages per Slack page (default 100)"),
    pages: z
      .number()
      .int()
      .min(1)
      .max(10)
      .optional()
      .describe("How many Slack pages to pull this call (default 3)"),
    mode: z
      .enum(["auto", "backfill", "catchup", "reset"])
      .optional()
      .describe(
        "auto picks catchup when a newest watermark exists and backfill is done; otherwise continues backfill. reset clears the cursor and starts a fresh backfill.",
      ),
  }),
  async execute(input, ctx) {
    const channelId = input.channelId?.trim() || TARGET_CHANNEL;
    const limit = input.limit ?? 100;
    const pages = input.pages ?? 3;
    const modeIn = input.mode ?? "auto";
    const stateKey = historyStateKey(channelId);

    let prior =
      ((await ctx.host.kv.get(stateKey)) as HistoryState | null) ?? null;

    if (modeIn === "reset") {
      await ctx.host.kv.delete(stateKey);
      prior = null;
    }

    const resolvedMode: "backfill" | "catchup" =
      modeIn === "catchup"
        ? "catchup"
        : modeIn === "backfill" || modeIn === "reset"
          ? "backfill"
          : prior?.newestTs && prior.backfillComplete
            ? "catchup"
            : "backfill";

    if (resolvedMode === "catchup" && !prior?.newestTs) {
      return {
        ok: true as const,
        channelId,
        mode: "catchup" as const,
        count: 0,
        messages: [] as MappedMessage[],
        hasMore: false,
        state: prior,
        nextStep:
          "No newest watermark yet. Call again with mode backfill or reset to seed history.",
      };
    }

    let client: SlackHistoryClient;
    try {
      client = (await ctx.host.slack.getClient()) as SlackHistoryClient;
    } catch (err) {
      return emptyResult(
        channelId,
        err instanceof Error
          ? err.message
          : "Slack client unavailable. Configure Slack tokens first.",
        prior,
      );
    }

    const collected: MappedMessage[] = [];
    let pageCursor =
      resolvedMode === "backfill" ? (prior?.pageCursor ?? undefined) : undefined;
    let hasMore = false;
    let newestTs = prior?.newestTs;
    let oldestTs = prior?.oldestTs;
    let lastError: string | undefined;

    for (let page = 0; page < pages; page++) {
      const args: {
        channel: string;
        limit: number;
        cursor?: string;
        oldest?: string;
        inclusive?: boolean;
      } = { channel: channelId, limit };

      if (resolvedMode === "catchup" && prior?.newestTs) {
        // Exclusive lower bound would skip the watermark; inclusive + filter below.
        args.oldest = prior.newestTs;
        args.inclusive = true;
      } else if (pageCursor) {
        args.cursor = pageCursor;
      }

      const res = await client.conversations.history(args);
      if (!res.ok) {
        lastError = res.error ?? "conversations.history failed";
        break;
      }

      let mapped = mapMessages(res.messages ?? []);
      if (resolvedMode === "catchup" && prior?.newestTs) {
        mapped = mapped.filter((m) => m.ts && m.ts > prior.newestTs!);
      }

      for (const m of mapped) {
        collected.push(m);
        newestTs = maxTs(newestTs, m.ts);
        oldestTs = minTs(oldestTs, m.ts);
      }

      const next =
        res.response_metadata?.next_cursor &&
        res.response_metadata.next_cursor !== ""
          ? res.response_metadata.next_cursor
          : undefined;
      hasMore = res.has_more === true && next !== undefined;
      pageCursor = next;

      // Catch-up only needs newer pages once; stop when Slack says no more.
      if (!hasMore) break;
      // For catch-up, first page is usually enough; keep looping only while hasMore.
    }

    if (lastError && collected.length === 0) {
      return emptyResult(channelId, lastError, prior);
    }

    const now = new Date().toISOString();
    const backfillComplete =
      resolvedMode === "catchup"
        ? (prior?.backfillComplete ?? false)
        : !hasMore;

    const state: HistoryState = {
      channelId,
      newestTs,
      oldestTs,
      pageCursor: resolvedMode === "backfill" ? (pageCursor ?? null) : (prior?.pageCursor ?? null),
      backfillComplete,
      updatedAt: now,
      lastIngestAt: now,
      lastFetchedCount: collected.length,
    };
    await ctx.host.kv.put(stateKey, state);

    return {
      ok: true as const,
      channelId,
      mode: resolvedMode,
      count: collected.length,
      messages: collected,
      hasMore: resolvedMode === "backfill" ? hasMore : false,
      partialError: lastError,
      state,
      nextStep: hasMore && resolvedMode === "backfill"
        ? "More older history remains. Call upsert-restaurant for these messages, then call ingest-channel-history again (mode backfill or auto) to continue."
        : "Identify restaurant recommendations in these messages, then call upsert-restaurant for each unique place.",
    };
  },
});
