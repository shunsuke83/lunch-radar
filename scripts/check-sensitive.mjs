#!/usr/bin/env node
// Fails when tracked files would publish Slack identifiers or secrets.
// The repo and GitHub Pages are public, and a leak in any commit needs a
// history rewrite, so this runs before commit (.githooks), in CI, before the
// Pages build, and before the collector commits.
//
//   node scripts/check-sensitive.mjs            tracked files in the working tree
//   node scripts/check-sensitive.mjs --staged   staged content (pre-commit hook)
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const staged = process.argv.includes("--staged");
const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 1 << 28 });

const SKIP = [/(^|\/)package-lock\.json$/, /(^|\/)node_modules\//, /\.(png|jpe?g|gif|webp|ico|woff2?|ttf|bundle|zip)$/i];
const CATALOG = "web/data/restaurants.json";

/** Patterns that must not appear in any tracked text file. */
const PATTERNS = [
  { name: "Slack user id", re: /\b[UW]0[A-Z0-9]{8,10}\b/g },
  { name: "Slack channel/team id", re: /\b[CDGT]0[A-Z0-9]{8,10}\b/g },
  { name: "Slack token", re: /\bxox[abeoprs]-[0-9A-Za-z-]{10,}/g },
  { name: "Slack app token", re: /\bxapp-\d-[0-9A-Za-z-]{10,}/g },
  { name: "Slack message link", re: /slack\.com\/archives\/(?!REDACTED_CHANNEL)[A-Z0-9]+\/p\d+/g },
  { name: "Google API key", re: /\bAIza[0-9A-Za-z_-]{35}\b/g },
];

const files = (staged
  ? git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z")
  : git("ls-files", "-z")
)
  .split("\0")
  .filter(Boolean);

const read = (file) => (staged ? git("show", `:${file}`) : readFileSync(file, "utf8"));
const problems = [];
const mask = (v) => `${v.slice(0, 4)}…`;

for (const file of files) {
  if (/(^|\/)\.env(\.|$)/.test(file) && !file.endsWith(".env.example")) {
    problems.push(`${file}: env files must not be committed`);
    continue;
  }
  if (SKIP.some((re) => re.test(file))) continue;
  let text;
  try {
    text = read(file);
  } catch {
    continue;
  }
  if (text.includes("\0")) continue;
  for (const { name, re } of PATTERNS) {
    for (const m of text.matchAll(re)) {
      const line = text.slice(0, m.index).split("\n").length;
      problems.push(`${file}:${line}: ${name} (${mask(m[0])})`);
    }
  }
  if (file === CATALOG) checkCatalog(text);
}

/** Collector rows carry no Slack metadata; hand-added rows use `curated`, never `source`. */
function checkCatalog(text) {
  let catalog;
  try {
    catalog = JSON.parse(text);
  } catch (err) {
    problems.push(`${CATALOG}: invalid JSON (${err.message})`);
    return;
  }
  if ("channelId" in catalog) problems.push(`${CATALOG}: top-level channelId`);
  for (const [i, r] of (catalog.restaurants ?? []).entries()) {
    const where = `${CATALOG}: restaurants[${i}] ${r?.name ?? ""}`.trim();
    for (const key of ["source", "countedMessages", "author", "messageTs", "permalink", "channelId"]) {
      if (r && key in r) problems.push(`${where}: field "${key}" (use "curated": {by, url} for hand-added rows)`);
    }
  }
}

if (problems.length) {
  console.error(`Sensitive data check failed (${problems.length}):`);
  for (const p of problems.slice(0, 50)) console.error(`  ${p}`);
  if (problems.length > 50) console.error(`  … ${problems.length - 50} more`);
  console.error("Remove the identifiers before committing; see README \"민감정보 검사\".");
  process.exit(1);
}
console.log(`Sensitive data check passed (${files.length} files${staged ? ", staged" : ""}).`);
