# Trameur — Portfolio site

The source of the portfolio website served with **GitHub Pages** from this `docs/` folder.

🌐 **Live (once Pages is enabled):** https://trameur.github.io/Trameur/

## Structure

```
docs/
├── index.html            # Home — hero, projects grid, skills, stats, contact
├── 404.html              # Custom not-found page
├── privacy/              # Privacy policy hub + one page per app
│   ├── index.html
│   ├── 365-challenge.html
│   ├── dofus-fashionista.html
│   ├── bleachbot.html
│   └── subject-264.html
└── assets/
    ├── css/style.css     # Portfolio styles (dark/light theme)
    ├── css/privacy.css   # Privacy pages styles
    ├── js/main.js        # Renders cards, filters, theme toggle
    └── data/projects.js  # ← EDIT THIS to add/update projects
```

## Add or edit a project

Everything is data-driven. Open [`assets/data/projects.js`](assets/data/projects.js) and add an
entry to the `PROJECTS` array:

```js
{
  name: "My New Project",
  slug: "my-new-project",
  category: "web",            // games | web | apps | bots | tools
  featured: false,            // true = double-width card
  emoji: "🚀",
  meta: "Live · Web · 2026", // optional small line under the title
  image: "assets/img/my-new-project/cover.jpg", // optional real cover image
  description: "Short text shown on the card.",
  long: "Longer text shown on the project detail page.", // optional
  embed: '<iframe ...></iframe>', // optional (e.g. a Steam widget) on the detail page
  gallery: [                  // optional screenshots -> lightbox + detail gallery
    "assets/img/my-new-project/shot-1.jpg",
    "assets/img/my-new-project/shot-2.jpg",
  ],
  tech: ["TypeScript", "Node.js"],
  links: {
    live: "https://...",      // optional
    github: "https://...",    // optional
    privacy: "privacy/my-new-project.html", // optional
  },
}
```

- If `image` is omitted, cover art is **generated automatically** from the category and slug — no image files needed.
- Every project automatically gets a detail page at `project.html?slug=<slug>` (rendered by `assets/js/detail.js`). Cards link to it.
- Put images under `docs/assets/img/<slug>/` and keep them optimized (resized + compressed).

## Add a privacy policy

1. Copy any file in `privacy/` (e.g. `365-challenge.html`) to `privacy/<slug>.html`.
2. Edit the title, emoji and text.
3. Link it from the project (the `privacy` link above) and add a card in `privacy/index.html`.

## Enable GitHub Pages

Repo **Settings → Pages → Build and deployment**:
- **Source:** Deploy from a branch
- **Branch:** `main` · **Folder:** `/docs` → Save

The site goes live at `https://trameur.github.io/Trameur/` within a minute or two.
