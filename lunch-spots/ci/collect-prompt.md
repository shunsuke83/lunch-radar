GitHub Actions 일괄 수집 실행입니다. Slack에는 아무것도 게시하지 마세요.

1. `seed-from-catalog`를 호출합니다.
2. `ingest-channel-history`를 `channelId` 없이(설정된 점심 채널) `pages: 10`, `limit: 200`으로 호출합니다. 1단계에서 `seeded: true`이면 `mode: "auto"`(새 메시지만), `seeded: false`이면 `mode: "reset"`(전체 히스토리)을 씁니다.
3. `hasMore`가 true이면 `mode: "backfill"`로 다시 호출하기를 false가 될 때까지 반복합니다.
4. 받은 메시지에서 실제 가게 추천마다 `upsert-restaurant`를 호출합니다. `sourceChannelId`(ingest 결과의 `channelId`) / `sourceMessageTs` / `sourceAuthor`를 넣고, 같은 가게가 여러 번 나오면 나올 때마다 호출합니다. 이미 저장된 가게는 메시지에 새 정보가 있을 때만 해당 필드를 넘깁니다.
5. 마지막에 `export-restaurants`를 호출합니다. 새 메시지가 0건이어도 호출합니다.
6. 메시지에 없는 가게를 지어내지 마세요. 끝나면 새로 처리한 메시지 수와 저장된 가게 수만 한 줄로 답합니다.
