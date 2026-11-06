# 점심맛집

Slack 채널 [`REDACTED_CHANNEL`](https://genon-ai.slack.com/archives/REDACTED_CHANNEL)의 점심 맛집을 수집하고, 웹에서 필터해 보는 프로젝트입니다.

| 폴더 | 역할 |
| --- | --- |
| [`lunch-spots/`](lunch-spots/) | Slack Agent SDK 봇 (히스토리 + 실시간 수집, 추천) |
| [`web/`](web/) | 맛집 목록 브라우저 앱 (검색·종류·지역·태그 필터) |

## 웹 빠른 시작

```bash
cd web && npm install && npm run dev
```

브라우저: http://127.0.0.1:3847

## Slack 봇

[`lunch-spots/README.md`](lunch-spots/README.md) 참고. 수집 후 `export-restaurants`로 웹 데이터를 갱신합니다.
