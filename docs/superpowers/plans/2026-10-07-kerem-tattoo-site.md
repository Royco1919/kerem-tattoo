# Kerem Tattoo Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One-page Hebrew RTL portfolio site for tattoo artist Kerem Gavriel with gallery, spring-driven lightbox and WhatsApp booking CTA.

**Architecture:** Three static files (`index.html`, `style.css`, `main.js`) plus `img/`. HTML carries all content and gallery tiles (works without JS). CSS holds design tokens, layout, press feedback and media-query fallbacks. JS only adds the lightbox: swipe between images, drag-down to dismiss, spring settle via `requestAnimationFrame`.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, grid, `backdrop-filter`), vanilla ES2020 JS. No build, no deps. Preview via `python3 -m http.server`.

**Spec:** `docs/superpowers/specs/2026-10-07-kerem-tattoo-site-design.md`

## Global Constraints

- Language: Hebrew, `<html lang="he" dir="rtl">`.
- Theme: light default (bg `#fafaf9`, fg `#111`, muted `#6b6b6b`), dark via `prefers-color-scheme` (bg `#0e0e0e`, fg `#f2f2f2`). Accent `#25d366` on CTA only.
- Font: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- Display type: `clamp(2.5rem, 8vw, 5rem)`, `line-height 1.02`, `letter-spacing -0.02em`. Body `1rem/1.6`, tracking 0.
- Gutters 16px phone, 32px desktop. Max width 1200px. Spacing in `rem`.
- No CSS keyframes/transitions on gesture-driven motion. Springs: damping 1.0 default, 0.8 on swipe release.
- `prefers-reduced-motion` → opacity cross-fade only. `prefers-reduced-transparency` → solid nav.
- Images: `img/tattoo-01,04,06,07,08,10,11,12.jpg` (tattoos), `img/tattoo-03.jpg` (stencil), `img/tattoo-02.jpg` (studio). Skip 05 and 09 (duplicates). Hero eager, rest `loading="lazy"`.
- Links: WhatsApp `https://wa.me/message/LAB4DCIWYGBON1`, Instagram `https://www.instagram.com/kerem.g.tatt/`.

## Review Focus

1. Keyboard user opens lightbox with Enter on a tile, presses Escape → closes, focus returns to the tile. (Task 3 verifies.)
2. Window resized while lightbox open → image stays centered, no horizontal scroll. (Task 3 verifies.)
3. Short, slow drag (< 10px) on lightbox → treated as tap, not swipe; no flicker. (Task 3 verifies.)
4. Swipe past last image → rubber-bands and springs back, never shows blank. (Task 3 verifies.)
5. Image file missing → tile shows alt text in correct aspect ratio, page layout intact. (Task 2 verifies.)

---

### Task 1: HTML skeleton + content

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: `.tile` buttons with `data-index` and nested `<img>`; `#lightbox` dialog markup; ids `#work`, `#about`, `#book`.

- [ ] **Step 1: Write `index.html`**

```html
<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>כרם גבריאל · Kerem Gavriel · קעקועים</title>
<meta name="description" content="כרם גבריאל, אמנית קעקועים בסגנון מיקרו-ריאליזם בחיפה. Kerem Studio. לקביעת תור בוואטסאפ.">
<meta property="og:title" content="כרם גבריאל · Micro realism tattoo · Haifa">
<meta property="og:description" content="קעקועי מיקרו-ריאליזם עדינים. Kerem Studio, חיפה.">
<meta property="og:image" content="img/tattoo-01.jpg">
<meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0e0e0e" media="(prefers-color-scheme: dark)">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="nav">
  <a class="nav__brand" href="#top">Kerem Gavriel</a>
  <nav class="nav__links" aria-label="ניווט">
    <a href="#work">עבודות</a>
    <a href="#about">אודות</a>
    <a href="#book">תור</a>
  </nav>
</header>

<main id="top">
  <section class="hero">
    <div class="hero__text">
      <p class="eyebrow">Tattoo artist · Haifa</p>
      <h1 class="display">כרם<br>גבריאל</h1>
      <p class="lede">מיקרו-ריאליזם עדין. קו דק, פרטים קטנים, קעקוע שנשאר איתך.</p>
      <div class="cta-row">
        <a class="btn btn--primary" href="https://wa.me/message/LAB4DCIWYGBON1" target="_blank" rel="noopener">קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" href="https://www.instagram.com/kerem.g.tatt/" target="_blank" rel="noopener">@kerem.g.tatt</a>
      </div>
    </div>
    <figure class="hero__img">
      <img src="img/tattoo-01.jpg" width="512" height="640" alt="קעקוע צלחת עם דגים בסגנון מיקרו-ריאליזם על זרוע" fetchpriority="high">
    </figure>
  </section>

  <section class="work" id="work">
    <h2 class="section-title">עבודות</h2>
    <div class="grid">
      <button class="tile" type="button" data-index="0"><img src="img/tattoo-04.jpg" width="480" height="640" alt="דיוקן חתול פרסי" loading="lazy"></button>
      <button class="tile" type="button" data-index="1"><img src="img/tattoo-08.jpg" width="480" height="640" alt="לב ומוח מחוברים בחבל עם דמות הולכת" loading="lazy"></button>
      <button class="tile" type="button" data-index="2"><img src="img/tattoo-10.jpg" width="480" height="640" alt="כלב מחייך שוכב" loading="lazy"></button>
      <button class="tile" type="button" data-index="3"><img src="img/tattoo-11.jpg" width="480" height="640" alt="דיוקן האסקי" loading="lazy"></button>
      <button class="tile" type="button" data-index="4"><img src="img/tattoo-06.jpg" width="480" height="640" alt="ציור בית על דף משבצות" loading="lazy"></button>
      <button class="tile" type="button" data-index="5"><img src="img/tattoo-07.jpg" width="480" height="640" alt="דיוקן חתול" loading="lazy"></button>
      <button class="tile" type="button" data-index="6"><img src="img/tattoo-12.jpg" width="640" height="640" alt="שני אגרטלים עם ציפורים ופרחים" loading="lazy"></button>
      <button class="tile" type="button" data-index="7"><img src="img/tattoo-01.jpg" width="512" height="640" alt="צלחת עם דגים" loading="lazy"></button>
      <button class="tile" type="button" data-index="8"><img src="img/tattoo-03.jpg" width="480" height="640" alt="סטנסיל מראה ויקטוריאנית לפני קעקוע" loading="lazy"></button>
      <button class="tile" type="button" data-index="9"><img src="img/tattoo-02.jpg" width="360" height="640" alt="Kerem Studio" loading="lazy"></button>
    </div>
  </section>

  <section class="about" id="about">
    <img class="about__avatar" src="img/profile.jpg" width="150" height="150" alt="כרם גבריאל">
    <div>
      <h2 class="section-title">אודות</h2>
      <p>אני כרם, אמנית קעקועים מחיפה. מתמחה במיקרו-ריאליזם: עבודות קטנות ומדויקות, בעיקר דיוקנאות של חיות מחמד, חפצים אישיים ורגעים קטנים.</p>
      <p>העבודה נעשית ב-Kerem Studio, בסביבה רגועה ונקייה. כל קעקוע מתוכנן יחד איתך מהרעיון ועד הסטנסיל.</p>
    </div>
  </section>

  <section class="book" id="book">
    <h2 class="display display--sm">בואו נדבר</h2>
    <p class="lede">שלחו הודעה עם רעיון, מיקום בגוף וגודל משוער. אני חוזרת עם הצעה ומועד.</p>
    <a class="btn btn--primary btn--lg" href="https://wa.me/message/LAB4DCIWYGBON1" target="_blank" rel="noopener">קביעת תור בוואטסאפ</a>
    <p class="muted">Kerem Studio · חיפה · <a href="https://www.instagram.com/kerem.g.tatt/" target="_blank" rel="noopener">Instagram</a></p>
  </section>
</main>

<footer class="footer">
  <span>© <span id="year"></span> Kerem Gavriel</span>
  <span class="muted">sponsored by @biotat_</span>
</footer>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="תצוגת תמונה" hidden>
  <button class="lightbox__close" type="button" aria-label="סגירה">×</button>
  <div class="lightbox__track"></div>
  <p class="lightbox__counter" aria-live="polite"></p>
</div>

<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Serve and check**

Run: `python3 -m http.server 8080` in project root; open `http://localhost:8080` in browser.
Expected: all text visible, RTL, all 11 images load (unstyled). Console: zero errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add site HTML with content and gallery tiles"
```

---

### Task 2: Stylesheet

**Files:**
- Create: `style.css`

**Interfaces:**
- Consumes: class names from Task 1.
- Produces: `.lightbox[hidden]` hidden; `.lightbox__slide` and `.lightbox__slide img` styles used by Task 3; `.lightbox.is-open` class toggled by JS.

- [ ] **Step 1: Write `style.css`**

```css
:root {
  --bg: #fafaf9;
  --fg: #111;
  --muted: #6b6b6b;
  --line: rgba(0,0,0,.08);
  --accent: #25d366;
  --accent-fg: #052e16;
  --nav-bg: rgba(250,250,249,.72);
  --gutter: 1rem;
  --max: 1200px;
  --radius: 14px;
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0e0e0e; --fg: #f2f2f2; --muted: #9a9a9a;
    --line: rgba(255,255,255,.1); --nav-bg: rgba(14,14,14,.7);
  }
}
@media (min-width: 768px) { :root { --gutter: 2rem; } }

* { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  margin: 0; background: var(--bg); color: var(--fg);
  font: 100%/1.6 system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-optical-sizing: auto; -webkit-font-smoothing: antialiased;
}
img { display: block; max-width: 100%; height: auto; }
a { color: inherit; }
h1, h2, p { margin: 0; }

.display {
  font-size: clamp(2.5rem, 8vw, 5rem); line-height: 1.02;
  letter-spacing: -0.02em; font-weight: 600;
}
.display--sm { font-size: clamp(2rem, 5vw, 3.25rem); }
.section-title {
  font-size: 0.8125rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--muted); font-weight: 500; margin-bottom: 1.5rem;
}
.eyebrow { font-size: .875rem; letter-spacing: .06em; color: var(--muted); margin-bottom: 1rem; }
.lede { font-size: 1.125rem; color: var(--muted); max-width: 34ch; margin-top: 1.25rem; }
.muted { color: var(--muted); font-size: .875rem; }

/* Nav: translucent material, content scrolls beneath */
.nav {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: .875rem var(--gutter);
  background: var(--nav-bg);
  -webkit-backdrop-filter: blur(20px) saturate(180%); backdrop-filter: blur(20px) saturate(180%);
}
.nav::after {
  content: ""; position: absolute; inset: 100% 0 auto 0; height: 12px;
  background: linear-gradient(var(--bg), transparent); opacity: .6; pointer-events: none;
}
.nav__brand { font-weight: 600; text-decoration: none; letter-spacing: -0.01em; }
.nav__links { display: flex; gap: 1.25rem; }
.nav__links a { text-decoration: none; color: var(--muted); font-size: .9375rem; }
.nav__links a:hover { color: var(--fg); }

main { max-width: var(--max); margin: 0 auto; padding: 0 var(--gutter); }

.hero {
  display: grid; gap: 2.5rem; padding: 4rem 0 5rem; align-items: center;
}
@media (min-width: 768px) {
  .hero { grid-template-columns: 1.1fr 1fr; gap: 4rem; padding: 7rem 0 8rem; }
}
.hero__img { margin: 0; }
.hero__img img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: var(--radius); }
.cta-row { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }

/* Buttons: feedback on pointer-down */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: .875rem 1.375rem; border-radius: 999px; text-decoration: none;
  font-weight: 500; font-size: 1rem; border: 1px solid var(--line);
  transition: transform 100ms ease-out, background-color 150ms ease-out;
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.btn:active { transform: scale(.97); }
.btn--primary { background: var(--accent); color: var(--accent-fg); border-color: transparent; }
.btn--primary:hover { background: #1fb858; }
.btn--ghost { background: transparent; }
.btn--lg { padding: 1.125rem 2rem; font-size: 1.125rem; }

/* Gallery */
.work { padding: 2rem 0 5rem; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .5rem; }
@media (min-width: 640px) { .grid { grid-template-columns: repeat(3, 1fr); gap: .75rem; } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); gap: 1rem; } }
.tile {
  padding: 0; border: 0; background: var(--line); border-radius: calc(var(--radius) - 4px);
  overflow: hidden; cursor: pointer; aspect-ratio: 1;
  transition: transform 100ms ease-out; -webkit-tap-highlight-color: transparent;
}
.tile:active { transform: scale(.97); }
.tile:focus-visible { outline: 2px solid var(--fg); outline-offset: 3px; }
.tile img { width: 100%; height: 100%; object-fit: cover; color: var(--muted); font-size: .75rem; padding: .5rem; }

/* About */
.about {
  display: grid; gap: 1.5rem; padding: 3rem 0 5rem; border-top: 1px solid var(--line);
  max-width: 60ch;
}
@media (min-width: 640px) { .about { grid-template-columns: auto 1fr; } }
.about__avatar { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; }
.about p + p { margin-top: 1rem; }

/* Booking */
.book {
  padding: 5rem 0 6rem; border-top: 1px solid var(--line);
  display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;
}
.book .btn { margin-top: 1rem; }

.footer {
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: .5rem;
  max-width: var(--max); margin: 0 auto; padding: 1.5rem var(--gutter) 3rem;
  font-size: .8125rem; color: var(--muted); border-top: 1px solid var(--line);
}

/* Lightbox */
.lightbox {
  position: fixed; inset: 0; z-index: 50; background: rgba(0,0,0,.92);
  display: flex; align-items: center; justify-content: center;
  touch-action: none; overscroll-behavior: contain;
}
.lightbox[hidden] { display: none; }
.lightbox__track { position: absolute; inset: 0; will-change: transform; }
.lightbox__slide {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  padding: 3rem var(--gutter); will-change: transform;
}
.lightbox__slide img {
  max-width: 100%; max-height: 100%; width: auto; height: auto;
  object-fit: contain; border-radius: 8px; user-select: none; -webkit-user-drag: none;
}
.lightbox__close {
  position: absolute; top: .75rem; inset-inline-start: .75rem; z-index: 2;
  width: 44px; height: 44px; border-radius: 50%; border: 0; cursor: pointer;
  background: rgba(255,255,255,.14); color: #fff; font-size: 1.5rem; line-height: 1;
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  transition: transform 100ms ease-out;
}
.lightbox__close:active { transform: scale(.92); }
.lightbox__counter {
  position: absolute; bottom: 1rem; left: 0; right: 0; text-align: center;
  color: rgba(255,255,255,.7); font-size: .8125rem; letter-spacing: .04em;
}

/* Accessibility preferences */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .btn, .tile, .lightbox__close { transition: none; }
}
@media (prefers-reduced-transparency: reduce) {
  .nav { background: var(--bg); -webkit-backdrop-filter: none; backdrop-filter: none; }
  .lightbox__close { background: rgba(255,255,255,.3); backdrop-filter: none; }
}
@media (prefers-contrast: more) {
  .nav { border-bottom: 1px solid var(--fg); }
  .btn { border-color: var(--fg); }
}
```

- [ ] **Step 2: Verify visually**

Reload `http://localhost:8080` at 375px width and at 1280px width.
Expected: hero stacks on phone, 2-up on desktop; grid 2/3/4 columns; nav blurs over content when scrolling; buttons shrink on press. Toggle dark-mode emulation: bg flips to `#0e0e0e`.

- [ ] **Step 3: Verify missing-image case (Review Focus 5)**

Temporarily rename `img/tattoo-06.jpg` → `img/_x.jpg`, reload. Expected: tile stays square, alt text visible, grid unchanged. Rename back.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "feat: add minimalist RTL stylesheet with dark mode and a11y fallbacks"
```

---

### Task 3: Lightbox with spring gestures

**Files:**
- Create: `main.js`

**Interfaces:**
- Consumes: `.tile[data-index]`, `#lightbox`, `.lightbox__track`, `.lightbox__close`, `.lightbox__counter`, `#year`.
- Produces: nothing external.

- [ ] **Step 1: Write `main.js`**

```js
(() => {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiles = [...document.querySelectorAll('.tile')];
  const items = tiles.map(t => {
    const img = t.querySelector('img');
    return { src: img.getAttribute('src'), alt: img.alt };
  });

  const box = document.getElementById('lightbox');
  const track = box.querySelector('.lightbox__track');
  const closeBtn = box.querySelector('.lightbox__close');
  const counter = box.querySelector('.lightbox__counter');

  // RTL: index 0 is at x=0; next slide sits at -W (to the left).
  const dir = -1;

  let index = 0, lastTile = null, W = innerWidth, H = innerHeight;
  let x = 0, y = 0;            // presentation values (px)
  let raf = 0;
  let spring = null;           // {toX,toY,vx,vy,damping,onDone}

  // ---- spring (damping ratio + response, Apple-style) ----
  function stepSpring(now) {
    if (!spring) return;
    const dt = Math.min(0.032, (now - spring.t) / 1000); spring.t = now;
    const resp = spring.response, zeta = spring.damping;
    const omega = (2 * Math.PI) / resp;                   // natural frequency
    const k = omega * omega, c = 2 * zeta * omega;
    const ax = -k * (x - spring.toX) - c * spring.vx;
    const ay = -k * (y - spring.toY) - c * spring.vy;
    spring.vx += ax * dt; spring.vy += ay * dt;
    x += spring.vx * dt; y += spring.vy * dt;
    render();
    const done = Math.abs(x - spring.toX) < 0.5 && Math.abs(y - spring.toY) < 0.5 &&
                 Math.abs(spring.vx) < 10 && Math.abs(spring.vy) < 10;
    if (done) { x = spring.toX; y = spring.toY; render(); const cb = spring.onDone; spring = null; cb && cb(); }
    else raf = requestAnimationFrame(stepSpring);
  }
  function animateTo(toX, toY, { vx = 0, vy = 0, damping = 1, response = 0.35, onDone } = {}) {
    cancelAnimationFrame(raf);
    if (reduceMotion) { x = toX; y = toY; render(); onDone && onDone(); return; }
    spring = { toX, toY, vx, vy, damping, response, t: performance.now(), onDone };
    raf = requestAnimationFrame(stepSpring);
  }

  // ---- rendering ----
  function render() {
    track.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const p = Math.min(1, Math.abs(y) / (H * 0.5));
    box.style.background = `rgba(0,0,0,${0.92 * (1 - p * 0.8)})`;
  }
  function build() {
    track.innerHTML = '';
    items.forEach((it, i) => {
      const s = document.createElement('div');
      s.className = 'lightbox__slide';
      s.style.transform = `translate3d(${dir * i * W}px,0,0)`;
      const img = document.createElement('img');
      img.alt = it.alt; img.draggable = false;
      if (Math.abs(i - index) <= 1) img.src = it.src; else img.dataset.src = it.src;
      s.appendChild(img); track.appendChild(s);
    });
  }
  function hydrate() {
    [...track.children].forEach((s, i) => {
      const img = s.firstChild;
      if (Math.abs(i - index) <= 1 && img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
    });
    counter.textContent = `${index + 1} / ${items.length}`;
  }
  const targetX = i => -dir * i * W;

  // ---- open / close ----
  function open(i, fromTile) {
    index = i; lastTile = fromTile; W = innerWidth; H = innerHeight;
    build(); hydrate();
    x = targetX(index); y = 0; render();
    box.hidden = false; document.body.style.overflow = 'hidden';
    box.style.opacity = reduceMotion ? '1' : '0';
    requestAnimationFrame(() => {
      box.style.transition = reduceMotion ? 'none' : 'opacity 180ms ease-out';
      box.style.opacity = '1';
    });
    closeBtn.focus();
  }
  function close() {
    box.style.transition = reduceMotion ? 'none' : 'opacity 160ms ease-in';
    box.style.opacity = '0';
    setTimeout(() => {
      box.hidden = true; document.body.style.overflow = '';
      box.style.background = ''; box.style.transition = '';
      spring = null; cancelAnimationFrame(raf);
      lastTile && lastTile.focus();
    }, reduceMotion ? 0 : 160);
  }
  function goTo(i, vx = 0, damping = 0.8) {
    index = Math.max(0, Math.min(items.length - 1, i));
    hydrate();
    animateTo(targetX(index), 0, { vx, damping, response: 0.35 });
  }

  // ---- gestures: 1:1 tracking, velocity history, projection, rubber-band ----
  function rubber(over, dim, c = 0.55) { return (over * dim * c) / (dim + c * Math.abs(over)); }
  function project(v, rate = 0.998) { return (v / 1000) * rate / (1 - rate); }

  let ptr = null; // {id, sx, sy, ox, oy, axis, hist:[]}
  const THRESH = 10;

  track.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    cancelAnimationFrame(raf); spring = null;   // interruptible: grab mid-flight
    track.setPointerCapture(e.pointerId);
    ptr = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: x, oy: y, axis: null, hist: [[performance.now(), e.clientX, e.clientY]] };
  });
  track.addEventListener('pointermove', e => {
    if (!ptr || e.pointerId !== ptr.id) return;
    const dx = e.clientX - ptr.sx, dy = e.clientY - ptr.sy;
    if (!ptr.axis) {
      if (Math.hypot(dx, dy) < THRESH) return;
      ptr.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    ptr.hist.push([performance.now(), e.clientX, e.clientY]);
    if (ptr.hist.length > 6) ptr.hist.shift();
    if (ptr.axis === 'x') {
      let nx = ptr.ox + dx;
      const min = targetX(items.length - 1), max = targetX(0);
      if (nx > max) nx = max + rubber(nx - max, W);
      if (nx < min) nx = min + rubber(nx - min, W);
      x = nx; y = 0;
    } else {
      y = ptr.oy + dy; x = targetX(index);
    }
    render();
  });
  function endPointer(e) {
    if (!ptr || e.pointerId !== ptr.id) return;
    const p = ptr; ptr = null;
    if (!p.axis) return;                          // tap, not drag
    const [t0, x0, y0] = p.hist[0], [t1, x1, y1] = p.hist[p.hist.length - 1];
    const dt = Math.max(1, t1 - t0);
    const vx = (x1 - x0) / dt * 1000, vy = (y1 - y0) / dt * 1000;
    if (p.axis === 'y') {
      const projected = y + project(vy);
      if (Math.abs(projected) > H * 0.3) {
        animateTo(x, Math.sign(projected || vy || 1) * H, { vy, damping: 1, response: 0.3, onDone: close });
      } else {
        animateTo(x, 0, { vy, damping: 1, response: 0.35 });
      }
      return;
    }
    const projected = x + project(vx);
    let target = Math.round(-dir * projected / W);
    if (Math.abs(vx) > 300) target = index - Math.sign(vx) * dir; // velocity sign decides
    goTo(target, vx, 0.8);
  }
  track.addEventListener('pointerup', endPointer);
  track.addEventListener('pointercancel', endPointer);

  // ---- wiring ----
  tiles.forEach((t, i) => t.addEventListener('click', () => open(i, t)));
  closeBtn.addEventListener('click', close);
  box.addEventListener('click', e => { if (e.target === box || e.target === track) close(); });
  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') goTo(index + 1, 0, 1);   // RTL: left = next
    if (e.key === 'ArrowRight') goTo(index - 1, 0, 1);
  });
  addEventListener('resize', () => {
    if (box.hidden) return;
    W = innerWidth; H = innerHeight;
    [...track.children].forEach((s, i) => s.style.transform = `translate3d(${dir * i * W}px,0,0)`);
    spring = null; cancelAnimationFrame(raf);
    x = targetX(index); y = 0; render();
  });
})();
```

- [ ] **Step 2: Verify behaviour (Review Focus 1–4)**

Reload. Check each:
- Click tile → lightbox fades in, counter shows "1 / 10". Console: no errors.
- Keyboard: Tab to a tile, Enter → opens; Escape → closes and focus is back on that tile.
- Drag horizontally with mouse → image follows 1:1; release with flick → springs to next image, slight overshoot.
- Drag left past last image → resistance increases, springs back on release.
- Drag down > 30% of height → fades and closes. Drag down a little → springs back.
- Move < 10px and release → nothing happens (no flicker).
- Resize window while open → current image re-centers, no horizontal scrollbar.
- Emulate `prefers-reduced-motion` → open/close instant, swipes jump without animating.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: add lightbox with spring swipe, drag-to-dismiss and keyboard support"
```

---

### Task 4: README + deploy notes

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

```markdown
# Kerem Gavriel — Tattoo site

Static one-page site. Hebrew, RTL.

## Run locally
python3 -m http.server 8080  → http://localhost:8080

## Replace images
Drop new files in `img/` and update `src`/`alt` in `index.html`. Keep roughly 4:5 or 1:1 ratio.

## Deploy
Upload `index.html`, `style.css`, `main.js`, `img/` to any static host (Netlify drop, GitHub Pages, Cloudflare Pages).
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with run, replace-images and deploy notes"
```
