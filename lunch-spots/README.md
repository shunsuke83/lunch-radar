# lunch-spots

genon-ai Slack 채널 [`REDACTED_CHANNEL`](https://genon-ai.slack.com/archives/REDACTED_CHANNEL)의 점심 맛집 멘션을 모아 두고, Slack에서 추천·검색하는 Agent SDK 봇입니다.

## 하는 일

- 채널에 올라온 맛집 추천을 `upsert-restaurant`로 저장 (`ctx.host.kv`)
- “오늘 뭐 먹지?” → `pick-lunch`
- “맛집 목록” → `list-restaurants`
- “히스토리 수집” → `ingest-channel-history` 후 메시지에서 가게를 뽑아 저장

## 로컬 실행

```bash
cd lunch-spots
npm install
npx @grok/agent-sdk login
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk dev
```

Playground에서 저장·목록·추천을 시험합니다.

## Slack 연결

1. Cursor 계정으로 로그인된 상태에서:

```bash
npx @grok/agent-sdk slack create --dir . --name "점심맛집" --channel-posts
```

2. 토큰이 `.env.local`에 `LUNCH_SPOTS_SLACK_*`로 기록됩니다.
3. 봇을 `REDACTED_CHANNEL` 채널에 초대합니다.
4. 채널에서 `@점심맛집 히스토리 수집`으로 시드한 뒤, 이후 맛집 글을 멘션하거나 채널 포스트로 쌓습니다.

```bash
npx @grok/agent-sdk slack doctor --prefix LUNCH_SPOTS
npx @grok/agent-sdk serve --dir . --dev
```

## 검증

```bash
npx tsc --noEmit -p .
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk tool call upsert-restaurant --dir . --input '{"name":"황소국밥","category":"한식","tags":["국밥"]}'
npx @grok/agent-sdk eval --dir . --tag smoke
```

## 배포

요청 시에만 `npx @grok/agent-sdk deploy --dir .`를 실행하세요. 첫 deploy의 alias 토큰은 안전한 곳에 보관하세요.
