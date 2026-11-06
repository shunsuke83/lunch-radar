"use client";

import { Badge } from "@/components/ui/badge";
import {
  isOpenAt,
  walkMinutes,
  type OpeningHours,
  type Restaurant,
} from "@/lib/catalog";

type Props = {
  restaurants: Restaurant[];
  /** Minutes since midnight in Seoul; null until the client clock is known. */
  now?: number | null;
  loading?: boolean;
  error?: string | null;
};

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function hoursText(h: OpeningHours): string {
  const base = h.open === "00:00" && h.close === "24:00" ? "24시간" : `${h.open}–${h.close}`;
  return h.breakStart && h.breakEnd ? `${base} (브레이크 ${h.breakStart}–${h.breakEnd})` : base;
}

export function RestaurantList({ restaurants, now = null, loading, error }: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/50 p-10 text-center text-muted-foreground">
        맛집 목록을 불러오는 중…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-10 text-center text-destructive">
        {error}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/50 p-10 text-center text-muted-foreground">
        조건에 맞는 맛집이 없습니다. 조건을 줄이거나 Slack에서 새로 수집해 보세요.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/80 bg-white/75 shadow-lift backdrop-blur-md">
      {restaurants.map((r, index) => {
        const open = now !== null && r.hours ? isOpenAt(r.hours, now) : null;
        return (
          <li
            key={r.slug}
            className="restaurant-row grid gap-2 px-4 py-4 transition-colors hover:bg-accent/40 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] sm:items-start sm:gap-4 sm:px-5"
            style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
          >
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {r.name}
                </h2>
                {r.category ? (
                  <span className="text-sm font-medium text-primary">{r.category}</span>
                ) : null}
                {r.subcategory ? (
                  <span className="text-sm text-muted-foreground">{r.subcategory}</span>
                ) : null}
              </div>
              {r.menu?.length ? (
                <ul className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-foreground/80">
                  {r.menu.map((m) => (
                    <li key={m.name}>
                      {m.name}
                      {m.price !== undefined ? (
                        <span className="text-muted-foreground"> {won(m.price)}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : r.notes ? (
                <p className="text-sm leading-relaxed text-foreground/80">{r.notes}</p>
              ) : null}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {r.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              {r.walkMeters !== undefined ? (
                <p>
                  도보 {walkMinutes(r.walkMeters)}분 · {r.walkMeters}m
                </p>
              ) : r.area ? (
                <p>지역 · {r.area}</p>
              ) : null}
              {r.hours ? (
                <p className="flex flex-wrap items-center gap-1.5">
                  {hoursText(r.hours)}
                  {open !== null ? (
                    <Badge variant={open ? "default" : "outline"} className="font-normal">
                      {open ? "영업 중" : "영업 전/종료"}
                    </Badge>
                  ) : null}
                </p>
              ) : null}
              {r.priceRange ? <p>가격 · {r.priceRange}</p> : null}
            </div>

            <div className="text-right text-sm">
              <p className="font-medium text-primary">멘션 {r.mentionCount}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
