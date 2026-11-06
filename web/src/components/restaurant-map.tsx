"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { mapLinks, walkMinutes, type Office, type Restaurant } from "@/lib/catalog";

// Kakao JS keys are public by design; Kakao only serves them to the
// domains registered for the app (Pages URL, localhost).
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY?.trim();

type LatLng = object;
type KakaoMap = {
  setBounds: (b: object) => void;
  setCenter: (p: LatLng) => void;
  relayout: () => void;
};
type Overlay = { setMap: (m: KakaoMap | null) => void };
type Kakao = {
  maps: {
    load: (cb: () => void) => void;
    LatLng: new (lat: number, lng: number) => LatLng;
    LatLngBounds: new () => { extend: (p: LatLng) => void };
    Map: new (el: HTMLElement, opts: { center: LatLng; level: number }) => KakaoMap;
    Marker: new (opts: { position: LatLng; title?: string }) => Overlay;
    CustomOverlay: new (opts: {
      position: LatLng;
      content: HTMLElement;
      yAnchor?: number;
      zIndex?: number;
    }) => Overlay;
    event: { addListener: (target: object, type: string, fn: () => void) => void };
  };
};

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

/** Popup card built with DOM APIs (textContent), so names cannot inject markup. */
function card(r: Restaurant, onClose: () => void): HTMLElement {
  const root = el("div", "w-60 rounded-xl border border-border bg-white p-3 text-sm shadow-lg");
  const head = el("div", "flex items-start justify-between gap-2");
  head.append(el("p", "font-semibold text-foreground", r.name));
  const close = el("button", "text-muted-foreground hover:text-foreground", "✕");
  close.type = "button";
  close.setAttribute("aria-label", "닫기");
  close.onclick = onClose;
  head.append(close);
  root.append(head);

  const meta = [r.category, r.subcategory].filter(Boolean).join(" · ");
  if (meta) root.append(el("p", "text-xs text-muted-foreground", meta));
  if (r.rating) {
    root.append(
      el(
        "p",
        "mt-1 text-xs",
        `★ ${r.rating.score.toFixed(1)} (${r.rating.count.toLocaleString("ko-KR")}) Google`,
      ),
    );
  }
  if (r.walkMeters !== undefined) {
    root.append(el("p", "text-xs text-muted-foreground", `도보 ${walkMinutes(r.walkMeters)}분 · ${r.walkMeters}m`));
  }
  if (r.menu?.[0]) {
    const m = r.menu[0];
    root.append(
      el("p", "text-xs", m.price !== undefined ? `${m.name} ${m.price.toLocaleString("ko-KR")}원` : m.name),
    );
  }
  const links = mapLinks(r);
  const row = el("div", "mt-2 flex gap-1.5");
  for (const [label, href] of [
    ["네이버지도", links.naver],
    ["카카오맵", links.kakao],
  ] as const) {
    const a = el("a", "rounded-full border border-border px-2 py-0.5 text-xs hover:bg-muted", label);
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
};

export function RestaurantMap({ restaurants, office }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ kakao: Kakao; map: KakaoMap } | null>(null);
  const layers = useRef<Overlay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const located = useMemo(() => restaurants.filter((r) => r.location), [restaurants]);

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

    const bounds = new kakao.maps.LatLngBounds();
    let popup: Overlay | null = null;

    if (office) {
      const pos = new kakao.maps.LatLng(office.lat, office.lng);
      const label = el(
        "div",
        "rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow",
        `회사 · ${office.name}`,
      );
      const o = new kakao.maps.CustomOverlay({ position: pos, content: label, yAnchor: 1.6, zIndex: 2 });
      o.setMap(map);
      layers.current.push(o);
      bounds.extend(pos);
    }

    for (const r of located) {
      const pos = new kakao.maps.LatLng(r.location!.lat, r.location!.lng);
      const marker = new kakao.maps.Marker({ position: pos, title: r.name });
      marker.setMap(map);
      layers.current.push(marker);
      bounds.extend(pos);
      kakao.maps.event.addListener(marker, "click", () => {
        popup?.setMap(null);
        const o = new kakao.maps.CustomOverlay({
          position: pos,
          content: card(r, () => o.setMap(null)),
          yAnchor: 1.25,
          zIndex: 3,
        });
        o.setMap(map);
        layers.current.push(o);
        popup = o;
      });
    }

    if (located.length > 0) map.setBounds(bounds);
  }, [ready, located, office]);

  if (!KAKAO_KEY) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/50 p-6 text-center text-sm text-muted-foreground">
        카카오 지도 키(NEXT_PUBLIC_KAKAO_MAP_KEY)가 설정되지 않아 지도를 표시할 수 없습니다. 각 가게의
        카카오맵·네이버지도 버튼을 이용해 주세요.
      </div>
    );
  }

  return (
    <section aria-label="맛집 지도" className="space-y-2">
      <div
        ref={box}
        className="h-[420px] w-full overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-lift"
      />
      <p className="text-xs text-muted-foreground">
        {error ??
          (located.length === restaurants.length
            ? `${located.length}곳 표시`
            : `${located.length}곳 표시 · 위치를 모르는 ${restaurants.length - located.length}곳은 아래 목록에서 확인하세요`)}
      </p>
    </section>
  );
}
