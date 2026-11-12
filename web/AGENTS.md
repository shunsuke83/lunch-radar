## UI 개발 규칙

- UI는 genonai/admin-design-system(쇼케이스: https://genonai.github.io/admin-design-system)을 기준으로 개발한다.
- 패키지 `@genonai/admin-design-system`은 비공개라, 같은 이름의 대체 컴포넌트를 `src/components/ds.tsx`에 둔다. 화면에서는 이 컴포넌트를 쓰고, 같은 모양을 div · button으로 새로 만들지 않는다.
- 색 · 글자 · 간격 · 반경 · 그림자는 토큰 클래스만 쓴다 (`text-text-*`, `bg-surface-*`, `border-border-*`, `gap-stack-*` / `gap-group-*`, `px-inline-*`, `h-size-control-*`, `rounded-xs` 등, `typography-*`). 임의 hex · px 값과 Tailwind 기본 팔레트(`text-gray-500` 등)는 쓰지 않는다.
- 화면 뼈대는 쇼케이스 Templates(리스트 페이지: PageHeader → ListControl → 목록), 컴포넌트 상태와 Props는 쇼케이스 Reference를 따른다.
- 필요한 컴포넌트가 `ds.tsx`에 없으면 새로 만들기 전에 쇼케이스에서 비슷한 후보를 찾아 제안하고 확인받는다. 추가할 때는 쇼케이스 데모의 클래스 이름을 그대로 옮긴다.
- 토큰 값은 `src/app/ds-tokens.css`에 있다. 쇼케이스 토큰이 바뀌면 이 파일만 갱신한다.
