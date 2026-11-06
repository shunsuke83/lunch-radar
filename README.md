# 점심맛집 (lunch-radar)

사내 Slack 점심 채널의 맛집 추천을 수집하고, 웹에서 필터해 보는 프로젝트입니다. 대상 채널은 환경 변수 `LUNCH_SPOTS_CHANNEL_ID`로 지정하며 저장소에는 넣지 않습니다.

| 폴더 | 역할 | 실행에 필요한 것 |
| --- | --- | --- |
| [`web/`](web/) | 맛집 목록 브라우저 앱 (Next.js, 검색·7개 대분류·도보 5분/영업 중/만원 이하 칩·거리/가격 정렬) | Node.js만 있으면 됨 (샘플 데이터 포함) |
| [`lunch-spots/`](lunch-spots/) | Slack Agent SDK 봇 (히스토리 + 실시간 수집, 추천) | Node.js 22.13+, Agent SDK 로그인, Slack 토큰 |

처음이라면 **웹 앱만 먼저 실행**해 보세요. Slack 없이도 `web/data/restaurants.json` 샘플 데이터로 UI를 확인할 수 있습니다.

웹 앱은 GitHub Actions로 GitHub Pages에 자동 배포됩니다: https://shunsuke83.github.io/lunch-radar/ (설정 방법은 [GitHub Pages 배포](#github-pages-배포) 참고)

## 1. 사전 준비

| 도구 | 버전 | 확인 명령 |
| --- | --- | --- |
| Git | 아무 버전 | `git --version` |
| Node.js | **22.13 이상 권장** (웹만 쓸 경우 20 이상도 가능) | `node -v` |
| npm | Node.js에 포함 | `npm -v` |

Node.js가 없으면 설치합니다.

```powershell
# Windows (PowerShell)
winget install OpenJS.NodeJS.LTS
```

```bash
# macOS
brew install node@22
```

또는 [nodejs.org](https://nodejs.org/)에서 LTS 버전을 내려받습니다. **설치 후 터미널(및 Cursor/VS Code)을 완전히 껐다 켜야** `npm` 명령이 인식됩니다.

## 2. 클론

```bash
git clone https://github.com/shunsuke83/lunch-radar.git
cd lunch-radar
```

## 3. 웹 앱 실행

```bash
cd web
npm ci
npm run dev
```

브라우저에서 http://127.0.0.1:3847 을 엽니다.

> Windows PowerShell 5에서는 `cd web && npm ci` 처럼 `&&`로 이어 쓸 수 없습니다. 위처럼 한 줄씩 실행하거나 `;`로 구분하세요.

프로덕션 빌드로 실행하려면:

```bash
cd web
npm ci
npm run build
npm run start
```

프로덕션 모드에서 `POST /api/restaurants`(데이터 import)를 쓰려면 `web/.env.local`에 `IMPORT_TOKEN=<임의의 비밀값>`을 넣고, 요청 헤더 `x-import-token`으로 같은 값을 보내야 합니다. 설정하지 않으면 import는 403으로 막힙니다. 개발 모드(`npm run dev`)에서는 토큰 없이 import됩니다.

맛집 목록은 빌드 시점에 `web/data/restaurants.json`에서 읽어 페이지에 포함됩니다. 개발 모드에서는 새로고침만 하면 반영되지만, `npm run start`(프로덕션 서버)에서는 데이터가 바뀌면 `npm run build`를 다시 해야 합니다.

GitHub Pages와 같은 정적 파일로 빌드하려면:

```bash
cd web
npm run build:pages   # 결과물: web/out/
```

`build:pages`는 정적 export에서 지원되지 않는 API 라우트(`src/app/api`)를 빌드 동안만 잠시 치워 두고 빌드한 뒤 원위치합니다. 하위 경로(`/lunch-radar/`)로 배포할 때는 `NEXT_PUBLIC_BASE_PATH=/lunch-radar` 환경 변수를 함께 줍니다.

## 4. Slack 봇 실행 (선택)

봇은 Agent SDK 계정 로그인과 Slack 앱 토큰이 필요합니다. 자세한 내용은 [`lunch-spots/README.md`](lunch-spots/README.md)를 참고하세요.

```bash
cd lunch-spots
npm ci
npx @grok/agent-sdk login
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk dev
```

`lunch-spots/.env.local`에 대상 채널 `LUNCH_SPOTS_CHANNEL_ID=C…`를 넣어야 수집 도구와 채널 감시가 동작합니다. Slack 연결 시 토큰도 같은 파일에 저장됩니다 (형식은 [`lunch-spots/.env.example`](lunch-spots/.env.example) 참고). `.env*` 파일은 `.gitignore`에 포함되어 있으니 **토큰을 커밋하지 마세요.**

## 5. 봇 → 웹 데이터 흐름

1. 봇이 채널 히스토리/실시간 글에서 맛집을 수집합니다.
2. 봇의 `export-restaurants` 도구가 `../web/data/restaurants.json`을 덮어씁니다. 그래서 **`lunch-spots`와 `web`은 이 저장소 구조 그대로 형제 폴더로 두고, 봇은 `lunch-spots` 폴더 안에서 실행**해야 합니다.
3. 로컬 개발 서버라면 새로고침하면 반영됩니다. 웹이 다른 서버에 있으면 export 결과를 `POST /api/restaurants`로 보냅니다.
4. GitHub Pages에 반영하려면 갱신된 `web/data/restaurants.json`을 커밋·푸시합니다. `main`에 푸시되면 Actions가 자동으로 다시 빌드·배포합니다. 평소에는 `collect-lunch.yml`이 매일 이 과정을 자동으로 합니다.

## GitHub Pages 배포

`.github/workflows/`에 세 개의 워크플로가 있습니다.

| 워크플로 | 트리거 | 하는 일 |
| --- | --- | --- |
| [`collect-lunch.yml`](.github/workflows/collect-lunch.yml) | 매일 11:30 (Asia/Seoul), 수동 실행 | Slack 채널 히스토리 수집 → `web/data/restaurants.json` 갱신·커밋 → Pages 배포 호출 |
| [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) | `main`에 `web/**` 변경 푸시, 수동 실행 | `npm run build:pages` → `web/out/`을 GitHub Pages에 배포 |
| [`ci.yml`](.github/workflows/ci.yml) | 모든 PR, `main` 푸시 | 웹 정적 빌드(타입체크 포함), 봇 `npm run check`(타입체크) |

### Slack 자동 수집 (`collect-lunch.yml`)

동작 순서:

1. **사전 확인 (모델 호출 없음)**: Slack에서 최신 메시지 시각만 조회해 `web/data/restaurants.json`의 `lastMessageTs`와 비교합니다. 새 메시지가 없으면 여기서 끝납니다.
2. **증분 수집**: `agent-sdk run`으로 봇을 한 번 실행합니다. `seed-from-catalog`가 기존 카탈로그를 불러오고, `ingest-channel-history`는 `lastMessageTs` 이후 메시지만 가져와 모델이 새 맛집만 반영합니다. 카탈로그에 `lastMessageTs`가 없으면 전체 히스토리로 다시 만듭니다.
3. **지도·평점 보강** (키가 있을 때만, 새 메시지가 없어도 실행): `npm run catalog:enrich`가 카카오 Local API로 회사 위치와 가게 좌표·카카오맵 링크를 찾고, Google Places API로 별점·리뷰 수를 붙입니다. 평점은 7일마다 다시 조회합니다. 이 단계가 실패해도 수집 결과 커밋은 계속합니다.
4. **커밋·배포**: 타임스탬프 외에 바뀐 내용이 있을 때만 커밋하고 Pages 배포를 호출합니다. export 결과가 0곳이면 실패 처리하고 기존 데이터를 유지합니다.

지시문은 [`lunch-spots/ci/collect-prompt.md`](lunch-spots/ci/collect-prompt.md)입니다. 수동 실행 시 `force`를 켜면 새 메시지가 없어도 봇을 실행합니다. 처음부터 다시 만들려면 JSON에서 `lastMessageTs`를 지우고 실행합니다.

필요한 저장소 Secrets (**Settings → Secrets and variables → Actions**):

| Secret | 값 |
| --- | --- |
| `CURSOR_API_KEY` | Cursor API 키 (모델 호출용, 대시보드에서 발급) |
| `LUNCH_SPOTS_SLACK_USER_TOKEN` | Slack User OAuth Token `xoxp-...` (`channels:history`, `groups:history`) |
| `LUNCH_SPOTS_CHANNEL_ID` | 수집할 Slack 채널 ID (Slack 채널 정보 하단의 `C…` 값). Secret이라 로그에서도 가려집니다. |
| `KAKAO_REST_API_KEY` | (선택) [Kakao Developers](https://developers.kakao.com/) 앱의 REST API 키. 가게 좌표·카카오맵 링크. 앱 설정의 **제품 설정 → 카카오맵**을 "사용함"으로 켜야 합니다(꺼져 있으면 `disabled OPEN_MAP_AND_LOCAL service` 403) |
| `GOOGLE_PLACES_API_KEY` | (선택) Google Cloud에서 **Places API (New)**를 켠 API 키. 별점·리뷰 수 |

지도 표시용 **Variable**(Secret 아님, 같은 화면의 Variables 탭):

| Variable | 값 |
| --- | --- |
| `KAKAO_MAP_JS_KEY` | 같은 카카오 앱의 JavaScript 키. 브라우저에 그대로 노출되는 키라 Secret이 아닌 Variable로 둡니다. 카카오 앱 **플랫폼 → Web 사이트 도메인**에 `https://<사용자명>.github.io`와 로컬 확인용 `http://127.0.0.1:3847`을 등록해야 지도가 뜹니다. |

회사 위치는 기본값 `서울 강남구 남부순환로 2621`(플래그원)이며 `LUNCH_OFFICE_ADDRESS` / `LUNCH_OFFICE_NAME` 환경 변수로 바꿀 수 있습니다. 키가 없으면 지도 대신 안내 문구가 나오고, 가게별 카카오맵·네이버지도 검색 버튼은 키 없이도 동작합니다. Google 평점은 Places API 유료 SKU(Text Search + rating 필드)라 월 무료 한도 안에서 쓰도록 주 1회만 다시 조회합니다.

수집 단계 로그에는 모델의 최종 답변만 남깁니다(도구 호출 인자에 Slack 사용자 ID가 들어 있기 때문).

전체 재구성은 약 4~5분, 모델 입력 수십만 토큰이 들지만, 새 메시지가 없는 날은 모델을 호출하지 않고 새 메시지가 있는 날도 그 메시지만 처리합니다. 사용자 토큰은 그 사용자가 볼 수 있는 모든 채널을 읽을 수 있으므로 저장소 쓰기 권한자 범위를 관리하세요.

### 최초 1회 설정

1. GitHub 저장소 → **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꿉니다.
2. 변경 사항을 `main`에 푸시하거나, **Actions → Deploy web to GitHub Pages → Run workflow**로 수동 실행합니다.
3. 배포가 끝나면 `https://<GitHub 사용자명>.github.io/<저장소명>/`에서 열립니다. 하위 경로(basePath)는 워크플로가 `actions/configure-pages`에서 자동으로 받아 오므로, 저장소 이름을 바꾸거나 포크해도 별도 수정이 필요 없습니다.

### 주의

- **GitHub Pages는 누구나 볼 수 있는 공개 사이트입니다** (비공개 저장소여도 Enterprise 플랜이 아니면 공개). 사내 Slack에서 수집한 데이터를 올려도 되는지 먼저 확인하세요.
- Pages에는 서버가 없으므로 `POST /api/restaurants` import는 동작하지 않습니다. 데이터 갱신은 `web/data/restaurants.json` 커밋으로만 합니다.
- Slack에서 멘션·DM으로 대화하는 봇 기능은 계속 실행되는 서버가 필요해 Actions로 대체되지 않습니다. 필요하면 로컬이나 `npx @grok/agent-sdk deploy`로 띄웁니다. 수집만은 `collect-lunch.yml`이 대신합니다.

## 문제 해결

| 증상 | 원인 / 해결 |
| --- | --- |
| `'npm' 용어가 ... 인식되지 않습니다` / `npm: command not found` | Node.js 미설치 또는 PATH 미반영. 1단계대로 설치한 뒤 터미널을 다시 엽니다. |
| `npm ci` 실패 (lockfile 불일치) | `npm install`로 대신 실행합니다. |
| 봇 설치 시 `EBADENGINE` 경고 / 실행 오류 | Node.js 22.13 미만입니다. `node -v` 확인 후 업그레이드합니다. |
| `Port 3847 is already in use` | 이미 실행 중인 dev 서버를 종료하거나 `npx next dev --port 3848`처럼 다른 포트를 씁니다. |
| 웹 목록이 비어 있음 / 빌드 실패 | `web/data/restaurants.json`이 없거나 JSON이 깨졌습니다. `git checkout web/data/restaurants.json`으로 샘플을 복구합니다. |
| Pages에서 화면이 깨지거나 CSS/JS가 404 | Settings → Pages의 Source가 **GitHub Actions**인지 확인합니다. 직접 빌드했다면 `NEXT_PUBLIC_BASE_PATH`가 저장소 경로와 같은지 확인합니다. |
| Windows에서 `build:pages`가 `EPERM ... rename` 오류 | 실행 중인 `npm run dev`가 `src/app/api` 폴더를 잡고 있습니다. dev 서버를 끄고 다시 실행합니다. |
| `build:pages` 도중 강제 종료 후 API가 사라짐 | `web/.api-parked` 폴더를 `web/src/app/api`로 되돌립니다. |

## 참고

- 폰트(Manrope, Syne, SIL OFL)는 `web/src/app/fonts/`에 포함되어 있어 빌드 시 Google Fonts에 접속하지 않습니다. Next.js 15.2.4의 `next/font/google`이 Google의 새 폰트 URL 형식을 처리하지 못해 빌드가 실패하기 때문입니다.
- `web`이 고정한 Next.js 15.2.4에는 보안 권고([CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478))가 있습니다. 로컬 확인용이 아니라 외부에 배포한다면 패치된 버전으로 올리세요.
