/* ============================================================
   Trameur — home page
   Everything below is rendered from assets/data/projects.js
   ============================================================ */
(function () {
  "use strict";

  var T = window.TRAME;
  var THEMES = window.CATEGORY_THEME || {};
  var PROJECTS = window.PROJECTS || [];
  var SKILLS = window.SKILLS || [];
  var STATS = window.INDEX_STATS || [];
  var META = window.META || {};

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    steam: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-9.96 9.2l5.37 2.22a2.83 2.83 0 0 1 1.6-.5h.13l2.39-3.46v-.05a3.78 3.78 0 1 1 3.78 3.78h-.09l-3.41 2.43v.1a2.84 2.84 0 0 1-5.6.68L2 14.32A10 10 0 1 0 12 2Zm-4.2 15.17.95.4a2.13 2.13 0 1 0 1.18-2.78l1 .42a1.57 1.57 0 1 1-1.18 2.9l-1.95-.94ZM18 8.9a2.52 2.52 0 1 0-2.52 2.52h.01A2.52 2.52 0 0 0 18 8.9Zm-4.4 0a1.9 1.9 0 1 1 1.9 1.9 1.9 1.9 0 0 1-1.9-1.9Z"/></svg>',
    gallery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14"/><circle cx="8.5" cy="9" r="1.5"/><path d="M21 15l-5-5L5 18"/></svg>',
    details: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };
  var LINK_LABEL = { github: "Code", live: "Live", steam: "Steam" };
  var LINK_ORDER = ["live", "steam", "github"];

  /* -- covers: paint, then repaint on theme flip -------------------- */
  var repaint = [];

  function makeCover(p, ratio, cols) {
    var tone = (THEMES[p.category] || {}).tone || "#c8ff2e";
    var box = document.createDocumentFragment();
    var canvas = document.createElement("canvas");
    var img = null;

    if (p.image) {
      img = new Image();
      img.className = "real";
      img.alt = p.name + " — screenshot";
      img.loading = "lazy";
      img.src = p.image;
      box.appendChild(img);
    }
    box.appendChild(canvas);

    function paint() {
      T.paintCover(canvas, { img: img, tone: tone, slug: p.slug, ratio: ratio, cols: cols });
    }
    if (img && !img.complete) img.addEventListener("load", paint, { once: true });
    paint();
    repaint.push(paint);
    return box;
  }

  /* -- project cards -------------------------------------------------- */
  var GALLERIES = {};

  function renderProjects() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    var featSeen = 0;

    PROJECTS.forEach(function (p, i) {
      var th = THEMES[p.category] || {};
      var detailHref = "project.html?slug=" + encodeURIComponent(p.slug);
      var feat = !!p.featured;
      if (feat) featSeen++;

      var links =
        '<a class="lnk primary" href="' + detailHref + '">' + ICONS.details + "<span>Le projet</span></a>";
      LINK_ORDER.forEach(function (key) {
        if (!p.links || !p.links[key]) return;
        links +=
          '<a class="lnk" href="' + esc(p.links[key]) + '" target="_blank" rel="noopener">' +
          (ICONS[key] || "") + "<span>" + LINK_LABEL[key] + "</span></a>";
      });
      if (p.gallery && p.gallery.length) {
        GALLERIES[p.slug] = { title: p.name, shots: p.gallery };
        links += '<button class="lnk gallery-btn" type="button" data-gallery="' + esc(p.slug) + '">' +
          ICONS.gallery + "<span>Images</span></button>";
      }

      var card = el(
        '<article class="card' + (feat ? " featured" : "") + (feat && featSeen % 2 === 0 ? " alt" : "") +
          '" data-cat="' + esc(p.category) + '">' +
          '<a class="cover-link" href="' + detailHref + '" aria-label="' + esc(p.name) + '">' +
            '<span class="idx">' + pad(i + 1) + "</span>" +
            '<span class="cat-tag">' + esc(th.label || p.category) + "</span>" +
            (p.stars ? '<span class="star-tag">★ ' + p.stars + "</span>" : "") +
            '<span class="scan"></span>' +
          "</a>" +
          '<div class="card-body">' +
            "<h3><a href=\"" + detailHref + '">' + esc(p.name) + "</a></h3>" +
            (p.meta ? '<div class="card-meta">' + esc(p.meta) + "</div>" : "") +
            "<p>" + esc(p.description) + "</p>" +
            (p.note ? '<p class="note">' + esc(p.note) + "</p>" : "") +
            '<div class="tech">' + (p.tech || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" +
            '<div class="card-links">' + links + "</div>" +
          "</div>" +
        "</article>"
      );

      var cover = makeCover(p, feat ? 0.6 : 0.5625, feat ? 168 : 140);
      card.querySelector(".cover-link").insertBefore(cover, card.querySelector(".idx"));
      grid.appendChild(card);
    });

    /* no hover on touch: develop the cover when the card crosses the
       middle of the screen instead */
    if (T.coarse) {
      var cards = [].slice.call(grid.querySelectorAll(".card"));
      T.watch(function () {
        var mid = window.innerHeight / 2;
        cards.forEach(function (c) {
          var r = c.getBoundingClientRect();
          c.classList.toggle("resolved", r.top < mid && r.bottom > mid);
        });
      });
    }
  }

  /* -- hero ------------------------------------------------------------ */
  function renderHero() {
    var defs = document.getElementById("defs");
    if (defs && META.defs) {
      META.defs.forEach(function (d, i) {
        defs.appendChild(el(
          '<div class="def"><span class="i">' + pad(i + 1) + '.</span>' +
          '<span class="k">' + esc(d[0]) + "</span>" +
          '<span class="v">' + esc(d[1]) + "</span></div>"
        ));
      });
    }

    var idx = document.getElementById("index-list");
    if (idx) {
      STATS.forEach(function (s) {
        idx.appendChild(el(
          '<div class="index-row"><span>' + esc(s.label) + '</span><span class="dots"></span><b>' +
          esc(s.value) + "</b></div>"
        ));
      });
    }

    var ph = document.getElementById("portrait");
    if (ph && META.avatar) {
      var img = new Image();
      img.className = "real";
      img.alt = META.name;
      img.crossOrigin = "anonymous";
      var canvas = document.createElement("canvas");
      ph.appendChild(img);
      ph.appendChild(canvas);
      function paint() { T.paintPortrait(canvas, img, null, 108); }
      img.addEventListener("load", paint);
      img.addEventListener("error", paint);
      img.src = META.avatar;
      repaint.push(paint);
    }

    T.heroRaster(document.getElementById("raster"));
  }

  /* -- skills ------------------------------------------------------------ */
  function renderSkills() {
    var box = document.getElementById("bench");
    if (!box) return;
    SKILLS.forEach(function (s) {
      box.appendChild(el(
        '<div class="bench-row">' +
          "<div><h3>" + esc(s.group) + '</h3><span class="en">' + esc(s.en || "") + "</span></div>" +
          '<div class="bench-items">' +
            s.items.map(function (i) { return "<span>" + esc(i) + "</span>"; }).join("") +
          "</div>" +
        "</div>"
      ));
    });
  }

  /* -- ticker -------------------------------------------------------------- */
  function renderTicker() {
    var track = document.getElementById("ticker");
    if (!track) return;
    var words = [
      "TRAME", "DITHER", "UNREAL", "C++", "SHADERS", "DJANGO", "VR",
      "TRAMAGE", "UNITY", "TYPESCRIPT", "IMAGE PROCESSING", "PYTHON",
    ];
    /* two identical halves so the -50% loop never shows a gap;
       each half must be at least as wide as the widest viewport */
    var half = (words.join(" ✳ ") + " ✳ ").repeat(2);
    track.innerHTML = "<span>" + half + "</span><span>" + half + "</span>";
  }

  /* -- lightbox -------------------------------------------------------------- */
  function setupLightbox() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    var box = el(
      '<div class="lightbox" id="lightbox" aria-hidden="true">' +
        '<button class="lb-close" type="button" aria-label="Fermer">✕</button>' +
        '<button class="lb-nav lb-prev" type="button" aria-label="Précédent">‹</button>' +
        '<figure class="lb-stage"><img alt="" /><figcaption></figcaption></figure>' +
        '<button class="lb-nav lb-next" type="button" aria-label="Suivant">›</button>' +
      "</div>"
    );
    document.body.appendChild(box);
    var imgEl = box.querySelector("img");
    var capEl = box.querySelector("figcaption");
    var state = { shots: [], i: 0, title: "" };

    function show(i) {
      var n = state.shots.length;
      state.i = (i + n) % n;
      imgEl.src = state.shots[state.i];
      capEl.textContent = state.title + " — " + (state.i + 1) + " / " + n;
    }
    function open(slug) {
      var g = GALLERIES[slug];
      if (!g) return;
      state.shots = g.shots; state.title = g.title;
      show(0);
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      imgEl.src = "";
    }

    grid.addEventListener("click", function (e) {
      var btn = e.target.closest(".gallery-btn");
      if (btn) { e.preventDefault(); open(btn.getAttribute("data-gallery")); }
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(state.i - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(state.i + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(state.i - 1);
      else if (e.key === "ArrowRight") show(state.i + 1);
    });
  }

  /* -- filters ---------------------------------------------------------------- */
  function setupFilters() {
    var bar = document.getElementById("filters");
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      bar.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var cat = chip.getAttribute("data-filter");
      document.querySelectorAll("#projects-grid .card").forEach(function (card) {
        card.style.display = cat === "all" || card.getAttribute("data-cat") === cat ? "" : "none";
      });
    });
  }

  /* -- meta wiring -------------------------------------------------------------- */
  function fillMeta() {
    document.querySelectorAll("[data-meta]").forEach(function (n) {
      var key = n.getAttribute("data-meta");
      if (!META[key]) return;
      if (n.tagName !== "A") { n.textContent = META[key]; return; }
      n.href = key === "email" ? "mailto:" + META[key] : META[key];
      /* the big address is printed, not just linked — keep it in sync */
      if (key === "email" && n.classList.contains("mail")) n.textContent = META[key];
    });
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    T.setupTheme();
    fillMeta();
    renderHero();
    renderTicker();
    renderProjects();
    setupLightbox();
    setupFilters();
    renderSkills();
    T.setupEasterEgg();
    function repaintAll() { repaint.forEach(function (fn) { fn(); }); }
    document.addEventListener("trame:theme", repaintAll);
    /* covers measure their own box to keep dither cells square; by
       load time the layout has actually settled */
    window.addEventListener("load", repaintAll);
  });
})();
