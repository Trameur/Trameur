/* ============================================================
   Trameur — Project detail page (project.html?slug=...)
   Data-driven from assets/data/projects.js
   ============================================================ */
(function () {
  "use strict";

  var THEMES = window.CATEGORY_THEME || {};
  var PROJECTS = window.PROJECTS || [];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    steam: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-9.96 9.2l5.37 2.22a2.83 2.83 0 0 1 1.6-.5h.13l2.39-3.46v-.05a3.78 3.78 0 1 1 3.78 3.78h-.09l-3.41 2.43v.1a2.84 2.84 0 0 1-5.6.68L2 14.32A10 10 0 1 0 12 2Zm-4.2 15.17.95.4a2.13 2.13 0 1 0 1.18-2.78l1 .42a1.57 1.57 0 1 1-1.18 2.9l-1.95-.94ZM18 8.9a2.52 2.52 0 1 0-2.52 2.52h.01A2.52 2.52 0 0 0 18 8.9Zm-4.4 0a1.9 1.9 0 1 1 1.9 1.9 1.9 1.9 0 0 1-1.9-1.9Z"/></svg>',
    privacy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>',
  };
  var LINK_LABEL = { github: "Source code", live: "Live site", steam: "View on Steam", privacy: "Privacy policy" };
  var LINK_ORDER = ["live", "steam", "github", "privacy"];

  function coverSVG(p) {
    var th = THEMES[p.category] || { c1: "#7b5cff", c2: "#19e3c7" };
    var id = "g" + p.slug.replace(/[^a-z0-9]/gi, "");
    var seed = 0;
    for (var i = 0; i < p.slug.length; i++) seed = (seed * 31 + p.slug.charCodeAt(i)) % 997;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
    var blobs = "";
    for (var k = 0; k < 6; k++) {
      var cx = Math.round(rnd() * 100), cy = Math.round(rnd() * 100), r = 8 + Math.round(rnd() * 24);
      blobs += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#fff" opacity="' + (0.04 + rnd() * 0.06).toFixed(3) + '"/>';
    }
    return (
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + th.c1 + '"/><stop offset="1" stop-color="' + th.c2 + '"/>' +
      "</linearGradient></defs>" +
      '<rect width="100" height="100" fill="url(#' + id + ')"/><g>' + blobs + "</g>" +
      '<rect width="100" height="100" fill="#0b0c14" opacity="0.28"/></svg>'
    );
  }

  function notFound(root) {
    root.appendChild(el(
      '<div class="detail-missing">' +
        "<h1>Project not found</h1>" +
        "<p>This project doesn't exist (or the link is wrong).</p>" +
        '<a class="btn btn-primary" href="index.html#projects">← Back to all projects</a>' +
      "</div>"
    ));
    document.title = "Not found · Trameur";
  }

  function render(root, p) {
    var th = THEMES[p.category] || {};
    document.title = p.name + " · Trameur";

    var cover = p.image
      ? '<img class="cover-img" src="' + esc(p.image) + '" alt="' + esc(p.name) + ' cover" />' + '<span class="cover-shade"></span>'
      : coverSVG(p) + '<span class="emoji">' + (p.emoji || "•") + "</span>";

    var links = "";
    LINK_ORDER.forEach(function (key) {
      if (!p.links || !p.links[key]) return;
      var primary = key === "live" || key === "steam";
      links +=
        '<a class="lnk' + (primary ? " primary" : "") + '" href="' + esc(p.links[key]) + '"' +
        (key === "privacy" ? "" : ' target="_blank" rel="noopener"') +
        ">" + (ICONS[key] || "") + "<span>" + LINK_LABEL[key] + "</span></a>";
    });

    var tech = (p.tech || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
    var meta = p.meta ? '<div class="card-meta">' + esc(p.meta) + "</div>" : "";
    var emojiHead = p.emoji ? '<span class="detail-emoji">' + p.emoji + "</span>" : "";

    var media = "";
    if (p.embed) {
      media += '<h2>On Steam</h2><div class="store-embed-wrap">' + p.embed + "</div>";
    }
    if (p.gallery && p.gallery.length) {
      var thumbs = p.gallery.map(function (src, i) {
        return '<button class="thumb" type="button" data-i="' + i + '">' +
          '<img src="' + esc(src) + '" alt="' + esc(p.name) + " screenshot " + (i + 1) + '" loading="lazy" /></button>';
      }).join("");
      media += '<h2>Gallery</h2><div class="thumb-grid">' + thumbs + "</div>";
    }

    var node = el(
      '<article class="detail">' +
        '<div class="detail-cover">' + cover +
          '<span class="cat-tag">' + esc(th.label || p.category) + "</span>" +
          (p.stars ? '<span class="star-tag">★ ' + p.stars + "</span>" : "") +
        "</div>" +
        '<div class="detail-head">' +
          "<h1>" + emojiHead + esc(p.name) + "</h1>" + meta +
          '<p class="lead">' + esc(p.blurb || p.description) + "</p>" +
          '<div class="tech">' + tech + "</div>" +
          '<div class="card-links">' + links + "</div>" +
        "</div>" +
        '<div class="detail-text">' +
          "<h2>About</h2><p>" + esc(p.long || p.description) + "</p>" +
          media +
        "</div>" +
      "</article>"
    );
    root.appendChild(node);

    setupLightbox(p);
  }

  function setupLightbox(p) {
    if (!p.gallery || !p.gallery.length) return;
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
    var shots = p.gallery, idx = 0;
    function show(i) { idx = (i + shots.length) % shots.length; imgEl.src = shots[idx]; capEl.textContent = p.name + " — " + (idx + 1) + " / " + shots.length; }
    function open(i) { show(i); box.classList.add("open"); box.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
    function close() { box.classList.remove("open"); box.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; imgEl.src = ""; }

    document.querySelector(".thumb-grid").addEventListener("click", function (e) {
      var b = e.target.closest(".thumb");
      if (b) open(parseInt(b.getAttribute("data-i"), 10) || 0);
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  function setupTheme() {
    var btn = document.getElementById("theme-toggle");
    var root = document.documentElement;
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    if (stored) root.setAttribute("data-theme", stored);
    function label() { if (btn) btn.textContent = root.getAttribute("data-theme") !== "light" ? "☀️" : "🌙"; }
    label();
    if (btn) btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") !== "light" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupTheme();
    var root = document.getElementById("detail");
    var slug = qs("slug");
    var p = slug && PROJECTS.filter(function (x) { return x.slug === slug; })[0];
    if (p) render(root, p);
    else notFound(root);
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
