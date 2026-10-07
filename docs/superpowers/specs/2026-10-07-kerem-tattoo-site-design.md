# Kerem Gavriel — Tattoo Artist Site: Design Spec

Date: 2026-10-07

## Purpose
One-page portfolio site for Kerem Gavriel (@kerem.g.tatt), micro-realism tattoo artist in Haifa.
Goal: show the work, make booking one tap away. Success = visitor sees 6–8 tattoos within 10 seconds and taps the WhatsApp button.

## Constraints
- Hebrew, RTL. English only for the artist's handle/name where natural.
- Light, minimalist theme. Dark mode follows `prefers-color-scheme`.
- Static: `index.html`, `style.css`, `main.js`, `img/`. No build step, no framework, no dependencies.
- Images: 12 scraped from Instagram at 640px (8 unique tattoos + 1 stencil shot + 1 studio frame; 2 duplicates dropped). Owner can replace files in `img/` with full-res later without code changes beyond `main.js` gallery list.
- Mobile-first. Most traffic from Instagram link on phones.

## Content
- Name: כרם גבריאל / Kerem Gavriel
- Tagline: Micro realism · Haifa
- Studio: Kerem Studio (@kerem_studio)
- Sponsor: @biotat_ (footer mention)
- Booking: WhatsApp `https://wa.me/message/LAB4DCIWYGBON1`
- Instagram: `https://www.instagram.com/kerem.g.tatt/`
- About copy (short, Hebrew, placeholder-free, can be edited by Kerem).

## Page structure
1. **Nav** — sticky, translucent (`backdrop-filter`), name on the right (RTL start), links: עבודות / אודות / תור. Scroll-edge fade, no hard border.
2. **Hero** — large display name, tagline, one primary CTA "קביעת תור בוואטסאפ", secondary link to Instagram. One hero image (tattoo-01 fish plate) with generous whitespace.
3. **Gallery** — responsive grid (2 cols phone, 3 tablet, 4 desktop). Each tile: image, `object-fit: cover`, square. Tap opens lightbox.
4. **Lightbox** — full-screen, swipe left/right between images, drag-down to dismiss with 1:1 tracking, velocity-projected snap, rubber-band at ends, close on Escape/backdrop. Spring-based motion via Web Animations + rAF; no CSS keyframes for the gesture path.
5. **About** — 2–3 sentences, small round profile photo.
6. **Booking** — WhatsApp CTA repeated, studio name, Haifa, Instagram link.
7. **Footer** — © year, "sponsored by @biotat_".

## Design system (apple-design applied)
- Font: `system-ui` stack (SF on Apple, Segoe/Roboto elsewhere); Hebrew falls back to system Hebrew faces.
- Display: `clamp(2.5rem, 8vw, 5rem)`, `line-height: 1.02`, `letter-spacing: -0.02em`. Body: `1rem/1.6`, tracking 0.
- Colors (tokens on `:root`): bg `#fafaf9`, fg `#111`, muted `#6b6b6b`, accent WhatsApp green `#25d366` only on CTA. Dark: bg `#0e0e0e`, fg `#f2f2f2`.
- Spacing scale in `rem`. Gutters 16px phone, 32px+ desktop. Max content width 1200px.
- Press feedback: `:active { transform: scale(.97) }` 100ms on buttons/tiles, triggered on pointer-down.
- Motion: springs, damping 1.0 default; lightbox swipe release damping 0.8. `prefers-reduced-motion` → opacity cross-fades only. `prefers-reduced-transparency` → solid nav.
- Images lazy-loaded (`loading="lazy"`), hero image eager. `aspect-ratio` set to prevent layout shift.

## Data flow
`main.js` holds an array of `{src, alt}`. Renders gallery tiles and drives the lightbox. No network calls.

## Error handling
Missing image → `alt` text shown, tile keeps aspect ratio. JS disabled → gallery still renders (tiles are in HTML; JS only adds lightbox).

## Testing
- Manual: iPhone-width + desktop in built-in browser; swipe/drag/escape; reduced-motion emulation; dark mode.
- Automated: none (static site). Lint HTML with browser console check for errors.

## Out of scope
Multi-page, CMS, booking form, analytics, SEO beyond title/meta/OG tags.
