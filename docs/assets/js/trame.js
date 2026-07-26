/* ============================================================
   Trameur — TRAME
   Shared engine: ordered dithering (Bayer 8x8), the live hero
   raster, theme, scroll watching and the [D] easter egg.

   Everything here is hand-rolled: no libraries, no build step.
   ============================================================ */
window.TRAME = (function () {
  "use strict";

  /* -- Bayer 8x8 ordered-dither matrix ----------------------------- */
  var BAYER = [
    0, 32, 8, 40, 2, 34, 10, 42,
    48, 16, 56, 24, 50, 18, 58, 26,
    12, 44, 4, 36, 14, 46, 6, 38,
    60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25,
    15, 47, 7, 39, 13, 45, 5, 37,
    63, 31, 55, 23, 61, 29, 53, 21,
  ];
  /* normalised to (-0.5 .. 0.5) */
  var BAYER_N = BAYER.map(function (v) { return (v + 0.5) / 64 - 0.5; });

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia && window.matchMedia("(hover: none)").matches;

  /* -- colour helpers ---------------------------------------------- */
  function hex2rgb(h) {
    h = String(h).trim().replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t),
    ];
  }
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  /* Palette of the moment, re-read whenever the theme flips. */
  var PAL = {
    ink: [11, 11, 12], paper: [234, 230, 220],
    dark: true, bg: [11, 11, 12], fg: [234, 230, 220],
  };
  function readPalette() {
    PAL.ink = hex2rgb(cssVar("--ink", "#0b0b0c"));
    PAL.paper = hex2rgb(cssVar("--paper", "#eae6dc"));
    PAL.dark = document.documentElement.getAttribute("data-theme") !== "paper";
    PAL.bg = PAL.dark ? PAL.ink : PAL.paper;
    PAL.fg = PAL.dark ? PAL.paper : PAL.ink;
  }

  /* A 4-step duotone ramp, always ordered shadow -> highlight.
     On paper it has to be rebuilt rather than reversed, or every dark
     screenshot dissolves into the page. */
  function ramp(tone) {
    var t = hex2rgb(tone);
    if (PAL.dark) return [PAL.ink, mix(PAL.ink, t, 0.45), t, mix(t, PAL.paper, 0.55)];
    return [mix(PAL.ink, t, 0.55), t, mix(t, PAL.paper, 0.5), PAL.paper];
  }

  /* -- the actual tramage ------------------------------------------ */
  /* Quantises luminance to `levels` steps, dithered with the Bayer
     matrix, then maps each step onto a duotone ramp.                */
  function ditherPixels(get, w, h, colors) {
    var out = new Uint8ClampedArray(w * h * 4);
    var n = colors.length - 1;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var l = get(x, y);                                  /* 0..1 luma */
        var q = Math.round(l * n + BAYER_N[(y & 7) * 8 + (x & 7)] * 1.05);
        if (q < 0) q = 0; else if (q > n) q = n;
        var c = colors[q], i = (y * w + x) * 4;
        out[i] = c[0]; out[i + 1] = c[1]; out[i + 2] = c[2];
        out[i + 3] = c[3] === undefined ? 255 : c[3];
      }
    }
    return new ImageData(out, w, h);
  }

  /* -- image -> dithered canvas ------------------------------------ */
  var scratch = document.createElement("canvas");
  var sctx = scratch.getContext("2d", { willReadFrequently: true });

  function ditherImage(img, cols, rows, tone, boost) {
    scratch.width = cols; scratch.height = rows;
    sctx.clearRect(0, 0, cols, rows);

    /* cover-crop the source into the low-res buffer */
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    if (!iw || !ih) return null;
    var s = Math.max(cols / iw, rows / ih);
    var dw = iw * s, dh = ih * s;
    sctx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);

    var src;
    try { src = sctx.getImageData(0, 0, cols, rows).data; }
    catch (e) { return null; }                              /* tainted canvas */

    var k = boost === undefined ? 1.12 : boost;
    var colors = ramp(tone);
    return ditherPixels(function (x, y) {
      var i = (y * cols + x) * 4;
      var l = (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114) / 255;
      l = (l - 0.5) * k + 0.5;                              /* a little contrast */
      return l < 0 ? 0 : l > 1 ? 1 : l;
    }, cols, rows, colors);
  }

  /* -- procedural weave (for projects with no screenshot) ----------
     Two line gratings crossed at a small angle: a moiré, which is
     what happens when you superimpose two trames. Seeded by slug, so
     every project gets its own — and always the same one.          */
  function weavePixels(cols, rows, tone, slug) {
    var seed = 0;
    for (var i = 0; i < slug.length; i++) seed = (seed * 31 + slug.charCodeAt(i)) % 9973;

    var a = (seed % 90) * Math.PI / 180;
    var b = a + (14 + (seed % 31)) * Math.PI / 180;
    var f1 = 0.30 + (seed % 13) / 42;
    var f2 = f1 * (1 + ((seed >> 3) % 11) / 55);
    var ph = (seed % 628) / 100;
    var ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    var cx = cols / 2, cy = rows / 2, rmax = Math.sqrt(cx * cx + cy * cy);
    var colors = ramp(tone);

    return ditherPixels(function (x, y) {
      var u = x * ca + y * sa, w = x * cb + y * sb;
      var v = 0.5 + 0.30 * Math.sin(u * f1 + ph) + 0.30 * Math.sin(w * f2 - ph)
                  + 0.12 * Math.sin((x + y) * 0.018 + ph * 2);
      var dx = (x - cx) / rmax, dy = (y - cy) / rmax;
      v *= 1 - 0.5 * (dx * dx + dy * dy) * 2;               /* soft vignette */
      return v < 0 ? 0 : v > 1 ? 1 : v;
    }, cols, rows, colors);
  }

  /* Paints a <canvas> that sits on top of a cover.
     The canvas keeps being repainted when its box changes, so the
     dither cells stay square whatever the layout does. */
  var coverRO = "ResizeObserver" in window
    ? new ResizeObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.target.__opts) doPaintCover(en.target, en.target.__opts);
        });
      })
    : null;

  function paintCover(canvas, opts) {
    canvas.__opts = opts;
    if (coverRO && !canvas.__observed) { canvas.__observed = 1; coverRO.observe(canvas); }
    doPaintCover(canvas, opts);
  }

  function doPaintCover(canvas, opts) {
    var cols = opts.cols || 132;
    var box = canvas.getBoundingClientRect();
    var ratio = box.width > 8 && box.height > 8 ? box.height / box.width : (opts.ratio || 0.62);
    var rows = Math.max(8, Math.round(cols * ratio));
    var data = null;

    if (opts.img && opts.img.complete && opts.img.naturalWidth) {
      data = ditherImage(opts.img, cols, rows, opts.tone, opts.boost);
    }
    if (!data) data = weavePixels(cols, rows, opts.tone, opts.slug || "trame");

    canvas.width = cols; canvas.height = rows;
    canvas.getContext("2d").putImageData(data, 0, 0);
    canvas.dataset.painted = "1";
  }

  /* Portraits: square, higher resolution, straight duotone. */
  function paintPortrait(canvas, img, tone, cols) {
    cols = cols || 116;
    tone = tone || cssVar("--accent", "#c8ff2e");
    var data = null;
    if (img.complete && img.naturalWidth) data = ditherImage(img, cols, cols, tone, 1.25);
    if (!data) data = weavePixels(cols, cols, tone, "trameur");
    canvas.width = cols; canvas.height = cols;
    canvas.getContext("2d").putImageData(data, 0, 0);
  }

  /* -- the live hero raster ---------------------------------------- */
  /* A cheap interference field, tramé at ~200 cells wide, repainted
     at 24fps. It is the same idea as Tramacid, minus the audio.     */
  function heroRaster(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var cols = 0, rows = 0, buf = null;
    var mx = 0.5, my = 0.35, tmx = 0.5, tmy = 0.35;
    var t = 0, last = 0, running = true;

    /* sine LUT — 1024 entries is plenty at this resolution */
    var LUT = new Float32Array(1024);
    for (var i = 0; i < 1024; i++) LUT[i] = Math.sin((i / 1024) * Math.PI * 2);
    function sin(v) { return LUT[((v * 162.97) | 0) & 1023]; }

    function resize() {
      var r = canvas.getBoundingClientRect();
      if (!r.width) return;
      cols = Math.max(60, Math.min(240, Math.round(r.width / 7)));
      rows = Math.max(30, Math.round(cols * (r.height / r.width)));
      canvas.width = cols; canvas.height = rows;
      buf = ctx.createImageData(cols, rows);
      draw(true);
    }

    function draw(force) {
      if (!buf) return;
      var d = buf.data;
      var c1 = mix(PAL.bg, PAL.fg, 0.16);
      var c2 = mix(PAL.bg, PAL.fg, 0.34);
      var acc = hex2rgb(cssVar("--accent", "#c8ff2e"));
      var c3 = mix(PAL.bg, acc, PAL.dark ? 0.62 : 0.85);
      var lut = [null, c1, c2, c3];
      var cx = mx * cols, cy = my * rows;

      /* two line gratings, slowly rotating against each other: a live
         moiré. Superimposing two trames is the whole idea. */
      var a = t * 0.045;
      var b = a + 0.34 + 0.18 * sin(t * 0.21);
      var ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
      var f1 = 0.40, f2 = 0.43;

      for (var y = 0; y < rows; y++) {
        var fy = y / rows;
        for (var x = 0; x < cols; x++) {
          var dx = x - cx, dy = (y - cy) * 1.6;
          var d2 = (dx * dx + dy * dy) / (cols * cols);
          var v =
            sin((dx * ca + dy * sa) * f1) * 0.30 +
            sin((dx * cb + dy * sb) * f2) * 0.30 +
            sin(Math.sqrt(d2) * 22 - t * 1.8) * 0.34 / (1 + d2 * 26);

          /* fade out towards the bottom, and stay sparse: the type
             has to breathe on top of this */
          v = (v + 0.5) * (1 - fy * 0.5) * 1.24 - 0.30;

          var q = Math.round(v * 3 + BAYER_N[(y & 7) * 8 + (x & 7)] * 1.1);
          if (q < 0) q = 0; else if (q > 3) q = 3;
          var i = (y * cols + x) * 4, col = lut[q];
          if (!col) { d[i + 3] = 0; continue; }
          d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
        }
      }
      ctx.putImageData(buf, 0, 0);
    }

    function frame(now) {
      if (!running) return;
      requestAnimationFrame(frame);
      if (now - last < 41) return;                          /* ~24fps, on purpose */
      last = now;
      mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      t += 0.055;
      draw();
    }

    /* the canvas is often still 0-wide when DOMContentLoaded fires
       (render-blocking webfonts), so observe it rather than the window */
    if ("ResizeObserver" in window) new ResizeObserver(debounce(resize, 100)).observe(canvas);
    else window.addEventListener("resize", debounce(resize, 180));
    window.addEventListener("load", resize);
    if (!coarse) {
      window.addEventListener("mousemove", function (e) {
        var r = canvas.getBoundingClientRect();
        tmx = (e.clientX - r.left) / r.width;
        tmy = (e.clientY - r.top) / r.height;
      }, { passive: true });
    }
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden && !reduced;
      if (running) requestAnimationFrame(frame);
    });
    document.addEventListener("trame:theme", function () { draw(true); });

    resize();
    if (reduced) { running = false; t = 1.7; draw(true); }
    else requestAnimationFrame(frame);
  }

  function debounce(fn, ms) {
    var id;
    return function () { clearTimeout(id); id = setTimeout(fn, ms); };
  }

  /* -- theme -------------------------------------------------------- */
  function setupTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    var stored = null;
    try { stored = localStorage.getItem("trame-theme"); } catch (e) {}
    if (stored) root.setAttribute("data-theme", stored);
    readPalette();

    function label() {
      if (!btn) return;
      btn.textContent = root.getAttribute("data-theme") === "paper" ? "PAPIER" : "CHAMBRE NOIRE";
    }
    label();
    if (btn) btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "paper" ? "dark" : "paper";
      root.classList.add("no-transition");
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("trame-theme", next); } catch (e) {}
      readPalette();
      label();
      document.dispatchEvent(new CustomEvent("trame:theme"));
      void root.offsetWidth;                                /* flush the new values */
      setTimeout(function () { root.classList.remove("no-transition"); }, 60);
    });
  }

  /* -- scroll watcher ------------------------------------------------ */
  /* Plain geometry rather than IntersectionObserver: IO gets throttled
     to nothing in occluded / prerendered tabs, and a portfolio that
     stays blank in those cases is not a portfolio. */
  function watch(fn) {
    var last = 0, timer = null;
    /* time-based, not rAF-based: rAF is suspended whenever the page
       isn't being painted, and this decides whether content shows */
    function run() { last = Date.now(); fn(detach); }
    function tick() {
      if (timer) return;
      var wait = 90 - (Date.now() - last);
      if (wait <= 0) run();
      else timer = setTimeout(function () { timer = null; run(); }, wait);
    }
    function detach() {
      clearTimeout(timer);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      window.removeEventListener("load", tick);
    }
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    window.addEventListener("load", tick);
    tick();
    return tick;
  }

  /* -- [D] : tramer toute la page ----------------------------------- */
  function setupEasterEgg() {
    var on = false, toast;
    function flash(msg) {
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(flash.id);
      flash.id = setTimeout(function () { toast.classList.remove("show"); }, 1600);
    }
    document.addEventListener("keydown", function (e) {
      if (e.key !== "d" && e.key !== "D") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
      on = !on;
      document.documentElement.classList.toggle("tramage", on);
      flash(on ? "TRAMAGE — ON" : "TRAMAGE — OFF");
    });
  }

  return {
    reduced: reduced,
    coarse: coarse,
    readPalette: readPalette,
    watch: watch,
    paintCover: paintCover,
    paintPortrait: paintPortrait,
    heroRaster: heroRaster,
    setupTheme: setupTheme,
    setupEasterEgg: setupEasterEgg,
    hex2rgb: hex2rgb,
  };
})();
