# Kerem Gavriel — Tattoo site

Static one-page portfolio. English. Visual world: "The Jeweler's Velvet Tray" (see `.impeccable/surfaces/index-html.md` for the direction contract, `PRODUCT.md` for product truth).

## Run locally
```bash
python3 -m http.server 8080
```
Then open http://localhost:8080

## Files
- `index.html` — all content and sections
- `style.css` — tokens (velvet, brass, ivory), layout, motion
- `lightbox.js` — full-screen viewer (swipe, drag-to-dismiss, keyboard)
- `effects.js` — settle reveals, rail bead, nav, the loupe on every stone
- `img/` — JPG + WebP (currently 640px Instagram grabs, two cropped to remove a watermark)

## Capture / review flag
`?static=1` settles every reveal instantly and eager-loads images; `&y=<px>` scrolls to an offset. Used only for screenshots.

## Placeholders to replace
1. **Portrait** (`img/profile-hero.*`, `data-placeholder="portrait"`): a 150px avatar upscaled. Replace with a real portrait, 1:1 or 4:5, ≥1200px, and remove `data-placeholder`.
2. **Originals**: replace every `img/tattoo-*.jpg` with the full-resolution original (≥2000px long edge), regenerate WebP with `cwebp -q 82`. The loupe zoom (`data-zoom`) can go back up to 2.4 once sources are sharp.
3. **Pricing / deposit / reply time**: a commented slot in the Book section.
4. **Captions**: each tag reads `subject · placement · size`; sizes are estimates, confirm with Kerem.
5. **og:image**: points at the husky; update if the hero stone changes.

## Deploy
Live at https://royco1919.github.io/kerem-tattoo/ (GitHub Pages, branch `gh-pages` of Royco1919/kerem-tattoo).
```bash
rm -rf dist && mkdir dist && cp index.html style.css lightbox.js effects.js dist/ && cp -R img dist/ && touch dist/.nojekyll && cd dist && git init -q && git checkout -q -b gh-pages && git add -A && git commit -qm deploy && git push -qf https://github.com/Royco1919/kerem-tattoo.git gh-pages
```
The Netlify site (kerem-tattoo.netlify.app) still serves v2; its account is out of deploy credits.
