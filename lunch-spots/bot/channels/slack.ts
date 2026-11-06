import {
  defaultSlackAuth,
  slackChannel,
} from "@grok/agent-sdk/channels/slack";

const LUNCH_CHANNEL = "REDACTED_CHANNEL";

function looksLikeFoodTalk(text: string): boolean {
  const t = text.trim();
  if (t.length < 8) return false;
  return /(맛집|점심|저녁|밥|국밥|김치|찌개|면|카페|추천|먹|한식|중식|일식|양식|분식|치킨|피자|버거|스시|라멘|파스타|샐러드)/.test(
    t,
  );
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
      message: "REDACTED_CHANNEL 채널 히스토리에서 맛집 데이터 수집해줘",
    },
  ],
  engagement: {
    channelPosts: {
      allow: [LUNCH_CHANNEL],
      posts: "top-level",
    },
  },
  onChannelPost: async (ctx, message) => {
    if (!looksLikeFoodTalk(message.markdown)) {
      return null;
    }
    const auth = defaultSlackAuth(message, ctx);
    if (auth === null) {
      return null;
    }
    return {
      auth,
      context: [
        "This is a watched lunch-channel post. If it recommends a restaurant, call upsert-restaurant. Reply briefly in Korean.",
      ],
    };
  },
});
