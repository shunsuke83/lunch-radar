import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { RestaurantCatalog } from "./catalog";

export * from "./catalog";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");

export function dataPath(): string {
  return DATA_PATH;
}

/** The page embeds the catalog; Slack ids must not reach it even if the file has them. */
export async function loadCatalog(): Promise<RestaurantCatalog> {
  const raw = await readFile(DATA_PATH, "utf8");
  const { channelId: _channel, ...catalog } = JSON.parse(raw) as RestaurantCatalog;
  return {
    ...catalog,
    restaurants: catalog.restaurants.map((r) => {
      const { source: _source, countedMessages: _counted, ...rest } = r as typeof r & {
        countedMessages?: unknown;
      };
      return rest;
    }),
  };
}

export async function saveCatalog(catalog: RestaurantCatalog): Promise<void> {
  const payload: RestaurantCatalog = {
    ...catalog,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(DATA_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}
