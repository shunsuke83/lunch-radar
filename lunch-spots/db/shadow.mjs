// Shadow mode (Stage 1): JSON remains source of truth; D1/local follows via import + verify.
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importCatalog } from "./import-catalog.mjs";
import { verifyParity } from "./verify-catalog.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

const imported = await importCatalog({ backend: "local" });
const verified = await verifyParity();

const report = {
  generatedAt: new Date().toISOString(),
  mode: "shadow",
  imported,
  verify: {
    ok: verified.ok,
    problematicCount: verified.problematic.length,
    indexMismatch: verified.indexMismatch,
  },
  note: "JSON is still the source of truth. D1/local mirror updated. Promote to Stage 2 only after gates pass.",
};
writeFileSync(path.join(here, "shadow-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
