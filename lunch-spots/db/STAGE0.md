# Stage 0 gate results (2026-11-23)

## Decisions

Locked in [DECISIONS.md](./DECISIONS.md) (scope A, separate D1 `lunch-radar`, Pages, pull/push, 47-merge rules, JSON columns, backup, 90-day changelog).

## Schema + write proof

| Check | Result |
| --- | --- |
| `migrations/0001_init.sql` | Applied locally (`node:sqlite`) and **remote** D1 |
| Remote DB | `lunch-radar` / `b39ab49f-2eb4-4c10-8a76-c059f1739d1a` (account `cb5fd8f2bd7d6aef3fd6042aa374e8b3`) |
| Local `json_each` INSERT 100 | OK (`smoke-100-report.json`) |
| Remote `json_each` 2-row proof | OK |
| Remote 100-row INSERT | OK — metered **302** rows written (indexes) |

## Merge dry-run

| Metric | Value |
| --- | --- |
| Places after merge | 9,991 |
| Office ∩ region | **47** |
| Yangjae sundae | `양재순대`+`양재순대국` → `naver-1751873950` |
| Office-only | 144 |
| Rows with `legacy_slugs` | 294 |

## Export / verify / pull

- `db:import` → local SQLite 9,991 rows with `meta.last_message_ts` + `meta.office`.
- `db:export --to-tmp` / `db:pull` (default `.cache/pull-out`) recreate 17 regions + office.
- `db:verify` reports **expected** slug diffs from 47-merge + yangjae (not byte-identical to pre-merge JSON). Index counts match region files.
- `db:pull` requires `last_message_ts` and `office`; refuses otherwise. Use `--write-web` only when intentionally replacing repo catalogs.

## Shadow

- `npm run db:shadow` + workflow [`.github/workflows/d1-shadow.yml`](../../.github/workflows/d1-shadow.yml) (schedule + dispatch).
- JSON remains source of truth until Stage 2.

## Not done in Stage 0 (needs secrets in Actions / later)

- Full remote import of all ~10k rows via HTTP API token in CI.
- Turning off data-file commits (Stage 2).
- Removing JSON from git (Stage 4).
