# PLAN — "Two songs that describe you" · final build (v3, shipped)

Status: **built + QA'd**. Layout **Option A — full-bleed cinematic**, 2 acts,
**24 s (song) + 11 s (dialogue)** — the real audio lengths — placed right before
the iMessage finale.

---

## 1. Where it sits

```
#main-scroll-container
 ├─ section-1        /birthday.html (reveal)
 ├─ section-2 … 7    (things / reasons / letter / polaroids / shayari / magazine)
 ├─ ▶ song-act-1     Song · 24 seconds        ← new
 ├─ ▶ song-act-2     Dialogue · 11 seconds    ← new
 └─ section-8        /last.html (iMessage finale)
```

Injected at runtime by `songs/sec.js` (loaded with `defer` from `index.html`'s
`<head>`), so the React markup is never edited. The mount waits for the curtain
gate to render `#main-scroll-container` (it appears ~2–3 s after "Khol de
parda") and re-mounts if a re-render ever drops it.

## 2. The two acts

**Act 01 · Song (24 s)** — photo full-bleed, gold micro-label `01 SONG · 24 SECONDS`,
one lyric line at a time (Bodoni Moda italic), dot progress + thin gold
progress bar, Play pill, tap-anywhere pause.

| # | Line | Appears at |
|---|---|---|
| 1 | Woh taazgi hai jisse phool bhi jale | 0.5 s |
| 2 | Chamak se chand bhi dhale | 6.4 s |
| 3 | Hai saadgi jaise lori ho koyi | 12.4 s |
| 4 | Woh jaise chandni khile | 18.2 s |

**Act 02 · Dialogue (11 s)** — same photo language, three stacked reveals:

| # | Line | Style | Appears at |
|---|---|---|---|
| 1 | Madammm sir… | small Bodoni italic, cream | 0.3 s |
| 2 | Madammm | huge Bodoni italic | 3.0 s |
| 3 | antheee | Caveat, gold, tilted | 5.8 s |
| — | ek hi dialogue, aur poora scene madam ka | Montserrat caps footer line | 8.3 s |

## 3. Assets

| File | What to drop in |
|---|---|
| `songs/sec-1.mp3` | song 1 — **24.36 s** ✅ installed (from the Instagram reel) |
| `songs/sec-2.mp3` | dialogue — **11.40 s** ✅ installed (from the Instagram reel) |
| `songs/photo-1.jpg` | act 1 photo, 9:16 — currently the pink-saree shot |
| `songs/photo-2.jpg` | act 2 photo, 9:16 — currently the sunglasses shot |

Each act declares its own `dur` (24 / 11) and loops at that length. If the file
you upload differs slightly (a trimmed clip decodes to 24.048 s), the act snaps
to the real length and rescales every line time proportionally — no drift. If a
full-length song is dropped in instead, the act keeps its short `dur` and just
plays the opening seconds. Retiming = edit the `at:` values in `songs/sec.js`
→ `ACTS`.

## 4. Mobile behaviour (QA'd at 390×844 and 360×640)

- `100dvh` shells, `env(safe-area-inset-*)` padding, zero horizontal overflow.
- Lyrics ≈ 25 px at 390 w, max two lines, `text-wrap` safe.
- **Background music ducking:** the site's own song (`#bgMusic` inside the
  section-1 iframe) fades to 0 and pauses the moment one of these acts starts
  playing its mp3; it fades back in when the act ends or you scroll past. If the
  browser blocks our mp3, the background song is left untouched (never silence).
- Ken Burns zoom length is driven by `--sec-dur` per act (24 s vs 11 s).
- No autoplay gamble: mp3 plays if the browser allows; otherwise an internal
  rAF clock drives the whole 20 s timeline, so the words always move.
- Tap anywhere = pause/resume (zoom freezes too). Missing mp3 → pill hides.
- `prefers-reduced-motion` → no Ken Burns, fades only.
- One act live at a time; scrolling past stops audio.

Wide screens (≥ 820 px and landscape-ish): the photo becomes a soft-masked
portrait panel on the right, words keep the left column.

## 5. QA performed

- `node --check songs/sec.js` — clean.
- Playwright (headless Chromium, mobile emulation, muted audio):
  section order correct, act 1 lines progress 1→4 across 24 s, dialogue's
  three reveals land at 3 / 6 / 8.3 s across 11 s, pause freezes the clock,
  resume continues, act 2 then finale, **0 console errors / 0 HTTP ≥ 400**
  (except the deliberate no-mp3 404 test), reduced-motion path verified.
- Screenshots reviewed at 390×844, 360×640, 1440×900.
