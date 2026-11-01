/* Motor da apresentação: slides, etapas internas, controles, fundo Dot Grid,
   Decrypted Text e Spotlight. Sem dependências externas. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const slides = $$('.slide');
  const N = slides.length;
  const maxOf = (i) => Number(slides[i].dataset.max || 0);
  const S = { i: -1, step: 0, paused: false, run: 0, seen: new Set() };
  const hooks = {};
  const num = (v) => (v === undefined ? null : Number(v));

  /* ---------- helpers para demonstrações assíncronas ---------- */
  // Espera `ms` respeitando a pausa; devolve false se a etapa mudou (aborta a demo).
  function sleep(ms, run) {
    return new Promise((res) => {
      let left = ms, last = performance.now();
      (function tick() {
        if (run !== S.run) return res(false);
        const now = performance.now();
        if (!S.paused) left -= now - last;
        last = now;
        left <= 0 ? res(true) : setTimeout(tick, 30);
      })();
    });
  }

  /* ---------- reveal por etapa ---------- */
  const revealEls = slides.map((s) => $$('[data-from],[data-at],[data-until],[data-lit-at],[data-lit-from],[data-on-from],[data-dim-at],[data-dim-until],[data-hot-from]', s));
  slides.forEach((s) => $$('[data-from],[data-at],[data-until]', s).forEach((e) => e.classList.add('rv')));

  function applyStep(i, step) {
    revealEls[i].forEach((e) => {
      const d = e.dataset, f = num(d.from), a = num(d.at), u = num(d.until);
      if (f !== null || a !== null || u !== null) {
        const show = (f === null || step >= f) && (a === null || step === a) && (u === null || step <= u);
        e.dataset.show = show ? '1' : '0';
      }
      if (d.litAt !== undefined || d.litFrom !== undefined) {
        const la = num(d.litAt), lf = num(d.litFrom);
        e.dataset.lit = (la !== null && step === la) || (lf !== null && step >= lf) ? '1' : '0';
      }
      if (d.onFrom !== undefined) e.dataset.on = step >= num(d.onFrom) ? '1' : '0';
      if (d.dimAt !== undefined || d.dimUntil !== undefined) {
        const da = num(d.dimAt), du = num(d.dimUntil);
        e.dataset.dim = (da !== null && step === da) || (du !== null && step <= du) ? '1' : '0';
      }
      if (d.hotFrom !== undefined) e.classList.toggle('hot', step >= num(d.hotFrom));
    });
    slides[i].dataset.step = step;
  }

  /* ---------- navegação ---------- */
  const dotsEl = $('#dots'), pipsEl = $('#pips'), snav = $('#snav'), where = $('#where'), live = $('#live');
  slides.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'dot'; b.textContent = String(i + 1).padStart(2, '0');
    b.setAttribute('aria-label', `Slide ${i + 1}: ${s.dataset.title}`);
    b.addEventListener('click', () => { go(i, 0); b.blur(); });
    dotsEl.appendChild(b);
  });

  function go(i, step) {
    i = Math.max(0, Math.min(N - 1, i));
    step = Math.max(0, Math.min(maxOf(i), step));
    const prevI = S.i, prevStep = S.step, changed = i !== prevI;
    S.run++;
    if (changed) {
      if (prevI >= 0) slides[prevI].classList.remove('is-active');
      slides[i].classList.add('is-active');
      S.seen.add(i);
    }
    S.i = i; S.step = step;
    applyStep(i, step);
    renderChrome();
    if (changed) $$('[data-decrypt]', slides[i]).forEach(decrypt);
    const info = { slideChanged: changed, prevStep, run: S.run, animate: (changed && step === 0) || (!changed && step === prevStep + 1) };
    const h = hooks[i + 1];
    if (h) h(step, info);
    try { history.replaceState(null, '', `#${i + 1}${step ? '.' + step : ''}`); } catch (e) { /* file:// */ }
  }
  const next = () => (S.step < maxOf(S.i) ? go(S.i, S.step + 1) : S.i < N - 1 && go(S.i + 1, 0));
  const prev = () => (S.step > 0 ? go(S.i, S.step - 1) : S.i > 0 && go(S.i - 1, maxOf(S.i - 1)));

  function renderChrome() {
    const m = maxOf(S.i);
    $$('.dot', dotsEl).forEach((d, k) => {
      d.setAttribute('aria-current', k === S.i ? 'true' : 'false');
      d.classList.toggle('seen', S.seen.has(k) && k !== S.i);
    });
    $('#gPrev').disabled = S.i === 0; $('#gNext').disabled = S.i === N - 1;
    snav.hidden = m === 0;
    pipsEl.innerHTML = '';
    for (let k = 0; k <= m; k++) {
      const p = document.createElement('i');
      p.className = 'pip' + (k <= S.step ? ' on' : '') + (k === S.step ? ' cur' : '');
      pipsEl.appendChild(p);
    }
    $('#sPrev').disabled = S.step === 0 && S.i === 0;
    $('#sNext').disabled = S.step === m && S.i === N - 1;
    const t = slides[S.i].dataset.title;
    where.innerHTML = `<b>${String(S.i + 1).padStart(2, '0')}</b> / ${N} · ${t}` + (m ? ` · etapa ${S.step + 1}/${m + 1}` : '');
    live.textContent = `Slide ${S.i + 1} de ${N}, ${t}` + (m ? `, etapa ${S.step + 1} de ${m + 1}` : '');
  }

  $('#gPrev').addEventListener('click', (e) => { go(S.i - 1, 0); e.currentTarget.blur(); });
  $('#gNext').addEventListener('click', (e) => { go(S.i + 1, 0); e.currentTarget.blur(); });
  $('#sPrev').addEventListener('click', (e) => { prev(); e.currentTarget.blur(); });
  $('#sNext').addEventListener('click', (e) => { next(); e.currentTarget.blur(); });
  $('#sReset').addEventListener('click', (e) => { go(S.i, 0); e.currentTarget.blur(); });
  $('#bPause').addEventListener('click', (e) => { togglePause(); e.currentTarget.blur(); });
  $('#bFull').addEventListener('click', (e) => { fullscreen(); e.currentTarget.blur(); });

  document.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-pick]');
    if (pick) { go(S.i, Number(pick.dataset.pick)); if (e.detail) pick.blur(); return; }
    const act = e.target.closest('[data-act="next"]');
    if (act) { next(); if (e.detail) act.blur(); return; }
    const t = e.target;
    if (t.classList && (t.classList.contains('slide') || t.classList.contains('wrap'))) next(); // clique no fundo avança
  });

  function togglePause() { S.paused = !S.paused; document.body.classList.toggle('paused', S.paused); if (!S.paused) bgKick(); }
  function fullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {});
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const k = e.key;
    if (k === ' ' && e.target.closest && e.target.closest('button,a')) e.preventDefault();
    const fwd = ['ArrowRight', 'ArrowDown', ' ', 'PageDown'];
    const back = ['ArrowLeft', 'ArrowUp', 'PageUp'];
    if (fwd.includes(k)) { e.preventDefault(); e.shiftKey ? go(S.i + 1, 0) : next(); }
    else if (back.includes(k)) { e.preventDefault(); e.shiftKey ? go(S.i - 1, 0) : prev(); }
    else if (k === 'Home') go(0, 0);
    else if (k === 'End') go(N - 1, 0);
    else if (k === 'r' || k === 'R') go(S.i, 0);
    else if (k === 'p' || k === 'P') togglePause();
    else if (k === 'f' || k === 'F') fullscreen();
  });
  document.addEventListener('keyup', (e) => { if (e.key === ' ' && e.target.closest && e.target.closest('button,a')) e.preventDefault(); });

  /* ---------- Decrypted Text (títulos técnicos, uso pontual) ---------- */
  const GLYPHS = '01{}[]<>/_#$%&*+=?';
  function decrypt(el) {
    if (!el.dataset.orig) el.dataset.orig = el.textContent;
    const txt = el.dataset.orig;
    el.textContent = txt;
    if (reduce.matches) return;
    const id = (el._d = (el._d || 0) + 1);
    let f = 0;
    (function tick() {
      if (el._d !== id) return;
      if (!S.paused) f++;
      const shown = Math.floor(f / 1.6);
      let out = '';
      for (let k = 0; k < txt.length; k++) out += k < shown || txt[k] === ' ' ? txt[k] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = out;
      if (shown < txt.length) setTimeout(tick, 28); else el.textContent = txt;
    })();
  }

  /* ---------- Spotlight Card ---------- */
  document.addEventListener('pointermove', (e) => {
    const c = e.target.closest && e.target.closest('.spot');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
  }, { passive: true });

  /* ---------- Dot Grid (fundo ambiente, Categoria C) ---------- */
  const cv = $('#bg'), cx = cv.getContext('2d');
  const GAP = 34, R = 150;
  let W = 0, H = 0, dpr = 1, dots = [], mouse = { x: -999, y: -999, tx: -999, ty: -999 }, raf = 0;
  function bgResize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    for (let y = GAP / 2; y < H; y += GAP) for (let x = GAP / 2; x < W; x += GAP) dots.push(x, y);
    bgDraw();
  }
  function bgDraw() {
    cx.clearRect(0, 0, W, H);
    cx.fillStyle = 'rgba(212,175,55,0.15)';
    cx.beginPath();
    const near = [];
    for (let k = 0; k < dots.length; k += 2) {
      const x = dots[k], y = dots[k + 1], dx = x - mouse.x, dy = y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < R * R) near.push(x, y, Math.sqrt(d2), dx, dy);
      else { cx.moveTo(x + 1.1, y); cx.arc(x, y, 1.1, 0, 6.2832); }
    }
    cx.fill();
    for (let k = 0; k < near.length; k += 5) {
      const t = 1 - near[k + 2] / R, push = t * t * 9, d = near[k + 2] || 1;
      const px = near[k] + (near[k + 3] / d) * push, py = near[k + 1] + (near[k + 4] / d) * push;
      cx.fillStyle = `rgba(241,217,138,${0.18 + t * 0.7})`;
      cx.beginPath(); cx.arc(px, py, 1.1 + t * 1.9, 0, 6.2832); cx.fill();
    }
  }
  function bgLoop() {
    raf = 0;
    if (S.paused || document.hidden) return;
    mouse.x += (mouse.tx - mouse.x) * 0.16; mouse.y += (mouse.ty - mouse.y) * 0.16;
    bgDraw();
    if (Math.abs(mouse.tx - mouse.x) + Math.abs(mouse.ty - mouse.y) > 0.5) raf = requestAnimationFrame(bgLoop);
  }
  function bgKick() { if (!raf && !reduce.matches) raf = requestAnimationFrame(bgLoop); }
  addEventListener('pointermove', (e) => {
    if (mouse.x < -900) { mouse.x = e.clientX; mouse.y = e.clientY; }
    mouse.tx = e.clientX; mouse.ty = e.clientY; bgKick();
  }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.tx = -999; mouse.ty = -999; bgKick(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) bgKick(); });
  addEventListener('resize', bgResize);
  bgResize();

  /* ---------- exports e início ---------- */
  window.LK = { on: (n, fn) => { hooks[n] = fn; }, sleep, S, go, next, prev, reduce, decrypt, start };
  function start() {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(location.hash);
    go(m ? Number(m[1]) - 1 : 0, m && m[2] ? Number(m[2]) : 0);
  }
  addEventListener('hashchange', () => {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(location.hash);
    if (m && (Number(m[1]) - 1 !== S.i || Number(m[2] || 0) !== S.step)) go(Number(m[1]) - 1, Number(m[2] || 0));
  });
})();
