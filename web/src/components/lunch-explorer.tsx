"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  RestaurantFilters,
  type FilterState,
} from "@/components/restaurant-filters";
import { RestaurantList } from "@/components/restaurant-list";
import { RestaurantMap } from "@/components/restaurant-map";
import { Button } from "@/components/ui/button";
import {
  filterRestaurants,
  presentGroups,
  seoulMinutes,
  uniqueTags,
  type RestaurantCatalog,
} from "@/lib/catalog";

const EMPTY_FILTERS: FilterState = {
  q: "",
  category: "all",
  tag: "all",
  near: false,
  openNow: false,
  budget: false,
  sort: "popular",
};

type Props = {
  catalog: RestaurantCatalog;
};

/** Minutes since midnight in Seoul, refreshed every minute; null before mount. */
function useSeoulClock(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(seoulMinutes(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function LunchExplorer({ catalog }: Props) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [view, setView] = useState<"list" | "map">("list");
  const deferred = useDeferredValue(filters);
  const now = useSeoulClock();

  const facets = useMemo(
    () => ({
      categories: presentGroups(catalog.restaurants),
      tags: uniqueTags(catalog.restaurants),
    }),
    [catalog],
  );

  const restaurants = useMemo(
    () =>
      filterRestaurants(catalog.restaurants, {
        q: deferred.q,
        category: deferred.category,
        tag: deferred.tag,
        near: deferred.near,
        budget: deferred.budget,
        openAt: deferred.openNow ? now : null,
        sort: deferred.sort,
      }),
    [catalog, deferred, now],
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
          Slack 채널에서 모은 점심 맛집을 한곳에서 보고, 종류·거리·영업시간·가격으로 골라 보세요.
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
        tags={facets.tags}
        clockReady={now !== null}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      <div className="flex gap-2" role="group" aria-label="보기 방식">
        {(["list", "map"] as const).map((v) => (
          <Button
            key={v}
            type="button"
            size="sm"
            variant={view === v ? "default" : "outline"}
            aria-pressed={view === v}
            className="rounded-full px-3"
            onClick={() => setView(v)}
          >
            {v === "list" ? "목록" : "지도보기"}
          </Button>
        ))}
      </div>

      {view === "map" ? (
        <RestaurantMap restaurants={restaurants} office={catalog.office} />
      ) : null}

      <RestaurantList restaurants={restaurants} now={now} />

      {deferred !== filters ? (
        <p className="text-center text-xs text-muted-foreground">필터 적용 중…</p>
      ) : null}
    </div>
  );
}
