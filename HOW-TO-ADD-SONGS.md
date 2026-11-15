# 🎵 Songs kaise add karein (laptop se)

Do act hain, dono ko bas **2 mp3 files** chahiye:

| File | Kahan jaayegi | Kitni lambi |
|---|---|---|
| `songs/sec-1.mp3` | Act 01 · Song | **24 seconds** — ✅ already installed (24.4 s) |
| `songs/sec-2.mp3` | Act 02 · Dialogue | **11 seconds** — ✅ already installed (11.4 s) |

> **Status: dono songs lag chuke hain.** Reels se audio nikaal ke mp3 me
> convert kar diya gaya hai, aur site ka background music ab in sections pe
> khud band ho jata hai. Neeche ke steps sirf tab chahiye jab dobara badalna ho.

Naam **exactly** yahi rakhna — chhote letters, hyphen, `.mp3` extension.
(`sec-1.MP3`, `song1.mp3`, `Sec 1.mp3` — ye kaam nahi karenge.)

---

## Tarika 1 — Sabse aasan: yahan chat me bhej do ✅

Chat me mp3 attach kar do aur likh do *"ye song 1 hai"* / *"ye song 2 hai"*.
Main file ko sahi jagah `songs/sec-1.mp3` / `songs/sec-2.mp3` pe rakh dunga,
length check karunga, aur bata dunga ki sync theek hai ya timings thodi adjust karni hain.

Isme tumhe kuch download/extract/rename nahi karna.

---

## Tarika 2 — Workspace me seedha drop karna

Agar workspace file viewer me upload/drag-drop ka option dikh raha hai, to file ko
project ke andar `birthday-four-clone/songs/` folder me daal do, aur naam badal do:

```
birthday-four-clone/
└── songs/
    ├── sec-1.mp3   ← song 1 (24 s)
    ├── sec-2.mp3   ← song 2 / dialogue (11 s)
    ├── photo-1.jpg ← act 1 ki photo (optional)
    └── photo-2.jpg ← act 2 ki photo (optional)
```

---

## Tarika 3 — Poora laptop pe, apne paas

1. **Zip download karo:** `birthday-four-clone.zip` (workspace me hi hai, ~9 MB).
2. **Extract karo** kisi bhi folder me.
3. `songs/` folder kholo aur apni mp3s `sec-1.mp3` / `sec-2.mp3` naam se
   paste kar do (purani silent placeholder files ko **replace** kar dena).
4. **Server chalao** — seedha `index.html` double-click mat karna, browser
   security ki wajah se site adhoori khulegi. Folder ke andar terminal khol ke:

   ```bash
   # Node 18+ ho to
   node server.mjs

   # ya Python 3 se
   python3 server.py
   ```

   Phir browser me `http://localhost:3000` kholo.

5. Site pe **"Khol de parda"** dabao → neeche scroll → songs wale 2 sections.

---

## Clip kaise trim karein (optional but recommended)

File lambi bhi chalegi — engine sirf **shuru ke 24s / 11s** bajata hai aur phir
loop kar deta hai. Lekin behtar experience ke liye exact clip rakhna:

- **Windows:** Photos app → video/audio trim, ya free tool **Audacity** / **MP3 Cutter**
- **Mac:** QuickTime Player → Edit → Trim
- **Online:** koi bhi "mp3 cutter" site (laptop pe chal jayega)

Trim karte waqt dhyan rakho: pehli line **0.5 s** pe aati hai, to gaana shuru hote
hi thoda intro rakhna achha lagta hai.

---

## File daalne ke baad 30-second check

1. Browser me site kholo.
2. Songs section tak scroll karo.
3. Upar-chhota gold label dekho — **`01 SONG · 24 SECONDS`** likha hona chahiye.
   Har act apni real length **khud detect** karta hai; agar tumhari clip 23.6 s ki
   hai to label `24 seconds` dikha ke timing ko usi hisaab se scale kar dega.
4. Play pill dabao — avaaz aani chahiye. (Mobile browsers pe pehla tap zaroori hai,
   isliye autoplay nahi rakha.)
5. Pause/resume, aur screen pe kahin bhi tap — dono kaam karne chahiye.

Agar avaaz na aaye: `Ctrl + Shift + R` (hard refresh) karo, taaki browser purani
khaali file cache se na uthaye.

---

## Kuch aur badalna ho

| Kya badalna hai | Kahan |
|---|---|
| Lyrics ka text | `songs/sec.js` → `ACTS` array → `lines[].text` |
| Line kab aaye | same jagah → `lines[].at` (seconds) |
| Act ki length | same jagah → `dur: 24` / `dur: 11` |
| Photo | `songs/photo-1.jpg` / `songs/photo-2.jpg` replace kar do |
