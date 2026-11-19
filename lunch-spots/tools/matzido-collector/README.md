# 네이버 맛동여지도 수집기

Playwright로 `booking.map.naver.com/promotions/...` 공개 기획전을 스크롤·카테고리 전환하며 장소 ID를 모읍니다.

```powershell
cd lunch-spots/tools/matzido-collector
py -3 -m pip install playwright
py -3 -m playwright install chromium
py -3 collect_matzido.py --seed naver_matzido_2026_places.csv
```

결과 CSV를 전국 카탈로그에 넣으려면:

```powershell
cd lunch-spots
npm run catalog:matzido -- ..\tools\matzido-collector\matzido_all_places.csv
```

시드 파일만 넣을 때:

```powershell
npm run catalog:matzido -- ..\tools\matzido-collector\naver_matzido_2026_places.csv
```
