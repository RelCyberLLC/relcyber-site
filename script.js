(function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var cap = document.getElementById('capstmt');
  if (cap && window.fetch) {
    fetch(cap.getAttribute('href'), { method: 'HEAD' }).then(function (r) {
      var type = r.headers.get('content-type') || '';
      if (r.ok && type.indexOf('pdf') !== -1) cap.hidden = false;
    }).catch(function () {});
  }

  var canvas = document.getElementById('terrain');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var W = 0, H = 0, dpr = 1, cell = 14, cols = 0, rows = 0, field = null;
  var px = -1, py = -1, peak = 0, targetPeak = 0, visible = true, raf = 0, last = 0;
  var LEVELS = 22;

  function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  var colors = {};
  function readColors() {
    colors.minor = css('--minor-line');
    colors.line = css('--contour-line');
    colors.index = css('--contour-index');
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = W < 600 ? 12 : 14;
    cols = Math.ceil(W / cell) + 1;
    rows = Math.ceil(H / cell) + 1;
    field = new Float32Array(cols * rows);
    readColors();
    draw(last);
  }

  function height(x, y, t) {
    var u = x / W, v = y / H;
    var h = 0.5
      + 0.22 * Math.sin(u * 5.1 + t * 0.00011 + Math.sin(v * 3.2 + t * 0.00007) * 1.4)
      + 0.2 * Math.sin(v * 6.3 - t * 0.00009 + u * 2.1)
      + 0.1 * Math.sin((u + v) * 11 + t * 0.00013);
    if (peak > 0.001) {
      var dx = (x - px) / (W * 0.16), dy = (y - py) / (W * 0.16);
      h += peak * 0.55 * Math.exp(-(dx * dx + dy * dy));
    }
    return h;
  }

  function seg(p, a, b, c, d, x0, y0, lvl) {
    // a=tl b=tr c=br d=bl values; draw segments for the case
    var idx = (a >= lvl ? 8 : 0) | (b >= lvl ? 4 : 0) | (c >= lvl ? 2 : 0) | (d >= lvl ? 1 : 0);
    if (idx === 0 || idx === 15) return;
    var tx = x0 + cell * (lvl - a) / (b - a), ty = y0;
    var rx = x0 + cell, ry = y0 + cell * (lvl - b) / (c - b);
    var bx = x0 + cell * (lvl - d) / (c - d), by = y0 + cell;
    var lx = x0, ly = y0 + cell * (lvl - a) / (d - a);
    function s(x1, y1, x2, y2) { p.moveTo(x1, y1); p.lineTo(x2, y2); }
    switch (idx) {
      case 1: case 14: s(lx, ly, bx, by); break;
      case 2: case 13: s(bx, by, rx, ry); break;
      case 3: case 12: s(lx, ly, rx, ry); break;
      case 4: case 11: s(tx, ty, rx, ry); break;
      case 5: s(tx, ty, lx, ly); s(bx, by, rx, ry); break;
      case 6: case 9: s(tx, ty, bx, by); break;
      case 7: case 8: s(tx, ty, lx, ly); break;
      case 10: s(tx, ty, rx, ry); s(lx, ly, bx, by); break;
    }
  }

  function draw(t) {
    if (!field) return;
    ctx.clearRect(0, 0, W, H);
    var i, j, k;
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) field[j * cols + i] = height(i * cell, j * cell, t);
    ctx.lineJoin = 'round';
    for (k = 1; k < LEVELS; k++) {
      var lvl = 0.12 + k * (0.95 / LEVELS);
      var isIndex = k % 5 === 0;
      var p = new Path2D();
      for (j = 0; j < rows - 1; j++) {
        for (i = 0; i < cols - 1; i++) {
          var a = field[j * cols + i], b = field[j * cols + i + 1],
              c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
          if ((a < lvl && b < lvl && c < lvl && d < lvl) || (a >= lvl && b >= lvl && c >= lvl && d >= lvl)) continue;
          seg(p, a, b, c, d, i * cell, j * cell, lvl);
        }
      }
      ctx.lineWidth = isIndex ? 1.6 : 0.9;
      ctx.strokeStyle = isIndex ? colors.index : (k % 2 ? colors.minor : colors.line);
      ctx.stroke(p);
    }
  }

  function frame(t) {
    raf = 0;
    if (!visible || reduce.matches) return;
    peak += (targetPeak - peak) * 0.08;
    if (t - last > 33) { last = t; draw(t); }
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf && visible && !reduce.matches) raf = requestAnimationFrame(frame); }

  function point(e) {
    var r = canvas.getBoundingClientRect();
    px = e.clientX - r.left; py = e.clientY - r.top; targetPeak = 1;
    start();
  }
  var hero = canvas.parentElement;
  hero.addEventListener('pointermove', point, { passive: true });
  hero.addEventListener('pointerdown', point, { passive: true });
  hero.addEventListener('pointerleave', function () { targetPeak = 0; start(); });
  hero.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') { targetPeak = 0; start(); } });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(hero);
  }
  reduce.addEventListener && reduce.addEventListener('change', function () { draw(0); start(); });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { readColors(); draw(last); });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 120); });
  resize();
  if (reduce.matches) draw(4000);
  start();
})();
