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
    long:
      "Subject 264 is an exploration and puzzle game built from the ground up for Virtual Reality. " +
      "It fully uses roomscale with motion controllers, with movement by pad or teleportation. " +
      "You wake up in a blacked-out room full of creepy noises — and the place doesn't want to let you " +
      "leave. To escape you must remember your past and overcome every obstacle in your path: crouch to " +
      "look under objects, open drawers, grab items off the floor and solve a variety of puzzles. " +
      "The result is a tense, atmospheric experience with a heavy focus on hand-crafted VR interaction.",
    embed:
      '<iframe class="store-embed" src="https://store.steampowered.com/widget/540770/" ' +
      'frameborder="0" width="100%" height="190" title="Subject 264 on Steam"></iframe>',
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
    long:
      "Dofus Fashionista is an equipment advisor for the game Dofus: you tell it what you want from a " +
      "build and it finds the best gear combination for your character. This is a modern revival of the " +
      "original tool by PiwiSlayer — rebuilt from the ground up, actively maintained and kept up to date " +
      "across all Dofus versions. The goal was to preserve the simple, visual experience players loved " +
      "while modernizing the stack, fixing long-standing issues and adding new features.",
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
    long:
      "365 Challenge is a habit and challenge tracker for mobile, built offline-first. Create challenges, " +
      "follow your daily progress and keep your streaks going — with an optional local daily reminder. " +
      "There is no account and no server: everything is stored on the device, and an \"Export my data\" " +
      "feature lets you take your data with you at any time. Privacy is a feature, not an afterthought.",
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
    long:
      "BleachBot is a Discord bot themed around the Bleach universe. It brings commands, server utilities " +
      "and automation to a guild, with per-server configuration so each community can tune what it does. " +
      "Written in TypeScript on top of Node.js and Discord.js, with a focus on clean command handling and " +
      "only storing the minimum data needed to work.",
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
    long:
      "Sufod is an idle, offline RPG built in Unity. It explores incremental progression and combat " +
      "systems that keep advancing even when you're away, wrapped in custom shaders and a clean, " +
      "self-contained gameplay loop that needs no connection to play.",
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
    long:
      "Tramacid Visuals is an experiment in turning sound into motion: real-time, audio-reactive " +
      "graphics generated in Python. It listens to the music and drives generative visuals from it — " +
      "a playground for ideas at the intersection of audio analysis and creative coding.",
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
