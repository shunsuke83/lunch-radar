import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { RegionIndex, RestaurantCatalog } from "./catalog";

export * from "./catalog";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");
const REGIONS_PATH = path.join(process.cwd(), "data", "regions.json");

/** Index of the province files in public/regions; empty until the Naver import runs. */
export async function loadRegions(): Promise<RegionIndex> {
  try {
    return JSON.parse(await readFile(REGIONS_PATH, "utf8")) as RegionIndex;
  } catch {
    return { updatedAt: "", regions: [] };
  }
}

export function dataPath(): string {
  return DATA_PATH;
}

/** The page embeds the catalog; Slack ids must not reach it even if the file has them. */
export async function loadCatalog(): Promise<RestaurantCatalog> {
  const raw = await readFile(DATA_PATH, "utf8");
  const catalog = JSON.parse(raw) as RestaurantCatalog;
  return {
    ...catalog,
    channelId: undefined,
    restaurants: catalog.restaurants.map((r) => ({
      ...r,
      source: undefined,
      countedMessages: undefined,
    })),
  };
}

export async function saveCatalog(catalog: RestaurantCatalog): Promise<void> {
  const payload: RestaurantCatalog = {
    ...catalog,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(DATA_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}
