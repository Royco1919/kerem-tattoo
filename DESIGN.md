---
name: Kerem Gavriel, The Jeweler's Velvet Tray
description: A one-page tattoo portfolio where each piece is a cut stone on green velvet, captioned by an ivory stock tag and proved under a brass loupe.
colors:
  velvet: "#0e1f18"
  velvet-hi: "#1b332a"
  velvet-lo: "#081410"
  brass: "#b89560"
  brass-soft: "rgba(184,149,96,.42)"
  ivory: "#efe8d8"
  ivory-2: "#e4dac4"
  ink: "#0a0a0a"
  ink-soft: "#5a5346"
  text: "#ede7da"
  text-soft: "#a9a697"
typography:
  display:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(4rem, 8.5vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  display-italic:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(3.25rem, 9vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(2rem, 3.6vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.14em"
  tag:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.25
rounded:
  sharp: "2px"
  stone: "3px"
  round: "50%"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  rail-x: "clamp(12px, 2.2vw, 28px)"
  max-width: "1360px"
  section-bottom: "clamp(100px, 12vw, 170px)"
  stone-gap: "clamp(72px, 9vw, 140px)"
components:
  tag:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    typography: "{typography.tag}"
    rounded: "{rounded.sharp}"
    padding: "9.6px 14.4px 9.6px 12.8px"
  tag-button:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "12.8px 20px"
  tag-button-large:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "16.8px 28px"
  tag-nav:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "7.2px 14.4px"
  stone:
    backgroundColor: "{colors.velvet-lo}"
    rounded: "{rounded.stone}"
  loupe:
    backgroundColor: "{colors.velvet-lo}"
    rounded: "{rounded.round}"
    size: "190px"
  nav-link:
    textColor: "{colors.brass}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.ivory}"
  lightbox-close:
    backgroundColor: "rgba(8,20,16,.6)"
    textColor: "{colors.brass}"
    rounded: "{rounded.round}"
    size: "44px"
---

# Design System: Kerem Gavriel, The Jeweler's Velvet Tray

## Overview

**Creative North Star: "The Jeweler's Velvet Tray"**

Every tattoo is a cut stone laid on green velvet, captioned by a stock tag, and proved by a loupe. Pieces are shown one at a time at stone scale, never as a thumbnail wall, and no two stones touch. The page is dark, quiet and slow; emptiness around each stone is part of the presentation.

Brass is rationed to what responds to the visitor: the rail, nav links, loupe ring, button edges, focus ring. Ivory belongs to tags only. Depth is three real planes: the tray (velvet), the tag and stone (lying shadows), and the lens (the deepest shadow). Type pairs a high-contrast Bodoni with a plain humanist sans.

**Key Characteristics:**
- Deep green velvet ground with sheen and pile, never flat black.
- One 1px brass rail down the whole page with a bead that marks scroll position.
- Ivory stock tags with a punched hole carry every caption and every action.
- A brass-ringed loupe magnifies any stone on hover or long-press.
- Motion is a stone settling: short, exponential ease-out, one rhythm.

## Colors

A restrained green, brass and ivory palette: three greens for ground, one brass for response, two ivories for paper.

### Primary
- **Brass** (`brass`): the only accent. Rail, bead, nav links, loupe ring, tag-button edge, lightbox close and counter, focus ring, selection fill, scrollbar thumb at soft alpha.
- **Brass Hairline** (`brass-soft`): underlines of links, the rail line, the hero rule's tail, scrollbar. Raised to .8 alpha under `prefers-contrast: more`.

### Neutral
- **Deep Velvet** (`velvet`): page ground and the bead's halo.
- **Velvet Highlight** (`velvet-hi`): declared as the lit-nap tone; the build paints the lit sheen with an inline lighter green radial instead, so use the token only for new lit surfaces.
- **Velvet Shadow** (`velvet-lo`): tag punch-hole, loupe and stone backing, scrollbar track, nav glass tint (rgba(8,20,16,.72)), lightbox scrim (.985).
- **Ivory** (`ivory`) and **Ivory Shade** (`ivory-2`): tag stock, a 180deg gradient from ivory to ivory-2; also headings on velvet (ivory).
- **Ink** (`ink`): text on ivory. **Ink Soft** (`ink-soft`): secondary text on ivory (the `em` in a tag).
- **Warm Paper Text** (`text`): body text on velvet. **Muted Paper Text** (`text-soft`): ledes, captions, footer, step copy.

### Named Rules
**The Rationed Brass Rule.** Brass appears only on what responds to the visitor. If it does not act, it is not brass.

**The Ivory Is Paper Rule.** Ivory fills are tags. Headline ivory on velvet is text, never a panel.

## Typography

**Display Font:** Bodoni Moda (with Bodoni 72, Didot, Times New Roman, serif)
**Body Font:** Manrope (with system-ui, sans-serif)

**Character:** Hairline-contrast Bodoni gives the jeweler's engraving; Manrope stays out of the way for tags, nav and body. Italic Bodoni is for statements and the closing invitation.

### Hierarchy
- **Display** (400, clamp(4rem, 8.5vw, 7rem), 0.98): the artist name in the hero only.
- **Display Italic** (400 italic, clamp(3.25rem, 9vw, 7rem), 0.95): the booking title. The statement uses the same italic at clamp(1.75rem, 3.6vw, 3rem), 1.15, capped at 28ch.
- **Headline** (400, clamp(2rem, 3.6vw, 3.25rem), 1.02): section titles, ivory, balanced.
- **Title** (400, clamp(1.375rem, 2.2vw, 1.75rem), 1.3): the About lead.
- **Body** (400, 1rem, 1.6): ledes at 1.0625rem capped at 46ch; supporting copy at .9375rem, 28ch to 56ch.
- **Label** (500, .75rem, .14em, uppercase): nav links in brass (.6875rem and .08em at 600px and below); lightbox counter.
- **Tag** (500, .8125rem, 1.25): caption and action tags; buttons 600 at .875rem, primary .9375rem, large 1.0625rem.

### Named Rules
**The Hairline Stays Large Rule.** Bodoni is used at 20px and up only; below that Manrope takes over so the hairlines never thin out.

## Layout

A single column of trays (sections), each capped at 1360px, with an inline gutter of clamp(20px, 5vw, 72px) and a left inset that clears the rail (rail-x plus 1.5rem). Section bottoms breathe at clamp(100px, 12vw, 170px).

Hero at 900px and above is two columns (1.1fr / .9fr): name, rule, place on the left, the husky stone (up to 520px wide, 4:5) on the right, tag and action bottom-left, hint bottom-right. Below 900px it stacks name, rule, place, stone, foot, hint in a 100svh grid. Short-phone rule: at max-height 760px and max-width 899px, the stone height drops to 36svh (max 400px), padding and gaps tighten and the hint shrinks, so the WhatsApp tag stays above the fold.

Work: one stone per row at full width at 639px and below. From 640px, stones are 560px wide, alternating left and right, with gaps of clamp(72px, 9vw, 140px). Process runs 1, 2 (720px) then 4 columns (1000px) with a faint rule behind the step tags. About runs 1 column, then .9fr / 1.1fr at 900px; the portrait leads. Nav: at 600px and below the brand is hidden and links right-align, and the nav never auto-hides.

### Named Rules
**The No-Touch Rule.** Stones never touch or overlap each other; caption tags may overhang their own stone by .75rem.

## Elevation & Depth

Hybrid of tonal and lying shadows. Velvet is flat tone; stones and tags sit above it on soft downward shadows; the lens sits highest. Shadows are always offset downward and blurred, never hard-edged.

### Shadow Vocabulary
- **Stone at rest** (`box-shadow: 0 30px 60px -20px rgba(0,0,0,.85), 0 12px 24px -8px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)`): every stone image. On fine-pointer hover it lifts 2px and deepens (0 40px 70px -22px, 0 16px 28px -8px).
- **Tag** (`0 1px 0 rgba(255,255,255,.35) inset, 0 6px 14px rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.4)`): ivory tags; tag-button hover deepens to 0 10px 22px and adds a 3px brass-soft ring.
- **Loupe** (`0 24px 48px -10px rgba(0,0,0,.8), 0 0 0 6px rgba(8,20,16,.55)` plus inner shading): the lens.
- **Velvet material:** two fixed radial sheens (a lighter green at 18% 0%, a near-black at 85% 90%) and an feTurbulence pile layer (fractalNoise, baseFrequency .55 .9, 3 octaves) at .07 opacity with soft-light blend. There is no periodic stripe; the nap is noise only.
- **Nav glass:** once scrolled, rgba(8,20,16,.72) with 18px blur and 140% saturation; solid velvet-lo under `prefers-reduced-transparency`.

### Named Rules
**The Three Planes Rule.** Tray, tag, lens. A fourth plane means something is wrong.

## Shapes

Near-square. Tags are 2px, stones and lightbox images 3px, like cut stock. The only circles are meaningful: the loupe, the rail bead (7px), the tag punch-hole (7px) and the lightbox close (44px). Brass lines are 1px. The hero rule fades from brass to transparent.

## Components

### Tag
An ivory stock card with a punched hole at its left, ink text. The hole is velvet-lo with a faint ring. Variants: caption (absolutely placed over a stone's lower left, overhanging -.75rem), step, nav, and button.

### Tag Button
The only call to action. A tag with a 1px brass border, weight 600. Hover deepens shadow and adds a brass-soft ring (200ms); active scales to .97 with a 1px drop (160ms). Sizes: primary (.9375rem), large (1.0625rem, closing booking).

### Stone
An image at 4:5 with a 3px corner and a lying shadow. The hero stone uses a taller free aspect (min(46svh, 520px) on phones). The portrait is grayscale at 1:1, the studio shot is 9:16, and stones marked as placeholders are grayscale with a .6px blur. Clicking opens the lightbox.

### Loupe
A 190px brass-ringed lens (140px at 600px and below), following the pointer on fine hover or on long-press on touch. Opacity 220ms and scale .7 to 1 over 320ms. Cursor hides while magnifying. Touch scroll stays vertical until magnifying begins.

### Rail
A fixed 1px brass-soft line at rail-x with a 7px brass bead that travels with scroll (120ms linear). It is the sole position indicator.

### Navigation
Fixed top bar: Bodoni brand left (1.25rem, ivory), uppercase brass Manrope links, and a tag-nav button. Hides on scroll down and returns on scroll up over 420ms; turns to blur glass once scrolled. Link hover turns ivory over 200ms. Brand hidden at 600px and below.

### Lightbox
A near-opaque velvet scrim (.985), swipeable slides with a 3px-cornered image, a 44px brass-ringed close button and a brass counter.

### Motion
**Settle:** opacity and 12px rise over 320ms with exponential ease-out (cubic-bezier(.23,1,.32,1)), staggered 60ms per index. Stone hover 500ms. Press scale .97. All motion collapses under `prefers-reduced-motion`. A dev-only `?static=1` query disables transitions, eager-loads images and optionally scrolls to `&y=`; it exists for screenshot capture and is not a user feature.

## Do's and Don'ts

### Do:
- **Do** keep brass to elements that respond: rail, nav, loupe, button edges, focus ring.
- **Do** caption every stone with an ivory tag carrying a hole and ink text.
- **Do** give each stone its lying shadow and leave empty velvet between stones.
- **Do** keep Bodoni at 20px and up; Manrope for everything smaller.
- **Do** keep a visible 2px brass focus ring with 4px offset.
- **Do** keep one stone per row at 639px and below, full width.

### Don't:
- **Don't** fill panels with ivory or use brass as decoration.
- **Don't** build a thumbnail grid or let stones touch.
- **Don't** use flat black grounds or a periodic stripe for the velvet nap.
- **Don't** add hard-edged shadows; the third plane is the lens, not a fourth layer.
- **Don't** invent prices, testimonials or healed photos; slots stay hidden until real.

## Known Placeholders and Drift (not canonized)

- The About portrait is a 150px avatar upscaled and flagged as placeholder (grayscale, .6px blur); replace with a real photograph.
- Tattoo sources are 640px; the loupe and lightbox magnify beyond native resolution on large screens.
- The pricing slot is empty and hidden.
- `velvet-hi` is declared but unused in the shipped CSS; the surface brief's "1px nap stripe" was not built, the noise pile replaced it.
