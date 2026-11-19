"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Button, Chip, FilterSelect, SearchField, SegmentedControl } from "@/components/ds";
import {
  BUDGET_OPTIONS,
  NEAR_MINUTES,
  type SortKey,
  type ThemeGroup,
  type ThemeOption,
} from "@/lib/catalog";
import { EMPTY_FILTERS } from "@/lib/filter-url";
import { cn } from "@/lib/utils";

export type FilterState = {
  q: string;
  category: string;
  tag: string;
  theme: string;
  district: string;
  near: boolean;
  openNow: boolean;
  /** Max menu price in won, or null when off. */
  budget: number | null;
  noBreak: boolean;
  unvisitedOnly: boolean;
  sort: SortKey;
};

type Option = { value: string; label: string };

export type ScopeTab = "office" | "nationwide";

type Props = {
  value: FilterState;
  scope: ScopeTab;
  onScopeChange: (scope: ScopeTab) => void;
  region: string;
  provinces: Option[];
  districts: Option[];
  onRegionChange: (region: string) => void;
  nearby: boolean;
  categories: string[];
  tags: Option[];
  themes: ThemeOption[];
  clockReady: boolean;
  weatherRainy?: boolean;
  onChange: (next: FilterState) => void;
  actions?: ReactNode;
};

const SORTS: { value: SortKey; label: string }[] = [
  { value: "reviews", label: "리뷰 많은 순" },
  { value: "rating", label: "평점 높은 순" },
  { value: "distance", label: "가까운 순" },
  { value: "nearby", label: "내 주변 가까운 순" },
  { value: "price", label: "저렴한 순" },
  { value: "overlap", label: "여러 목록이 꼽은 순" },
];

const PINNED_TAGS = 8;

const THEME_GROUPS: ThemeGroup[] = ["상황", "메뉴", "모음"];
const THEME_GROUP_LABELS: Record<ThemeGroup, string> = {
  상황: "상황별",
  메뉴: "메뉴별",
  모음: "저장 목록",
};

function activeFilterCount(value: FilterState, nearby: boolean): number {
  let n = 0;
  if (value.category !== "all") n++;
  if (value.tag !== "all") n++;
  if (value.theme !== "all") n++;
  if (value.district !== "all") n++;
  if (nearby && value.near) n++;
  if (value.openNow) n++;
  if (value.budget != null) n++;
  if (value.noBreak) n++;
  if (value.unvisitedOnly) n++;
  if (value.sort !== "reviews") n++;
  return n;
}

function ChipRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-group-xs">
      <p className="text-text-tertiary typography-label-sm-medium">{label}</p>
      <div className="flex flex-wrap items-center gap-group-sm">{children}</div>
    </div>
  );
}

function Collapsible({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-sm border border-border-default open:bg-surface-subtlest" open={defaultOpen ? true : undefined}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-group-sm px-inline-md py-stack-sm text-text-secondary typography-label-md-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden className="size-size-icon-sm transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border-default px-inline-md py-stack-md">{children}</div>
    </details>
  );
}

export function RestaurantFilters({
  value,
  scope,
  onScopeChange,
  region,
  provinces,
  districts,
  onRegionChange,
  nearby,
  categories,
  tags,
  themes,
  clockReady,
  weatherRainy,
  onChange,
  actions,
}: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });
  const [sheetOpen, setSheetOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const sheetTitleId = useId();
  const active = activeFilterCount(value, nearby);
  const sortOptions = nearby
    ? SORTS.filter((s) => s.value !== "nearby")
    : SORTS.filter((s) => s.value !== "distance");

  const pinnedTags = tags.slice(0, PINNED_TAGS);
  const filteredTags = useMemo(() => {
    const q = tagQuery.trim().toLowerCase();
    if (!q) return tags;
    return tags.filter((t) => t.value.toLowerCase().includes(q) || t.label.toLowerCase().includes(q));
  }, [tags, tagQuery]);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  const scopeTabs = (
    <SegmentedControl
      label="범위"
      value={scope}
      options={[
        { value: "office", label: "회사 근처" },
        { value: "nationwide", label: "저장 맛집 지도" },
      ]}
      onChange={onScopeChange}
    />
  );

  const provinceSelect =
    scope === "nationwide" && provinces.length > 0 ? (
      <FilterSelect label="시·도" value={region} options={provinces} onChange={onRegionChange} />
    ) : null;

  const quickChips = (
    <div className="flex flex-wrap items-center gap-group-sm" role="group" aria-label="빠른 조건">
      {nearby ? (
        <Chip selected={value.near} onClick={() => set({ near: !value.near })}>
          도보 {NEAR_MINUTES}분 이내
        </Chip>
      ) : null}
      <Chip
        selected={value.openNow}
        disabled={!clockReady}
        onClick={() => set({ openNow: !value.openNow })}
      >
        지금 영업 중
      </Chip>
      <Chip selected={value.noBreak} onClick={() => set({ noBreak: !value.noBreak })}>
        브레이크 없음
      </Chip>
      {BUDGET_OPTIONS.map((won) => (
        <Chip
          key={won}
          selected={value.budget === won}
          onClick={() => set({ budget: value.budget === won ? null : won })}
        >
          {(won / 10_000).toLocaleString("ko-KR")}만 이하
        </Chip>
      ))}
      <Chip selected={value.unvisitedOnly} onClick={() => set({ unvisitedOnly: !value.unvisitedOnly })}>
        안 가본 곳만
      </Chip>
      {weatherRainy ? (
        <Chip
          selected={value.theme === "비 오는 날"}
          onClick={() => set({ theme: value.theme === "비 오는 날" ? "all" : "비 오는 날" })}
        >
          비 오는 날 추천
        </Chip>
      ) : null}
      <span className="text-text-tertiary typography-caption">점심 11:30–13:30 · 곧 마감 30분</span>
    </div>
  );

  const themeGroups = THEME_GROUPS.map((group) => ({
    group,
    items: themes.filter((t) => t.group === group),
  })).filter((g) => g.items.length > 0);

  const collectionThemes = themes.filter((t) => t.group === "모음");
  const chipThemeGroups = themeGroups.filter((g) => g.group !== "모음");
  const themeBody =
    chipThemeGroups.length || collectionThemes.length ? (
      <div className="flex flex-col gap-stack-sm">
        {chipThemeGroups.map(({ group, items }, i) => (
          <ChipRow key={group} label={THEME_GROUP_LABELS[group]}>
            {i === 0 ? (
              <Chip selected={value.theme === "all"} onClick={() => set({ theme: "all" })}>
                전체
              </Chip>
            ) : null}
            {items.map((t) => (
              <Chip key={t.value} selected={value.theme === t.value} onClick={() => set({ theme: t.value })}>
                {t.label}
              </Chip>
            ))}
          </ChipRow>
        ))}
        {collectionThemes.length ? (
          <FilterSelect
            label="저장 목록"
            value={collectionThemes.some((t) => t.value === value.theme) ? value.theme : "all"}
            options={[
              { value: "all", label: "전체 목록" },
              ...collectionThemes.map((t) => ({ value: t.value, label: t.label })),
            ]}
            onChange={(theme) => set({ theme })}
          />
        ) : null}
      </div>
    ) : null;

  const tagBody = tags.length ? (
    <ChipRow label="태그">
      <Chip selected={value.tag === "all"} onClick={() => set({ tag: "all" })}>
        전체
      </Chip>
      {pinnedTags.map((t) => (
        <Chip key={t.value} selected={value.tag === t.value} onClick={() => set({ tag: t.value })}>
          {t.label}
        </Chip>
      ))}
      {value.tag !== "all" && !pinnedTags.some((t) => t.value === value.tag) ? (
        <Chip selected onClick={() => set({ tag: "all" })}>
          {tags.find((t) => t.value === value.tag)?.label ?? value.tag}
        </Chip>
      ) : null}
    </ChipRow>
  ) : null;

  const categoryControl = (
    <SegmentedControl
      label="종류"
      value={value.category}
      options={[
        { value: "all", label: "전체" },
        ...categories.map((c) => ({ value: c, label: c })),
      ]}
      onChange={(category) => set({ category })}
    />
  );

  return (
    <section aria-label="맛집 필터" className="flex flex-col gap-stack-sm">
      <div className="flex flex-wrap items-center gap-group-sm">
        {scopeTabs}
        {provinceSelect}
      </div>

      <div className="flex flex-wrap items-center gap-group-sm md:hidden">
        <SearchField
          aria-label="검색어 입력"
          placeholder="가게·메뉴·메모 검색"
          value={value.q}
          onChange={(e) => set({ q: e.target.value })}
          className="min-w-0 flex-1"
        />
        <Button
          size="md"
          aria-expanded={sheetOpen}
          aria-controls={sheetTitleId}
          onClick={() => setSheetOpen(true)}
        >
          <SlidersHorizontal aria-hidden className="size-size-icon-sm" />
          필터{active > 0 ? ` ${active}` : ""}
        </Button>
        {actions}
      </div>

      <div className="hidden flex-col gap-stack-sm md:flex">
        <div data-slot="list-control" className="flex flex-wrap items-center gap-group-sm">
          <div data-slot="list-control-filters" className="flex flex-wrap items-center gap-group-sm">
            {districts.length ? (
              <FilterSelect
                label="시·군·구"
                value={value.district}
                options={districts}
                onChange={(district) => set({ district })}
              />
            ) : null}
            <SearchField
              aria-label="검색어 입력"
              placeholder="가게·메뉴·메모 검색"
              value={value.q}
              onChange={(e) => set({ q: e.target.value })}
              className="w-full sm:w-[220px]"
            />
            <FilterSelect
              label="정렬"
              value={value.sort}
              options={sortOptions}
              onChange={(sort) => set({ sort })}
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
          {categoryControl}
          {quickChips}
        </div>
        {themeBody ? <Collapsible title="테마">{themeBody}</Collapsible> : null}
        {tagBody ? <Collapsible title="태그">{tagBody}</Collapsible> : null}
      </div>

      {sheetOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="필터 닫기"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSheetOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={sheetTitleId}
            className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-lg bg-surface-default shadow-default-lg"
          >
            <div className="flex items-center justify-between border-b border-border-default px-inline-lg py-stack-md">
              <h2 id={sheetTitleId} className="text-text-primary typography-headline-sm">
                필터{active > 0 ? ` · ${active}개 적용` : ""}
              </h2>
              <Button size="md" className="min-w-size-control-lg px-0" onClick={() => setSheetOpen(false)}>
                <X aria-hidden className="size-size-icon-sm" />
                <span className="sr-only">닫기</span>
              </Button>
            </div>
            <div className="flex flex-col gap-stack-lg overflow-y-auto px-inline-lg py-stack-lg">
              {districts.length ? (
                <FilterSelect
                  label="시·군·구"
                  value={value.district}
                  options={districts}
                  onChange={(district) => set({ district })}
                />
              ) : null}
              <FilterSelect
                label="정렬"
                value={value.sort}
                options={sortOptions}
                onChange={(sort) => set({ sort })}
              />
              {categoryControl}
              {quickChips}
              {themeBody}
              {tags.length ? (
                <div className="flex flex-col gap-group-sm">
                  <ChipRow label="태그">
                    <Chip selected={value.tag === "all"} onClick={() => set({ tag: "all" })}>
                      전체
                    </Chip>
                    {filteredTags.slice(0, tagQuery ? 40 : PINNED_TAGS).map((t) => (
                      <Chip
                        key={t.value}
                        selected={value.tag === t.value}
                        onClick={() => set({ tag: t.value })}
                      >
                        {t.label}
                      </Chip>
                    ))}
                  </ChipRow>
                  <SearchField
                    aria-label="태그 검색"
                    placeholder="태그 검색"
                    value={tagQuery}
                    onChange={(e) => setTagQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
              ) : null}
            </div>
            <div className="flex gap-group-sm border-t border-border-default px-inline-lg py-stack-md">
              <Button
                size="md"
                className="min-h-size-control-lg flex-1"
                onClick={() => {
                  onChange({ ...EMPTY_FILTERS, q: value.q });
                  setTagQuery("");
                }}
              >
                조건 초기화
              </Button>
              <Button
                variant="primary"
                size="md"
                className="min-h-size-control-lg flex-1"
                onClick={() => setSheetOpen(false)}
              >
                적용
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className={cn("flex flex-col gap-stack-sm md:hidden")}>
        {categoryControl}
        {quickChips}
      </div>
    </section>
  );
}
