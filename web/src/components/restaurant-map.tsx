"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buttonClass } from "@/components/ds";
import {
  displayWalkMinutes,
  mapLinks,
  openStatus,
  type Office,
  type OpenKind,
  type Restaurant,
  type Weekday,
} from "@/lib/catalog";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY?.trim();
const DEFAULT_RADIUS_M = 600;
const BUBBLE_MAX_LEVEL = 7;
const NAME_LABEL_MAX_LEVEL = 4;

type LatLng = { getLat?: () => number; getLng?: () => number };
type KakaoMap = {
  setBounds: (b: object, padding?: number) => void;
  setCenter: (p: LatLng) => void;
  panTo: (p: LatLng) => void;
  panBy: (x: number, y: number) => void;
  relayout: () => void;
  getLevel: () => number;
  setLevel: (n: number) => void;
  getBounds: () => {
    getSouthWest: () => { getLat: () => number; getLng: () => number };
    getNorthEast: () => { getLat: () => number; getLng: () => number };
  };
  getCenter: () => { getLat: () => number; getLng: () => number };
};
type MarkerLike = {
  setMap: (m: KakaoMap | null) => void;
  setImage: (img: object) => void;
  setZIndex: (z: number) => void;
  getPosition: () => LatLng;
};
type Overlay = { setMap: (m: KakaoMap | null) => void };
type Kakao = {
  maps: {
    load: (cb: () => void) => void;
    LatLng: new (lat: number, lng: number) => LatLng;
    LatLngBounds: new () => { extend: (p: LatLng) => void };
    Map: new (el: HTMLElement, opts: { center: LatLng; level: number }) => KakaoMap;
    Size: new (w: number, h: number) => object;
    Point: new (x: number, y: number) => object;
    MarkerImage: new (src: string, size: object, opts?: { offset?: object }) => object;
    Marker: new (opts: {
      position: LatLng;
      title?: string;
      image?: object;
      zIndex?: number;
    }) => MarkerLike;
    CustomOverlay: new (opts: {
      position: LatLng;
      content: HTMLElement;
      yAnchor?: number;
      zIndex?: number;
      /** When false (Kakao default), clicks pass through to the map. */
      clickable?: boolean;
    }) => Overlay;
    event: {
      addListener: (target: object, type: string, fn: (...args: unknown[]) => void) => void;
      removeListener: (target: object, type: string, fn: (...args: unknown[]) => void) => void;
    };
  };
};

const PIN_COLOR: Record<OpenKind | "selected", string> = {
  open: "#16a34a",
  closingSoon: "#d97706",
  break: "#d97706",
  closed: "#9ca3af",
  unknown: "#6b7280",
  selected: "#0f172a",
};

/** Prefer pins over district bubbles when the filtered set is small (B18). */
const BUBBLE_MIN_COUNT = 120;

const CATEGORY_COLOR: Record<string, string> = {
  한식: "#c2410c",
  중식: "#b91c1c",
  일식: "#1d4ed8",
  양식: "#7c3aed",
  아시안: "#0f766e",
  분식: "#ca8a04",
  샐러드: "#15803d",
  "카페·디저트": "#9d174d",
  주점: "#4b5563",
};

function pinColor(
  r: Restaurant,
  kind: OpenKind,
  selected: boolean,
  mode: "hours" | "category",
): string {
  // Selected keeps category/hours color; size+ring marks selection (B16).
  if (mode === "category") return CATEGORY_COLOR[r.category ?? ""] ?? "#64748b";
  if (selected) return PIN_COLOR.selected;
  return PIN_COLOR[kind];
}

function pinImage(kakao: Kakao, color: string, selected: boolean, emphasize = false) {
  const size = selected ? 30 : emphasize ? 22 : 18;
  const ring = selected
    ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="none" stroke="#0f172a" stroke-width="3"/>`
    : emphasize
      ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="none" stroke="#f59e0b" stroke-width="2"/>`
      : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${ring}<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - (selected ? 4 : 2)}" fill="${color}" stroke="#fff" stroke-width="2"/></svg>`;
  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  return new kakao.maps.MarkerImage(url, new kakao.maps.Size(size, size), {
    offset: new kakao.maps.Point(size / 2, size / 2),
  });
}

declare global {
  interface Window {
    kakao?: Kakao;
  }
}

let sdk: Promise<Kakao> | null = null;

function loadKakao(key: string): Promise<Kakao> {
  sdk ??= new Promise<Kakao>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao?.maps.load(() => resolve(window.kakao!));
    script.onerror = () => {
      sdk = null;
      reject(new Error("카카오 지도 SDK를 불러오지 못했습니다."));
    };
    document.head.appendChild(script);
  });
  return sdk;
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function distanceM(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
}

function radiusBounds(kakao: Kakao, center: { lat: number; lng: number }, meters: number) {
  const dLat = meters / 111_320;
  const dLng = meters / (111_320 * Math.cos((center.lat * Math.PI) / 180));
  const bounds = new kakao.maps.LatLngBounds();
  bounds.extend(new kakao.maps.LatLng(center.lat + dLat, center.lng + dLng));
  bounds.extend(new kakao.maps.LatLng(center.lat - dLat, center.lng - dLng));
  return bounds;
}

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * p)));
  return sorted[i]!;
}

/** Fit bounds using 2–98% percentiles so outliers do not zoom to the peninsula. */
function robustBounds(kakao: Kakao, points: { lat: number; lng: number }[]) {
  const lats = points.map((p) => p.lat).sort((a, b) => a - b);
  const lngs = points.map((p) => p.lng).sort((a, b) => a - b);
  const latMin = percentile(lats, 0.02);
  const latMax = percentile(lats, 0.98);
  const lngMin = percentile(lngs, 0.02);
  const lngMax = percentile(lngs, 0.98);
  const bounds = new kakao.maps.LatLngBounds();
  bounds.extend(new kakao.maps.LatLng(latMin, lngMin));
  bounds.extend(new kakao.maps.LatLng(latMax, lngMax));
  return bounds;
}

function isEmphasized(r: Restaurant): boolean {
  const reviews = r.naverReviews ?? 0;
  const score = r.naverScore ?? r.rating?.score ?? 0;
  return reviews >= 500 || score >= 4.3;
}

function card(
  r: Restaurant,
  onClose: () => void,
  onDetail?: (slug: string) => void,
): HTMLElement {
  const root = el(
    "div",
    "flex w-60 flex-col gap-group-xxs rounded-lg border border-border-default bg-surface-default px-inline-lg py-stack-md shadow-default-lg",
  );
  // Stop map from receiving the same gesture (Kakao overlays need clickable:true too).
  const stop = (e: Event) => e.stopPropagation();
  root.addEventListener("click", stop);
  root.addEventListener("mousedown", stop);
  root.addEventListener("touchstart", stop, { passive: true });
  const head = el("div", "flex items-start justify-between gap-group-sm");
  head.append(el("p", "text-text-primary typography-headline-sm", r.name));
  const close = el("button", "text-icon-tertiary hover:text-icon-primary typography-body-md-regular", "✕");
  close.type = "button";
  close.setAttribute("aria-label", "닫기");
  close.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  });
  head.append(close);
  root.append(head);

  const meta = [r.category, r.subcategory].filter(Boolean).join(" · ");
  if (meta) root.append(el("p", "text-text-tertiary typography-body-sm-regular", meta));
  const scores = [
    r.rating?.source === "kakao"
      ? `카카오 ★ ${r.rating.score.toFixed(1)} (${r.rating.count.toLocaleString("ko-KR")})`
      : "",
    r.naverReviews ? `네이버 리뷰 ${r.naverReviews.toLocaleString("ko-KR")}` : "",
  ].filter(Boolean);
  if (scores.length) {
    root.append(el("p", "text-text-secondary typography-body-sm-medium", scores.join(" · ")));
  }
  const walk = displayWalkMinutes(r);
  if (walk !== undefined) {
    const meters = r.walkMeters !== undefined ? ` · ${r.walkMeters}m` : "";
    root.append(el("p", "text-text-tertiary typography-body-sm-regular", `도보 ${walk}분${meters}`));
  }
  if ((r.collections?.length ?? 0) >= 2) {
    root.append(
      el("p", "text-text-brand typography-caption", `여러 목록 · ${r.collections!.length}`),
    );
  }
  const row = el("div", "flex flex-wrap gap-group-sm pt-stack-sm");
  if (onDetail) {
    const detail = el("button", buttonClass("primary", "sm"), "자세히");
    detail.type = "button";
    const open = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      onDetail(r.slug);
    };
    // mousedown fires more reliably than click inside Kakao overlays.
    detail.addEventListener("mousedown", open);
    detail.addEventListener("click", open);
    row.append(detail);
  }
  const links = mapLinks(r);
  for (const [label, href] of [
    ["네이버", links.naver],
    ["카카오", links.kakao],
  ] as const) {
    const a = el("a", buttonClass("tertiary", "sm"), label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.addEventListener("mousedown", stop);
    a.addEventListener("click", stop);
    row.append(a);
  }
  root.append(row);
  return root;
}

export type MapBounds = { south: number; west: number; north: number; east: number };

type MapCenter = { lat: number; lng: number; z: number };

type Props = {
  restaurants: Restaurant[];
  office?: Office;
  now?: number | null;
  weekday?: Weekday | null;
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
  onOpenDetail?: (slug: string) => void;
  onBoundsChange?: (bounds: MapBounds, level: number, visibleInBounds: number) => void;
  /** Restore camera from URL / shared link (skips first auto-fit). */
  initialCenter?: MapCenter | null;
  /** Nationwide uses category colors; office uses open-hours colors. */
  pinMode?: "hours" | "category";
  className?: string;
  heightClass?: string;
};

type MarkerEntry = {
  marker: MarkerLike;
  restaurant: Restaurant;
  kind: OpenKind;
  selected: boolean;
};

export function RestaurantMap({
  restaurants,
  office,
  now = null,
  weekday = null,
  selectedSlug,
  onSelect,
  onOpenDetail,
  onBoundsChange,
  initialCenter = null,
  pinMode = office ? "hours" : "category",
  className,
  heightClass = "h-[420px]",
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ kakao: Kakao; map: KakaoMap } | null>(null);
  const markersRef = useRef<Map<string, MarkerEntry>>(new Map());
  const officeOverlay = useRef<Overlay | null>(null);
  const bubbleOverlays = useRef<Overlay[]>([]);
  const nameLabels = useRef<Overlay[]>([]);
  const popupRef = useRef<Overlay | null>(null);
  const closePopupRef = useRef<() => void>(() => {});
  const onSelectRef = useRef(onSelect);
  const onDetailRef = useRef(onOpenDetail);
  const onBoundsRef = useRef(onBoundsChange);
  onSelectRef.current = onSelect;
  onDetailRef.current = onOpenDetail;
  onBoundsRef.current = onBoundsChange;
  const selectedRef = useRef(selectedSlug);
  selectedRef.current = selectedSlug;
  const boundsKey = useRef("");
  const skipFitOnce = useRef(Boolean(initialCenter));
  const pinModeRef = useRef(pinMode);
  pinModeRef.current = pinMode;
  const [error, setError] = useState<string | null>(null);
  const [geoHint, setGeoHint] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [level, setLevel] = useState(initialCenter?.z ?? 4);
  const [viewportCount, setViewportCount] = useState(0);

  const located = useMemo(() => restaurants.filter((r) => r.location), [restaurants]);
  const outside = useMemo(() => {
    if (!office) return [];
    return located.filter((r) => distanceM(office, r.location!) > DEFAULT_RADIUS_M);
  }, [located, office]);
  const visible = useMemo(() => {
    if (!office || expanded) return located;
    return located.filter((r) => distanceM(office, r.location!) <= DEFAULT_RADIUS_M);
  }, [located, office, expanded]);
  const visibleKey = useMemo(() => visible.map((r) => r.slug).join(","), [visible]);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const closePopup = () => {
    popupRef.current?.setMap(null);
    popupRef.current = null;
  };
  closePopupRef.current = closePopup;

  const openPopup = (r: Restaurant) => {
    const current = mapRef.current;
    if (!current || !r.location) return;
    closePopup();
    const pos = new current.kakao.maps.LatLng(r.location.lat, r.location.lng);
    const o = new current.kakao.maps.CustomOverlay({
      position: pos,
      content: card(r, closePopup, (slug) => onDetailRef.current?.(slug)),
      yAnchor: 1.35,
      zIndex: 10,
      clickable: true,
    });
    o.setMap(current.map);
    popupRef.current = o;
    current.map.panTo(pos);
    // Keep popup clear of the top edge (B14) — popup is ~140px tall above the pin.
    window.setTimeout(() => {
      current.map.panBy(0, -160);
    }, 50);
  };

  useEffect(() => {
    if (!KAKAO_KEY || !box.current || mapRef.current) return;
    let cancelled = false;
    loadKakao(KAKAO_KEY)
      .then((kakao) => {
        if (cancelled || !box.current) return;
        const center = initialCenter ?? office ?? located[0]?.location ?? { lat: 37.4846, lng: 127.0347 };
        const startLevel = initialCenter?.z ?? 4;
        const map = new kakao.maps.Map(box.current, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level: startLevel,
        });
        setLevel(startLevel);
        mapRef.current = { kakao, map };
        const emitBounds = () => {
          const b = map.getBounds();
          const sw = b.getSouthWest();
          const ne = b.getNorthEast();
          const lv = map.getLevel();
          setLevel(lv);
          let n = 0;
          for (const r of visibleRef.current) {
            const loc = r.location;
            if (!loc) continue;
            if (
              loc.lat >= sw.getLat() &&
              loc.lat <= ne.getLat() &&
              loc.lng >= sw.getLng() &&
              loc.lng <= ne.getLng()
            ) {
              n++;
            }
          }
          setViewportCount(n);
          onBoundsRef.current?.(
            {
              south: sw.getLat(),
              west: sw.getLng(),
              north: ne.getLat(),
              east: ne.getLng(),
            },
            lv,
            n,
          );
        };
        kakao.maps.event.addListener(map, "click", () => closePopupRef.current());
        kakao.maps.event.addListener(map, "idle", emitBounds);
        kakao.maps.event.addListener(map, "zoom_changed", () => {
          setLevel(map.getLevel());
        });
        setReady(true);
        emitBounds();
      })
      .catch((e: Error) => setError(e.message));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fit camera only when the restaurant set / office mode changes — not on zoom.
  useEffect(() => {
    const current = mapRef.current;
    if (!ready || !current || !visible.length) return;
    const { kakao, map } = current;
    const nextBoundsKey = `${expanded}|${office?.lat ?? ""}|${visibleKey}`;
    if (nextBoundsKey === boundsKey.current) return;
    boundsKey.current = nextBoundsKey;
    if (skipFitOnce.current) {
      skipFitOnce.current = false;
      return;
    }
    if (office && !expanded) {
      map.setBounds(radiusBounds(kakao, office, DEFAULT_RADIUS_M));
    } else {
      map.setBounds(
        robustBounds(
          kakao,
          visible.map((r) => r.location!),
        ),
        40,
      );
    }
  }, [ready, visible, visibleKey, office, expanded]);

  // Sync markers / district bubbles with zoom level.
  useEffect(() => {
    const current = mapRef.current;
    if (!ready || !current) return;
    const { kakao, map } = current;
    const nextSlugs = new Set(visible.map((r) => r.slug));
    const showBubbles = !office && level >= BUBBLE_MAX_LEVEL && visible.length >= BUBBLE_MIN_COUNT;

    for (const [slug, entry] of markersRef.current) {
      if (!nextSlugs.has(slug)) {
        entry.marker.setMap(null);
        markersRef.current.delete(slug);
      }
    }

    for (const overlay of bubbleOverlays.current) overlay.setMap(null);
    bubbleOverlays.current = [];
    for (const overlay of nameLabels.current) overlay.setMap(null);
    nameLabels.current = [];

    if (showBubbles) {
      for (const [slug, entry] of markersRef.current) {
        // Keep the selected place as a pin even in bubble mode (B18).
        if (slug === selectedRef.current) continue;
        entry.marker.setMap(null);
      }
      const byDistrict = new Map<string, { count: number; lat: number; lng: number }>();
      for (const r of visible) {
        if (r.slug === selectedRef.current) continue;
        const d = r.district || "기타";
        const cur = byDistrict.get(d) ?? { count: 0, lat: 0, lng: 0 };
        cur.count++;
        cur.lat += r.location!.lat;
        cur.lng += r.location!.lng;
        byDistrict.set(d, cur);
      }
      for (const [name, agg] of byDistrict) {
        const lat = agg.lat / agg.count;
        const lng = agg.lng / agg.count;
        const short = name.replace(/(특별시|광역시|특별자치시|시|군|구)$/, "") || name;
        const label = el(
          "button",
          "cursor-pointer rounded-full border border-white bg-surface-brand-default px-inline-md py-stack-xs text-text-inverse shadow-brand-sm typography-body-sm-medium",
          `${short} ${agg.count}`,
        );
        label.type = "button";
        label.onclick = (e) => {
          e.stopPropagation();
          const pts = visible
            .filter((r) => (r.district || "기타") === name)
            .map((r) => r.location!);
          if (!pts.length) return;
          // Zoom into the district; do not rewrite boundsKey so we stay zoomed.
          map.setBounds(robustBounds(kakao, pts), 48);
          // Ensure we leave bubble zoom even for a single-pin district.
          window.setTimeout(() => {
            if (map.getLevel() >= BUBBLE_MAX_LEVEL) map.setLevel(BUBBLE_MAX_LEVEL - 1);
            setLevel(map.getLevel());
          }, 320);
        };
        const o = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(lat, lng),
          content: label,
          yAnchor: 0.5,
          zIndex: 2,
          clickable: true,
        });
        o.setMap(map);
        bubbleOverlays.current.push(o);
      }
      // Always draw the selected place as a pin in bubble mode.
      const selectedRow = visible.find((r) => r.slug === selectedRef.current);
      if (selectedRow?.location) {
        const kind = openStatus(selectedRow.hours, now, weekday).kind;
        const color = pinColor(selectedRow, kind, true, pinModeRef.current);
        const entry = markersRef.current.get(selectedRow.slug);
        if (!entry) {
          const pos = new kakao.maps.LatLng(selectedRow.location.lat, selectedRow.location.lng);
          const marker = new kakao.maps.Marker({
            position: pos,
            title: selectedRow.name,
            image: pinImage(kakao, color, true, isEmphasized(selectedRow)),
            zIndex: 6,
          });
          marker.setMap(map);
          kakao.maps.event.addListener(marker, "click", () => {
            onSelectRef.current?.(selectedRow.slug);
          });
          markersRef.current.set(selectedRow.slug, {
            marker,
            restaurant: selectedRow,
            kind,
            selected: true,
          });
        } else {
          entry.restaurant = selectedRow;
          entry.marker.setImage(pinImage(kakao, color, true, isEmphasized(selectedRow)));
          entry.marker.setZIndex(6);
          entry.marker.setMap(map);
          entry.kind = kind;
          entry.selected = true;
        }
      }
    } else {
      for (const r of visible) {
        const kind = openStatus(r.hours, now, weekday).kind;
        const selected = r.slug === selectedRef.current;
        const color = pinColor(r, kind, selected, pinModeRef.current);
        const emphasize = isEmphasized(r);
        let entry = markersRef.current.get(r.slug);
        if (!entry) {
          const pos = new kakao.maps.LatLng(r.location!.lat, r.location!.lng);
          const marker = new kakao.maps.Marker({
            position: pos,
            title: r.name,
            image: pinImage(kakao, color, selected, emphasize),
            zIndex: selected ? 4 : emphasize ? 2 : 1,
          });
          marker.setMap(map);
          kakao.maps.event.addListener(marker, "click", () => {
            onSelectRef.current?.(r.slug);
          });
          entry = { marker, restaurant: r, kind, selected };
          markersRef.current.set(r.slug, entry);
        } else {
          entry.restaurant = r;
          if (entry.kind !== kind || entry.selected !== selected) {
            entry.marker.setImage(pinImage(kakao, color, selected, emphasize));
            entry.marker.setZIndex(selected ? 4 : emphasize ? 2 : 1);
            entry.kind = kind;
            entry.selected = selected;
          }
          entry.marker.setMap(map);
        }
      }

      if (level <= NAME_LABEL_MAX_LEVEL) {
        const top = [...visible]
          .filter(isEmphasized)
          .sort((a, b) => (b.naverReviews ?? 0) - (a.naverReviews ?? 0))
          .slice(0, 40);
        for (const r of top) {
          const label = el(
            "div",
            "rounded-sm bg-surface-default/90 px-inline-sm py-stack-xxs text-text-primary shadow-sm typography-caption",
            r.name,
          );
          const o = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(r.location!.lat, r.location!.lng),
            content: label,
            yAnchor: -0.2,
            zIndex: 1,
          });
          o.setMap(map);
          nameLabels.current.push(o);
        }
      }
    }

    if (office) {
      officeOverlay.current?.setMap(null);
      const pos = new kakao.maps.LatLng(office.lat, office.lng);
      const label = el(
        "div",
        "rounded-full bg-surface-brand-default px-inline-sm py-stack-xxs text-text-inverse shadow-brand-sm typography-caption",
        "회사",
      );
      label.title = office.name;
      const o = new kakao.maps.CustomOverlay({ position: pos, content: label, yAnchor: 1.4, zIndex: 5 });
      o.setMap(map);
      officeOverlay.current = o;
    }
  }, [ready, visible, visibleKey, office, expanded, now, weekday, pinMode, level, selectedSlug]);

  // Selection styling + popup without rebuilding markers.
  useEffect(() => {
    const current = mapRef.current;
    if (!ready || !current) return;
    const { kakao } = current;
    for (const [slug, entry] of markersRef.current) {
      const selected = slug === selectedSlug;
      if (entry.selected === selected) continue;
      const kind = openStatus(entry.restaurant.hours, now, weekday).kind;
      const color = pinColor(entry.restaurant, kind, selected, pinMode);
      entry.marker.setImage(pinImage(kakao, color, selected, isEmphasized(entry.restaurant)));
      entry.marker.setZIndex(selected ? 4 : 1);
      entry.selected = selected;
      entry.kind = kind;
    }
    if (selectedSlug) {
      const r = visible.find((x) => x.slug === selectedSlug) ?? markersRef.current.get(selectedSlug)?.restaurant;
      if (r) openPopup(r);
    } else {
      closePopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, selectedSlug, visibleKey, level]);

  useEffect(() => {
    const current = mapRef.current;
    if (!ready || !current || !onBoundsChange) return;
    const map = current.map;
    const b = map.getBounds();
    const sw = b.getSouthWest();
    const ne = b.getNorthEast();
    let n = 0;
    for (const r of visible) {
      const { lat, lng } = r.location!;
      if (lat >= sw.getLat() && lat <= ne.getLat() && lng >= sw.getLng() && lng <= ne.getLng()) n++;
    }
    setViewportCount(n);
    onBoundsRef.current?.(
      {
        south: sw.getLat(),
        west: sw.getLng(),
        north: ne.getLat(),
        east: ne.getLng(),
      },
      map.getLevel(),
      n,
    );
  }, [ready, visible, level, onBoundsChange]);

  const fitAll = () => {
    const current = mapRef.current;
    if (!current || !visible.length) return;
    boundsKey.current = "";
    current.map.setBounds(
      robustBounds(
        current.kakao,
        visible.map((r) => r.location!),
      ),
      40,
    );
  };

  const goMyLocation = () => {
    const current = mapRef.current;
    if (!current) return;
    if (!navigator.geolocation) {
      setGeoHint("이 브라우저는 위치 정보를 지원하지 않습니다.");
      return;
    }
    setGeoHint(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        current.map.setCenter(new current.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        current.map.setLevel(5);
      },
      () => setGeoHint("위치 권한을 허용해 주세요."),
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  };

  if (!KAKAO_KEY) {
    return (
      <div className="rounded-sm bg-surface-default px-inline-xxl py-stack-xl text-center text-text-tertiary typography-body-md-regular">
        카카오 지도 키(NEXT_PUBLIC_KAKAO_MAP_KEY)가 설정되지 않아 지도를 표시할 수 없습니다.
      </div>
    );
  }

  const legend =
    pinMode === "category"
      ? ([
          ["한식", CATEGORY_COLOR.한식],
          ["중식", CATEGORY_COLOR.중식],
          ["일식", CATEGORY_COLOR.일식],
          ["양식", CATEGORY_COLOR.양식],
          ["아시안", CATEGORY_COLOR.아시안],
          ["카페·디저트", CATEGORY_COLOR["카페·디저트"]],
          ["분식", CATEGORY_COLOR.분식],
          ["미분류", "#64748b"],
        ] as const)
      : ([
          ["영업 중", PIN_COLOR.open],
          ["곧 마감·브레이크", PIN_COLOR.closingSoon],
          ["영업 전·종료", PIN_COLOR.closed],
          ["시간 미확인", PIN_COLOR.unknown],
        ] as const);

  return (
    <section aria-label="맛집 지도" className={`flex flex-col gap-stack-sm ${className ?? ""}`}>
      <div className="relative">
        <div
          ref={box}
          className={`${heightClass} w-full overflow-hidden rounded-sm border border-border-default bg-surface-subtle`}
        />
        <div className="pointer-events-none absolute right-2 top-2 z-10 flex flex-col gap-group-xs">
          <button
            type="button"
            className={`pointer-events-auto bg-surface-default shadow-sm ${buttonClass("tertiary", "sm")}`}
            onClick={goMyLocation}
          >
            내 위치
          </button>
          <button
            type="button"
            className={`pointer-events-auto bg-surface-default shadow-sm ${buttonClass("tertiary", "sm")}`}
            onClick={fitAll}
          >
            전체 보기
          </button>
          {viewportCount > 0 ? (
            <span className="pointer-events-none rounded-sm bg-surface-default px-inline-sm py-stack-xxs text-text-secondary shadow-sm typography-caption">
              이 지역 {viewportCount.toLocaleString("ko-KR")}곳
            </span>
          ) : null}
        </div>
      </div>
      {geoHint ? <p className="text-text-danger-default typography-caption">{geoHint}</p> : null}
      <ul className="flex flex-wrap items-center gap-group-md text-text-tertiary typography-caption" aria-label="핀 색 안내">
        {legend.map(([label, color]) => (
          <li key={label} className="inline-flex items-center gap-group-xs">
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
            {label}
          </li>
        ))}
        <li className="inline-flex items-center gap-group-xs">
          <span
            aria-hidden
            className="inline-block size-3 rounded-full border-2 border-slate-900 bg-white shadow-sm"
          />
          선택 (큰 핀)
        </li>
        {pinMode === "category" ? (
          <li className="inline-flex items-center gap-group-xs">
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-full border-2 border-amber-500 bg-orange-600 shadow-sm"
            />
            여러 목록 (금테)
          </li>
        ) : null}
      </ul>
      <div className="flex flex-wrap items-center gap-group-sm">
        <p className="text-text-tertiary typography-caption">
          {error ??
            (visible.length === restaurants.length
              ? `${visible.length}곳 표시`
              : `${visible.length}곳 표시 · 위치를 모르는 ${restaurants.length - located.length}곳은 목록에서 확인`)}
        </p>
        {office && outside.length > 0 ? (
          <button type="button" className={buttonClass("tertiary", "sm")} onClick={() => setExpanded((v) => !v)}>
            {expanded ? `회사 ${DEFAULT_RADIUS_M}m 안으로` : `더 먼 ${outside.length}곳 보기`}
          </button>
        ) : null}
      </div>
    </section>
  );
}
