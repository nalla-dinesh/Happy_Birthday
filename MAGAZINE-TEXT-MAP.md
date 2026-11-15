# 📖 Magazine text — kahan hai kya

Sab magazine ka text **EK hi file** me hai:

```
_next/static/chunks/2njl4qrpzxs9l.js     (401 KB, ek hi line me minified)
```

Ye Next.js ka production bundle hai — isliye `index.html` me text nahi milega.
Usme 128 text items hain, jinme se **magazine ke 18 pages** aur site ke kuch
doosre sections bhi hain.

---

## Sabse pehle — search karne ka tool

Maine ek chhota script bana diya hai, use karo (file kholne ki zaroorat nahi):

```bash
# poora text list + offset
python3 find-text.py

# kisi bhi text ko dhoondo (kaunsi file, kis offset pe)
python3 find-text.py "My only"

# case-insensitive, saari files me
python3 find-text.py --grep "love letter"

# ek file ka poora copy
python3 find-text.py --file last.html
```

---

## Page-by-page map

Offset = us file me character position (0 se shuru).

| # | Page | Text | Offset |
|---|---|---|---|
| 0 | **Cover** | `VOUGUE` ⚠️ typo | 187481 |
| 0 | | `ISSUE NO.2026` | 187781 |
| 0 | | `PRERANA` / `TIMELESS AND BEAUTIFUL, THE STORY OF PRERANA` | ~187900 |
| 0 | | `BIRTHDAY SPECIAL EDITION` | ~188400 |
| 0 | | `FEATURING THE GIRL WHO HAS MY WHOLE RESPECT` | ~189200 |
| 1 | **Contents** | `TABLE CONTENTS` | 104900 |
| 1 | | 10 chapter lines (`EDITORIAL GALLERY`, `WHO'S THAT GIRL?`, …) | **103569 – 104350** ← ek hi array |
| 2 | **Editorial gallery** | `SPOTLIGHT` | 108286 |
| 3 | **Who's that girl?** | `WHO'S THAT GIRL?` | 108503 |
| 3 | | body copy — "The girl with the loudest laugh…" | 108919 |
| 3 | | "My favourite human, my go-to call…" | 109200 |
| 3 | | `THE CEO OF OUR GROUP CHAT` | 109781 |
| 4 | **Instagram page** | `Instagram girl` | 114266 |
| 4 | | dummy UI labels: `Grid` `Insta` `Player` `Original audio` | 114965 – 120241 |
| 4 | | `Camera on, bakwaas on` / `← Back to 4-Post Feed` | 124531 / 124834 |
| 5 | **Things about Prerana** | `CHAPTER 01` / `THINGS ABOUT` | 125233 / 125446 |
| 5 | | subtitle ⚠️ *(see flags below)* | 125879 |
| 5 | | poster line "Being with you makes every ordinary day…" | 126715 |
| 6 | **5 reasons** | `5 reasons you're my favourite human..` | 130541 |
| 6 | | 5 cards ka text | 130736 ke aas-paas |
| 6 | | `FOREVER IN YOUR CORNER · PURA PYAAR ♡` | 132434 |
| 7 | **Portrait spotlight** | `PORTRAIT SPOTLIGHT` / `PRERANA` | 133108 / 133283 |
| 7 | | `Meet madam ji` | 134033 |
| 7 | | `18 NEVER LOOKED SO UNSTOPPABLE` ⚠️ | 134161 |
| 8 | **Favourite memory** | `CHAPTER 02` / `FAVOURITE` / `Memory Of Us` | 134714 – 135079 |
| 8 | | `HAR BEKAAR DIN BHI APNE HOTE TO YAAD REHTA` | 135312 |
| 8 | | body "Bina wajah ki hasi, woh plan jo kabhi nahi bane…" | 135799 |
| 8 | | timeline labels (`JAHAN SE SHURU HUA`, `BAKWAAS AUR HASI`, `HASI JO KABHI NAHI RUKI`) | 136581 – 137708 |
| 9 | **Heart mosaic** | `My only` | 139328 |
| 9 | | `Devii ji` | 139406 |
| 9 | | caption "Kaise describe karun tujhe?…" | ~140600 |
| 10 | **Photo dump** | `CHAPTER 03` / `PHOTO` | 144290 / 144453 |
| 10 | | `COLLECTION OF LITTLE MOMENTS` | 144720 |
| 11 | **Polaroid archive** | `POLAROID ARCHIVE` | 146699 |
| 11 | | `Chhoti yaadein, badi hasi` | 146893 |
| 11 | | polaroid captions (`candid laughs`, `golden times`, `unforgettable moments`, `best vibes only`, `forever & always`) | 147566 – 150104 |
| 12 | **Love letter** | `CHAPTER 04` / `A LOVE LETTER — FROM YOUR HYPE MAN` | 150501 / 150674 |
| 12 | | `Devii ji, 18 pe — ek chitthi` | 150844 |
| 12 | | `Dearest Prerana,` | 151074 |
| 12 | | **letter body paragraph 1** | 151196 |
| 12 | | **letter body paragraph 2** | 151503 |
| 12 | | `PURA PYAAR AUR THODI BAKWAAS KE SAATH,` | 151953 |
| 12 | | `Your Dude ♡` | 152161 |
| 13 | **Filmstrip** | `MEMORIES IN MOTION` / `FILMSTRIP MEMORIES` | 152825 / 152996 |
| 13 | | `Golden reel` + subtitle | 155397 / 155586 |
| 14 | **Back cover** | `HAPPY` / `BIRTHDAY PRERANA` | 156032 / 156207 |
| 14 | | `Cheers to you, aur aage ke 18 chapters` | 156364 |
| 14 | | `SPECIAL EDITION` / `This is our story` | 158657 / 158886 |
| 14 | | `LIKHA HAI PYAAR SE, PRERANA KE LIYE` | 159006 |

---

## Baaki site ka text kahan hai

| Section | File | Offset |
|---|---|---|
| Hero (`Happy Birthday · Prerana`, English paragraph) | `2njl4qrpzxs9l.js` | 21937 – 24986 |
| Polaroids (`Chhoti Boss 🥹`, `Bakka Pilla 😎`, …) | `2njl4qrpzxs9l.js` | ~36000 |
| Reveal page (watermark 18, player) | `birthday.html` | — |
| iMessage finale (5 bubbles) | `last.html` | `const MESSAGES` array |
| Song acts (lyrics, timings) | `songs/sec.js` | `ACTS` array (sabse upar) |
| Entry song + player | `birthday.html` | `#bgMusic`, `.player-title` |
| Marquee / ticker | `index.html` | RSC payload |
| PDF download button | `_magpdf.js` | — |
| **Magazine PDF (exported)** | `downloads/Prerana-Birthday-Magazine.pdf` | *(static, regenerate karna padega)* |

---

## ✅ Kiye gaye edits (log)

| Kya | Pehle | Ab |
|---|---|---|
| Memory chapter body | "2 baje raat ki calls, bina wajah ki hasi…" | "Bina wajah ki hasi, woh plan jo kabhi nahi bane, aur woh baatein jo kabhi khatam hi nahi hoti…" |
| Memory timeline label 02 & 03 | `RAAT 3 BAJE TAK HASI` | `HASI JO KABHI NAHI RUKI` |
| 5-reasons card 04 (magazine) | `RAAT 2 BAJE KI BAKWAAS` | `BINA MATLAB KI BAKWAAS` |
| Shayari #2 (butterfly card) | "Raat ke 2 baje jo online dikh jaaye…" | "Jo bina bulaye online dikh jaaye…" |
| Heart mosaic title | `My only love` | `My only Devii ji` |
| Heart mosaic caption | "To the girl who has a whole plan ahead…" | "Kaise describe karun tujhe? Sabse honest, sabse mehnati…" |

Koi bhi clock-time (`2 baje`, `raat 3 baje`) ab **poore site** me nahi hai — `python3 find-text.py --grep baje` khali aata hai.

---

## ⚠️ 3 cheezein jo tum pakadna chahoge

Maine scan karte waqt ye mile — tumhare tone rules ke against hain:

| Kahan | Text | Problem |
|---|---|---|
| offset 125879 | `GET TO KNOW MY SWEETEST GIRL & THE LOVE OF MY LIFE` | "love of my life" — romance framing |
| offset 134161 | `18 NEVER LOOKED SO UNSTOPPABLE` | "looked so" — looks ki tareef (effort/talent nahi) |
| offset 187481 | `VOUGUE` | spelling typo, hona chahiye `VOGUE` |

Bolo to teeno fix kar dunga (aur PDF regenerate).

---

## Text edit karne ka safe tareeka

1. Pehle dhoondo:
   ```bash
   python3 find-text.py "purana text"
   ```
2. Edit karo — **exact string match** karke, sirf quoted text ke andar:
   ```python
   # edit.py
   f = '_next/static/chunks/2njl4qrpzxs9l.js'
   s = open(f, encoding='utf-8').read()
   old = 'children:"My only"'
   new = 'children:"My devii"'
   assert s.count(old) == 1, 'exact match nahi mila!'
   open(f, 'w', encoding='utf-8').write(s.replace(old, new))
   ```
3. **Hamesha syntax check karo:**
   ```bash
   node --check _next/static/chunks/2njl4qrpzxs9l.js
   ```
4. Browser me `Ctrl + Shift + R` karke dekho.

### Rules

- ❌ Kabhi bhi **quote ke andar ke bahar** edit mat karo — JSX toot jayega
- ❌ `'` (apostrophe) mat daalo — string double-quoted hai, upstream JSX me `\'` escape hota hai
- ✅ Emoji chalega (`🫶` `♡` `✦`)
- ✅ Hinglish chalega — file UTF-8 hai
- ⚠️ Ek text kai jagah repeat ho sakta hai (`assert count == 1` isliye)

---

## PDF dobara banane ka tareeka

Magazine text badalne ke baad PDF stale ho jayegi. Regenerate:

```bash
pip install playwright && python3 -m playwright install chromium
python3 render-pdf-pages.py                  # pages ko PNG me render karta hai
# phir PDF build (README me poora command hai)
```
