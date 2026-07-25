# Hari Prasath P — Portfolio

An interactive, WebGL-driven portfolio for **Hari Prasath P**, Full Stack Developer.
A **minimal, liquid-chrome** aesthetic — monochrome ink + bone with iridescent
oil-slick accents, wide **Syne** display type, and structure built from hairlines
rather than boxes. Chrome is used only as accent moments; the rest is airy and
typographic.

## ✨ Highlights

- **Animated preloader** — counter (0→100) with a curtain-wipe reveal.
- **Liquid-chrome wordmark hero** — the name set huge in flowing chrome /
  iridescent type on clean ink; the wordmark is the moment, nothing behind it.
- **Horizontal-scroll Work** — the Projects section pins and pans sideways as
  you scroll (native swipe on touch), with a chrome progress bar.
- **Skills constellation graph** — the signature interactive canvas graph; a nod
  to the Neo4j graph work in the résumé. Iridescent nodes on ink.
- **Scramble / decode headings** — section eyebrows decode from random glyphs.
- **Custom cursor** with magnetic buttons and contextual labels.
- **Minimal sections** — About (hairline stats), Experience (hairline list),
  Education, and a bold Contact closer with an oil-slick CTA.
- **Smooth scrolling** via Lenis, with a scroll-progress bar and scroll-spy nav.
- **Graceful degradation** — no-WebGL and reduced-motion users get a static
  hero and a native (un-pinned) horizontal Work section.

## 🛠 Tech stack

- [Vite](https://vitejs.dev/) + React 18
- [Framer Motion](https://www.framer.com/motion/) · [GSAP](https://gsap.com/) · [Lenis](https://github.com/darkroomengineering/lenis)
- Canvas 2D for the skills constellation (no WebGL/Three.js)
- Plain CSS with a token-based design system (CSS custom properties + CSS Modules)

## 🚀 Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## 📁 Structure

```
src/
├─ main.jsx                  # entry
├─ App.jsx                   # composition + preloader gate
├─ data/content.js           # single source of truth (all résumé content)
├─ styles/global.css         # design tokens, reset, shared classes
├─ lib/                      # motion variants, webgl feature-detect
├─ components/               # Cursor, Navbar, Preloader, Magnetic, Reveal, …
│  └─ three/                 # HeroCanvas (code-split) + HeroScene
└─ sections/                 # Hero, About, Experience, Projects, Skills, Education, Contact
```

To update any content (roles, projects, skills, links), edit **`src/data/content.js`**.

## ♿ Accessibility & performance

- Full `prefers-reduced-motion` support (preloader, hero, constellation, smooth scroll).
- WebGL feature-detection with a CSS-gradient fallback.
- Three.js is code-split and lazy-loaded; the render loop pauses when the hero is
  off-screen or the tab is hidden. The Skills canvas loop pauses the same way.
- Semantic landmarks, focus-visible styles, an accessible skills list, a skip link,
  and a focus-managed mobile menu.

---

Designed & built with React + Three.js.
