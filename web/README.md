# 점심맛집 웹

사내 Slack 점심 채널에서 모은 점심 맛집을 브라우저에서 검색·필터하는 Next.js 앱입니다.

## 실행

Node.js 20 이상이 필요합니다 (저장소 전체 기준 22.13+ 권장). 설치·문제 해결은 [루트 README](../README.md)를 참고하세요.

```bash
cd web
npm ci
npm run dev
```

http://127.0.0.1:3847 에서 목록과 필터를 확인합니다.

프로덕션 실행: `npm run build` 후 `npm run start` (같은 포트 3847). 프로덕션에서 import를 쓰려면 `.env.local`에 `IMPORT_TOKEN`을 설정하고 `x-import-token` 헤더로 보냅니다.

## GitHub Pages (정적 빌드)

```bash
npm run build:pages                                   # web/out/ 생성
NEXT_PUBLIC_BASE_PATH=/lunch-radar npm run build:pages  # 하위 경로 배포용 (bash)
```

맛집 데이터는 빌드 시점에 `data/restaurants.json`에서 읽어 HTML에 포함되고, 검색·필터는 브라우저에서 처리합니다. 각 가게의 `category`는 한식·중식·일식·양식·아시안·분식·샐러드 중 하나이고 세부 종류는 `subcategory`에 있습니다. `menu[{name, price}]` / `hours{open, close, breakStart?, breakEnd?}` / `walkMeters`로 "도보 5분 이내(≈400m)", "지금 영업 중(Asia/Seoul, 브라우저 시계 기준)", "만원 이하(메뉴 최저가)" 칩과 거리·가격 정렬을 합니다. 휴무일 정보는 없어서 영업 중 표시는 시간만 봅니다. 이 필드는 `lunch-spots`가 notes에서 뽑아 넣으며, 기존 카탈로그는 `lunch-spots`에서 `npm run catalog:structure`로 다시 계산할 수 있습니다. 배포는 루트의 `.github/workflows/deploy-pages.yml`이 자동으로 합니다 ([루트 README](../README.md#github-pages-배포) 참고).

## API (로컬/서버 모드 전용, Pages에서는 동작하지 않음)

- `GET /api/restaurants?q=&category=&area=&tag=` — 필터된 목록 + facets
- `POST /api/restaurants` — Slack 에이전트 export payload import

```json
{
  "source": "slack-export",
  "replace": true,
  "restaurants": []
}
```

## Slack 연동

1. `lunch-spots` 에이전트가 채널 히스토리/실시간 멘션을 수집
2. 에이전트에서 `export-restaurants` 실행 → `web/data/restaurants.json` 갱신
3. 개발 서버는 새로고침하면 반영, GitHub Pages는 `data/restaurants.json`을 커밋·푸시하면 자동 재배포

샘플 데이터가 `data/restaurants.json`에 들어 있어 Slack 없이도 UI를 확인할 수 있습니다.
