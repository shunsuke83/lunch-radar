"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NEAR_MINUTES, type SortKey } from "@/lib/catalog";

export type FilterState = {
  q: string;
  category: string;
  tag: string;
  near: boolean;
  openNow: boolean;
  budget: boolean;
  sort: SortKey;
};

type Props = {
  value: FilterState;
  categories: string[];
  tags: string[];
  /** False until the client clock is known (static HTML has no "now"). */
  clockReady: boolean;
  onChange: (next: FilterState) => void;
  onReset: () => void;
};

const selectClass =
  "h-9 w-full rounded-lg border border-input bg-white/80 px-2.5 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "추천순 (멘션)" },
  { value: "distance", label: "가까운 순" },
  { value: "price", label: "저렴한 순" },
  { value: "rating", label: "평점 높은 순" },
];

function Chip({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "outline"}
      aria-pressed={active}
      disabled={disabled}
      className="rounded-full px-3"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function RestaurantFilters({
  value,
  categories,
  tags,
  clockReady,
  onChange,
  onReset,
}: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  return (
    <section
      aria-label="맛집 필터"
      className="space-y-4 rounded-2xl border border-border/80 bg-white/70 p-4 shadow-lift backdrop-blur-md"
    >
      <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="q">검색</Label>
          <Input
            id="q"
            value={value.q}
            placeholder="가게·메뉴·메모 검색"
            className="h-9 bg-white/80"
            onChange={(e) => set({ q: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="sort">정렬</Label>
          <select
            id="sort"
            className={selectClass}
            value={value.sort}
            onChange={(e) => set({ sort: e.target.value as SortKey })}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tag">태그</Label>
          <select
            id="tag"
            className={selectClass}
            value={value.tag}
            onChange={(e) => set({ tag: e.target.value })}
          >
            <option value="all">전체</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <Button type="button" variant="outline" className="h-9" onClick={onReset}>
          초기화
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="종류">
        <Chip active={value.category === "all"} onClick={() => set({ category: "all" })}>
          전체
        </Chip>
        {categories.map((c) => (
          <Chip key={c} active={value.category === c} onClick={() => set({ category: c })}>
            {c}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="빠른 조건">
        <Chip active={value.near} onClick={() => set({ near: !value.near })}>
          도보 {NEAR_MINUTES}분 이내
        </Chip>
        <Chip
          active={value.openNow}
          disabled={!clockReady}
          onClick={() => set({ openNow: !value.openNow })}
        >
          지금 영업 중
        </Chip>
        <Chip active={value.budget} onClick={() => set({ budget: !value.budget })}>
          만원 이하
        </Chip>
      </div>
    </section>
  );
}
