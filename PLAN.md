# 🎂 PLAN — "Best Friend Edition" text swap

**Kya karna hai:** site ka poora text jo love/romance feel de raha hai, usko
**bestfriend vibe** me badalna — funny + motivational + supportive + shayari.
Design, layout, animation, sections — **kuch nahi chhedna**. Sirf strings.

**Status:** 📋 PLAN ONLY — tera approval aaye tab code chhuunga.

---

## 1. Audit — site me abhi kya likha hai

Site 8 sections ki hai (2 iframe + 5 compiled React chunk + ticker):

| # | Section | Copy kahan rehta hai |
|---|---|---|
| 1 | Curtain gate + countdown | `birthday.html` + `2njl4qrpzxs9l.js` |
| 2 | Hero / intro counter | `2njl4qrpzxs9l.js` |
| 3 | Instagram feed + hero block | `2njl4qrpzxs9l.js` |
| 4 | 12 things + 5 reasons | `2njl4qrpzxs9l.js` |
| 5 | Memory chapter + polaroids | `2njl4qrpzxs9l.js` |
| 6 | Letter chapter (CH 04) | `2njl4qrpzxs9l.js` |
| 7 | VOGUE magazine + VIP pass | `2njl4qrpzxs9l.js` |
| 8 | Butterfly cards + iMessage finale | `2njl4qrpzxs9l.js` + `last.html` |
| — | Top ticker + marquee | `index.html` |

**Love-feel word count (asli numbers, grep se):**

| Word | Hits | Word | Hits |
|---|---|---|---|
| `Sweety / SWEETY` | 64 | `forever` | 12 |
| `love / LOVE` | 24 | `princess / queen` | 6 |
| `heart / HEART` | 20 | `beautiful` | 6 |
| `soul` | 5 | `angel` | 3 |
| `crush` | 1 | `SWEET 15` / `15 NEVER` | 3 |

Total **~155 romantic hits** — poori site "love letter" tone me hai.

---

## 2. Tone system — v2 "dosti wala pyaar" ✅

> **Correction (Dinesh):** pehle version me pyaar *poora* nikal raha tha — wo galat
> tha. Bestfriend hai, to **pyaar rahega** — bas *boyfriend wala* pyaar nahi.
> Tone = **warm dost**, jo openly kehta hai "yaar tu meri favourite hai" — par
> "my love / forever yours / my crush" nahi.

### 2.1 Do tarah ka pyaar — farq samajh le

| ✅ RAHEGA — dosti wala pyaar | ❌ HATEGA — romance wala |
|---|---|
| pyaar, yaar, dost, jigar, apna | my love, my only love |
| "tu meri favourite hai" | "you own my heart" |
| "dil se shukriya yaar" | forever yours / forever mine |
| "tere bina plan adhoora hai" | my crush / soulmate / princess |
| "tujhpe pyaar aata hai" (dost wala) | "I fall in love with you again" |
| ♥️ ❤️ 🫶 (India me normal hai) | 😘 💋 "my beautiful girl" |
| "meri jaan" ❌ nahi chahiye — | — |

**Simple test:** jo line ek ladka apni *girl bestfriend* ko bol sakta hai bina
awkward hue — wo rahegi. Jo line sirf girlfriend ko bolte hain — wo jaayegi.

### 2.2 Ratio

Har section me ~**60% warm/affectionate + 40% funny/motivational**. Poora dry
"resume" nahi banana — usme maza nahi aayega. Pyaar dikhega, bas direction
badlegi: *looks → insaan*, *romance → dosti*.

### 2.3 Word bank

| ❌ Hatega | ✅ Aayega |
|---|---|
| my love, my only love | yaar, dost, mera insaan |
| forever yours, forever mine | hamesha tere saath, teri side pe |
| my crush, soulmate, princess | partner in crime, hype man, boss |
| you own my heart | tu meri favourite hai, dil se |
| my beautiful girl, gorgeous | himmat, zidd, talent |
| SWEET 15 / 15 NEVER | SWEET 18 / 18 NEVER |
| 😘 💋 | 🫶 ♥️ ✨ 🦋 |

### 2.4 Emoji policy (relaxed)

`❤️ ♥️ 🤍 🫶 ✨ 🌸` — **chalega**
`😘 💋 ♡ (kiss wala)` — hatayenge
`😭 🫂` — already perfect

### 2.5 Nayi "pyaar wapas" lines — kahan warmth add hogi

Plan ke jo lines thodi dry ho gayi thi, unme garmi wapas:

| Jagah | Final line |
|---|---|
| Hero sub | "Ek din cake, chaos, aur dher saari hasi. Aur ek saal jisme tu jitna sochti hai usse zyada kar jaaye. **Yaar, tu really meri favourite hai.** Happy Birthday, Prerana!" |
| Letter closing | "...baki sab tu khud kar legi. Tu hamesha karti hai. **Aur haan — main tujhse pyaar karta hoon yaar, dosti ka wala. Bina sharm ke, bina filter.**" |
| Letter sign-off | `SIGNED, TERA HYPE MAN (AUR DOST)` |
| Butterfly shayari #1 | "Dost woh, jo cake ka pehla bite le jaaye — aur bole *'main sirf taste kar rahi thi yaar.'* **Aise dost pe pyaar aata hai, bas thoda sa. 🤍**" |
| Finale last line | "Happppyeee birthday Prerana 🫂 **— tera sabse bada fan, hamesha.**" |
| 12-things #12 | "HAMESHA MERI SIDE / Tu neutral nahi rehti, tu meri side leti hai. **Isliye tu dost nahi, team hai. Aur thoda sa pyaar bhi hai, chhupa nahi rahega.**" |

### 2.6 Hard rules (v2)

- Koi "romance/propose/shaadi/boyfriend" framing — zero.
- Teasing allowed, sirf uski **aadatein** pe (late aana, khana bhoolna) —
  looks/family pe kabhi nahi.
- Har section me ek motivational line rahegi.
- Shayari Hinglish (Roman) me — padhne me easy.
- **Pyaar dikhana allowed hai — par sirf dosti ke andaaz me.**

---

## 3. Section-by-section rewrite (OLD → NEW)

### 3.1 Top ticker + marquee — `index.html`

| OLD | NEW |
|---|---|
| `HAPPY BIRTHDAY SWEETY ·` | `HAPPY BIRTHDAY PRERANA · EK AUR CHAPTER SHURU ·` |
| `forever yours, made with all my love for Sweety ❤️` | `banaya ek dost ne — thodi neend, poori himmat. For Prerana 🫶` |
| `<title>Happy Birthday!</title>` | `Happy Birthday, Prerana!` |
| `A special birthday celebration` | `Ek din, ek dost, aur poori duniya ka best cake.` |

### 3.2 Gate — `birthday.html`

| OLD | NEW |
|---|---|
| `counting the years` | `counting the days` |
| `Sweety Song` | `Prerana's Song` |
| `alt="Sweety"` (x3) | `alt="Prerana"` |
| `Preview curtain reveal` | `pehle ek jhalak` |
| `countdown to curtain call` | `countdown to the big day` |
| `✨ Open Curtain (Preview)` | `✨ Khol de parda (preview)` |
| `Wishing you the best day` | `Wishing you the best year` |
| `may your year ahead shine / as brightly as your smile.` | `may your year ahead be / as unstoppable as your plans.` |
| `To the most beautiful soul, may your year ahead shine as brightly as your smile.` | `To the person who never gives up — may this year return everything you put in.` |

### 3.3 Hero block

| OLD | NEW |
|---|---|
| `Happy Birthday · Sweety` | `Happy Birthday · Prerana` |
| `wishing you a day filled with love, laughter, and all the happiness your heart can hold. May this year bring you endless joy and unforgettable memories. Happy Birthday!` | `Ek din cake, chaos, aur dher saari hasi. Aur ek saal — jisme tu jitna sochti hai usse zyada kar jaaye. Happy Birthday, Prerana!` |
| `a love letter celebrating your 15th chapter` | `an honest note celebrating your 18th chapter` |
| `THE QUEEN OF MY HEART` | `THE CEO OF OUR GROUP CHAT` *(title hi hai, isme pyaar hai)* |

### 3.4 Instagram feed captions

| OLD | NEW |
|---|---|
| `birthday celebrations begin ✨ with my favourite person ♡` | `birthday celebrations begin ✨ with the loudest human alive 🫶` |
| `keeping each other smiling always 🤍` | `2 ghante baat karke bhi topic khatam nahi hua 🤍` |
| `birthday eve vibes 💫 my heart is full` | `birthday eve vibes 💫 kal cake ka hisaab barabar` |
| `pure smiles & grace ♡ celebrating life` | `zero filter, 100% hasi ♡` |
| `Always photogenic, endlessly iconic` | `Camera on, bakwaas on` |
| `an iconic profile of the birthday queen` | `an iconic profile of the birthday boss` |
| `curated aesthetic feed & golden hour glow` | `curated feed, non-curated hasi` |

### 3.5 "12 THINGS I ADORE ABOUT YOU" → "12 THINGS I RESPECT"

Header: `12 THINGS I ADORE ABOUT YOU` → **`12 THINGS I RESPECT ABOUT YOU`**
Sub: `the traits that make you my favourite person` → `the receipts, likhit me`

| # | OLD title / line | NEW title / line |
|---|---|---|
| 1 | MESMERIZING EYES / I could get lost in them forever | **TEZ NAZAR** / Fake smile 2 second me pakad leti hai. Dangerous skill. |
| 2 | SWEETEST SMILE / Melts away all my stress in a second | **"KHAANA KHAYA?" ENERGY** / Tera pehla sawaal hamesha khana hota hai. Isliye tu safe hai. |
| 3 | GRACEFUL DANCER / Dancing to Maula Mere so beautifully | **DANCE FLOOR KI QUEEN** / Jab tu naachti hai, log camera nikalte hain. Main hasi rokta hoon. |
| 4 | TRADITIONAL CHARM / Looks like an angel in saree & lehenga | **10 MINUTE ME READY** / Navratri ho ya function — tu 10 minute me ready, hum 10 minute me late. |
| 5 | HER SILVER JHUMKAS / The cute chime every time she turns | **JHUMKA ALERT** / Chhan-chhan aayi, matlab madam ji aa gayi. Dekhna bhi nahi padta. |
| 6 | NOSE RING GLOW / That tiny sparkle made just for her | **NATHNI > FILTER** / Filter ki zaroorat hi nahi. Original hi kaafi hai. |
| 7 | CUTE GIGGLES / Her infectious laugh that makes my day | **TERI HANSI = MERA MEDICINE** / Koi bhi tension ho, ek awaaz me sab light. |
| 8 | PUREST SOUL / Caring, genuine, and so full of love | **DIL KI SAAF** / Jo bolti hai wahi karti hai. Isliye sab tujhpe bharosa karte hain. |
| 9 | MY SAFE PLACE / Her voice brings me instant peace | **MERI RESET BUTTON** / Kuch bhi gadbad ho — ek call, aur sab normal. |
| 10 | MY FOREVER CRUSH / Falling more in love every single day | **FOREVER HYPEGIRL** / Main kuch bhi try karun, tu pehle "kar dega" bolti hai, phir honest review deti hai. |
| 11 | SWEET 15 MAGIC / Growing more gorgeous year after year | **SWEET 18 ENERGY** / Ab 18 ki hai. Ab duniya ko tera naam seekhna padega. |
| 12 | FOREVER MINE / Held in my heart today and always | **HAMESHA MERI SIDE** / Tu neutral nahi rehti. Tu meri side leti hai. Isliye tu dost nahi, team hai. |

### 3.6 "5 REASONS YOU OWN MY HEART"

Header → **`5 REASONS YOU'RE MY FAVOURITE HUMAN`**
Sub `why you are the love of my life` → `no filter, sirf sach`

| OLD | NEW |
|---|---|
| YOUR RADIANT SMILE / The way your face lights up whenever we talk | **TERI HANSI** / Tu hasi to mera poora din theek. Sasta therapy. |
| YOUR PURE HEART / The sweetest, most caring soul who understands me better than anyone | **TERA SACHCHA PAN** / Sach kadwa ho to bhi bolti hai. Isliye blind bharosa. |
| YOUR UNMATCHED GRACE / From your gorgeous looks to your sweet selfies, you leave me in awe | **TERA SANGHARSH** / Makeup, padhai, salon ka sapna — sab khud. Koi shortcut nahi. |
| OUR SWEET TALKS / Late night laughs, whispering dreams, and all the silly moments only we share | **RAAT 2 BAJE KI BAKWAAS** / Bina matlab ki baatein, phir subah uthna mushkil. Legendary. |
| JUST BEING MY SWEETY / No one in this world compares to you. You are my princess, my love, and my world. | **BAS TU HONA** / Kuch special karne ki zaroorat nahi. Tu hoti hai — bas itna kaafi hai. |

### 3.7 Memory chapter (CH 02)

| OLD | NEW |
|---|---|
| `EVERY MOMENT WITH YOU BECOMES MY GREATEST TREASURE` | `HAR BEKAAR DIN BHI APNE HOTE TO YAAD REHTA` |
| `Our Love Story • Sweety's Birthday` | `Our Dosti Story • Prerana's Birthday` |
| `From our late night talks to every sweet laugh we share, every single second with you is etched into my heart. Being with you is the greatest blessing of my life. Happy Birthday to the girl who holds my entire world!` | `2 baje raat ki calls, bina wajah ki hasi, aur woh plan jo kabhi nahi bane. Sab kuch yaad hai. Tere saath ka sabse accha part ye hai ki kuch plan karna hi nahi padta — tu hoti hai, bas.` |
| `When you first stole my heart` | `PEHLI MULAKAAT, PEHLA IMPRESSION` |
| `Laughing together for hours` | `RAAT 3 BAJE TAK HASI` |
| `Holding your hand into our future` | `TERE SALON KE SAPNE PE FULL SUPPORT` |

### 3.8 Polaroids (CH 03)

| OLD | NEW |
|---|---|
| `Cherished little memories` | `Chhoti yaadein, badi hasi` |
| `COLLECTION OF LITTLE MOMENTS` / `POLAROID ARCHIVE` | *(same)* — already neutral |

### 3.9 Letter chapter (CH 04) — **shayari ka main adda**

| OLD | NEW |
|---|---|
| `A LOVE LETTER TO YOU` | `A LOVE LETTER — FROM YOUR HYPE MAN` *(love word rakha, bas letter dost ka hai)* |
| `To my sweet Sweety on her birthday` | `To Prerana, on turning 18` |
| para 1 (prettiest, sweetest girl… lucky to have you) | `Ek aur saal, ek aur chapter. 18 pe pahunch gayi — aur main tujhe itne saal se dekh raha hoon. Tu woh insaan hai jo kisi ka bhi din bina koshish kiye theek kar deti hai. Ye line simple lagti hai, par sach hai.` |
| para 2 (I fall in love with you all over again…) | `Ek hi promise: jab bhi tu apne sapne pe doubt karegi — salon, brushes, ya jo bhi next plan ho — main woh insaan hounga jo tujhe yaad dilaye ki tu kya kar sakti hai. Baki sab tu khud kar legi. Tu hamesha karti hai.` |
| `WITH ALL MY LOVE & HEART,` | `PURA PYAAR AUR THODI BAKWAAS KE SAATH,` |
| `WRITTEN WITH LOVE, FOR SWEETY` | `LIKHA HAI PYAAR SE, PRERANA KE LIYE` |
| `FOREVER & ALWAYS YOURS` | `FOREVER & ALWAYS IN YOUR CORNER` |
| `HAPPY BIRTHDAY SWEETY` | `HAPPY BIRTHDAY PRERANA` |
| `Cheers to forever with you` | `Cheers to you, aur aage ke 18 chapters` |
| `Frame by frame, the best story ever told` | `Frame by frame — sabse badi bakwaas, sabse achhi yaadein` |

### 3.10 VOGUE magazine + VIP pass

| OLD | NEW |
|---|---|
| `THE STORY OF SWEETY` | `THE STORY OF PRERANA` |
| `THE GIRL WHO HAS MY WHOLE HEART` (x2) | `THE GIRL WHO HAS MY WHOLE RESPECT` |
| `Meet the queen Sweety` | `Meet the birthday boss` |
| `Meet my birthday princess` | `Meet madam ji` |
| `15 NEVER LOOKED SO BEAUTIFUL` | `18 NEVER LOOKED SO UNSTOPPABLE` |
| `• SWEET 15 SPECIAL EDITION` | `• SWEET 18 SPECIAL EDITION` |
| `From the first page to the last, made with love for` | `From the first page to the last, made with pyaar for` |
| `SWEETY2026B` (pass MRZ line) | `PRERANA2026B` |
| `OCT 23` (x2) | `NOV 23` |

### 3.11 Butterfly cards (5) — 5 shayari yahan jaayengi

Ye 5 cards abhi 3 English + 2 Hinglish romantic lines hain → sab shayari ho jaayenge (neeche section 4 dekho).

### 3.12 iMessage finale — `last.html`

| # | OLD | NEW |
|---|---|---|
| 1 | `Happppyeee birthday Sweety ❤️` | `Happppyeee birthday Prerana 🫶` |
| 2 | `ik last bday pr ek problem hogyi thi isliye ye wala bilkul special banana chahta hu,` | `pichli baar kuch gadbad ho gayi thi, isliye is baar poora scene special banaya hai,` |
| 3 | `i hope ye dekh ke apke chotu se face pe ek badi si smile to aai hogi,` | `dekh ke tera face pe woh badi si smile aayi na — bas wahi chahiye tha,` |
| 4 | `nahi bhi aai to kal 11 baje se or surprises milna start ho jayengeee,` | `nahi aayi to bhi koi baat nahi, kal se aur bakwaas shuru,` |
| 5 | `Afterall m hito hu jiski responsibility h wo smile maintain krna 😭` | `afterall smile maintain karne ki responsibility meri hi hai na 😭` |
| 6 | `Happppyeee birthday Sweety 🫂` | `Happppyeee birthday Prerana 🫂` |
| — | footer `for Sweety · with all my love` | `for Prerana · ek dost ne, poori dosti se` |
| — | `Sweety ♥️` (chat header) | `Prerana ♥️` |

---

## 4. Shayari pack — 5 (LOCKED), Hinglish

Ye 5 exactly butterfly cards me jaayengi (5 cards hain site me):

1. "Dost woh, jo cake ka pehla bite le jaaye —
   aur bole *'main sirf taste kar rahi thi yaar.'*
   Aise dost pe pyaar aata hai, bas thoda sa. 🤍"

2. "Raat ke 2 baje jo **online** dikh jaaye,
   usse dosti kehte hain — doctor nahi. 🫶"

3. "Tu sapne chhote mat dekh, Devii ji —
   log tujhe chhota kehne ke liye hi bade hote hain."

4. "Log kahenge — 'ladki, itna bada sapna kyun?'
   Tu bas brush utha aur has de.
   Aankhon me aag ho, to sheesha bhi maan jaata hai."

5. "Peeche mudke dekh — kitna chal liya.
   Aage dekh — abhi to trailer shuru hua hai.
   18 saal sirf entry hai,
   poori film teri aankhon me rehti hai."

> Baaki jagah (hero, letter, finale) simple warm lines — plan section 3 me
> already likhi hui hain.

## 5. Funny + motivational bank (backup lines)

**Funny (agar koi slot khali rahe):**
- "Tu 5 minute me ready hoti hai. Bas woh 5 minute 40 minute ke hote hain."
- "Meri sabse badi achievement: tujhe time pe bulana. Ek baar bhi nahi hua."
- "Tere paas har cheez ka jawab hai. Sahi jawab ho, ye kabhi nahi bola."

**Motivational (letter / 12-things ke liye):**
- "Tu un logon me se hai jo raste nahi dhoondhte — bana lete hain."
- "Jo tu abhi 'chhoti si shuruaat' bolti hai, wahi 2 saal baad tera portfolio hoga."
- "Duniya ko tera naam yaad rakhna padega — abhi bhi time hai, pehle yaad rakh le."

---

## 6. Technical plan (kaise karunga, safely)

**Rule:** sirf string literals badalne hain. Layout, CSS, animation, section
order, file structure — **kuch nahi**.

1. **Backup** — `_backup/` folder me 5 files ki copy (bad me delete).
2. **Patch script** — `_texts.py`: ek dictionary `OLD → NEW`, har entry pe
   *expected count* assert. Agar koi string na mile → script ruk jaayega,
   chupchaap skip nahi karega. (Ye isliye ki minified file me typo se kuch
   toot na jaaye.)
3. **Files (6):**
   - `index.html`
   - `birthday.html`
   - `last.html`
   - `_next/static/chunks/2njl4qrpzxs9l.js` ← 90% copy yahan
   - `_next/static/chunks/2e1mk7px1q15-.js`
   - `_next/static/chunks/2or8npq1ldme6.js`
4. **Name + number swap** — `Sweety → Prerana` (64), `SWEET 15 → SWEET 18`,
   `15 NEVER → 18 NEVER`, `OCT 23 → NOV 23`,
   countdown `2026-11-11 → 2026-11-23` *(confirmation chahiye — section 7)*.
5. **Verify — romance sweep (v2):**
   - **0 hits** chahiye: `my love, forever yours, forever mine, my crush,
     soulmate, princess, my girl, my beautiful, I love you, in love with you,
     angel, my world, SWEET 15, 15 NEVER`
   - **Rehne do** (allowed): `yaar, dost, pyaar, favourite, hamesha, dil se`
   - `Sweety` → 0 (naam `Prerana` ho jaayega)
   Koi bhi galat hit mile to list dunga — chupchaap nahi chhodunga.
6. **QA** — Playwright, desktop 1280×800 + mobile 390×844:
   saare 8 sections, 2 iframes, countdown timer, music player, magazine
   video, iMessage typing animation → **0 console errors, 0 4xx/5xx**.
7. **Zip** — `birthday-four-clone.zip` (abhi delete ho gaya tha, naya banaunga).

**Risk:** compiled chunk edit karna hai — par sirf text strings, koi logic
nahi. Sabse safe tarika yahi hai (design 100% same rehta hai), aur maine
pehle bhi isi tarah string-swap kiya hai.

---

## 7. ✅ LOCKED — settings confirmed (Dinesh, is turn)

| Setting | Value |
|---|---|
| Name | **Prerana** (Sweety ka har instance) |
| Age | **18** — `SWEET 15 → SWEET 18`, `15th chapter → 18th chapter`, `15 NEVER → 18 NEVER` |
| Birth date | **23 Nov 2008** → `Date.UTC(2008, 10, 22, 18, 30, 0)` |
| Countdown | `2026-11-11T00:00:00+05:30` → **`2026-11-23T00:00:00+05:30`** |
| Shayari | **sirf 5** (5 butterfly cards) — baaki jagah simple warm lines |
| Tera naam uske liye | **Devii ji** aur **Madam** |
| Uska naam tere liye | **Dude** |
| Tone | dosti wala pyaar — warmth + funny + motivational |

**Nickname usage kahan aayega:** letter opening (`"Devii ji,"`), letter closing
(`"— tera Dude"`), finale me `"madam ji"` ka ek mention, aur 1-2 shayari me.

---

## 8. 📸 Photos — kya bhejna hai

Site me **14 photo slots** hain. Abhi sab **dusri ladki (Sweety)** ki photos hain —
inhe replace karna hai.

| File | Slot kahan | Shape |
|---|---|---|
| `bg2.jpg` | gate background (full bleed, sabse pehle dikhta hai) | wide |
| `ref/girl1.jpg` | gate ka art frame (2 photos alternate hote hain) | landscape |
| `ref/girl2.jpg` | gate ka art frame (dusra) | portrait-ish |
| `ref/girl3.jpg` | iMessage finale ka avatar | square |
| `ref/girl4–girl11` | polaroid wall, 4-post feed, magazine pages, 12-things | square |
| `ref/girl.jpg` | hero / spotlight | square |
| `ref/heart.jpg` | 11-photo heart mosaic | portrait |

**Kitni bhejni hai: 12–15 photos.** Bas — main inhe crop karke slots me daal dunga.

**Kaisi photos (best result ke liye):**
- 1 **close-up face** — gate background ke liye (sabse pehle ye dikhta hai)
- 2–3 **saree / lehenga / traditional** — "traditional charm" section
- 2–3 **hasi / candid** — "teri hansi" wale cards
- 1–2 **nachte hue** — dance wala card
- 1–2 **tere saath ya group** — memory & polaroid section
- 1 **mirror selfie** — Instagram feed wala part

**Format tips:**
- WhatsApp pe **"Document"** ya **HD** se bhej — normal WhatsApp photo compress ho jaati hai
- Square ya thodi lambi photos best (main crop kar lunga)
- Face photo me thoda upar-aage ho to crop safe rehta hai

**Do cheezein aur bata:**
- **Song** — abhi `sounds/pipi-song.mp3` hai (Sweety ka). Uska favourite gaana bheje
  to badal dunga, warna yahi rehne dunga.
- **Magazine video** — `videos/magazine-flip.mp4` bhi purani photos se bana hai.
  Naye photos aane pe main **dobara generate** kar dunga (photo flipbook video).

> `ref/heart.jpg` bhi main **khud bana dunga** teri photos se — wo bhejne ki zaroorat nahi.

## 9. Next step

Photos aa jaayen → main text swap + photo swap ek saath karke QA + zip dunga.

Approve kare to bas "haan chalu kar" bol. 🫶
