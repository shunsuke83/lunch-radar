import { createHash } from "node:crypto";

/** Stable JSON for hashing (sorted object keys, arrays as-is). */
export function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((v) => stableStringify(v)).join(",")}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
}

/** Content hash excluding row_version / row_hash / run metadata. */
export function rowHash(fields) {
  const {
    row_version: _v,
    row_hash: _h,
    ...rest
  } = fields;
  return createHash("sha256").update(stableStringify(rest)).digest("hex").slice(0, 32);
}
