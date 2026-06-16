/* ============================================================
   Trameur — Portfolio data
   Edit this file to add / update projects and privacy policies.
   Each project renders as a card on the home page.
   ============================================================ */

window.META = {
  name: "ThibaudM",
  handle: "Trameur",
  tagline: "Developer crafting games, graphics engines & useful tools.",
  intro:
    "Background in computer science and image processing, with hands-on " +
    "experience in production systems and long-term projects. I like building " +
    "things real people use — from a first-person Steam game to web tools and apps.",
  avatar: "https://avatars.githubusercontent.com/u/82444971?v=4",
  email: "trameurlabs@gmail.com",
  github: "https://github.com/Trameur",
  location: "France",
};

/* category -> palette used for procedurally generated covers */
window.CATEGORY_THEME = {
  games:  { c1: "#19e3c7", c2: "#7b5cff", label: "Game" },
  web:    { c1: "#ffb14e", c2: "#ff5e8a", label: "Web" },
  apps:   { c1: "#34d399", c2: "#22d3ee", label: "App" },
  bots:   { c1: "#5b8cff", c2: "#9b6bff", label: "Bot" },
  tools:  { c1: "#c084fc", c2: "#f472d0", label: "Tool" },
};

window.PROJECTS = [
  {
    name: "Subject 264",
    slug: "subject-264",
    category: "games",
    featured: true,
    emoji: "🥽",
    meta: "VR Only · 2018 · Steam",
    image: "assets/img/subject-264/shot-1.jpg",
    blurb: "VR-only first-person horror escape game on Steam.",
    description:
      "A VR-only first-person horror escape game. You wake up in a blacked-out room full of " +
      "creepy noises — to get out you must recover your past and overcome every obstacle in your path. " +
      "Built in Unreal Engine with VR-oriented level and interaction design.",
    tech: ["Unreal Engine", "C++", "VR Only", "Level Design"],
    gallery: [
      "assets/img/subject-264/shot-1.jpg",
      "assets/img/subject-264/shot-2.jpg",
      "assets/img/subject-264/shot-3.jpg",
      "assets/img/subject-264/shot-4.jpg",
    ],
    links: {
      steam: "https://store.steampowered.com/app/540770/Subject_264/",
      privacy: "privacy/subject-264.html",
    },
  },
  {
    name: "Dofus Fashionista",
    slug: "dofus-fashionista",
    category: "web",
    featured: true,
    emoji: "🎨",
    stars: 17,
    image: "assets/img/dofus-fashionista/banner.jpg",
    meta: "Live · Web · Django",
    blurb: "A modern revival of the classic Dofus equipment advisor.",
    description:
      "A modern revival of the original Fashionista tool, rebuilt and actively maintained. " +
      "Available for all Dofus versions with new features while keeping the simple visual " +
      "core players loved.",
    tech: ["Python", "Django", "JavaScript", "SQL"],
    links: {
      live: "https://dofusfashionista.gg",
      github: "https://github.com/Trameur/DofusFashionistaVanced",
      privacy: "privacy/dofus-fashionista.html",
    },
  },
  {
    name: "365 Challenge",
    slug: "365-challenge",
    category: "apps",
    emoji: "📅",
    blurb: "A 100% offline habit & challenge tracker for mobile.",
    description:
      "Track daily challenges, progress and streaks on your phone. Fully offline by design — " +
      "no account, no analytics, no tracking. Your data never leaves your device.",
    tech: ["React Native", "TypeScript", "Mobile", "Offline-first"],
    links: {
      privacy: "privacy/365-challenge.html",
    },
  },
  {
    name: "BleachBot",
    slug: "bleachbot",
    category: "bots",
    emoji: "🤖",
    blurb: "A Bleach-themed Discord bot with commands & automation.",
    description:
      "A feature-rich Discord bot themed around Bleach. Server utilities, commands and " +
      "automation written in TypeScript on top of Node.js.",
    tech: ["TypeScript", "Node.js", "Discord.js"],
    links: {
      github: "https://github.com/Trameur/BleachBot",
      privacy: "privacy/bleachbot.html",
    },
  },
  {
    name: "Sufod — Idle RPG",
    slug: "sufod-idle-rpg",
    category: "games",
    emoji: "⚔️",
    blurb: "An idle, offline RPG prototype built in Unity.",
    description:
      "An idle, offline RPG built in Unity. Incremental progression and combat systems, " +
      "with custom shaders and a clean offline gameplay loop.",
    tech: ["Unity", "C#", "ShaderLab"],
    links: {
      github: "https://github.com/Trameur/Sufod-idle-offline-RPG",
    },
  },
  {
    name: "Tramacid Visuals",
    slug: "tramacid-visuals",
    category: "tools",
    emoji: "🎵",
    blurb: "Generative, audio-reactive music visualizers.",
    description:
      "Real-time music visuals — generative, audio-reactive graphics built in Python. " +
      "An experiment in turning sound into motion.",
    tech: ["Python", "Audio", "Generative"],
    links: {
      github: "https://github.com/Trameur/Tramacid-visuals",
    },
  },
  {
    name: "ERP",
    slug: "erp",
    category: "tools",
    emoji: "🖥️",
    blurb: "A C++ systems & low-level programming project.",
    description:
      "A C++ project exploring systems and low-level programming, with an emphasis on " +
      "structure and performance.",
    tech: ["C++"],
    links: {
      github: "https://github.com/Trameur/erp",
    },
  },
];

/* Smaller repositories surfaced as compact links ("everything on GitHub"). */
window.MORE_REPOS = [
  {
    name: "Dofus Fashionista (original)",
    note: "The original PiwiSlayer project — basis for the Vanced revival.",
    url: "https://github.com/Trameur/DofusFashionista",
  },
  {
    name: "Privacy",
    note: "Privacy policies for Trameur apps.",
    url: "https://github.com/Trameur/Privacy",
  },
  {
    name: "Trameurs.github.io",
    note: "Previous Jekyll portfolio.",
    url: "https://github.com/Trameur/Trameurs.github.io",
  },
];

window.SKILLS = [
  {
    group: "Graphics & Games",
    items: ["Unreal Engine", "Unity", "C++", "C#", "ShaderLab", "Rendering", "VR", "Level Design"],
  },
  {
    group: "Web & Backend",
    items: ["JavaScript", "TypeScript", "Node.js", "Django", "Vue.js", "PHP", "SQL", "HTML / CSS"],
  },
  {
    group: "Core CS",
    items: ["Algorithms", "Low-level systems", "Image processing", "Performance", "Assembly (MIPS)", "Java", "Python"],
  },
  {
    group: "Tooling",
    items: ["Git", "Linux", "Databases", "CI / automation", "Server environments"],
  },
];
