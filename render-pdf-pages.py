#!/usr/bin/env python3
"""
render-pdf-pages.py — render every flipbook page to PNG, then rebuild the PDF.

    python3 render-pdf-pages.py

Requires the local server running on :3200 (node server.mjs) and:
    pip install playwright pillow && python3 -m playwright install chromium

Output:
    <parent>/_pdfpages/page-NN.png  (build cache, not shipped)
    downloads/Prerana-Birthday-Magazine.pdf
"""
import asyncio
import glob
import os
import sys

from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(ROOT), "_pdfpages")   # outside the deploy folder
PDF = os.path.join(ROOT, "downloads", "Prerana-Birthday-Magazine.pdf")
URL = os.environ.get("SITE_URL", "http://127.0.0.1:3200/")
W, H = 425, 600          # book page size, as the flipbook itself uses
SCALE = 2                # -> 850 x 1200 output


async def render():
    os.makedirs(OUT, exist_ok=True)
    for f in glob.glob(os.path.join(OUT, "page-*.png")):
        os.remove(f)

    async with async_playwright() as p:
        browser = await p.chromium.launch(args=[
            "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader",
        ])
        ctx = await browser.new_context(viewport={"width": 1568, "height": 900},
                                        device_scale_factor=SCALE)
        page = await ctx.new_page()
        page.set_default_timeout(25000)

        await page.goto(URL, wait_until="load")
        await page.wait_for_timeout(1500)
        try:
            await page.click("text=Khol de parda", timeout=10000)
        except Exception:
            pass
        for _ in range(50):
            await page.wait_for_timeout(500)
            if await page.evaluate(
                "() => document.querySelectorAll('#main-scroll-container > section').length >= 8"
            ):
                break

        await page.evaluate(
            "document.getElementById('section-4').scrollIntoView({block:'start'})")
        await page.wait_for_timeout(3000)

        n = await page.evaluate("() => document.querySelectorAll('.book-page').length")
        print("pages found:", n, flush=True)
        if not n:
            raise SystemExit("no .book-page elements — is the flipbook rendered?")

        # one clean staging box at the top-left; everything else hidden so a clip
        # screenshot cannot pick up the toolbar or the page background
        await page.evaluate("""() => {
          const st = document.createElement('div');
          st.id = '__pdfStage';
          st.style.cssText =
            'position:fixed;left:0;top:0;width:425px;height:600px;' +
            'background:#fff;overflow:hidden;z-index:2147483647;';
          document.body.appendChild(st);

          const hide = document.createElement('style');
          hide.id = '__pdfHide';
          hide.textContent = 'body > *:not(#__pdfStage){visibility:hidden !important;}';
          document.head.appendChild(hide);
        }""")
        await page.wait_for_timeout(400)

        for i in range(n):
            ok = await page.evaluate("""(i) => {
              const src = document.querySelectorAll('.book-page')[i];
              const st  = document.getElementById('__pdfStage');
              if (!src || !st) return false;
              st.innerHTML = '';
              const clone = src.cloneNode(true);
              clone.style.cssText =
                'position:relative;width:425px;height:600px;display:block;' +
                'transform:none;opacity:1;visibility:visible;';
              st.appendChild(clone);
              return true;
            }""", i)
            if not ok:
                print(f"  page {i}: MISSING", flush=True)
                continue

            # wait for every image inside the stage to decode
            try:
                await page.wait_for_function(
                    "() => [...document.querySelectorAll('#__pdfStage img')]"
                    ".every(im => im.complete && im.naturalWidth > 0)",
                    timeout=10000)
            except Exception:
                pass
            await page.wait_for_timeout(350)

            # retry: swiftshader occasionally refuses a capture mid-flight
            dest = os.path.join(OUT, f"page-{i:02d}.png")
            for attempt in range(4):
                try:
                    await page.screenshot(
                        path=dest,
                        clip={"x": 0, "y": 0, "width": W, "height": H},
                        timeout=60000, animations="disabled")
                    break
                except Exception as e:
                    if attempt == 3:
                        raise
                    print(f"  page {i}: retry {attempt + 1} ({type(e).__name__})", flush=True)
                    await page.wait_for_timeout(600)
            print(f"  rendered page {i}", flush=True)

        await browser.close()


def build_pdf():
    from PIL import Image
    files = sorted(glob.glob(os.path.join(OUT, "page-*.png")))
    if not files:
        raise SystemExit("no rendered pages found")
    ims = [Image.open(f).convert("RGB") for f in files]
    os.makedirs(os.path.dirname(PDF), exist_ok=True)
    ims[0].save(PDF, save_all=True, append_images=ims[1:],
                resolution=180.0, quality=88)
    size = os.path.getsize(PDF) / 1024 / 1024
    print(f"\nPDF: {PDF}\n  {len(ims)} pages, {size:.2f} MB, {ims[0].size}")


if __name__ == "__main__":
    asyncio.run(render())
    build_pdf()
