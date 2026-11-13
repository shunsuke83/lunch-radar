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

맛집 데이터는 빌드 시점에 `data/restaurants.json`에서 읽어 HTML에 포함되고, 검색·필터는 브라우저에서 처리합니다. 각 가게의 `category`는 한식·중식·일식·양식·아시안·분식·샐러드 중 하나이고 세부 종류는 `subcategory`에 있습니다. `menu[{name, price}]` / `hours{open, close, breakStart?, breakEnd?}` / `walkMeters`로 "도보 5분 이내(≈400m)", "지금 영업 중(Asia/Seoul, 브라우저 시계 기준)", "만원 이하(메뉴 최저가)" 칩과 거리·가격 정렬을 합니다. "테마"(해장·생선구이)는 종류와 상관없이 가게 이름·`subcategory`·태그·메뉴 이름에 든 키워드로 고르며, 키워드는 `src/lib/catalog.ts`의 `THEMES`에 있습니다. "지역"에서 회사 근처 대신 시·도를 고르면 `public/regions/<id>.json`(네이버지도 저장 목록에서 가져온 가게)을 그때 불러오고, 시·군·구로 다시 좁힐 수 있습니다. 시·도 목록과 가게 수는 `data/regions.json`에 있으며, 이 파일이 없으면 지역 선택은 숨겨집니다. 다른 지역에서는 도보 칩과 거리 정렬을 숨기고, 저장 폴더에서 온 테마(`collections`)는 테마 필터와 보라색 태그로 보입니다. 두 파일은 `lunch-spots`의 `npm run catalog:naver-folders`가 만듭니다. 휴무일 정보는 없어서 영업 중 표시는 시간만 봅니다. `location` / `place`(카카오맵 링크) / `naver`(네이버지도 장소 링크, 버튼은 네이버가 먼저) / `rating`(Google 별점)은 `lunch-spots`의 `npm run catalog:enrich`가 채우며, 보기 방식의 "지도"는 빌드 시 `NEXT_PUBLIC_KAKAO_MAP_KEY`(카카오 JavaScript 키)가 있을 때만 카카오 지도를 그립니다. 로컬에서는 `web/.env.local`에 `NEXT_PUBLIC_KAKAO_MAP_KEY=...`를 넣고 개발 서버를 다시 시작합니다. 이 필드는 `lunch-spots`가 notes에서 뽑아 넣으며, 기존 카탈로그는 `lunch-spots`에서 `npm run catalog:structure`로 다시 계산할 수 있습니다. 배포는 루트의 `.github/workflows/deploy-pages.yml`이 자동으로 합니다 ([루트 README](../README.md#github-pages-배포) 참고).

## 디자인

화면은 사내 [Admin Design System](https://genonai.github.io/admin-design-system)의 리스트 페이지 템플릿(PageHeader → ListControl → 목록)을 따릅니다. `@genonai/admin-design-system` 패키지는 비공개 저장소라 설치하지 않고, 쇼케이스와 같은 모양을 로컬에서 재현합니다.

- `src/app/ds-tokens.css` — 쇼케이스에서 가져온 `--token-*` 변수(색·타이포·간격·반경·그림자). 디자인 시스템 값이 바뀌면 이 파일을 갱신합니다.
- `tailwind.config.ts` — 토큰을 디자인 시스템과 같은 클래스 이름으로 연결합니다 (`text-text-primary`, `bg-surface-subtle`, `gap-stack-md`, `px-inline-md`, `h-size-control-md`, `rounded-xs`, `shadow-default-sm`, `typography-label-md-regular` 등).
- `src/components/ds.tsx` — Button · LinkButton · Tag · Badge · Chip · SegmentedControl · SearchField · FilterSelect · PageHeader · EmptyState. 이름과 상태는 쇼케이스와 같게 맞춰 두어, 패키지 접근 권한이 생기면 import 경로만 바꾸면 됩니다.
- 폰트는 Pretendard(`pretendard` 패키지, 동적 서브셋)입니다.

UI 규칙은 [AGENTS.md](AGENTS.md)에 있습니다.

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
