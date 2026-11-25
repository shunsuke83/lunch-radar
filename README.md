# 점심맛집 (lunch-radar)

사내 Slack 점심 채널의 맛집 추천과 네이버지도 저장 목록을 모아, 웹에서 필터·지도로 고르는 프로젝트입니다. 대상 채널 ID는 환경 변수 `LUNCH_SPOTS_CHANNEL_ID`로만 두고 저장소에는 넣지 않습니다.

**배포:** [GitHub Pages](https://shunsuke83.github.io/lunch-radar/) · [Cloudflare Pages](https://lunch-radar.pages.dev/)

| 폴더 | 역할 | 실행에 필요한 것 |
| --- | --- | --- |
| [`web/`](web/) | Next.js 정적 사이트. 회사 근처·전국, 테마·영업·지도·상세, URL 공유 | Node.js (샘플 데이터 포함) |
| [`lunch-spots/`](lunch-spots/) | Slack Agent SDK 봇 + 카탈로그 enrich/import 스크립트 | Node.js 22.13+, Agent SDK 로그인, Slack 토큰 |

처음이라면 **웹만** 실행해 보세요. Slack 없이도 `web/data/restaurants.json`으로 UI를 확인할 수 있습니다. UI 상세는 [`web/README.md`](web/README.md), 봇·도구는 [`lunch-spots/README.md`](lunch-spots/README.md)입니다.

## 웹에서 할 수 있는 것

- **범위**: 회사 근처 / 전국(시·도 → 시·군·구). 필터는 URL·localStorage에 남아 공유 가능.
- **퀵 칩**: 도보 5분 이내, 지금 영업 중, 브레이크 없음, 식대 상한(8천·1만·1.2만·1.5만), 안 가본 곳만.
- **영업·휴무**: Asia/Seoul 요일·시간. `hours.closedDays`(예: 월 휴무) 반영. 점심 가능은 11:30–13:30. 공휴일은 미반영.
- **테마**: 상황·메뉴·모음(기본 접힘). 비 오면 Open-Meteo 배너 + 「비 오는 날」제안.
- **정렬**: 리뷰 많은 순(기본), 평점 높은 순(Bayesian), 가까운 순, 내 주변 가까운 순(전국·위치 권한), 저렴한 순.
- **목록·지도·상세**: 행/핀 클릭 → 메뉴·휴무·평판·가봤어요/별로. 회사 핀은 **주소 지오코딩** 좌표, 가게 핀 색은 영업 상태.
- **오늘 뭐 먹지**: 후보 3곳 + Slack 투표 문구 복사(채널 자동 게시는 없음). 최근 7일 추가는 「새로 추가」뱃지.

도보 거리(`walkMeters`·`walkMinutes`)는 카카오 도보 길찾기로 채우고, 계산 기준점(`WALK_ORIGIN`)은 채널 「도보 약 Nm」 역산점입니다. **지도 회사 핀과는 ~170m 다를 수 있습니다.**

## 1. 사전 준비

| 도구 | 버전 | 확인 명령 |
| --- | --- | --- |
| Git | 아무 버전 | `git --version` |
| Node.js | **22.13 이상 권장** (웹만 쓸 경우 20 이상도 가능) | `node -v` |
| npm | Node.js에 포함 | `npm -v` |

```powershell
# Windows (PowerShell)
winget install OpenJS.NodeJS.LTS
```

```bash
# macOS
brew install node@22
```

또는 [nodejs.org](https://nodejs.org/) LTS. **설치 후 터미널을 다시 열어** `npm`이 잡히는지 확인합니다.

## 2. 클론

```bash
git clone https://github.com/shunsuke83/lunch-radar.git
cd lunch-radar
git config core.hooksPath .githooks   # 커밋 전 민감정보 검사
```

## 3. 웹 앱 실행

```bash
cd web
npm ci
npm run dev
```

http://127.0.0.1:3847

> PowerShell 5에서는 `&&` 대신 한 줄씩 실행하거나 `;`를 쓰세요.

```bash
cd web
npm ci
npm run build
npm run start
```

프로덕션에서 `POST /api/restaurants`를 쓰려면 `web/.env.local`에 `IMPORT_TOKEN`을 넣고 헤더 `x-import-token`으로 보냅니다. 개발 모드에서는 토큰 없이 import됩니다.

맛집 목록은 빌드 시점의 `web/data/restaurants.json`(·`public/regions/`)을 읽습니다. `npm run start`에서는 데이터가 바뀌면 `npm run build`를 다시 해야 합니다.

```bash
cd web
npm run build:pages   # 결과물: web/out/
```

`build:pages`는 정적 export에서 안 되는 API 라우트를 빌드 동안만 잠시 치웁니다. 하위 경로 배포 시 `NEXT_PUBLIC_BASE_PATH=/lunch-radar`를 줍니다.

## 4. Slack 봇 실행 (선택)

```bash
cd lunch-spots
npm ci
npx @grok/agent-sdk login
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk dev
```

`lunch-spots/.env.local`에 `LUNCH_SPOTS_CHANNEL_ID=C…`와 Slack 토큰이 필요합니다 ([`.env.example`](lunch-spots/.env.example)). **토큰을 커밋하지 마세요.**

## 5. 봇 → 웹 데이터 흐름

1. 봇이 채널 히스토리/실시간 글에서 맛집을 수집합니다.
2. `export-restaurants`가 `../web/data/restaurants.json`을 덮어씁니다. **`lunch-spots`와 `web`을 형제 폴더로 두고**, 봇은 `lunch-spots` 안에서 실행합니다.
3. 로컬 `npm run dev`는 새로고침으로 반영. 원격 서버면 `POST /api/restaurants`.
4. Pages 반영은 JSON 커밋·푸시. `main`의 `web/**` 변경 시 Actions가 배포합니다. 평소에는 `collect-lunch.yml`이 매일 돌립니다.

### 카탈로그 스크립트 (`lunch-spots/`)

| 명령 | 역할 |
| --- | --- |
| `npm run catalog:structure` | notes → menu / hours(`closedDays`) / walkMeters |
| `npm run catalog:enrich` | 회사·가게 좌표, 평점·리뷰, 도보 길찾기, 빈 영업시간. `--hours` / `--walk`로 범위 축소 |
| `npm run catalog:naver-folders` | 네이버 공유 폴더 → `web/public/regions/*.json` (`--offline`은 캐시만) |
| `npm run catalog:kakao-regions` | region용 카카오 장소·평점 캐시 |

## 정적 사이트 배포

| 워크플로 | 트리거 | 하는 일 |
| --- | --- | --- |
| [`collect-lunch.yml`](.github/workflows/collect-lunch.yml) | 매일 11:17·14:43 (Asia/Seoul, 지연 가능), 수동 | Slack 수집 → enrich → `restaurants.json` 커밋 → Pages 배포 |
| [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) | `main`의 `web/**` 푸시, 수동 | `build:pages` → GitHub Pages (`/lunch-radar` base path) |
| [`deploy-cf-pages.yml`](.github/workflows/deploy-cf-pages.yml) | `main`의 `web/**` 푸시, 수동 | `build:pages` → Cloudflare Pages (`https://lunch-radar.pages.dev/`, root path) |
| [`ci.yml`](.github/workflows/ci.yml) | PR, `main` 푸시 | 웹 빌드·타입체크, 봇 `npm run check`, 민감정보 검사 |

로컬에서 CF에만 다시 올릴 때:

```bash
cd web
# Windows에서 api rename EPERM이면 api를 잠깐 옮긴 뒤 STATIC_EXPORT=true npx next build
npm run build:pages
cd ..
npx wrangler pages deploy web/out --project-name=lunch-radar --branch=main
```

### 네이버지도 저장 목록 (지역 데이터)

회사 밖 맛집은 네이버지도 공유 폴더에서 **수동으로** 가져옵니다.

1. `lunch-spots/.naver-folders.local`(gitignore)에 공유 폴더 ID를 한 줄에 하나. `.../sharedPlace/folder/<ID>`. ID 뒤 이름은 테마「모음」으로 씁니다.
2. `npm run catalog:naver-folders` — 업종·주소·`hours`/`closedDays`·메뉴. 기본 concurrency 1, delay 3초. 캐시는 `.cache/`. `--offline`은 캐시만 재생성.
3. 결과: `web/public/regions/<시·도>.json`, `web/data/regions.json`. 회사 목록과 네이버 ID가 겹치거나 폐업 표시면 제외. 폴더 링크·저장자 정보는 넣지 않습니다.

### Slack 자동 수집 (`collect-lunch.yml`)

1. **사전 확인**: Slack 최신 메시지 ts ↔ `lastMessageTs`. 새 글 없으면 종료(모델 호출 없음).
2. **증분 수집**: `seed-from-catalog` → `ingest-channel-history`(이후 메시지만) → upsert → export. `lastMessageTs` 없으면 전체 재구성.
3. **enrich**: `catalog:enrich` — 회사 주소 지오코딩(지도 핀), 가게 좌표·카카오맵, 별점·리뷰, 카카오 도보 길찾기(`walkMeters`/`walkMinutes`, 실패 시 직선거리·`walkFromMap`), 빈 `hours` 보강. 평점·리뷰는 약 7일마다. 실패해도 수집 커밋은 진행.
4. **커밋·배포**: 실질 변경이 있을 때만. export 0곳이면 실패·기존 유지.

지시문: [`lunch-spots/ci/collect-prompt.md`](lunch-spots/ci/collect-prompt.md). 수동 실행 시 `force`면 새 글 없어도 봇 실행. 전체 재구성은 JSON에서 `lastMessageTs` 삭제.

**Secrets** (Settings → Secrets and variables → Actions):

| Secret | 값 |
| --- | --- |
| `CURSOR_API_KEY` | Cursor API 키 (모델 호출) |
| `LUNCH_SPOTS_SLACK_USER_TOKEN` | Slack User OAuth `xoxp-...` (`channels:history`, `groups:history`) |
| `LUNCH_SPOTS_CHANNEL_ID` | 채널 ID (`C…`) |
| `KAKAO_REST_API_KEY` | (선택) Kakao REST 키. 좌표·지도 링크·**도보 길찾기**. 앱에서 **카카오맵** 제품 ON |
| `CLOUDFLARE_API_TOKEN` | (CF Pages 배포) Account → Cloudflare Pages Edit 권한 토큰 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 계정 ID (D1과 동일 계정) |

**Variable** (Variables 탭, Secret 아님):

| Variable | 값 |
| --- | --- |
| `KAKAO_MAP_JS_KEY` | JavaScript 키. Web 도메인에 `https://<user>.github.io`, `https://lunch-radar.pages.dev`, `http://127.0.0.1:3847` 등록 |

회사 기본 주소는 `서울 강남구 남부순환로 2621`(플래그원). `LUNCH_OFFICE_ADDRESS` / `LUNCH_OFFICE_NAME`으로 변경. 지도 JS 키가 없으면 지도 대신 안내 문구, 가게별 네이버·카카오 버튼은 키 없이 동작합니다.

수집 로그에는 모델 최종 답변만 남깁니다(도구 인자에 Slack 사용자 ID가 들어갈 수 있음). 사용자 토큰은 그 사용자가 볼 수 있는 채널을 읽을 수 있으므로 쓰기 권한자 범위를 관리하세요.

### 최초 1회 설정

1. Settings → Pages → Source → **GitHub Actions**
2. `main` 푸시 또는 Actions → Deploy web to GitHub Pages → Run workflow
3. `https://<user>.github.io/<repo>/` — basePath는 `configure-pages`가 맞춤

### 주의

- Pages는 **공개**입니다(비공개 저장소도 일반 플랜이면 사이트는 공개).
- Pages에는 서버가 없어 `POST /api/restaurants`는 동작하지 않습니다. 데이터는 JSON 커밋으로만.
- Slack 멘션·DM 봇은 상시 서버가 필요합니다. 수집만 Actions가 담당합니다.

## 민감정보 검사

`node scripts/check-sensitive.mjs`가 추적 파일에서 다음을 찾으면 실패합니다.

- Slack 사용자·채널·팀 ID, 토큰, 메시지 링크, Google API 키
- `.env.example`이 아닌 `.env*`
- `restaurants.json`의 `channelId` / 가게 `source`·`countedMessages`·`author`·`messageTs`·`permalink`·`channelId`

| 시점 | 동작 |
| --- | --- |
| 커밋 전 (`.githooks/pre-commit`) | 스테이징 검사, 위반 시 거부 |
| CI / Pages 배포 / 자동 수집 | 위반 시 실패·배포·푸시 중단 |

GitHub 웹 업로드는 로컬 훅을 건너뜁니다. 데이터 파일은 로컬에서 커밋하세요.

손 등록 가게는 `source` 대신:

```json
{
  "slug": "음식점명",
  "name": "음식점명",
  "address": "실제 주소",
  "category": "한식",
  "tags": [],
  "mentionCount": 0,
  "addedAt": "2026-11-06T00:00:00.000Z",
  "updatedAt": "2026-11-06T00:00:00.000Z",
  "curated": { "by": "등록자", "url": "https://example.com/reference" }
}
```

## 문제 해결

| 증상 | 원인 / 해결 |
| --- | --- |
| `npm` 인식 안 됨 | Node 미설치·PATH. 1단계 후 터미널 재시작 |
| `npm ci` lockfile 불일치 | `npm install` |
| 봇 `EBADENGINE` | Node 22.13+ 필요 |
| Port 3847 in use | 기존 dev 종료 또는 다른 포트 |
| 목록 비어 있음 / 빌드 실패 | `web/data/restaurants.json` 복구 |
| Pages CSS/JS 404 | Pages Source = GitHub Actions, `BASE_PATH` 확인 |
| Windows `build:pages` EPERM | `npm run dev` 종료 후 재시도 |
| `build:pages` 중단 후 API 사라짐 | `web/.api-parked` → `web/src/app/api` |
| 회사 핀이 건물과 어긋남 | enrich가 주소 지오코딩을 쓰는지 확인. 도보 기준점(`WALK_ORIGIN`)과 혼동하지 말 것 |

## 참고

- UI는 [Admin Design System](https://genonai.github.io/admin-design-system) 토큰·컴포넌트 모양. 폰트는 `pretendard`(SIL OFL) 번들. → [web/README 디자인](web/README.md#디자인)
- Next.js 15.2.4에는 [CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478) 권고가 있습니다. 외부 배포 시 패치 버전으로 올리세요.
