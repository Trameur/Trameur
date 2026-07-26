# Trameur — portfolio

Source of the portfolio website, served with **GitHub Pages** from this `docs/` folder.

🌐 https://trameur.github.io/Trameur/

## The idea

*Trameur* means the one who lays the weft — and in imaging, **tramage** is halftone
screening (dithering). The site is built on that pun: every cover image is run through a
real **Bayer 8×8 ordered dither** in canvas and resolves to the photo on hover, the hero
background is a live **moiré** of two rotating line gratings, and projects with no
screenshot get their own moiré generated from their slug. Palette is risograph
(ink / bone paper / acid green / fluo pink), type is Anton + JetBrains Mono, and nothing
on the page has a rounded corner.

Press **D** anywhere to screen the whole page.

## Structure

```
docs/
├── index.html            # Home — 00 Trame, 01 Travaux, 02 Atelier, 03 Signal
├── project.html          # Project sheet, filled from ?slug=
├── 404.html              # Self-contained (served from any path)
├── privacy/              # Policy hub + one page per app
└── assets/
    ├── css/style.css     # Design system (chambre noire / papier)
    ├── css/privacy.css   # Policy pages, same tokens
    ├── js/trame.js       # ← the engine: dither, moiré, hero raster, theme, [D]
    ├── js/main.js        # Home rendering
    ├── js/detail.js      # Project sheet rendering
    └── data/projects.js  # ← EDIT THIS to add/update projects
```

No build step, no dependencies. Two webfonts from Google Fonts, nothing else external.

## Add or edit a project

Everything is data-driven. Open [`assets/data/projects.js`](assets/data/projects.js) and add
an entry to `PROJECTS`:

```js
{
  name: "My New Project",
  slug: "my-new-project",
  category: "web",          // games | web | apps | bots | tools -> sets the duotone
  featured: false,          // true = full-width band (they alternate sides)
  meta: "Live · Django · 2026",     // small uppercase line under the title
  image: "assets/img/my-new-project/cover.jpg",  // optional
  blurb: "One line, used as the lead on the project sheet.",
  description: "Short text shown on the card.",
  note: "The human aside — the detail you'd say out loud.",  // optional
  long: "Longer text for the project sheet.",                // optional
  embed: '<iframe ...></iframe>',                            // optional (Steam widget)
  gallery: ["assets/img/my-new-project/shot-1.jpg"],         // optional -> lightbox
  tech: ["TypeScript", "Node.js"],
  stars: 17,                                                 // optional
  links: {
    live: "https://...",
    github: "https://...",
    steam: "https://...",
    privacy: "privacy/my-new-project.html",
  },
}
```

- **No `image`?** The cover is a moiré generated from the slug — deterministic, so a project
  always gets the same one. No image files needed.
- Every project automatically gets a sheet at `project.html?slug=<slug>`.
- Put images under `docs/assets/img/<slug>/`, resized and compressed. They are dithered
  client-side, so anything above ~1400px wide is wasted bytes.
- `note` is where the personality goes. Keep it to one sentence and make it true.

Numbers in the hero index live in `INDEX_STATS`, and the categories' duotones in
`CATEGORY_THEME`.

## Add a privacy policy

1. Copy any file in `privacy/` to `privacy/<slug>.html`.
2. Edit the title and text (keep the inline theme script in `<head>`).
3. Link it from the project (`links.privacy`) and add a card in `privacy/index.html`.

⚠️ These files contain UTF-8 accents. Edit them with a UTF-8-aware editor — a naive
PowerShell `Get-Content`/`Set-Content` round-trip will mangle every `—` and `é`.

## Local preview

```bash
python -m http.server 4173 --directory docs
```

## GitHub Pages

Repo **Settings → Pages**: source *Deploy from a branch*, branch `main`, folder `/docs`.
