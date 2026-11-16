"use client";

import { Star } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Badge, Button, EmptyState, LinkButton, Tag } from "@/components/ds";
import {
  displayTags,
  mapLinks,
  openStatus,
  walkMinutes,
  type OpeningHours,
  type OpenKind,
  type Restaurant,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Props = {
  restaurants: Restaurant[];
  /** Minutes since midnight in Seoul; null until the client clock is known. */
  now?: number | null;
  loading?: boolean;
  error?: string | null;
  onReset?: () => void;
  /** False outside the office area: the 도보 column shows the 시·군·구 instead. */
  nearby?: boolean;
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
};

const PAGE_SIZE = 100;

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function hoursText(h: OpeningHours): string {
  return h.open === "00:00" && h.close === "24:00" ? "24시간" : `${h.open}–${h.close}`;
}

const COLUMNS = "lg:grid-cols-[minmax(0,1fr)_80px_184px_120px_160px_168px]";
const HEADS: { label: string; align?: "right" }[] = [
  { label: "가게" },
  { label: "도보" },
  { label: "영업시간" },
  { label: "가격" },
  { label: "평판" },
  { label: "지도", align: "right" },
];

function badgeFor(kind: OpenKind): "success" | "warning" | "disabled" | "default" {
  if (kind === "open") return "success";
  if (kind === "closingSoon" || kind === "break") return "warning";
  if (kind === "closed") return "disabled";
  return "default";
}

/** Table cell; below lg it stacks with its column label. */
function Cell({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-group-xxs lg:px-inline-md lg:py-stack-md", className)}>
      <span className="text-text-tertiary typography-body-sm-regular lg:hidden">{label}</span>
      {children}
    </div>
  );
}

const muted = <span className="text-text-disabled typography-body-md-regular">–</span>;

/** Combined Kakao score + Naver reviews for the 평판 column. */
export function ReputationCell({ r }: { r: Restaurant }) {
  const kakao = r.rating?.source === "kakao" ? r.rating : null;
  if (!kakao && !r.naverReviews) return muted;
  return (
    <span className="flex flex-col gap-group-xxs">
      {kakao ? (
        <a
          href={kakao.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-group-xxs rounded-xxs hover:bg-action-tertiary-subtle"
          aria-label={`카카오 평점 ${kakao.score.toFixed(1)}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Star aria-hidden className="size-size-icon-sm fill-icon-warning-default text-icon-warning-default" />
          <span className="text-text-primary typography-body-md-medium">{kakao.score.toFixed(1)}</span>
          <span className="text-text-tertiary typography-body-sm-regular">
            ({kakao.count.toLocaleString("ko-KR")})
          </span>
        </a>
      ) : null}
      {r.naverReviews ? (
        <a
          href={r.naver?.url}
          target="_blank"
          rel="noreferrer"
          className="w-fit rounded-xxs text-text-secondary typography-body-sm-regular hover:bg-action-tertiary-subtle"
          aria-label={`네이버 리뷰 ${r.naverReviews}개`}
          onClick={(e) => e.stopPropagation()}
        >
          네이버 {r.naverReviews.toLocaleString("ko-KR")}
          {r.naverScore ? ` · ★${r.naverScore.toFixed(2)}` : ""}
        </a>
      ) : null}
    </span>
  );
}

function ReputationLine({ r }: { r: Restaurant }) {
  const parts: string[] = [];
  if (r.rating?.source === "kakao") parts.push(`카카오 ★${r.rating.score.toFixed(1)}`);
  if (r.naverReviews) {
    parts.push(
      r.naverScore
        ? `네이버 ${r.naverReviews.toLocaleString("ko-KR")} · ★${r.naverScore.toFixed(2)}`
        : `네이버 ${r.naverReviews.toLocaleString("ko-KR")}`,
    );
  }
  if (!parts.length) return null;
  return <span className="text-text-tertiary typography-body-sm-regular">{parts.join(" · ")}</span>;
}

export function MapButtons({ r }: { r: Restaurant }) {
  const links = mapLinks(r);
  return (
    <span className="flex gap-group-sm" onClick={(e) => e.stopPropagation()}>
      <LinkButton href={links.naver} aria-label={`${r.name} 네이버지도`}>
        네이버
      </LinkButton>
      <LinkButton href={links.kakao} aria-label={`${r.name} 카카오맵`}>
        카카오
      </LinkButton>
    </span>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-sm bg-surface-default">{children}</div>;
}

function MobileCard({
  r,
  now,
  nearby,
  selected,
  onSelect,
}: {
  r: Restaurant;
  now: number | null;
  nearby: boolean;
  selected: boolean;
  onSelect?: (slug: string) => void;
}) {
  const status = openStatus(r.hours, now);
  const place =
    nearby && r.walkMeters !== undefined
      ? `도보 ${walkMinutes(r.walkMeters)}분`
      : r.area || r.district || null;
  const dish = r.menu?.[0]
    ? r.menu[0].price !== undefined
      ? `${r.menu[0].name} ${won(r.menu[0].price)}`
      : r.menu[0].name
    : r.priceRange || null;

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect?.(r.slug)}
        className={cn(
          "flex w-full items-start justify-between gap-group-sm border-b border-border-default px-inline-lg py-stack-md text-left transition-colors last:border-b-0",
          selected ? "bg-surface-brand-subtle" : "hover:bg-surface-subtlest",
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-group-sm gap-y-group-xxs">
            <h2 className="truncate text-text-primary typography-headline-sm">{r.name}</h2>
            {r.category ? <Tag color="brand" size="xsmall">{r.category}</Tag> : null}
            <Badge status={badgeFor(status.kind)}>{status.label}</Badge>
            {status.lunchOk ? <Tag color="green" size="xsmall">점심</Tag> : null}
          </div>
          <p className="mt-group-xxs truncate text-text-secondary typography-body-sm-regular">
            {[place, dish].filter(Boolean).join(" · ") || "–"}
          </p>
          <div className="mt-group-xxs">
            <ReputationLine r={r} />
          </div>
        </div>
        <MapButtons r={r} />
      </button>
    </li>
  );
}

export function RestaurantList({
  restaurants,
  now = null,
  loading,
  error,
  onReset,
  nearby = true,
  selectedSlug,
  onSelect,
}: Props) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  useEffect(() => setLimit(PAGE_SIZE), [restaurants]);
  useEffect(() => {
    if (!selectedSlug) return;
    const el = document.getElementById(`place-${selectedSlug}`);
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedSlug]);
  const heads = nearby ? HEADS : HEADS.map((h) => (h.label === "도보" ? { ...h, label: "지역" } : h));
  const visible = restaurants.slice(0, limit);

  if (loading) {
    return (
      <Shell>
        <p className="px-inline-xxl py-stack-xxxxl text-center text-text-tertiary typography-body-md-regular">
          맛집 목록을 불러오는 중…
        </p>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell>
        <EmptyState type="error" title="목록을 불러오지 못했습니다." description={error} />
      </Shell>
    );
  }

  if (restaurants.length === 0) {
    return (
      <Shell>
        <EmptyState
          type="noResult"
          title="조건에 맞는 맛집이 없습니다."
          description="검색어 또는 필터를 조정해 주세요."
          action={onReset ? <Button onClick={onReset}>필터 초기화</Button> : undefined}
        />
      </Shell>
    );
  }

  return (
    <Shell>
      <ul className="lg:hidden">
        {visible.map((r) => (
          <MobileCard
            key={r.slug}
            r={r}
            now={now}
            nearby={nearby}
            selected={selectedSlug === r.slug}
            onSelect={onSelect}
          />
        ))}
      </ul>

      <div aria-hidden className={cn("hidden bg-surface-subtle lg:grid", COLUMNS)}>
        {heads.map((h) => (
          <div
            key={h.label}
            className={cn(
              "flex h-size-control-lg items-center px-inline-md text-text-secondary typography-label-md-medium",
              h.align === "right" && "justify-end",
            )}
          >
            {h.label}
          </div>
        ))}
      </div>
      <ul className="hidden lg:block">
        {visible.map((r) => {
          const status = openStatus(r.hours, now);
          const selected = selectedSlug === r.slug;
          return (
            <li
              key={r.slug}
              id={`place-${r.slug}`}
              className={cn(
                "grid cursor-pointer grid-cols-2 gap-x-group-lg gap-y-group-md border-b border-border-default px-inline-lg py-stack-lg transition-colors last:border-b-0 lg:items-center lg:gap-0 lg:p-0",
                COLUMNS,
                selected ? "bg-surface-brand-subtle" : "hover:bg-surface-subtlest",
              )}
              onClick={() => onSelect?.(r.slug)}
            >
              <div className="col-span-2 flex min-w-0 flex-col gap-group-xs lg:col-span-1 lg:px-inline-md lg:py-stack-md">
                <div className="flex flex-wrap items-center gap-x-group-sm gap-y-group-xxs">
                  <h2 className="text-text-primary typography-headline-sm">{r.name}</h2>
                  {r.category ? <Tag color="brand" size="xsmall">{r.category}</Tag> : null}
                  {r.subcategory ? (
                    <span className="text-text-tertiary typography-body-sm-regular">{r.subcategory}</span>
                  ) : null}
                  {status.lunchOk ? <Tag color="green" size="xsmall">점심</Tag> : null}
                </div>
                {r.menu?.length ? (
                  <ul className="flex flex-wrap gap-x-group-md gap-y-group-xxs text-text-secondary typography-body-sm-regular">
                    {r.menu.slice(0, 2).map((m) => (
                      <li key={m.name}>
                        {m.name}
                        {m.price !== undefined ? (
                          <span className="text-text-tertiary"> {won(m.price)}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : r.notes ? (
                  <p className="line-clamp-1 text-text-secondary typography-body-sm-regular">{r.notes}</p>
                ) : null}
                {(() => {
                  const tags = displayTags(r);
                  if (!tags.length && !r.collections?.length) return null;
                  return (
                    <div className="flex flex-wrap gap-group-xs pt-stack-xxs">
                      {r.collections?.map((c) => (
                        <Tag key={c} color="purple" size="xsmall">
                          {c}
                        </Tag>
                      ))}
                      {tags.slice(0, 4).map((tag) => (
                        <Tag key={tag} color="gray" size="xsmall">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <Cell label={nearby ? "도보" : "지역"}>
                {nearby && r.walkMeters !== undefined ? (
                  <>
                    <span className="text-text-primary typography-body-md-medium">
                      {walkMinutes(r.walkMeters)}분
                    </span>
                    <span className="text-text-tertiary typography-body-sm-regular">{r.walkMeters}m</span>
                  </>
                ) : r.area ? (
                  <span className="text-text-secondary typography-body-md-regular">{r.area}</span>
                ) : (
                  muted
                )}
              </Cell>

              <Cell label="영업시간">
                {r.hours ? (
                  <>
                    <Badge status={badgeFor(status.kind)}>{status.label}</Badge>
                    <span className="text-text-tertiary typography-body-sm-regular">{hoursText(r.hours)}</span>
                  </>
                ) : (
                  <Badge status="default">시간 미확인</Badge>
                )}
              </Cell>

              <Cell label="가격">
                {r.priceRange ? (
                  <span className="whitespace-nowrap text-text-secondary typography-body-md-regular">
                    {r.priceRange}
                  </span>
                ) : (
                  muted
                )}
              </Cell>

              <Cell label="평판">
                <ReputationCell r={r} />
              </Cell>

              <div className="col-span-2 flex lg:col-span-1 lg:justify-end lg:px-inline-md lg:py-stack-md">
                <MapButtons r={r} />
              </div>
            </li>
          );
        })}
      </ul>
      {restaurants.length > limit ? (
        <div className="flex justify-center border-t border-border-default px-inline-lg py-stack-lg">
          <Button onClick={() => setLimit((n) => n + PAGE_SIZE)}>
            더 보기 ({limit.toLocaleString("ko-KR")} / {restaurants.length.toLocaleString("ko-KR")})
          </Button>
        </div>
      ) : null}
    </Shell>
  );
}
