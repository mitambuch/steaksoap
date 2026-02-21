# Project Architecture

This document explains **why** each folder exists and **what** goes in it.

---

## Overview

```
project/
├── .github/              → CI, PR/issue templates
├── .husky/               → Git hooks (pre-commit, commit-msg)
├── .vscode/              → Editor config (extensions, settings)
├── docs/                 → Project documentation
├── public/               → Static files served as-is
│   ├── fonts/            → Fonts served directly (not imported)
│   └── images/           → Static images (favicon, og-image…)
├── src/                  → Source code
│   ├── app/              → Application root
│   ├── assets/           → Files imported in code
│   ├── components/       → Reusable React components
│   ├── config/           → Application config
│   ├── constants/        → Constant values
│   ├── context/          → React Contexts
│   ├── data/             → Static data / fixtures
│   ├── features/         → Self-contained complex features
│   ├── hooks/            → Custom React hooks
│   ├── lib/              → Third-party library wrappers
│   ├── pages/            → Pages (1 page = 1 route)
│   ├── styles/           → Global styles
│   ├── types/            → Shared TypeScript types
│   └── utils/            → Pure utility functions
└── [configs]             → vite, tsconfig, eslint, prettier, vercel…
```

---

## Folder details

### `public/`

Files served **as-is** by Vite. No imports, no transforms.
- `fonts/` → `.woff2` files referenced in `@font-face` via absolute URL `/fonts/...`
- `images/` → `favicon.svg`, `og-image.png`, robots.txt...

> **Rule**: if a file is **imported** in code → it goes in `src/assets/`.
> If it's **referenced by URL** → it goes in `public/`.

### `src/app/`

The application core. Contains:
- `App.tsx` → Entry point: ErrorBoundary + BrowserRouter + Providers
- `routes/index.tsx` → All route configuration (lazy loading)
- `layouts/RootLayout.tsx` → Shared wrapper (Header + Outlet + Footer)

### `src/assets/`

Files **imported** in code (Vite transforms, hashes, and optimizes them):
- `fonts/` → Fonts imported via `@font-face` in `fonts.css`
- `images/` → Images imported in components via `import`
- `icons/` → SVGs imported as React components

### `src/components/`

**Reusable** components used across multiple pages:
- `ui/` → Atoms: Button, Input, Badge, Card, Modal…
- `layout/` → Page structure: Header, Footer, Sidebar, Nav…
- `features/` → Logic-bound components (ErrorBoundary, Toast…)

> **Rule**: a component belongs here only if it's used in **2+ pages**.
> If it's specific to a feature, it goes in `src/features/<name>/`.

### `src/config/`

Application configuration:
- `cloudinary.ts` → Centralized helper for Cloudinary URLs

### `src/constants/`

Constant values used throughout the app:
- `routes.ts` → All app URLs. **Never** hardcode strings in components.

### `src/context/`

React Contexts for global state: ThemeContext, AuthContext…

### `src/data/`

Static data: content JSON, fixtures, mock data.
Useful for showcase sites where content is hardcoded (no CMS).

### `src/features/`

For **complex features** that deserve their own folder:

```
src/features/counter/        ← example included in the starter
├── Counter.tsx              → Main component
├── useCounter.ts            → Feature-specific hook
├── types.ts                 → Feature-specific types
└── index.ts                 → Barrel export
```

> **Rule**: a feature gets its own folder when it has **3+ related files**.
> The `counter/` example is a reference model — delete it when you start a real project.

### `src/hooks/`

Custom hooks **shared** across multiple components/pages:
`useMediaQuery`, `useScroll`, `useSEO`…

### `src/lib/`

Wrappers and abstractions for third-party libraries: analytics, i18n, etc.
Goal: **isolate** dependencies so a library swap only touches one file.

### `src/pages/`

**1 file = 1 page = 1 route.** Always lazy-loaded in `routes/index.tsx`.
- `Home.tsx`, `About.tsx`, `Contact.tsx`, `NotFound.tsx`…

### `src/styles/`

Global styles:
- `fonts.css` → `@font-face` declarations
- `animations.css` → Global keyframes

> **Rule**: design tokens (colors, fonts) are defined in `@theme` inside `src/index.css`. That's the **source of truth** for the design system (Tailwind v4 CSS-first).

### `src/types/`

Shared TypeScript types: `common.ts` for utility types, global interfaces…

### `src/utils/`

Pure utility functions: `cn()` (class merge), formatters, parsers…

---

## Naming conventions

| Type | Convention | Example |
|---|---|---|
| React component | PascalCase | `HeroSection.tsx` |
| Hook | camelCase with `use` | `useMediaQuery.ts` |
| Utility | camelCase | `formatDate.ts` |
| Constant | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Type/Interface | PascalCase | `CloudinaryImage` |
| CSS file | kebab-case | `animations.css` |
| Folder | kebab-case | `hero-section/` |

---

## Adding a page

```bash
# 1. Create the page
# src/pages/About.tsx

# 2. Add the route in constants/routes.ts
# ABOUT: '/about',

# 3. Add in src/app/routes/index.tsx
# const About = lazy(() => import('@pages/About'));
# <Route path={ROUTES.ABOUT} element={<About />} />
```

## Adding a complex feature

```bash
mkdir -p src/features/my-feature
# Create: index.ts, types.ts, MyFeature.tsx
# + hooks/ if custom hooks are needed
```
