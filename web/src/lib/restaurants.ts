import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { RestaurantCatalog } from "./catalog";

export * from "./catalog";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");

export function dataPath(): string {
  return DATA_PATH;
}

export async function loadCatalog(): Promise<RestaurantCatalog> {
  const raw = await readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as RestaurantCatalog;
}

export async function saveCatalog(catalog: RestaurantCatalog): Promise<void> {
  const payload: RestaurantCatalog = {
    ...catalog,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(DATA_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}
