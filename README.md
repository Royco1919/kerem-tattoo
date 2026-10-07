# Kerem Gavriel — Tattoo site

Static one-page portfolio. English, dark theme. No build step.

## Run locally
```bash
python3 -m http.server 8080
```
Then open http://localhost:8080

## Files
- `index.html` — all content and sections
- `style.css` — design tokens, layout, motion
- `lightbox.js` — full-screen viewer (swipe, drag-to-dismiss, keyboard)
- `effects.js` — hero letter reveal, scroll reveals, nav hide, filters, The Loupe, parallax
- `img/` — images (currently 640px Instagram grabs)

## Placeholders to replace (search `data-placeholder`)
1. **Portrait** — `img/profile-hero.jpg` (hero) is the 150px Instagram avatar upscaled; `img/profile.jpg` (About) is the same, blurred on purpose. Replace with an editorial photo (4:5, ≥1200px) and remove `data-placeholder` + the `<figcaption>`.
2. **Pricing** — "Minimum ₪— · Deposit ₪— · Reply within 48h" in the Book section.
3. **Images** — replace `img/tattoo-*.jpg` with full-resolution originals (≥1200px, 4:5). Keep the same filenames or update `src` in `index.html`.
4. **Captions** — each tile has `subject · placement`; edit to match the real piece.
5. **og:image** — make absolute after deploy, add `og:url`.

## Deploy
Upload `index.html`, `style.css`, `lightbox.js`, `effects.js`, `img/` to Netlify Drop, GitHub Pages or Cloudflare Pages.
