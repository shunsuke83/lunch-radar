GitHub Actions 일괄 수집 실행입니다. Slack에는 아무것도 게시하지 마세요.

1. `ingest-channel-history`를 `channelId: "REDACTED_CHANNEL"`, `mode: "reset"`, `pages: 10`, `limit: 200`으로 호출합니다.
2. `hasMore`가 true이면 `mode: "backfill"`로 다시 호출하기를 false가 될 때까지 반복합니다.
3. 받은 메시지에서 실제 가게 추천마다 `upsert-restaurant`를 호출합니다. `sourceChannelId` / `sourceMessageTs` / `sourceAuthor`를 넣고, 같은 가게가 여러 번 나오면 나올 때마다 호출합니다.
4. 마지막에 `export-restaurants`를 호출합니다.
5. 메시지에 없는 가게를 지어내지 마세요. 끝나면 저장한 가게 수만 한 줄로 답합니다.
