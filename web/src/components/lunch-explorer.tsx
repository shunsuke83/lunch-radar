"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  RestaurantFilters,
  type FilterState,
} from "@/components/restaurant-filters";
import { RestaurantList } from "@/components/restaurant-list";
import { RestaurantMap } from "@/components/restaurant-map";
import { RotateCcw } from "lucide-react";
import { Button, EmptyState, PageHeader, SegmentedControl } from "@/components/ds";
import {
  filterRestaurants,
  OFFICE_REGION,
  presentGroups,
  seoulMinutes,
  themeOptions,
  uniqueTags,
  type RegionIndex,
  type Restaurant,
  type RestaurantCatalog,
} from "@/lib/catalog";

const EMPTY_FILTERS: FilterState = {
  q: "",
  category: "all",
  tag: "all",
  theme: "all",
  district: "all",
  near: false,
  openNow: false,
  budget: false,
  sort: "reviews",
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  catalog: RestaurantCatalog;
  regions: RegionIndex;
};

type RegionState =
  | { status: "ready"; restaurants: Restaurant[] }
  | { status: "loading" }
  | { status: "error"; message: string };

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

/** Province files are fetched once per visit and kept in memory. */
function useRegion(region: string, office: Restaurant[]): RegionState {
  const [loaded, setLoaded] = useState<Record<string, RegionState>>({});
  useEffect(() => {
    if (region === OFFICE_REGION || loaded[region]) return;
    setLoaded((prev) => ({ ...prev, [region]: { status: "loading" } }));
    fetch(`${BASE_PATH}/regions/${region}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ restaurants: Restaurant[] }>;
      })
      .then((data) =>
        setLoaded((prev) => ({ ...prev, [region]: { status: "ready", restaurants: data.restaurants } })),
      )
      .catch((e: Error) =>
        setLoaded((prev) => ({ ...prev, [region]: { status: "error", message: e.message } })),
      );
  }, [region, loaded]);
  if (region === OFFICE_REGION) return { status: "ready", restaurants: office };
  return loaded[region] ?? { status: "loading" };
}

export function LunchExplorer({ catalog, regions }: Props) {
  const [region, setRegion] = useState<string>(OFFICE_REGION);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [view, setView] = useState<"list" | "map">("list");
  const deferred = useDeferredValue(filters);
  const now = useSeoulClock();
  const isOffice = region === OFFICE_REGION;

  const state = useRegion(region, catalog.restaurants);
  const source = useMemo(() => (state.status === "ready" ? state.restaurants : []), [state]);
  const regionInfo = regions.regions.find((r) => r.id === region);

  const facets = useMemo(
    () => ({
      categories: presentGroups(source),
      tags: uniqueTags(source),
      themes: themeOptions(source),
    }),
    [source],
  );

  const restaurants = useMemo(
    () =>
      filterRestaurants(source, {
        q: deferred.q,
        category: deferred.category,
        tag: deferred.tag,
        theme: deferred.theme,
        district: isOffice ? "all" : deferred.district,
        near: isOffice && deferred.near,
        budget: deferred.budget,
        openAt: deferred.openNow ? now : null,
        sort: !isOffice && deferred.sort === "distance" ? "reviews" : deferred.sort,
      }),
    [source, deferred, now, isOffice],
  );

  const updatedAt = isOffice ? catalog.updatedAt : regions.updatedAt;
  const stamp = useMemo(() => {
    const when = new Date(updatedAt);
    return Number.isNaN(when.getTime())
      ? updatedAt
      : when.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  }, [updatedAt]);

  const reset = () => setFilters(EMPTY_FILTERS);
  const changeRegion = (next: string) => {
    setRegion(next);
    setFilters(EMPTY_FILTERS);
  };

  const regionOptions = [
    { value: OFFICE_REGION, label: `회사 근처 (${catalog.restaurants.length})` },
    ...regions.regions.map((r) => ({ value: r.id, label: `${r.label} (${r.count.toLocaleString("ko-KR")})` })),
  ];
  const districtOptions = regionInfo
    ? [
        { value: "all", label: "전체" },
        ...regionInfo.districts.map((d) => ({ value: d.name, label: `${d.name} (${d.count})` })),
      ]
    : [];

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-stack-xxxl px-inline-lg py-stack-xxl sm:px-inline-xxl">
      <PageHeader
        title="점심맛집"
        description="Slack 채널에서 모은 회사 근처 점심 맛집과 지역별 저장 맛집을 종류·거리·영업시간·가격으로 골라 보세요."
        meta={[
          { label: "표시", value: `${restaurants.length.toLocaleString("ko-KR")} / ${source.length.toLocaleString("ko-KR")}곳` },
          {
            label: "데이터",
            value: isOffice
              ? catalog.source === "sample"
                ? "샘플(Slack 연동 전)"
                : catalog.source
              : "네이버지도 저장 목록",
          },
          { label: "갱신", value: stamp },
        ]}
      />

      <div className="flex flex-col gap-stack-md">
        <RestaurantFilters
          value={filters}
          region={region}
          regions={regionOptions}
          districts={districtOptions}
          onRegionChange={changeRegion}
          nearby={isOffice}
          categories={facets.categories}
          tags={facets.tags}
          themes={facets.themes}
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

        {state.status === "loading" ? (
          <p className="py-stack-xl text-center text-text-tertiary typography-body-md-regular">
            {regionInfo?.label ?? ""} 맛집을 불러오는 중…
          </p>
        ) : state.status === "error" ? (
          <EmptyState type="error" title="지역 데이터를 불러오지 못했습니다." description={state.message} />
        ) : (
          <>
            {view === "map" ? (
              <RestaurantMap restaurants={restaurants} office={isOffice ? catalog.office : undefined} />
            ) : null}
            <RestaurantList restaurants={restaurants} now={now} onReset={reset} nearby={isOffice} />
          </>
        )}

        {deferred !== filters ? (
          <p className="text-center text-text-tertiary typography-caption">필터 적용 중…</p>
        ) : null}
      </div>
    </main>
  );
}
