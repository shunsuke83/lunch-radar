"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { Badge, Button, LinkButton, Tag } from "@/components/ds";
import {
  closedDaysLabel,
  displayWalkMinutes,
  isRecentlyAdded,
  mapLinks,
  needsHoursCheck,
  openStatus,
  publicNotes,
  type OpeningHours,
  type Restaurant,
  type Weekday,
} from "@/lib/catalog";
import type { VisitMark } from "@/lib/visitor-store";

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function hoursText(h: OpeningHours): string {
  return h.open === "00:00" && h.close === "24:00" ? "24시간" : `${h.open}–${h.close}`;
}

type Props = {
  restaurant: Restaurant;
  now: number | null;
  weekday?: Weekday | null;
  nearby: boolean;
  visitMark?: VisitMark | null;
  onVisitMark?: (mark: VisitMark | null) => void;
  onClose: () => void;
};

export function RestaurantDetail({
  restaurant: r,
  now,
  weekday = null,
  nearby,
  visitMark = null,
  onVisitMark,
  onClose,
}: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const status = openStatus(r.hours, now, weekday);
  const links = mapLinks(r);
  const walk = displayWalkMinutes(r);
  const notes = publicNotes(r);
  const closed = closedDaysLabel(r.hours?.closedDays);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full w-full max-w-md flex-col bg-surface-default shadow-default-lg outline-none"
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
          <Button size="md" className="min-w-size-control-lg px-0" onClick={onClose}>
            <X aria-hidden className="size-size-icon-sm" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-stack-lg overflow-y-auto px-inline-lg py-stack-lg">
          <div className="flex flex-wrap items-center gap-group-sm">
            <Badge status={badgeStatus}>{status.label}</Badge>
            {status.lunchOk ? <Tag color="green" size="xsmall">점심 가능</Tag> : null}
            {!status.lunchOk && r.hours ? <Tag color="gray" size="xsmall">점심 어려움</Tag> : null}
            {needsHoursCheck(r) ? <Badge status="warning">영업확인필요</Badge> : null}
            {nearby && isRecentlyAdded(r) ? <Tag color="brand" size="xsmall">새로 추가</Tag> : null}
          </div>

          {r.hours ? (
            <p className="text-text-secondary typography-body-md-regular">
              {hoursText(r.hours)}
              {r.hours.breakStart && r.hours.breakEnd
                ? ` · 브레이크 ${r.hours.breakStart}–${r.hours.breakEnd}`
                : ""}
              {closed ? ` · ${closed}` : ""}
            </p>
          ) : null}

          {nearby && walk !== undefined ? (
            <p className="text-text-secondary typography-body-md-regular">
              도보 약 {walk}분
              {r.walkMeters !== undefined ? ` (${r.walkMeters}m)` : ""}
            </p>
          ) : r.place?.address || r.address ? (
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

          {notes ? <p className="text-text-secondary typography-body-sm-regular">{notes}</p> : null}

          {(r.place?.address || r.address) && (
            <div className="rounded-sm border border-border-default bg-surface-subtle px-inline-lg py-stack-md">
              <h3 className="mb-group-xs text-text-tertiary typography-label-sm-medium">위치</h3>
              <p className="text-text-secondary typography-body-md-regular">
                {r.place?.address || r.address}
              </p>
            </div>
          )}

          {onVisitMark ? (
            <div className="flex flex-wrap gap-group-sm">
              <ChipButton
                selected={visitMark === "visited"}
                onClick={() => onVisitMark(visitMark === "visited" ? null : "visited")}
              >
                가봤어요
              </ChipButton>
              <ChipButton
                selected={visitMark === "dislike"}
                onClick={() => onVisitMark(visitMark === "dislike" ? null : "dislike")}
              >
                별로
              </ChipButton>
            </div>
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

function ChipButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={
        selected
          ? "rounded-xs bg-surface-brand-subtle px-inline-md py-stack-xs text-text-brand typography-label-md-medium"
          : "rounded-xs bg-surface-subtle px-inline-md py-stack-xs text-text-secondary typography-label-md-medium"
      }
    >
      {children}
    </button>
  );
}
