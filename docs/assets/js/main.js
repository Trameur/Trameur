/* ============================================================
   Trameur — Portfolio behaviour
   ============================================================ */
(function () {
  "use strict";

  var THEMES = window.CATEGORY_THEME || {};
  var PROJECTS = window.PROJECTS || [];
  var MORE = window.MORE_REPOS || [];
  var SKILLS = window.SKILLS || [];
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

  /* ---- procedural cover art --------------------------------------- */
  function coverSVG(p) {
    var th = THEMES[p.category] || { c1: "#7b5cff", c2: "#19e3c7" };
    var id = "g" + p.slug.replace(/[^a-z0-9]/gi, "");
    // deterministic decorative circles from the slug
    var seed = 0;
    for (var i = 0; i < p.slug.length; i++) seed = (seed * 31 + p.slug.charCodeAt(i)) % 997;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
    var blobs = "";
    for (var k = 0; k < 5; k++) {
      var cx = Math.round(rnd() * 100), cy = Math.round(rnd() * 100), r = 8 + Math.round(rnd() * 22);
      blobs += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#fff" opacity="' + (0.04 + rnd() * 0.06).toFixed(3) + '"/>';
    }
    return (
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + th.c1 + '"/><stop offset="1" stop-color="' + th.c2 + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="100" height="100" fill="url(#' + id + ')"/>' +
      '<g>' + blobs + '</g>' +
      '<rect width="100" height="100" fill="#0b0c14" opacity="0.30"/>' +
      "</svg>"
    );
  }

  /* ---- link icons -------------------------------------------------- */
  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    steam: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-9.96 9.2l5.37 2.22a2.83 2.83 0 0 1 1.6-.5h.13l2.39-3.46v-.05a3.78 3.78 0 1 1 3.78 3.78h-.09l-3.41 2.43v.1a2.84 2.84 0 0 1-5.6.68L2 14.32A10 10 0 1 0 12 2Zm-4.2 15.17.95.4a2.13 2.13 0 1 0 1.18-2.78l1 .42a1.57 1.57 0 1 1-1.18 2.9l-1.95-.94ZM18 8.9a2.52 2.52 0 1 0-2.52 2.52h.01A2.52 2.52 0 0 0 18 8.9Zm-4.4 0a1.9 1.9 0 1 1 1.9 1.9 1.9 1.9 0 0 1-1.9-1.9Z"/></svg>',
    privacy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>',
    gallery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="M21 15l-5-5L5 18"/></svg>',
    details: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };
  var LINK_LABEL = { github: "Code", live: "Live site", steam: "Steam", privacy: "Privacy" };
  var LINK_ORDER = ["live", "steam", "github", "privacy"];

  /* ---- project cards ---------------------------------------------- */
  var GALLERIES = {};

  function renderProjects() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    PROJECTS.forEach(function (p) {
      var th = THEMES[p.category] || {};
      var star = p.stars ? '<span class="star-tag">★ ' + p.stars + "</span>" : "";
      var catTag = '<span class="cat-tag">' + esc(th.label || p.category) + "</span>";

      var detailHref = "project.html?slug=" + encodeURIComponent(p.slug);

      var cover;
      if (p.image) {
        cover =
          '<img class="cover-img" src="' + esc(p.image) + '" alt="' + esc(p.name) + ' preview" loading="lazy" />' +
          '<span class="cover-shade"></span>' + catTag + star +
          '<span class="emoji-badge">' + (p.emoji || "•") + "</span>";
      } else {
        cover = coverSVG(p) + catTag + star + '<span class="emoji">' + (p.emoji || "•") + "</span>";
      }

      var links =
        '<a class="lnk primary" href="' + detailHref + '">' + ICONS.details + "<span>Details</span></a>";
      LINK_ORDER.forEach(function (key) {
        if (key === "privacy") return; // privacy stays on the detail page / footer only
        if (!p.links || !p.links[key]) return;
        var primary = key === "live" || key === "steam";
        links +=
          '<a class="lnk' + (primary ? " primary" : "") + '" href="' + esc(p.links[key]) + '"' +
          (key === "privacy" ? "" : ' target="_blank" rel="noopener"') +
          ">" + (ICONS[key] || "") + "<span>" + LINK_LABEL[key] + "</span></a>";
      });
      if (p.gallery && p.gallery.length) {
        GALLERIES[p.slug] = { title: p.name, shots: p.gallery };
        links +=
          '<button class="lnk gallery-btn" type="button" data-gallery="' + esc(p.slug) + '">' +
          ICONS.gallery + "<span>Gallery</span></button>";
      }

      var tech = (p.tech || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
      var meta = p.meta ? '<div class="card-meta">' + esc(p.meta) + "</div>" : "";

      var card = el(
        '<article class="card reveal' + (p.featured ? " featured" : "") + '" data-cat="' + esc(p.category) + '">' +
          '<a class="cover" href="' + detailHref + '" aria-label="' + esc(p.name) + ' — view details">' + cover + "</a>" +
          '<div class="card-body">' +
            '<h3><a href="' + detailHref + '">' + esc(p.name) + "</a></h3>" + meta +
            "<p>" + esc(p.description) + "</p>" +
            '<div class="tech">' + tech + "</div>" +
            '<div class="card-links">' + links + "</div>" +
          "</div>" +
        "</article>"
      );
      grid.appendChild(card);
    });
  }

  /* ---- lightbox gallery ------------------------------------------- */
  function setupLightbox() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    var box = el(
      '<div class="lightbox" id="lightbox" aria-hidden="true">' +
        '<button class="lb-close" type="button" aria-label="Close">✕</button>' +
        '<button class="lb-nav lb-prev" type="button" aria-label="Previous">‹</button>' +
        '<figure class="lb-stage"><img alt="" /><figcaption></figcaption></figure>' +
        '<button class="lb-nav lb-next" type="button" aria-label="Next">›</button>' +
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

  /* ---- filters ----------------------------------------------------- */
  function setupFilters() {
    var bar = document.getElementById("filters");
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      bar.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var cat = chip.getAttribute("data-filter");
      document.querySelectorAll("#projects .card").forEach(function (card) {
        var show = cat === "all" || card.getAttribute("data-cat") === cat;
        card.style.display = show ? "" : "none";
      });
    });
  }

  /* ---- more repos & skills ---------------------------------------- */
  function renderMore() {
    var box = document.getElementById("more-repos");
    if (!box) return;
    MORE.forEach(function (r) {
      box.appendChild(el(
        '<a class="more-item reveal" href="' + esc(r.url) + '" target="_blank" rel="noopener">' +
          "<b>" + ICONS.github + esc(r.name) + "</b>" +
          "<span>" + esc(r.note) + "</span>" +
        "</a>"
      ));
    });
  }
  function renderSkills() {
    var box = document.getElementById("skills-list");
    if (!box) return;
    SKILLS.forEach(function (s) {
      var tags = s.items.map(function (i) { return "<span>" + esc(i) + "</span>"; }).join("");
      box.appendChild(el(
        '<div class="skill-card reveal"><h4>' + esc(s.group) + '</h4><div class="tags">' + tags + "</div></div>"
      ));
    });
  }

  /* ---- theme toggle ------------------------------------------------ */
  function setupTheme() {
    var btn = document.getElementById("theme-toggle");
    var root = document.documentElement;
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    if (stored) root.setAttribute("data-theme", stored);
    function label() {
      var dark = root.getAttribute("data-theme") !== "light";
      if (btn) btn.textContent = dark ? "☀️" : "🌙";
    }
    label();
    if (btn) btn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") !== "light";
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
  }

  /* ---- reveal on scroll ------------------------------------------- */
  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (n) { io.observe(n); });
  }

  /* ---- meta wiring ------------------------------------------------- */
  function fillMeta() {
    document.querySelectorAll("[data-meta]").forEach(function (n) {
      var key = n.getAttribute("data-meta");
      if (META[key]) {
        if (n.tagName === "A") n.href = key === "email" ? "mailto:" + META[key] : META[key];
        else if (n.tagName === "IMG") n.src = META[key];
        else n.textContent = META[key];
      }
    });
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupTheme();
    fillMeta();
    renderProjects();
    setupLightbox();
    setupFilters();
    renderMore();
    renderSkills();
    setupReveal();
  });
})();
