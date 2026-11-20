// Reclassify from subcategory text only; dedupe collections; scrub import memos.
// Never invent 한식. Keep an existing group when subcategory does not match (R3).
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { groupOf } from "./category-rules.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.resolve(root, "..", "web");
const outDir = path.join(webDir, "public", "regions");
const officeFile = path.join(webDir, "data", "restaurants.json");

const INTERNAL_NOTE =
  /Eat my Seoul|RIBBON_|Neon Vetted|Neon Heart|\bSelected\b|MATJIDO|Sikr|내부\s*메모|내부메모|\bimport\b|scrape|^※/i;

/** Stale name-based mis-tags with no subcategory — clear so name reclass can run (R3 leftover). */
const CLEAR_CATEGORY_SLUGS = new Set([
  "naver-2025393224", // 삼동소바 충남공주점
  "naver-13086380", // 슈엔챠이 공주점
  "naver-1086187664", // 진짜무쇠삼겹 공주점
  "naver-1088201259", // 남도쌈밥 롯데백화점 광주점
  "naver-1768627695", // 만복이쭈꾸미낙지볶음 광주점
  "naver-2016578165", // 마초스테이크 전주점
  "naver-1340584191", // 파쿠야 전주점
  "naver-1448616008", // 순옥이네 보리밥뷔페
  "naver-1407375029", // 김셰프의집밥 한식뷔페
]);

function scrubRestaurant(r) {
  let changed = false;
  if (r.notes?.trim()) {
    const kept = r.notes
      .split(/\s+·\s+/)
      .map((s) => s.trim())
      .filter((s) => {
        if (!s || INTERNAL_NOTE.test(s)) return false;
        if (!/[가-힣]/.test(s) && /^[A-Za-z]/.test(s)) return false;
        return true;
      });
    const before = r.notes.split(/\s+·\s+/).filter((s) => s.trim()).length;
    if (kept.length !== before) {
      if (kept.length) r.notes = kept.join(" · ");
      else delete r.notes;
      changed = true;
    }
  }
  if (Array.isArray(r.menu) && r.menu.length) {
    const next = r.menu.filter((m) => {
      const name = m?.name?.trim();
      if (!name || INTERNAL_NOTE.test(name)) return false;
      if (m.price === undefined && !/[가-힣]/.test(name) && /^[A-Za-z]/.test(name)) return false;
      return true;
    });
    if (next.length !== r.menu.length) {
      if (next.length) r.menu = next;
      else delete r.menu;
      changed = true;
    }
  }
  return changed;
}

const now = new Date().toISOString();
let reclassed = 0;
let cleared = 0;
let deduped = 0;
let scrubbed = 0;

function processFile(fp) {
  const j = JSON.parse(readFileSync(fp, "utf8"));
  let changed = false;
  for (const r of j.restaurants ?? []) {
    if (scrubRestaurant(r)) {
      scrubbed++;
      changed = true;
    }
    // One-shot undo for name-fragment mis-tags (공주점→주점, 한식뷔페→양식).
    if (
      CLEAR_CATEGORY_SLUGS.has(r.slug) &&
      !String(r.subcategory ?? "").trim() &&
      (r.category === "주점" || r.category === "양식")
    ) {
      delete r.category;
      cleared++;
      changed = true;
    }
    const sub = String(r.subcategory ?? "").trim();
    if (sub) {
      const next = groupOf(sub);
      if (next && r.category !== next) {
        r.category = next;
        reclassed++;
        changed = true;
      }
    } else if (!r.category) {
      const fromName = groupOf(r.name);
      if (fromName) {
        r.category = fromName;
        reclassed++;
        changed = true;
      }
    }
    if (Array.isArray(r.collections) && r.collections.length) {
      const unique = [...new Set(r.collections)];
      if (unique.length !== r.collections.length) {
        r.collections = unique.sort((a, b) => a.localeCompare(b, "ko"));
        deduped++;
        changed = true;
      }
    }
  }
  if (changed) {
    j.updatedAt = now;
    writeFileSync(fp, `${JSON.stringify(j)}\n`);
  }
  return changed;
}

const files = readdirSync(outDir)
  .filter((f) => f.endsWith(".json") && !f.includes(".summary"))
  .map((f) => path.join(outDir, f));
if (existsSync(officeFile)) files.push(officeFile);

for (const fp of files) processFile(fp);

console.log(JSON.stringify({ reclassed, cleared, deduped, scrubbed, files: files.length }, null, 2));
