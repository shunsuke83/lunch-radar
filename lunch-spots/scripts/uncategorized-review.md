# 미분류 재분류 검토

- 생성: 2026-11-20T07:09:59.168Z
- 총 **324**곳 (비식당 후보 54 · 음식점 후보 270)

## 사용 방법

1. 아래 표에서 네이버(N)·카카오(K) 링크를 열어 확인한다.
2. 음식 종류면 `uncategorized-review-template.json`의 해당 키에 `한식`·`중식`·`일식`·`양식`·`아시안`·`분식`·`샐러드`·`카페·디저트`·`주점` 중 하나를 적는다.
3. 식당이 아니면 `"__nonfood__"` 를 적는다 (카탈로그에서 당장 삭제하지 않고 후보 목록으로만 모음).
4. 적용: `node lunch-spots/scripts/apply-uncategorized-review.mjs`

| 지역 | 비식당 후보 | 음식점 후보 | 합계 |
| --- | ---: | ---: | ---: |
| seoul | 2 | 72 | 74 |
| jeonnam | 5 | 36 | 41 |
| gyeonggi | 2 | 36 | 38 |
| jeonbuk | 6 | 28 | 34 |
| chungnam | 4 | 29 | 33 |
| gwangju | 0 | 21 | 21 |
| gyeongbuk | 14 | 5 | 19 |
| chungbuk | 9 | 3 | 12 |
| gyeongnam | 6 | 4 | 10 |
| jeju | 3 | 7 | 10 |
| sejong | 1 | 8 | 9 |
| busan | 0 | 7 | 7 |
| daegu | 0 | 5 | 5 |
| incheon | 0 | 4 | 4 |
| gangwon | 0 | 3 | 3 |
| daejeon | 0 | 2 | 2 |
| ulsan | 2 | 0 | 2 |

## 비식당 후보 (54)

### gyeongbuk (14)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 경신유통 | 경산시 | 축산업용품 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '축산업용품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1157986663) | — | `gyeongbuk/naver-1157986663` |  |
| 대화뜨개방 | 경주시 | 뜨개 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '뜨개'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1815506765) | — | `gyeongbuk/naver-1815506765` |  |
| 동아의료보조기 보청기 | 안동시 | 보청기 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '보청기'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/34417574) | — | `gyeongbuk/naver-34417574` |  |
| 동양인삼사 | 영주시 | 건강기능보조식품 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '건강기능보조식품'. 백년가게 목록에서 온 가게. 인삼을 파는 가게 | [N](https://map.naver.com/p/entry/place/15022718) | — | `gyeongbuk/naver-15022718` |  |
| 동양카정비 | 포항시 | 자동차정비·수리 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '자동차정비·수리'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1227499935) | — | `gyeongbuk/naver-1227499935` |  |
| 라망 앤 브라이덜k | 구미시 | 웨딩드레스·예복 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '웨딩드레스·예복'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/12866819) | — | `gyeongbuk/naver-12866819` |  |
| 류복순침구솜틀집 | 안동시 | 침구·커튼 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '침구·커튼'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/34333016) | — | `gyeongbuk/naver-34333016` |  |
| 영천목탁공예사 | 영천시 | 목공예품 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '목공예품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/11695738) | — | `gyeongbuk/naver-11695738` |  |
| 청림산업안전 | 포항시 | 산업용품 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '산업용품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1944153351) | — | `gyeongbuk/naver-1944153351` |  |
| 청심축산물직판장 | 김천시 | 육류가공·제조 | — | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '육류가공·제조'. 축산물 직판장. 출처 목록 없음 | [N](https://map.naver.com/p/entry/place/1057658045) | [K](https://place.map.kakao.com/580581710) | `gyeongbuk/naver-1057658045` |  |
| 충주건축자재 | 포항시 | 건축자재·용품 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '건축자재·용품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/19543269) | — | `gyeongbuk/naver-19543269` |  |
| 퀼트하우스 | 문경시 | 퀼트 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '퀼트'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/11554215) | — | `gyeongbuk/naver-11554215` |  |
| 현악기사 | 안동시 | 악기 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '악기'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/15370232) | — | `gyeongbuk/naver-15370232` |  |
| VIP 테일러 | 구미시 | 남성정장 | 세월을 담은 백년가게, 경북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '남성정장'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/34093046) | — | `gyeongbuk/naver-34093046` |  |

### chungbuk (9)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 성충문구 | 충주시 | 종합사무용품 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '종합사무용품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/13479825) | — | `chungbuk/naver-13479825` |  |
| 송호관광지 | 영동군 | 지역명소 | — | 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '지역명소'. 메뉴 칸에 야영장 요금이 들어 있음 | [N](https://map.naver.com/p/entry/place/13298947) | — | `chungbuk/naver-13298947` |  |
| 신광주방 | 충주시 | 주방용품 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '주방용품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/13020612) | — | `chungbuk/naver-13020612` |  |
| 신화당 | 보은군 | 결혼예물 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '결혼예물'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/11679902) | — | `chungbuk/naver-11679902` |  |
| 신흥지업사 | 음성군 | 벽지·장판·마루 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '벽지·장판·마루'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/37868226) | — | `chungbuk/naver-37868226` |  |
| 이건창호 통합 전시장 한우창호 | 청주시 | 건축·토목 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '건축·토목'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/20819860) | — | `chungbuk/naver-20819860` |  |
| 이재천바버샵 | 증평군 | 이용원 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '이용원'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/17747261) | — | `chungbuk/naver-17747261` |  |
| 청주폐백 | 청주시 | 폐백·이바지음식 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '폐백·이바지음식'. 백년가게 목록에서 온 가게. 폐백 음식을 만들어 파는 곳. 앉아서 먹는 식당이 아님 | [N](https://map.naver.com/p/entry/place/13354956) | — | `chungbuk/naver-13354956` |  |
| HSDI | 충주시 | 옥외·전시광고 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '옥외·전시광고'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/11888432) | — | `chungbuk/naver-11888432` |  |

### gyeongnam (6)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 보곡당 | 창원시 | 귀금속·시계 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '귀금속·시계'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/36444877) | — | `gyeongnam/naver-36444877` |  |
| 세이코알바 대경사 | 창원시 | 시계 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '시계'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/31012987) | — | `gyeongnam/naver-31012987` |  |
| 윤스캠퍼 | 진주시 | 자동차용품·액세서리 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '자동차용품·액세서리'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/20059735) | — | `gyeongnam/naver-20059735` |  |
| 창원푸드 | 창원시 | 식료품 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '식료품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/60512369) | — | `gyeongnam/naver-60512369` |  |
| 학성실크 | 진주시 | 원단·섬유·직물 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '원단·섬유·직물'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1440043994) | — | `gyeongnam/naver-1440043994` |  |
| 황금당 | 양산시 | 귀금속·시계 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '귀금속·시계'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/15627781) | — | `gyeongnam/naver-15627781` |  |

### jeonbuk (6)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 국제금고사 | 군산시 | 금고 | 세월을 담은 백년가게, 전북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '금고'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/13530975) | — | `jeonbuk/naver-13530975` |  |
| 대영장식지물총판 | 군산시 | 도배공사 | 세월을 담은 백년가게, 전북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '도배공사'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/17149458) | — | `jeonbuk/naver-17149458` |  |
| 바이크나라 | 전주시 | 오토바이 | 세월을 담은 백년가게, 전북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '오토바이'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/11712324) | — | `jeonbuk/naver-11712324` |  |
| 유림국기상패사 | 전주시 | 트로피·상패 | 세월을 담은 백년가게, 전북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '트로피·상패'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/11685665) | — | `jeonbuk/naver-11685665` |  |
| 일도당 | 군산시 | 도장 | 세월을 담은 백년가게, 전북 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '도장'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/32237054) | — | `jeonbuk/naver-32237054` |  |
| 화산축산 | 전주시 | 축산업 | 세월을 담은 백년가게, 전북 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '축산업'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/19917725) | — | `jeonbuk/naver-19917725` |  |

### jeonnam (5)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 삼성굴비 | 영광군 | 건어물 | 세월을 담은 백년가게, 전남 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '건어물'. 백년가게 목록에서 온 가게. 굴비를 파는 가게 | [N](https://map.naver.com/p/entry/place/16959311) | — | `jeonnam/naver-16959311` |  |
| 아랑주한일침구한복 | 함평군 | 침구·커튼 | 세월을 담은 백년가게, 전남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '침구·커튼'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/16913139) | — | `jeonnam/naver-16913139` |  |
| 유진테일러 | 목포시 | 남성정장 | 세월을 담은 백년가게, 전남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '남성정장'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1581623220) | — | `jeonnam/naver-1581623220` |  |
| 일성의류타운 | 순천시 | 종합패션 | 세월을 담은 백년가게, 전남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '종합패션'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/13326728) | — | `jeonnam/naver-13326728` |  |
| 진성공예 | 담양군 | 판촉·기념품 | 세월을 담은 백년가게, 전남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '판촉·기념품'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/17170527) | — | `jeonnam/naver-17170527` |  |

### chungnam (4)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 보령자동차공업사 | 보령시 | 자동차정비·수리 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '자동차정비·수리'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1108740272) | — | `chungnam/naver-1108740272` |  |
| 비전농장 | 홍성군 | 농공시설 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '농공시설'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1674061794) | — | `chungnam/naver-1674061794` |  |
| 정문농산 | 아산시 | 곡류 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '곡류'. 백년가게 목록에서 온 가게. 메뉴 칸에 쌀·잡곡 품목이 들어 있음 | [N](https://map.naver.com/p/entry/place/1221015199) | — | `chungnam/naver-1221015199` |  |
| 청천영농조합법인 | 보령시 | 곡물가공·제조 | 세월을 담은 백년가게, 충청 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '곡물가공·제조'. 백년가게 목록에서 온 가게. 메뉴 칸에 쌀 품목이 들어 있음 | [N](https://map.naver.com/p/entry/place/1754354427) | — | `chungnam/naver-1754354427` |  |

### jeju (3)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 어쩌다가 | 제주시 | 민박 | 도민이의 제주맛집 | 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '민박'. 맛집 목록('도민이의 제주맛집')에서 왔는데 네이버에는 민박으로 등록됨. 다른 장소와 잘못 연결됐을 수 있음 | [N](https://map.naver.com/p/entry/place/1443246875) | [K](https://place.map.kakao.com/1417762266) | `jeju/naver-1443246875` |  |
| 월령포구 | 제주시 | 페리·해운 | 도민이의 제주맛집 | 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '페리·해운'. 맛집 목록('도민이의 제주맛집')에서 왔는데 포구로 등록됨. 주소도 '제주시'까지만 있어 장소가 잘못 연결된 것으로 보임 | [N](https://map.naver.com/p/entry/place/17022827) | [K](https://place.map.kakao.com/1741547689) | `jeju/naver-17022827` |  |
| 중앙사진관 | 서귀포시 | 디지털인화 | 세월을 담은 백년가게, 제주 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '디지털인화'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/16936114) | — | `jeju/naver-16936114` |  |

### gyeonggi (2)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 대성리국민관광지 | 가평군 | 유원지 | — | 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '유원지'. 메뉴 칸에 입장 요금이 들어 있음 | [N](https://map.naver.com/p/entry/place/13418367) | — | `gyeonggi/naver-13418367` |  |
| 한탄강관광지 오토캠핑장 | 연천군 | 자연명소 | — | 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '자연명소'. 메뉴 칸에 야영장·캐라반이 들어 있음 | [N](https://map.naver.com/p/entry/place/12917377) | — | `gyeonggi/naver-12917377` |  |

### seoul (2)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1101 뮤지엄 | 서초구 | 전시관 | — | 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '전시관'. 예술의전당 안 전시 공간으로 등록됨. 출처 목록 없음 | [N](https://map.naver.com/p/entry/place/1534702143) | — | `seoul/naver-1534702143` |  |
| 온하루 | 종로구 | 식료품 | 맛준 맛집 | 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '식료품'. 맛집 목록('맛준 맛집')에서 왔지만 무엇을 파는 곳인지 확인하지 못함 | [N](https://map.naver.com/p/entry/place/1763776172) | [K](https://place.map.kakao.com/710442387) | `seoul/naver-1763776172` |  |

### ulsan (2)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1번가양복점 | 남구 | 남성정장 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '남성정장'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/37755162) | — | `ulsan/naver-37755162` |  |
| 선경혼수전문백화점 | 중구 | 이불·담요 | 세월을 담은 백년가게, 경남 | 비식당 | 식당이 아님 (다른 업종) / 종류 값 '이불·담요'. 백년가게 목록에서 온 가게 | [N](https://map.naver.com/p/entry/place/1074842972) | — | `ulsan/naver-1074842972` |  |

### sejong (1)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 뒤웅박고을 | 세종 | 테마공원 | — | 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '테마공원'. 공원 자체가 등록됨. 출처 목록 없음 | [N](https://map.naver.com/p/entry/place/13272841) | [K](https://place.map.kakao.com/781272239) | `sejong/naver-13272841` |  |

## 음식점 후보 (미확정) (270)

### seoul (72)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1808 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1557155795/home) | [K](https://place.map.kakao.com/1146706900) | `seoul/naver-1557155795` |  |
| 갈대포 | 관악구 | — | Sikr | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 | — | [K](https://place.map.kakao.com/1047245706) | `seoul/kakao-1047245706` |  |
| 굽 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '굽'은 구이를 떠올리게 하지만 무엇을 굽는지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1366205207/home) | [K](https://place.map.kakao.com/1781786214) | `seoul/naver-1366205207` |  |
| 그루트 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2098303895/home) | [K](https://place.map.kakao.com/722488533) | `seoul/naver-2098303895` |  |
| 그룬트 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1048776964/home) | [K](https://place.map.kakao.com/2135234063) | `seoul/naver-1048776964` |  |
| 까사꼬네호 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2040225659/home) | [K](https://place.map.kakao.com/1627183009) | `seoul/naver-2040225659` |  |
| 나린제 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2092472020/home) | [K](https://place.map.kakao.com/539672530) | `seoul/naver-2092472020` |  |
| 넓은마당 | 노원구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2054341602/home) | [K](https://place.map.kakao.com/19264986) | `seoul/naver-2054341602` |  |
| 다팀 | 서초구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1386154822/home) | [K](https://place.map.kakao.com/1968288855) | `seoul/naver-1386154822` |  |
| 대양장 | 서대문구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1074749296/home) | [K](https://place.map.kakao.com/781032986) | `seoul/naver-1074749296` |  |
| 동남방앗간 한남점 | 용산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1938018806/home) | [K](https://place.map.kakao.com/2082780426) | `seoul/naver-1938018806` |  |
| 둥우리 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2094093935/home) | [K](https://place.map.kakao.com/437902138) | `seoul/naver-2094093935` |  |
| 랑게 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1739638792/home) | [K](https://place.map.kakao.com/413567097) | `seoul/naver-1739638792` |  |
| 로그 성수 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2091607037/home) | [K](https://place.map.kakao.com/1809908742) | `seoul/naver-2091607037` |  |
| 맥그리코 혜화대학로점 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2061812129/home) | [K](https://place.map.kakao.com/1087177415) | `seoul/naver-2061812129` |  |
| 멘쿠도 성수점 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '멘'(면)으로 보아 라멘·면 요리 같지만 일식인지 다른 면 요리인지 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2096559480/home) | [K](https://place.map.kakao.com/1643913809) | `seoul/naver-2096559480` |  |
| 밀라노식당 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '밀라노'로 보아 이탈리안(양식) 같지만 '식당'이라 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1309585620/home) | [K](https://place.map.kakao.com/1639985680) | `seoul/naver-1309585620` |  |
| 바위드 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1023957785/home) | [K](https://place.map.kakao.com/1265684236) | `seoul/naver-1023957785` |  |
| 반지하 선릉점 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2040091689/home) | [K](https://place.map.kakao.com/66232959) | `seoul/naver-2040091689` |  |
| 베리키친 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '키친'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/36379024/home) | [K](https://place.map.kakao.com/26644530) | `seoul/naver-36379024` |  |
| 베이킹 도우 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '도우·오븐'은 베이커리(카페·디저트)일 수도, 피자집(양식)일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/37282209/home) | [K](https://place.map.kakao.com/1174216011) | `seoul/naver-37282209` |  |
| 보또비노 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '비노'(와인)로 보아 와인바(주점)나 이탈리안(양식) 중 하나로 보임. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1635873247/home) | [K](https://place.map.kakao.com/691956619) | `seoul/naver-1635873247` |  |
| 브라운 에비뉴 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/35545619/home) | [K](https://place.map.kakao.com/295738267) | `seoul/naver-35545619` |  |
| 비바 | 서대문구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2087485549/home) | [K](https://place.map.kakao.com/182374697) | `seoul/naver-2087485549` |  |
| 비오 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2004379803/home) | [K](https://place.map.kakao.com/16790031) | `seoul/naver-2004379803` |  |
| 빅러브토마토 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2066965601/home) | [K](https://place.map.kakao.com/1313538079) | `seoul/naver-2066965601` |  |
| 빅테일 동묘 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1274948513/home) | [K](https://place.map.kakao.com/1051704136) | `seoul/naver-1274948513` |  |
| 빌라토 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1862358398/home) | [K](https://place.map.kakao.com/859722690) | `seoul/naver-1862358398` |  |
| 산수 사당본점 | 동작구 | — | Sikr | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | — | [K](https://place.map.kakao.com/16818524) | `seoul/kakao-16818524` |  |
| 섬소년자연주의 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/19878363/home) | [K](https://place.map.kakao.com/9177796) | `seoul/naver-19878363` |  |
| 실비무교 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '실비'(실비집)로 보아 술집(주점)이나 한식 백반 중 하나로 보임. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2034786984/home) | [K](https://place.map.kakao.com/2034865825) | `seoul/naver-2034786984` |  |
| 아웃오브오더 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1334028812/home) | [K](https://place.map.kakao.com/341830706) | `seoul/naver-1334028812` |  |
| 아후 Ahoo | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1912626916/home) | [K](https://place.map.kakao.com/1984445511) | `seoul/naver-1912626916` |  |
| 알렉스루카 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2092502028/home) | [K](https://place.map.kakao.com/1648318295) | `seoul/naver-2092502028` |  |
| 앵그리누들 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 검색 결과가 '에그누들'라서 한 카테고리로 정하지 못함. '누들'만으로는 어떤 면 요리인지 알 수 없음 [다이닝코드](https://www.diningcode.com/profile.php?rid=n6LDr2LTpcb3) | [N](https://m.place.naver.com/restaurant/2022737326/home) | [K](https://place.map.kakao.com/1348542185) | `seoul/naver-2022737326` |  |
| 어구생 | 서대문구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2092681070/home) | [K](https://place.map.kakao.com/1012476566) | `seoul/naver-2092681070` |  |
| 어부이야기 | 서초구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '어부'로 보아 해산물집 같지만 횟집(한식)인지 술집(주점)인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1596684844/home) | [K](https://place.map.kakao.com/763843172) | `seoul/naver-1596684844` |  |
| 에스메로 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1736738437/home) | [K](https://place.map.kakao.com/935640631) | `seoul/naver-1736738437` |  |
| 연희 바다 | 서대문구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2032357843/home) | [K](https://place.map.kakao.com/1148500584) | `seoul/naver-2032357843` |  |
| 올리멘 강남 빗썸금융타워점 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '멘'(면)으로 보아 라멘·면 요리 같지만 일식인지 다른 면 요리인지 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2012444424/home) | [K](https://place.map.kakao.com/1673109103) | `seoul/naver-2012444424` |  |
| 우치야 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2029371902/home) | [K](https://place.map.kakao.com/820131720) | `seoul/naver-2029371902` |  |
| 움푹 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1923586497/home) | [K](https://place.map.kakao.com/487138785) | `seoul/naver-1923586497` |  |
| 이와자루 성수 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1974548944/home) | [K](https://place.map.kakao.com/54225688) | `seoul/naver-1974548944` |  |
| 이케 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1983944498/home) | [K](https://place.map.kakao.com/593647129) | `seoul/naver-1983944498` |  |
| 제야 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1286056717/home) | [K](https://place.map.kakao.com/1695561303) | `seoul/naver-1286056717` |  |
| 종로클라쓰 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2039056625/home) | [K](https://place.map.kakao.com/990942830) | `seoul/naver-2039056625` |  |
| 청춘식당미래소년 | 서초구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/36651713/home) | [K](https://place.map.kakao.com/25633306) | `seoul/naver-36651713` |  |
| 카루 | 서초구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/38264451/home) | [K](https://place.map.kakao.com/227441671) | `seoul/naver-38264451` |  |
| 칸트힐 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2008465062/home) | [K](https://place.map.kakao.com/115363805) | `seoul/naver-2008465062` |  |
| 쿠히치 압구정점 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1826026569/home) | [K](https://place.map.kakao.com/370642730) | `seoul/naver-1826026569` |  |
| 키노이에 파티 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 키노이에(일식)의 자매점으로 보이지만 같은 메뉴인지 확인하지 못함. 일식 아니면 주점. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2094230942/home) | [K](https://place.map.kakao.com/527159312) | `seoul/naver-2094230942` |  |
| 키슌 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1074062899/home) | [K](https://place.map.kakao.com/1113615076) | `seoul/naver-1074062899` |  |
| 키친봄날 | 서대문구 | — | Sikr, 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '키친'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1590626814/home) | [K](https://place.map.kakao.com/1573253740) | `seoul/kakao-1573253740` |  |
| 토리비 합정점 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '토리'(닭)가 든 일본어풍 이름. 야키토리(주점)일 가능성이 높지만 일식 닭요리일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1837437884/home) | [K](https://place.map.kakao.com/545932119) | `seoul/naver-1837437884` |  |
| 토파 | 강남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2039983018/home) | [K](https://place.map.kakao.com/415888006) | `seoul/naver-2039983018` |  |
| 토피 | 서초구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2094972347/home) | [K](https://place.map.kakao.com/1645888209) | `seoul/naver-2094972347` |  |
| 팬톤 클래식 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1662708681/home) | [K](https://place.map.kakao.com/1045051140) | `seoul/naver-1662708681` |  |
| 포도젝트 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '포도'로 보아 와인바(주점) 같지만 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1732986089/home) | [K](https://place.map.kakao.com/80972708) | `seoul/naver-1732986089` |  |
| 프레스코 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2080385901/home) | [K](https://place.map.kakao.com/140903625) | `seoul/naver-2080385901` |  |
| 피엔에이 서촌 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2003857763/home) | [K](https://place.map.kakao.com/1361315797) | `seoul/naver-2003857763` |  |
| 핑퐁서울 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1098697502/home) | [K](https://place.map.kakao.com/1307961934) | `seoul/naver-1098697502` |  |
| 하이브 플레이그라운드 | 용산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2016354571/home) | [K](https://place.map.kakao.com/1715146142) | `seoul/naver-2016354571` |  |
| 해누리 | 강서구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1705177116/home) | [K](https://place.map.kakao.com/1173275063) | `seoul/naver-1705177116` |  |
| 해방촌 이음 | 용산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2095019461/home) | [K](https://place.map.kakao.com/190932092) | `seoul/naver-2095019461` |  |
| 헨릭 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2000889807/home) | [K](https://place.map.kakao.com/1763765181) | `seoul/naver-2000889807` |  |
| 호랭이카노 | 성동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1856927545/home) | [K](https://place.map.kakao.com/1216111405) | `seoul/naver-1856927545` |  |
| 홍대 교도리 | 마포구 | — | Sikr, 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1305041689/home) | [K](https://place.map.kakao.com/803910728) | `seoul/kakao-803910728` |  |
| 화계장 | 노원구 | — | Sikr | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | — | [K](https://place.map.kakao.com/1749957373) | `seoul/kakao-1749957373` |  |
| 화락관 신촌 본점 | 마포구 | — | Sikr | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | — | [K](https://place.map.kakao.com/967124721) | `seoul/kakao-967124721` |  |
| 화류 | 마포구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1011218680/home) | [K](https://place.map.kakao.com/537483826) | `seoul/naver-1011218680` |  |
| 후스테이블 | 종로구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '테이블'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/19873255/home) | [K](https://place.map.kakao.com/13082808) | `seoul/naver-19873255` |  |
| FRAMER | 용산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1774444658/home) | [K](https://place.map.kakao.com/1661424587) | `seoul/naver-1774444658` |  |

### gyeonggi (36)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 감자꽃 | 화성시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1703643550/home) | [K](https://place.map.kakao.com/925658900) | `gyeonggi/naver-1703643550` |  |
| 고고캠 | 용인시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2003441501/home) | [K](https://place.map.kakao.com/1809457999) | `gyeonggi/naver-2003441501` |  |
| 고기리열두화덕 | 용인시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '화덕'은 화덕피자(양식)일 수도, 화덕구이(한식)일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/12874368/home) | [K](https://place.map.kakao.com/7999063) | `gyeonggi/naver-12874368` |  |
| 고래아저씨 오산운암점 | 오산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/1849367304/home) | [K](https://place.map.kakao.com/759378940) | `gyeonggi/naver-1849367304` |  |
| 굿모닝 | 평택시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/31840670/home) | [K](https://place.map.kakao.com/21317224) | `gyeonggi/naver-31840670` |  |
| 다정채 | 광명시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1377037254/home) | [K](https://place.map.kakao.com/935582451) | `gyeonggi/naver-1377037254` |  |
| 매쎄 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2008388043/home) | [K](https://place.map.kakao.com/1080043557) | `gyeonggi/naver-2008388043` |  |
| 바바바 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1114922731/home) | [K](https://place.map.kakao.com/1235606749) | `gyeonggi/naver-1114922731` |  |
| 범 | 화성시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1876356025/home) | [K](https://place.map.kakao.com/1565875336) | `gyeonggi/naver-1876356025` |  |
| 사카나 | 성남시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '사카나'(생선·안주)는 일식일 수도, 이자카야(주점)일 수도 있음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/19877394/home) | [K](https://place.map.kakao.com/349768717) | `gyeonggi/naver-19877394` |  |
| 수원왕가리 북문점 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1263288357/home) | [K](https://place.map.kakao.com/22578375) | `gyeonggi/naver-1263288357` |  |
| 쉐진 동탄점 | 화성시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/34573203/home) | [K](https://place.map.kakao.com/13008816) | `gyeonggi/naver-34573203` |  |
| 심야호선 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1541244584/home) | [K](https://place.map.kakao.com/870183257) | `gyeonggi/naver-1541244584` |  |
| 씨에스타 | 안산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1066313912/home) | [K](https://place.map.kakao.com/25773718) | `gyeonggi/naver-1066313912` |  |
| 어비스 | 과천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1267330619/home) | [K](https://place.map.kakao.com/1039045463) | `gyeonggi/naver-1267330619` |  |
| 에그하우스 | 가평군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '브런(치)·에그'로 보아 브런치 같지만 양식인지 카페·디저트인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2049748405/home) | [K](https://place.map.kakao.com/26417223) | `gyeonggi/naver-2049748405` |  |
| 에이치이에이 | 성남시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1805976617/home) | [K](https://place.map.kakao.com/1793834083) | `gyeonggi/naver-1805976617` |  |
| 역북370 | 용인시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1077429363/home) | [K](https://place.map.kakao.com/827151850) | `gyeonggi/naver-1077429363` |  |
| 열날개 본점 | 김포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '날개'로 보아 닭날개 같지만 치킨집(한식)인지 술집(주점)인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/34033715/home) | [K](https://place.map.kakao.com/360208596) | `gyeonggi/naver-34033715` |  |
| 오브제 | 광주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1707465493/home) | [K](https://place.map.kakao.com/1646309155) | `gyeonggi/naver-1707465493` |  |
| 이토 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1205626834/home) | [K](https://place.map.kakao.com/1526437250) | `gyeonggi/naver-1205626834` |  |
| 일호선 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1356864288/home) | [K](https://place.map.kakao.com/1879186093) | `gyeonggi/naver-1356864288` |  |
| 제이콥스 | 용인시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/37432719/home) | [K](https://place.map.kakao.com/27460137) | `gyeonggi/naver-37432719` |  |
| 지속 | 파주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2005756586/home) | [K](https://place.map.kakao.com/1228469190) | `gyeonggi/naver-2005756586` |  |
| 팔달주택 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1268205327/home) | [K](https://place.map.kakao.com/1138224504) | `gyeonggi/naver-1268205327` |  |
| 포청천 | 시흥시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/16779892/home) | [K](https://place.map.kakao.com/9532833) | `gyeonggi/naver-16779892` |  |
| 푸릴리 수원권선점 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1293118602/home) | [K](https://place.map.kakao.com/587944775) | `gyeonggi/naver-1293118602` |  |
| 플랑문 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1818933986/home) | [K](https://place.map.kakao.com/1694471651) | `gyeonggi/naver-1818933986` |  |
| 하시도 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2019144449/home) | [K](https://place.map.kakao.com/1356090195) | `gyeonggi/naver-2019144449` |  |
| 하쿠다이닝 매교역점 | 수원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '하쿠'는 일본어풍, '다이닝'은 종류를 가리키지 않음. 일식 아니면 주점. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2085554202/home) | [K](https://place.map.kakao.com/438232027) | `gyeonggi/naver-2085554202` |  |
| 한소헌 | 성남시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1453847451/home) | [K](https://place.map.kakao.com/1712259768) | `gyeonggi/naver-1453847451` |  |
| 한울 | 파주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/18440909/home) | [K](https://place.map.kakao.com/1197154042) | `gyeonggi/naver-18440909` |  |
| 해밀리아 셀프바베큐장 | 용인시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '셀프바베큐장'은 고기를 직접 구워 먹는 시설. 식당(한식)으로 볼지 시설로 볼지 정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1393708583/home) | [K](https://place.map.kakao.com/1564018993) | `gyeonggi/naver-1393708583` |  |
| 효경재 | 용인시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2079047311/home) | [K](https://place.map.kakao.com/1016085384) | `gyeonggi/naver-2079047311` |  |
| AMPM | 남양주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2031009094/home) | [K](https://place.map.kakao.com/929669120) | `gyeonggi/naver-2031009094` |  |
| LOW42 | 성남시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 | [N](https://m.place.naver.com/restaurant/2004544425/home) | [K](https://place.map.kakao.com/2039982467) | `gyeonggi/naver-2004544425` |  |

### jeonnam (36)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 구디츠 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1169234483/home) | [K](https://place.map.kakao.com/44631536) | `jeonnam/naver-1169234483` |  |
| 꼬미꼬미 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/16744300/home) | [K](https://place.map.kakao.com/12128976) | `jeonnam/naver-16744300` |  |
| 누아 | 완도군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1107022884/home) | [K](https://place.map.kakao.com/2110926596) | `jeonnam/naver-1107022884` |  |
| 대원정 | 보성군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1766338959/home) | [K](https://place.map.kakao.com/27107712) | `jeonnam/naver-1766338959` |  |
| 만끽 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1586721091/home) | [K](https://place.map.kakao.com/423879521) | `jeonnam/naver-1586721091` |  |
| 만배식탁 순천점 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '식탁'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2090793202/home) | [K](https://place.map.kakao.com/1756351345) | `jeonnam/naver-2090793202` |  |
| 바닐라빌라 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2038975396/home) | [K](https://place.map.kakao.com/1814356400) | `jeonnam/naver-2038975396` |  |
| 바다맛 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/21568910/home) | [K](https://place.map.kakao.com/14644295) | `jeonnam/naver-21568910` |  |
| 버트 | 담양군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1991997120/home) | [K](https://place.map.kakao.com/1386213406) | `jeonnam/naver-1991997120` |  |
| 새벽 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1543297676/home) | [K](https://place.map.kakao.com/2042975355) | `jeonnam/naver-1543297676` |  |
| 서식 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1945036149/home) | [K](https://place.map.kakao.com/1381546924) | `jeonnam/naver-1945036149` |  |
| 소미온 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2030319605/home) | [K](https://place.map.kakao.com/2026042618) | `jeonnam/naver-2030319605` |  |
| 씨펄 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1180349486/home) | [K](https://place.map.kakao.com/28278237) | `jeonnam/naver-1180349486` |  |
| 영영 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2017875990/home) | [K](https://place.map.kakao.com/1804160760) | `jeonnam/naver-2017875990` |  |
| 오수돈생 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '돈'(돼지)으로 보아 돼지고기(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2017170433/home) | [K](https://place.map.kakao.com/1467227169) | `jeonnam/naver-2017170433` |  |
| 오의 여수죽림점 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1429211334/home) | [K](https://place.map.kakao.com/1183561632) | `jeonnam/naver-1429211334` |  |
| 원조 갯내음 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '갯벌·갯내음'으로 보아 조개·해산물(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/36316787/home) | [K](https://place.map.kakao.com/620841278) | `jeonnam/naver-36316787` |  |
| 유달제면소 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1342349148/home) | [K](https://place.map.kakao.com/251088272) | `jeonnam/naver-1342349148` |  |
| 유진정 | 담양군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/16080483/home) | [K](https://place.map.kakao.com/217801379) | `jeonnam/naver-16080483` |  |
| 육사심 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '육'(고기)으로 보아 고깃집(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1480963227/home) | [K](https://place.map.kakao.com/676882996) | `jeonnam/naver-1480963227` |  |
| 일일공오 1105 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1157642817/home) | [K](https://place.map.kakao.com/283220704) | `jeonnam/naver-1157642817` |  |
| 정심 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1521834873/home) | [K](https://place.map.kakao.com/779051961) | `jeonnam/naver-1521834873` |  |
| 정한 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1373493512/home) | [K](https://place.map.kakao.com/1503196759) | `jeonnam/naver-1373493512` |  |
| 정희 순천점 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 여수·순천 말고 서울(김포공항)에도 지점이 있는 가게로 보이지만 무엇을 파는지 확인하지 못함. 같은 가게 2곳. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1208395538/home) | [K](https://place.map.kakao.com/500782419) | `jeonnam/naver-1208395538` |  |
| 정희 여수점 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 여수·순천 말고 서울(김포공항)에도 지점이 있는 가게로 보이지만 무엇을 파는지 확인하지 못함. 같은 가게 2곳. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1036731331/home) | [K](https://place.map.kakao.com/497389774) | `jeonnam/naver-1036731331` |  |
| 족자카야 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '족'(족발)+'자카야'(이자카야)로 읽혀 한식과 주점에 걸침. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1444088650/home) | [K](https://place.map.kakao.com/1382630746) | `jeonnam/naver-1444088650` |  |
| 진상 | 광양시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2027987672/home) | [K](https://place.map.kakao.com/8215861) | `jeonnam/naver-2027987672` |  |
| 짚 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2093297521/home) | [K](https://place.map.kakao.com/1151022592) | `jeonnam/naver-2093297521` |  |
| 초루 | 보성군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1983640525/home) | [K](https://place.map.kakao.com/1711412641) | `jeonnam/naver-1983640525` |  |
| 트라이팟 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1620964854/home) | [K](https://place.map.kakao.com/670031710) | `jeonnam/naver-1620964854` |  |
| 팔미방 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1952419969/home) | [K](https://place.map.kakao.com/1373465606) | `jeonnam/naver-1952419969` |  |
| 피시테리안/피시테리 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '피시'(생선)로 보이지만 양식·일식·한식 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1707024229/home) | [K](https://place.map.kakao.com/1110032587) | `jeonnam/naver-1707024229` |  |
| 하늘지기 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/12867258/home) | [K](https://place.map.kakao.com/8644049) | `jeonnam/naver-12867258` |  |
| 하당일번지 | 목포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/12884698/home) | [K](https://place.map.kakao.com/10860691) | `jeonnam/naver-12884698` |  |
| 하루한모 | 순천시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '한모·콩두'로 보아 두부·콩 요리(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1932387432/home) | [K](https://place.map.kakao.com/638655787) | `jeonnam/naver-1932387432` |  |
| 호시탐탐 | 여수시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1915669393/home) | [K](https://place.map.kakao.com/1647525635) | `jeonnam/naver-1915669393` |  |

### chungnam (29)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 나드리슈퍼 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2085552208/home) | [K](https://place.map.kakao.com/14659994) | `chungnam/naver-2085552208` |  |
| 도모도모 | 아산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2095407872/home) | [K](https://place.map.kakao.com/2093210032) | `chungnam/naver-2095407872` |  |
| 메종초이 | 서산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1621337175/home) | [K](https://place.map.kakao.com/1746053819) | `chungnam/naver-1621337175` |  |
| 미미제면소 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1331431705/home) | [K](https://place.map.kakao.com/359100460) | `chungnam/naver-1331431705` |  |
| 베로 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1807681546/home) | [K](https://place.map.kakao.com/806536018) | `chungnam/naver-1807681546` |  |
| 심도 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1816983607/home) | [K](https://place.map.kakao.com/138926863) | `chungnam/naver-1816983607` |  |
| 아띠 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2089542396/home) | [K](https://place.map.kakao.com/1227814546) | `chungnam/naver-2089542396` |  |
| 연무향 | 논산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2043041660/home) | [K](https://place.map.kakao.com/1266221646) | `chungnam/naver-2043041660` |  |
| 오엔 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/12064600/home) | [K](https://place.map.kakao.com/27507738) | `chungnam/naver-12064600` |  |
| 요무하치 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1176636711/home) | [K](https://place.map.kakao.com/778076400) | `chungnam/naver-1176636711` |  |
| 우미장 동대동 | 보령시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/17481169/home) | [K](https://place.map.kakao.com/8029518) | `chungnam/naver-17481169` |  |
| 우석정 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1799111683/home) | [K](https://place.map.kakao.com/123299789) | `chungnam/naver-1799111683` |  |
| 웬유바이트 | 아산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1246875708/home) | [K](https://place.map.kakao.com/612019340) | `chungnam/naver-1246875708` |  |
| 위트 | 아산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2079739226/home) | [K](https://place.map.kakao.com/26422941) | `chungnam/naver-2079739226` |  |
| 윤이식당 | 아산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1417435666/home) | [K](https://place.map.kakao.com/1520813287) | `chungnam/naver-1417435666` |  |
| 이창 | 논산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1015469914/home) | [K](https://place.map.kakao.com/11413126) | `chungnam/naver-1015469914` |  |
| 종로제면소 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1285355722/home) | [K](https://place.map.kakao.com/627639955) | `chungnam/naver-1285355722` |  |
| 쭈불리 천안신방점 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '쭈'(쭈꾸미)로 읽히면 한식이지만 확실하지 않음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1673137717/home) | [K](https://place.map.kakao.com/802312791) | `chungnam/naver-1673137717` |  |
| 초록온담 김사장 수청점 | 당진시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1931756752/home) | [K](https://place.map.kakao.com/1222714394) | `chungnam/naver-1931756752` |  |
| 카메식당 | 보령시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '카메'는 일본어풍, '식당'은 종류를 가리키지 않음. 일본 가정식으로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1078770555/home) | [K](https://place.map.kakao.com/910633958) | `chungnam/naver-1078770555` |  |
| 컴히얼 청당점 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1247709459/home) | [K](https://place.map.kakao.com/213640032) | `chungnam/naver-1247709459` |  |
| 킨이로텐 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '텐'(튀김)이 든 일본어풍 이름. 텐동·덴푸라(일식)로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1763567934/home) | [K](https://place.map.kakao.com/2143068419) | `chungnam/naver-1763567934` |  |
| 테르니 | 아산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1766550756/home) | [K](https://place.map.kakao.com/931065538) | `chungnam/naver-1766550756` |  |
| 해우 동학사 본점 | 공주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2069151911/home) | [K](https://place.map.kakao.com/2058211388) | `chungnam/naver-2069151911` |  |
| 해탄 성성점 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2065960284/home) | [K](https://place.map.kakao.com/215470272) | `chungnam/naver-2065960284` |  |
| 화육우소 천안두정점 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '육·우'(고기·소)로 보아 소고기 구이(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1976170182/home) | [K](https://place.map.kakao.com/305362983) | `chungnam/naver-1976170182` |  |
| 환희제면 서산점 | 서산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2042596062/home) | [K](https://place.map.kakao.com/1865105778) | `chungnam/naver-2042596062` |  |
| 후미진 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1160032125/home) | [K](https://place.map.kakao.com/1545607075) | `chungnam/naver-1160032125` |  |
| 히든테이블 신부점 | 천안시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '테이블'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1687844194/home) | [K](https://place.map.kakao.com/1399598377) | `chungnam/naver-1687844194` |  |

### jeonbuk (28)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 거북이식탁 | 군산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '식탁'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/167342212/home) | [K](https://place.map.kakao.com/754770338) | `jeonbuk/naver-167342212` |  |
| 도싯골 도청점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/33560267/home) | [K](https://place.map.kakao.com/22018313) | `jeonbuk/naver-33560267` |  |
| 뜨돈 전주혁신점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '돈'(돼지)으로 보이지만 구이(한식)인지 돈카츠(일식)인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2088841342/home) | [K](https://place.map.kakao.com/1207210328) | `jeonbuk/naver-2088841342` |  |
| 마이담 | 진안군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/35084940/home) | [K](https://place.map.kakao.com/21290069) | `jeonbuk/naver-35084940` |  |
| 배치드롬 전주신시가지점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2005476330/home) | [K](https://place.map.kakao.com/857292224) | `jeonbuk/naver-2005476330` |  |
| 봉동 | 완주군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2031245824/home) | [K](https://place.map.kakao.com/10368008) | `jeonbuk/naver-2031245824` |  |
| 부들스 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2071426157/home) | [K](https://place.map.kakao.com/601114760) | `jeonbuk/naver-2071426157` |  |
| 비레레 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1402135242/home) | [K](https://place.map.kakao.com/1352809815) | `jeonbuk/naver-1402135242` |  |
| 서래헌 | 남원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/17350738/home) | [K](https://place.map.kakao.com/12280315) | `jeonbuk/naver-17350738` |  |
| 송범준식당 | 군산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1276248339/home) | [K](https://place.map.kakao.com/964433914) | `jeonbuk/naver-1276248339` |  |
| 송해정 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1321643230/home) | [K](https://place.map.kakao.com/1765334282) | `jeonbuk/naver-1321643230` |  |
| 신사동인동 | 군산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/11726653/home) | [K](https://place.map.kakao.com/1675998657) | `jeonbuk/naver-11726653` |  |
| 씨즐리 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '씨즐'로 보아 스테이크·철판(양식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1783607494/home) | [K](https://place.map.kakao.com/1509001303) | `jeonbuk/naver-1783607494` |  |
| 양누리 신시가지점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '양'이 양고기·양대창을 뜻하는지 확실하지 않음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1119515452/home) | [K](https://place.map.kakao.com/971882197) | `jeonbuk/naver-1119515452` |  |
| 오타마 전주에코시티점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1210338623/home) | [K](https://place.map.kakao.com/1721809999) | `jeonbuk/naver-1210338623` |  |
| 온담 전주본점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1972076667/home) | [K](https://place.map.kakao.com/265761785) | `jeonbuk/naver-1972076667` |  |
| 올리빈 에코시티점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2071554860/home) | [K](https://place.map.kakao.com/1243775664) | `jeonbuk/naver-2071554860` |  |
| 은주 전주에코시티점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 이름이 음식 종류를 가리키지 않음. 같은 가게(은주) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2000080898/home) | [K](https://place.map.kakao.com/361395131) | `jeonbuk/naver-2000080898` |  |
| 정원산책 | 무주군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1044826172/home) | [K](https://place.map.kakao.com/105726147) | `jeonbuk/naver-1044826172` |  |
| 조선별관 | 정읍시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1986395691/home) | [K](https://place.map.kakao.com/13307808) | `jeonbuk/naver-1986395691` |  |
| 츠쿠 | 군산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1372638657/home) | [K](https://place.map.kakao.com/1380818129) | `jeonbuk/naver-1372638657` |  |
| 파쿠야 전주점 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1340584191/home) | [K](https://place.map.kakao.com/1217153732) | `jeonbuk/naver-1340584191` |  |
| 평화주담 | 익산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '주'(酒)로 읽히면 술집(주점)이지만 확실하지 않음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2070188113/home) | [K](https://place.map.kakao.com/967971067) | `jeonbuk/naver-2070188113` |  |
| 포포포 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '포'가 쌀국수를 뜻하는지 확실하지 않음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2024883774/home) | [K](https://place.map.kakao.com/857866854) | `jeonbuk/naver-2024883774` |  |
| 풍요 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2073193247/home) | [K](https://place.map.kakao.com/135220646) | `jeonbuk/naver-2073193247` |  |
| 플뢰르 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1453928815/home) | [K](https://place.map.kakao.com/480922241) | `jeonbuk/naver-1453928815` |  |
| 호리 | 전주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1579003040/home) | [K](https://place.map.kakao.com/886431218) | `jeonbuk/naver-1579003040` |  |
| UNWIND | 군산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2025318584/home) | [K](https://place.map.kakao.com/450504133) | `jeonbuk/naver-2025318584` |  |

### gwangju (21)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 굽탄 | 광산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '굽'+'탄'(숯)으로 보아 숯불구이 같지만 무엇을 굽는지 확인하지 못함. 같은 가게 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/38009666/home) | [K](https://place.map.kakao.com/27602071) | `gwangju/naver-38009666` |  |
| 만선 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '만선'은 해산물집에도 호프집에도 쓰이는 이름. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2048128300/home) | [K](https://place.map.kakao.com/537058265) | `gwangju/naver-2048128300` |  |
| 미옌 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1969902590/home) | [K](https://place.map.kakao.com/1459878793) | `gwangju/naver-1969902590` |  |
| 버몬지 | 광산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1914501085/home) | [K](https://place.map.kakao.com/772293564) | `gwangju/naver-1914501085` |  |
| 산등무 | 동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1168667433/home) | [K](https://place.map.kakao.com/1616260303) | `gwangju/naver-1168667433` |  |
| 수완지구폼 | 광산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1504215821/home) | [K](https://place.map.kakao.com/1852932274) | `gwangju/naver-1504215821` |  |
| 오늘부터애간장 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1469831837/home) | [K](https://place.map.kakao.com/1350097386) | `gwangju/naver-1469831837` |  |
| 은주 광주 용봉직영점 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 이름이 음식 종류를 가리키지 않음. 같은 가게(은주) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2080310949/home) | [K](https://place.map.kakao.com/219494922) | `gwangju/naver-2080310949` |  |
| 이솝 용봉점 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 이름이 음식 종류를 가리키지 않음. 같은 가게(이솝) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2003958342/home) | [K](https://place.map.kakao.com/406535991) | `gwangju/naver-2003958342` |  |
| 진미가람 주월점 | 서구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1659701073/home) | [K](https://place.map.kakao.com/10417509) | `gwangju/naver-1659701073` |  |
| 최정담 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2097797421/home) | [K](https://place.map.kakao.com/1887545470) | `gwangju/naver-2097797421` |  |
| 카키노키 | 동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1124517292/home) | [K](https://place.map.kakao.com/1236025169) | `gwangju/naver-1124517292` |  |
| 코안 | 동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2003905126/home) | [K](https://place.map.kakao.com/1148934744) | `gwangju/naver-2003905126` |  |
| 코엔 | 동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2070310198/home) | [K](https://place.map.kakao.com/731760780) | `gwangju/naver-2070310198` |  |
| 쿠시 봉선 | 남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '쿠시'(꼬치)는 쿠시카츠(일식)일 수도, 꼬치구이 술집(주점)일 수도 있음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2062392068/home) | [K](https://place.map.kakao.com/1250762242) | `gwangju/naver-2062392068` |  |
| 크램드밀 | 동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1283239942/home) | [K](https://place.map.kakao.com/2069589963) | `gwangju/naver-1283239942` |  |
| 털보하우스 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/16303120/home) | [K](https://place.map.kakao.com/13559966) | `gwangju/naver-16303120` |  |
| 파파식당 첨단본점 | 광산구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2093207740/home) | [K](https://place.map.kakao.com/1144092617) | `gwangju/naver-2093207740` |  |
| 해산 상무지구본점 | 서구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '해산'으로 보아 해산물 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/19892102/home) | [K](https://place.map.kakao.com/18396399) | `gwangju/naver-19892102` |  |
| 화릇 | 서구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1991624248/home) | [K](https://place.map.kakao.com/1935369188) | `gwangju/naver-1991624248` |  |
| 훈613 쌍촌본점 | 서구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1259825837/home) | [K](https://place.map.kakao.com/1533625861) | `gwangju/naver-1259825837` |  |

### sejong (8)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 뜰 세종해밀 본점 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1570571248/home) | [K](https://place.map.kakao.com/1218188617) | `sejong/naver-1570571248` |  |
| 라쎄종 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1500436808/home) | [K](https://place.map.kakao.com/1838458013) | `sejong/naver-1500436808` |  |
| 라운지46 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '라운지'는 바(주점)일 수도, 카페일 수도 있음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1956988849/home) | [K](https://place.map.kakao.com/695686940) | `sejong/naver-1956988849` |  |
| 야호래 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1819638410/home) | [K](https://place.map.kakao.com/16962041) | `sejong/naver-1819638410` |  |
| 연화섬 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1656042233/home) | [K](https://place.map.kakao.com/1475809932) | `sejong/naver-1656042233` |  |
| 요이텐 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '텐'(튀김)이 든 일본어풍 이름. 텐동·덴푸라(일식)로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1053411264/home) | [K](https://place.map.kakao.com/809038175) | `sejong/naver-1053411264` |  |
| 임대장 세종나성점 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1177485965/home) | [K](https://place.map.kakao.com/1233161490) | `sejong/naver-1177485965` |  |
| 타키 세종나성점 | 세종 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2069388475/home) | [K](https://place.map.kakao.com/1784435621) | `sejong/naver-2069388475` |  |

### busan (7)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 고원 | 부산진구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1898130354/home) | [K](https://place.map.kakao.com/1187755310) | `busan/naver-1898130354` |  |
| 만개 | 영도구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2098790222/home) | [K](https://place.map.kakao.com/1589038368) | `busan/naver-2098790222` |  |
| 시월 | 부산진구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1230485898/home) | [K](https://place.map.kakao.com/1960020887) | `busan/naver-1230485898` |  |
| 지새우다 서면점 | 부산진구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '새우'를 넣은 말장난 이름. 새우 요리집인지 술집인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2045309062/home) | [K](https://place.map.kakao.com/1570014138) | `busan/naver-2045309062` |  |
| 칠암만장 해운대 | 해운대구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '칠암'(기장 칠암)으로 보아 붕장어·해산물(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2027416077/home) | [K](https://place.map.kakao.com/1444461553) | `busan/naver-2027416077` |  |
| 토암 | 기장군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/place/11622446/home) | [K](https://place.map.kakao.com/8572537) | `busan/naver-11622446` |  |
| 해수 | 서구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2072972807/home) | [K](https://place.map.kakao.com/511099547) | `busan/naver-2072972807` |  |

### jeju (7)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 다린 | 서귀포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/19299856/home) | [K](https://place.map.kakao.com/1228219754) | `jeju/naver-19299856` |  |
| 바다이야기 | 제주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1017616635/home) | [K](https://place.map.kakao.com/9008686) | `jeju/naver-1017616635` |  |
| 오로시 | 제주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1470813244/home) | [K](https://place.map.kakao.com/224842926) | `jeju/naver-1470813244` |  |
| 우도 | 제주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1588676712/home) | [K](https://place.map.kakao.com/8025182) | `jeju/naver-1588676712` |  |
| 우디 | 제주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2084372107/home) | [K](https://place.map.kakao.com/2038013988) | `jeju/naver-2084372107` |  |
| 우주 | 서귀포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1222188712/home) | [K](https://place.map.kakao.com/19585161) | `jeju/naver-1222188712` |  |
| 제주바다 | 서귀포시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/38648333/home) | [K](https://place.map.kakao.com/1296112285) | `jeju/naver-38648333` |  |

### daegu (5)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 뉴요크 | 남구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2091882564/home) | [K](https://place.map.kakao.com/1270853010) | `daegu/naver-2091882564` |  |
| 레브 동명점 | 북구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1224154264/home) | [K](https://place.map.kakao.com/218169199) | `daegu/naver-1224154264` |  |
| 방짜 | 동구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/35228395/home) | [K](https://place.map.kakao.com/10255561) | `daegu/naver-35228395` |  |
| 파르코 | 수성구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1227244952/home) | [K](https://place.map.kakao.com/187894180) | `daegu/naver-1227244952` |  |
| 푸르른 | 중구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2019608393/home) | [K](https://place.map.kakao.com/482193827) | `daegu/naver-2019608393` |  |

### gyeongbuk (5)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 동해안 | 영덕군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '동해안'으로 보아 해산물·횟집(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/32239625/home) | [K](https://place.map.kakao.com/7845841) | `gyeongbuk/naver-32239625` |  |
| 마지막쉼터 | 포항시 | 야식 | — | 미확정 | 종류 값이 너무 넓음 / 종류 값 '야식'은 무엇을 파는지 알려 주지 않음. 메뉴·출처 목록도 없음. 상호명 검색은 아직 못 함 | [N](https://map.naver.com/p/entry/place/1690979505) | [K](https://place.map.kakao.com/182595392) | `gyeongbuk/naver-1690979505` |  |
| 서원 | 안동시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2031469918/home) | [K](https://place.map.kakao.com/7833000) | `gyeongbuk/naver-2031469918` |  |
| 황남 | 경주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2060786887/home) | [K](https://place.map.kakao.com/1124130238) | `gyeongbuk/naver-2060786887` |  |
| ChapChap | 경산시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1693700489/home) | [K](https://place.map.kakao.com/1630251595) | `gyeongbuk/naver-1693700489` |  |

### gyeongnam (4)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 가호 | 진주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1013826140/home) | [K](https://place.map.kakao.com/10116130) | `gyeongnam/naver-1013826140` |  |
| 동피랑 | 통영시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/37349717/home) | [K](https://place.map.kakao.com/10290301) | `gyeongnam/naver-37349717` |  |
| 월하동 | 진주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2008173025/home) | [K](https://place.map.kakao.com/25336423) | `gyeongnam/naver-2008173025` |  |
| 자연농원 | 창원시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '농원'은 고깃집(한식)일 수도, 농장 카페일 수도 있음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1946827264/home) | [K](https://place.map.kakao.com/11160272) | `gyeongnam/naver-1946827264` |  |

### incheon (4)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 만나공원 | 연수구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2054015933/home) | [K](https://place.map.kakao.com/1062079205) | `incheon/naver-2054015933` |  |
| 치즈웨이브 | 미추홀구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '치즈·크림'은 디저트 카페일 수도, 양식당일 수도 있음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1954881301/home) | [K](https://place.map.kakao.com/141613321) | `incheon/naver-1954881301` |  |
| 쿠모 | 영종구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1386102212/home) | [K](https://place.map.kakao.com/264979515) | `incheon/naver-1386102212` |  |
| 하나비 | 부평구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/21791484/home) | [K](https://place.map.kakao.com/1098818918) | `incheon/naver-21791484` |  |

### chungbuk (3)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 미와담 | 음성군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2037966007/home) | [K](https://place.map.kakao.com/15866039) | `chungbuk/naver-2037966007` |  |
| 삼순이 | 증평군 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1061491128/home) | [K](https://place.map.kakao.com/9103604) | `chungbuk/naver-1061491128` |  |
| 삼우정 본점 | 청주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/18106884/home) | [K](https://place.map.kakao.com/1409237770) | `chungbuk/naver-18106884` |  |

### gangwon (3)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 올드페퍼 | 원주시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/2071052672/home) | [K](https://place.map.kakao.com/27305473) | `gangwon/naver-2071052672` |  |
| 주인 | 강릉시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1426981340/home) | [K](https://place.map.kakao.com/1596997213) | `gangwon/naver-1426981340` |  |
| 크림하우스 | 강릉시 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '치즈·크림'은 디저트 카페일 수도, 양식당일 수도 있음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1807622300/home) | [K](https://place.map.kakao.com/1896428146) | `gangwon/naver-1807622300` |  |

### daejeon (2)

| 이름 | 구/시 | subcategory | collections | 이전판정 | 근거 메모 | 네이버 | 카카오 | 키 | 제안 category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 라쿠엔 | 유성구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1251447969/home) | [K](https://place.map.kakao.com/962143862) | `daejeon/naver-1251447969` |  |
| 주도 | 서구 | — | 맛지도 2026 | 미확정 | 종류 값 없음, 이름 단서가 갈림 / '주'(酒)로 읽히면 술집(주점)이지만 확실하지 않음. 상호명 검색은 아직 못 함 | [N](https://m.place.naver.com/restaurant/1377746746/home) | [K](https://place.map.kakao.com/172374694) | `daejeon/naver-1377746746` |  |

