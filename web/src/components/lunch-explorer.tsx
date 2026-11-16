"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  RestaurantFilters,
  type FilterState,
  type ScopeTab,
} from "@/components/restaurant-filters";
import { RestaurantDetail } from "@/components/restaurant-detail";
import { RestaurantList } from "@/components/restaurant-list";
import { RestaurantMap } from "@/components/restaurant-map";
import { Check, Dices, Link2, RotateCcw } from "lucide-react";
import { Button, EmptyState, PageHeader, SegmentedControl } from "@/components/ds";
import {
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

function mergeExplorer(base: ExplorerState, patch: Partial<ExplorerState>): ExplorerState {
  return {
    region: patch.region ?? base.region,
    view: patch.view ?? base.view,
    filters: patch.filters ? { ...EMPTY_FILTERS, ...patch.filters } : base.filters,
  };
}

export function LunchExplorer({ catalog, regions }: Props) {
  const [region, setRegion] = useState<string>(OFFICE_REGION);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [voteCopied, setVoteCopied] = useState(false);
  const [picks, setPicks] = useState<Restaurant[]>([]);
  const [visits, setVisits] = useState<Record<string, VisitMark>>({});
  const [viewer, setViewer] = useState<GeoPoint | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [weatherRainy, setWeatherRainy] = useState(false);
  const skipUrlWrite = useRef(true);
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
    setVisits(getVisitMarks());
    setHydrated(true);
    queueMicrotask(() => {
      skipUrlWrite.current = false;
    });
  }, [knownRegions]);

  useEffect(() => {
    if (!catalog.office) return;
    let cancelled = false;
    fetchWeather(catalog.office).then((w) => {
      if (!cancelled && w) setWeatherRainy(w.isRainy);
    });
    return () => {
      cancelled = true;
    };
  }, [catalog.office]);

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
    () => ({ region, view, filters }),
    [region, view, filters],
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
      queueMicrotask(() => {
        skipUrlWrite.current = false;
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [knownRegions]);

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

  const reset = () => setFilters(EMPTY_FILTERS);
  const changeRegion = (next: string) => {
    setRegion(next);
    setFilters(EMPTY_FILTERS);
    setSelectedSlug(null);
    setPicks([]);
  };
  const changeScope = (next: ScopeTab) => {
    if (next === "office") changeRegion(OFFICE_REGION);
    else if (isOffice) changeRegion(defaultProvince);
  };
  const selectPlace = (slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? null : slug));
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

  const rollPicks = () => setPicks(sampleRestaurants(restaurants, 3));

  const copyVote = async () => {
    const text = slackVoteText(picks.length ? picks : sampleRestaurants(restaurants, 3));
    if (!picks.length) setPicks(sampleRestaurants(restaurants, 3));
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

  const selected = useMemo(
    () => (selectedSlug ? restaurants.find((r) => r.slug === selectedSlug) ?? null : null),
    [restaurants, selectedSlug],
  );

  useEffect(() => {
    if (selectedSlug && !restaurants.some((r) => r.slug === selectedSlug)) {
      setSelectedSlug(null);
    }
  }, [restaurants, selectedSlug]);

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-stack-xxxl px-inline-lg py-stack-xxl sm:px-inline-xxl">
      <PageHeader
        title="점심맛집"
        description="회사 근처 점심 맛집과 지역별 저장 맛집을 종류·거리·영업시간·가격으로 골라 보세요."
        meta={[
          {
            label: "표시",
            value: `${restaurants.length.toLocaleString("ko-KR")} / ${source.length.toLocaleString("ko-KR")}곳`,
          },
          {
            label: "출처",
            value: isOffice
              ? catalog.source === "sample"
                ? "샘플 데이터"
                : "팀 공유 목록"
              : "네이버지도 저장 목록",
          },
          { label: "갱신", value: stamp },
        ]}
      />

      {weatherRainy ? (
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
          weatherRainy={weatherRainy}
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
              <Button size="md" onClick={rollPicks} disabled={restaurants.length === 0}>
                <Dices aria-hidden className="size-size-icon-sm" />
                오늘 뭐 먹지
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
              <h2 className="text-text-primary typography-headline-sm">오늘 뭐 먹지</h2>
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
                    onClick={() => selectPlace(r.slug)}
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
        ) : (
          <>
            {view === "map" ? (
              <RestaurantMap
                restaurants={restaurants}
                office={isOffice ? catalog.office : undefined}
                now={now}
                weekday={weekday}
                selectedSlug={selectedSlug}
                onSelect={selectPlace}
              />
            ) : null}
            <RestaurantList
              restaurants={restaurants}
              now={now}
              weekday={weekday}
              onReset={reset}
              nearby={isOffice}
              selectedSlug={selectedSlug}
              onSelect={selectPlace}
            />
          </>
        )}

        {deferred !== filters ? (
          <p className="text-center text-text-tertiary typography-caption">필터 적용 중…</p>
        ) : null}
      </div>

      {selected ? (
        <RestaurantDetail
          restaurant={selected}
          now={now}
          weekday={weekday}
          nearby={isOffice}
          visitMark={visits[selected.slug] ?? null}
          onVisitMark={(mark) => markVisit(selected.slug, mark)}
          onClose={() => setSelectedSlug(null)}
        />
      ) : null}
    </main>
  );
}
