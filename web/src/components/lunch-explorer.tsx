"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  RestaurantFilters,
  type FilterState,
} from "@/components/restaurant-filters";
import { RestaurantList } from "@/components/restaurant-list";
import {
  filterRestaurants,
  uniqueTags,
  uniqueValues,
  type RestaurantCatalog,
} from "@/lib/catalog";

const EMPTY_FILTERS: FilterState = {
  q: "",
  category: "all",
  area: "all",
  tag: "all",
};

type Props = {
  catalog: RestaurantCatalog;
};

export function LunchExplorer({ catalog }: Props) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const deferred = useDeferredValue(filters);

  const facets = useMemo(
    () => ({
      categories: uniqueValues(catalog.restaurants, "category"),
      areas: uniqueValues(catalog.restaurants, "area"),
      tags: uniqueTags(catalog.restaurants),
    }),
    [catalog],
  );

  const restaurants = useMemo(
    () => filterRestaurants(catalog.restaurants, deferred),
    [catalog, deferred],
  );

  const stamp = useMemo(() => {
    const when = new Date(catalog.updatedAt);
    return Number.isNaN(when.getTime())
      ? catalog.updatedAt
      : when.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  }, [catalog.updatedAt]);

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:py-14">
      <header className="space-y-3">
        <p className="font-display text-sm font-semibold tracking-[0.18em] text-primary uppercase">
          genon lunch
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          점심맛집
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Slack 채널에서 모은 점심 맛집을 한곳에서 보고, 종류·지역·태그로 골라 보세요.
        </p>
        <p className="text-sm text-muted-foreground">
          {restaurants.length}/{catalog.restaurants.length}곳 · 데이터{" "}
          {catalog.source === "sample" ? "샘플(Slack 연동 전)" : catalog.source} · 갱신{" "}
          {stamp} (Asia/Seoul)
        </p>
      </header>

      <RestaurantFilters
        value={filters}
        categories={facets.categories}
        areas={facets.areas}
        tags={facets.tags}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      <RestaurantList restaurants={restaurants} />

      {deferred !== filters ? (
        <p className="text-center text-xs text-muted-foreground">필터 적용 중…</p>
      ) : null}
    </div>
  );
}
