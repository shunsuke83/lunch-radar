"use client";

import { Star } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Badge, Button, EmptyState, LinkButton, Tag } from "@/components/ds";
import {
  isOpenAt,
  mapLinks,
  walkMinutes,
  type OpeningHours,
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
};

const PAGE_SIZE = 100;

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function hoursText(h: OpeningHours): string {
  return h.open === "00:00" && h.close === "24:00" ? "24시간" : `${h.open}–${h.close}`;
}

const COLUMNS = "lg:grid-cols-[minmax(0,1fr)_80px_184px_128px_112px_64px_168px]";
const HEADS: { label: string; align?: "right" }[] = [
  { label: "가게" },
  { label: "도보" },
  { label: "영업시간" },
  { label: "가격" },
  { label: "평점" },
  { label: "멘션", align: "right" },
  { label: "지도", align: "right" },
];

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

export function RatingText({ r }: { r: Restaurant }) {
  if (!r.rating && r.naverReviews) {
    return (
      <span className="text-text-secondary typography-body-sm-regular">
        네이버 리뷰 {r.naverReviews.toLocaleString("ko-KR")}
      </span>
    );
  }
  if (!r.rating) return muted;
  const text = (
    <span className="inline-flex items-center gap-group-xxs">
      <Star aria-hidden className="size-size-icon-sm fill-icon-warning-default text-icon-warning-default" />
      <span className="text-text-primary typography-body-md-medium">{r.rating.score.toFixed(1)}</span>
      <span className="text-text-tertiary typography-body-sm-regular">
        ({r.rating.count.toLocaleString("ko-KR")})
      </span>
    </span>
  );
  return r.rating.url ? (
    <a
      href={r.rating.url}
      target="_blank"
      rel="noreferrer"
      className="w-fit rounded-xxs hover:bg-action-tertiary-subtle"
      aria-label={`Google 평점 ${r.rating.score.toFixed(1)}, 리뷰 ${r.rating.count}개`}
    >
      {text}
    </a>
  ) : (
    text
  );
}

export function MapButtons({ r }: { r: Restaurant }) {
  const links = mapLinks(r);
  return (
    <span className="flex gap-group-sm">
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

export function RestaurantList({ restaurants, now = null, loading, error, onReset, nearby = true }: Props) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  useEffect(() => setLimit(PAGE_SIZE), [restaurants]);
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
      <div
        aria-hidden
        className={cn("hidden bg-surface-subtle lg:grid", COLUMNS)}
      >
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
      <ul>
        {visible.map((r) => {
          const open = now !== null && r.hours ? isOpenAt(r.hours, now) : null;
          return (
            <li
              key={r.slug}
              className={cn(
                "grid grid-cols-2 gap-x-group-lg gap-y-group-md border-b border-border-default px-inline-lg py-stack-lg transition-colors last:border-b-0 hover:bg-surface-subtlest lg:items-center lg:gap-0 lg:p-0",
                COLUMNS,
              )}
            >
              <div className="col-span-2 flex min-w-0 flex-col gap-group-xs lg:col-span-1 lg:px-inline-md lg:py-stack-md">
                <div className="flex flex-wrap items-center gap-x-group-sm gap-y-group-xxs">
                  <h2 className="text-text-primary typography-headline-sm">{r.name}</h2>
                  {r.category ? <Tag color="brand" size="xsmall">{r.category}</Tag> : null}
                  {r.subcategory ? (
                    <span className="text-text-tertiary typography-body-sm-regular">{r.subcategory}</span>
                  ) : null}
                </div>
                {r.menu?.length ? (
                  <ul className="flex flex-wrap gap-x-group-md gap-y-group-xxs text-text-secondary typography-body-sm-regular">
                    {r.menu.map((m) => (
                      <li key={m.name}>
                        {m.name}
                        {m.price !== undefined ? (
                          <span className="text-text-tertiary"> {won(m.price)}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : r.notes ? (
                  <p className="text-text-secondary typography-body-sm-regular">{r.notes}</p>
                ) : null}
                {r.tags.length || r.collections?.length ? (
                  <div className="flex flex-wrap gap-group-xs pt-stack-xxs">
                    {r.collections?.map((c) => (
                      <Tag key={c} color="purple" size="xsmall">
                        {c}
                      </Tag>
                    ))}
                    {r.tags.map((tag) => (
                      <Tag key={tag} color="gray" size="xsmall">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                ) : null}
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
                    {open !== null ? (
                      <Badge status={open ? "success" : "disabled"}>{open ? "영업 중" : "영업 전·종료"}</Badge>
                    ) : null}
                    <span className="text-text-tertiary typography-body-sm-regular">{hoursText(r.hours)}</span>
                    {r.hours.breakStart && r.hours.breakEnd ? (
                      <span className="text-text-tertiary typography-body-sm-regular">
                        브레이크 {r.hours.breakStart}–{r.hours.breakEnd}
                      </span>
                    ) : null}
                  </>
                ) : (
                  muted
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

              <Cell label={nearby ? "평점 (Google)" : "평점·리뷰"}>
                <RatingText r={r} />
              </Cell>

              <Cell label="멘션" className="lg:items-end">
                {r.mentionCount > 0 ? (
                  <span className="text-text-primary typography-body-md-medium">{r.mentionCount}</span>
                ) : (
                  muted
                )}
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
