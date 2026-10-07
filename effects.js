(() => {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Hero: split letters, stagger in ----
  const hero = document.querySelector('.hero');
  document.querySelectorAll('[data-split]').forEach((line, li) => {
    const text = line.textContent;
    line.textContent = '';
    [...text].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = c;
      s.style.setProperty('--d', String(li * 220 + i * 45));
      line.appendChild(s);
    });
  });
  // Double rAF gives the browser one painted frame with the letters at opacity 0 so the
  // transition runs; the timer is the fallback for throttled/background tabs where rAF never fires.
  const heroIn = () => hero && hero.classList.add('is-in');
  requestAnimationFrame(() => requestAnimationFrame(heroIn));
  setTimeout(heroIn, 150);

  // ---- Statement: split words ----
  const st = document.querySelector('[data-words]');
  if (st) {
    const words = st.textContent.trim().split(/\s+/);
    st.textContent = '';
    words.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'w'; s.textContent = w;
      s.style.setProperty('--d', String(i * 40));
      st.appendChild(s); st.appendChild(document.createTextNode(' '));
    });
  }

  // ---- Reveal on scroll ----
  const targets = [...document.querySelectorAll('.reveal, [data-words], [data-rule]')];
  if (RM || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    targets.forEach(el => io.observe(el));
  }

  // ---- Nav: hide on scroll down, show on up ----
  const nav = document.getElementById('nav');
  const box = document.getElementById('lightbox');
  let lastY = scrollY, ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY, dy = y - lastY;
      if (!(box && !box.hidden)) {
        if (y < 80 || dy < -4) nav.classList.remove('is-hidden');
        else if (dy > 6 && y > 120) nav.classList.add('is-hidden');
      }
      lastY = y; ticking = false;
    });
  }, { passive: true });

  // ---- Hero parallax (desktop, pointer-fine, not RM) ----
  const par = document.querySelector('[data-parallax]');
  if (par && !RM && matchMedia('(hover: hover) and (min-width: 900px)').matches) {
    let pt = false;
    addEventListener('scroll', () => {
      if (pt) return; pt = true;
      requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight);
        par.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
        pt = false;
      });
    }, { passive: true });
  }

  // ---- Filters ----
  const chips = [...document.querySelectorAll('.chip')];
  const tiles = [...document.querySelectorAll('.tile')];
  chips.forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach(c => { const on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
    tiles.forEach(t => {
      const show = f === 'all' || t.dataset.cat === f;
      if (show) {
        t.classList.remove('is-gone');
        t.classList.add('is-shown');
        requestAnimationFrame(() => requestAnimationFrame(() => t.classList.remove('is-out')));
      } else {
        t.classList.add('is-out');
        const done = () => { if (t.classList.contains('is-out')) t.classList.add('is-gone'); };
        RM ? done() : setTimeout(done, 360);
      }
    });
  }));

  // ---- The Loupe ----
  const loupe = document.getElementById('loupe');
  if (loupe) {
    const img = loupe.querySelector('.loupe__img');
    const lens = loupe.querySelector('.loupe__lens');
    const zoom = parseFloat(loupe.dataset.zoom) || 2.5;
    lens.style.setProperty('--src', `url("${img.getAttribute('src')}")`);
    if (RM || !matchMedia('(pointer: fine), (pointer: coarse)').matches) {
      loupe.classList.add('loupe--static');
    } else {
      let rect = null, size = 170, active = false;
      const measure = () => { rect = loupe.getBoundingClientRect(); size = lens.offsetWidth || 170; lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`; };
      const move = (cx, cy) => {
        if (!rect) measure();
        const x = Math.max(0, Math.min(rect.width, cx - rect.left));
        const y = Math.max(0, Math.min(rect.height, cy - rect.top));
        lens.style.left = x + 'px'; lens.style.top = y + 'px';
        lens.style.backgroundPosition = `${-(x * zoom - size / 2)}px ${-(y * zoom - size / 2)}px`;
      };
      const on = () => { if (!active) { active = true; measure(); loupe.classList.add('is-active'); } };
      const off = () => { active = false; loupe.classList.remove('is-active'); };
      let hold = 0;
      loupe.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { on(); move(e.clientX, e.clientY); } });
      loupe.addEventListener('pointerdown', e => {
        rect = null;
        if (e.pointerType === 'mouse') { on(); move(e.clientX, e.clientY); return; }
        // touch: long-press (250ms) activates; a quick flick keeps scrolling the page
        clearTimeout(hold);
        hold = setTimeout(() => { on(); move(e.clientX, e.clientY); try { loupe.setPointerCapture(e.pointerId); } catch (_) {} }, 250);
      });
      loupe.addEventListener('pointermove', e => {
        if (!active) { if (e.pointerType !== 'mouse') clearTimeout(hold); return; }
        if (e.pointerType !== 'mouse' && rect && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) { off(); return; }
        move(e.clientX, e.clientY);
      });
      loupe.addEventListener('pointerup', e => { clearTimeout(hold); if (e.pointerType !== 'mouse') off(); });
      loupe.addEventListener('pointercancel', () => { clearTimeout(hold); off(); });
      loupe.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') off(); });
      addEventListener('resize', () => { rect = null; });
      addEventListener('scroll', () => { rect = null; }, { passive: true });
    }
  }
})();
