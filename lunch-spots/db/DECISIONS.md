# lunch-radar D1 — locked decisions (Stage 0)

Confirmed 2026-11-23 from the D1 transition plan recommended values.
These are the defaults Stage 0+ implement against.

| # | Topic | Decision |
| --- | --- | --- |
| 1 | Scope | **A**: D1 is source of truth; site stays static (GitHub Pages + Cloudflare Pages mirror). Scope B (query API) / C (team share) only when needed. |
| 2 | DB location | Same Cloudflare account as AI-MARKET; **separate** database named `lunch-radar`. |
| 3 | Site URL | Keep GitHub Pages (`…/lunch-radar/`). Cloudflare Pages mirror at `https://lunch-radar.pages.dev/` (root `BASE_PATH`). Deploy workflows export/build static `web/out`. |
| 4 | Script workflow | `db:pull` → script/bot → `db:push` (row_version conflict aborts). Frequent scripts may later call the store module directly. |
| 5 | Office ∩ Seoul (47) | One `places` row; `in_office` + `in_region`. Prefer office for map/naver/walk/rating fields; **union** `collections`; earliest `added_at`. Keep `legacy_slugs` JSON for wishlist/deeplink. |
| 6 | Menu / themes | Store as **JSON columns** on `places` (normalize only if Scope B needs server search). |
| 7 | Data file commits | Stop committing catalogs after Stage 2 gate; remove from repo in Stage 4 (+ `.gitignore`). |
| 8 | Backup | D1 point-in-time (free 7 days) + weekly `db:export` tarball attached to a GitHub Release. |
| 9 | Change log retention | `place_changes` / `runs` kept **90 days**. |

## Merge field winners (47 overlaps)

| Field group | Winner |
| --- | --- |
| `naver_*`, `kakao_*`, `lat`/`lng`, `address`, `walk_*`, `rating_*`, `naver_reviews`/`naver_score` | office |
| `collections`, `tags` | union (sorted unique) |
| `category` / `subcategory` | office if set, else region; `category_source=manual` if they differ |
| `menu`, `hours`, `notes`, `curated_*` | office if present, else region |
| `mention_count` | max |
| `added_at` | min |
| `updated_at` | max |
| Canonical `slug` | Prefer `naver-{id}` when either side has naver place id; else office slug. Other slug → `legacy_slugs`. |

## Yangjae sundae (office)

`양재순대` and `양재순대국` share naver place id `1751873950` in the office catalog only. Merge to one row before unique index on `naver_place_id`; keep both slugs in `legacy_slugs`.
