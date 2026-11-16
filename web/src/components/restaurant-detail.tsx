"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";
import { Badge, Button, LinkButton, Tag } from "@/components/ds";
import {
  mapLinks,
  openStatus,
  walkMinutes,
  type OpeningHours,
  type Restaurant,
} from "@/lib/catalog";
const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function hoursText(h: OpeningHours): string {
  return h.open === "00:00" && h.close === "24:00" ? "24시간" : `${h.open}–${h.close}`;
}

type Props = {
  restaurant: Restaurant;
  now: number | null;
  nearby: boolean;
  onClose: () => void;
};

export function RestaurantDetail({ restaurant: r, now, nearby, onClose }: Props) {
  const titleId = useId();
  const status = openStatus(r.hours, now);
  const links = mapLinks(r);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const badgeStatus =
    status.kind === "open"
      ? "success"
      : status.kind === "closingSoon" || status.kind === "break"
        ? "warning"
        : status.kind === "closed"
          ? "disabled"
          : "default";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" aria-label="상세 닫기" className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full w-full max-w-md flex-col bg-surface-default shadow-default-lg"
      >
        <div className="flex items-start justify-between gap-group-sm border-b border-border-default px-inline-lg py-stack-md">
          <div className="min-w-0">
            <h2 id={titleId} className="text-text-primary typography-headline-sm">
              {r.name}
            </h2>
            <p className="mt-group-xxs text-text-tertiary typography-body-sm-regular">
              {[r.category, r.subcategory].filter(Boolean).join(" · ") || "–"}
            </p>
          </div>
          <Button size="md" className="min-h-size-control-lg min-w-size-control-lg px-0" onClick={onClose}>
            <X aria-hidden className="size-size-icon-sm" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-stack-lg overflow-y-auto px-inline-lg py-stack-lg">
          <div className="flex flex-wrap items-center gap-group-sm">
            <Badge status={badgeStatus}>{status.label}</Badge>
            {status.lunchOk ? <Tag color="green" size="xsmall">점심 가능</Tag> : null}
            {!status.lunchOk && r.hours ? <Tag color="gray" size="xsmall">점심 어려움</Tag> : null}
          </div>

          {r.hours ? (
            <p className="text-text-secondary typography-body-md-regular">
              {hoursText(r.hours)}
              {r.hours.breakStart && r.hours.breakEnd
                ? ` · 브레이크 ${r.hours.breakStart}–${r.hours.breakEnd}`
                : ""}
            </p>
          ) : null}

          {nearby && r.walkMeters !== undefined ? (
            <p className="text-text-secondary typography-body-md-regular">
              도보 약 {walkMinutes(r.walkMeters)}분 ({r.walkMeters}m)
            </p>
          ) : r.address || r.place?.address ? (
            <p className="text-text-secondary typography-body-md-regular">
              {r.place?.address || r.address}
            </p>
          ) : null}

          {(r.rating?.source === "kakao" || r.naverReviews) && (
            <div className="flex flex-col gap-group-xxs text-text-secondary typography-body-md-regular">
              {r.rating?.source === "kakao" ? (
                <p>
                  카카오 ★ {r.rating.score.toFixed(1)} ({r.rating.count.toLocaleString("ko-KR")})
                </p>
              ) : null}
              {r.naverReviews ? (
                <p>
                  네이버 리뷰 {r.naverReviews.toLocaleString("ko-KR")}
                  {r.naverScore ? ` · ★ ${r.naverScore.toFixed(2)}` : ""}
                </p>
              ) : null}
            </div>
          )}

          {r.menu?.length ? (
            <div>
              <h3 className="mb-group-sm text-text-tertiary typography-label-sm-medium">메뉴</h3>
              <ul className="flex flex-col gap-group-xs">
                {r.menu.map((m) => (
                  <li
                    key={m.name}
                    className="flex justify-between gap-group-md text-text-primary typography-body-md-regular"
                  >
                    <span>{m.name}</span>
                    <span className="shrink-0 text-text-secondary">
                      {m.price !== undefined ? won(m.price) : "–"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : r.priceRange ? (
            <p className="text-text-secondary typography-body-md-regular">가격대 {r.priceRange}</p>
          ) : null}

          {r.notes ? (
            <p className="text-text-secondary typography-body-sm-regular">{r.notes}</p>
          ) : null}

          {r.location || r.address || r.place?.address ? (
            <div className="rounded-sm border border-border-default bg-surface-subtle px-inline-lg py-stack-md">
              <h3 className="mb-group-xs text-text-tertiary typography-label-sm-medium">위치</h3>
              <p className="text-text-secondary typography-body-md-regular">
                {r.place?.address || r.address || `${r.location!.lat.toFixed(5)}, ${r.location!.lng.toFixed(5)}`}
              </p>
              {r.location ? (
                <p className="mt-group-xxs text-text-tertiary typography-caption">
                  {r.location.lat.toFixed(5)}, {r.location.lng.toFixed(5)}
                </p>
              ) : null}
            </div>
          ) : null}

          {r.curated?.by ? (
            <p className="text-text-tertiary typography-caption">출처 {r.curated.by}</p>
          ) : null}
        </div>

        <div className="flex gap-group-sm border-t border-border-default px-inline-lg py-stack-md">
          <LinkButton href={links.naver} size="md" className="min-h-size-control-lg flex-1">
            네이버지도
          </LinkButton>
          <LinkButton href={links.kakao} size="md" className="min-h-size-control-lg flex-1">
            카카오맵
          </LinkButton>
        </div>
      </aside>
    </div>
  );
}
