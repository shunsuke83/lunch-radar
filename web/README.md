# 점심맛집 웹

사내 Slack 점심 채널·네이버지도 저장 목록에서 모은 맛집을 브라우저에서 검색·필터하는 Next.js 앱입니다. 배포본: https://shunsuke83.github.io/lunch-radar/

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

배포는 루트의 `.github/workflows/deploy-pages.yml`이 담당합니다 ([루트 README](../README.md#github-pages-배포)).

## 화면·필터

- **범위 탭**: 회사 근처 / 전국. 전국이면 시·도 선택 후 시·군·구로 좁힙니다.
- **보기**: 목록 / 지도. 행·핀 클릭 → 상세 드로어(메뉴·영업·휴무·평판·가봤어요/별로). Slack 원글·모집은 넣지 않습니다.
- **퀵 칩**: 도보 5분 이내(회사 근처), 지금 영업 중, 브레이크 없음, 식대 상한(8천·1만·1.2만·1.5만), 안 가본 곳만. 비가 오면 Open-Meteo 배너 + 「비 오는 날」테마 제안.
- **테마·태그**: 상황 / 메뉴 / 모음 그룹과 태그 칩은 기본 접힘. 테마 정의는 `src/lib/catalog.ts`의 `THEMES`.
- **정렬**: 리뷰 많은 순(기본), 평점 높은 순(Bayesian 보정), 가까운 순, 내 주변 가까운 순(전국·Geolocation), 저렴한 순.
- **기타**: 「오늘 뭐 먹지」(랜덤 3 + Slack 투표 문구 복사), 필터 URL·`localStorage` 공유, 최근 7일 `addedAt` → 「새로 추가」뱃지, 「영업확인필요」는 태그 대신 경고 뱃지.

영업 상태는 Asia/Seoul 요일·분 기준입니다. `hours.closedDays`(예: `["월"]`)가 있으면 그날은 휴무로 표시합니다. 공휴일은 다루지 않습니다. 점심 가능 여부는 11:30–13:30 창을 봅니다.

## 데이터 필드

맛집 데이터는 빌드 시점에 `data/restaurants.json`(회사 근처)과 `public/regions/<id>.json`(전국)에서 읽습니다. 검색·필터는 브라우저에서 처리합니다.

| 필드 | 용도 |
| --- | --- |
| `category` / `subcategory` | 대분류(한식·중식·일식·양식·아시안·분식·샐러드·카페·디저트·주점 등) / 세부 종류 |
| `menu`, `hours` | 메뉴·영업시간. `hours.closedDays`는 휴무 요일 |
| `walkMeters`, `walkMinutes` | 도보 거리(m)·분. 분은 카카오 도보 길찾기, 없으면 m÷80 |
| `location`, `place`, `naver` | 좌표·카카오맵·네이버지도 링크 |
| `rating`, `naverReviews`, `naverScore` | 카카오 별점·네이버 리뷰 |
| `collections` | 네이버 저장 폴더명 → 테마「모음」 |
| `tags`, `addedAt` | 태그·신규 뱃지 |

보강·재생성은 `lunch-spots`에서 합니다.

- `npm run catalog:structure` — notes에서 메뉴·시간·휴무·도보 파싱
- `npm run catalog:enrich` — 좌표·평점·리뷰·도보 라우팅·빈 영업시간 채우기 (`--hours`, `--walk`로 범위 축소)
- `npm run catalog:naver-folders` — 전국 region 파일 (`--offline`은 캐시만)

시·도 목록은 `data/regions.json`입니다. 파일이 없으면 전국 탭용 목록이 비어 보입니다. 지도는 빌드 시 `NEXT_PUBLIC_KAKAO_MAP_KEY`(카카오 JavaScript 키)가 있을 때만 그려집니다. 로컬은 `web/.env.local`에 넣고 개발 서버를 다시 시작합니다.

검색은 동의어를 정규화합니다(예: 돈가스↔돈까스, 순댓국↔순대국).

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
