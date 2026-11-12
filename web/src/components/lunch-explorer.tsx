"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  RestaurantFilters,
  type FilterState,
} from "@/components/restaurant-filters";
import { RestaurantList } from "@/components/restaurant-list";
import { RestaurantMap } from "@/components/restaurant-map";
import { RotateCcw } from "lucide-react";
import { Button, PageHeader, SegmentedControl } from "@/components/ds";
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

  const reset = () => setFilters(EMPTY_FILTERS);

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-stack-xxxl px-inline-lg py-stack-xxl sm:px-inline-xxl">
      <PageHeader
        title="점심맛집"
        description="Slack 채널에서 모은 점심 맛집을 종류·거리·영업시간·가격으로 골라 보세요."
        meta={[
          { label: "표시", value: `${restaurants.length} / ${catalog.restaurants.length}곳` },
          {
            label: "데이터",
            value: catalog.source === "sample" ? "샘플(Slack 연동 전)" : catalog.source,
          },
          { label: "갱신", value: stamp },
        ]}
      />

      <div className="flex flex-col gap-stack-md">
        <RestaurantFilters
          value={filters}
          categories={facets.categories}
          tags={facets.tags}
          clockReady={now !== null}
          onChange={setFilters}
          actions={
            <>
              <SegmentedControl
                label="보기 방식"
                value={view}
                options={[
                  { value: "list", label: "목록" },
                  { value: "map", label: "지도" },
                ]}
                onChange={setView}
              />
              <Button size="md" onClick={reset}>
                <RotateCcw aria-hidden className="size-size-icon-sm" />
                초기화
              </Button>
            </>
          }
        />

        {view === "map" ? (
          <RestaurantMap restaurants={restaurants} office={catalog.office} />
        ) : null}

        <RestaurantList restaurants={restaurants} now={now} onReset={reset} />

        {deferred !== filters ? (
          <p className="text-center text-text-tertiary typography-caption">필터 적용 중…</p>
        ) : null}
      </div>
    </main>
  );
}
