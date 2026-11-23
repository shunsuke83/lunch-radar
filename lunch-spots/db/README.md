# lunch-radar D1 store (Stage 0)

Local SQLite mirrors the D1 schema so Stage 0 gates run without Cloudflare credentials.
When `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `CLOUDFLARE_D1_DATABASE_ID` are set, the same scripts can target remote D1 (`LUNCH_RADAR_D1_BACKEND=cloudflare`).

Locked product decisions: [DECISIONS.md](./DECISIONS.md).

## Commands

```bash
# From lunch-spots/
npm run db:smoke-100      # json_each INSERT of 100 rows
npm run db:merge-dry-run  # 47 overlaps + yangjae + legacy_slugs
npm run db:import         # JSON catalogs → local SQLite
npm run db:export -- --to-tmp   # DB → .cache/export-out/web
npm run db:verify         # value-level compare (expects merge diffs)
npm run db:pull           # DB → .cache/pull-out/web (add --write-web for repo web/)
npm run db:push -- --check
npm run db:push -- --yes  # apply (refuses >500 rows without --yes)
npm run db:shadow         # Stage 1 mirror: import + verify
```

## Remote D1 create

```bash
npx wrangler d1 create lunch-radar
# paste database_id into wrangler.toml
npx wrangler d1 migrations apply lunch-radar --remote
```

Put tokens in `.env.local` (never commit):

```
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_D1_DATABASE_ID=
```

## Layout

| Path | Role |
| --- | --- |
| `migrations/0001_init.sql` | places, meta, runs, place_changes |
| `client.mjs` | local `node:sqlite` or Cloudflare HTTP |
| `import-catalog.mjs` / `export-catalog.mjs` | JSON ↔ rows |
| `pull.mjs` / `push.mjs` | bot/script wrapper contract |
| `shadow.mjs` | JSON-is-source daily mirror |
