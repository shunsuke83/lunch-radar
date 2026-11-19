/** Shared province/district parsing for nationwide catalog imports. */

export const PROVINCES = {
  서울: { id: "seoul", label: "서울" },
  부산: { id: "busan", label: "부산" },
  대구: { id: "daegu", label: "대구" },
  인천: { id: "incheon", label: "인천" },
  광주: { id: "gwangju", label: "광주" },
  대전: { id: "daejeon", label: "대전" },
  울산: { id: "ulsan", label: "울산" },
  세종: { id: "sejong", label: "세종" },
  경기: { id: "gyeonggi", label: "경기" },
  강원: { id: "gangwon", label: "강원" },
  충북: { id: "chungbuk", label: "충북" },
  충남: { id: "chungnam", label: "충남" },
  전북: { id: "jeonbuk", label: "전북" },
  전남: { id: "jeonnam", label: "전남" },
  경북: { id: "gyeongbuk", label: "경북" },
  경남: { id: "gyeongnam", label: "경남" },
  제주: { id: "jeju", label: "제주" },
};

export const PROVINCE_ALIASES = {
  서울특별시: "서울",
  부산광역시: "부산",
  대구광역시: "대구",
  인천광역시: "인천",
  광주광역시: "광주",
  대전광역시: "대전",
  울산광역시: "울산",
  세종특별자치시: "세종",
  경기도: "경기",
  강원도: "강원",
  강원특별자치도: "강원",
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전북특별자치도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
  제주특별자치도: "제주",
  Seoul: "서울",
  Busan: "부산",
  Incheon: "인천",
  Daegu: "대구",
  Daejeon: "대전",
  Gwangju: "광주",
  Ulsan: "울산",
  Sejong: "세종",
  Gyeonggi: "경기",
  Gangwon: "강원",
  Jeju: "제주",
};

const METRO = /^(서울|부산|대구|인천|광주|대전|울산)(특별시|광역시)?$/;
const PROVINCE_TAIL = /(특별시|광역시|특별자치시|특별자치도|도)$/;

/** True if token looks like 시·군·구 (not a metro province name). */
export function isDistrictToken(token) {
  const t = String(token ?? "").replace(/,$/, "");
  if (!t || t === "세종") return t === "세종";
  if (METRO.test(t) || PROVINCE_TAIL.test(t)) return false;
  return /(시|군|구)$/.test(t);
}

/**
 * Pick 시·군·구 from a free-form address (Korean or mixed).
 * Avoids using road names (…로/…길) as district.
 */
export function parseRegion(address, cityHint) {
  const text = String(address ?? "").trim();
  const parts = text.split(/[\s,]+/).map((p) => p.replace(/,$/, "")).filter(Boolean);

  // Province from leading token or city hint
  let province;
  const headAlias = PROVINCE_ALIASES[parts[0]] ?? (PROVINCES[parts[0]] ? parts[0] : undefined);
  if (headAlias && PROVINCES[headAlias]) province = headAlias;
  if (parts[0]?.startsWith("전남광주")) {
    province = parts[1]?.endsWith("구") ? "광주" : "전남";
  }
  if (!province && cityHint) {
    const c = PROVINCE_ALIASES[cityHint] ?? cityHint;
    if (PROVINCES[c]) province = c;
  }
  if (!province && /Seoul/i.test(text)) province = "서울";
  if (!province && /Gyeonggi|경기/i.test(text)) province = "경기";

  // District: first 시/군/구 token in the address
  for (const p of parts) {
    if (isDistrictToken(p)) {
      if (p === "세종" || p.startsWith("세종")) return { province: "세종", district: "세종" };
      // Infer province for "강남구 …" without 서울 prefix
      if (!province) {
        if (/구$/.test(p)) province = "서울";
        else return undefined;
      }
      return { province, district: p };
    }
  }

  // English: "Gangnam-gu" / "Seocho-gu"
  const guEn = text.match(/\b([A-Za-z]+(?:-[A-Za-z]+)?)-gu\b/i)?.[1];
  if (guEn) {
    const district = `${guEn[0].toUpperCase()}${guEn.slice(1).toLowerCase()}구`;
    return { province: province ?? "서울", district };
  }

  if (province === "세종") return { province, district: "세종" };
  return undefined;
}

/** District is usable in UI filters (시·군·구), not a road or bare province. */
export function isValidDistrict(district) {
  const d = String(district ?? "");
  if (!d) return false;
  // 세종은 시·도이자 유일한 시·군·구 단위.
  if (d === "세종") return true;
  // Bare metro/province names are not districts.
  if (d === "서울" || PROVINCES[d]) return false;
  if (/[로길]$/.test(d) || /\d/.test(d)) return false;
  return isDistrictToken(d);
}
