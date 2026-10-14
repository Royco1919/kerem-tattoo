---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: index.html (home, the only page)

Scope: one-page portfolio and booking page. Visitor mode: Persuade (success = a WhatsApp message with an idea).
Audience: Instagram followers on phones, new clients from Google, tourists. Job: judge the work, trust the person, book.
Proof on hand: 10 Instagram images at 640px, 150px avatar upscaled, 12.7K followers. Absent: healed photos, testimonials, prices (never invented; placeholders hidden from visitors).
Constraints: English only. WhatsApp is the only booking channel. Static HTML/CSS/JS. Netlify.

## Direction contract

THESIS: Every tattoo is a cut stone laid on a jeweler's velvet tray, and the loupe proves the cut. It refuses the category's arrangement (name, tagline, grid of thumbnails, green button) and the editorial cream-paper opposite: pieces are presented one at a time at stone scale, never as a thumbnail wall.

OWN-WORLD: Ground is deep green velvet (#0e1f18) with a visible nap (layered radial sheen plus a 1px nap stripe at low alpha), never flat black. Brass (#b89560) is a 1px brushed hairline and appears only on what responds to the visitor: the rail, the nav, the lens ring, button edges. Ivory stock tags (#efe8d8) carry every caption: subject, placement, size, with a punched hole and a thread to the rail. Ink (#0a0a0a) for text on ivory. Display face Bodoni Moda (hairline contrast), text face Manrope. Components: tray (section), stone (image with a lying shadow), tag (caption card), loupe (brass-ringed lens), rail (one brass line down the whole page that marks position). Depth is three real planes: tray, tag, lens, each with an offset soft shadow.

STORY: The visitor arrives on one stone under a loupe and understands within seconds that this is micro realism at needle level. They move down the tray, one stone at a time, each tagged like stock. They meet the jeweler (About) and the way a commission works (Process), then the tag that books: WhatsApp, always within reach. They believe the detail because they magnified it themselves.

FIRST VIEWPORT: Full-bleed velvet. Top-left: "Kerem Gavriel" in Bodoni Moda at clamp(64px, 8vw, 112px), under it the brass rail (1px, full width), under that Manrope 14px "Micro realism · Haifa, Israel". Right of center: the husky portrait as a single stone, 4:5, about 40% of viewport width on desktop, lying shadow beneath, the loupe (190px, brass ring, 2.5x) resting on its eye and following the pointer, long-press on touch. Bottom-left: ivory tag "Husky · forearm · 5 cm", and beside it the primary action as an ivory tag with brass edge: "Book on WhatsApp". Top-right: Manrope nav Work · Process · About · Book in brass. Mobile: name, rail, stone (52svh), tag and action above the fold, loupe on long-press.

FORM: The Jeweler's Velvet Tray, candidate 5 of 7 on the ordered grounded list (1 natural-history plate, 2 contact sheet, 3 gallery hang, 4 Carmel-light studio, 5 velvet tray, 6 thermal stencil, 7 ex-libris). Raised by: ikebana (active emptiness, no two stones touch), cel-dawn (three true planes), drum machine (one unbroken rail marking position), bauhaus (brass rationed to what acts). seed: none (unavailable)

Signature interaction: the loupe, present on the hero stone and on every stone in the tray on hover or long-press; motion grammar: critically damped, 180 to 320ms exponential ease-out, reveals as a stone settling onto velvet (opacity + 12px + shadow growing), one entrance orchestrated per tray, not per element.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
