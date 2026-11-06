import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

const TARGET_CHANNEL = "REDACTED_CHANNEL";

type SlackMessage = {
  ts?: string;
  user?: string;
  text?: string;
  subtype?: string;
};

export default defineTool({
  description: prompt`
    Fetch recent top-level messages from the lunch Slack channel as evidence.
    Default channel is REDACTED_CHANNEL (genon-ai lunch spots).
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
      .describe("How many recent messages to pull (default 100)"),
  }),
  async execute(input, ctx) {
    const channelId = input.channelId?.trim() || TARGET_CHANNEL;
    const limit = input.limit ?? 100;

    let client: {
      conversations: {
        history: (args: {
          channel: string;
          limit: number;
        }) => Promise<{
          ok?: boolean;
          error?: string;
          messages?: SlackMessage[];
        }>;
      };
    };

    try {
      client = (await ctx.host.slack.getClient()) as typeof client;
    } catch (err) {
      return {
        ok: false,
        channelId,
        error:
          err instanceof Error
            ? err.message
            : "Slack client unavailable. Configure Slack tokens first.",
        messages: [] as Array<{
          ts?: string;
          user?: string;
          text: string;
        }>,
      };
    }

    const res = await client.conversations.history({
      channel: channelId,
      limit,
    });

    if (!res.ok) {
      return {
        ok: false,
        channelId,
        error: res.error ?? "conversations.history failed",
        messages: [] as Array<{
          ts?: string;
          user?: string;
          text: string;
        }>,
      };
    }

    const messages = (res.messages ?? [])
      .filter((m) => !m.subtype && typeof m.text === "string" && m.text.trim())
      .map((m) => ({
        ts: m.ts,
        user: m.user,
        text: (m.text ?? "").trim(),
      }));

    return {
      ok: true,
      channelId,
      count: messages.length,
      messages,
      nextStep:
        "Identify restaurant recommendations in these messages, then call upsert-restaurant for each unique place.",
    };
  },
});
