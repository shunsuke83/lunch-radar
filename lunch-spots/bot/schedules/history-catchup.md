---
cron: "30 2 * * *"
---

Daily lunch-channel collection at 11:30 Asia/Seoul (02:30 UTC) for Slack channel `REDACTED_CHANNEL`.

1. Call `ingest-channel-history` with `mode: "auto"` and `pages: 3`.
2. From the returned messages, call `upsert-restaurant` for each real restaurant recommendation. Include `sourceChannelId` / `sourceMessageTs` / `sourceAuthor` when present.
3. If `hasMore` is true (backfill still running), call `ingest-channel-history` again once more in this turn, then upsert.
4. Call `export-restaurants` so the web catalog (`web/data/restaurants.json`) stays in sync.
5. Do not invent places. If Slack is unavailable or there are zero new food mentions, finish quietly with a one-line internal note — do not post to Slack.
