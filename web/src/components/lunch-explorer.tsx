"use client";

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import {
  RestaurantFilters,
  type FilterState,
} from "@/components/restaurant-filters";
import { RestaurantList } from "@/components/restaurant-list";
import type { Restaurant } from "@/lib/restaurants";

type ApiResponse = {
  updatedAt: string;
  source: string;
  channelId: string;
  total: number;
  count: number;
  restaurants: Restaurant[];
  facets: {
    categories: string[];
    areas: string[];
    tags: string[];
  };
  error?: string;
};

const EMPTY_FILTERS: FilterState = {
  q: "",
  category: "all",
  area: "all",
  tag: "all",
};

export function LunchExplorer() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const deferred = useDeferredValue(filters);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams();
    if (deferred.q.trim()) params.set("q", deferred.q.trim());
    if (deferred.category !== "all") params.set("category", deferred.category);
    if (deferred.area !== "all") params.set("area", deferred.area);
    if (deferred.tag !== "all") params.set("tag", deferred.tag);

    const controller = new AbortController();
    startTransition(async () => {
      try {
        setError(null);
        const res = await fetch(`/api/restaurants?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const json = (await res.json()) as ApiResponse;
        if (!res.ok) {
          throw new Error(json.error || "목록을 불러오지 못했습니다.");
        }
        setData(json);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다.");
      }
    });

    return () => controller.abort();
  }, [deferred]);

  const meta = useMemo(() => {
    if (!data) return null;
    const when = new Date(data.updatedAt);
    const stamp = Number.isNaN(when.getTime())
      ? data.updatedAt
      : when.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    return { stamp, source: data.source, total: data.total, count: data.count };
  }, [data]);

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
        {meta ? (
          <p className="text-sm text-muted-foreground">
            {meta.count}/{meta.total}곳 · 데이터{" "}
            {meta.source === "sample" ? "샘플(Slack 연동 전)" : meta.source} · 갱신{" "}
            {meta.stamp} (Asia/Seoul)
          </p>
        ) : null}
      </header>

      <RestaurantFilters
        value={filters}
        categories={data?.facets.categories ?? []}
        areas={data?.facets.areas ?? []}
        tags={data?.facets.tags ?? []}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      <RestaurantList
        restaurants={data?.restaurants ?? []}
        loading={!data && !error}
        error={error}
      />

      {pending && data ? (
        <p className="text-center text-xs text-muted-foreground">필터 적용 중…</p>
      ) : null}
    </div>
  );
}
