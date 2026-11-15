# 🎂 Prerana — birthday site (best-friend edition)

> **What this is now:** the same 8-section site, restyled in words for **Prerana**
> (18, 23 Nov) — best-friend warmth instead of a love letter. Her photos are in
> every slot, the countdown points at **23 Nov 2026**, and the magazine film was
> rebuilt from her photos.
>
> - **Tone:** dosti wala pyaar — funny + motivational, no boyfriend framing.
> - **Shayari:** 5 Hinglish ones, on the butterfly cards.
> - **Nicknames:** "Devii ji" / "madam" for her, "Dude" for Dinesh.
> - **Age:** hero + reveal number show **18**.
> - **Entry song:** `sounds/entry-song.mp3` — *O'Meri Laila* (Atif Aslam & Jyotica Tangri).
>   File aapko khud daalni hai (commercial track, yahan se download nahi hota);
>   file na ho to player chip chhup jaata hai, site break nahi hoti.
>
> Below is the original clone documentation, still accurate for everything
> technical (how to run it, the file map, the offline shims).

---

## 🔍 Where is all the text? (magazine + site)

Sab copy **`_next/static/chunks/2njl4qrpzxs9l.js`** me hai (401 KB, one line).
`index.html` me text nahi milega — ye minified Next.js bundle hai.

Do cheezein use karo:

- **`MAGAZINE-TEXT-MAP.md`** — page-by-page map, har text ka offset, plus
  tone violations ki list
- **`find-text.py`** — search tool, file kholne ki zaroorat nahi:

```bash
python3 find-text.py                      # poora text list + offset
python3 find-text.py "My only"            # kaunsi file, kis offset pe
python3 find-text.py --grep "love letter" # case-insensitive, saari files
python3 find-text.py --file last.html     # ek file ka poora copy
```

---

## 📥 Magazine "Download PDF" button

The flipbook (section 4) has a **⤓ DOWNLOAD PDF** pill in its toolbar, right
next to *FILM & SHARE*. Tapping it downloads the whole 18-page magazine as one
PDF — no printing dialogs, no screenshots.

| Thing | Detail |
|---|---|
| File | `downloads/Prerana-Birthday-Magazine.pdf` |
| Pages | 18 (cover → back cover, every spread page) |
| Size | ~2.2 MB |
| Page size | 340 × 480 pt (2:2.82, matches the 425×600 book) |
| Injected by | `_magpdf.js` (small, dependency-free, survives React re-renders) |
| Mobile | label shrinks to just **PDF**, toolbars wrap so nothing is cut off |

To refresh the PDF after editing the magazine, re-render the pages and rebuild:

```bash
python3 _render_pages.py            # writes _pdfpages/page-NN.png
python3 -c "from PIL import Image; import glob; \
f=sorted(glob.glob('_pdfpages/page-*.png')); im=[Image.open(x).convert('RGB') for x in f]; \
im[0].save('downloads/Prerana-Birthday-Magazine.pdf', save_all=True, append_images=im[1:], resolution=180.0)"
```

---

## 🎬 Two songs that describe you (new)

Two extra full-screen sections sit **between section 7 and the iMessage finale**
(`section-8` → `/last.html`):

| Act | What it is | Length | Timeline |
|---|---|---|---|
| **01 — Song** | her photo, full-bleed, 4 lyric lines | **24.4 s** | lines at 0.5 / 6.4 / 12.4 / 18.2 s |
| **02 — Dialogue** | her photo + "Madammm sir… / Madammm / antheee" | **11.4 s** | 0.3 / 3.0 / 5.8 / 8.3 s |

Files (all in `songs/`):

```
songs/sec.css       styles for both acts
songs/sec.js        timeline + audio engine (injects the sections on load)
songs/sec-1.mp3     ← song 1 (24.4 s clip)
songs/sec-2.mp3     ← dialogue (11.4 s clip)
songs/photo-1.jpg   act 1 photo (9:16) — replace with the one you want
songs/photo-2.jpg   act 2 photo (9:16)
```

**To change the lyrics or the timings**, open `songs/sec.js` and edit the `ACTS`
array at the top — each line is `{ at: <seconds>, text: '<lyric>' }`.

Behaviour that matters on a phone:

- each act has its own length (`dur: 24` / `dur: 11`); if the uploaded file is
  slightly different, the act snaps to the real duration and rescales the lyric
  timings so nothing drifts;
- while a song act plays, the site's own background track (`#bgMusic` in the
  section-1 iframe) fades out and pauses, then fades back in when you leave;
- no autoplay attempted without a gesture — if the browser blocks sound, the
  lyrics still animate perfectly on an internal clock (never a dead section);
- tap anywhere (or the Play pill) to pause / resume; the Ken Burns zoom freezes
  with it;
- if an mp3 is missing, the Play pill hides itself and the act runs silently;
- `prefers-reduced-motion` turns the zoom off, lyrics still play;
- one act live at a time, and it stops the moment you scroll past it.

---

# 🎂 birthday-four — full mirror / clone

A complete, self-contained copy of **https://birthday-four.vercel.app/** — every
section, animation, image, font, sound and interactive detail, running on plain
static files with **no external network calls needed**.

(Three deliberate exceptions, all harmless: `<link rel="preconnect">` DNS hints
to `fonts.gstatic.com` are left in the HTML — they load nothing; and
`birthday.html` keeps its original `balloons-js` CDN `import()` as a *fallback*
that only runs if the local `balloons.esm.js` is missing.)

No build step. No `npm install`. Just serve the folder.

---

## Quick start

Pick either server (both are included, both are dependency-free):

```bash
# Node 18+
node server.mjs            # http://localhost:3000

# or Python 3.7+
python3 server.py          # http://localhost:3000
```

Then open **http://localhost:3000**

> **Why a server and not just double-clicking `index.html`?**
> The experience is built with Next.js and splits sections into separate routes
> (`/birthday.html`, `/last.html`) plus a JSON clock endpoint. Browsers block
> those cross-file requests over the `file://` protocol. Any static host works:
> Vercel, Netlify, GitHub Pages, `npx serve`, Amazon S3, nginx — no Node needed
> on the host side.

Port override: `PORT=8080 node server.mjs` or `python3 server.py 8080`

---

## What's inside

```
birthday-four-clone/
├── index.html                      # the shell: 8 scroll-snap sections
├── birthday.html                   # section 1 — cinematic intro (standalone page)
├── last.html                       # section 8 — iMessage finale (standalone page)
├── _patch.js                       # offline shim (see "How it works")
├── server.mjs / server.py          # zero-dependency dev servers
│
├── _next/static/chunks/            # the real production JS + CSS bundles
│   ├── 2njl4qrpzxs9l.js            #   ← all page logic (GSAP, framer-motion, page-flip)
│   ├── 2or8npq1ldme6.js            #   ← framer-motion
│   ├── 2e1mk7px1q15-.js            #   ← shared motion components
│   ├── 306udcp60edd_.css           #   ← Tailwind output
│   └── …                           #   ← Next.js runtime + React
├── _next/static/media/             # Geist / Geist Mono woff2 (next/font)
│
├── ref/                            # 13 photos used across the sections
├── frames/melting_player_frame.png # music-player artwork frame
├── videos/magazine-flip.mp4        # "Film & Share" export (1.8 MB)
├── sounds/entry-song.mp3           # entry song behind the melt player (add your file)
├── bg2.jpg                         # section 1 background photo
├── curtain.svg                     # the red velvet curtain
├── balloons.esm.js                 # lazily injected balloon-physics module
├── favicon.ico
│
├── fonts/
│   ├── maglite/   Maglite.otf/.ttf         ┐
│   ├── aesthetic/ aesthetic-script.otf/.ttf├─ custom decorative faces
│   ├── elegante/  elegante-classica.ttf    ┘
│   └── google/    <self-hosted Google Fonts + woff2 subsets>
│
└── vendor/gsap.min.js              # GSAP 3.12.5 (was loaded from cdnjs)
```

---

## The 8 sections

| # | Section | What it does |
|---|---------|--------------|
| 1 | **Birthday reveal** — `birthday.html` | Full-screen animated sequence: flip-digit intro counter, velvet reveal, ember/flame particles, giant watermark that flips on click, Spotify-style melting music player |
| 2 | **Hero** | Huge `14` numeral over a darkened photo, "14Y · 8D · 13:40:09" corner clock |
| 3 | **Happy Birthday Sweety** | Editorial headline + a spiral/helix ribbon of 13 photos that scroll-drifts |
| 4 | **Polaroid wall** | Drag-and-drop polaroids ("Cutie", "Baddie", "Dream Girl", "Queen"…) on a gridded pinboard, with hearts and butterflies |
| 5 | **Birthday Magazine** | Interactive "VOGUE"-style flip book — auto-flip, rotate 16:9, film & share (records `magazine-flip.mp4`) |
| 6 | **Sunset photo** | Full-bleed parallax memory |
| 7 | **Wishing you the best day** | Serif typography break, gold accents |
| 8 | **VIP Pass + iMessage finale** | Draggable/swingable lanyard pass, then a fake iMessage thread that types "Happpyyee birthday Sweety ♥" and ends with *replay* |

Plus, before all of it: the **curtain gate** — a red velvet curtain, a
flip-card countdown (target `2026-11-11T00:00:00+05:30`), an `OPEN CURTAIN`
button, and a `PREVIEW` shortcut in the corner.

---

## How it works (and what was changed)

The original runs on **Vercel + Next.js 15 / Turbopack**. This snapshot keeps the
**production bundles byte-for-byte identical** and only adds a thin portability
layer, so what you see is the original code, not a re-implementation.

### Change 1 — `_patch.js` (one script tag added to `index.html`)

| Problem | Fix |
|---|---|
| `next/image` rewrites every `<img>` to `/_next/image?url=…&w=256&q=75`, an endpoint only the Next server exposes | Patch decodes those URLs back to the plain static path (`/ref/girl1.jpg`). Source images are already full resolution, so no quality is lost. A `MutationObserver` catches React's later DOM writes too. |
| The countdown `fetch('/api/time')` expects a server route | Patch answers it locally with `Date.now()`. |
| Next's router prefetches RSC payloads | Harmless on a static host; also covered by the servers below. |

Both bundled servers also emulate those two endpoints natively, so `_patch.js`
and the servers are belt-and-braces — either alone is enough.

### Change 2 — fonts self-hosted

7 `fonts.googleapis.com` stylesheets were downloaded, their `woff2` files
localised into `fonts/google/`, and every reference rewritten. Rendered output
is identical; the page now works with **no internet connection**.

### Change 3 — GSAP self-hosted

`cdnjs.cloudflare.com/.../gsap/3.12.5/gsap.min.js` → `vendor/gsap.min.js`
(same version, same file).

### Everything else is untouched

React/Next runtime, Tailwind CSS, framer-motion, GSAP timelines, the CSS
page-flip engine, canvas drawing for the polaroid captions, the balloon physics
module, all 13 photos, the song, the video, the curtain SVG, the custom
decorative fonts — all original.

---

## Verification

- ✅ 8/8 sections render, 0 console errors, 0 network failures
- ✅ Side-by-side screenshots at 1440×900 match the live site section by section
- ✅ Gate → curtain → preview flow works, countdown ticks
- ✅ Music player plays, magazine flips, polaroids drag, VIP pass swings
- ✅ Works fully offline after load

---

## Customising it

All the personal bits live in the bundle and in the two standalone pages.

| Want to change | Where |
|---|---|
| Name ("Sweety") everywhere | `_next/static/chunks/2njl4qrpzxs9l.js` (search `Sweety`), plus `birthday.html`, `last.html`, `index.html` |
| Countdown date | Search `2026-11-11T00:00:00+05:30` in `_next/static/chunks/2njl4qrpzxs9l.js` |
| Photos | drop replacements into `ref/` keeping the filenames `girl.jpg`, `girl1.jpg` … `girl11.jpg`, `heart.jpg` |
| Entry song | drop your mp3 as `sounds/entry-song.mp3` |
| Magazine aspect / film | `videos/magazine-flip.mp4` + the flip-book code in chunk `2njl4qrpzxs9l.js` |
| Polaroid captions ("Cutie", "Queen"…) | search the caption strings in chunk `2njl4qrpzxs9l.js` |

The bundles are minified but not obfuscated — the strings and structure are
readable.

---

## Credits / notice

The design, copy, photographs and audio are the work of whoever built
**birthday-four.vercel.app**. This folder is a technical mirror captured for
reference, offline viewing and personal use. Replace the photos, song and text
with your own before publishing anything derived from it — and keep GSAP's
license (`vendor/gsap.min.js`) intact.

Libraries bundled: React · Next.js · framer-motion · GSAP 3.12.5 · Tailwind CSS

---

## 🚀 Deploy: GitHub + Vercel

Ye project **pure static** hai — koi build step nahi, koi dependency nahi.

### 1. GitHub pe daalo

```bash
# is folder ke andar
git init
git add .
git commit -m "birthday site"
git branch -M main
git remote add origin https://github.com/<tumhara-username>/<repo-name>.git
git push -u origin main
```

> 100 MB se bada koi file nahi hai (sabse bada `fonts/` ~3 MB), to GitHub ka
> normal limit kaafi hai. Git LFS ki zaroorat nahi.

### 2. Vercel pe deploy karo

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → apna repo chuno.
2. Settings me:
   - **Framework Preset:** `Other`
   - **Build Command:** khali chhod do (koi build nahi)
   - **Output Directory:** `.` (root)
   - **Install Command:** khali chhod do
3. **Deploy** dabao. Bas — `vercel.json` already included hai, cache headers bhi set hain.

### 3. CLI se (agar pasand ho)

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

### Zaroori notes

- `server.mjs` / `server.py` sirf **local** testing ke liye hain. Vercel unhe
  ignore karta hai — wahan files seedha CDN se serve hoti hain.
- `/_next/image?...` aur `/api/time` dono **`_patch.js`** client-side handle karta
  hai, isliye Vercel pe koi serverless function ki zaroorat nahi.
- Songs/photos update karne ho to file replace karke `git push` — Vercel khud
  redeploy kar dega.
