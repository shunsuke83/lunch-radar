"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  RestaurantFilters,
  type FilterState,
  type ScopeTab,
} from "@/components/restaurant-filters";
import { RestaurantDetail } from "@/components/restaurant-detail";
import { RestaurantList } from "@/components/restaurant-list";
import { RestaurantMap, type MapBounds } from "@/components/restaurant-map";
import { Check, Dices, Heart, Link2, RotateCcw } from "lucide-react";
import { Button, EmptyState, PageHeader, SegmentedControl } from "@/components/ds";
import {
  collectionSourceLabel,
  filterRestaurants,
  OFFICE_REGION,
  presentGroups,
  seoulMinutes,
  seoulWeekday,
  tagOptions,
  themeOptions,
  type GeoPoint,
  type RegionIndex,
  type Restaurant,
  type RestaurantCatalog,
  type Weekday,
} from "@/lib/catalog";
import {
  EMPTY_FILTERS,
  explorerShareUrl,
  parseExplorerSearch,
  readStoredExplorer,
  serializeExplorerSearch,
  writeStoredExplorer,
  type ExplorerState,
} from "@/lib/filter-url";
import { sampleRestaurants, slackVoteText } from "@/lib/pick-lunch";
import {
  getVisitMarks,
  recordedSlugSet,
  setVisitMark,
  type VisitMark,
} from "@/lib/visitor-store";
import { getWishlist, toggleWishlist } from "@/lib/wishlist-store";
import { fetchWeather } from "@/lib/weather";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  catalog: RestaurantCatalog;
  regions: RegionIndex;
};

type RegionState =
  | { status: "ready"; restaurants: Restaurant[] }
  | { status: "loading" }
  | { status: "error"; message: string };

type SeoulClock = { minutes: number; weekday: Weekday } | null;

function useSeoulClock(): SeoulClock {
  const [clock, setClock] = useState<SeoulClock>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock({ minutes: seoulMinutes(d), weekday: seoulWeekday(d) });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return clock;
}

function useRegion(region: string, office: Restaurant[]): RegionState {
  const [loaded, setLoaded] = useState<Record<string, RegionState>>({});
  useEffect(() => {
    if (region === OFFICE_REGION || loaded[region]) return;
    setLoaded((prev) => ({ ...prev, [region]: { status: "loading" } }));
    const summaryUrl = `${BASE_PATH}/regions/${region}.summary.json`;
    const fullUrl = `${BASE_PATH}/regions/${region}.json`;
    fetch(summaryUrl)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("no summary"))))
      .then((data: { restaurants: Restaurant[] }) => {
        setLoaded((prev) => ({
          ...prev,
          [region]: { status: "ready", restaurants: data.restaurants },
        }));
        return fetch(fullUrl);
      })
      .then((res) => {
        if (!res || !res.ok) return null;
        return res.json() as Promise<{ restaurants: Restaurant[] }>;
      })
      .then((data) => {
        if (!data) return;
        setLoaded((prev) => ({
          ...prev,
          [region]: { status: "ready", restaurants: data.restaurants },
        }));
      })
      .catch(() =>
        fetch(fullUrl)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json() as Promise<{ restaurants: Restaurant[] }>;
          })
          .then((data) =>
            setLoaded((prev) => ({
              ...prev,
              [region]: { status: "ready", restaurants: data.restaurants },
            })),
          )
          .catch((e: Error) =>
            setLoaded((prev) => ({
              ...prev,
              [region]: { status: "error", message: e.message },
            })),
          ),
      );
  }, [region, loaded]);
  if (region === OFFICE_REGION) return { status: "ready", restaurants: office };
  return loaded[region] ?? { status: "loading" };
}

function inBounds(r: Restaurant, b: MapBounds | null): boolean {
  if (!b || !r.location) return true;
  const { lat, lng } = r.location;
  return lat >= b.south && lat <= b.north && lng >= b.west && lng <= b.east;
}

function mergeExplorer(base: ExplorerState, patch: Partial<ExplorerState>): ExplorerState {
  return {
    region: patch.region ?? base.region,
    view: patch.view ?? base.view,
    filters: patch.filters ? { ...EMPTY_FILTERS, ...patch.filters } : base.filters,
    place: patch.place !== undefined ? patch.place : base.place,
    map: patch.map !== undefined ? patch.map : base.map,
  };
}

export function LunchExplorer({ catalog, regions }: Props) {
  const [region, setRegion] = useState<string>(OFFICE_REGION);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [detailSlug, setDetailSlug] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [voteCopied, setVoteCopied] = useState(false);
  const [picks, setPicks] = useState<Restaurant[]>([]);
  const [visits, setVisits] = useState<Record<string, VisitMark>>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [viewer, setViewer] = useState<GeoPoint | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [weatherRainy, setWeatherRainy] = useState(false);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number; z: number } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(true);
  const skipUrlWrite = useRef(true);
  const detailHistory = useRef(false);
  const deferred = useDeferredValue(filters);
  const clock = useSeoulClock();
  const now = clock?.minutes ?? null;
  const weekday = clock?.weekday ?? null;
  const isOffice = region === OFFICE_REGION;
  const scope: ScopeTab = isOffice ? "office" : "nationwide";
  const defaultProvince = regions.regions[0]?.id ?? OFFICE_REGION;

  const knownRegions = useMemo(
    () => new Set([OFFICE_REGION, ...regions.regions.map((r) => r.id)]),
    [regions],
  );

  useEffect(() => {
    const fromUrl = parseExplorerSearch(window.location.search);
    const hasUrl = Object.keys(fromUrl).length > 0;
    const fromStore = hasUrl ? null : readStoredExplorer();
    const patch = hasUrl ? fromUrl : (fromStore ?? {});
    if (patch.region && !knownRegions.has(patch.region)) delete patch.region;
    if (patch.region) setRegion(patch.region);
    if (patch.view) setView(patch.view);
    if (patch.filters) {
      const next = { ...EMPTY_FILTERS, ...patch.filters };
      const regionId = patch.region ?? OFFICE_REGION;
      if (regionId !== OFFICE_REGION) {
        next.near = false;
        if (next.sort === "distance") next.sort = "reviews";
      }
      setFilters(next);
    }
    if (patch.place) {
      setSelectedSlug(patch.place);
      setDetailSlug(patch.place);
    }
    if (patch.map) setMapCenter(patch.map);
    setVisits(getVisitMarks());
    setWishlist(getWishlist());
    setHydrated(true);
    queueMicrotask(() => {
      skipUrlWrite.current = false;
    });
  }, [knownRegions]);

  useEffect(() => {
    if (!isOffice || !catalog.office) {
      setWeatherRainy(false);
      return;
    }
    let cancelled = false;
    fetchWeather(catalog.office).then((w) => {
      if (!cancelled && w) setWeatherRainy(w.isRainy);
    });
    return () => {
      cancelled = true;
    };
  }, [catalog.office, isOffice]);

  useEffect(() => {
    if (filters.sort !== "nearby" || isOffice) return;
    if (viewer) return;
    if (!navigator.geolocation) {
      setGeoError("이 브라우저에서는 위치를 쓸 수 없습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setViewer({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoError(null);
      },
      () => setGeoError("위치 권한이 없어 내 주변 정렬을 쓸 수 없습니다."),
      { enableHighAccuracy: false, timeout: 10_000 },
    );
  }, [filters.sort, isOffice, viewer]);

  const explorerState: ExplorerState = useMemo(
    () => ({
      region,
      view,
      filters,
      place: detailSlug ?? selectedSlug,
      map: view === "map" ? mapCenter : null,
    }),
    [region, view, filters, detailSlug, selectedSlug, mapCenter],
  );

  useEffect(() => {
    if (!hydrated || skipUrlWrite.current) return;
    const qs = serializeExplorerSearch(explorerState);
    const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    const cur = `${window.location.pathname}${window.location.search}`;
    if (next !== cur) window.history.replaceState(null, "", next);
    writeStoredExplorer(explorerState);
  }, [explorerState, hydrated]);

  useEffect(() => {
    const onPop = () => {
      if (detailHistory.current && detailSlug) {
        detailHistory.current = false;
        setDetailSlug(null);
        return;
      }
      const patch = parseExplorerSearch(window.location.search);
      const next = mergeExplorer(
        { region: OFFICE_REGION, view: "list", filters: EMPTY_FILTERS },
        patch,
      );
      if (!knownRegions.has(next.region)) next.region = OFFICE_REGION;
      skipUrlWrite.current = true;
      setRegion(next.region);
      setView(next.view);
      setFilters(next.filters);
      setSelectedSlug(next.place ?? null);
      setDetailSlug(next.place ?? null);
      queueMicrotask(() => {
        skipUrlWrite.current = false;
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [knownRegions, detailSlug]);

  const state = useRegion(region, catalog.restaurants);
  const source = useMemo(() => (state.status === "ready" ? state.restaurants : []), [state]);
  const regionInfo = regions.regions.find((r) => r.id === region);
  const recorded = useMemo(() => recordedSlugSet(visits), [visits]);

  const facets = useMemo(
    () => ({
      categories: presentGroups(source),
      tags: tagOptions(source).map(({ value, label }) => ({ value, label })),
      themes: themeOptions(source),
    }),
    [source],
  );

  const sort =
    !isOffice && deferred.sort === "distance"
      ? "reviews"
      : isOffice && deferred.sort === "nearby"
        ? "distance"
        : deferred.sort;

  const restaurants = useMemo(
    () =>
      filterRestaurants(source, {
        q: deferred.q,
        category: deferred.category,
        tag: deferred.tag,
        theme: deferred.theme,
        district: isOffice ? "all" : deferred.district,
        near: isOffice && deferred.near,
        budget: deferred.budget ?? undefined,
        noBreak: deferred.noBreak,
        openAt: deferred.openNow ? now : null,
        weekday,
        unvisitedOnly: deferred.unvisitedOnly,
        recordedSlugs: recorded,
        viewer: sort === "nearby" ? viewer : null,
        sort,
      }),
    [source, deferred, now, weekday, isOffice, recorded, viewer, sort],
  );

  const listRestaurants = useMemo(() => {
    if (view !== "map" || !mapBounds) return restaurants;
    return restaurants.filter((r) => inBounds(r, mapBounds));
  }, [restaurants, view, mapBounds]);

  const hoursFilterOn = (deferred.openNow && now !== null) || deferred.noBreak;
  const openNowSkipped = useMemo(() => {
    if (!hoursFilterOn) return 0;
    return source.filter((r) => !r.hours).length;
  }, [source, hoursFilterOn]);

  const updatedAt = isOffice ? catalog.updatedAt : regions.updatedAt;
  const stamp = useMemo(() => {
    const when = new Date(updatedAt);
    return Number.isNaN(when.getTime())
      ? updatedAt
      : when.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  }, [updatedAt]);

  const sourceLabel = useMemo(() => {
    if (isOffice) {
      return catalog.source === "sample" ? "샘플 데이터" : "팀 공유 목록";
    }
    return collectionSourceLabel(source);
  }, [isOffice, catalog.source, source]);

  const reset = () => setFilters(EMPTY_FILTERS);
  const changeRegion = (next: string) => {
    setRegion(next);
    setFilters(EMPTY_FILTERS);
    setSelectedSlug(null);
    setDetailSlug(null);
    setPicks([]);
    setMapBounds(null);
  };
  const changeScope = (next: ScopeTab) => {
    if (next === "office") changeRegion(OFFICE_REGION);
    else if (isOffice) changeRegion(defaultProvince);
  };
  const selectPlace = (slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? null : slug));
  };
  const openDetail = (slug: string) => {
    setSelectedSlug(slug);
    setDetailSlug(slug);
    if (!detailHistory.current) {
      window.history.pushState({ detail: slug }, "");
      detailHistory.current = true;
    }
  };
  const closeDetail = () => {
    if (detailHistory.current) {
      detailHistory.current = false;
      window.history.back();
    }
    setDetailSlug(null);
  };

  const copyLink = async () => {
    const url = explorerShareUrl(explorerState);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("이 링크를 복사해 공유하세요", url);
    }
  };

  const rollPool = view === "map" && listRestaurants.length ? listRestaurants : restaurants;
  const rollPicks = () => setPicks(sampleRestaurants(rollPool, 3));

  const copyVote = async () => {
    const text = slackVoteText(picks.length ? picks : sampleRestaurants(rollPool, 3));
    if (!picks.length) setPicks(sampleRestaurants(rollPool, 3));
    try {
      await navigator.clipboard.writeText(text);
      setVoteCopied(true);
      window.setTimeout(() => setVoteCopied(false), 2000);
    } catch {
      window.prompt("투표 문구를 복사하세요", text);
    }
  };

  const markVisit = (slug: string, mark: VisitMark | null) => {
    setVisits(setVisitMark(slug, mark));
  };

  const provinceOptions = regions.regions.map((r) => ({
    value: r.id,
    label: `${r.label} (${r.count.toLocaleString("ko-KR")})`,
  }));
  const districtOptions = regionInfo
    ? [
        { value: "all", label: "전체" },
        ...regionInfo.districts.map((d) => ({ value: d.name, label: `${d.name} (${d.count})` })),
      ]
    : [];

  const detail = useMemo(() => {
    if (!detailSlug) return null;
    return restaurants.find((r) => r.slug === detailSlug) ?? source.find((r) => r.slug === detailSlug) ?? null;
  }, [detailSlug, restaurants, source]);

  useEffect(() => {
    if (selectedSlug && !restaurants.some((r) => r.slug === selectedSlug)) {
      setSelectedSlug(null);
    }
  }, [restaurants, selectedSlug]);

  if (!hydrated) {
    return (
      <main className="mx-auto flex w-full max-w-content flex-col gap-stack-xxxl px-inline-lg py-stack-xxl sm:px-inline-xxl">
        <PageHeader title="점심맛집" description="불러오는 중…" meta={[]} />
      </main>
    );
  }

  const listBlock = (
    <RestaurantList
      restaurants={listRestaurants}
      now={now}
      weekday={weekday}
      onReset={reset}
      nearby={isOffice}
      selectedSlug={selectedSlug}
      onSelect={selectPlace}
      onOpenDetail={openDetail}
      scrollOnSelect={view === "list"}
      showNew={isOffice}
      compact={view === "map"}
      className={view === "map" ? "lg:max-h-[calc(100dvh-12rem)]" : undefined}
    />
  );

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-stack-xxxl px-inline-lg py-stack-xxl sm:px-inline-xxl">
      <PageHeader
        title="점심맛집"
        description={
          isOffice
            ? "회사 근처 점심 맛집을 종류·거리·영업시간·가격으로 골라 보세요."
            : "지역별 저장 맛집 지도에서 목록·거리·평판으로 골라 보세요."
        }
        meta={[
          {
            label: "표시",
            value: `${listRestaurants.length.toLocaleString("ko-KR")} / ${source.length.toLocaleString("ko-KR")}곳`,
          },
          { label: "출처", value: sourceLabel },
          { label: "갱신", value: stamp },
        ]}
      />

      {weatherRainy && isOffice ? (
        <p className="rounded-sm bg-surface-subtle px-inline-lg py-stack-sm text-text-secondary typography-body-sm-regular">
          오늘 비 소식이 있어요. 필터에서 「비 오는 날 추천」을 눌러 보세요.
        </p>
      ) : null}

      <div className="flex flex-col gap-stack-md">
        <RestaurantFilters
          value={filters}
          scope={scope}
          onScopeChange={changeScope}
          region={region}
          provinces={provinceOptions}
          districts={districtOptions}
          onRegionChange={changeRegion}
          nearby={isOffice}
          categories={facets.categories}
          tags={facets.tags}
          themes={facets.themes}
          clockReady={clock !== null}
          weatherRainy={weatherRainy && isOffice}
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
              <Button size="md" onClick={rollPicks} disabled={rollPool.length === 0}>
                <Dices aria-hidden className="size-size-icon-sm" />
                오늘 뭐 먹지
              </Button>
              <Button
                size="md"
                onClick={() => {
                  if (!selectedSlug) return;
                  setWishlist(toggleWishlist(selectedSlug));
                }}
                disabled={!selectedSlug}
                aria-label="내 리스트에 담기"
              >
                <Heart aria-hidden className="size-size-icon-sm" />
                {selectedSlug && wishlist.includes(selectedSlug) ? "담김" : "담기"}
                {wishlist.length ? ` (${wishlist.length})` : ""}
              </Button>
              <Button size="md" onClick={copyLink} aria-label="필터 링크 복사">
                {copied ? (
                  <Check aria-hidden className="size-size-icon-sm" />
                ) : (
                  <Link2 aria-hidden className="size-size-icon-sm" />
                )}
                {copied ? "복사됨" : "링크"}
              </Button>
              <Button size="md" onClick={reset}>
                <RotateCcw aria-hidden className="size-size-icon-sm" />
                초기화
              </Button>
            </>
          }
        />

        {geoError && filters.sort === "nearby" ? (
          <p className="text-text-secondary typography-body-sm-regular">{geoError}</p>
        ) : null}

        {picks.length ? (
          <div className="flex flex-col gap-stack-sm rounded-sm border border-border-default bg-surface-default px-inline-lg py-stack-md">
            <div className="flex flex-wrap items-center justify-between gap-group-sm">
              <h2 className="text-text-primary typography-headline-sm">
                오늘 뭐 먹지
                {view === "map" ? " · 지도에 보이는 곳" : ""}
              </h2>
              <div className="flex gap-group-sm">
                <Button size="md" onClick={rollPicks}>
                  다시 뽑기
                </Button>
                <Button size="md" variant="primary" onClick={copyVote}>
                  {voteCopied ? "투표 문구 복사됨" : "Slack 투표 문구 복사"}
                </Button>
              </div>
            </div>
            <ol className="flex flex-col gap-group-xs text-text-secondary typography-body-md-regular">
              {picks.map((r, i) => (
                <li key={r.slug}>
                  <button
                    type="button"
                    className="text-left hover:text-text-primary"
                    onClick={() => {
                      selectPlace(r.slug);
                      openDetail(r.slug);
                    }}
                  >
                    {i + 1}. {r.name}
                    {r.category ? ` · ${r.category}` : ""}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {hoursFilterOn && openNowSkipped > 0 ? (
          <p className="text-text-secondary typography-body-sm-regular">
            영업시간이 없어 {openNowSkipped.toLocaleString("ko-KR")}곳은 목록에서 뺐습니다.
          </p>
        ) : null}

        {state.status === "loading" ? (
          <p className="py-stack-xl text-center text-text-tertiary typography-body-md-regular">
            {regionInfo?.label ?? ""} 맛집을 불러오는 중…
          </p>
        ) : state.status === "error" ? (
          <EmptyState type="error" title="지역 데이터를 불러오지 못했습니다." description={state.message} />
        ) : view === "map" ? (
          <>
            {/* Desktop split: list | map */}
            <div className="hidden gap-group-lg lg:grid lg:grid-cols-[minmax(280px,380px)_minmax(0,1fr)]">
              <div className="min-h-0">{listBlock}</div>
              <div className="sticky top-4 self-start">
                <RestaurantMap
                  restaurants={restaurants}
                  office={isOffice ? catalog.office : undefined}
                  now={now}
                  weekday={weekday}
                  selectedSlug={selectedSlug}
                  onSelect={selectPlace}
                  onOpenDetail={openDetail}
                  pinMode={isOffice ? "hours" : "category"}
                  heightClass="h-[calc(100dvh-8rem)]"
                  onBoundsChange={(b, z) => {
                    setMapBounds(b);
                    setMapCenter({
                      lat: (b.south + b.north) / 2,
                      lng: (b.west + b.east) / 2,
                      z,
                    });
                  }}
                />
              </div>
            </div>
            {/* Mobile: full map + bottom sheet list */}
            <div className="relative lg:hidden">
              <RestaurantMap
                restaurants={restaurants}
                office={isOffice ? catalog.office : undefined}
                now={now}
                weekday={weekday}
                selectedSlug={selectedSlug}
                onSelect={selectPlace}
                onOpenDetail={openDetail}
                pinMode={isOffice ? "hours" : "category"}
                heightClass="h-[70dvh]"
                onBoundsChange={(b, z) => {
                  setMapBounds(b);
                  setMapCenter({
                    lat: (b.south + b.north) / 2,
                    lng: (b.west + b.east) / 2,
                    z,
                  });
                }}
              />
              <div className="mt-stack-sm">
                <button
                  type="button"
                  className="mb-stack-sm w-full rounded-sm border border-border-default bg-surface-default px-inline-lg py-stack-sm text-text-secondary typography-body-sm-medium"
                  onClick={() => setSheetOpen((v) => !v)}
                >
                  {sheetOpen
                    ? `목록 접기 · 이 지역 ${listRestaurants.length.toLocaleString("ko-KR")}곳`
                    : `목록 펼치기 · 이 지역 ${listRestaurants.length.toLocaleString("ko-KR")}곳`}
                </button>
                {sheetOpen ? listBlock : null}
              </div>
            </div>
          </>
        ) : (
          listBlock
        )}

        {deferred !== filters ? (
          <p className="text-center text-text-tertiary typography-caption">필터 적용 중…</p>
        ) : null}
      </div>

      {detail ? (
        <RestaurantDetail
          restaurant={detail}
          now={now}
          weekday={weekday}
          nearby={isOffice}
          visitMark={visits[detail.slug] ?? null}
          onVisitMark={(mark) => markVisit(detail.slug, mark)}
          onClose={closeDetail}
        />
      ) : null}
    </main>
  );
}
