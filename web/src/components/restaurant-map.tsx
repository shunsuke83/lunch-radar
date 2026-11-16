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

// Kakao JS keys are public by design; Kakao only serves them to the
// domains registered for the app (Pages URL, localhost).
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY?.trim();

/** Default camera radius around the office so far-away pins do not shrink the view. */
const DEFAULT_RADIUS_M = 600;

type LatLng = object;
type KakaoMap = {
  setBounds: (b: object) => void;
  setCenter: (p: LatLng) => void;
  panTo: (p: LatLng) => void;
  panBy: (x: number, y: number) => void;
  relayout: () => void;
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
    Marker: new (opts: { position: LatLng; title?: string; image?: object; zIndex?: number }) => Overlay;
    CustomOverlay: new (opts: {
      position: LatLng;
      content: HTMLElement;
      yAnchor?: number;
      zIndex?: number;
    }) => Overlay;
    event: {
      addListener: (target: object, type: string, fn: (...args: unknown[]) => void) => void;
    };
    MarkerClusterer: new (opts: { map: KakaoMap; averageCenter?: boolean; minLevel?: number }) => {
      addMarkers: (markers: Overlay[]) => void;
      clear: () => void;
    };
  };
};

const PIN_COLOR: Record<OpenKind | "selected", string> = {
  open: "#16a34a",
  closingSoon: "#d97706",
  break: "#d97706",
  closed: "#9ca3af",
  unknown: "#6b7280",
  selected: "#0161ed",
};

function pinImage(kakao: Kakao, kind: OpenKind, selected: boolean) {
  const size = selected ? 28 : 18;
  const color = selected ? PIN_COLOR.selected : PIN_COLOR[kind];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${color}" stroke="#fff" stroke-width="2"/></svg>`;
  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  return new kakao.maps.MarkerImage(url, new kakao.maps.Size(size, size), {
    offset: new kakao.maps.Point(size / 2, size / 2),
  });
}

/** Above this many markers they are grouped into clusters. */
const CLUSTER_FROM = 200;

declare global {
  interface Window {
    kakao?: Kakao;
  }
}

let sdk: Promise<Kakao> | null = null;

function loadKakao(key: string): Promise<Kakao> {
  sdk ??= new Promise<Kakao>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&libraries=clusterer&autoload=false`;
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

/** ~DEFAULT_RADIUS_M box around a point, for setBounds. */
function radiusBounds(kakao: Kakao, center: { lat: number; lng: number }, meters: number) {
  const dLat = meters / 111_320;
  const dLng = meters / (111_320 * Math.cos((center.lat * Math.PI) / 180));
  const bounds = new kakao.maps.LatLngBounds();
  bounds.extend(new kakao.maps.LatLng(center.lat + dLat, center.lng + dLng));
  bounds.extend(new kakao.maps.LatLng(center.lat - dLat, center.lng - dLng));
  return bounds;
}

/** Popup card built with DOM APIs (textContent), so names cannot inject markup. */
function card(r: Restaurant, onClose: () => void): HTMLElement {
  const root = el(
    "div",
    "flex w-60 flex-col gap-group-xxs rounded-lg border border-border-default bg-surface-default px-inline-lg py-stack-md shadow-default-lg",
  );
  // Keep clicks inside the card from closing it via the map click handler.
  root.addEventListener("click", (e) => e.stopPropagation());
  const head = el("div", "flex items-start justify-between gap-group-sm");
  head.append(el("p", "text-text-primary typography-headline-sm", r.name));
  const close = el("button", "text-icon-tertiary hover:text-icon-primary typography-body-md-regular", "✕");
  close.type = "button";
  close.setAttribute("aria-label", "닫기");
  close.onclick = onClose;
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
  if (r.menu?.[0]) {
    const m = r.menu[0];
    root.append(
      el(
        "p",
        "text-text-secondary typography-body-sm-regular",
        m.price !== undefined ? `${m.name} ${m.price.toLocaleString("ko-KR")}원` : m.name,
      ),
    );
  }
  const links = mapLinks(r);
  const row = el("div", "flex gap-group-sm pt-stack-sm");
  for (const [label, href] of [
    ["네이버지도", links.naver],
    ["카카오맵", links.kakao],
  ] as const) {
    const a = el("a", buttonClass("tertiary", "sm"), label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noreferrer";
    row.append(a);
  }
  root.append(row);
  return root;
}

type Props = {
  restaurants: Restaurant[];
  office?: Office;
  now?: number | null;
  weekday?: Weekday | null;
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
};

export function RestaurantMap({
  restaurants,
  office,
  now = null,
  weekday = null,
  selectedSlug,
  onSelect,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ kakao: Kakao; map: KakaoMap } | null>(null);
  const layers = useRef<Overlay[]>([]);
  const clusterer = useRef<{ clear: () => void } | null>(null);
  const popupRef = useRef<Overlay | null>(null);
  const closePopupRef = useRef<() => void>(() => {});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const boundsKey = useRef("");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  /** When office is set, start zoomed to DEFAULT_RADIUS_M; expand shows every pin. */
  const [expanded, setExpanded] = useState(false);

  const located = useMemo(() => restaurants.filter((r) => r.location), [restaurants]);
  const outside = useMemo(() => {
    if (!office) return [];
    return located.filter((r) => distanceM(office, r.location!) > DEFAULT_RADIUS_M);
  }, [located, office]);
  const visible = useMemo(() => {
    if (!office || expanded) return located;
    return located.filter((r) => distanceM(office, r.location!) <= DEFAULT_RADIUS_M);
  }, [located, office, expanded]);

  useEffect(() => {
    if (!KAKAO_KEY || !box.current || mapRef.current) return;
    let cancelled = false;
    loadKakao(KAKAO_KEY)
      .then((kakao) => {
        if (cancelled || !box.current) return;
        const center = office ?? located[0]?.location ?? { lat: 37.4846, lng: 127.0347 };
        const map = new kakao.maps.Map(box.current, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level: 4,
        });
        mapRef.current = { kakao, map };
        kakao.maps.event.addListener(map, "click", () => closePopupRef.current());
        setReady(true);
      })
      .catch((e: Error) => setError(e.message));
    return () => {
      cancelled = true;
    };
    // The map is created once; markers follow `restaurants` below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const current = mapRef.current;
    if (!ready || !current) return;
    const { kakao, map } = current;
    for (const layer of layers.current) layer.setMap(null);
    layers.current = [];
    clusterer.current?.clear();
    clusterer.current = null;
    popupRef.current = null;
    const cluster = visible.length > CLUSTER_FROM;
    const markers: Overlay[] = [];

    const closePopup = () => {
      popupRef.current?.setMap(null);
      popupRef.current = null;
    };
    closePopupRef.current = closePopup;

    const openPopup = (r: Restaurant, pos: LatLng) => {
      closePopup();
      const o = new kakao.maps.CustomOverlay({
        position: pos,
        content: card(r, closePopup),
        yAnchor: 1.35,
        zIndex: 3,
      });
      o.setMap(map);
      layers.current.push(o);
      popupRef.current = o;
      // Center on the pin, then shift the map down so the card above it stays in frame.
      map.panTo(pos);
      window.setTimeout(() => map.panBy(0, 100), 280);
    };

    if (office) {
      const pos = new kakao.maps.LatLng(office.lat, office.lng);
      const label = el(
        "div",
        "rounded-full bg-surface-brand-default px-inline-sm py-stack-xxs text-text-inverse shadow-brand-sm typography-caption",
        "회사",
      );
      label.title = office.name;
      const o = new kakao.maps.CustomOverlay({ position: pos, content: label, yAnchor: 1.4, zIndex: 2 });
      o.setMap(map);
      layers.current.push(o);
    }

    for (const r of visible) {
      const pos = new kakao.maps.LatLng(r.location!.lat, r.location!.lng);
      const selected = r.slug === selectedSlug;
      const kind = openStatus(r.hours, now, weekday).kind;
      const marker = new kakao.maps.Marker({
        position: pos,
        title: r.name,
        image: pinImage(kakao, kind, selected),
        zIndex: selected ? 4 : 1,
      });
      if (cluster) {
        markers.push(marker);
      } else {
        marker.setMap(map);
        layers.current.push(marker);
      }
      kakao.maps.event.addListener(marker, "click", () => {
        onSelectRef.current?.(r.slug);
        openPopup(r, pos);
      });
    }

    if (cluster) {
      const c = new kakao.maps.MarkerClusterer({ map, averageCenter: true, minLevel: 5 });
      c.addMarkers(markers);
      clusterer.current = c;
    }

    const nextBoundsKey = `${expanded}|${office?.lat ?? ""}|${visible.map((r) => r.slug).join(",")}`;
    if (nextBoundsKey !== boundsKey.current) {
      boundsKey.current = nextBoundsKey;
      if (office && !expanded) {
        map.setBounds(radiusBounds(kakao, office, DEFAULT_RADIUS_M));
      } else if (visible.length > 0) {
        const bounds = new kakao.maps.LatLngBounds();
        if (office) bounds.extend(new kakao.maps.LatLng(office.lat, office.lng));
        for (const r of visible) bounds.extend(new kakao.maps.LatLng(r.location!.lat, r.location!.lng));
        map.setBounds(bounds);
      }
    }
  }, [ready, visible, office, expanded, selectedSlug, now, weekday]);

  // List→map: pan to the selected pin without resetting the whole viewport.
  useEffect(() => {
    const current = mapRef.current;
    if (!ready || !current || !selectedSlug) return;
    const r = visible.find((x) => x.slug === selectedSlug);
    if (!r?.location) return;
    const pos = new current.kakao.maps.LatLng(r.location.lat, r.location.lng);
    current.map.panTo(pos);
  }, [ready, selectedSlug, visible]);

  if (!KAKAO_KEY) {
    return (
      <div className="rounded-sm bg-surface-default px-inline-xxl py-stack-xl text-center text-text-tertiary typography-body-md-regular">
        카카오 지도 키(NEXT_PUBLIC_KAKAO_MAP_KEY)가 설정되지 않아 지도를 표시할 수 없습니다. 각 가게의
        카카오맵·네이버지도 버튼을 이용해 주세요.
      </div>
    );
  }

  return (
    <section aria-label="맛집 지도" className="flex flex-col gap-stack-sm">
      <div
        ref={box}
        className="h-[420px] w-full overflow-hidden rounded-sm border border-border-default bg-surface-subtle"
      />
      <ul className="flex flex-wrap items-center gap-group-md text-text-tertiary typography-caption" aria-label="핀 색 안내">
        {(
          [
            ["영업 중", PIN_COLOR.open],
            ["곧 마감·브레이크", PIN_COLOR.closingSoon],
            ["영업 전·종료", PIN_COLOR.closed],
            ["선택", PIN_COLOR.selected],
          ] as const
        ).map(([label, color]) => (
          <li key={label} className="inline-flex items-center gap-group-xs">
            <span
              aria-hidden
              className="inline-block size-2.5 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
            {label}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-group-sm">
        <p className="text-text-tertiary typography-caption">
          {error ??
            (visible.length === restaurants.length
              ? `${visible.length}곳 표시`
              : `${visible.length}곳 표시 · 위치를 모르는 ${restaurants.length - located.length}곳은 아래 목록에서 확인하세요`)}
        </p>
        {office && outside.length > 0 ? (
          <button
            type="button"
            className={buttonClass("tertiary", "sm")}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded
              ? `회사 ${DEFAULT_RADIUS_M}m 안으로`
              : `더 먼 ${outside.length}곳 보기`}
          </button>
        ) : null}
      </div>
    </section>
  );
}
