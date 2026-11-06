---
cron: "0 */6 * * *"
---

Periodic lunch-channel history catch-up for Slack channel `REDACTED_CHANNEL`.

1. Call `ingest-channel-history` with `mode: "auto"` (and optionally `pages: 3`).
2. From the returned messages, call `upsert-restaurant` for each real restaurant recommendation. Include `sourceChannelId` / `sourceMessageTs` / `sourceAuthor` when present.
3. If `hasMore` is true (backfill still running), call `ingest-channel-history` again once more in this turn, then upsert.
4. Do not invent places. If Slack is unavailable or there are zero new food mentions, finish quietly with a one-line internal note — do not post to Slack.
