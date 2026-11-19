#!/usr/bin/env python3
"""Collect sikr.kr restaurants by repeatedly clicking "Load 100 more".

Saves JSON for catalog:sikr import.
"""
import argparse
import asyncio
import json
import re
from pathlib import Path
from playwright.async_api import async_playwright

LOAD_MORE = re.compile(r"Load\s*100\s*more|100\s*more|더\s*보기", re.I)


async def main(args):
    out = Path(args.output)
    places = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=args.headless)
        page = await browser.new_page()
        await page.goto(args.url, wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(2500)

        for round_i in range(args.max_rounds):
            cards = await page.evaluate(
                """() => {
                  const out=[];
                  for (const h of document.querySelectorAll('h2,h3')) {
                    const en=(h.textContent||'').trim();
                    if(!en || en.length>80) continue;
                    let el=h.nextElementSibling;
                    let ko='', meta='';
                    for (let i=0;i<6 && el;i++, el=el.nextElementSibling) {
                      const t=(el.textContent||'').trim();
                      if(!t) continue;
                      if(!ko && /[가-힣]{2}/.test(t) && t.length<40 && !t.includes('·')) ko=t;
                      if(!meta && t.includes('·')) meta=t;
                    }
                    const key=ko||en;
                    out.push({nameEn:en, nameKo:ko||undefined, meta:meta||undefined, key});
                  }
                  return out;
                }"""
            )
            before = len(places)
            for c in cards:
                places[c["key"]] = c
            print(f"round {round_i+1}: cards {len(cards)}, unique {len(places)} (+{len(places)-before})")

            btn = page.get_by_text(LOAD_MORE)
            if await btn.count() == 0:
                print("no more Load 100 more button")
                break
            try:
                await btn.first.click(timeout=5000)
                await page.wait_for_timeout(args.wait_ms)
            except Exception as e:
                print("click failed:", e)
                break

        await browser.close()

    rows = list(places.values())
    out.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {len(rows)} -> {out.resolve()}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", default="https://sikr.kr/")
    ap.add_argument("--output", default="sikr_places.json")
    ap.add_argument("--max-rounds", type=int, default=20)
    ap.add_argument("--wait-ms", type=int, default=2000)
    ap.add_argument("--headless", action="store_true")
    asyncio.run(main(ap.parse_args()))
