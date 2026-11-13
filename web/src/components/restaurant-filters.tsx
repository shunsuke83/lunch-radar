"use client";

import type { ReactNode } from "react";
import { Chip, FilterSelect, SearchField, SegmentedControl } from "@/components/ds";
import { NEAR_MINUTES, type SortKey } from "@/lib/catalog";

export type FilterState = {
  q: string;
  category: string;
  tag: string;
  theme: string;
  near: boolean;
  openNow: boolean;
  budget: boolean;
  sort: SortKey;
};

type Props = {
  value: FilterState;
  categories: string[];
  tags: string[];
  themes: { value: string; label: string }[];
  /** False until the client clock is known (static HTML has no "now"). */
  clockReady: boolean;
  onChange: (next: FilterState) => void;
  /** Right-aligned ListControl actions. */
  actions?: ReactNode;
};

const SORTS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "추천순 (멘션)" },
  { value: "distance", label: "가까운 순" },
  { value: "price", label: "저렴한 순" },
  { value: "rating", label: "평점 높은 순" },
];

export function RestaurantFilters({
  value,
  categories,
  tags,
  themes,
  clockReady,
  onChange,
  actions,
}: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  return (
    <section aria-label="맛집 필터" className="flex flex-col gap-stack-md">
      <div data-slot="list-control" className="flex flex-wrap items-center gap-group-sm">
        <div data-slot="list-control-filters" className="flex flex-wrap items-center gap-group-sm">
          <SearchField
            aria-label="검색어 입력"
            placeholder="가게·메뉴·메모 검색"
            value={value.q}
            onChange={(e) => set({ q: e.target.value })}
            className="w-full sm:w-[240px]"
          />
          <FilterSelect
            label="정렬"
            value={value.sort}
            options={SORTS}
            onChange={(sort) => set({ sort })}
          />
          <FilterSelect
            label="테마"
            value={value.theme}
            options={[{ value: "all", label: "전체" }, ...themes]}
            onChange={(theme) => set({ theme })}
          />
          <FilterSelect
            label="태그"
            value={value.tag}
            options={[{ value: "all", label: "전체" }, ...tags.map((t) => ({ value: t, label: t }))]}
            onChange={(tag) => set({ tag })}
          />
        </div>
        {actions ? (
          <div
            data-slot="list-control-actions"
            className="ml-auto flex flex-wrap items-center justify-end gap-group-sm"
          >
            {actions}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-group-lg gap-y-group-sm">
        <SegmentedControl
          label="종류"
          value={value.category}
          options={[
            { value: "all", label: "전체" },
            ...categories.map((c) => ({ value: c, label: c })),
          ]}
          onChange={(category) => set({ category })}
        />
        <div className="flex flex-wrap items-center gap-group-sm" role="group" aria-label="빠른 조건">
          <Chip selected={value.near} onClick={() => set({ near: !value.near })}>
            도보 {NEAR_MINUTES}분 이내
          </Chip>
          <Chip
            selected={value.openNow}
            disabled={!clockReady}
            onClick={() => set({ openNow: !value.openNow })}
          >
            지금 영업 중
          </Chip>
          <Chip selected={value.budget} onClick={() => set({ budget: !value.budget })}>
            만원 이하
          </Chip>
        </div>
      </div>
    </section>
  );
}
