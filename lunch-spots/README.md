# lunch-spots

사내 Slack 점심 채널(`.env.local`의 `LUNCH_SPOTS_CHANNEL_ID`)의 점심 맛집 멘션을 **히스토리 + 실시간**으로 모아 두고, Slack에서 추천·검색하는 Agent SDK 봇입니다.

## 수집 흐름 (둘 다)

### 1) 히스토리 시드 / 캐치업

| 트리거 | 동작 |
| --- | --- |
| 저장소가 비어 있는 멘션·DM | `onAppMention` / `onDirectMessage`가 empty-store 컨텍스트를 넣고, 모델이 `ingest-channel-history` → `upsert-restaurant` |
| 사용자가 “히스토리 수집” 요청 | 동일 파이프라인 (`mode: auto` / `reset`) |
| GitHub Actions [`collect-lunch.yml`](../.github/workflows/collect-lunch.yml) (매일 11:30 Asia/Seoul) | `seed-from-catalog` → `ingest-channel-history` (새 글만) → upsert → `export-restaurants` → 커밋·Pages 배포 |

공개 사이트로 가는 수집은 GitHub Actions만 담당합니다. 봇 자체 스케줄은 두지 않습니다 — 클라우드에 배포된 봇에는 `web/` 폴더가 없어 export 결과를 사이트로 보낼 방법이 없기 때문입니다.

`ingest-channel-history`는 Slack `conversations.history`를 페이지 단위로 읽고, 커서·newest watermark를 `ctx.host.kv` (`restaurant:history:<channelId>`)에 저장합니다.

- `auto` — 백필이 끝났으면 새 글 catch-up, 아니면 백필 계속
- `backfill` / `reset` — 과거 메시지 페이지네이션
- `catchup` — `newestTs` 이후 메시지만

Slack은 최신 글부터 페이지를 주므로, 페이지 한도나 Slack 오류로 중간에 멈추면 아직 안 읽은 메시지가 워터마크 아래에 남습니다. 그래서 `newestTs`는 끝까지 읽었을 때만 앞으로 갑니다. 멈춘 경우 결과는 `hasMore: true`(오류면 `partialError` 포함)이고, 진행 위치는 state의 `catchup`(또는 백필의 `pageCursor`)에 남아 다음 `auto` 호출이 이어서 읽습니다. `export-restaurants`는 백필이나 catch-up이 끝나지 않았으면 `web/data/restaurants.json`을 쓰지 않습니다 (`allowIncomplete: true`면 `lastMessageTs` 없이 씀).

### 2) 실시간 채널 포스트

`bot/channels/slack.ts`의 `engagement.channelPosts`가 `LUNCH_SPOTS_CHANNEL_ID` 채널의 상위 글을 감시합니다 (값이 없으면 감시하지 않음).

- 음식/맛집 관련 글로 보이면 👀 리액션 후 짧은 한국어 ack
- 추천이면 `upsert-restaurant`로 저장 (출처 ts/author 포함)
- 멘션 없이도 쌓입니다 (봇이 채널에 초대되어 있어야 함)

## 도구

- `upsert-restaurant` — 맛집 저장/갱신. `mentionCount`는 출처 메시지(`sourceChannelId` + `sourceMessageTs`)당 한 번만 증가하므로 재시도·`reset` 재수집에도 부풀지 않습니다. 이미 센 메시지 목록(`countedMessages`)을 가게 레코드 안에 두어 중복 판정과 카운트 증가가 한 번의 쓰기로 끝나므로, 중간에 실패해도 같은 입력으로 다시 호출하면 됩니다 (공개 export에서는 제외).
- `list-restaurants` — 검색·필터
- `pick-lunch` — “오늘 뭐 먹지?”
- `ingest-channel-history` — 채널 히스토리 증거 수집
- `seed-from-catalog` — 기존 `web/data/restaurants.json`을 불러와 `lastMessageTs` 이후만 이어서 수집 (Actions 증분 수집용)
- `export-restaurants` — 웹 앱 `web/data/restaurants.json`으로 내보내기. 공개 사이트용이라 Slack 사용자·채널·메시지 ID는 빼고 씁니다.

## 로컬 실행

**Node.js 22.13 이상**이 필요합니다 (의존성 `@cursor/sdk`의 engines 요구사항). CLI는 Bun이 아니라 Node로 실행하세요.

```bash
cd lunch-spots
npm ci
npx @grok/agent-sdk login
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk dev
```

Playground에서 저장·목록·추천을 시험합니다. Actions와 같은 수집을 로컬에서 한 번 돌리려면:

```bash
npx @grok/agent-sdk run --dir . --message "$(cat ci/collect-prompt.md)"
```

## Slack 연결 (사용자가 해야 할 일)

이 VM에는 Cursor 로그인/Slack 토큰이 없을 수 있습니다. 로컬 또는 배포 환경에서:

1. Cursor 계정으로 로그인:

```bash
npx @grok/agent-sdk login
npx @grok/agent-sdk slack create --dir . --name "점심맛집" --channel-posts
```

2. `.env.local`에 `LUNCH_SPOTS_SLACK_BOT_TOKEN` / `LUNCH_SPOTS_SLACK_APP_TOKEN`이 기록되는지 확인합니다. **토큰 값을 채팅에 붙여 넣지 마세요.**
3. 봇을 점심 채널에 **초대**합니다 (`channels:history`로 히스토리 읽기 + channelPosts 수신).
4. 채널에서 `@점심맛집 히스토리 수집`으로 시드한 뒤, 이후 맛집 글은 멘션 없이도 쌓입니다.

### 봇을 채널에 초대하지 않고 히스토리만 수집하기 (사용자 토큰)

비공개 채널은 봇이 멤버여야 봇 토큰으로 읽을 수 있습니다. 봇을 초대하고 싶지 않다면 본인 계정의 사용자 토큰으로 히스토리를 읽을 수 있습니다.

1. https://api.slack.com/apps → 앱 → **OAuth & Permissions → User Token Scopes**에 `channels:history`, `groups:history` 추가
2. 페이지 상단의 **Reinstall to Workspace**로 재설치 → **User OAuth Token**(`xoxp-...`) 복사
3. `.env.local`에 `LUNCH_SPOTS_SLACK_USER_TOKEN=xoxp-...` 추가

설정되면 `ingest-channel-history`가 봇 토큰 대신 사용자 토큰으로 `conversations.history`를 호출합니다. 이 방식에서는 실시간 채널 포스트 수집(`channelPosts`)이 동작하지 않으므로, 히스토리 수집(멘션/DM 요청, 또는 GitHub Actions `collect-lunch.yml`)으로만 쌓입니다. 본인 권한으로 읽는 것이므로 회사 정책을 확인하세요.

```bash
npx @grok/agent-sdk slack doctor --prefix LUNCH_SPOTS
npx @grok/agent-sdk serve --dir . --dev
```

## 검증

```bash
npx tsc --noEmit -p .
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk tool call upsert-restaurant --dir . --state-root /tmp/lunch-spots-smoke --input '{"name":"말죽거리 해장국","area":"양재","category":"한식","tags":["해장국"]}'
npx @grok/agent-sdk tool call list-restaurants --dir . --state-root /tmp/lunch-spots-smoke --input '{}'
npx @grok/agent-sdk tool call ingest-channel-history --dir . --state-root /tmp/lunch-spots-smoke --input '{"mode":"catchup","pages":1}'
npx @grok/agent-sdk eval --dir . --tag smoke
```

위 `tool call` 예시는 bash 기준입니다. Windows PowerShell에서는 `--state-root .\.smoke`처럼 로컬 경로를 쓰고, JSON 입력은 따옴표를 이스케이프해야 합니다 (예: `--input '{\"mode\":\"catchup\",\"pages\":1}'`). `curl` 대신 `Invoke-RestMethod -Method Post <URL>`을 써도 됩니다.

`ingest-channel-history`는 토큰이 없으면 `ok: false`와 안내 메시지로 soft-fail 합니다.

## 배포

요청 시에만 `npx @grok/agent-sdk deploy --dir .`를 실행하세요. 첫 deploy의 alias 토큰은 안전한 곳에 보관하세요. 배포한 봇은 Slack 대화(멘션·DM 추천)용이며, 사이트 데이터 갱신은 GitHub Actions `collect-lunch.yml`이 합니다.
