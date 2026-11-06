import { LunchExplorer } from "@/components/lunch-explorer";
import { loadCatalog } from "@/lib/restaurants";

export default async function HomePage() {
  const catalog = await loadCatalog();
  return <LunchExplorer catalog={catalog} />;
}
