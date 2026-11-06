import {
  defaultSlackAuth,
  slackChannel,
} from "@grok/agent-sdk/channels/slack";
import type { HostContext } from "@grok/agent-sdk";
import { lunchChannelId } from "../lib/config.js";
import { isRestaurantStoreEmpty } from "../lib/restaurants.js";

const LUNCH_CHANNEL = lunchChannelId();

const EMPTY_STORE_CONTEXT =
  "Restaurant store is empty. Before answering list/pick requests, call ingest-channel-history (mode auto or reset; it defaults to the lunch channel), then upsert-restaurant for each place found. Summarize how many were saved. Do not invent places.";

const FOOD_CONTEXT =
  "This is a watched lunch-channel post. If it recommends a restaurant, call upsert-restaurant with sourceChannelId/sourceMessageTs/sourceAuthor. Reply briefly in Korean (one short ack). Skip unrelated chatter.";

function looksLikeFoodTalk(text: string): boolean {
  const t = text.trim();
  if (t.length < 6) return false;
  return /(맛집|점심|저녁|밥|식당|메뉴|추천|먹|맛있|근처|도보|한식|중식|일식|양식|분식|국밥|김치|찌개|국수|칼국수|짬뽕|짜장|마라탕|돈까스|돈카츠|초밥|스시|라멘|우동|쌀국수|떡볶이|백반|정식|덮밥|치킨|피자|버거|파스타|샐러드|샌드위치|카페|양재|인덕원)/.test(
    t,
  );
}

async function seedContextIfEmpty(host: HostContext): Promise<string[]> {
  try {
    if (await isRestaurantStoreEmpty(host.kv)) {
      return [EMPTY_STORE_CONTEXT];
    }
  } catch {
    // kv unavailable — skip seed hint
  }
  return [];
}

async function softReact(
  host: HostContext,
  channelId: string,
  ts: string,
  name: string,
): Promise<void> {
  try {
    const client = (await host.slack.getClient()) as {
      reactions: {
        add: (args: {
          channel: string;
          timestamp: string;
          name: string;
        }) => Promise<{ ok?: boolean }>;
      };
    };
    await client.reactions.add({ channel: channelId, timestamp: ts, name });
  } catch {
    // Soft-fail: missing tokens or already_reacted must not block the turn.
  }
}

export default slackChannel({
  envPrefix: "LUNCH_SPOTS",
  suggestedPrompts: [
    {
      title: "오늘 점심",
      message: "오늘 점심 뭐 먹지? 한식 위주로 골라줘",
    },
    {
      title: "맛집 목록",
      message: "저장된 점심 맛집 목록 보여줘",
    },
    {
      title: "히스토리 수집",
      message: "점심 채널 히스토리에서 맛집 데이터 수집해줘",
    },
  ],
  ...(LUNCH_CHANNEL
    ? {
        engagement: {
          channelPosts: {
            allow: [LUNCH_CHANNEL],
            posts: "top-level" as const,
          },
        },
      }
    : {}),
  onAppMention: async (ctx, message) => {
    const auth = defaultSlackAuth(message, ctx);
    if (auth === null) {
      return null;
    }
    const context = await seedContextIfEmpty(ctx.host);
    return context.length > 0 ? { auth, context } : { auth };
  },
  onDirectMessage: async (ctx, message) => {
    const auth = defaultSlackAuth(message, ctx);
    if (auth === null) {
      return null;
    }
    const context = await seedContextIfEmpty(ctx.host);
    return context.length > 0 ? { auth, context } : { auth };
  },
  onChannelPost: async (ctx, message) => {
    if (!LUNCH_CHANNEL || message.channelId !== LUNCH_CHANNEL) {
      return null;
    }
    if (!looksLikeFoodTalk(message.markdown)) {
      return null;
    }
    const auth = defaultSlackAuth(message, ctx);
    if (auth === null) {
      return null;
    }

    await softReact(ctx.host, message.channelId, message.ts, "eyes");

    const context = [FOOD_CONTEXT, ...(await seedContextIfEmpty(ctx.host))];
    return {
      auth,
      context,
      // Prefer a short model ack over silence once we decided it's food talk.
      quiet: false,
    };
  },
});
