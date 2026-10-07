# Kerem Gavriel site v2 — "Gallery, dark" design spec

Date: 2026-10-07. Supersedes v1 spec sections: Page structure, Design system. Keeps: static files, image set, WhatsApp/Instagram links, lightbox behaviour, a11y fallbacks.

## Purpose
A site Kerem is proud of: feels like an international artist's page, not a studio brochure. Research: docs/research/2026-10-07-competitor-insights.md.

## Constraints
- English, LTR. Dark only. Static HTML/CSS/JS, no build. Google Fonts allowed (Cormorant Garamond 500/600 italic+roman, Inter 400/500).
- Every animation: spring or short ease on transform/opacity only; all gated by `prefers-reduced-motion`.
- Placeholders where owner content is missing, each marked with `data-placeholder` and a visible "replace" note in README: artist portrait, full-res images, pricing/deposit, healed photos.

## Page structure (in order)
1. **Nav** — translucent, wordmark left ("Kerem Gavriel"), links Work / Process / About / Book. Hides on scroll down, shows on scroll up.
2. **Hero** — full-viewport. Giant serif wordmark "KEREM GAVRIEL" (clamp 4rem–12rem) split in two lines, letters stagger-in on load (opacity + y, 30ms apart). Right/below: one tall image (tattoo-01) with subtle parallax (max 24px, desktop only). Eyebrow "Micro realism · Haifa, Israel". CTA "Book on WhatsApp" + ghost "@kerem.g.tatt". Scroll cue.
3. **Statement** — one sentence, 2.5–4rem serif italic, words reveal on scroll (IntersectionObserver, stagger 40ms).
4. **Selected work** — filter chips All / Pets / Portraits / Objects (data-cat on tiles; filtering = fade+scale out/in, layout via CSS grid, no FLIP). Grid 4:5 tiles, 2/3/4 cols. Tiles reveal on scroll (stagger). Hover: image scale 1.04 over 600ms, caption slides up (subject · placement). Click → existing lightbox.
5. **The Loupe** — section with one large image (tattoo-11 husky). A circular magnifier (160px, 2.5× zoom) follows pointer on hover (desktop) or finger on touch-drag (mobile). Caption: "Needle-level detail. Move over the image." Reduced-motion: static 2× crop beside the image.
6. **Process** — 4 steps in a row (2×2 mobile): 01 Send a photo · 02 Design · 03 Session · 04 Heal. Each step card reveals on scroll; a thin horizontal line draws (scaleX) across the row when in view.
7. **About** — editorial portrait placeholder (profile.jpg upscaled with blur + note), 2 short paragraphs, three quiet stats: 12.7K on Instagram · Haifa · Kerem Studio.
8. **Book** — "Let's talk" serif heading, 2 lines on how to brief, WhatsApp CTA (large), line "Minimum ₪— · Deposit ₪— · Reply within 48h" as placeholder.
9. **Footer** — © year, Instagram, "Sponsored by @biotat_".

## Design system
- Tokens: --ink #0b0b0b, --bone #f2f0ec, --graphite #8f8c86, --hair rgba(255,255,255,.1), --wa #25d366.
- Type: display `"Cormorant Garamond", Georgia, serif`, 500, tracking -0.02em, line-height 0.95. Body `Inter, system-ui`, 1rem/1.6. Labels: Inter 0.75rem uppercase tracking .12em graphite.
- Motion: reveal = opacity 0→1, translateY 24px→0, 700ms cubic-bezier(.2,.7,.2,1). Stagger via `--i` custom property. Hero letters same curve, 900ms.
- Grain: subtle SVG noise overlay at 4% opacity on body (static, no animation).
- Cursor: default. (Custom cursor declined.)

## Files
index.html, style.css, lightbox.js (existing engine, moved), effects.js (reveal, hero stagger, nav hide, filters, loupe, parallax).

## Testing
Browser: desktop + 375px; reduced-motion emulation via `matchMedia` override check in code; console clean; lightbox regression (open/swipe/Esc/backdrop/inert); loupe follows pointer; filters hide/show correct tiles; no horizontal scroll.
