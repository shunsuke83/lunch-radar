"use client";

import { Badge } from "@/components/ui/badge";
import type { Restaurant } from "@/lib/catalog";

type Props = {
  restaurants: Restaurant[];
  loading?: boolean;
  error?: string | null;
};

export function RestaurantList({ restaurants, loading, error }: Props) {
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
        조건에 맞는 맛집이 없습니다. 필터를 바꾸거나 Slack에서 새로 수집해 보세요.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/80 bg-white/75 shadow-lift backdrop-blur-md">
      {restaurants.map((r, index) => (
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
                <span className="text-sm text-muted-foreground">{r.category}</span>
              ) : null}
            </div>
            {r.notes ? (
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
            {r.area ? <p>지역 · {r.area}</p> : null}
            {r.priceRange ? <p>가격 · {r.priceRange}</p> : null}
          </div>

          <div className="text-right text-sm">
            <p className="font-medium text-primary">멘션 {r.mentionCount}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
