# 점심맛집 웹

Slack(`REDACTED_CHANNEL`)에서 모은 점심 맛집을 브라우저에서 검색·필터하는 Next.js 앱입니다.

## 실행

```bash
cd web
npm install
npm run dev
```

http://127.0.0.1:3847 에서 목록과 필터를 확인합니다.

## API

- `GET /api/restaurants?q=&category=&area=&tag=` — 필터된 목록 + facets
- `POST /api/restaurants` — Slack 에이전트 export payload import

```json
{
  "source": "slack-export",
  "channelId": "REDACTED_CHANNEL",
  "replace": true,
  "restaurants": []
}
```

## Slack 연동

1. `lunch-spots` 에이전트가 채널 히스토리/실시간 멘션을 수집
2. 에이전트에서 `export-restaurants` 실행 → `web/data/restaurants.json` 갱신
3. 웹을 새로고침하면 필터 UI에 반영

샘플 데이터가 `data/restaurants.json`에 들어 있어 Slack 없이도 UI를 확인할 수 있습니다.
