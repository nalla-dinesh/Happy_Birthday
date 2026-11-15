# 🚀 Deploy — GitHub + Vercel

Ye project **pure static** hai: koi build step nahi, koi dependency nahi.

---

## 1. GitHub pe push karo

```bash
cd birthday-four
git init
git add .
git commit -m "Prerana birthday site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

> Sabse badi file ~3 MB (`fonts/`) hai — GitHub ke normal limit me aaram se.
> Git LFS ki zaroorat nahi.

---

## 2. Vercel pe import karo

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository**
2. Repo chuno, aur settings me:
   - **Framework Preset** → `Other`
   - **Build Command** → khali chhod do
   - **Output Directory** → `.`
   - **Install Command** → khali chhod do
3. **Deploy**

`vercel.json` already included hai (cache headers + static output).

### CLI se
```bash
npm i -g vercel
vercel          # preview URL
vercel --prod   # production
```

---

## 3. Deploy ke baad ye check karo

- `/` → curtain gate khule, countdown chale
- "Khol de parda" → reveal page
- Neeche scroll → dono song acts, mangaazine flipbook, iMessage finale
- Entry song bajega **sirf tab** jab `sounds/entry-song.mp3` maujood ho

---

## Zaroori baatein

| Cheez | Detail |
|---|---|
| `server.mjs` / `server.py` | sirf **local** testing ke liye. Vercel inhe ignore karta hai. |
| `/_next/image?...` | `_patch.js` client-side handle karta hai |
| `/api/time` | `_patch.js` mock karta hai — koi serverless function nahi chahiye |
| Update karna ho | file replace → `git push` → Vercel khud redeploy karega |
| Revert karna ho | Vercel dashboard → Deployments → purana deployment → **Promote** |

---

## Files jo tumhe replace/add karni hain

```
sounds/entry-song.mp3    ← entry song (O'Meri Laila ka mp3) — abhi missing hai
songs/sec-1.mp3          ← song act 1  (24 s) ✅ installed
songs/sec-2.mp3          ← dialogue act (11 s) ✅ installed
songs/photo-1.jpg        ← act 1 photo  ✅ installed
songs/photo-2.jpg        ← act 2 photo  ✅ installed
```
