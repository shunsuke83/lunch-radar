import { LunchExplorer } from "@/components/lunch-explorer";
import { loadCatalog, loadRegions } from "@/lib/restaurants";

export default async function HomePage() {
  const [catalog, regions] = await Promise.all([loadCatalog(), loadRegions()]);
  return <LunchExplorer catalog={catalog} regions={regions} />;
}
