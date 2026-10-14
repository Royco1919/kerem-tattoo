(() => {
  'use strict';
  // ?static=1 settles every reveal instantly (used for screenshot capture); loupe behaviour is unchanged
  const Q = new URLSearchParams(location.search);
  const STATIC = Q.has('static');
  if (STATIC) { document.documentElement.classList.add('static'); document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; i.decoding = 'sync'; i.src = i.src; }); if (Q.has('y')) addEventListener('load', () => scrollTo(0, parseInt(Q.get('y'), 10) || 0)); }
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Settle: mark what reveals, then observe ----
  const settlers = [
    ...document.querySelectorAll('.hero__name, .hero__rule, .hero__place, .stone--hero, .hero__foot, .hero__hint, .statement__text, .stones .stone, .steps .step, .about .stone, .about__text, .book > *')
  ];
  settlers.forEach(el => el.classList.add('settle'));
  // hero: one orchestrated entrance
  ['.hero__name', '.hero__rule', '.hero__place', '.stone--hero', '.hero__foot', '.hero__hint'].forEach((sel, i) => {
    const el = document.querySelector(sel); if (el) el.style.setProperty('--i', String(i * 1.4));
  });
  document.querySelectorAll('.steps .step').forEach((el, i) => el.style.setProperty('--i', String(i)));
  document.querySelectorAll('.book > *').forEach((el, i) => el.style.setProperty('--i', String(i)));

  const show = el => el.classList.add('is-in');
  if (RM || STATIC || !('IntersectionObserver' in window)) {
    settlers.forEach(show);
  } else {
    const heroEls = settlers.filter(el => el.closest('.hero'));
    const rest = settlers.filter(el => !el.closest('.hero'));
    const heroIn = () => heroEls.forEach(show);
    requestAnimationFrame(() => requestAnimationFrame(heroIn));
    setTimeout(heroIn, 150);
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rest.forEach(el => io.observe(el));
  }

  // ---- Rail bead + nav ----
  const bead = document.querySelector('.rail__bead');
  const nav = document.getElementById('nav');
  const box = document.getElementById('lightbox');
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY, dy = y - lastY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bead) bead.style.setProperty('--p', `${(max > 0 ? y / max : 0) * (innerHeight - 7)}px`);
      if (!(box && !box.hidden)) {
        nav.classList.toggle('is-solid', y > 24);
        if (y < 80 || dy < -4) nav.classList.remove('is-hidden');
        else if (dy > 6 && y > 160) nav.classList.add('is-hidden');
      }
      lastY = y; ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Hero stone opens the tray's husky in the lightbox ----
  const heroBtn = document.querySelector('[data-open]');
  if (heroBtn) heroBtn.addEventListener('click', () => {
    const i = parseInt(heroBtn.dataset.open, 10);
    const t = document.querySelectorAll('.tile')[i]; if (t) t.click();
  });

  // ---- The loupe, on every stone ----
  document.querySelectorAll('[data-stone]').forEach(stone => {
    const img = stone.querySelector('img');
    const lens = stone.querySelector('.lens');
    const btn = stone.querySelector('.stone__btn');
    if (!img || !lens || !btn) return;
    const zoom = parseFloat(stone.dataset.zoom) || 2.4;
    const src = img.currentSrc || img.src;
    lens.style.setProperty('--src', `url("${src}")`);
    img.addEventListener('load', () => lens.style.setProperty('--src', `url("${img.currentSrc || img.src}")`), { once: true });
    if (RM) return;

    let rect = null, size = 190, active = false, hold = 0, moved = false;
    const measure = () => { rect = img.getBoundingClientRect(); size = lens.offsetWidth || 190; lens.style.setProperty('--bgs', `${rect.width * zoom}px ${rect.height * zoom}px`); };
    const place = (cx, cy) => {
      if (!rect) measure();
      const x = Math.max(0, Math.min(rect.width, cx - rect.left));
      const y = Math.max(0, Math.min(rect.height, cy - rect.top));
      lens.style.left = x + 'px'; lens.style.top = y + 'px';
      lens.style.setProperty('--bgp', `${-(x * zoom - size / 2)}px ${-(y * zoom - size / 2)}px`);
    };
    const on = () => { if (!active) { active = true; measure(); stone.classList.add('is-magnifying'); } };
    const off = () => { active = false; stone.classList.remove('is-magnifying'); };

    // hero: the loupe rests on the eye until the pointer arrives
    if (stone.dataset.rest && FINE) {
      const [rx, ry] = stone.dataset.rest.split(' ').map(parseFloat);
      const rest = () => { measure(); place(rect.left + rect.width * rx / 100, rect.top + rect.height * ry / 100); on(); };
      if (img.complete) setTimeout(rest, 900); else img.addEventListener('load', () => setTimeout(rest, 500), { once: true });
    }

    btn.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { on(); place(e.clientX, e.clientY); } });
    btn.addEventListener('pointerdown', e => {
      rect = null; moved = false;
      if (e.pointerType === 'mouse') { on(); place(e.clientX, e.clientY); return; }
      clearTimeout(hold);
      hold = setTimeout(() => { on(); place(e.clientX, e.clientY); try { btn.setPointerCapture(e.pointerId); } catch (_) {} }, 260);
    });
    btn.addEventListener('pointermove', e => {
      if (!active) { if (e.pointerType !== 'mouse') clearTimeout(hold); return; }
      if (e.pointerType !== 'mouse') {
        moved = true;
        if (rect && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) { off(); return; }
      }
      place(e.clientX, e.clientY);
    });
    btn.addEventListener('pointerup', e => { clearTimeout(hold); if (e.pointerType !== 'mouse') { if (active) { e.preventDefault(); } off(); } });
    btn.addEventListener('pointercancel', () => { clearTimeout(hold); off(); });
    btn.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') off(); });
    // a long-press that magnified must not also open the lightbox
    btn.addEventListener('click', e => { if (moved) { moved = false; e.stopImmediatePropagation(); e.preventDefault(); } }, true);
    addEventListener('resize', () => { rect = null; });
    addEventListener('scroll', () => { rect = null; }, { passive: true });
  });
})();
