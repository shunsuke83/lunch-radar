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
  "Gyeonggi-do": "경기",
  Gangwon: "강원",
  Jeju: "제주",
  "Jeju-do": "제주",
  Chungbuk: "충북",
  Chungnam: "충남",
  Jeonbuk: "전북",
  Jeonnam: "전남",
  Gyeongbuk: "경북",
  Gyeongnam: "경남",
};

/** Rough WGS84 boxes for outlier detection (latMin, latMax, lngMin, lngMax). */
export const PROVINCE_BBOX = {
  서울: [37.42, 37.72, 126.76, 127.22],
  부산: [34.95, 35.40, 128.80, 129.30],
  대구: [35.70, 36.05, 128.40, 128.80],
  인천: [37.20, 37.70, 126.30, 126.90],
  광주: [35.05, 35.30, 126.70, 127.05],
  대전: [36.20, 36.50, 127.25, 127.55],
  울산: [35.40, 35.75, 129.05, 129.50],
  세종: [36.40, 36.65, 127.15, 127.40],
  경기: [36.85, 38.30, 126.35, 127.90],
  강원: [37.00, 38.65, 127.00, 129.40],
  충북: [36.35, 37.25, 127.25, 128.70],
  충남: [35.95, 37.10, 125.95, 127.70],
  전북: [35.25, 36.15, 126.35, 127.85],
  전남: [34.20, 35.55, 125.90, 127.85],
  경북: [35.55, 37.10, 128.00, 129.65],
  경남: [34.55, 35.70, 127.55, 129.30],
  제주: [33.10, 33.60, 126.10, 126.98],
};

const EN_DISTRICT = {
  gangnam: "강남구",
  seocho: "서초구",
  songpa: "송파구",
  mapo: "마포구",
  yongsan: "용산구",
  jung: "중구",
  jongno: "종로구",
  seongdong: "성동구",
  gwangjin: "광진구",
  dongdaemun: "동대문구",
  jungnang: "중랑구",
  seongbuk: "성북구",
  gangbuk: "강북구",
  dobong: "도봉구",
  nowon: "노원구",
  eunpyeong: "은평구",
  seodaemun: "서대문구",
  yangcheon: "양천구",
  gangseo: "강서구",
  guro: "구로구",
  geumcheon: "금천구",
  yeongdeungpo: "영등포구",
  dongjak: "동작구",
  gwanak: "관악구",
  gangdong: "강동구",
  bundang: "분당구",
  suwon: "수원시",
  seongnam: "성남시",
  yongin: "용인시",
  goyang: "고양시",
  bucheon: "부천시",
  ansan: "안산시",
  anyang: "안양시",
  namyangju: "남양주시",
  hwaseong: "화성시",
  paju: "파주시",
  siheung: "시흥시",
  gimpo: "김포시",
  gwangmyeong: "광명시",
  gunpo: "군포시",
  uiwang: "의왕시",
  hanam: "하남시",
  osan: "오산시",
  icheon: "이천시",
  anseong: "안성시",
  pyeongtaek: "평택시",
  dongducheon: "동두천시",
  guri: "구리시",
  yangju: "양주시",
  pocheon: "포천시",
  yeoju: "여주시",
  gapyeong: "가평군",
  yangpyeong: "양평군",
  yeoncheon: "연천군",
};

export function locationInProvince(province, lat, lng) {
  const box = PROVINCE_BBOX[province];
  if (!box || lat == null || lng == null) return true;
  const [latMin, latMax, lngMin, lngMax] = box;
  return lat >= latMin && lat <= latMax && lng >= lngMin && lng <= lngMax;
}

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

  // English: "Gangnam-gu" / "Bundang-gu" / "Seongnam-si, Bundang-gu"
  const guEn = text.match(/\b([A-Za-z]+(?:-[A-Za-z]+)?)-(?:gu|si|gun)\b/i);
  if (guEn) {
    const key = guEn[1].toLowerCase().replace(/-/g, "");
    const district = EN_DISTRICT[key] ?? `${guEn[1][0].toUpperCase()}${guEn[1].slice(1).toLowerCase()}구`;
    if (!province) {
      if (/Gyeonggi/i.test(text)) province = "경기";
      else if (/Seoul/i.test(text)) province = "서울";
      else if (/Busan/i.test(text)) province = "부산";
      else province = /구$/.test(district) ? "서울" : "경기";
    }
    return { province, district };
  }

  // Broken mixed tokens like "Bundang구"
  const mixed = text.match(/\b([A-Za-z]+)구\b/);
  if (mixed) {
    const key = mixed[1].toLowerCase();
    const district = EN_DISTRICT[key] ?? `${mixed[1]}구`;
    return { province: province ?? (/Gyeonggi|경기/i.test(text) ? "경기" : "서울"), district };
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
