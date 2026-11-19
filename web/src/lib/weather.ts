import type { GeoPoint } from "@/lib/catalog";

export type WeatherSnapshot = {
  /** WMO weather code. */
  code: number;
  precipProb: number;
  isRainy: boolean;
};

/** Open-Meteo current weather; no API key. */
export async function fetchWeather(point: GeoPoint): Promise<WeatherSnapshot | null> {
  try {
    const params = new URLSearchParams({
      latitude: String(point.lat),
      longitude: String(point.lng),
      current: "weather_code,precipitation_probability",
      timezone: "Asia/Seoul",
    });
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      current?: { weather_code?: number; precipitation_probability?: number };
    };
    const code = data.current?.weather_code ?? 0;
    const precipProb = data.current?.precipitation_probability ?? 0;
    // WMO: 51–67 drizzle/rain, 80–82 showers, 95+ thunder
    const isRainy =
      precipProb >= 50 ||
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82) ||
      code >= 95;
    return { code, precipProb, isRainy };
  } catch {
    return null;
  }
}
