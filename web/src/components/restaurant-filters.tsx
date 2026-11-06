"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type FilterState = {
  q: string;
  category: string;
  area: string;
  tag: string;
};

type Props = {
  value: FilterState;
  categories: string[];
  areas: string[];
  tags: string[];
  onChange: (next: FilterState) => void;
  onReset: () => void;
};

const selectClass =
  "h-9 w-full rounded-lg border border-input bg-white/80 px-2.5 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40";

export function RestaurantFilters({
  value,
  categories,
  areas,
  tags,
  onChange,
  onReset,
}: Props) {
  return (
    <section
      aria-label="맛집 필터"
      className="grid gap-3 rounded-2xl border border-border/80 bg-white/70 p-4 shadow-lift backdrop-blur-md md:grid-cols-2 lg:grid-cols-5"
    >
      <div className="space-y-1.5 lg:col-span-2">
        <Label htmlFor="q">검색</Label>
        <Input
          id="q"
          value={value.q}
          placeholder="가게·메뉴·메모 검색"
          className="h-9 bg-white/80"
          onChange={(e) => onChange({ ...value, q: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="category">종류</Label>
        <select
          id="category"
          className={selectClass}
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
        >
          <option value="all">전체</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="area">지역</Label>
        <select
          id="area"
          className={selectClass}
          value={value.area}
          onChange={(e) => onChange({ ...value, area: e.target.value })}
        >
          <option value="all">전체</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tag">태그</Label>
        <div className="flex gap-2">
          <select
            id="tag"
            className={selectClass}
            value={value.tag}
            onChange={(e) => onChange({ ...value, tag: e.target.value })}
          >
            <option value="all">전체</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <Button type="button" variant="outline" className="shrink-0" onClick={onReset}>
            초기화
          </Button>
        </div>
      </div>
    </section>
  );
}
