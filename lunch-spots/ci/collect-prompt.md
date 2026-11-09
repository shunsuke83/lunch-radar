GitHub Actions 일괄 수집 실행입니다. Slack에는 아무것도 게시하지 마세요.

1. `seed-from-catalog`를 호출합니다. 도구가 실패하거나 `ok: false`를 반환하면 더 진행하지 말고 `SEED_FAILED`와 오류 내용을 한 줄로 답합니다. 이때 `mode: "reset"`으로 넘어가면 이미 센 멘션을 다시 세게 되므로 절대 넘어가지 않습니다.
2. `ingest-channel-history`를 `channelId` 없이(설정된 점심 채널) `pages: 10`, `limit: 200`으로 호출합니다. 1단계에서 `seeded: true`이면 `mode: "auto"`(새 메시지만), `seeded: false`이면 `mode: "reset"`(전체 히스토리)을 씁니다.
3. 받은 메시지에서 실제 가게 추천마다 `upsert-restaurant`를 호출합니다. `sourceChannelId`(ingest 결과의 `channelId`) / `sourceMessageTs` / `sourceAuthor`를 넣고, 같은 가게가 여러 번 나오면 나올 때마다 호출합니다. 이미 저장된 가게는 메시지에 새 정보가 있을 때만 해당 필드를 넘깁니다. `category`는 한식·중식·일식·양식·아시안·분식·샐러드 중 하나, 세부 종류는 `subcategory`, `notes`는 `메뉴 가격 / 메뉴 가격 · HH:MM-HH:MM · 도보 약 Nm` 형식으로 씁니다. upsert가 오류를 내면 같은 입력으로 한 번 다시 호출합니다.
4. ingest 결과의 `hasMore`가 true이면(`partialError`가 있어도) `mode: "auto"`로 다시 ingest 하고 3단계를 반복합니다. `hasMore`가 false가 될 때까지 계속합니다.
5. 마지막에 `export-restaurants`를 호출합니다. 새 메시지가 0건이어도 호출합니다.
6. 메시지에 없는 가게를 지어내지 마세요. 끝나면 새로 처리한 메시지 수와 저장된 가게 수만 한 줄로 답합니다. 단 `export-restaurants`가 `ok: false`를 반환했으면 대신 `EXPORT_INCOMPLETE`와 그 `writeError`를 한 줄로 답합니다.
