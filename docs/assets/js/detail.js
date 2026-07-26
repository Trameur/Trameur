/* ============================================================
   Trameur — project sheet (project.html?slug=...)
   Data-driven from assets/data/projects.js
   ============================================================ */
(function () {
  "use strict";

  var T = window.TRAME;
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
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    steam: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-9.96 9.2l5.37 2.22a2.83 2.83 0 0 1 1.6-.5h.13l2.39-3.46v-.05a3.78 3.78 0 1 1 3.78 3.78h-.09l-3.41 2.43v.1a2.84 2.84 0 0 1-5.6.68L2 14.32A10 10 0 1 0 12 2Zm-4.2 15.17.95.4a2.13 2.13 0 1 0 1.18-2.78l1 .42a1.57 1.57 0 1 1-1.18 2.9l-1.95-.94ZM18 8.9a2.52 2.52 0 1 0-2.52 2.52h.01A2.52 2.52 0 0 0 18 8.9Zm-4.4 0a1.9 1.9 0 1 1 1.9 1.9 1.9 1.9 0 0 1-1.9-1.9Z"/></svg>',
    privacy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>',
  };
  var LINK_LABEL = { github: "Code source", live: "Site en ligne", steam: "Sur Steam", privacy: "Confidentialité" };
  var LINK_ORDER = ["live", "steam", "github", "privacy"];

  function notFound(root) {
    document.title = "Introuvable · Trameur";
    root.appendChild(el(
      '<div class="detail-missing">' +
        '<h1>404<br /><span class="stroke">Perdu</span></h1>' +
        "<p>Ce projet n'existe pas — ou le lien s'est effiloché en route.</p>" +
        '<a class="btn btn-primary" href="index.html#travaux">← Retour aux travaux</a>' +
      "</div>"
    ));
  }

  function render(root, p, i) {
    var th = THEMES[p.category] || {};
    var tone = th.tone || "#c8ff2e";
    document.title = p.name + " · Trameur";

    var links = "";
    LINK_ORDER.forEach(function (key) {
      if (!p.links || !p.links[key]) return;
      links +=
        '<a class="lnk' + (key === "live" || key === "steam" ? " primary" : "") + '" href="' + esc(p.links[key]) + '"' +
        (key === "privacy" ? "" : ' target="_blank" rel="noopener"') +
        ">" + (ICONS[key] || "") + "<span>" + LINK_LABEL[key] + "</span></a>";
    });

    var rows =
      '<div class="row"><span>Réf.</span><span>' + pad(i + 1) + " / " + pad(PROJECTS.length) + "</span></div>" +
      '<div class="row"><span>Catégorie</span><span>' + esc(th.label || p.category) + "</span></div>" +
      (p.meta ? '<div class="row"><span>Fiche</span><span>' + esc(p.meta) + "</span></div>" : "") +
      '<div class="row"><span>Stack</span><span>' + esc((p.tech || []).join(" · ")) + "</span></div>" +
      (p.stars ? '<div class="row"><span>Étoiles</span><span>★ ' + p.stars + "</span></div>" : "");

    var media = "";
    if (p.embed) media += '<h2>Sur Steam</h2><div class="store-embed-wrap">' + p.embed + "</div>";
    if (p.gallery && p.gallery.length) {
      media += "<h2>Images</h2><div class=\"thumb-grid\">" + p.gallery.map(function (src, k) {
        return '<button class="thumb" type="button" data-i="' + k + '">' +
          '<img src="' + esc(src) + '" alt="' + esc(p.name) + " — image " + (k + 1) + '" loading="lazy" /></button>';
      }).join("") + "</div>";
    }

    var node = el(
      '<article class="detail">' +
        '<a class="crumb" href="index.html#travaux">← 01 — Travaux</a>' +
        '<div class="detail-cover"><span class="scan"></span></div>' +
        '<div class="detail-head">' +
          "<div>" +
            "<h1>" + esc(p.name) + "</h1>" +
            '<p class="lead">' + esc(p.blurb || p.description) + "</p>" +
            (p.note ? '<p class="note">' + esc(p.note) + "</p>" : "") +
            '<div class="card-links" style="margin-top:22px">' + links + "</div>" +
          "</div>" +
          '<div class="detail-side">' + rows + "</div>" +
        "</div>" +
        '<div class="detail-text"><h2>À propos</h2><p>' + esc(p.long || p.description) + "</p></div>" +
        '<div class="detail-media">' + media + "</div>" +
      "</article>"
    );
    root.appendChild(node);

    /* cover, tramée */
    var cover = node.querySelector(".detail-cover");
    var canvas = document.createElement("canvas");
    var img = null;
    if (p.image) {
      img = new Image();
      img.className = "real";
      img.alt = p.name;
      img.src = p.image;
      cover.insertBefore(img, cover.firstChild);
    }
    cover.insertBefore(canvas, cover.querySelector(".scan"));
    function paint() {
      T.paintCover(canvas, { img: img, tone: tone, slug: p.slug, ratio: 9 / 21, cols: 200 });
    }
    if (img && !img.complete) img.addEventListener("load", paint, { once: true });
    paint();
    document.addEventListener("trame:theme", paint);
    if (T.coarse) cover.classList.add("resolved");

    setupLightbox(p);
  }

  function setupLightbox(p) {
    if (!p.gallery || !p.gallery.length) return;
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
    var shots = p.gallery, idx = 0;

    function show(i) {
      idx = (i + shots.length) % shots.length;
      imgEl.src = shots[idx];
      capEl.textContent = p.name + " — " + (idx + 1) + " / " + shots.length;
    }
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

  document.addEventListener("DOMContentLoaded", function () {
    T.setupTheme();
    var root = document.getElementById("detail");
    var slug = qs("slug");
    var i = -1;
    PROJECTS.forEach(function (x, k) { if (x.slug === slug) i = k; });
    if (i >= 0) render(root, PROJECTS[i], i);
    else notFound(root);
    T.setupEasterEgg();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
