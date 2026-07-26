/* ============================================================
   Trameur — Portfolio data
   Edit this file to add / update projects.
   Everything else on the site is generated from here.
   ============================================================ */

window.META = {
  name: "Thibaud M.",
  handle: "Trameur",

  /* the two definitions shown in the hero */
  defs: [
    ["weaver", "the one who lays the weft, thread by thread."],
    ["imaging", "the one who screens a picture into a raster of dots."],
  ],
  defLine: "Same job, really — make something whole out of a grid of very small decisions.",

  tagline: "Je trame des jeux, des images et des outils.",
  taglineEn: "I weave games, images and tools.",

  intro:
    "Developer from France. Computer science and image processing by training; " +
    "game engines, rendering and web back ends by trade. I ship things and then keep " +
    "maintaining them for years — which is the unglamorous half nobody puts on a portfolio.",

  avatar: "https://avatars.githubusercontent.com/u/82444971?v=4",
  email: "trameurlabs@gmail.com",
  github: "https://github.com/Trameur",
  location: "France",
};

/* Numbers shown in the hero index. Keep these honest. */
window.INDEX_STATS = [
  { label: "Projets",       value: "06" },
  { label: "Sur Steam",     value: "01" },
  { label: "Dépôts",        value: "09" },
  { label: "★ Fashionista", value: "17" },
];

/* category -> duotone used by the dither engine + short label */
window.CATEGORY_THEME = {
  games: { tone: "#c8ff2e", label: "Game" },
  web:   { tone: "#ff3d6e", label: "Web" },
  apps:  { tone: "#4ad9ff", label: "App" },
  bots:  { tone: "#b98cff", label: "Bot" },
  tools: { tone: "#ffb020", label: "Tool" },
};

window.PROJECTS = [
  {
    name: "Subject 264",
    slug: "subject-264",
    category: "games",
    featured: true,
    meta: "2018 · VR only · sur Steam",
    image: "assets/img/subject-264/shot-1.jpg",
    blurb: "VR-only first-person horror escape game, on Steam.",
    note: "Roomscale VR only. No flat-screen fallback, no compromise.",
    description:
      "You wake up in a blacked-out room full of noises you would rather not identify. " +
      "To get out you have to recover your past and take the room apart, drawer by drawer.",
    long:
      "Subject 264 is an exploration and puzzle game built from the ground up for Virtual Reality. " +
      "It fully uses roomscale with motion controllers, with movement by pad or teleportation. " +
      "You wake up in a blacked-out room full of creepy noises — and the place doesn't want to let you " +
      "leave. To escape you must remember your past and overcome every obstacle in your path: crouch to " +
      "look under objects, open drawers, grab items off the floor and solve a variety of puzzles. " +
      "Every interaction is hand-built for VR, because in 2018 there was nothing to copy from.",
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
    stars: 17,
    image: "assets/img/dofus-fashionista/banner.jpg",
    meta: "En ligne · maintenu · milliers de joueurs",
    blurb: "The build optimizer Dofus players had lost, brought back.",
    note: "The original went dark. I rebuilt it — and now I keep it alive across every version of the game.",
    description:
      "Tell it what you want out of a build; it searches the gear space and hands you the best " +
      "combination it can find. Same simple, visual tool players remember, on a stack that survives.",
    long:
      "Dofus Fashionista is an equipment advisor for the game Dofus: you tell it what you want from a " +
      "build and it finds the best gear combination for your character. This is a modern revival of the " +
      "original tool by PiwiSlayer — rebuilt from the ground up, actively maintained and kept up to date " +
      "across all Dofus versions. The goal was to preserve the simple, visual experience players loved " +
      "while modernizing the stack, fixing long-standing issues and adding new features. " +
      "Most of the work is invisible: keeping thousands of items in sync, patch after patch.",
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
    meta: "Mobile · hors-ligne · sans compte",
    blurb: "A habit tracker that never phones home.",
    note: "No account, no server, no analytics. Your streak is nobody's business but yours.",
    description:
      "Daily challenges, progress and streaks, stored entirely on your device. " +
      "Optional local reminder. One button exports everything you own.",
    long:
      "365 Challenge is a habit and challenge tracker for mobile, built offline-first. Create challenges, " +
      "follow your daily progress and keep your streaks going — with an optional local daily reminder. " +
      "There is no account and no server: everything is stored on the device, and an \"Export my data\" " +
      "feature lets you take your data with you at any time. Privacy here is a constraint I designed " +
      "around, not a paragraph I wrote afterwards.",
    tech: ["React Native", "TypeScript", "Mobile", "Offline-first"],
    links: {
      privacy: "privacy/365-challenge.html",
    },
  },
  {
    name: "BleachBot",
    slug: "bleachbot",
    category: "bots",
    meta: "Discord · configurable par serveur",
    blurb: "A Bleach-themed Discord bot doing very unglamorous chores.",
    note: "Yes, it's an anime bot. It also quietly handles the boring server work.",
    description:
      "Commands, server utilities and automation, configurable per guild, storing the bare " +
      "minimum it needs to function.",
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
    name: "Sufod",
    slug: "sufod-idle-rpg",
    category: "games",
    meta: "Prototype · idle · 100 % hors-ligne",
    blurb: "An idle, fully offline RPG prototype.",
    note: "Read the name backwards.",
    description:
      "Incremental progression and combat that keep running while you're away, wrapped in " +
      "custom shaders and a loop that needs no connection at all.",
    long:
      "Sufod is an idle, offline RPG built in Unity. It explores incremental progression and combat " +
      "systems that keep advancing even when you're away, wrapped in custom shaders and a clean, " +
      "self-contained gameplay loop that needs no connection to play. A playground for systems design " +
      "more than a product — and the name is a small joke for anyone who has played Dofus.",
    tech: ["Unity", "C#", "ShaderLab"],
    links: {
      github: "https://github.com/Trameur/Sufod-idle-offline-RPG",
    },
  },
  {
    name: "Tramacid Visuals",
    slug: "tramacid-visuals",
    category: "tools",
    meta: "Temps réel · audio-réactif · carnet de croquis",
    blurb: "Generative visuals driven by whatever is playing.",
    note: "Sound in, light out. Built for an audience of one — which is the whole point.",
    description:
      "Real-time graphics that listen: audio analysis on one side, generative motion on the " +
      "other. The closest thing I have to a sketchbook.",
    long:
      "Tramacid Visuals is an experiment in turning sound into motion: real-time, audio-reactive " +
      "graphics generated in Python. It listens to the music and drives generative visuals from it — " +
      "a playground for ideas at the intersection of audio analysis and creative coding, and the place " +
      "where most of the visual language of this very site came from.",
    tech: ["Python", "Audio", "Generative"],
    links: {
      github: "https://github.com/Trameur/Tramacid-visuals",
    },
  },
];

window.SKILLS = [
  {
    group: "Temps réel",
    en: "Games & real-time",
    items: ["Unreal Engine", "Unity", "C++", "C#", "ShaderLab", "VR", "Level design", "Gameplay systems"],
  },
  {
    group: "Image",
    en: "Graphics & image processing",
    items: ["Rendering", "Shaders", "Dithering / halftone", "Filtering", "Audio-reactive", "Generative"],
  },
  {
    group: "Web & back",
    en: "Web & back end",
    items: ["Django", "Node.js", "TypeScript", "JavaScript", "Vue.js", "PHP", "SQL", "HTML / CSS"],
  },
  {
    group: "Bas niveau",
    en: "Core CS",
    items: ["Algorithms", "Performance", "Low-level systems", "Assembly (MIPS)", "Java", "Python"],
  },
  {
    group: "Atelier",
    en: "Tooling",
    items: ["Git", "Linux", "Databases", "CI / automation", "Server ops"],
  },
];
