# steaksoap — Developer Handoff

> This document contains everything a developer needs to understand, run,
> and maintain this project. No AI tools required.

Generated on: 2026-03-30
Project version: 4.6.1

---

## Quick Start

1. **Prerequisites**: Node.js 22+, pnpm 10+
2. `pnpm install`
3. `pnpm dev` → http://localhost:5173
4. `pnpm validate` → lint + typecheck + tests + build (must pass before any merge)

No environment variables required. Everything has safe fallbacks.

---

## What Is This Project?

steaksoap is a **private production template** for building client websites. It provides a complete React + TypeScript stack with a design system, testing infrastructure, CI/CD, and AI-assisted development tooling.

Each client project is created from this template via `pnpm setup`, which cuts the link and creates an independent repo. The template can push updates to client projects via `pnpm base:update`.

**This is not a framework** — it's a starting point. Client projects diverge freely.

---

## Tech Stack

| Layer | Tool | Version | Why |
|---|---|---|---|
| Framework | React | 19 | Component model, ecosystem, stability |
| Language | TypeScript | 5.9 | Strict mode, zero `any`, catches bugs at compile time |
| Build | Vite | 7 | Fast HMR, optimized production builds |
| Styling | Tailwind CSS | 4 | Utility-first, design tokens via CSS-native `@theme` |
| Testing | Vitest | latest | Vite-native, fast, compatible with Testing Library |
| E2E Testing | Playwright | latest | Cross-browser (Chromium, Firefox, WebKit) |
| Linting | ESLint 9 + Prettier | latest | Auto-fixed on commit via Husky pre-commit hook |
| Commit enforcement | commitlint + Husky | latest | Conventional commit format enforced |
| Package manager | pnpm | 10 | Fast, strict, disk-efficient |
| Icons | Lucide React | latest | Tree-shakable SVG icons |
| Class merging | clsx + tailwind-merge | latest | `cn()` utility handles Tailwind class conflicts |

**Production dependencies: 6 total.** Minimal attack surface.

---

## Architecture

```
src/
├── app/              → Routes, providers, root layout
│   ├── routes/       → Route definitions (lazy-loaded)
│   └── layouts/      → Shared layouts
├── components/
│   ├── ui/           → 24 reusable atoms (Button, Card, Modal, Select, Tabs…)
│   ├── layout/       → Header, Container
│   └── features/     → ErrorBoundary, SeoHead
├── config/           → env.ts (with fallbacks), site.ts, cloudinary.ts
├── constants/        → routes.ts, global constants
├── context/          → React Contexts (ThemeContext)
├── features/         → Complex feature modules
├── hooks/            → Custom React hooks (useMediaQuery, useCopyToClipboard, useToast)
├── pages/            → Page components (one per route, default export for lazy loading)
├── styles/           → fonts.css, animations.css
├── test/             → Test setup and utilities
├── utils/            → cn() helper
└── workbench/        → Playground sections, shared visual components
```

### Key Patterns

- **Design tokens** live in `src/index.css` inside the `@theme { }` block — single source of truth
- **Pages** are lazy-loaded in `src/app/routes/index.tsx` via `React.lazy()`
- **Components** use `cn()` from `@utils/cn` for conditional class merging
- **Path aliases**: `@components`, `@hooks`, `@pages`, `@utils`, `@config`, `@features`, `@constants`, `@context`, `@workbench`, `@lib`
- **Import boundaries** enforced by ESLint — `ui/` cannot import from `features/` or `pages/`

---

## Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Landing page |
| `/playground` | `src/pages/Playground.tsx` | Design system showcase (all tokens, all components) |
| `/lab` | `src/pages/Lab.tsx` | Free-form experimentation sandbox |
| `*` | `src/pages/NotFound.tsx` | 404 page with link back to home |

**Protected pages**: `/playground` and `/lab` must never be deleted. They serve as the design system reference.

Route constants are in `src/constants/routes.ts`. Never hardcode route strings — always import from there.

---

## Design System

### Colors (from `src/index.css` @theme)

| Token | Dark mode | Light mode | Usage |
|---|---|---|---|
| `--color-bg` | `#0a0a0a` | `#b0b0a8` | Page background |
| `--color-fg` | `#f0f0f0` | `#1a1a1a` | Primary text |
| `--color-accent` | `#c44040` | `#c44040` | Interactive elements, highlights |
| `--color-muted` | `#8a8a8a` | `#4a4a44` | Secondary text |
| `--color-surface` | `#141414` | `#a4a49c` | Cards, elevated surfaces |
| `--color-border` | `#262626` | `#96968e` | Borders, dividers |
| `--color-on-accent` | `#ffffff` | `#ffffff` | Text on accent backgrounds |

**The accent color is identical in dark and light mode.** This is a brand decision, not a bug.

For transparent accent usage (box-shadow, gradients): use `color-mix(in srgb, var(--color-accent) X%, transparent)`.

### Fonts

| Token | Font | Loaded from |
|---|---|---|
| `--font-family-sans` | Space Grotesk (400, 500, 700) | Self-hosted (`public/fonts/`) |
| `--font-family-mono` | JetBrains Mono (400, 500) | Self-hosted (`public/fonts/`) |

### Status Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#6aff8a` | Success states |
| `--color-warning` | `#ffd60a` | Warning states |
| `--color-danger` | `#dc2626` | Error states, destructive actions |
| `--color-info` | `#52b0ff` | Informational states |

### UI Components (src/components/ui/)

24 tested, accessible atoms: Accordion, Avatar, AvatarGroup, Badge, Banner, Button, Card, Divider, EmptyState, Input, Kbd, Modal, ProgressBar, Select, Skeleton, Spinner, Stat, Switch, Tabs, Textarea, ThemeToggle, Timeline, Toast, Tooltip.

Each component:
- Accepts `className` prop for override
- Uses `cn()` for class merging
- Has unit tests + accessibility tests (vitest-axe)
- Has a human-readable comment header explaining WHAT, WHEN, and HOW TO CHANGE

---

## How To...

### Add a new page

1. Create `src/pages/MyPage.tsx` with a default export
2. Add route constant in `src/constants/routes.ts`: `MY_PAGE: '/my-page'`
3. Add lazy import in `src/app/routes/index.tsx`:
   ```tsx
   const MyPage = lazy(() => import('@pages/MyPage'));
   // In the route config: { path: ROUTES.MY_PAGE, element: <MyPage /> }
   ```
4. Add test in `src/pages/__tests__/MyPage.test.tsx`
5. Run `pnpm validate`

### Add a new component

1. Create in `src/components/ui/` (reusable) or `src/features/X/` (feature-specific)
2. Use named export, PascalCase filename
3. Accept `className?: string` prop
4. Add human-readable comment header
5. Add test in adjacent `__tests__/` folder
6. Run `pnpm validate`

### Change the color theme

1. Edit `src/index.css` → `@theme { }` block (change `--color-accent`, etc.)
2. Check both dark AND light mode in the Playground page
3. Run `pnpm validate`

### Deploy

**Vercel**: Push to main. CI runs, then Vercel auto-deploys. Config in `vercel.json`.
**Netlify**: Push to main. Config in `netlify.toml`.

Both configs include security headers (CSP, HSTS, X-Frame-Options).

### Run tests

| Command | What |
|---|---|
| `pnpm test` | Run all tests once |
| `pnpm test:watch` | Watch mode |
| `pnpm test:coverage` | Coverage report (HTML in `coverage/`) |
| `pnpm test:e2e` | E2E tests (Chromium + Firefox + WebKit) |

### Create a release

```bash
pnpm release
```
Interactive: detects version bump from commits, generates CHANGELOG, creates git tag + GitHub release.

---

## Environment Variables

All defined in `src/config/env.ts` with fallbacks. The app runs without any `.env.local` file.

| Variable | Default | Description |
|---|---|---|
| `VITE_APP_NAME` | `"Project"` | Used in SEO titles, meta tags |
| `VITE_APP_URL` | `"http://localhost:5173"` | Canonical URLs, OG tags |
| `VITE_CLOUDINARY_CLOUD_NAME` | `""` (disabled) | Optional image CDN |

To customize: copy `.env.example` to `.env.local` and edit.

**Never put secrets in VITE_ variables** — they are bundled into client code.

---

## Git Workflow

1. **Never commit to main directly** — branch first: `git checkout -b feat/my-feature`
2. **Conventional commits** enforced: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
3. **Pre-commit hook** (Husky): auto-runs ESLint + Prettier on staged files
4. **Commit message hook**: validates conventional format via commitlint
5. **Before merging**: `pnpm validate` must pass
6. **Merge**: always `--no-ff` to preserve branch history

---

## CI/CD

Two GitHub Actions workflows:

### ci.yml (on push to main + PRs)
1. **Validate** (Node 22): lint → typecheck → test → build
2. **Security audit**: `pnpm audit --prod --audit-level=high`
3. **Bundle size check**: warns if total dist > 500KB
4. **E2E tests**: Playwright on Chromium + Firefox + WebKit (reuses build artifact)
5. **Lighthouse CI**: Performance, A11y, Best Practices, SEO (all require 90+ score, reuses build artifact)

### dependency-review.yml (on PRs)
- Blocks PRs with moderate+ severity vulnerabilities
- Blocks GPL-3.0 and AGPL-3.0 licenses
- Comments findings on the PR

### Dependabot
- Weekly npm dependency updates
- Monthly GitHub Actions updates

---

## Security

- **CSP**: Strict Content-Security-Policy (self + Cloudinary only — no external font/script CDNs)
- **HSTS**: 2-year max-age with includeSubDomains and preload
- **X-Frame-Options**: DENY (prevents clickjacking)
- **Permissions-Policy**: Disables camera, microphone, geolocation, payment, USB
- **Dependencies**: 6 production deps, auto-audited weekly
- **No eval**, no dangerouslySetInnerHTML, no innerHTML

---

## Technical Decisions

| Decision | Why |
|---|---|
| Accent #c44040 same in dark and light mode | Brand consistency — never change per-theme |
| Light mode bg is warm gray (#b0b0a8) | Design aesthetic, not near-white |
| No state management library | React built-in is sufficient for vitrine sites. Add Zustand if needed |
| No data fetching library | No API calls by default. Add TanStack Query if needed |
| Tailwind CSS 4 (CSS-native) | Faster than PostCSS config, future-proof |
| Lazy loaded routes | Every page is code-split for performance |
| vitest-axe on every component | Accessibility is not optional |
| Space Grotesk + JetBrains Mono | Swiss brutalist aesthetic |

---

## The .claude/ Directory

This folder contains AI-assisted development tooling: 31 commands, 12 rules, 4 agents.
**It is completely optional.** Removing `.claude/` does not affect the app in any way.
The app compiles and runs identically without it. It's a productivity layer, not a dependency.

---

## Useful Commands

| Command | What |
|---|---|
| `pnpm dev` | Dev server with HMR |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm validate` | Lint + typecheck + test + build (the gate) |
| `pnpm test` | Unit tests |
| `pnpm test:e2e` | E2E tests (3 browsers) |
| `pnpm test:coverage` | Coverage report |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format all files with Prettier |
| `pnpm setup` | Interactive project setup wizard |
| `pnpm base:update` | Pull updates from the upstream template |
| `pnpm release` | Create a versioned release with changelog |
| `pnpm doctor` | Check environment health |
| `pnpm done` | Structural coherence check (routes ↔ pages sync, etc.) |
