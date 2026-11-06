# lunch-spots

genon-ai Slack 채널 [`REDACTED_CHANNEL`](https://genon-ai.slack.com/archives/REDACTED_CHANNEL)의 점심 맛집 멘션을 **히스토리 + 실시간**으로 모아 두고, Slack에서 추천·검색하는 Agent SDK 봇입니다.

## 수집 흐름 (둘 다)

### 1) 히스토리 시드 / 캐치업

| 트리거 | 동작 |
| --- | --- |
| 저장소가 비어 있는 멘션·DM | `onAppMention` / `onDirectMessage`가 empty-store 컨텍스트를 넣고, 모델이 `ingest-channel-history` → `upsert-restaurant` |
| 사용자가 “히스토리 수집” 요청 | 동일 파이프라인 (`mode: auto` / `reset`) |
| 스케줄 `history-catchup` (매일 11:30 Asia/Seoul = 02:30 UTC) | `ingest-channel-history` 캐치업·백필 → upsert → `export-restaurants` |

`ingest-channel-history`는 Slack `conversations.history`를 페이지 단위로 읽고, 커서·newest watermark를 `ctx.host.kv` (`restaurant:history:<channelId>`)에 저장합니다.

- `auto` — 백필이 끝났으면 새 글 catch-up, 아니면 백필 계속
- `backfill` / `reset` — 과거 메시지 페이지네이션
- `catchup` — `newestTs` 이후 메시지만

### 2) 실시간 채널 포스트

`bot/channels/slack.ts`의 `engagement.channelPosts`가 `REDACTED_CHANNEL` 상위 글을 감시합니다.

- 음식/맛집 관련 글로 보이면 👀 리액션 후 짧은 한국어 ack
- 추천이면 `upsert-restaurant`로 저장 (출처 ts/author 포함)
- 멘션 없이도 쌓입니다 (봇이 채널에 초대되어 있어야 함)

## 도구

- `upsert-restaurant` — 맛집 저장/갱신 (`mentionCount` 증가)
- `list-restaurants` — 검색·필터
- `pick-lunch` — “오늘 뭐 먹지?”
- `ingest-channel-history` — 채널 히스토리 증거 수집
- `export-restaurants` — 웹 앱 `web/data/restaurants.json`으로 내보내기

## 로컬 실행

```bash
cd lunch-spots
npm install
npx @grok/agent-sdk login
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk dev
```

Playground에서 저장·목록·추천을 시험합니다. 스케줄은 `--dev`에서 자동 실행되지 않습니다. 수동 디스패치:

```bash
curl -X POST http://127.0.0.1:3000/lunch-spots/v1/dev/schedules/history-catchup
```

## Slack 연결 (사용자가 해야 할 일)

이 VM에는 Cursor 로그인/Slack 토큰이 없을 수 있습니다. 로컬 또는 배포 환경에서:

1. Cursor 계정으로 로그인:

```bash
npx @grok/agent-sdk login
npx @grok/agent-sdk slack create --dir . --name "점심맛집" --channel-posts
```

2. `.env.local`에 `LUNCH_SPOTS_SLACK_BOT_TOKEN` / `LUNCH_SPOTS_SLACK_APP_TOKEN`이 기록되는지 확인합니다. **토큰 값을 채팅에 붙여 넣지 마세요.**
3. 봇을 `REDACTED_CHANNEL` 채널에 **초대**합니다 (`channels:history`로 히스토리 읽기 + channelPosts 수신).
4. 채널에서 `@점심맛집 히스토리 수집`으로 시드한 뒤, 이후 맛집 글은 멘션 없이도 쌓입니다.

```bash
npx @grok/agent-sdk slack doctor --prefix LUNCH_SPOTS
npx @grok/agent-sdk serve --dir . --dev
```

## 검증

```bash
npx tsc --noEmit -p .
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk tool call upsert-restaurant --dir . --state-root /tmp/lunch-spots-smoke --input '{"name":"황소국밥","category":"한식","tags":["국밥"]}'
npx @grok/agent-sdk tool call list-restaurants --dir . --state-root /tmp/lunch-spots-smoke --input '{}'
npx @grok/agent-sdk tool call ingest-channel-history --dir . --state-root /tmp/lunch-spots-smoke --input '{"mode":"catchup","pages":1}'
npx @grok/agent-sdk eval --dir . --tag smoke
```

`ingest-channel-history`는 토큰이 없으면 `ok: false`와 안내 메시지로 soft-fail 합니다.

## 배포

요청 시에만 `npx @grok/agent-sdk deploy --dir .`를 실행하세요. 첫 deploy의 alias 토큰은 안전한 곳에 보관하세요. 배포 후 스케줄 `history-catchup`이 매일 **11:30 Asia/Seoul**에 돕니다.
