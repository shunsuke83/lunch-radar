#!/usr/bin/env python3
"""Collect publicly visible Naver Matjido promotion places through a real Chromium browser.

Runs on the user's computer. It visits each public promotion page, cycles likely
category tabs, scrolls lazy-loaded result lists, and saves place IDs + page links.
It does NOT bypass login or protected endpoints and does not promise exhaustive results.
"""
import argparse
import asyncio
import csv
import re
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

PROMOTIONS = [
    ("전라남도", "7utmkn4sv3v3", 576),
    ("서울 북부", "73qkl0kbtehn", 455),
    ("성수", "e9hxj6nd8x3k", 194),
    ("세종·충남·전북", "kh9ect6mfk5n", 760),
    ("수원·용인·동탄·오산", "ho6hvoumh5lq", 542),
    ("제주·부산", "5sa02gnmkwek", None),
    ("서울 서부", "pioa3d2oskuc", 346),
    ("분당·판교", "za5vjw2jcd7d", 200),
    ("서울 남부", "i7u7p5mkm1u1", 400),
    ("용산·한남", "hyvclefqs04z", 37),
    ("부산 1탄", "4x1no5uplf2r", 16),
    ("서울 동부", "5e8ep3q98eev", 16),
]
FIELDS = ["기획전", "하위 카테고리", "상호명(화면표시)", "주소", "플레이스 ID", "개별 네이버 플레이스 URL", "원본 기획전 URL", "수집 시각", "주소 상태"]

COLLECT_JS = r"""() => {
  const result=[];
  const seen=new Set();
  for(const a of document.querySelectorAll('a[href]')) {
    const href=a.href||'';
    const m=href.match(/(?:place\.naver\.com\/(?:restaurant|place)\/|map\.naver\.com\/p\/entry\/place\/)(\d+)/);
    if(!m || seen.has(m[1])) continue;
    seen.add(m[1]);
    const parent=a.closest('li, article, [role="listitem"]')||a.parentElement;
    const heading=a.querySelector('h2,h3,h4,strong,[class*="name"],[class*="Name"]');
    const raw=(heading?.innerText||a.innerText||a.getAttribute('aria-label')||'').trim();
    const name=raw.split(/\n|  |Reviews|리뷰|방문자|별점/)[0].replace(/\s+/g,' ').trim().slice(0,140);
    const cardText=(parent?.innerText||'').trim();
    // Only accept an address if it is explicitly displayed in this card.
    const addrLine=cardText.split('\n').map(s=>s.trim()).find(s=>/^(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주|충청|전라|경상)(특별시|광역시|특별자치시|특별자치도|도)?\s/.test(s) && s.length>11)||'';
    result.push({id:m[1], name, address:addrLine, url:`https://m.place.naver.com/restaurant/${m[1]}/home`});
  }
  return result;
}"""

TABS_JS = r"""() => {
  const link=[...document.querySelectorAll('a[href*="place.naver.com/"]')][0];
  const firstY=link ? link.getBoundingClientRect().top : 850;
  const bad=/정렬|리뷰|예약|더보기|검색|닫기|공유|로그인|지도|알림|유의사항|혜택|포인트|POINT|적립|전체 장소|도움말|설정|확인|취소|이벤트/;
  const els=[...document.querySelectorAll('[role="tab"], button, [role="button"]')];
  const names=[];
  for(const el of els) {
    const txt=(el.innerText||el.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ');
    const r=el.getBoundingClientRect();
    if(!txt||txt.length>24||bad.test(txt)||r.width<8||r.height<8) continue;
    if(r.top<0 || (firstY>0 && r.top>firstY+80)) continue;
    if(!names.includes(txt)) names.push(txt);
  }
  return names.slice(0,30);
}"""

SCROLL_JS = r"""() => {
  const scrollables=[document.scrollingElement,...document.querySelectorAll('*')].filter(Boolean)
   .filter((el,i,a)=>a.indexOf(el)===i)
   .filter(el=>el.scrollHeight>el.clientHeight+120 && el.clientHeight>160)
   .sort((a,b)=>(b.clientHeight*b.clientWidth)-(a.clientHeight*a.clientWidth)).slice(0,8);
  let atBottom=true;
  for(const el of scrollables) {
     const before=el.scrollTop;
     const next=Math.min(el.scrollHeight, before+Math.max(280,Math.floor(el.clientHeight*.85)));
     if(next>before+1) {el.scrollTop=next;atBottom=false;}
     if(el.scrollTop+el.clientHeight<el.scrollHeight-4) atBottom=false;
  }
  return {atBottom, containers:scrollables.length};
}"""

async def collect_visible(page, place_rows, promotion, category):
    name, code, expected = promotion
    url=f"https://booking.map.naver.com/promotions/{code}"
    try:
        visible=await page.evaluate(COLLECT_JS)
    except Exception:
        return 0
    changed=0
    for item in visible:
        key=(name,item['id'])
        if key not in place_rows:
            place_rows[key]={"기획전":name,"하위 카테고리":category,"상호명(화면표시)":item['name'],"주소":item['address'],"플레이스 ID":item['id'],"개별 네이버 플레이스 URL":item['url'],"원본 기획전 URL":url,"수집 시각":datetime.now().strftime('%Y-%m-%d %H:%M'),"주소 상태":"화면에 표시" if item['address'] else "상세 페이지 확인 필요"}
            changed+=1
        elif item['address'] and not place_rows[key]['주소']:
            place_rows[key]['주소']=item['address']
            place_rows[key]['주소 상태']='화면에 표시'
    return changed

async def scroll_until_stable(page, rows, promotion, category, max_scrolls, wait_ms):
    stable=0
    last=0
    for i in range(max_scrolls):
        added=await collect_visible(page,rows,promotion,category)
        current=sum(1 for key in rows if key[0]==promotion[0])
        if current>last:
            stable=0
        else:
            stable+=1
        last=current
        state=await page.evaluate(SCROLL_JS)
        if i % 10==0 or added:
            print(f"    [{category}] 스크롤 {i+1:>3}, 누적 {current:>4}건, 현재화면 신규 {added}",flush=True)
        if stable>=8 and state.get('atBottom'):
            break
        # Some sites are slower after a batch arrives; always permit several attempts.
        await page.wait_for_timeout(wait_ms)
    await collect_visible(page,rows,promotion,category)

async def click_category(page, label):
    candidates = [page.get_by_role("tab",name=label,exact=True),
                  page.get_by_role("button",name=label,exact=True),
                  page.get_by_text(label,exact=True)]
    for loc in candidates:
        try:
            if await loc.count():
                await loc.first.click(timeout=3200)
                await page.wait_for_timeout(1200)
                return True
        except (PWTimeout,Exception):
            pass
    return False

def write_csv(path, rows):
    path.parent.mkdir(parents=True,exist_ok=True)
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=FIELDS,extrasaction='ignore')
        w.writeheader()
        w.writerows(rows)

def load_seed(path, rows):
    if not path.exists(): return 0
    with path.open(encoding='utf-8-sig',newline='') as f:
        reader=csv.DictReader(f)
        for row in reader:
            campaign=row.get('기획전','')
            pid=str(row.get('플레이스 ID','')).strip()
            if campaign and pid:
                rows[(campaign,pid)]={
                  '기획전':campaign,'하위 카테고리':row.get('하위 카테고리','기존 확보'),
                  '상호명(화면표시)':row.get('상호명(화면표시)',row.get('상호명(네이버 표기)','')),
                  '주소':row.get('주소',''),'플레이스 ID':pid,
                  '개별 네이버 플레이스 URL':row.get('개별 네이버 플레이스 URL',f'https://m.place.naver.com/restaurant/{pid}/home'),
                  '원본 기획전 URL':row.get('원본 기획전 URL',''),
                  '수집 시각':row.get('수집 시각',row.get('확인일','')),
                  '주소 상태':row.get('주소 상태','기존 자료 (재검증 권장)')
                }
    return len(rows)

async def main(args):
    output=Path(args.output)
    seed=Path(args.seed) if args.seed else None
    rows={}
    if output.exists():
        print('기존 수집 파일에서 이어받기:',load_seed(output,rows))
    if seed and seed.exists():
        seed_rows={}
        load_seed(seed,seed_rows)
        for key,item in seed_rows.items():
            if key not in rows: rows[key]=item
            elif not rows[key]['주소'] and item['주소']:
                rows[key]['주소']=item['주소'];rows[key]['주소 상태']='기존 자료 (재검증 권장)'
        print('기존 110개 자료와 병합한 총 장소:',len(rows))
    async with async_playwright() as playwright:
        browser=await playwright.chromium.launch(headless=args.headless,slow_mo=0)
        context=await browser.new_context(locale='ko-KR',viewport={'width':1360,'height':920})
        page=await context.new_page()
        for index,prom in enumerate(PROMOTIONS,1):
            name,code,expected=prom
            url=f'https://booking.map.naver.com/promotions/{code}'
            print(f'\n[{index}/12] {name} (표시 수: {expected if expected else "미확인"})',flush=True)
            try:
                await page.goto(url,wait_until='domcontentloaded',timeout=35000)
                await page.wait_for_timeout(2500)
                await page.evaluate('window.scrollTo(0,0)')
                tabs=await page.evaluate(TABS_JS)
                print('  감지된 버튼:',', '.join(tabs) or '(없음)')
                # First capture default view, then each tab. Preserve the cumulative data.
                await scroll_until_stable(page,rows,prom,'처음 화면',args.max_scrolls,args.wait_ms)
                for tab in tabs:
                    if await click_category(page,tab):
                        print('  카테고리 전환:',tab)
                        await scroll_until_stable(page,rows,prom,tab,args.max_scrolls,args.wait_ms)
                count=sum(1 for k in rows if k[0]==name)
                print(f'  완료: {count}건 / 페이지 표시 수 {expected if expected else "미확인"}',flush=True)
            except Exception as exc:
                print(f'  경고: {name} 수집 중 오류: {type(exc).__name__}: {str(exc)[:140]}')
            write_csv(output,list(rows.values()))
            print('  중간 저장:',output.resolve())
        await browser.close()
    summary=output.with_name(output.stem+'_status.csv')
    summaries=[]
    for name,code,expected in PROMOTIONS:
        n=sum(1 for k in rows if k[0]==name)
        summaries.append({'기획전':name,'표시 장소 수(기존 확인)':expected or '', '추출 장소 수':n,
                          '차이(중복·조회불가 포함)': (expected-n) if expected else '',
                          '원본 URL':f'https://booking.map.naver.com/promotions/{code}'})
    with summary.open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(summaries[0]))
        writer.writeheader();writer.writerows(summaries)
    print(f'\n전체 {len(rows)}행 저장 완료\n파일: {output.resolve()}\n집계: {summary.resolve()}')
    print('참고: 페이지 UI 변경/기획전 종료/동적 로딩 제한으로 전체 표시 수보다 적게 수집될 수 있습니다.')
    print('주소 공란은 별도 네이버 플레이스 상세 페이지에서 보완해야 합니다.')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description='네이버 맛동여지도 공개 기획전 장소 수집 도우미')
    parser.add_argument('--output',default='matzido_all_places.csv',help='결과 CSV 경로')
    parser.add_argument('--seed',default='naver_matzido_2026_places.csv',help='이전 110곳 파일과 병합할 경우 경로')
    parser.add_argument('--max-scrolls',type=int,default=170,help='카테고리당 최대 스크롤 횟수')
    parser.add_argument('--wait-ms',type=int,default=700,help='스크롤 간 기다림(ms)')
    parser.add_argument('--headless',action='store_true',help='브라우저 창 없이 실행 (기본은 창 보임)')
    asyncio.run(main(parser.parse_args()))
