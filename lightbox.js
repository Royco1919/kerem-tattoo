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

  // LTR: index 0 is at x=0; next slide sits at +W (to the right).
  const dir = 1;

  let index = 0, lastTile = null, W = innerWidth, H = innerHeight;
  let x = 0, y = 0;            // presentation values (px)
  let raf = 0;
  let spring = null;           // {toX,toY,vx,vy,damping,response,t,onDone}

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
    document.querySelectorAll('header, main, footer').forEach(el => el.inert = true);
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
      document.querySelectorAll('header, main, footer').forEach(el => el.inert = false);
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
  let dragged = false;    // suppress the click that follows a drag
  let dismissing = false; // a dismiss spring was in flight when the pointer went down
  const THRESH = 10;

  track.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    dragged = false;
    const inflight = spring;                    // remember what we interrupted
    cancelAnimationFrame(raf); spring = null;   // interruptible: grab mid-flight
    dismissing = !!(inflight && inflight.onDone);
    ptr = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: x, oy: y, axis: null, hist: [[performance.now(), e.clientX, e.clientY]] };
  });
  track.addEventListener('pointermove', e => {
    if (!ptr || e.pointerId !== ptr.id) return;
    const dx = e.clientX - ptr.sx, dy = e.clientY - ptr.sy;
    if (!ptr.axis) {
      if (Math.hypot(dx, dy) < THRESH) return;
      ptr.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      track.setPointerCapture(e.pointerId);     // capture only once a drag is committed
    }
    ptr.hist.push([performance.now(), e.clientX, e.clientY]);
    if (ptr.hist.length > 10) ptr.hist.shift();
    if (ptr.axis === 'x') {
      let nx = ptr.ox + dx;
      const a = targetX(0), b = targetX(items.length - 1);
      const min = Math.min(a, b), max = Math.max(a, b);
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
    if (!p.axis) {                                // tap, not drag: resume whatever was in flight
      if (dismissing) { dismissing = false; close(); return; }
      if (x !== targetX(index) || y !== 0) { dragged = true; animateTo(targetX(index), 0, { damping: 1 }); }
      return;
    }
    dismissing = false;
    dragged = true;
    p.hist.push([performance.now(), e.clientX, e.clientY]);
    const [t1, x1, y1] = p.hist[p.hist.length - 1];
    const recent = p.hist.filter(h => t1 - h[0] <= 100);
    let vx = 0, vy = 0;
    if (recent.length >= 2) {
      const [t0, x0, y0] = recent[0];
      const dt = Math.max(1, t1 - t0);
      vx = (x1 - x0) / dt * 1000; vy = (y1 - y0) / dt * 1000;
    }
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
  box.addEventListener('click', e => {
    if (dragged) { dragged = false; return; }
    if (e.target === box || e.target === track || e.target.classList.contains('lightbox__slide')) close();
  });
  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') goTo(index + 1, 0, 1);
    if (e.key === 'ArrowLeft') goTo(index - 1, 0, 1);
  });
  addEventListener('resize', () => {
    if (box.hidden) return;
    W = innerWidth; H = innerHeight;
    [...track.children].forEach((s, i) => s.style.transform = `translate3d(${dir * i * W}px,0,0)`);
    spring = null; cancelAnimationFrame(raf);
    x = targetX(index); y = 0; render();
  });
})();
