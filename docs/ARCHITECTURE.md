# Project Architecture

## Overview

```
project/
├── .github/              → CI, PR/issue templates
├── .husky/               → Git hooks (pre-commit, commit-msg)
├── .vscode/              → Editor config (extensions, settings)
├── docs/                 → Project documentation
├── public/               → Static files served as-is
│   ├── fonts/            → Fonts (.woff2) referenced via /fonts/...
│   └── images/           → favicon.svg, og-image.jpg…
├── src/                  → Source code
│   ├── app/              → Routes, providers, app layout
│   ├── components/       → Reusable React components
│   │   ├── ui/           → Atoms: Button, Input, Badge, Card, Modal…
│   │   ├── layout/       → Header, Container
│   │   └── features/     → ErrorBoundary, SeoHead, Toast…
│   ├── config/           → env.ts, site.ts, cloudinary.ts
│   ├── constants/        → routes.ts, global constants
│   ├── context/          → React Contexts (ThemeContext…)
│   ├── data/             → Static data / fixtures
│   ├── features/         → Complex feature modules
│   ├── hooks/            → Custom React hooks
│   ├── pages/            → Pages (1 file = 1 route)
│   ├── styles/           → fonts.css, animations.css
│   ├── test/             → Test setup and utilities
│   ├── utils/            → cn(), formatters, parsers
│   ├── lib/              → API services, external integrations (created by /add-api)
│   └── workbench/        → Playground sections, shared components, data
└── [configs]             → vite, tsconfig, eslint, prettier, vercel…
```

## Key rules

- **Imported in code** → `src/` (Vite transforms it)
- **Referenced by URL** → `public/`
- Component used in **2+ pages** → `src/components/`
- Component specific to one feature → `src/features/<name>/`
- Feature with **3+ related files** → gets its own folder in `src/features/`
- Design tokens → `@theme` in `src/index.css` (source of truth, Tailwind v4 CSS-first)
- Pages → always lazy-loaded in `src/app/routes/index.tsx`

## Naming conventions

| Type | Convention | Example |
|---|---|---|
| React component | PascalCase | `HeroSection.tsx` |
| Hook | camelCase + `use` | `useMediaQuery.ts` |
| Utility | camelCase | `formatDate.ts` |
| Constant | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Type/Interface | PascalCase | `NavItem` |
| CSS file | kebab-case | `animations.css` |
| Folder | kebab-case | `hero-section/` |

## Adding a page

1. Create `src/pages/MyPage.tsx`
2. Add route in `src/constants/routes.ts`
3. Add lazy import in `src/app/routes/index.tsx`

## Adding a complex feature

```
src/features/my-feature/
├── MyFeature.tsx    → Main component
├── useMyFeature.ts  → Feature-specific hook
├── types.ts         → Feature-specific types
└── index.ts         → Barrel export
```
