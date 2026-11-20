# lunch-radar 미분류 가게 추가 검토 (2026-11-20)

- 전체 카탈로그: 10,093개. 원본 미분류 447개 → 324개.
- 이번 웹 검색 반영: 123개. 이전 149개 포함 최초 596개 중 272개 분류.
- 미확정 음식점 후보: 270개. 기존 비식당 검토 54개는 삭제하지 않고 null 유지.
- 원본 JSON 메타데이터(기준 커밋 2ad1c9e)와 기존 분류 유지. 저장소 적용 및 --check는 미수행.
- 검색 기준: 상호 및 시·구, 대표 메뉴·영업 유형 일치. 정확한 도로명 주소/플레이스 ID 대조는 원본 검토 목록의 주소 상세 부족으로 미수행. 동일 체인 또는 축약명은 근거에 기재.
- 브런치카페는 카페·디저트, 이자카야·요리주점은 주점, 샤브샤브는 한식으로 분류. 모든 미확정 항목을 검색 완료했다는 의미는 아님.

## 카테고리별 추가 분류

| 카테고리 | 건수 |
|---|---:|
| 한식 | 39 |
| 중식 | 7 |
| 일식 | 17 |
| 양식 | 13 |
| 아시안 | 5 |
| 분식 | 0 |
| 샐러드 | 0 |
| 카페·디저트 | 14 |
| 주점 | 28 |

## 지역별 결과

| 지역 | 기존 null | 추가 분류 | 잔여 null | 비식당(잔여 중) | 음식점 후보(잔여 중) |
|---|---:|---:|---:|---:|---:|
| seoul | 78 | 4 | 74 | 2 | 72 |
| gyeonggi | 118 | 80 | 38 | 2 | 36 |
| gwangju | 52 | 31 | 21 | 0 | 21 |
| chungnam | 41 | 8 | 33 | 4 | 29 |
| jeonnam | 41 | 0 | 41 | 5 | 36 |
| jeonbuk | 34 | 0 | 34 | 6 | 28 |
| gyeongbuk | 19 | 0 | 19 | 14 | 5 |
| chungbuk | 12 | 0 | 12 | 9 | 3 |
| gyeongnam | 10 | 0 | 10 | 6 | 4 |
| jeju | 10 | 0 | 10 | 3 | 7 |
| sejong | 9 | 0 | 9 | 1 | 8 |
| busan | 7 | 0 | 7 | 0 | 7 |
| daegu | 5 | 0 | 5 | 0 | 5 |
| incheon | 4 | 0 | 4 | 0 | 4 |
| gangwon | 3 | 0 | 3 | 0 | 3 |
| daejeon | 2 | 0 | 2 | 0 | 2 |
| ulsan | 2 | 0 | 2 | 2 | 0 |
| 회사 | 0 | 0 | 0 | 0 | 0 |

## 이번 추가 분류 상세

| 지역 | 상호 | 시·구 | 키 | 분류 | 메뉴·업종 근거 | 출처 |
|---|---|---|---|---|---|---|
| seoul | 써니눅 성수 | 성동구 | `seoul/naver-1802761649` | 양식 | 미국식 브런치·파스타·스테이크 | [검색 출처](https://www.diningcode.com/profile.php?rid=uqx6WYdJMaYV) |
| seoul | 올음 | 성동구 | `seoul/naver-1943698416` | 일식 | 사시미 오마카세와 전통주 페어링 | [검색 출처](https://www.diningcode.com/profile.php?rid=gXQxaA7XG1Qs) |
| seoul | 일상정원 서울역점 | 중구 | `seoul/naver-1942269081` | 일식 | 스키야키·우동, 일식 분류 | [검색 출처](https://polle.com/place/2YofTR) |
| seoul | 작정 압구정 | 강남구 | `seoul/naver-1728665773` | 한식 | 한식 코스 파인다이닝 | [검색 출처](https://www.diningcode.com/profile.php?rid=PyFRkQk7T3Jr) |
| gyeonggi | 구멘 죽전점 | 용인시 | `gyeonggi/naver-2027735946` | 일식 | 돈코츠라멘·마제소바 | [검색 출처](https://www.diningcode.com/profile.php?rid=tdIg8KGh90D9) |
| gyeonggi | 그래니살룬 | 성남시 | `gyeonggi/naver-37365975` | 양식 | 미트볼·스테이크·파스타 | [검색 출처](https://www.diningcode.com/profile.php?rid=AFe5xnJ0moBm) |
| gyeonggi | 그램 판교 | 성남시 | `gyeonggi/naver-1174510941` | 카페·디저트 | 브런치카페, 파스타·뇨끼 | [검색 출처](https://www.diningcode.com/profile.php?rid=cnqmVY3pDqhM) |
| gyeonggi | 노체부엌 | 수원시 | `gyeonggi/naver-1122414804` | 주점 | 요리주점, 전통주 칵테일·감자탕 | [검색 출처](https://polle.com/place/5EMWbj) |
| gyeonggi | 누오븐 | 수원시 | `gyeonggi/naver-1621391041` | 카페·디저트 | 케이크·베이커리카페 | [검색 출처](https://www.diningcode.com/profile.php?rid=b6dHNMCJSUAI) |
| gyeonggi | 니시 | 성남시 | `gyeonggi/naver-2041251551` | 주점 | 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=E0yhyPTdJUFG) |
| gyeonggi | 더담아 | 용인시 | `gyeonggi/naver-1203294409` | 한식 | 한정식·한우불고기 | [검색 출처](https://www.diningcode.com/profile.php?rid=xhTijbpaexQG) |
| gyeonggi | 더쉐프인젤코바 | 성남시 | `gyeonggi/naver-31509929` | 양식 | 철판 코스요리, 맛플 양식 분류 | [검색 출처](https://matple.com/place-detail?id=1gXGvpjlR) |
| gyeonggi | 돌판하나 분당본점 | 성남시 | `gyeonggi/naver-37257503` | 한식 | 돼지고기 돌판구이 | [검색 출처](https://www.matzipmap.com/place/cb727f8d-41d8-42af-a84b-55c8c103a0c7) |
| gyeonggi | 딥 | 수원시 | `gyeonggi/naver-1650001871` | 양식 | 파스타·뇨끼 | [검색 출처](https://polle.com/place/2IUnKU) |
| gyeonggi | 라쎄르 | 성남시 | `gyeonggi/naver-2054296600` | 카페·디저트 | 커피·브런치 | [검색 출처](https://local.lazyscheme.com/places/lshqpde28kdtu53h26/) |
| gyeonggi | 리파인 동탄호수공원점 | 화성시 | `gyeonggi/naver-1275175572` | 주점 | 퓨전한식 요리주점 | [검색 출처](https://www.diningcode.com/profile.php?rid=vz8hxxdoRNlz) |
| gyeonggi | 마루면가 | 수원시 | `gyeonggi/naver-1818131211` | 일식 | 소바·돈카츠·카레 | [검색 출처](https://www.diningcode.com/profile.php?rid=zsRlTyjnv3a3) |
| gyeonggi | 만우정본점 | 용인시 | `gyeonggi/naver-36097690` | 한식 | 민물장어구이 | [검색 출처](https://www.diningcode.com/profile.php?rid=zVfW3NsHtJ4s) |
| gyeonggi | 매산약수터 수원역본점 | 수원시 | `gyeonggi/naver-1690656210` | 주점 | 한식주점 | [검색 출처](https://www.diningcode.com/profile.php?rid=mPqjRXFv38rw) |
| gyeonggi | 메이빌 분당점 | 성남시 | `gyeonggi/naver-20601148` | 양식 | 파스타·빠네 | [검색 출처](https://www.diningcode.com/profile.php?rid=KF6FhEKDyyh0) |
| gyeonggi | 면선정 | 성남시 | `gyeonggi/naver-2070919576` | 중식 | 대만식 국수·동파육·딤섬 | [검색 출처](https://www.diningcode.com/profile.php?rid=JsWVPuF7TeQE) |
| gyeonggi | 명희원 | 성남시 | `gyeonggi/naver-1028778576` | 중식 | 짜장면·짬뽕 | [검색 출처](https://www.diningcode.com/profile.php?rid=JDJNTQT7KPvA) |
| gyeonggi | 모미지 수원인계점 | 수원시 | `gyeonggi/naver-2060540344` | 주점 | 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=FdGd584Ga8ob) |
| gyeonggi | 무궁화 파이브 | 성남시 | `gyeonggi/naver-1196660951` | 카페·디저트 | 베이커리카페 | [검색 출처](https://www.diningcode.com/profile.php?rid=5Q6GSOzdJ8PJ) |
| gyeonggi | 뭄뭄 수원신동점 | 수원시 | `gyeonggi/naver-1424835754` | 일식 | 퓨전일식·초밥 | [검색 출처](https://www.diningcode.com/profile.php?rid=iNJrST1spY0e) |
| gyeonggi | 바다방앗간 | 용인시 | `gyeonggi/naver-1305634979` | 일식 | 사시미·오마카세 | [검색 출처](https://www.diningcode.com/profile.php?rid=VuBi5Wi7BmlL) |
| gyeonggi | 바차 판교점 | 성남시 | `gyeonggi/naver-1422775069` | 주점 | 요리주점 | [검색 출처](https://www.diningcode.com/profile.php?rid=zMWDTEslNtPm) |
| gyeonggi | 박터진흥부네 용인기흥점 | 용인시 | `gyeonggi/naver-34449605` | 한식 | 삼계탕·해신탕·염소탕 | [검색 출처](https://heyyumi.ai/places/34449605) |
| gyeonggi | 복개천그릴 | 수원시 | `gyeonggi/naver-1626853581` | 한식 | 이베리코 돼지고기구이 | [검색 출처](https://www.diningcode.com/profile.php?rid=jqb5xT7wBXad) |
| gyeonggi | 본대가 KT위즈파크점 | 수원시 | `gyeonggi/naver-2081645955` | 한식 | 미나리 감자탕 | [검색 출처](https://www.diningcode.com/profile.php?rid=aaalMqAcwKm3) |
| gyeonggi | 블루오즈 | 수원시 | `gyeonggi/naver-1792429425` | 카페·디저트 | 호주식 브런치카페 | [검색 출처](https://www.diningcode.com/profile.php?rid=CkMMFerny89I) |
| gyeonggi | 비트라제이 | 오산시 | `gyeonggi/naver-1084848230` | 주점 | 퓨전 요리주점·피자·맥주 | [검색 출처](https://www.diningcode.com/profile.php?rid=731T8OeV3rYR) |
| gyeonggi | 산적 | 수원시 | `gyeonggi/naver-13566069` | 주점 | 막걸리·감자전 | [검색 출처](https://www.diningcode.com/profile.php?rid=KaCRVanCaJ3i) |
| gyeonggi | 삼일밤슈퍼 | 수원시 | `gyeonggi/naver-2006823440` | 주점 | 맥주·호프 | [검색 출처](https://www.daangn.com/kr/local-profile/%EC%82%BC%EC%9D%BC%EB%B0%A4%EC%8A%88%ED%8D%BC-jznarwyd7zmj/) |
| gyeonggi | 서보 분당점 | 성남시 | `gyeonggi/naver-2066206956` | 아시안 | 태국 음식·족발덮밥·쌀국수 | [검색 출처](https://www.diningcode.com/profile.php?rid=JSLDw6GVbixn) |
| gyeonggi | 솔트앤도우 | 용인시 | `gyeonggi/naver-2005954262` | 양식 | 화덕피자·파스타 | [검색 출처](https://www.diningcode.com/profile.php?rid=vuOafLuVpPgn) |
| gyeonggi | 송도어반 동탄점 | 오산시 | `gyeonggi/naver-1543376922` | 한식 | 생선구이·코다리조림 | [검색 출처](https://www.diningcode.com/profile.php?rid=8a6VyJOuFB48) |
| gyeonggi | 스르르 | 의정부시 | `gyeonggi/naver-2070641769` | 카페·디저트 | 카페·커피; 와인도 판매 | [검색 출처](https://www.diningcode.com/profile.php?rid=La5tSJJyJ4Gy) |
| gyeonggi | 아프레 | 성남시 | `gyeonggi/naver-1889221282` | 카페·디저트 | 브런치카페 | [검색 출처](https://polle.com/place/2FszHm) |
| gyeonggi | 압계정 | 용인시 | `gyeonggi/naver-2065441732` | 한식 | 백숙·삼계탕 | [검색 출처](https://www.diningcode.com/profile.php?rid=VGyjrJvVF9MP) |
| gyeonggi | 야미얌 | 오산시 | `gyeonggi/naver-1176853942` | 일식 | 수제 돈카츠·가라아게 | [검색 출처](https://polle.com/place/2sH22r) |
| gyeonggi | 어락 | 연천군 | `gyeonggi/naver-36900466` | 한식 | 화덕생선구이·솥밥 | [검색 출처](https://www.diningcode.com/profile.php?rid=OCN8RVviARMd) |
| gyeonggi | 연담채 | 화성시 | `gyeonggi/naver-2062615294` | 한식 | 보리굴비·간장게장·한정식 | [검색 출처](https://www.daangn.com/kr/local-profile/%EC%97%B0%EB%8B%B4%EC%B1%84-h52jd8nhdwd3/) |
| gyeonggi | 연우 | 평택시 | `gyeonggi/naver-2036341845` | 일식 | 참치 코스 | [검색 출처](https://www.diningcode.com/profile.php?rid=xfQgejelcH4Q) |
| gyeonggi | 연홍 | 오산시 | `gyeonggi/naver-1721553430` | 중식 | 중식당 | [검색 출처](https://www.daangn.com/kr/local-profile/%EC%A4%91%EC%8B%9D%EB%8B%B9-%EC%97%B0%ED%99%8D-e9yeeopfzdbt/) |
| gyeonggi | 연희시오 야탑점 | 성남시 | `gyeonggi/naver-1927405941` | 일식 | 일본가정식·스프카레 | [검색 출처](https://www.diningcode.com/profile.php?rid=IQI5Q4dplfMO) |
| gyeonggi | 올드스탠드 | 성남시 | `gyeonggi/naver-32582238` | 주점 | 수제맥주 펍·피쉬앤칩스 | [검색 출처](https://www.tabling.co.kr/place/677cc7d966de5f0698758125) |
| gyeonggi | 올리브 1999 | 수원시 | `gyeonggi/naver-63352153` | 양식 | 경양식 돈가스·피자·리조또 | [검색 출처](https://polle.com/place/3vWmdE) |
| gyeonggi | 와이앤웍 본점 | 수원시 | `gyeonggi/naver-1032557765` | 중식 | 짬뽕·중화요리 | [검색 출처](https://www.diningcode.com/profile.php?rid=OLgIgBYkkzsH) |
| gyeonggi | 외진곳 | 화성시 | `gyeonggi/naver-1853937903` | 주점 | 요리주점·뇨끼 | [검색 출처](https://www.diningcode.com/profile.php?rid=dI5Jye1eTmah) |
| gyeonggi | 우리마을 | 용인시 | `gyeonggi/naver-19900076` | 한식 | 소갈비·돼지양념구이 | [검색 출처](https://www.diningcode.com/profile.php?rid=WltnmoWhh9et) |
| gyeonggi | 우마 스타필드 수원점 | 수원시 | `gyeonggi/naver-1233798547` | 양식 | 함박스테이크 | [검색 출처](https://www.diningcode.com/profile.php?rid=w3EQeIgjWgJC) |
| gyeonggi | 우마블 | 성남시 | `gyeonggi/naver-1578978669` | 한식 | 한우구이 | [검색 출처](https://www.diningcode.com/profile.php?rid=tUNnEJGSHsTA) |
| gyeonggi | 우마주 판교대장점 | 성남시 | `gyeonggi/naver-1849171999` | 한식 | 갈비살·주물럭 | [검색 출처](https://www.diningcode.com/profile.php?rid=qGsOKqYrLiRy) |
| gyeonggi | 이수사 | 성남시 | `gyeonggi/naver-19866762` | 일식 | 사시미·초밥 코스 | [검색 출처](https://www.diningcode.com/profile.php?rid=Fgoj8gvuDTSM) |
| gyeonggi | 이치하치 행궁점 | 수원시 | `gyeonggi/naver-1613852704` | 일식 | 일본가정식·카레 | [검색 출처](https://www.diningcode.com/profile.php?rid=DzYIf4l4sxI4) |
| gyeonggi | 이프리 | 수원시 | `gyeonggi/naver-2032729230` | 한식 | 퓨전한식·칼국수·비빔밥 | [검색 출처](https://www.diningcode.com/profile.php?rid=angXMDtDGGvz) |
| gyeonggi | 인생삼막 | 용인시 | `gyeonggi/naver-2037242271` | 한식 | 삼겹살·막창 | [검색 출처](https://www.diningcode.com/profile.php?rid=U3UMTKtLsOtX) |
| gyeonggi | 일상엔 | 수원시 | `gyeonggi/naver-1698866140` | 카페·디저트 | 베이커리카페 | [검색 출처](https://www.diningcode.com/profile.php?rid=QDTTXwKZmK7u) |
| gyeonggi | 자근바 | 수원시 | `gyeonggi/naver-2096108122` | 주점 | 칵테일바 | [검색 출처](https://www.diningcode.com/profile.php?rid=3cKmNPlHO8Qd) |
| gyeonggi | 장원 구갈점 | 용인시 | `gyeonggi/naver-2074752539` | 한식 | 막창·삼겹살 | [검색 출처](https://www.diningcode.com/profile.php?rid=g8gnSC9OY68u) |
| gyeonggi | 제프네 | 수원시 | `gyeonggi/naver-1509955356` | 주점 | 요리주점 | [검색 출처](https://www.diningcode.com/profile.php?rid=XvDGbmotvjkQ) |
| gyeonggi | 주후 | 수원시 | `gyeonggi/naver-1236309282` | 주점 | 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=RP8eu3ic62gI) |
| gyeonggi | 찌마기 판교역점 | 성남시 | `gyeonggi/naver-1307153335` | 한식 | 조개찜 | [검색 출처](https://www.diningcode.com/profile.php?rid=8xPz9hUxCb0I) |
| gyeonggi | 참향 | 성남시 | `gyeonggi/naver-35057956` | 한식 | 삼겹살·청국장 | [검색 출처](https://www.diningcode.com/profile.php?rid=4Hokq91YgvW4) |
| gyeonggi | 천석꾼 | 성남시 | `gyeonggi/naver-1193605551` | 한식 | 장작구이 통닭 | [검색 출처](https://www.diningcode.com/profile.php?rid=w6dDEF40IcV7) |
| gyeonggi | 청덕원 | 성남시 | `gyeonggi/naver-1519678191` | 한식 | 오리구이 | [검색 출처](https://www.diningcode.com/profile.php?rid=tPW7VQi58Ogs) |
| gyeonggi | 초장박살 | 수원시 | `gyeonggi/naver-2068625088` | 주점 | 해산물포차·숙성회 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=KzC1Bv0c9t0I) |
| gyeonggi | 카리 분당정자카페점 | 성남시 | `gyeonggi/naver-37703354` | 아시안 | 인도 커리·탄두리 | [검색 출처](https://www.diningcode.com/profile.php?rid=loCXHbq80b2b) |
| gyeonggi | 칼뽕 | 포천시 | `gyeonggi/naver-1025162062` | 중식 | 짬뽕·탕수육 | [검색 출처](https://www.diningcode.com/profile.php?rid=ykKIzGQwAcSI) |
| gyeonggi | 코지하우스 오산물향기수목원점 | 오산시 | `gyeonggi/naver-2086623855` | 양식 | 파스타·스테이크 | [검색 출처](https://www.diningcode.com/profile.php?rid=yNPi3NJFd7zS) |
| gyeonggi | 콜렉티보 판교테크원점 | 성남시 | `gyeonggi/naver-1376376661` | 카페·디저트 | 카페·케이크 | [검색 출처](https://www.diningcode.com/profile.php?rid=SMbvbbgeW25O) |
| gyeonggi | 콩두주백 북수원직영점 | 수원시 | `gyeonggi/naver-2016537988` | 한식 | 수제두부·순두부 | [검색 출처](https://www.diningcode.com/profile.php?rid=sFpCZjUmUkvI) |
| gyeonggi | 콩온 | 화성시 | `gyeonggi/naver-2064107861` | 한식 | 콩국수·콩요리 | [검색 출처](https://www.diningcode.com/profile.php?rid=6XgBNMbJRllA) |
| gyeonggi | 키타야 수원행궁점 | 수원시 | `gyeonggi/naver-1977555772` | 주점 | 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=ARSO3qxs5PtW) |
| gyeonggi | 테라스478 | 용인시 | `gyeonggi/naver-1150408407` | 카페·디저트 | 베이커리·커피·브런치카페 | [검색 출처](https://www.diningcode.com/profile.php?rid=HSqxjxxY65aN) |
| gyeonggi | 테판쉐프 | 용인시 | `gyeonggi/naver-1674901553` | 양식 | 랍스터·스테이크 철판 코스 | [검색 출처](https://www.diningcode.com/profile.php?rid=r1WaFBauSm4z) |
| gyeonggi | 테판하우스 | 성남시 | `gyeonggi/naver-1825059820` | 양식 | 랍스터·철판코스 | [검색 출처](https://www.diningcode.com/profile.php?rid=T9TmakRTRnxT) |
| gyeonggi | 토리하나 | 성남시 | `gyeonggi/naver-1197914450` | 일식 | 토리파이탄 라멘 | [검색 출처](https://www.diningcode.com/profile.php?rid=xlSQp0vxzd7g) |
| gyeonggi | 톤톤톤 수원역점 | 수원시 | `gyeonggi/naver-2096203089` | 일식 | 오코노미야키·야키소바 | [검색 출처](https://www.diningcode.com/profile.php?rid=ijcdPdwMgbYu) |
| gyeonggi | 포레스트오늘숲 수원영통점 | 수원시 | `gyeonggi/naver-1766992813` | 아시안 | 베트남 쌀국수 | [검색 출처](https://www.diningcode.com/profile.php?rid=M5gDTuclzTyx) |
| gyeonggi | 포미 본점 | 화성시 | `gyeonggi/naver-2030002841` | 아시안 | 베트남 쌀국수·반미 | [검색 출처](https://www.diningcode.com/profile.php?rid=RXD1jirUlnnE) |
| gyeonggi | 포올로지 | 오산시 | `gyeonggi/naver-2077867816` | 아시안 | 쌀국수·팟타이 | [검색 출처](https://www.diningcode.com/profile.php?rid=USeH9Ol4mhZS) |
| gyeonggi | 포크너 분당점 | 성남시 | `gyeonggi/naver-1752662465` | 양식 | 파스타·스테이크 | [검색 출처](https://www.diningcode.com/profile.php?rid=K1way5kIdX2O) |
| gwangju | 개대박 | 북구 | `gwangju/naver-1205857107` | 한식 | 돼지고기 특수부위 구이(용봉점) | [검색 출처](https://www.diningcode.com/profile.php?rid=Rf6ykNJXEGYE) |
| gwangju | 공일백 용봉점 | 북구 | `gwangju/naver-2018763870` | 한식 | 보약국밥·차돌뚝배기 | [검색 출처](https://www.diningcode.com/profile.php?rid=aCH7dC8Nkeot) |
| gwangju | 굽탄 첨단직영점 | 북구 | `gwangju/naver-2094355975` | 한식 | 삼겹살·목살 구이 | [검색 출처](https://www.diningcode.com/profile.php?rid=GgugUmJULCwd) |
| gwangju | 김연종 미미본점 | 광산구 | `gwangju/naver-1683541979` | 일식 | 참치·초밥 | [검색 출처](https://www.diningcode.com/profile.php?rid=zOxx5jfdmOqc) |
| gwangju | 꾸다 | 서구 | `gwangju/naver-1080611018` | 주점 | 술집·이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=KqKYyy4AarAa) |
| gwangju | 달곰식당 | 동구 | `gwangju/naver-510488081` | 일식 | 초밥·연어 | [검색 출처](https://www.diningcode.com/profile.php?rid=LCfIOfwsqV3K) |
| gwangju | 대풍수 | 북구 | `gwangju/naver-1592597559` | 중식 | 꿔바로우·우육면·마파두부 | [검색 출처](https://www.tabling.co.kr/place/677cd43566de5f06988cf95b) |
| gwangju | 도재 | 동구 | `gwangju/naver-2055007743` | 주점 | 퓨전 한식주점 | [검색 출처](https://www.diningcode.com/profile.php?rid=QUJ59XoHKtKx) |
| gwangju | 동명동오보에루 | 동구 | `gwangju/naver-1014982688` | 주점 | 일식 이자카야·오마카세 | [검색 출처](https://www.diningcode.com/profile.php?rid=1xo4t0hDaRZI) |
| gwangju | 라이크앤 | 서구 | `gwangju/naver-1448671199` | 카페·디저트 | 브런치카페·파스타 | [검색 출처](https://www.diningcode.com/profile.php?rid=nM01xnVX7xIT) |
| gwangju | 레이트에이엠 | 동구 | `gwangju/naver-2085278953` | 카페·디저트 | 브런치카페 | [검색 출처](https://www.diningcode.com/profile.php?rid=nE5R5XU6lK5x) |
| gwangju | 매운날 첨단본점 | 광산구 | `gwangju/naver-20348689` | 한식 | 매운갈비찜 | [검색 출처](https://access.visitkorea.or.kr/food/detail.do?cotId=4615e0d6-403e-41c6-8893-ba5951853ca1) |
| gwangju | 맷도리 | 동구 | `gwangju/naver-1921857874` | 주점 | 야키토리 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=dZRKxzzGKtTA) |
| gwangju | 명불허전하하주 | 서구 | `gwangju/naver-1948442743` | 주점 | 민속주점·전 | [검색 출처](https://hongsi.io/place/p/382c50b7-8676-4e2e-ae76-fb11b07ad763) |
| gwangju | 미노루 | 동구 | `gwangju/naver-1921739665` | 주점 | 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=7DVrYMOE3IrB) |
| gwangju | 미즈의숲 | 서구 | `gwangju/naver-1800465392` | 한식 | 샤브샤브 | [검색 출처](https://www.diningcode.com/profile.php?rid=ExW1RXf3S4Fv) |
| gwangju | 바칼 본점 | 광산구 | `gwangju/naver-15958681` | 한식 | 바지락칼국수·만두(신창) | [검색 출처](https://www.diningcode.com/profile.php?rid=ZHrVvmuIpErg) |
| gwangju | 봉선오뎅 | 남구 | `gwangju/naver-2064609000` | 주점 | 오뎅바·이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=pVpPxpvGkXiN) |
| gwangju | 블랭크테잎 | 동구 | `gwangju/naver-1237118974` | 주점 | 칵테일바 | [검색 출처](https://www.diningcode.com/profile.php?rid=HmUP1pAiWGWy) |
| gwangju | 삼형제도매시장 | 서구 | `gwangju/naver-2085642831` | 한식 | 소고기·한우 | [검색 출처](https://eatrank.co.kr/매장/삼형제도매시장) |
| gwangju | 쇼부 용봉점 | 북구 | `gwangju/naver-1141847239` | 주점 | 사시미 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=jOYqkHi6miWU) |
| gwangju | 쉐프공방 | 북구 | `gwangju/naver-1916473280` | 양식 | 파스타·리조또 | [검색 출처](https://www.diningcode.com/profile.php?rid=V7wilMSZiFZv) |
| gwangju | 오늘 바다다 광주상무점 | 서구 | `gwangju/naver-1738192531` | 한식 | 제철 대하·전어·해산물 횟집 | [검색 출처](https://www.diningcode.com/profile.php?rid=qw4OvdhoTSDv) |
| gwangju | 오메오메 상무직영점 | 서구 | `gwangju/naver-1681524541` | 한식 | 오리탕·오리주물럭 | [검색 출처](https://www.diningcode.com/profile.php?rid=w8eOm2ZKnF2e) |
| gwangju | 와구와규 | 동구 | `gwangju/naver-1064212037` | 일식 | 야키니쿠 전문 | [검색 출처](https://www.diningcode.com/profile.php?rid=tqD1CKSniFJM) |
| gwangju | 이로도리 동명점 | 동구 | `gwangju/naver-2082789768` | 일식 | 카이센동·해산물 덮밥 | [검색 출처](https://www.diningcode.com/profile.php?rid=0g8QQ55ICNDH) |
| gwangju | 이솝 첨단점 | 광산구 | `gwangju/naver-1894962894` | 주점 | 이자카야 | [검색 출처](https://www.diningcode.com/profile.php?rid=CqprUCZJkeha) |
| gwangju | 이이남스튜디오 | 남구 | `gwangju/naver-940362236` | 카페·디저트 | 갤러리카페·커피 | [검색 출처](https://www.diningcode.com/profile.php?rid=nhnKihZEske4) |
| gwangju | 조대 인아웃 | 동구 | `gwangju/naver-15967193` | 주점 | 술집·안주 | [검색 출처](https://www.diningcode.com/profile.php?rid=0LB2RyXMYhE7) |
| gwangju | 쭉심 구시청점 | 동구 | `gwangju/naver-1093878635` | 한식 | 쭈꾸미삼겹살(상무점 후기에서 구시청점 동일 체인 확인) | [검색 출처](https://www.diningcode.com/profile.php?rid=UbbsZRWqIgwd) |
| gwangju | 쭉심 전대후문점 | 북구 | `gwangju/naver-16154651` | 한식 | 쭈꾸미삼겹살 | [검색 출처](https://www.diningcode.com/profile.php?rid=DcANg4tS3lLO) |
| chungnam | 눈눈 불당점 | 천안시 | `chungnam/naver-2061357168` | 카페·디저트 | 브런치카페·프렌치토스트 | [검색 출처](https://www.diningcode.com/profile.php?rid=n6TxqtcwWcL8) |
| chungnam | 데이원 | 천안시 | `chungnam/naver-1929335824` | 한식 | 이베리코·한돈 숯불구이 | [검색 출처](https://www.diningcode.com/profile.php?rid=rHDG5GM8BcLf) |
| chungnam | 동가룰가든 | 예산군 | `chungnam/naver-13115958` | 한식 | 어죽·민물새우튀김 | [검색 출처](https://www.diningcode.com/profile.php?rid=MKMoqQTgWBCs) |
| chungnam | 봄담아 당진점 | 당진시 | `chungnam/naver-1652641328` | 한식 | 1인 샤브샤브 | [검색 출처](https://www.diningcode.com/profile.php?rid=uFhu8eM8b9tH) |
| chungnam | 불당 솔솔 | 천안시 | `chungnam/naver-2056730759` | 주점 | 한식 요리주점·전통주 | [검색 출처](https://www.diningcode.com/profile.php?rid=wcIUa1AFAoUQ) |
| chungnam | 슈엔챠이 공주점 | 공주시 | `chungnam/naver-13086380` | 중식 | 짜장·짬뽕·탕수육 | [검색 출처](https://www.diningcode.com/profile.php?rid=947TQhhULUB1) |
| chungnam | 아낙네의밀가 공주본점 | 공주시 | `chungnam/naver-1100344328` | 한식 | 콩국수·막국수·육회비빔밥 | [검색 출처](https://www.diningcode.com/profile.php?rid=JtPZKbAac8xg) |
| chungnam | 아인식당 | 천안시 | `chungnam/naver-2090913547` | 한식 | 제육볶음·청국장 백반 | [검색 출처](https://www.diningcode.com/profile.php?rid=FeOZNR07ipj3) |

## 현재 남은 미분류 전체

| 지역 | 상호 | 시·구 | 키 | 유형 | 기존 검토 사유 및 설명 |
|---|---|---|---|---|---|
| seoul | 1101 뮤지엄 | 서초구 | `seoul/naver-1534702143` | 기존 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '전시관'. 예술의전당 안 전시 공간으로 등록됨. 출처 목록 없음 |
| seoul | 1808 | 강남구 | `seoul/naver-1557155795` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 |
| seoul | FRAMER | 용산구 | `seoul/naver-1774444658` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 |
| seoul | 갈대포 | 관악구 | `seoul/kakao-1047245706` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 |
| seoul | 굽 | 중구 | `seoul/naver-1366205207` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '굽'은 구이를 떠올리게 하지만 무엇을 굽는지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 그루트 | 강남구 | `seoul/naver-2098303895` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 그룬트 | 성동구 | `seoul/naver-1048776964` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 까사꼬네호 | 중구 | `seoul/naver-2040225659` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 나린제 | 성동구 | `seoul/naver-2092472020` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 넓은마당 | 노원구 | `seoul/naver-2054341602` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 다팀 | 서초구 | `seoul/naver-1386154822` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 대양장 | 서대문구 | `seoul/naver-1074749296` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 동남방앗간 한남점 | 용산구 | `seoul/naver-1938018806` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 둥우리 | 중구 | `seoul/naver-2094093935` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 랑게 | 마포구 | `seoul/naver-1739638792` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 로그 성수 | 성동구 | `seoul/naver-2091607037` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 맥그리코 혜화대학로점 | 종로구 | `seoul/naver-2061812129` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 멘쿠도 성수점 | 성동구 | `seoul/naver-2096559480` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '멘'(면)으로 보아 라멘·면 요리 같지만 일식인지 다른 면 요리인지 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 밀라노식당 | 마포구 | `seoul/naver-1309585620` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '밀라노'로 보아 이탈리안(양식) 같지만 '식당'이라 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 바위드 | 마포구 | `seoul/naver-1023957785` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 반지하 선릉점 | 강남구 | `seoul/naver-2040091689` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 베리키친 | 중구 | `seoul/naver-36379024` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '키친'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 베이킹 도우 | 종로구 | `seoul/naver-37282209` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '도우·오븐'은 베이커리(카페·디저트)일 수도, 피자집(양식)일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 보또비노 | 성동구 | `seoul/naver-1635873247` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '비노'(와인)로 보아 와인바(주점)나 이탈리안(양식) 중 하나로 보임. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 브라운 에비뉴 | 종로구 | `seoul/naver-35545619` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 비바 | 서대문구 | `seoul/naver-2087485549` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 비오 | 종로구 | `seoul/naver-2004379803` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 빅러브토마토 | 종로구 | `seoul/naver-2066965601` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 빅테일 동묘 | 종로구 | `seoul/naver-1274948513` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 빌라토 | 마포구 | `seoul/naver-1862358398` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 산수 사당본점 | 동작구 | `seoul/kakao-16818524` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 섬소년자연주의 | 마포구 | `seoul/naver-19878363` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 실비무교 | 중구 | `seoul/naver-2034786984` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '실비'(실비집)로 보아 술집(주점)이나 한식 백반 중 하나로 보임. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 아웃오브오더 | 성동구 | `seoul/naver-1334028812` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 아후 Ahoo | 성동구 | `seoul/naver-1912626916` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 알렉스루카 | 강남구 | `seoul/naver-2092502028` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 앵그리누들 | 강남구 | `seoul/naver-2022737326` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 검색 결과가 '에그누들'라서 한 카테고리로 정하지 못함. '누들'만으로는 어떤 면 요리인지 알 수 없음 [다이닝코드](https://www.diningcode.com/profile.php?rid=n6LDr2LTpcb3) |
| seoul | 어구생 | 서대문구 | `seoul/naver-2092681070` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 어부이야기 | 서초구 | `seoul/naver-1596684844` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '어부'로 보아 해산물집 같지만 횟집(한식)인지 술집(주점)인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 에스메로 | 성동구 | `seoul/naver-1736738437` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 연희 바다 | 서대문구 | `seoul/naver-2032357843` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 온하루 | 종로구 | `seoul/naver-1763776172` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '식료품'. 맛집 목록('맛준 맛집')에서 왔지만 무엇을 파는 곳인지 확인하지 못함 |
| seoul | 올리멘 강남 빗썸금융타워점 | 강남구 | `seoul/naver-2012444424` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '멘'(면)으로 보아 라멘·면 요리 같지만 일식인지 다른 면 요리인지 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 우치야 | 종로구 | `seoul/naver-2029371902` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 움푹 | 중구 | `seoul/naver-1923586497` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 이와자루 성수 | 성동구 | `seoul/naver-1974548944` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 이케 | 강남구 | `seoul/naver-1983944498` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 제야 | 종로구 | `seoul/naver-1286056717` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 종로클라쓰 | 종로구 | `seoul/naver-2039056625` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 청춘식당미래소년 | 서초구 | `seoul/naver-36651713` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 카루 | 서초구 | `seoul/naver-38264451` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 칸트힐 | 중구 | `seoul/naver-2008465062` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 쿠히치 압구정점 | 강남구 | `seoul/naver-1826026569` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 키노이에 파티 | 강남구 | `seoul/naver-2094230942` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 키노이에(일식)의 자매점으로 보이지만 같은 메뉴인지 확인하지 못함. 일식 아니면 주점. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 키슌 | 강남구 | `seoul/naver-1074062899` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 키친봄날 | 서대문구 | `seoul/kakao-1573253740` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '키친'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 토리비 합정점 | 마포구 | `seoul/naver-1837437884` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '토리'(닭)가 든 일본어풍 이름. 야키토리(주점)일 가능성이 높지만 일식 닭요리일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 토파 | 강남구 | `seoul/naver-2039983018` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 토피 | 서초구 | `seoul/naver-2094972347` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 팬톤 클래식 | 성동구 | `seoul/naver-1662708681` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 포도젝트 | 성동구 | `seoul/naver-1732986089` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '포도'로 보아 와인바(주점) 같지만 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 프레스코 | 마포구 | `seoul/naver-2080385901` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 피엔에이 서촌 | 종로구 | `seoul/naver-2003857763` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 핑퐁서울 | 마포구 | `seoul/naver-1098697502` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 하이브 플레이그라운드 | 용산구 | `seoul/naver-2016354571` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 해누리 | 강서구 | `seoul/naver-1705177116` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 해방촌 이음 | 용산구 | `seoul/naver-2095019461` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 헨릭 | 성동구 | `seoul/naver-2000889807` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 호랭이카노 | 성동구 | `seoul/naver-1856927545` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 홍대 교도리 | 마포구 | `seoul/kakao-803910728` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 화계장 | 노원구 | `seoul/kakao-1749957373` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 화락관 신촌 본점 | 마포구 | `seoul/kakao-967124721` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 화류 | 마포구 | `seoul/naver-1011218680` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| seoul | 후스테이블 | 종로구 | `seoul/naver-19873255` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '테이블'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| gyeonggi | AMPM | 남양주시 | `gyeonggi/naver-2031009094` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| gyeonggi | LOW42 | 성남시 | `gyeonggi/naver-2004544425` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| gyeonggi | 감자꽃 | 화성시 | `gyeonggi/naver-1703643550` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| gyeonggi | 고고캠 | 용인시 | `gyeonggi/naver-2003441501` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| gyeonggi | 고기리열두화덕 | 용인시 | `gyeonggi/naver-12874368` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '화덕'은 화덕피자(양식)일 수도, 화덕구이(한식)일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| gyeonggi | 고래아저씨 오산운암점 | 오산시 | `gyeonggi/naver-1849367304` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| gyeonggi | 굿모닝 | 평택시 | `gyeonggi/naver-31840670` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 다정채 | 광명시 | `gyeonggi/naver-1377037254` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 대성리국민관광지 | 가평군 | `gyeonggi/naver-13418367` | 기존 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '유원지'. 메뉴 칸에 입장 요금이 들어 있음 |
| gyeonggi | 매쎄 | 수원시 | `gyeonggi/naver-2008388043` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 바바바 | 수원시 | `gyeonggi/naver-1114922731` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 범 | 화성시 | `gyeonggi/naver-1876356025` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 사카나 | 성남시 | `gyeonggi/naver-19877394` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '사카나'(생선·안주)는 일식일 수도, 이자카야(주점)일 수도 있음. 상호명 검색은 아직 못 함 |
| gyeonggi | 수원왕가리 북문점 | 수원시 | `gyeonggi/naver-1263288357` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 쉐진 동탄점 | 화성시 | `gyeonggi/naver-34573203` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 심야호선 | 수원시 | `gyeonggi/naver-1541244584` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 씨에스타 | 안산시 | `gyeonggi/naver-1066313912` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| gyeonggi | 어비스 | 과천시 | `gyeonggi/naver-1267330619` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 에그하우스 | 가평군 | `gyeonggi/naver-2049748405` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '브런(치)·에그'로 보아 브런치 같지만 양식인지 카페·디저트인지 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 에이치이에이 | 성남시 | `gyeonggi/naver-1805976617` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 역북370 | 용인시 | `gyeonggi/naver-1077429363` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 열날개 본점 | 김포시 | `gyeonggi/naver-34033715` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '날개'로 보아 닭날개 같지만 치킨집(한식)인지 술집(주점)인지 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 오브제 | 광주시 | `gyeonggi/naver-1707465493` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 이토 | 수원시 | `gyeonggi/naver-1205626834` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 일호선 | 수원시 | `gyeonggi/naver-1356864288` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 제이콥스 | 용인시 | `gyeonggi/naver-37432719` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 지속 | 파주시 | `gyeonggi/naver-2005756586` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 팔달주택 | 수원시 | `gyeonggi/naver-1268205327` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 포청천 | 시흥시 | `gyeonggi/naver-16779892` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 푸릴리 수원권선점 | 수원시 | `gyeonggi/naver-1293118602` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 플랑문 | 수원시 | `gyeonggi/naver-1818933986` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 하시도 | 수원시 | `gyeonggi/naver-2019144449` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 하쿠다이닝 매교역점 | 수원시 | `gyeonggi/naver-2085554202` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '하쿠'는 일본어풍, '다이닝'은 종류를 가리키지 않음. 일식 아니면 주점. 상호명 검색은 아직 못 함 |
| gyeonggi | 한소헌 | 성남시 | `gyeonggi/naver-1453847451` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 한울 | 파주시 | `gyeonggi/naver-18440909` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeonggi | 한탄강관광지 오토캠핑장 | 연천군 | `gyeonggi/naver-12917377` | 기존 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '자연명소'. 메뉴 칸에 야영장·캐라반이 들어 있음 |
| gyeonggi | 해밀리아 셀프바베큐장 | 용인시 | `gyeonggi/naver-1393708583` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '셀프바베큐장'은 고기를 직접 구워 먹는 시설. 식당(한식)으로 볼지 시설로 볼지 정하지 못함. 상호명 검색은 아직 못 함 |
| gyeonggi | 효경재 | 용인시 | `gyeonggi/naver-2079047311` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 굽탄 | 광산구 | `gwangju/naver-38009666` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '굽'+'탄'(숯)으로 보아 숯불구이 같지만 무엇을 굽는지 확인하지 못함. 같은 가게 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| gwangju | 만선 | 북구 | `gwangju/naver-2048128300` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '만선'은 해산물집에도 호프집에도 쓰이는 이름. 상호명 검색은 아직 못 함 |
| gwangju | 미옌 | 북구 | `gwangju/naver-1969902590` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 버몬지 | 광산구 | `gwangju/naver-1914501085` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 산등무 | 동구 | `gwangju/naver-1168667433` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 수완지구폼 | 광산구 | `gwangju/naver-1504215821` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 오늘부터애간장 | 북구 | `gwangju/naver-1469831837` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 은주 광주 용봉직영점 | 북구 | `gwangju/naver-2080310949` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 이름이 음식 종류를 가리키지 않음. 같은 가게(은주) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| gwangju | 이솝 용봉점 | 북구 | `gwangju/naver-2003958342` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 이름이 음식 종류를 가리키지 않음. 같은 가게(이솝) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| gwangju | 진미가람 주월점 | 서구 | `gwangju/naver-1659701073` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 최정담 | 북구 | `gwangju/naver-2097797421` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 카키노키 | 동구 | `gwangju/naver-1124517292` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 코안 | 동구 | `gwangju/naver-2003905126` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 코엔 | 동구 | `gwangju/naver-2070310198` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 쿠시 봉선 | 남구 | `gwangju/naver-2062392068` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '쿠시'(꼬치)는 쿠시카츠(일식)일 수도, 꼬치구이 술집(주점)일 수도 있음. 상호명 검색은 아직 못 함 |
| gwangju | 크램드밀 | 동구 | `gwangju/naver-1283239942` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 털보하우스 | 북구 | `gwangju/naver-16303120` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 파파식당 첨단본점 | 광산구 | `gwangju/naver-2093207740` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| gwangju | 해산 상무지구본점 | 서구 | `gwangju/naver-19892102` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '해산'으로 보아 해산물 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| gwangju | 화릇 | 서구 | `gwangju/naver-1991624248` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gwangju | 훈613 쌍촌본점 | 서구 | `gwangju/naver-1259825837` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 나드리슈퍼 | 천안시 | `chungnam/naver-2085552208` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 도모도모 | 아산시 | `chungnam/naver-2095407872` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 메종초이 | 서산시 | `chungnam/naver-1621337175` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| chungnam | 미미제면소 | 천안시 | `chungnam/naver-1331431705` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 베로 | 천안시 | `chungnam/naver-1807681546` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 보령자동차공업사 | 보령시 | `chungnam/naver-1108740272` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '자동차정비·수리'. 백년가게 목록에서 온 가게 |
| chungnam | 비전농장 | 홍성군 | `chungnam/naver-1674061794` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '농공시설'. 백년가게 목록에서 온 가게 |
| chungnam | 심도 | 천안시 | `chungnam/naver-1816983607` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 아띠 | 천안시 | `chungnam/naver-2089542396` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 연무향 | 논산시 | `chungnam/naver-2043041660` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 오엔 | 천안시 | `chungnam/naver-12064600` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 요무하치 | 천안시 | `chungnam/naver-1176636711` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 우미장 동대동 | 보령시 | `chungnam/naver-17481169` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 우석정 | 천안시 | `chungnam/naver-1799111683` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 웬유바이트 | 아산시 | `chungnam/naver-1246875708` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 위트 | 아산시 | `chungnam/naver-2079739226` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 윤이식당 | 아산시 | `chungnam/naver-1417435666` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| chungnam | 이창 | 논산시 | `chungnam/naver-1015469914` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 정문농산 | 아산시 | `chungnam/naver-1221015199` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '곡류'. 백년가게 목록에서 온 가게. 메뉴 칸에 쌀·잡곡 품목이 들어 있음 |
| chungnam | 종로제면소 | 천안시 | `chungnam/naver-1285355722` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 쭈불리 천안신방점 | 천안시 | `chungnam/naver-1673137717` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '쭈'(쭈꾸미)로 읽히면 한식이지만 확실하지 않음. 상호명 검색은 아직 못 함 |
| chungnam | 청천영농조합법인 | 보령시 | `chungnam/naver-1754354427` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '곡물가공·제조'. 백년가게 목록에서 온 가게. 메뉴 칸에 쌀 품목이 들어 있음 |
| chungnam | 초록온담 김사장 수청점 | 당진시 | `chungnam/naver-1931756752` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 카메식당 | 보령시 | `chungnam/naver-1078770555` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '카메'는 일본어풍, '식당'은 종류를 가리키지 않음. 일본 가정식으로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| chungnam | 컴히얼 청당점 | 천안시 | `chungnam/naver-1247709459` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 킨이로텐 | 천안시 | `chungnam/naver-1763567934` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '텐'(튀김)이 든 일본어풍 이름. 텐동·덴푸라(일식)로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| chungnam | 테르니 | 아산시 | `chungnam/naver-1766550756` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 해우 동학사 본점 | 공주시 | `chungnam/naver-2069151911` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 해탄 성성점 | 천안시 | `chungnam/naver-2065960284` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 화육우소 천안두정점 | 천안시 | `chungnam/naver-1976170182` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '육·우'(고기·소)로 보아 소고기 구이(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| chungnam | 환희제면 서산점 | 서산시 | `chungnam/naver-2042596062` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 후미진 | 천안시 | `chungnam/naver-1160032125` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungnam | 히든테이블 신부점 | 천안시 | `chungnam/naver-1687844194` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '테이블'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| jeonnam | 구디츠 | 순천시 | `jeonnam/naver-1169234483` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 꼬미꼬미 | 목포시 | `jeonnam/naver-16744300` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 누아 | 완도군 | `jeonnam/naver-1107022884` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| jeonnam | 대원정 | 보성군 | `jeonnam/naver-1766338959` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 만끽 | 여수시 | `jeonnam/naver-1586721091` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 만배식탁 순천점 | 순천시 | `jeonnam/naver-2090793202` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '식탁'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| jeonnam | 바닐라빌라 | 목포시 | `jeonnam/naver-2038975396` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 바다맛 | 여수시 | `jeonnam/naver-21568910` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 버트 | 담양군 | `jeonnam/naver-1991997120` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 삼성굴비 | 영광군 | `jeonnam/naver-16959311` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '건어물'. 백년가게 목록에서 온 가게. 굴비를 파는 가게 |
| jeonnam | 새벽 | 여수시 | `jeonnam/naver-1543297676` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 서식 | 순천시 | `jeonnam/naver-1945036149` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 소미온 | 여수시 | `jeonnam/naver-2030319605` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 씨펄 | 목포시 | `jeonnam/naver-1180349486` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 아랑주한일침구한복 | 함평군 | `jeonnam/naver-16913139` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '침구·커튼'. 백년가게 목록에서 온 가게 |
| jeonnam | 영영 | 여수시 | `jeonnam/naver-2017875990` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 오수돈생 | 순천시 | `jeonnam/naver-2017170433` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '돈'(돼지)으로 보아 돼지고기(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| jeonnam | 오의 여수죽림점 | 여수시 | `jeonnam/naver-1429211334` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 원조 갯내음 | 목포시 | `jeonnam/naver-36316787` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '갯벌·갯내음'으로 보아 조개·해산물(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| jeonnam | 유달제면소 | 목포시 | `jeonnam/naver-1342349148` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 유진정 | 담양군 | `jeonnam/naver-16080483` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 유진테일러 | 목포시 | `jeonnam/naver-1581623220` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '남성정장'. 백년가게 목록에서 온 가게 |
| jeonnam | 육사심 | 순천시 | `jeonnam/naver-1480963227` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '육'(고기)으로 보아 고깃집(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| jeonnam | 일성의류타운 | 순천시 | `jeonnam/naver-13326728` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '종합패션'. 백년가게 목록에서 온 가게 |
| jeonnam | 일일공오 1105 | 목포시 | `jeonnam/naver-1157642817` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 정심 | 목포시 | `jeonnam/naver-1521834873` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 정한 | 순천시 | `jeonnam/naver-1373493512` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 정희 순천점 | 순천시 | `jeonnam/naver-1208395538` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 여수·순천 말고 서울(김포공항)에도 지점이 있는 가게로 보이지만 무엇을 파는지 확인하지 못함. 같은 가게 2곳. 상호명 검색은 아직 못 함 |
| jeonnam | 정희 여수점 | 여수시 | `jeonnam/naver-1036731331` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 여수·순천 말고 서울(김포공항)에도 지점이 있는 가게로 보이지만 무엇을 파는지 확인하지 못함. 같은 가게 2곳. 상호명 검색은 아직 못 함 |
| jeonnam | 족자카야 | 목포시 | `jeonnam/naver-1444088650` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '족'(족발)+'자카야'(이자카야)로 읽혀 한식과 주점에 걸침. 상호명 검색은 아직 못 함 |
| jeonnam | 진상 | 광양시 | `jeonnam/naver-2027987672` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 진성공예 | 담양군 | `jeonnam/naver-17170527` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '판촉·기념품'. 백년가게 목록에서 온 가게 |
| jeonnam | 짚 | 목포시 | `jeonnam/naver-2093297521` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 초루 | 보성군 | `jeonnam/naver-1983640525` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 트라이팟 | 목포시 | `jeonnam/naver-1620964854` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 팔미방 | 순천시 | `jeonnam/naver-1952419969` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 피시테리안/피시테리 | 목포시 | `jeonnam/naver-1707024229` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '피시'(생선)로 보이지만 양식·일식·한식 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 하늘지기 | 순천시 | `jeonnam/naver-12867258` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 하당일번지 | 목포시 | `jeonnam/naver-12884698` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonnam | 하루한모 | 순천시 | `jeonnam/naver-1932387432` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '한모·콩두'로 보아 두부·콩 요리(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| jeonnam | 호시탐탐 | 여수시 | `jeonnam/naver-1915669393` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | UNWIND | 군산시 | `jeonbuk/naver-2025318584` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 거북이식탁 | 군산시 | `jeonbuk/naver-167342212` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '식탁'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| jeonbuk | 국제금고사 | 군산시 | `jeonbuk/naver-13530975` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '금고'. 백년가게 목록에서 온 가게 |
| jeonbuk | 대영장식지물총판 | 군산시 | `jeonbuk/naver-17149458` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '도배공사'. 백년가게 목록에서 온 가게 |
| jeonbuk | 도싯골 도청점 | 전주시 | `jeonbuk/naver-33560267` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 뜨돈 전주혁신점 | 전주시 | `jeonbuk/naver-2088841342` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '돈'(돼지)으로 보이지만 구이(한식)인지 돈카츠(일식)인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 마이담 | 진안군 | `jeonbuk/naver-35084940` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 바이크나라 | 전주시 | `jeonbuk/naver-11712324` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '오토바이'. 백년가게 목록에서 온 가게 |
| jeonbuk | 배치드롬 전주신시가지점 | 전주시 | `jeonbuk/naver-2005476330` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 봉동 | 완주군 | `jeonbuk/naver-2031245824` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 부들스 | 전주시 | `jeonbuk/naver-2071426157` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 비레레 | 전주시 | `jeonbuk/naver-1402135242` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 서래헌 | 남원시 | `jeonbuk/naver-17350738` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 송범준식당 | 군산시 | `jeonbuk/naver-1276248339` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| jeonbuk | 송해정 | 전주시 | `jeonbuk/naver-1321643230` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 신사동인동 | 군산시 | `jeonbuk/naver-11726653` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 씨즐리 | 전주시 | `jeonbuk/naver-1783607494` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '씨즐'로 보아 스테이크·철판(양식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| jeonbuk | 양누리 신시가지점 | 전주시 | `jeonbuk/naver-1119515452` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '양'이 양고기·양대창을 뜻하는지 확실하지 않음. 상호명 검색은 아직 못 함 |
| jeonbuk | 오타마 전주에코시티점 | 전주시 | `jeonbuk/naver-1210338623` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 온담 전주본점 | 전주시 | `jeonbuk/naver-1972076667` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 올리빈 에코시티점 | 전주시 | `jeonbuk/naver-2071554860` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 유림국기상패사 | 전주시 | `jeonbuk/naver-11685665` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '트로피·상패'. 백년가게 목록에서 온 가게 |
| jeonbuk | 은주 전주에코시티점 | 전주시 | `jeonbuk/naver-2000080898` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 이름이 음식 종류를 가리키지 않음. 같은 가게(은주) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| jeonbuk | 일도당 | 군산시 | `jeonbuk/naver-32237054` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '도장'. 백년가게 목록에서 온 가게 |
| jeonbuk | 정원산책 | 무주군 | `jeonbuk/naver-1044826172` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 조선별관 | 정읍시 | `jeonbuk/naver-1986395691` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 츠쿠 | 군산시 | `jeonbuk/naver-1372638657` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 파쿠야 전주점 | 전주시 | `jeonbuk/naver-1340584191` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 평화주담 | 익산시 | `jeonbuk/naver-2070188113` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '주'(酒)로 읽히면 술집(주점)이지만 확실하지 않음. 상호명 검색은 아직 못 함 |
| jeonbuk | 포포포 | 전주시 | `jeonbuk/naver-2024883774` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '포'가 쌀국수를 뜻하는지 확실하지 않음. 상호명 검색은 아직 못 함 |
| jeonbuk | 풍요 | 전주시 | `jeonbuk/naver-2073193247` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 플뢰르 | 전주시 | `jeonbuk/naver-1453928815` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| jeonbuk | 호리 | 전주시 | `jeonbuk/naver-1579003040` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeonbuk | 화산축산 | 전주시 | `jeonbuk/naver-19917725` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '축산업'. 백년가게 목록에서 온 가게 |
| gyeongbuk | ChapChap | 경산시 | `gyeongbuk/naver-1693700489` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeongbuk | VIP 테일러 | 구미시 | `gyeongbuk/naver-34093046` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '남성정장'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 경신유통 | 경산시 | `gyeongbuk/naver-1157986663` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '축산업용품'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 대화뜨개방 | 경주시 | `gyeongbuk/naver-1815506765` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '뜨개'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 동아의료보조기 보청기 | 안동시 | `gyeongbuk/naver-34417574` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '보청기'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 동양인삼사 | 영주시 | `gyeongbuk/naver-15022718` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '건강기능보조식품'. 백년가게 목록에서 온 가게. 인삼을 파는 가게 |
| gyeongbuk | 동양카정비 | 포항시 | `gyeongbuk/naver-1227499935` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '자동차정비·수리'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 동해안 | 영덕군 | `gyeongbuk/naver-32239625` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '동해안'으로 보아 해산물·횟집(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| gyeongbuk | 라망 앤 브라이덜k | 구미시 | `gyeongbuk/naver-12866819` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '웨딩드레스·예복'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 류복순침구솜틀집 | 안동시 | `gyeongbuk/naver-34333016` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '침구·커튼'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 마지막쉼터 | 포항시 | `gyeongbuk/naver-1690979505` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값이 너무 넓음 / 종류 값 '야식'은 무엇을 파는지 알려 주지 않음. 메뉴·출처 목록도 없음. 상호명 검색은 아직 못 함 |
| gyeongbuk | 서원 | 안동시 | `gyeongbuk/naver-2031469918` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeongbuk | 영천목탁공예사 | 영천시 | `gyeongbuk/naver-11695738` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '목공예품'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 청림산업안전 | 포항시 | `gyeongbuk/naver-1944153351` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '산업용품'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 청심축산물직판장 | 김천시 | `gyeongbuk/naver-1057658045` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '육류가공·제조'. 축산물 직판장. 출처 목록 없음 |
| gyeongbuk | 충주건축자재 | 포항시 | `gyeongbuk/naver-19543269` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '건축자재·용품'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 퀼트하우스 | 문경시 | `gyeongbuk/naver-11554215` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '퀼트'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 현악기사 | 안동시 | `gyeongbuk/naver-15370232` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '악기'. 백년가게 목록에서 온 가게 |
| gyeongbuk | 황남 | 경주시 | `gyeongbuk/naver-2060786887` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungbuk | HSDI | 충주시 | `chungbuk/naver-11888432` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '옥외·전시광고'. 백년가게 목록에서 온 가게 |
| chungbuk | 미와담 | 음성군 | `chungbuk/naver-2037966007` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungbuk | 삼순이 | 증평군 | `chungbuk/naver-1061491128` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungbuk | 삼우정 본점 | 청주시 | `chungbuk/naver-18106884` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| chungbuk | 성충문구 | 충주시 | `chungbuk/naver-13479825` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '종합사무용품'. 백년가게 목록에서 온 가게 |
| chungbuk | 송호관광지 | 영동군 | `chungbuk/naver-13298947` | 기존 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '지역명소'. 메뉴 칸에 야영장 요금이 들어 있음 |
| chungbuk | 신광주방 | 충주시 | `chungbuk/naver-13020612` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '주방용품'. 백년가게 목록에서 온 가게 |
| chungbuk | 신화당 | 보은군 | `chungbuk/naver-11679902` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '결혼예물'. 백년가게 목록에서 온 가게 |
| chungbuk | 신흥지업사 | 음성군 | `chungbuk/naver-37868226` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '벽지·장판·마루'. 백년가게 목록에서 온 가게 |
| chungbuk | 이건창호 통합 전시장 한우창호 | 청주시 | `chungbuk/naver-20819860` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '건축·토목'. 백년가게 목록에서 온 가게 |
| chungbuk | 이재천바버샵 | 증평군 | `chungbuk/naver-17747261` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '이용원'. 백년가게 목록에서 온 가게 |
| chungbuk | 청주폐백 | 청주시 | `chungbuk/naver-13354956` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '폐백·이바지음식'. 백년가게 목록에서 온 가게. 폐백 음식을 만들어 파는 곳. 앉아서 먹는 식당이 아님 |
| gyeongnam | 가호 | 진주시 | `gyeongnam/naver-1013826140` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeongnam | 동피랑 | 통영시 | `gyeongnam/naver-37349717` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeongnam | 보곡당 | 창원시 | `gyeongnam/naver-36444877` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '귀금속·시계'. 백년가게 목록에서 온 가게 |
| gyeongnam | 세이코알바 대경사 | 창원시 | `gyeongnam/naver-31012987` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '시계'. 백년가게 목록에서 온 가게 |
| gyeongnam | 월하동 | 진주시 | `gyeongnam/naver-2008173025` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gyeongnam | 윤스캠퍼 | 진주시 | `gyeongnam/naver-20059735` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '자동차용품·액세서리'. 백년가게 목록에서 온 가게 |
| gyeongnam | 자연농원 | 창원시 | `gyeongnam/naver-1946827264` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '농원'은 고깃집(한식)일 수도, 농장 카페일 수도 있음. 상호명 검색은 아직 못 함 |
| gyeongnam | 창원푸드 | 창원시 | `gyeongnam/naver-60512369` | 기존 비식당 | 식당이 아님 (식품 판매·제조) / 종류 값 '식료품'. 백년가게 목록에서 온 가게 |
| gyeongnam | 학성실크 | 진주시 | `gyeongnam/naver-1440043994` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '원단·섬유·직물'. 백년가게 목록에서 온 가게 |
| gyeongnam | 황금당 | 양산시 | `gyeongnam/naver-15627781` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '귀금속·시계'. 백년가게 목록에서 온 가게 |
| jeju | 다린 | 서귀포시 | `jeju/naver-19299856` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeju | 바다이야기 | 제주시 | `jeju/naver-1017616635` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeju | 어쩌다가 | 제주시 | `jeju/naver-1443246875` | 기존 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '민박'. 맛집 목록('도민이의 제주맛집')에서 왔는데 네이버에는 민박으로 등록됨. 다른 장소와 잘못 연결됐을 수 있음 |
| jeju | 오로시 | 제주시 | `jeju/naver-1470813244` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeju | 우도 | 제주시 | `jeju/naver-1588676712` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeju | 우디 | 제주시 | `jeju/naver-2084372107` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeju | 우주 | 서귀포시 | `jeju/naver-1222188712` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| jeju | 월령포구 | 제주시 | `jeju/naver-17022827` | 기존 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '페리·해운'. 맛집 목록('도민이의 제주맛집')에서 왔는데 포구로 등록됨. 주소도 '제주시'까지만 있어 장소가 잘못 연결된 것으로 보임 |
| jeju | 제주바다 | 서귀포시 | `jeju/naver-38648333` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| jeju | 중앙사진관 | 서귀포시 | `jeju/naver-16936114` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '디지털인화'. 백년가게 목록에서 온 가게 |
| sejong | 뒤웅박고을 | 세종 | `sejong/naver-13272841` | 기존 비식당 | 식당이 아님 (관광지·시설) / 종류 값 '테마공원'. 공원 자체가 등록됨. 출처 목록 없음 |
| sejong | 뜰 세종해밀 본점 | 세종 | `sejong/naver-1570571248` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| sejong | 라쎄종 | 세종 | `sejong/naver-1500436808` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| sejong | 라운지46 | 세종 | `sejong/naver-1956988849` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '라운지'는 바(주점)일 수도, 카페일 수도 있음. 상호명 검색은 아직 못 함 |
| sejong | 야호래 | 세종 | `sejong/naver-1819638410` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| sejong | 연화섬 | 세종 | `sejong/naver-1656042233` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| sejong | 요이텐 | 세종 | `sejong/naver-1053411264` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '텐'(튀김)이 든 일본어풍 이름. 텐동·덴푸라(일식)로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| sejong | 임대장 세종나성점 | 세종 | `sejong/naver-1177485965` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| sejong | 타키 세종나성점 | 세종 | `sejong/naver-2069388475` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| busan | 고원 | 부산진구 | `busan/naver-1898130354` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| busan | 만개 | 영도구 | `busan/naver-2098790222` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| busan | 시월 | 부산진구 | `busan/naver-1230485898` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| busan | 지새우다 서면점 | 부산진구 | `busan/naver-2045309062` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '새우'를 넣은 말장난 이름. 새우 요리집인지 술집인지 알 수 없음. 상호명 검색은 아직 못 함 |
| busan | 칠암만장 해운대 | 해운대구 | `busan/naver-2027416077` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '칠암'(기장 칠암)으로 보아 붕장어·해산물(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| busan | 토암 | 기장군 | `busan/naver-11622446` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| busan | 해수 | 서구 | `busan/naver-2072972807` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| daegu | 뉴요크 | 남구 | `daegu/naver-2091882564` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| daegu | 레브 동명점 | 북구 | `daegu/naver-1224154264` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| daegu | 방짜 | 동구 | `daegu/naver-35228395` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| daegu | 파르코 | 수성구 | `daegu/naver-1227244952` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| daegu | 푸르른 | 중구 | `daegu/naver-2019608393` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| incheon | 만나공원 | 연수구 | `incheon/naver-2054015933` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| incheon | 치즈웨이브 | 미추홀구 | `incheon/naver-1954881301` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '치즈·크림'은 디저트 카페일 수도, 양식당일 수도 있음. 상호명 검색은 아직 못 함 |
| incheon | 쿠모 | 영종구 | `incheon/naver-1386102212` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| incheon | 하나비 | 부평구 | `incheon/naver-21791484` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| gangwon | 올드페퍼 | 원주시 | `gangwon/naver-2071052672` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gangwon | 주인 | 강릉시 | `gangwon/naver-1426981340` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름에 단서 없음 / 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| gangwon | 크림하우스 | 강릉시 | `gangwon/naver-1807622300` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '치즈·크림'은 디저트 카페일 수도, 양식당일 수도 있음. 상호명 검색은 아직 못 함 |
| daejeon | 라쿠엔 | 유성구 | `daejeon/naver-1251447969` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| daejeon | 주도 | 서구 | `daejeon/naver-1377746746` | 미확정(검색 결과 미확인 또는 미검색) | 종류 값 없음, 이름 단서가 갈림 / '주'(酒)로 읽히면 술집(주점)이지만 확실하지 않음. 상호명 검색은 아직 못 함 |
| ulsan | 1번가양복점 | 남구 | `ulsan/naver-37755162` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '남성정장'. 백년가게 목록에서 온 가게 |
| ulsan | 선경혼수전문백화점 | 중구 | `ulsan/naver-1074842972` | 기존 비식당 | 식당이 아님 (다른 업종) / 종류 값 '이불·담요'. 백년가게 목록에서 온 가게 |

---

## 원본 검토 이력 (변경 전, 참고용)

아래는 기존 149건의 분류 근거와 원본 검토 이력을 보존한 내용이다. 아래 수치 및 상태는 이번 추가 분류 이전의 기록이다.

# 미분류 가게 검토 결과 (상호명 검색 반영)

- 기준: 커밋 49e70c0 (카테고리 목록 적용본)의 미분류 596곳
- 결과: 149곳 분류(상호명 검색 118곳 + 지난 검토 31곳), 447곳 미분류
- 상호명 검색 진행: 대상 511곳 중 200곳 검색함(서울 전부, 경기 앞부분). 찾아서 분류 118곳, 못 찾음 77곳, 찾았지만 못 정함 5곳. 남은 311곳은 아직 검색 전
- 검색 방법: 가게 정보 사이트(다이닝코드, 폴레) 검색 결과의 가게 이름·지역·대표 메뉴로 확인. 네이버·카카오 가게 페이지는 열 수 없었음

## 사유별 건수

| 사유 | 건수 | 어떻게 풀리나 |
| --- | ---: | --- |
| 상호명 검색으로 분류 | 118 | 새 카테고리 목록에 반영함 |
| 지난 검토에서 분류 | 31 | 새 카테고리 목록에 반영함 (지난 검토분) |
| 식당이 아님 (다른 업종) | 37 | 식당이 아니므로 카탈로그에서 빼는 것이 맞음 |
| 식당이 아님 (식품 판매·제조) | 10 | 먹을거리를 팔지만 식당은 아님. 남길지 뺄지 정해야 함 |
| 식당이 아님 (관광지·시설) | 7 | 식당 기록이 아님. 빼거나, 안에 있는 식당으로 다시 연결해야 함 |
| 종류 값이 너무 넓음 | 1 | 메뉴를 보고 직접 정하거나 그대로 둠 |
| 종류 값 없음, 이름 단서가 갈림 | 121 | 검색을 이어 가거나 종류 값을 채우면 정해짐 |
| 종류 값 없음, 이름에 단서 없음 | 271 | 검색을 이어 가거나 종류 값을 채우면 정해짐 |
| 합계 | 596 | |

## 상호명 검색으로 분류한 곳

| 지역 | 이름 | 새 카테고리 | 근거 | 출처 |
| --- | --- | --- | --- | --- |
| chungnam | 시선 당진CGV점 | 주점 | 다이닝코드 등록 내용: '이자카야, 술집 (시선 오산운암점·홍대점·건대)' (다른 지점). 같은 이름의 다른 지점·자매점 기준 | [다이닝코드](https://www.diningcode.com/profile.php?rid=mU4TvewTlEys) |
| gyeonggi | 가비양 | 카페·디저트 | 다이닝코드 등록 내용: '핸드드립' (분당) | [다이닝코드](https://www.diningcode.com/profile.php?rid=gtSUyRt0KaY1) |
| gyeonggi | 갯벌스타일 | 한식 | 다이닝코드 등록 내용: '대하구이, 닭갈비' (수원) | [다이닝코드](https://www.diningcode.com/profile.php?rid=ggRt3PRNao1G) |
| gyeonggi | 고브런 | 양식 | 다이닝코드 등록 내용: '브런치' (영통) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Z979RANbq4PN) |
| gyeonggi | Hao홍탄 정자점 | 중식 | 다이닝코드 등록 내용: '짬뽕, 중식' (정자역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=KzIlQg3hhkKD) |
| seoul | 1번지식당 약수역점 | 한식 | 다이닝코드 등록 내용: '소고기구이, 돼지구이' (약수역). 알려 주신 내용(소고기·돼지고기 구이)과 같고 주소도 일치 | [다이닝코드](https://www.diningcode.com/profile.php?rid=4VpfiakFF5lx) |
| seoul | 7.8 2호점 | 주점 | 폴레 등록 내용: '한식주점 (7.8 막걸리 안국점)' (운니동). 같은 이름의 다른 지점·자매점 기준 | [폴레](https://polle.com/place/4Fp9FQ/7.8%20%EB%A7%89%EA%B1%B8%EB%A6%AC) |
| seoul | 가족식탁 | 한식 | 다이닝코드 등록 내용: '한우국밥, 한우육회비빔밥' (망원동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=4NNsWb84R0Bd) |
| seoul | 가츠신 본점 | 일식 | 폴레 등록 내용: '돈까스' (합정동) | [폴레](https://polle.com/place/3uCQ6G/%EA%B0%80%EC%B8%A0%EC%8B%A0) |
| seoul | 고로고로 성수 | 일식 | 폴레 등록 내용: '일식' (성수동2가) | [폴레](https://polle.com/place/3mDeNq/%EA%B3%A0%EB%A1%9C%EA%B3%A0%EB%A1%9C) |
| seoul | 골수 여의도점 | 한식 | 다이닝코드 등록 내용: '감자탕, 뼈구이' (여의도) | [다이닝코드](https://www.diningcode.com/profile.php?rid=ZD2hCGbFwkg2) |
| seoul | 궁가 | 중식 | 다이닝코드 등록 내용: '중식' (명지대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=0wE0Yo7McnME) |
| seoul | 글로드 | 주점 | 다이닝코드 등록 내용: '와인바' (압구정) | [다이닝코드](https://www.diningcode.com/profile.php?rid=fCW1R81OiRtk) |
| seoul | 금문1940 | 중식 | 다이닝코드 등록 내용: '짜장면, 간짜장 (금문)' (혜화) | [다이닝코드](https://www.diningcode.com/profile.php?rid=CGgeKAuHzvwm) |
| seoul | 깃뜰 홍대본점 | 한식 | 다이닝코드 등록 내용: '고깃집, 한식' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=bH3Bich4UWvL) |
| seoul | 남산도담 | 한식 | 다이닝코드 등록 내용: '김치찜, 보쌈' (충무로) | [다이닝코드](https://www.diningcode.com/profile.php?rid=czj3VxZHweGE) |
| seoul | 남산동곳간 | 한식 | 다이닝코드 등록 내용: '김치찌개, 온반' (명동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=2S8KD2gdENfW) |
| seoul | 뇌산마을 대학로점 | 한식 | 다이닝코드 등록 내용: '뼈구이, 생망고빙수' (대학로) | [다이닝코드](https://www.diningcode.com/profile.php?rid=MGcTTnWKkhCt) |
| seoul | 다글다글 | 한식 | 다이닝코드 등록 내용: '닭강정, 마늘강정' (사당) | [다이닝코드](https://www.diningcode.com/profile.php?rid=pX1XfIFyRgNY) |
| seoul | 다리원 | 중식 | 다이닝코드 등록 내용: '중식당' (방배) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Dgm4KDXzHnG3) |
| seoul | 더 씨 | 중식 | 다이닝코드 등록 내용: '중식 (더씨)' (안암역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=2uEkd92qMtZR) |
| seoul | 더파이브올스 | 주점 | 다이닝코드 등록 내용: '칵테일, 칵테일바' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=fTYFhCGq5bVi) |
| seoul | 돈골약방 성수점 | 한식 | 다이닝코드 등록 내용: '곰탕, 돼지곰탕' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=MIrIaxzUaw6h) |
| seoul | 라에비뉴 성수 | 카페·디저트 | 다이닝코드 등록 내용: '디저트, 케이크' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=66uDF2sIm4pM) |
| seoul | 로라 | 양식 | 다이닝코드 등록 내용: '뇨끼, 파스타' (증산역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=J6JbmkIL8Fr1) |
| seoul | 로투스 | 카페·디저트 | 다이닝코드 등록 내용: '커피, 스페셜티커피' (명동성당) | [다이닝코드](https://www.diningcode.com/profile.php?rid=LhmQnzmxx4cf) |
| seoul | 루뽀 | 양식 | 다이닝코드 등록 내용: '파스타, 레스토랑' (광화문) | [다이닝코드](https://www.diningcode.com/profile.php?rid=0gsqgejGgZTg) |
| seoul | 리정원 대흥점 | 한식 | 다이닝코드 등록 내용: '삼겹살, 꽃삼겹살' (대흥역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=2YpEV10JoyZR) |
| seoul | 리프레쉬먼트 | 카페·디저트 | 다이닝코드 등록 내용: '카페, 토마토샐러드' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=OwowaNj2BwVX) |
| seoul | 마테오견문록 | 양식 | 다이닝코드 등록 내용: '파스타, 생면파스타' (금호동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=H7qkzs7fKlBn) |
| seoul | 맥썸 대학로점 | 주점 | 다이닝코드 등록 내용: '맥주, 술집' (혜화) | [다이닝코드](https://www.diningcode.com/profile.php?rid=EPGbGJwxOS0J) |
| seoul | 면식당 홍익대점 | 일식 | 다이닝코드 등록 내용: '라멘, 냉소바' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=5GBndIfrxXrU) |
| seoul | 모리몰리 | 양식 | 다이닝코드 등록 내용: '타코, 김부각' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=pjrvRLIyu9wp) |
| seoul | 모츠모츠 | 주점 | 다이닝코드 등록 내용: '이자카야, 모츠나베' (연남동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=sY6NuLkHSGy1) |
| seoul | 목탄장 | 주점 | 다이닝코드 등록 내용: '와인바 (목탄장 도산점)' (압구정) | [다이닝코드](https://www.diningcode.com/profile.php?rid=CAEX0fFP5AsS) |
| seoul | 무한육채미 홍대점 | 한식 | 다이닝코드 등록 내용: '샤브샤브, 샤브샤브무한리필' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=5G4KPfqworgw) |
| seoul | 미미스낵 | 주점 | 다이닝코드 등록 내용: '이자카야, 술집' (노원역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=zftA9Oj5QG8i) |
| seoul | 밀진향 을지로 | 한식 | 다이닝코드 등록 내용: '메밀국수, 족발' (을지로3가) | [다이닝코드](https://www.diningcode.com/profile.php?rid=LIjOUpIRzj77) |
| seoul | 바이하이 | 주점 | 다이닝코드 등록 내용: '맥주, 하이볼' (약수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=j6kUldlOB8j6) |
| seoul | 반수우안 | 아시안 | 다이닝코드 등록 내용: '베트남음식, 쌀국수' (대학로) | [다이닝코드](https://www.diningcode.com/profile.php?rid=9ZhhALZV0tui) |
| seoul | 백무동 | 한식 | 다이닝코드 등록 내용: '돼지국밥' (구의동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=XBzsyoiLQbnY) |
| seoul | 보틀러 | 카페·디저트 | 다이닝코드 등록 내용: '베이커리카페, 와인바' (충무로) | [다이닝코드](https://www.diningcode.com/profile.php?rid=UHurrSnZiQLX) |
| seoul | 붉은낙타 | 주점 | 다이닝코드 등록 내용: '술집, 퓨전한식' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Ep2biN6VsNP1) |
| seoul | 블루바이필레터 | 양식 | 다이닝코드 등록 내용: '양식, 해산물 (필레터)' (논현동). 같은 이름의 다른 지점·자매점 기준 | [다이닝코드](https://www.diningcode.com/profile.php?rid=6WAsjeNHhVft) |
| seoul | 비욘더 강남 | 주점 | 다이닝코드 등록 내용: '라이브공연, 와인바' (강남역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=PvZySyc3wIxf) |
| seoul | 비움안국 | 양식 | 다이닝코드 등록 내용: '파스타, 김치볶음밥' (북촌) | [다이닝코드](https://www.diningcode.com/profile.php?rid=5vqPPEj21pmr) |
| seoul | 사발 | 한식 | 다이닝코드 등록 내용: '한식, 국수' (광화문) | [다이닝코드](https://www.diningcode.com/profile.php?rid=yoVWlo05S7UQ) |
| seoul | 살롱뒤부케 | 주점 | 다이닝코드 등록 내용: '와인바, 프렌치' (청담) | [다이닝코드](https://www.diningcode.com/profile.php?rid=9B5OD3OOjchE) |
| seoul | 살롱순라 서순라길점 | 양식 | 다이닝코드 등록 내용: '파스타, 피자' (서순라길) | [다이닝코드](https://www.diningcode.com/profile.php?rid=SF2la4YrE0ya) |
| seoul | 상록수 선릉점 | 한식 | 다이닝코드 등록 내용: '고깃집, 황지살' (선릉) | [다이닝코드](https://www.diningcode.com/profile.php?rid=d5cbE0nGWw3W) |
| seoul | 서병장 교대점 | 한식 | 다이닝코드 등록 내용: '부대찌개, 부대볶음 (서병장대김이병)' (교대역). 이름이 조금 달라 같은 가게로 보고 분류 | [다이닝코드](https://www.diningcode.com/profile.php?rid=4JqUXWQc0hlw) |
| seoul | 소주물 신당중앙시장점 | 한식 | 다이닝코드 등록 내용: '고깃집, 주물럭' (신당역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=7hLTHErcA9Md) |
| seoul | 송스키친 | 양식 | 다이닝코드 등록 내용: '파스타·피자, 해물떡볶이' (부암동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Y391v6ddu7q7) |
| seoul | 수도원의 비밀 저장고 | 주점 | 다이닝코드 등록 내용: '맥주, 술집' (종각역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=8CYqwh9LWYru) |
| seoul | 수퍼빌런 | 중식 | 다이닝코드 등록 내용: '중식, 미국' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=xGDwAd4olCSQ) |
| seoul | 술비 | 주점 | 다이닝코드 등록 내용: '요리주점, 퓨전요리' (대학로) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Dqd7sDDLTvDf) |
| seoul | 시카메이 | 일식 | 다이닝코드 등록 내용: '라멘, 쇼유' (망원동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=ZIqEUnT4iKfP) |
| seoul | 신당육 | 한식 | 다이닝코드 등록 내용: '고깃집, 루프탑' (신당역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=81ScVp4MzgNN) |
| seoul | 신촌칼 | 양식 | 다이닝코드 등록 내용: '파스타, 스테이크' (신촌) | [다이닝코드](https://www.diningcode.com/profile.php?rid=sigsqyqlSvzP) |
| seoul | 심경희라라랜드 광화문 | 한식 | 다이닝코드 등록 내용: '소갈비, LA갈비' (종각) | [다이닝코드](https://www.diningcode.com/profile.php?rid=6MQSIf0yQFCc) |
| seoul | 아라타 | 일식 | 다이닝코드 등록 내용: '스시오마카세 (스시아라타)' (여의도) | [다이닝코드](https://www.diningcode.com/profile.php?rid=8z1i6RW8u9FK) |
| seoul | 아민 연남 | 양식 | 다이닝코드 등록 내용: '브런치, 지중해식' (연남동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=GFvsRUZ7H6Tn) |
| seoul | 아키야마 성수본점 | 주점 | 다이닝코드 등록 내용: '이자카야, 해물크림짬뽕' (성수동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=J2lyHoV8zFfi) |
| seoul | 야루키 | 주점 | 다이닝코드 등록 내용: '이자카야, 가리비' (남영동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=ujEHtbrdZCSb) |
| seoul | 어슬도곡 | 한식 | 다이닝코드 등록 내용: '퓨전한식' (도곡) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Gfvc87aS5KPQ) |
| seoul | 에어플레인모드 | 주점 | 다이닝코드 등록 내용: '칵테일바' (신촌) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Z4j5sPAeFszz) |
| seoul | 연남동와이탑 | 양식 | 다이닝코드 등록 내용: '봉골레파스타, 레스토랑' (연남동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=VhXRSx8D5Gvc) |
| seoul | 열기 | 한식 | 다이닝코드 등록 내용: '고깃집, 소고기' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=rdwGkdlW3za0) |
| seoul | 오늘그대와 익선 | 양식 | 다이닝코드 등록 내용: '파스타, 버섯크림리조또' (익선동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=4RZwM6bTA5Lg) |
| seoul | 오밀 성수 | 양식 | 다이닝코드 등록 내용: '파스타, 오므라이스' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=755WNP80Xr4P) |
| seoul | 오우 연남점 | 한식 | 다이닝코드 등록 내용: '한식, 한정식 (오우 OU)' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=nd4NOynYvx1W) |
| seoul | 온류 성수 | 한식 | 다이닝코드 등록 내용: '퓨전한식, 한식다이닝' (서울숲) | [다이닝코드](https://www.diningcode.com/profile.php?rid=ulTH0VrtgFc1) |
| seoul | 온리고앤코 | 양식 | 다이닝코드 등록 내용: '브런치, 퓨전' (신사동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=AMs8Xi1dGBq5) |
| seoul | 온점 을지로점 | 한식 | 다이닝코드 등록 내용: '고깃집, 갈비' (을지로입구역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=GCRYLVK9XGJl) |
| seoul | 와이덴 성수 | 카페·디저트 | 다이닝코드 등록 내용: '커피, 카페 (Whyden)' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=FpjAYWQPxuE9) |
| seoul | 용산피보 | 주점 | 다이닝코드 등록 내용: '와인바' (삼각지) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Pj7eJ9RhlXwj) |
| seoul | 우슴 광화문 직영점 | 한식 | 다이닝코드 등록 내용: '어복쟁반, 불고기' (광화문) | [다이닝코드](https://www.diningcode.com/profile.php?rid=6E97BAxfrzNF) |
| seoul | 우후죽순 신사점 | 주점 | 다이닝코드 등록 내용: '요리주점 (우후죽순 용인·군산수송점)' (다른 지점). 같은 이름의 다른 지점·자매점 기준 | [다이닝코드](https://www.diningcode.com/profile.php?rid=pC1Sdpo4moUK) |
| seoul | 위켄드피크닉 | 카페·디저트 | 다이닝코드 등록 내용: '카페, 후르츠산도' (서울숲) | [다이닝코드](https://www.diningcode.com/profile.php?rid=ZTD9bxXxfXIx) |
| seoul | 이닝 | 중식 | 다이닝코드 등록 내용: '베이징덕, 중식당' (청담) | [다이닝코드](https://www.diningcode.com/profile.php?rid=XZ7ilTW8eRzE) |
| seoul | 이엘포레스트 | 양식 | 다이닝코드 등록 내용: '파스타, 화덕피자' (역삼동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=1ngGQBaOCzeh) |
| seoul | 이짜 | 양식 | 다이닝코드 등록 내용: '화덕피자' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Y5IrY81Jqw8T) |
| seoul | 이찌방이야기 본점 | 주점 | 다이닝코드 등록 내용: '술집, 이자카야' (건대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=ncIOU8ebLkyp) |
| seoul | 이치규 본점 | 일식 | 다이닝코드 등록 내용: '규카츠, 채끝살' (삼성역) | [다이닝코드](https://www.diningcode.com/profile.php?rid=8hsNz9y3q5Gq) |
| seoul | 일품 광화문점 | 일식 | 다이닝코드 등록 내용: '카이센동, 일식' (광화문) | [다이닝코드](https://www.diningcode.com/profile.php?rid=lyRGEpQEfDQZ) |
| seoul | 잇다프로젝트 연남 | 양식 | 다이닝코드 등록 내용: '파스타, 레스토랑' (연남동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=mJAsvrIIQIFR) |
| seoul | 자자 | 중식 | 다이닝코드 등록 내용: '중식당' (합정) | [다이닝코드](https://www.diningcode.com/profile.php?rid=hHw1w93M4hh3) |
| seoul | 장수원 | 한식 | 다이닝코드 등록 내용: '평양냉면, 불고기' (방배) | [다이닝코드](https://www.diningcode.com/profile.php?rid=2BxhHtZePTL7) |
| seoul | 저저 | 한식 | 다이닝코드 등록 내용: '한식' (서교동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=s7mxRgUmF2zJ) |
| seoul | 전자방 필동점 | 중식 | 다이닝코드 등록 내용: '중식, 퓨전중식 (전자방 성수)' (다른 지점). 같은 이름의 다른 지점·자매점 기준 | [다이닝코드](https://www.diningcode.com/profile.php?rid=BoFymyp2UqoR) |
| seoul | 제비한옥 | 한식 | 다이닝코드 등록 내용: '한식, 육회비빔밥' (충정로) | [다이닝코드](https://www.diningcode.com/profile.php?rid=KfNHkeSLQxtv) |
| seoul | 조선시대 | 주점 | 다이닝코드 등록 내용: '술집, 막걸리' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=GXmSQiNGzBd4) |
| seoul | 지금이밤 성수본점 | 주점 | 다이닝코드 등록 내용: '이자카야, 술집' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=aUKHAtvdvn2T) |
| seoul | 청담해정 | 한식 | 다이닝코드 등록 내용: '선지해장국, 양지수육' (청담) | [다이닝코드](https://www.diningcode.com/profile.php?rid=KqyeRwxLKlUd) |
| seoul | 청화원 | 중식 | 다이닝코드 등록 내용: '딤섬, 우육면' (신촌) | [다이닝코드](https://www.diningcode.com/profile.php?rid=4BxGZbO8eADg) |
| seoul | 춘식당 가로수길본점 | 주점 | 다이닝코드 등록 내용: '술집, 한식주점' (신사) | [다이닝코드](https://www.diningcode.com/profile.php?rid=cTBb3Kalknab) |
| seoul | 코너룸 성수 | 주점 | 다이닝코드 등록 내용: '와인바' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=5FETYwfppNkN) |
| seoul | 코메 압구정로데오 | 주점 | 다이닝코드 등록 내용: '이자카야, 비스트로' (압구정) | [다이닝코드](https://www.diningcode.com/profile.php?rid=LnZ4R4gF6grc) |
| seoul | 쿄오카이 | 주점 | 다이닝코드 등록 내용: '이자카야, 일본' (합정) | [다이닝코드](https://www.diningcode.com/profile.php?rid=JfX0OmrjaCgC) |
| seoul | 키보아츠아츠 광화문 | 양식 | 다이닝코드 등록 내용: '경양식, 돈까스' (광화문) | [다이닝코드](https://www.diningcode.com/profile.php?rid=lsV5sLgGxdwD) |
| seoul | 키타미 | 일식 | 다이닝코드 등록 내용: '오코노미야키, 야끼소바' (망원동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=yZDxl2z1Ii0L) |
| seoul | 탑골공원 종로3가점 | 한식 | 다이닝코드 등록 내용: '냉삼, 고기집' (종로3가) | [다이닝코드](https://www.diningcode.com/profile.php?rid=r8ZRmF3lmE1S) |
| seoul | 토마토코엔 | 일식 | 다이닝코드 등록 내용: '일본가정식, 나폴리탄' (망원동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=Qk1exYfMDFN8) |
| seoul | 퍼블릭가든 | 카페·디저트 | 다이닝코드 등록 내용: '카페, 루프탑' (광장시장) | [다이닝코드](https://www.diningcode.com/profile.php?rid=NDP8Ns0NnAtg) |
| seoul | 페레힐 | 양식 | 다이닝코드 등록 내용: '스페인음식' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=f8ZrYelacTEm) |
| seoul | 포썸 | 아시안 | 다이닝코드 등록 내용: '쌀국수, 베트남쌀국수' (성신여대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=cwA43ZlBYf9P) |
| seoul | 표주 | 주점 | 다이닝코드 등록 내용: '요리주점, 전통주' (신당) | [다이닝코드](https://www.diningcode.com/profile.php?rid=8NwpcWStqJ0J) |
| seoul | 피플더테라스 | 주점 | 다이닝코드 등록 내용: '칵테일, 와인바' (청담) | [다이닝코드](https://www.diningcode.com/profile.php?rid=L4DmIB4n3VWk) |
| seoul | 헤이베르트 | 양식 | 다이닝코드 등록 내용: '브런치' (서래마을) | [다이닝코드](https://www.diningcode.com/profile.php?rid=YRAdA9F6IjfC) |
| seoul | 헨리스플랏 | 카페·디저트 | 다이닝코드 등록 내용: '카페, 영국' (성수) | [다이닝코드](https://www.diningcode.com/profile.php?rid=DQ5CTkOOUGFx) |
| seoul | 혼신꼬치 본점 | 주점 | 다이닝코드 등록 내용: '이자카야, 야키토리' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=9FnSvJtOBSk6) |
| seoul | 홍대공감 | 주점 | 다이닝코드 등록 내용: '이자카야, 룸술집' (홍대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=n6dUY32vjFnF) |
| seoul | 화기애애 본점 | 한식 | 다이닝코드 등록 내용: '고깃집, 화로구이' (건대) | [다이닝코드](https://www.diningcode.com/profile.php?rid=l35wHL5ConOa) |
| seoul | 희로 | 주점 | 다이닝코드 등록 내용: '이자카야' (연희동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=oUNuuGJFv0WY) |
| seoul | 희희 | 일식 | 다이닝코드 등록 내용: '소바, 온소바' (대학로) | [다이닝코드](https://www.diningcode.com/profile.php?rid=6JpGuWhR3MD8) |
| seoul | 힛사츠와자 | 일식 | 다이닝코드 등록 내용: '라멘, 츠케멘' (망원동) | [다이닝코드](https://www.diningcode.com/profile.php?rid=S52ONZFGIuou) |
| seoul | KOTA | 양식 | 폴레 등록 내용: '멕시칸' (경희대) | [폴레](https://polle.com/place/10PSqN/%EC%BD%94%ED%83%80) |
| seoul | Verde | 양식 | 다이닝코드 등록 내용: '브런치, 뇨끼 (베르데 문래 / 베르두레 영등포구청)' (문래·영등포구청). 이름이 조금 달라 같은 가게로 보고 분류 | [다이닝코드](https://www.diningcode.com/profile.php?rid=zPBLDiZ0j7Wi) |

## 지난 검토에서 분류한 곳

| 지역 | 이름 | 새 카테고리 | 근거 |
| --- | --- | --- | --- |
| chungnam | 대손관 천안 두정점 | 한식 | 같은 체인 청주 오송점이 밀면집. 체인 기준 |
| chungnam | 양은이네 신용화온천동점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| chungnam | 양은이네 아산테크노밸리점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| chungnam | 양은이네 천안두정동점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| chungnam | 양은이네 천안법원점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| chungnam | 양은이네 충남보령점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| gwangju | 정동 전대점 | 일식 | 같은 이름의 광주 수완 본점이 돈까스집. 체인으로 보고 분류 |
| gwangju | 종착역 광주수완점 | 한식 | 같은 체인 전주신시가지점이 돼지고기 고깃집. 체인 기준 |
| gwangju | 하해가 | 한식 | 주소가 같은 가게(내방로 37)가 장어구이집으로 확인됨 |
| gwangju | 하해가시즌2점 | 한식 | 같은 가게 본점이 장어구이집. 체인 기준 |
| gyeonggi | 대손관 수원광교법원점 | 한식 | 같은 체인 청주 오송점이 밀면집. 체인 기준 |
| gyeonggi | 물고기자리 정자점 | 한식 | 같은 가게 강남점이 생선구이집. 체인 기준 |
| gyeonggi | 산뜨락 동탄점 | 한식 | 같은 가게 수지본점이 한정식집. 체인 기준 |
| gyeonggi | 산뜨락 수지본점 | 한식 | 주소가 같은 가게(신봉2로 180)가 한정식집으로 확인됨 |
| gyeonggi | 손에손잡고 광교직영점 | 주점 | 같은 체인 방이직영점이 한식주점(닭도리탕·김치전 안주). 체인 기준 |
| gyeonggi | 양은이네 광교점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| gyeonggi | 양은이네 동탄호수공원점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| gyeonggi | 오산카세 참치정육점 | 일식 | 이름에 '참치'와 '(오마)카세'가 있음. 지난번에는 '참치정육점'을 지점명으로 잘못 떼어 내서 놓쳤음 |
| jeonbuk | 꾸아 전주만성혁신도시점 | 아시안 | 카탈로그에 있는 같은 체인 성수본점의 종류 값이 '베트남음식' |
| jeonbuk | 양은이네 익산동산동점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| jeonbuk | 정동 전주객사점 | 일식 | 같은 이름의 광주 수완 본점이 돈까스집. 체인으로 보고 분류 |
| jeonbuk | 프프프ver.2 | 중식 | 같은 가게 객사길 본점이 중식(우육면·탄탄면)이고 전주에 지점이 여럿이라고 소개됨. 체인 기준 |
| jeonbuk | 프프프ver.3 | 중식 | 같은 가게 객사길 본점이 중식(우육면·탄탄면)이고 전주에 지점이 여럿이라고 소개됨. 체인 기준 |
| sejong | 양은이네 세종보람점 | 한식 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| seoul | 뀌쏭82 | 양식 | 주소가 같은 가게(양재천로 167)가 프렌치 레스토랑(CUISSON 82)으로 확인됨 |
| seoul | 물고기자리 강남점 | 한식 | 주소가 같은 가게(언주로133길 18)가 생선구이집으로 확인됨 |
| seoul | 부산어묵 | 분식 | 메뉴가 오뎅·고기만두·김치만두 포장. 지난번에는 종류 값 '가공식품' 때문에 보류했음 |
| seoul | 손에손잡고 삼성직영점 | 주점 | 같은 체인 방이직영점이 한식주점(닭도리탕·김치전 안주). 체인 기준 |
| seoul | 엔트리55 사당점 | 주점 | 출처가 '저장 많은 재즈바 50선'. 지난번에는 종류 값 '공연·연극시설' 때문에 보류했음 |
| seoul | 키노이에 | 일식 | 주소가 같은 가게(동호로 325)가 일식(오코노미야끼)으로 확인됨 |
| 회사 근처 | 뀌쏭82 | 양식 | 주소가 같은 가게(양재천로 167)가 프렌치 레스토랑(CUISSON 82)으로 확인됨 |

## seoul (197)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 1101 뮤지엄 | 전시관 | 서초구 | `naver-1534702143` | 미분류 | 식당이 아님 (관광지·시설) | 종류 값 '전시관'. 예술의전당 안 전시 공간으로 등록됨. 출처 목록 없음 |
| 1808 | — | 강남구 | `naver-1557155795` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 |
| 1번지식당 약수역점 | — | 중구 | `naver-1908410135` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '소고기구이, 돼지구이' (약수역). 알려 주신 내용(소고기·돼지고기 구이)과 같고 주소도 일치 |
| 7.8 2호점 | — | 종로구 | `naver-1871966656` | → 주점 | 상호명 검색으로 분류 | 폴레 등록 내용: '한식주점 (7.8 막걸리 안국점)' (운니동). 같은 이름의 다른 지점·자매점 기준 |
| FRAMER | — | 용산구 | `naver-1774444658` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 |
| KOTA | — | 동대문구 | `naver-2055206907` | → 양식 | 상호명 검색으로 분류 | 폴레 등록 내용: '멕시칸' (경희대) |
| Verde | — | 영등포구 | `naver-1218512724` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '브런치, 뇨끼 (베르데 문래 / 베르두레 영등포구청)' (문래·영등포구청). 이름이 조금 달라 같은 가게로 보고 분류 |
| 가족식탁 | — | 마포구 | `kakao-1707192274` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '한우국밥, 한우육회비빔밥' (망원동) |
| 가츠신 본점 | — | 마포구 | `naver-1099123355` | → 일식 | 상호명 검색으로 분류 | 폴레 등록 내용: '돈까스' (합정동) |
| 갈대포 | — | 관악구 | `kakao-1047245706` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드 · 폴레)에서도 찾지 못함 |
| 고로고로 성수 | — | 성동구 | `naver-1838211811` | → 일식 | 상호명 검색으로 분류 | 폴레 등록 내용: '일식' (성수동2가) |
| 골수 여의도점 | — | 영등포구 | `kakao-442722045` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '감자탕, 뼈구이' (여의도) |
| 굽 | — | 중구 | `naver-1366205207` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '굽'은 구이를 떠올리게 하지만 무엇을 굽는지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 궁가 | — | 서대문구 | `naver-1625529373` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '중식' (명지대) |
| 그루트 | — | 강남구 | `naver-2098303895` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 그룬트 | — | 성동구 | `naver-1048776964` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 글로드 | — | 강남구 | `naver-1102257065` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '와인바' (압구정) |
| 금문1940 | — | 종로구 | `naver-1966599047` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '짜장면, 간짜장 (금문)' (혜화) |
| 깃뜰 홍대본점 | — | 마포구 | `kakao-1708119130` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '고깃집, 한식' (홍대) |
| 까사꼬네호 | — | 중구 | `naver-2040225659` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 뀌쏭82 | — | 강남구 | `kakao-17382395` | → 양식 | 지난 검토에서 분류 | 주소가 같은 가게(양재천로 167)가 프렌치 레스토랑(CUISSON 82)으로 확인됨 |
| 나린제 | — | 성동구 | `naver-2092472020` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 남산도담 | — | 중구 | `naver-1835052467` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '김치찜, 보쌈' (충무로) |
| 남산동곳간 | — | 중구 | `naver-1102983230` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '김치찌개, 온반' (명동) |
| 넓은마당 | — | 노원구 | `naver-2054341602` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 뇌산마을 대학로점 | — | 종로구 | `naver-1025499869` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '뼈구이, 생망고빙수' (대학로) |
| 다글다글 | — | 관악구 | `kakao-18358291` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '닭강정, 마늘강정' (사당) |
| 다리원 | — | 서초구 | `naver-20225689` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '중식당' (방배) |
| 다팀 | — | 서초구 | `naver-1386154822` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 대양장 | — | 서대문구 | `naver-1074749296` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 더 씨 | — | 성북구 | `naver-1574560244` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '중식 (더씨)' (안암역) |
| 더파이브올스 | — | 마포구 | `naver-35408316` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '칵테일, 칵테일바' (홍대) |
| 돈골약방 성수점 | — | 성동구 | `naver-1655142962` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '곰탕, 돼지곰탕' (성수) |
| 동남방앗간 한남점 | — | 용산구 | `naver-1938018806` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 둥우리 | — | 중구 | `naver-2094093935` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 라에비뉴 성수 | — | 성동구 | `naver-1199055314` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '디저트, 케이크' (성수) |
| 랑게 | — | 마포구 | `naver-1739638792` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 로그 성수 | — | 성동구 | `naver-2091607037` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 로라 | — | 서대문구 | `naver-1079833320` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '뇨끼, 파스타' (증산역) |
| 로투스 | — | 중구 | `naver-1102973917` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '커피, 스페셜티커피' (명동성당) |
| 루뽀 | — | 종로구 | `naver-1744097298` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 레스토랑' (광화문) |
| 리정원 대흥점 | — | 마포구 | `naver-1649349828` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '삼겹살, 꽃삼겹살' (대흥역) |
| 리프레쉬먼트 | — | 성동구 | `naver-1318829354` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '카페, 토마토샐러드' (성수) |
| 마테오견문록 | — | 성동구 | `kakao-72819043` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 생면파스타' (금호동) |
| 맥그리코 혜화대학로점 | — | 종로구 | `naver-2061812129` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 맥썸 대학로점 | — | 종로구 | `naver-1946473141` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '맥주, 술집' (혜화) |
| 멘쿠도 성수점 | — | 성동구 | `naver-2096559480` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '멘'(면)으로 보아 라멘·면 요리 같지만 일식인지 다른 면 요리인지 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 면식당 홍익대점 | — | 마포구 | `naver-1818105757` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '라멘, 냉소바' (홍대) |
| 모리몰리 | — | 성동구 | `naver-2095203722` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '타코, 김부각' (성수) |
| 모츠모츠 | — | 마포구 | `naver-1875624361` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 모츠나베' (연남동) |
| 목탄장 | — | 강남구 | `naver-1886465835` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '와인바 (목탄장 도산점)' (압구정) |
| 무한육채미 홍대점 | — | 마포구 | `naver-1499649038` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '샤브샤브, 샤브샤브무한리필' (홍대) |
| 물고기자리 강남점 | — | 강남구 | `naver-20955570` | → 한식 | 지난 검토에서 분류 | 주소가 같은 가게(언주로133길 18)가 생선구이집으로 확인됨 |
| 미미스낵 | — | 노원구 | `kakao-1146729859` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 술집' (노원역) |
| 밀라노식당 | — | 마포구 | `naver-1309585620` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '밀라노'로 보아 이탈리안(양식) 같지만 '식당'이라 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 밀진향 을지로 | — | 중구 | `naver-2005819536` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '메밀국수, 족발' (을지로3가) |
| 바위드 | — | 마포구 | `naver-1023957785` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 바이하이 | — | 중구 | `naver-1282693601` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '맥주, 하이볼' (약수) |
| 반수우안 | — | 종로구 | `naver-1820042497` | → 아시안 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '베트남음식, 쌀국수' (대학로) |
| 반지하 선릉점 | — | 강남구 | `naver-2040091689` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 백무동 | — | 광진구 | `naver-2094095596` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '돼지국밥' (구의동) |
| 베리키친 | — | 중구 | `naver-36379024` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '키친'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 베이킹 도우 | — | 종로구 | `naver-37282209` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '도우·오븐'은 베이커리(카페·디저트)일 수도, 피자집(양식)일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 보또비노 | — | 성동구 | `naver-1635873247` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '비노'(와인)로 보아 와인바(주점)나 이탈리안(양식) 중 하나로 보임. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 보틀러 | — | 중구 | `naver-1538911146` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '베이커리카페, 와인바' (충무로) |
| 부산어묵 | 가공식품 | 용산구 | `naver-13506278` | → 분식 | 지난 검토에서 분류 | 메뉴가 오뎅·고기만두·김치만두 포장. 지난번에는 종류 값 '가공식품' 때문에 보류했음 |
| 붉은낙타 | — | 마포구 | `naver-1755908543` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '술집, 퓨전한식' (홍대) |
| 브라운 에비뉴 | — | 종로구 | `naver-35545619` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 블루바이필레터 | — | 강남구 | `kakao-511051678` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '양식, 해산물 (필레터)' (논현동). 같은 이름의 다른 지점·자매점 기준 |
| 비바 | — | 서대문구 | `naver-2087485549` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 비오 | — | 종로구 | `naver-2004379803` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 비욘더 강남 | — | 강남구 | `naver-1242730767` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '라이브공연, 와인바' (강남역) |
| 비움안국 | — | 종로구 | `naver-2031639370` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 김치볶음밥' (북촌) |
| 빅러브토마토 | — | 종로구 | `naver-2066965601` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 빅테일 동묘 | — | 종로구 | `naver-1274948513` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 빌라토 | — | 마포구 | `naver-1862358398` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 사발 | — | 종로구 | `naver-12780345` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '한식, 국수' (광화문) |
| 산수 사당본점 | — | 동작구 | `kakao-16818524` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 살롱뒤부케 | — | 강남구 | `kakao-2073196362` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '와인바, 프렌치' (청담) |
| 살롱순라 서순라길점 | — | 종로구 | `naver-1266673496` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 피자' (서순라길) |
| 상록수 선릉점 | — | 강남구 | `naver-1021725079` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '고깃집, 황지살' (선릉) |
| 서병장 교대점 | — | 서초구 | `naver-36282951` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '부대찌개, 부대볶음 (서병장대김이병)' (교대역). 이름이 조금 달라 같은 가게로 보고 분류 |
| 섬소년자연주의 | — | 마포구 | `naver-19878363` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 소주물 신당중앙시장점 | — | 중구 | `naver-1560212094` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '고깃집, 주물럭' (신당역) |
| 손에손잡고 삼성직영점 | — | 강남구 | `naver-2036713782` | → 주점 | 지난 검토에서 분류 | 같은 체인 방이직영점이 한식주점(닭도리탕·김치전 안주). 체인 기준 |
| 송스키친 | 퓨전음식 | 종로구 | `naver-36831879` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타·피자, 해물떡볶이' (부암동) |
| 수도원의 비밀 저장고 | — | 종로구 | `naver-2062353872` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '맥주, 술집' (종각역) |
| 수퍼빌런 | — | 마포구 | `naver-1819522030` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '중식, 미국' (홍대) |
| 술비 | — | 종로구 | `naver-1123934065` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '요리주점, 퓨전요리' (대학로) |
| 시카메이 | — | 마포구 | `naver-1340899330` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '라멘, 쇼유' (망원동) |
| 신당육 | — | 중구 | `naver-1041655574` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '고깃집, 루프탑' (신당역) |
| 신촌칼 | — | 서대문구 | `naver-262362736` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 스테이크' (신촌) |
| 실비무교 | — | 중구 | `naver-2034786984` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '실비'(실비집)로 보아 술집(주점)이나 한식 백반 중 하나로 보임. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 심경희라라랜드 광화문 | — | 종로구 | `kakao-779352240` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '소갈비, LA갈비' (종각) |
| 써니눅 성수 | — | 성동구 | `naver-1802761649` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 검색 결과가 '와인, 에그베네딕트'라서 한 카테고리로 정하지 못함. 고유명사 이름이라 음식 종류를 알 수 없음 [다이닝코드](https://www.diningcode.com/profile.php?rid=uqx6WYdJMaYV) |
| 아라타 | — | 영등포구 | `naver-1036879498` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '스시오마카세 (스시아라타)' (여의도) |
| 아민 연남 | — | 마포구 | `naver-1775967927` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '브런치, 지중해식' (연남동) |
| 아웃오브오더 | — | 성동구 | `naver-1334028812` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 아키야마 성수본점 | — | 성동구 | `naver-37748060` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 해물크림짬뽕' (성수동) |
| 아후 Ahoo | — | 성동구 | `naver-1912626916` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 알렉스루카 | — | 강남구 | `naver-2092502028` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 앵그리누들 | — | 강남구 | `naver-2022737326` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 검색 결과가 '에그누들'라서 한 카테고리로 정하지 못함. '누들'만으로는 어떤 면 요리인지 알 수 없음 [다이닝코드](https://www.diningcode.com/profile.php?rid=n6LDr2LTpcb3) |
| 야루키 | — | 용산구 | `naver-1458330684` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 가리비' (남영동) |
| 어구생 | — | 서대문구 | `naver-2092681070` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 어부이야기 | — | 서초구 | `naver-1596684844` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '어부'로 보아 해산물집 같지만 횟집(한식)인지 술집(주점)인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 어슬도곡 | — | 강남구 | `naver-1796427688` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '퓨전한식' (도곡) |
| 에스메로 | — | 성동구 | `naver-1736738437` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 에어플레인모드 | — | 서대문구 | `naver-1237443583` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '칵테일바' (신촌) |
| 엔트리55 사당점 | 공연·연극시설 | 동작구 | `naver-1775587949` | → 주점 | 지난 검토에서 분류 | 출처가 '저장 많은 재즈바 50선'. 지난번에는 종류 값 '공연·연극시설' 때문에 보류했음 |
| 연남동와이탑 | — | 마포구 | `naver-1978161435` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '봉골레파스타, 레스토랑' (연남동) |
| 연희 바다 | — | 서대문구 | `naver-2032357843` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 열기 | — | 성동구 | `naver-1377369014` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '고깃집, 소고기' (성수) |
| 오늘그대와 익선 | — | 종로구 | `naver-1859572081` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 버섯크림리조또' (익선동) |
| 오밀 성수 | — | 성동구 | `naver-1154437933` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 오므라이스' (성수) |
| 오우 연남점 | — | 마포구 | `naver-35831307` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '한식, 한정식 (오우 OU)' (홍대) |
| 온류 성수 | — | 성동구 | `naver-1167065844` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '퓨전한식, 한식다이닝' (서울숲) |
| 온리고앤코 | — | 강남구 | `naver-1975463492` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '브런치, 퓨전' (신사동) |
| 온점 을지로점 | — | 중구 | `naver-1724563569` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '고깃집, 갈비' (을지로입구역) |
| 온하루 | 식료품 | 종로구 | `naver-1763776172` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '식료품'. 맛집 목록('맛준 맛집')에서 왔지만 무엇을 파는 곳인지 확인하지 못함 |
| 올리멘 강남 빗썸금융타워점 | — | 강남구 | `naver-2012444424` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '멘'(면)으로 보아 라멘·면 요리 같지만 일식인지 다른 면 요리인지 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 올음 | — | 성동구 | `naver-1943698416` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 검색 결과가 '오마카세, 전통주'라서 한 카테고리로 정하지 못함. 고유명사 이름이라 음식 종류를 알 수 없음 [다이닝코드](https://www.diningcode.com/profile.php?rid=gXQxaA7XG1Qs) |
| 와이덴 성수 | — | 성동구 | `naver-1982767346` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '커피, 카페 (Whyden)' (성수) |
| 용산피보 | — | 용산구 | `naver-1945001807` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '와인바' (삼각지) |
| 우슴 광화문 직영점 | — | 종로구 | `naver-2000807877` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '어복쟁반, 불고기' (광화문) |
| 우치야 | — | 종로구 | `naver-2029371902` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 우후죽순 신사점 | — | 강남구 | `naver-2090901807` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '요리주점 (우후죽순 용인·군산수송점)' (다른 지점). 같은 이름의 다른 지점·자매점 기준 |
| 움푹 | — | 중구 | `naver-1923586497` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 위켄드피크닉 | — | 성동구 | `naver-1479918531` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '카페, 후르츠산도' (서울숲) |
| 이닝 | — | 강남구 | `kakao-12602260` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '베이징덕, 중식당' (청담) |
| 이엘포레스트 | — | 강남구 | `naver-1755586163` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 화덕피자' (역삼동) |
| 이와자루 성수 | — | 성동구 | `naver-1974548944` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 이짜 | — | 성동구 | `naver-1156003131` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '화덕피자' (성수) |
| 이찌방이야기 본점 | — | 광진구 | `kakao-1464045489` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '술집, 이자카야' (건대) |
| 이치규 본점 | — | 강남구 | `naver-1204687706` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '규카츠, 채끝살' (삼성역) |
| 이케 | — | 강남구 | `naver-1983944498` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 일상정원 서울역점 | — | 중구 | `naver-1942269081` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 검색 결과가 '스키야키, 샤브샤브'라서 한 카테고리로 정하지 못함. 고유명사 이름이라 음식 종류를 알 수 없음 [다이닝코드](https://www.diningcode.com/profile.php?rid=dljL4KPVmDFE) |
| 일품 광화문점 | — | 종로구 | `naver-1276574358` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '카이센동, 일식' (광화문) |
| 잇다프로젝트 연남 | — | 마포구 | `naver-1344661821` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '파스타, 레스토랑' (연남동) |
| 자자 | — | 마포구 | `naver-1418628816` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '중식당' (합정) |
| 작정 압구정 | — | 강남구 | `naver-1728665773` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 검색 결과가 '파인다이닝, 맡김차림'라서 한 카테고리로 정하지 못함. 고유명사 이름이라 음식 종류를 알 수 없음 [다이닝코드](https://www.diningcode.com/profile.php?rid=PyFRkQk7T3Jr) |
| 장수원 | — | 서초구 | `kakao-10736585` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '평양냉면, 불고기' (방배) |
| 저저 | — | 마포구 | `naver-1279278264` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '한식' (서교동) |
| 전자방 필동점 | — | 중구 | `naver-2032433763` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '중식, 퓨전중식 (전자방 성수)' (다른 지점). 같은 이름의 다른 지점·자매점 기준 |
| 제비한옥 | — | 중구 | `naver-2060060309` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '한식, 육회비빔밥' (충정로) |
| 제야 | — | 종로구 | `naver-1286056717` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 조선시대 | — | 마포구 | `naver-1302809851` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '술집, 막걸리' (홍대) |
| 종로클라쓰 | — | 종로구 | `naver-2039056625` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 지금이밤 성수본점 | — | 성동구 | `naver-1883905907` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 술집' (성수) |
| 청담해정 | — | 강남구 | `naver-1006524862` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '선지해장국, 양지수육' (청담) |
| 청춘식당미래소년 | — | 서초구 | `naver-36651713` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 청화원 | — | 서대문구 | `kakao-886596199` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '딤섬, 우육면' (신촌) |
| 춘식당 가로수길본점 | — | 강남구 | `naver-38391956` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '술집, 한식주점' (신사) |
| 카루 | — | 서초구 | `naver-38264451` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 칸트힐 | — | 중구 | `naver-2008465062` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 코너룸 성수 | — | 성동구 | `naver-1688205316` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '와인바' (성수) |
| 코메 압구정로데오 | — | 강남구 | `naver-1763662575` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 비스트로' (압구정) |
| 쿄오카이 | — | 마포구 | `naver-1230882641` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 일본' (합정) |
| 쿠히치 압구정점 | — | 강남구 | `naver-1826026569` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 키노이에 | — | 중구 | `naver-1245684734` | → 일식 | 지난 검토에서 분류 | 주소가 같은 가게(동호로 325)가 일식(오코노미야끼)으로 확인됨 |
| 키노이에 파티 | — | 강남구 | `naver-2094230942` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 키노이에(일식)의 자매점으로 보이지만 같은 메뉴인지 확인하지 못함. 일식 아니면 주점. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 키보아츠아츠 광화문 | — | 종로구 | `naver-2040179619` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '경양식, 돈까스' (광화문) |
| 키슌 | — | 강남구 | `naver-1074062899` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 키친봄날 | — | 서대문구 | `kakao-1573253740` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '키친'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 키타미 | — | 마포구 | `naver-1528692931` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '오코노미야키, 야끼소바' (망원동) |
| 탑골공원 종로3가점 | — | 종로구 | `naver-2098007244` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '냉삼, 고기집' (종로3가) |
| 토리비 합정점 | — | 마포구 | `naver-1837437884` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '토리'(닭)가 든 일본어풍 이름. 야키토리(주점)일 가능성이 높지만 일식 닭요리일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 토마토코엔 | — | 마포구 | `naver-1661967766` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '일본가정식, 나폴리탄' (망원동) |
| 토파 | — | 강남구 | `naver-2039983018` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 토피 | — | 서초구 | `naver-2094972347` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 팬톤 클래식 | — | 성동구 | `naver-1662708681` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 퍼블릭가든 | — | 종로구 | `naver-1095083089` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '카페, 루프탑' (광장시장) |
| 페레힐 | — | 성동구 | `naver-2087524275` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '스페인음식' (성수) |
| 포도젝트 | — | 성동구 | `naver-1732986089` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '포도'로 보아 와인바(주점) 같지만 확정하지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 포썸 | — | 성북구 | `naver-1104324042` | → 아시안 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '쌀국수, 베트남쌀국수' (성신여대) |
| 표주 | — | 중구 | `naver-1754340217` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '요리주점, 전통주' (신당) |
| 프레스코 | — | 마포구 | `naver-2080385901` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 피엔에이 서촌 | — | 종로구 | `naver-2003857763` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 피플더테라스 | — | 강남구 | `naver-1825152608` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '칵테일, 와인바' (청담) |
| 핑퐁서울 | — | 마포구 | `naver-1098697502` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 하이브 플레이그라운드 | — | 용산구 | `naver-2016354571` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 해누리 | — | 강서구 | `naver-1705177116` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 해방촌 이음 | — | 용산구 | `naver-2095019461` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 헤이베르트 | — | 서초구 | `naver-1121688867` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '브런치' (서래마을) |
| 헨리스플랏 | — | 성동구 | `naver-1011293106` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '카페, 영국' (성수) |
| 헨릭 | — | 성동구 | `naver-2000889807` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 호랭이카노 | — | 성동구 | `naver-1856927545` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 혼신꼬치 본점 | — | 마포구 | `naver-1820361832` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 야키토리' (홍대) |
| 홍대 교도리 | — | 마포구 | `kakao-803910728` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 홍대공감 | — | 마포구 | `naver-1654577204` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 룸술집' (홍대) |
| 화계장 | — | 노원구 | `kakao-1749957373` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 화기애애 본점 | — | 광진구 | `naver-19866308` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '고깃집, 화로구이' (건대) |
| 화락관 신촌 본점 | — | 마포구 | `kakao-967124721` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 화류 | — | 마포구 | `naver-1011218680` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 후스테이블 | — | 종로구 | `naver-19873255` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '테이블'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 희로 | — | 서대문구 | `naver-1560785276` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야' (연희동) |
| 희희 | — | 종로구 | `naver-2016408542` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '소바, 온소바' (대학로) |
| 힛사츠와자 | — | 마포구 | `naver-2046667794` | → 일식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '라멘, 츠케멘' (망원동) |

## gyeonggi (130)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| AMPM | — | 남양주시 | `naver-2031009094` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| Hao홍탄 정자점 | — | 성남시 | `naver-2034519299` | → 중식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '짬뽕, 중식' (정자역) |
| LOW42 | — | 성남시 | `naver-2004544425` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 가비양 | — | 성남시 | `naver-13090387` | → 카페·디저트 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '핸드드립' (분당) |
| 감자꽃 | — | 화성시 | `naver-1703643550` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 갯벌스타일 | — | 수원시 | `naver-18260694` | → 한식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '대하구이, 닭갈비' (수원) |
| 고고캠 | — | 용인시 | `naver-2003441501` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 고기리열두화덕 | — | 용인시 | `naver-12874368` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '화덕'은 화덕피자(양식)일 수도, 화덕구이(한식)일 수도 있음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 고래아저씨 오산운암점 | — | 오산시 | `naver-1849367304` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색(다이닝코드)에서도 찾지 못함 |
| 고브런 | — | 수원시 | `naver-1317910269` | → 양식 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '브런치' (영통) |
| 구멘 죽전점 | — | 용인시 | `naver-2027735946` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '멘'(면)으로 보아 라멘·면 요리 같지만 일식인지 다른 면 요리인지 확정하지 못함. 상호명 검색은 아직 못 함 |
| 굿모닝 | — | 평택시 | `naver-31840670` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 그래니살룬 | — | 성남시 | `naver-37365975` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '살룬'은 술집(주점)일 수도, 양식당일 수도 있음. 상호명 검색은 아직 못 함 |
| 그램 판교 | — | 성남시 | `naver-1174510941` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 노체부엌 | — | 수원시 | `naver-1122414804` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '부엌'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 누오븐 | — | 수원시 | `naver-1621391041` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '도우·오븐'은 베이커리(카페·디저트)일 수도, 피자집(양식)일 수도 있음. 상호명 검색은 아직 못 함 |
| 니시 | — | 성남시 | `naver-2041251551` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 다정채 | — | 광명시 | `naver-1377037254` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 대성리국민관광지 | 유원지 | 가평군 | `naver-13418367` | 미분류 | 식당이 아님 (관광지·시설) | 종류 값 '유원지'. 메뉴 칸에 입장 요금이 들어 있음 |
| 대손관 수원광교법원점 | — | 수원시 | `naver-2008511261` | → 한식 | 지난 검토에서 분류 | 같은 체인 청주 오송점이 밀면집. 체인 기준 |
| 더담아 | — | 용인시 | `naver-1203294409` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 더쉐프인젤코바 | — | 성남시 | `naver-31509929` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 돌판하나 분당본점 | — | 성남시 | `naver-37257503` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '돌판'으로 보아 돌판구이 고깃집(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 딥 | — | 수원시 | `naver-1650001871` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 라쎄르 | — | 성남시 | `naver-2054296600` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 리파인 동탄호수공원점 | — | 화성시 | `naver-1275175572` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 마루면가 | — | 수원시 | `naver-1818131211` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '면'만으로는 칼국수(한식)·라멘(일식)·쌀국수(아시안) 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 만우정본점 | — | 용인시 | `naver-36097690` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 매산약수터 수원역본점 | — | 수원시 | `naver-1690656210` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 매쎄 | — | 수원시 | `naver-2008388043` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 메이빌 분당점 | — | 성남시 | `naver-20601148` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 면선정 | — | 성남시 | `naver-2070919576` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '면'만으로는 칼국수(한식)·라멘(일식)·쌀국수(아시안) 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 명희원 | — | 성남시 | `naver-1028778576` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '원'으로 끝나는 이름은 중식당에도 고깃집·한정식집에도 흔해서 가르지 못함. 상호명 검색은 아직 못 함 |
| 모미지 수원인계점 | — | 수원시 | `naver-2060540344` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 무궁화 파이브 | — | 성남시 | `naver-1196660951` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 물고기자리 정자점 | — | 성남시 | `naver-1405246340` | → 한식 | 지난 검토에서 분류 | 같은 가게 강남점이 생선구이집. 체인 기준 |
| 뭄뭄 수원신동점 | — | 수원시 | `naver-1424835754` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 바다방앗간 | — | 용인시 | `naver-1305634979` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 바바바 | — | 수원시 | `naver-1114922731` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 바차 판교점 | — | 성남시 | `naver-1422775069` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 박터진흥부네 용인기흥점 | — | 용인시 | `naver-34449605` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 범 | — | 화성시 | `naver-1876356025` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 복개천그릴 | — | 수원시 | `naver-1626853581` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '그릴'은 고깃집(한식)일 수도, 스테이크(양식)일 수도 있음. 상호명 검색은 아직 못 함 |
| 본대가 KT위즈파크점 | — | 수원시 | `naver-2081645955` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 블루오즈 | — | 수원시 | `naver-1792429425` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 비트라제이 | — | 오산시 | `naver-1084848230` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 사카나 | — | 성남시 | `naver-19877394` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '사카나'(생선·안주)는 일식일 수도, 이자카야(주점)일 수도 있음. 상호명 검색은 아직 못 함 |
| 산뜨락 동탄점 | — | 화성시 | `naver-1136075849` | → 한식 | 지난 검토에서 분류 | 같은 가게 수지본점이 한정식집. 체인 기준 |
| 산뜨락 수지본점 | — | 용인시 | `naver-19989155` | → 한식 | 지난 검토에서 분류 | 주소가 같은 가게(신봉2로 180)가 한정식집으로 확인됨 |
| 산적 | — | 수원시 | `naver-13566069` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 삼일밤슈퍼 | — | 수원시 | `naver-2006823440` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 서보 분당점 | — | 성남시 | `naver-2066206956` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 손에손잡고 광교직영점 | — | 수원시 | `naver-1571403265` | → 주점 | 지난 검토에서 분류 | 같은 체인 방이직영점이 한식주점(닭도리탕·김치전 안주). 체인 기준 |
| 솔트앤도우 | — | 용인시 | `naver-2005954262` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '도우·오븐'은 베이커리(카페·디저트)일 수도, 피자집(양식)일 수도 있음. 상호명 검색은 아직 못 함 |
| 송도어반 동탄점 | — | 오산시 | `naver-1543376922` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 수원왕가리 북문점 | — | 수원시 | `naver-1263288357` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 쉐진 동탄점 | — | 화성시 | `naver-34573203` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 스르르 | — | 의정부시 | `naver-2070641769` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 심야호선 | — | 수원시 | `naver-1541244584` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 씨에스타 | — | 안산시 | `naver-1066313912` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 아프레 | — | 성남시 | `naver-1889221282` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 압계정 | — | 용인시 | `naver-2065441732` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 야미얌 | — | 오산시 | `naver-1176853942` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 양은이네 광교점 | — | 수원시 | `naver-2048545949` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 양은이네 동탄호수공원점 | — | 화성시 | `naver-2047877280` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 어락 | — | 연천군 | `naver-36900466` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 어비스 | — | 과천시 | `naver-1267330619` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 에그하우스 | — | 가평군 | `naver-2049748405` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '브런(치)·에그'로 보아 브런치 같지만 양식인지 카페·디저트인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 에이치이에이 | — | 성남시 | `naver-1805976617` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 역북370 | — | 용인시 | `naver-1077429363` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 연담채 | — | 화성시 | `naver-2062615294` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 연우 | — | 평택시 | `naver-2036341845` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 연홍 | — | 오산시 | `naver-1721553430` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 연희시오 야탑점 | — | 성남시 | `naver-1927405941` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '시오'(소금)는 시오라멘(일식)일 수도, 소금빵 카페일 수도 있음. 상호명 검색은 아직 못 함 |
| 열날개 본점 | — | 김포시 | `naver-34033715` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '날개'로 보아 닭날개 같지만 치킨집(한식)인지 술집(주점)인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 오브제 | — | 광주시 | `naver-1707465493` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 오산카세 참치정육점 | — | 오산시 | `naver-1297035196` | → 일식 | 지난 검토에서 분류 | 이름에 '참치'와 '(오마)카세'가 있음. 지난번에는 '참치정육점'을 지점명으로 잘못 떼어 내서 놓쳤음 |
| 올드스탠드 | — | 성남시 | `naver-32582238` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 올리브 1999 | — | 수원시 | `naver-63352153` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 와이앤웍 본점 | — | 수원시 | `naver-1032557765` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '웍'으로 보아 볶음 요리 같지만 중식인지 아시안인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 외진곳 | — | 화성시 | `naver-1853937903` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 우리마을 | — | 용인시 | `naver-19900076` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 우마 스타필드 수원점 | — | 수원시 | `naver-1233798547` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 우마블 | — | 성남시 | `naver-1578978669` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 우마주 판교대장점 | — | 성남시 | `naver-1849171999` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 이수사 | — | 성남시 | `naver-19866762` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 이치하치 행궁점 | — | 수원시 | `naver-1613852704` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 이토 | — | 수원시 | `naver-1205626834` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 이프리 | — | 수원시 | `naver-2032729230` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 인생삼막 | — | 용인시 | `naver-2037242271` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 일상엔 | — | 수원시 | `naver-1698866140` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 일호선 | — | 수원시 | `naver-1356864288` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 자근바 | — | 수원시 | `naver-2096108122` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '바'로 보아 술집(주점) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 장원 구갈점 | — | 용인시 | `naver-2074752539` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 제이콥스 | — | 용인시 | `naver-37432719` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 제프네 | — | 수원시 | `naver-1509955356` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 주후 | — | 수원시 | `naver-1236309282` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 지속 | — | 파주시 | `naver-2005756586` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 찌마기 판교역점 | — | 성남시 | `naver-1307153335` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 참향 | — | 성남시 | `naver-35057956` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 천석꾼 | — | 성남시 | `naver-1193605551` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 청덕원 | — | 성남시 | `naver-1519678191` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '원'으로 끝나는 이름은 중식당에도 고깃집·한정식집에도 흔해서 가르지 못함. 상호명 검색은 아직 못 함 |
| 초장박살 | — | 수원시 | `naver-2068625088` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '초장'으로 보아 회·해산물 같지만 횟집(한식)인지 술집(주점)인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 카리 분당정자카페점 | — | 성남시 | `naver-37703354` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '카리'가 카레를 뜻하는지, 카레라면 일본식인지 인도식인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 칼뽕 | — | 포천시 | `naver-1025162062` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '칼'(칼국수)+'뽕'(짬뽕)으로 읽혀 한식과 중식에 걸침. 상호명 검색은 아직 못 함 |
| 코지하우스 오산물향기수목원점 | — | 오산시 | `naver-2086623855` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 콜렉티보 판교테크원점 | — | 성남시 | `naver-1376376661` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 콩두주백 북수원직영점 | — | 수원시 | `naver-2016537988` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '한모·콩두'로 보아 두부·콩 요리(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 콩온 | — | 화성시 | `naver-2064107861` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 키타야 수원행궁점 | — | 수원시 | `naver-1977555772` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 테라스478 | — | 용인시 | `naver-1150408407` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 테판쉐프 | — | 용인시 | `naver-1674901553` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '테판'(철판요리)은 일식 뎃판야키일 수도, 양식 스테이크일 수도 있음. 상호명 검색은 아직 못 함 |
| 테판하우스 | — | 성남시 | `naver-1825059820` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '테판'(철판요리)은 일식 뎃판야키일 수도, 양식 스테이크일 수도 있음. 상호명 검색은 아직 못 함 |
| 토리하나 | — | 성남시 | `naver-1197914450` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '토리'(닭)가 든 일본어풍 이름. 야키토리(주점)일 가능성이 높지만 일식 닭요리일 수도 있음. 상호명 검색은 아직 못 함 |
| 톤톤톤 수원역점 | — | 수원시 | `naver-2096203089` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '톤'(돼지)이 든 일본어풍 이름. 돈카츠(일식)인지 돼지고기 구이인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 팔달주택 | — | 수원시 | `naver-1268205327` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 포레스트오늘숲 수원영통점 | — | 수원시 | `naver-1766992813` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 포미 본점 | — | 화성시 | `naver-2030002841` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 포올로지 | — | 오산시 | `naver-2077867816` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '포'가 쌀국수를 뜻하면 아시안이지만 확실하지 않음. 상호명 검색은 아직 못 함 |
| 포청천 | — | 시흥시 | `naver-16779892` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 포크너 분당점 | — | 성남시 | `naver-1752662465` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 푸릴리 수원권선점 | — | 수원시 | `naver-1293118602` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 플랑문 | — | 수원시 | `naver-1818933986` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 하시도 | — | 수원시 | `naver-2019144449` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 하쿠다이닝 매교역점 | — | 수원시 | `naver-2085554202` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '하쿠'는 일본어풍, '다이닝'은 종류를 가리키지 않음. 일식 아니면 주점. 상호명 검색은 아직 못 함 |
| 한소헌 | — | 성남시 | `naver-1453847451` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 한울 | — | 파주시 | `naver-18440909` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 한탄강관광지 오토캠핑장 | 자연명소 | 연천군 | `naver-12917377` | 미분류 | 식당이 아님 (관광지·시설) | 종류 값 '자연명소'. 메뉴 칸에 야영장·캐라반이 들어 있음 |
| 해밀리아 셀프바베큐장 | — | 용인시 | `naver-1393708583` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '셀프바베큐장'은 고기를 직접 구워 먹는 시설. 식당(한식)으로 볼지 시설로 볼지 정하지 못함. 상호명 검색은 아직 못 함 |
| 효경재 | — | 용인시 | `naver-2079047311` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |

## gwangju (56)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 개대박 | — | 북구 | `naver-1205857107` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 공일백 용봉점 | — | 북구 | `naver-2018763870` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 굽탄 | — | 광산구 | `naver-38009666` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '굽'+'탄'(숯)으로 보아 숯불구이 같지만 무엇을 굽는지 확인하지 못함. 같은 가게 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 굽탄 첨단직영점 | — | 북구 | `naver-2094355975` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '굽'+'탄'(숯)으로 보아 숯불구이 같지만 무엇을 굽는지 확인하지 못함. 같은 가게 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 김연종 미미본점 | — | 광산구 | `naver-1683541979` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 꾸다 | — | 서구 | `naver-1080611018` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 달곰식당 | — | 동구 | `naver-510488081` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 대풍수 | — | 북구 | `naver-1592597559` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 도재 | — | 동구 | `naver-2055007743` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 동명동오보에루 | — | 동구 | `naver-1014982688` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 라이크앤 | — | 서구 | `naver-1448671199` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 레이트에이엠 | — | 동구 | `naver-2085278953` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 만선 | — | 북구 | `naver-2048128300` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '만선'은 해산물집에도 호프집에도 쓰이는 이름. 상호명 검색은 아직 못 함 |
| 매운날 첨단본점 | — | 광산구 | `naver-20348689` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 맷도리 | — | 동구 | `naver-1921857874` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 명불허전하하주 | — | 서구 | `naver-1948442743` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 미노루 | — | 동구 | `naver-1921739665` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 미옌 | — | 북구 | `naver-1969902590` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 미즈의숲 | — | 서구 | `naver-1800465392` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 바칼 본점 | — | 광산구 | `naver-15958681` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 버몬지 | — | 광산구 | `naver-1914501085` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 봉선오뎅 | — | 남구 | `naver-2064609000` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '오뎅'은 오뎅바(주점)일 수도, 분식일 수도 있음. 상호명 검색은 아직 못 함 |
| 블랭크테잎 | — | 동구 | `naver-1237118974` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 산등무 | — | 동구 | `naver-1168667433` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 삼형제도매시장 | — | 서구 | `naver-2085642831` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '도매시장'은 컨셉 이름으로 보이지만 수산물인지 고기인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 쇼부 용봉점 | — | 북구 | `naver-1141847239` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 수완지구폼 | — | 광산구 | `naver-1504215821` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 쉐프공방 | — | 북구 | `naver-1916473280` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '공방'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 오늘 바다다 광주상무점 | — | 서구 | `naver-1738192531` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 오늘부터애간장 | — | 북구 | `naver-1469831837` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 오메오메 상무직영점 | — | 서구 | `naver-1681524541` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 와구와규 | — | 동구 | `naver-1064212037` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '와규'(소고기)는 고깃집(한식)일 수도, 야키니쿠(일식)일 수도 있음. 상호명 검색은 아직 못 함 |
| 은주 광주 용봉직영점 | — | 북구 | `naver-2080310949` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 이름이 음식 종류를 가리키지 않음. 같은 가게(은주) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 이로도리 동명점 | — | 동구 | `naver-2082789768` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 이솝 용봉점 | — | 북구 | `naver-2003958342` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 이름이 음식 종류를 가리키지 않음. 같은 가게(이솝) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 이솝 첨단점 | — | 광산구 | `naver-1894962894` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 이름이 음식 종류를 가리키지 않음. 같은 가게(이솝) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 이이남스튜디오 | — | 남구 | `naver-940362236` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '스튜디오'는 작가의 전시 공간 이름으로 보임. 식당·카페인지 확인하지 못함. 상호명 검색은 아직 못 함 |
| 정동 전대점 | — | 북구 | `naver-1941363668` | → 일식 | 지난 검토에서 분류 | 같은 이름의 광주 수완 본점이 돈까스집. 체인으로 보고 분류 |
| 조대 인아웃 | — | 동구 | `naver-15967193` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 종착역 광주수완점 | — | 광산구 | `naver-1565170017` | → 한식 | 지난 검토에서 분류 | 같은 체인 전주신시가지점이 돼지고기 고깃집. 체인 기준 |
| 진미가람 주월점 | — | 서구 | `naver-1659701073` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 쭉심 구시청점 | — | 동구 | `naver-1093878635` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '쭉심'은 줄임말로 보이지만 무엇의 줄임인지 알 수 없음. 같은 가게 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 쭉심 전대후문점 | — | 북구 | `naver-16154651` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '쭉심'은 줄임말로 보이지만 무엇의 줄임인지 알 수 없음. 같은 가게 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 최정담 | — | 북구 | `naver-2097797421` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 카키노키 | — | 동구 | `naver-1124517292` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 코안 | — | 동구 | `naver-2003905126` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 코엔 | — | 동구 | `naver-2070310198` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 쿠시 봉선 | — | 남구 | `naver-2062392068` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '쿠시'(꼬치)는 쿠시카츠(일식)일 수도, 꼬치구이 술집(주점)일 수도 있음. 상호명 검색은 아직 못 함 |
| 크램드밀 | — | 동구 | `naver-1283239942` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 털보하우스 | — | 북구 | `naver-16303120` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 파파식당 첨단본점 | — | 광산구 | `naver-2093207740` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 하해가 | — | 서구 | `naver-38501799` | → 한식 | 지난 검토에서 분류 | 주소가 같은 가게(내방로 37)가 장어구이집으로 확인됨 |
| 하해가시즌2점 | — | 서구 | `naver-2036211210` | → 한식 | 지난 검토에서 분류 | 같은 가게 본점이 장어구이집. 체인 기준 |
| 해산 상무지구본점 | — | 서구 | `naver-19892102` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '해산'으로 보아 해산물 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 화릇 | — | 서구 | `naver-1991624248` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 훈613 쌍촌본점 | — | 서구 | `naver-1259825837` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |

## chungnam (48)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 나드리슈퍼 | — | 천안시 | `naver-2085552208` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 눈눈 불당점 | — | 천안시 | `naver-2061357168` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 대손관 천안 두정점 | — | 천안시 | `naver-1337999188` | → 한식 | 지난 검토에서 분류 | 같은 체인 청주 오송점이 밀면집. 체인 기준 |
| 데이원 | — | 천안시 | `naver-1929335824` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 도모도모 | — | 아산시 | `naver-2095407872` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 동가룰가든 | — | 예산군 | `naver-13115958` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '가든'은 고깃집(한식)에 흔하지만 카페·양식당에도 쓰임. 상호명 검색은 아직 못 함 |
| 메종초이 | — | 서산시 | `naver-1621337175` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 미미제면소 | — | 천안시 | `naver-1331431705` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 베로 | — | 천안시 | `naver-1807681546` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 보령자동차공업사 | 자동차정비·수리 | 보령시 | `naver-1108740272` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '자동차정비·수리'. 백년가게 목록에서 온 가게 |
| 봄담아 당진점 | — | 당진시 | `naver-1652641328` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 불당 솔솔 | — | 천안시 | `naver-2056730759` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 비전농장 | 농공시설 | 홍성군 | `naver-1674061794` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '농공시설'. 백년가게 목록에서 온 가게 |
| 슈엔챠이 공주점 | — | 공주시 | `naver-13086380` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 중국어풍 이름이라 중식으로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 시선 당진CGV점 | — | 당진시 | `naver-1228778413` | → 주점 | 상호명 검색으로 분류 | 다이닝코드 등록 내용: '이자카야, 술집 (시선 오산운암점·홍대점·건대)' (다른 지점). 같은 이름의 다른 지점·자매점 기준 |
| 심도 | — | 천안시 | `naver-1816983607` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 아낙네의밀가 공주본점 | — | 공주시 | `naver-1100344328` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '밀가'로 보아 칼국수·수제비(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 아띠 | — | 천안시 | `naver-2089542396` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 아인식당 | — | 천안시 | `naver-2090913547` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 양은이네 신용화온천동점 | — | 아산시 | `naver-2046410774` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 양은이네 아산테크노밸리점 | — | 아산시 | `naver-2051871220` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 양은이네 천안두정동점 | — | 천안시 | `naver-2051360592` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 양은이네 천안법원점 | — | 천안시 | `naver-2004205901` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 양은이네 충남보령점 | — | 보령시 | `naver-2025908565` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 연무향 | — | 논산시 | `naver-2043041660` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 오엔 | — | 천안시 | `naver-12064600` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 요무하치 | — | 천안시 | `naver-1176636711` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 우미장 동대동 | — | 보령시 | `naver-17481169` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 우석정 | — | 천안시 | `naver-1799111683` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 웬유바이트 | — | 아산시 | `naver-1246875708` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 위트 | — | 아산시 | `naver-2079739226` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 윤이식당 | — | 아산시 | `naver-1417435666` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 이창 | — | 논산시 | `naver-1015469914` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 정문농산 | 곡류 | 아산시 | `naver-1221015199` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '곡류'. 백년가게 목록에서 온 가게. 메뉴 칸에 쌀·잡곡 품목이 들어 있음 |
| 종로제면소 | — | 천안시 | `naver-1285355722` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 쭈불리 천안신방점 | — | 천안시 | `naver-1673137717` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '쭈'(쭈꾸미)로 읽히면 한식이지만 확실하지 않음. 상호명 검색은 아직 못 함 |
| 청천영농조합법인 | 곡물가공·제조 | 보령시 | `naver-1754354427` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '곡물가공·제조'. 백년가게 목록에서 온 가게. 메뉴 칸에 쌀 품목이 들어 있음 |
| 초록온담 김사장 수청점 | — | 당진시 | `naver-1931756752` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 카메식당 | — | 보령시 | `naver-1078770555` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '카메'는 일본어풍, '식당'은 종류를 가리키지 않음. 일본 가정식으로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 컴히얼 청당점 | — | 천안시 | `naver-1247709459` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 킨이로텐 | — | 천안시 | `naver-1763567934` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '텐'(튀김)이 든 일본어풍 이름. 텐동·덴푸라(일식)로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 테르니 | — | 아산시 | `naver-1766550756` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 해우 동학사 본점 | — | 공주시 | `naver-2069151911` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 해탄 성성점 | — | 천안시 | `naver-2065960284` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 화육우소 천안두정점 | — | 천안시 | `naver-1976170182` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '육·우'(고기·소)로 보아 소고기 구이(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 환희제면 서산점 | — | 서산시 | `naver-2042596062` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 후미진 | — | 천안시 | `naver-1160032125` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 히든테이블 신부점 | — | 천안시 | `naver-1687844194` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '테이블'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |

## jeonnam (41)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 구디츠 | — | 순천시 | `naver-1169234483` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 꼬미꼬미 | — | 목포시 | `naver-16744300` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 누아 | — | 완도군 | `naver-1107022884` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 대원정 | — | 보성군 | `naver-1766338959` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 만끽 | — | 여수시 | `naver-1586721091` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 만배식탁 순천점 | — | 순천시 | `naver-2090793202` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식탁'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 바닐라빌라 | — | 목포시 | `naver-2038975396` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 바다맛 | — | 여수시 | `naver-21568910` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 버트 | — | 담양군 | `naver-1991997120` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 삼성굴비 | 건어물 | 영광군 | `naver-16959311` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '건어물'. 백년가게 목록에서 온 가게. 굴비를 파는 가게 |
| 새벽 | — | 여수시 | `naver-1543297676` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 서식 | — | 순천시 | `naver-1945036149` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 소미온 | — | 여수시 | `naver-2030319605` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 씨펄 | — | 목포시 | `naver-1180349486` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 아랑주한일침구한복 | 침구·커튼 | 함평군 | `naver-16913139` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '침구·커튼'. 백년가게 목록에서 온 가게 |
| 영영 | — | 여수시 | `naver-2017875990` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 오수돈생 | — | 순천시 | `naver-2017170433` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '돈'(돼지)으로 보아 돼지고기(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 오의 여수죽림점 | — | 여수시 | `naver-1429211334` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 원조 갯내음 | — | 목포시 | `naver-36316787` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '갯벌·갯내음'으로 보아 조개·해산물(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 유달제면소 | — | 목포시 | `naver-1342349148` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '제면소'는 면을 직접 뽑는 집이라는 뜻뿐. 칼국수(한식)·우동/라멘(일식)·중식면 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 유진정 | — | 담양군 | `naver-16080483` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 유진테일러 | 남성정장 | 목포시 | `naver-1581623220` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '남성정장'. 백년가게 목록에서 온 가게 |
| 육사심 | — | 순천시 | `naver-1480963227` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '육'(고기)으로 보아 고깃집(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 일성의류타운 | 종합패션 | 순천시 | `naver-13326728` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '종합패션'. 백년가게 목록에서 온 가게 |
| 일일공오 1105 | — | 목포시 | `naver-1157642817` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 정심 | — | 목포시 | `naver-1521834873` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 정한 | — | 순천시 | `naver-1373493512` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 정희 순천점 | — | 순천시 | `naver-1208395538` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 여수·순천 말고 서울(김포공항)에도 지점이 있는 가게로 보이지만 무엇을 파는지 확인하지 못함. 같은 가게 2곳. 상호명 검색은 아직 못 함 |
| 정희 여수점 | — | 여수시 | `naver-1036731331` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 여수·순천 말고 서울(김포공항)에도 지점이 있는 가게로 보이지만 무엇을 파는지 확인하지 못함. 같은 가게 2곳. 상호명 검색은 아직 못 함 |
| 족자카야 | — | 목포시 | `naver-1444088650` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '족'(족발)+'자카야'(이자카야)로 읽혀 한식과 주점에 걸침. 상호명 검색은 아직 못 함 |
| 진상 | — | 광양시 | `naver-2027987672` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 진성공예 | 판촉·기념품 | 담양군 | `naver-17170527` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '판촉·기념품'. 백년가게 목록에서 온 가게 |
| 짚 | — | 목포시 | `naver-2093297521` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 초루 | — | 보성군 | `naver-1983640525` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 트라이팟 | — | 목포시 | `naver-1620964854` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 팔미방 | — | 순천시 | `naver-1952419969` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 피시테리안/피시테리 | — | 목포시 | `naver-1707024229` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '피시'(생선)로 보이지만 양식·일식·한식 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 하늘지기 | — | 순천시 | `naver-12867258` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 하당일번지 | — | 목포시 | `naver-12884698` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 하루한모 | — | 순천시 | `naver-1932387432` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '한모·콩두'로 보아 두부·콩 요리(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 호시탐탐 | — | 여수시 | `naver-1915669393` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |

## jeonbuk (39)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| UNWIND | — | 군산시 | `naver-2025318584` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 거북이식탁 | — | 군산시 | `naver-167342212` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식탁'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 국제금고사 | 금고 | 군산시 | `naver-13530975` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '금고'. 백년가게 목록에서 온 가게 |
| 꾸아 전주만성혁신도시점 | — | 전주시 | `naver-2060977058` | → 아시안 | 지난 검토에서 분류 | 카탈로그에 있는 같은 체인 성수본점의 종류 값이 '베트남음식' |
| 대영장식지물총판 | 도배공사 | 군산시 | `naver-17149458` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '도배공사'. 백년가게 목록에서 온 가게 |
| 도싯골 도청점 | — | 전주시 | `naver-33560267` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 뜨돈 전주혁신점 | — | 전주시 | `naver-2088841342` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '돈'(돼지)으로 보이지만 구이(한식)인지 돈카츠(일식)인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 마이담 | — | 진안군 | `naver-35084940` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 바이크나라 | 오토바이 | 전주시 | `naver-11712324` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '오토바이'. 백년가게 목록에서 온 가게 |
| 배치드롬 전주신시가지점 | — | 전주시 | `naver-2005476330` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 봉동 | — | 완주군 | `naver-2031245824` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 부들스 | — | 전주시 | `naver-2071426157` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 비레레 | — | 전주시 | `naver-1402135242` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 서래헌 | — | 남원시 | `naver-17350738` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 송범준식당 | — | 군산시 | `naver-1276248339` | 미분류 | 종류 값 없음, 이름에 단서 없음 | '식당'은 음식 종류를 가리키지 않고, 나머지도 고유명사. 상호명 검색은 아직 못 함 |
| 송해정 | — | 전주시 | `naver-1321643230` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 신사동인동 | — | 군산시 | `naver-11726653` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 씨즐리 | — | 전주시 | `naver-1783607494` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '씨즐'로 보아 스테이크·철판(양식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 양누리 신시가지점 | — | 전주시 | `naver-1119515452` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '양'이 양고기·양대창을 뜻하는지 확실하지 않음. 상호명 검색은 아직 못 함 |
| 양은이네 익산동산동점 | — | 익산시 | `naver-2039488100` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 오타마 전주에코시티점 | — | 전주시 | `naver-1210338623` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 온담 전주본점 | — | 전주시 | `naver-1972076667` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 올리빈 에코시티점 | — | 전주시 | `naver-2071554860` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 유림국기상패사 | 트로피·상패 | 전주시 | `naver-11685665` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '트로피·상패'. 백년가게 목록에서 온 가게 |
| 은주 전주에코시티점 | — | 전주시 | `naver-2000080898` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 이름이 음식 종류를 가리키지 않음. 같은 가게(은주) 2곳이라 한 번 확인하면 같이 풀림. 상호명 검색은 아직 못 함 |
| 일도당 | 도장 | 군산시 | `naver-32237054` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '도장'. 백년가게 목록에서 온 가게 |
| 정동 전주객사점 | — | 전주시 | `naver-1414005185` | → 일식 | 지난 검토에서 분류 | 같은 이름의 광주 수완 본점이 돈까스집. 체인으로 보고 분류 |
| 정원산책 | — | 무주군 | `naver-1044826172` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 조선별관 | — | 정읍시 | `naver-1986395691` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 츠쿠 | — | 군산시 | `naver-1372638657` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 파쿠야 전주점 | — | 전주시 | `naver-1340584191` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 평화주담 | — | 익산시 | `naver-2070188113` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '주'(酒)로 읽히면 술집(주점)이지만 확실하지 않음. 상호명 검색은 아직 못 함 |
| 포포포 | — | 전주시 | `naver-2024883774` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '포'가 쌀국수를 뜻하는지 확실하지 않음. 상호명 검색은 아직 못 함 |
| 풍요 | — | 전주시 | `naver-2073193247` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 프프프ver.2 | — | 전주시 | `naver-1694148969` | → 중식 | 지난 검토에서 분류 | 같은 가게 객사길 본점이 중식(우육면·탄탄면)이고 전주에 지점이 여럿이라고 소개됨. 체인 기준 |
| 프프프ver.3 | — | 전주시 | `naver-1609272260` | → 중식 | 지난 검토에서 분류 | 같은 가게 객사길 본점이 중식(우육면·탄탄면)이고 전주에 지점이 여럿이라고 소개됨. 체인 기준 |
| 플뢰르 | — | 전주시 | `naver-1453928815` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 호리 | — | 전주시 | `naver-1579003040` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 화산축산 | 축산업 | 전주시 | `naver-19917725` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '축산업'. 백년가게 목록에서 온 가게 |

## gyeongbuk (19)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| ChapChap | — | 경산시 | `naver-1693700489` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 영문·숫자 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| VIP 테일러 | 남성정장 | 구미시 | `naver-34093046` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '남성정장'. 백년가게 목록에서 온 가게 |
| 경신유통 | 축산업용품 | 경산시 | `naver-1157986663` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '축산업용품'. 백년가게 목록에서 온 가게 |
| 대화뜨개방 | 뜨개 | 경주시 | `naver-1815506765` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '뜨개'. 백년가게 목록에서 온 가게 |
| 동아의료보조기 보청기 | 보청기 | 안동시 | `naver-34417574` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '보청기'. 백년가게 목록에서 온 가게 |
| 동양인삼사 | 건강기능보조식품 | 영주시 | `naver-15022718` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '건강기능보조식품'. 백년가게 목록에서 온 가게. 인삼을 파는 가게 |
| 동양카정비 | 자동차정비·수리 | 포항시 | `naver-1227499935` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '자동차정비·수리'. 백년가게 목록에서 온 가게 |
| 동해안 | — | 영덕군 | `naver-32239625` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '동해안'으로 보아 해산물·횟집(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 라망 앤 브라이덜k | 웨딩드레스·예복 | 구미시 | `naver-12866819` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '웨딩드레스·예복'. 백년가게 목록에서 온 가게 |
| 류복순침구솜틀집 | 침구·커튼 | 안동시 | `naver-34333016` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '침구·커튼'. 백년가게 목록에서 온 가게 |
| 마지막쉼터 | 야식 | 포항시 | `naver-1690979505` | 미분류 | 종류 값이 너무 넓음 | 종류 값 '야식'은 무엇을 파는지 알려 주지 않음. 메뉴·출처 목록도 없음. 상호명 검색은 아직 못 함 |
| 서원 | — | 안동시 | `naver-2031469918` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 영천목탁공예사 | 목공예품 | 영천시 | `naver-11695738` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '목공예품'. 백년가게 목록에서 온 가게 |
| 청림산업안전 | 산업용품 | 포항시 | `naver-1944153351` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '산업용품'. 백년가게 목록에서 온 가게 |
| 청심축산물직판장 | 육류가공·제조 | 김천시 | `naver-1057658045` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '육류가공·제조'. 축산물 직판장. 출처 목록 없음 |
| 충주건축자재 | 건축자재·용품 | 포항시 | `naver-19543269` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '건축자재·용품'. 백년가게 목록에서 온 가게 |
| 퀼트하우스 | 퀼트 | 문경시 | `naver-11554215` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '퀼트'. 백년가게 목록에서 온 가게 |
| 현악기사 | 악기 | 안동시 | `naver-15370232` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '악기'. 백년가게 목록에서 온 가게 |
| 황남 | — | 경주시 | `naver-2060786887` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |

## chungbuk (12)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| HSDI | 옥외·전시광고 | 충주시 | `naver-11888432` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '옥외·전시광고'. 백년가게 목록에서 온 가게 |
| 미와담 | — | 음성군 | `naver-2037966007` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 삼순이 | — | 증평군 | `naver-1061491128` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 삼우정 본점 | — | 청주시 | `naver-18106884` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 성충문구 | 종합사무용품 | 충주시 | `naver-13479825` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '종합사무용품'. 백년가게 목록에서 온 가게 |
| 송호관광지 | 지역명소 | 영동군 | `naver-13298947` | 미분류 | 식당이 아님 (관광지·시설) | 종류 값 '지역명소'. 메뉴 칸에 야영장 요금이 들어 있음 |
| 신광주방 | 주방용품 | 충주시 | `naver-13020612` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '주방용품'. 백년가게 목록에서 온 가게 |
| 신화당 | 결혼예물 | 보은군 | `naver-11679902` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '결혼예물'. 백년가게 목록에서 온 가게 |
| 신흥지업사 | 벽지·장판·마루 | 음성군 | `naver-37868226` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '벽지·장판·마루'. 백년가게 목록에서 온 가게 |
| 이건창호 통합 전시장 한우창호 | 건축·토목 | 청주시 | `naver-20819860` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '건축·토목'. 백년가게 목록에서 온 가게 |
| 이재천바버샵 | 이용원 | 증평군 | `naver-17747261` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '이용원'. 백년가게 목록에서 온 가게 |
| 청주폐백 | 폐백·이바지음식 | 청주시 | `naver-13354956` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '폐백·이바지음식'. 백년가게 목록에서 온 가게. 폐백 음식을 만들어 파는 곳. 앉아서 먹는 식당이 아님 |

## gyeongnam (10)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 가호 | — | 진주시 | `naver-1013826140` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 동피랑 | — | 통영시 | `naver-37349717` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 보곡당 | 귀금속·시계 | 창원시 | `naver-36444877` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '귀금속·시계'. 백년가게 목록에서 온 가게 |
| 세이코알바 대경사 | 시계 | 창원시 | `naver-31012987` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '시계'. 백년가게 목록에서 온 가게 |
| 월하동 | — | 진주시 | `naver-2008173025` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 윤스캠퍼 | 자동차용품·액세서리 | 진주시 | `naver-20059735` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '자동차용품·액세서리'. 백년가게 목록에서 온 가게 |
| 자연농원 | — | 창원시 | `naver-1946827264` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '농원'은 고깃집(한식)일 수도, 농장 카페일 수도 있음. 상호명 검색은 아직 못 함 |
| 창원푸드 | 식료품 | 창원시 | `naver-60512369` | 미분류 | 식당이 아님 (식품 판매·제조) | 종류 값 '식료품'. 백년가게 목록에서 온 가게 |
| 학성실크 | 원단·섬유·직물 | 진주시 | `naver-1440043994` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '원단·섬유·직물'. 백년가게 목록에서 온 가게 |
| 황금당 | 귀금속·시계 | 양산시 | `naver-15627781` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '귀금속·시계'. 백년가게 목록에서 온 가게 |

## jeju (10)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 다린 | — | 서귀포시 | `naver-19299856` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 바다이야기 | — | 제주시 | `naver-1017616635` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 어쩌다가 | 민박 | 제주시 | `naver-1443246875` | 미분류 | 식당이 아님 (관광지·시설) | 종류 값 '민박'. 맛집 목록('도민이의 제주맛집')에서 왔는데 네이버에는 민박으로 등록됨. 다른 장소와 잘못 연결됐을 수 있음 |
| 오로시 | — | 제주시 | `naver-1470813244` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 우도 | — | 제주시 | `naver-1588676712` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 우디 | — | 제주시 | `naver-2084372107` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 우주 | — | 서귀포시 | `naver-1222188712` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 월령포구 | 페리·해운 | 제주시 | `naver-17022827` | 미분류 | 식당이 아님 (관광지·시설) | 종류 값 '페리·해운'. 맛집 목록('도민이의 제주맛집')에서 왔는데 포구로 등록됨. 주소도 '제주시'까지만 있어 장소가 잘못 연결된 것으로 보임 |
| 제주바다 | — | 서귀포시 | `naver-38648333` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '바다'로 보아 해산물 같지만 횟집(한식)·일식·술집 중 무엇인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 중앙사진관 | 디지털인화 | 서귀포시 | `naver-16936114` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '디지털인화'. 백년가게 목록에서 온 가게 |

## sejong (10)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 뒤웅박고을 | 테마공원 | 세종 | `naver-13272841` | 미분류 | 식당이 아님 (관광지·시설) | 종류 값 '테마공원'. 공원 자체가 등록됨. 출처 목록 없음 |
| 뜰 세종해밀 본점 | — | 세종 | `naver-1570571248` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 라쎄종 | — | 세종 | `naver-1500436808` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 라운지46 | — | 세종 | `naver-1956988849` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '라운지'는 바(주점)일 수도, 카페일 수도 있음. 상호명 검색은 아직 못 함 |
| 야호래 | — | 세종 | `naver-1819638410` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 양은이네 세종보람점 | — | 세종 | `naver-2011803477` | → 한식 | 지난 검토에서 분류 | 같은 체인 광명역점이 한식당(명태탕·오징어보쌈)으로 소개됨. 체인 기준 |
| 연화섬 | — | 세종 | `naver-1656042233` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 요이텐 | — | 세종 | `naver-1053411264` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '텐'(튀김)이 든 일본어풍 이름. 텐동·덴푸라(일식)로 보이지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 임대장 세종나성점 | — | 세종 | `naver-1177485965` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 타키 세종나성점 | — | 세종 | `naver-2069388475` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |

## busan (7)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 고원 | — | 부산진구 | `naver-1898130354` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 만개 | — | 영도구 | `naver-2098790222` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 시월 | — | 부산진구 | `naver-1230485898` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 지새우다 서면점 | — | 부산진구 | `naver-2045309062` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '새우'를 넣은 말장난 이름. 새우 요리집인지 술집인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 칠암만장 해운대 | — | 해운대구 | `naver-2027416077` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '칠암'(기장 칠암)으로 보아 붕장어·해산물(한식) 같지만 확정하지 못함. 상호명 검색은 아직 못 함 |
| 토암 | — | 기장군 | `naver-11622446` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 해수 | — | 서구 | `naver-2072972807` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |

## daegu (5)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 뉴요크 | — | 남구 | `naver-2091882564` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 레브 동명점 | — | 북구 | `naver-1224154264` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 방짜 | — | 동구 | `naver-35228395` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 파르코 | — | 수성구 | `naver-1227244952` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 유럽어풍 이름이라 양식·카페·와인바 중 하나로 보이지만 가르지 못함. 상호명 검색은 아직 못 함 |
| 푸르른 | — | 중구 | `naver-2019608393` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |

## incheon (4)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 만나공원 | — | 연수구 | `naver-2054015933` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 치즈웨이브 | — | 미추홀구 | `naver-1954881301` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '치즈·크림'은 디저트 카페일 수도, 양식당일 수도 있음. 상호명 검색은 아직 못 함 |
| 쿠모 | — | 영종구 | `naver-1386102212` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 하나비 | — | 부평구 | `naver-21791484` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |

## gangwon (3)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 올드페퍼 | — | 원주시 | `naver-2071052672` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 주인 | — | 강릉시 | `naver-1426981340` | 미분류 | 종류 값 없음, 이름에 단서 없음 | 고유명사 이름이라 음식 종류를 알 수 없음. 상호명 검색은 아직 못 함 |
| 크림하우스 | — | 강릉시 | `naver-1807622300` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '치즈·크림'은 디저트 카페일 수도, 양식당일 수도 있음. 상호명 검색은 아직 못 함 |

## daejeon (2)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 라쿠엔 | — | 유성구 | `naver-1251447969` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | 일본어풍 이름이라 일식 아니면 주점(이자카야)으로 좁혀지지만 어느 쪽인지 알 수 없음. 상호명 검색은 아직 못 함 |
| 주도 | — | 서구 | `naver-1377746746` | 미분류 | 종류 값 없음, 이름 단서가 갈림 | '주'(酒)로 읽히면 술집(주점)이지만 확실하지 않음. 상호명 검색은 아직 못 함 |

## ulsan (2)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 1번가양복점 | 남성정장 | 남구 | `naver-37755162` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '남성정장'. 백년가게 목록에서 온 가게 |
| 선경혼수전문백화점 | 이불·담요 | 중구 | `naver-1074842972` | 미분류 | 식당이 아님 (다른 업종) | 종류 값 '이불·담요'. 백년가게 목록에서 온 가게 |

## 회사 근처 (1)

| 이름 | 종류(subcategory) | 지역/구 | slug | 결과 | 사유 | 설명 |
| --- | --- | --- | --- | --- | --- | --- |
| 뀌쏭82 | — | 강남구 | `kakao-17382395` | → 양식 | 지난 검토에서 분류 | 주소가 같은 가게(양재천로 167)가 프렌치 레스토랑(CUISSON 82)으로 확인됨 |

