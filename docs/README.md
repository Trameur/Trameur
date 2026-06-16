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
  description: "What it does.",
  tech: ["TypeScript", "Node.js"],
  links: {
    live: "https://...",      // optional
    github: "https://...",    // optional
    privacy: "privacy/my-new-project.html", // optional
  },
}
```

Cover art is generated automatically from the category and slug — no image files needed.

## Add a privacy policy

1. Copy any file in `privacy/` (e.g. `365-challenge.html`) to `privacy/<slug>.html`.
2. Edit the title, emoji and text.
3. Link it from the project (the `privacy` link above) and add a card in `privacy/index.html`.

## Enable GitHub Pages

Repo **Settings → Pages → Build and deployment**:
- **Source:** Deploy from a branch
- **Branch:** `main` · **Folder:** `/docs` → Save

The site goes live at `https://trameur.github.io/Trameur/` within a minute or two.
