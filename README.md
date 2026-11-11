# Hari Prasath P — Portfolio

Personal portfolio for **Hari Prasath P**, Full-Stack Engineer and Co-Founder of [Glide](https://glideapp.in).
Live at [hari-prasath.pages.dev](https://hari-prasath.pages.dev/).

A minimal, typographic single page: experience, selected work, skills, education and contact,
with light and dark themes that follow the system setting (and a manual toggle).

## Tech stack

- [Vite](https://vitejs.dev/) + React 18
- Plain CSS with design tokens (`src/styles/global.css`), Inter from Google Fonts
- No animation or UI libraries

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Structure

```
src/
├─ main.jsx               # entry
├─ App.jsx                # page composition
├─ data/content.js        # all content (kept in sync with the résumé)
├─ styles/global.css      # tokens, layout, components
└─ sections/              # Header, Hero, Experience, Work, Skills, Education, Contact
public/
├─ portrait.jpg
└─ Hari-Prasath-Resume.pdf
```

To update content, edit **`src/data/content.js`**. To update the résumé download, replace
`public/Hari-Prasath-Resume.pdf`.
