# steaksoap v5 — Reference

Complete inventory of every component, hook, utility, script, command, and config in the project.

---

## UI Components (24)

All in `src/components/ui/`. Every component accepts `className` and uses `cn()`.

| Component | Props | Description |
|-----------|-------|-------------|
| **Accordion** | `type: 'single' \| 'multiple'`, `defaultOpen` | Expandable content panels |
| **Avatar** | `size: 'sm' \| 'md' \| 'lg'`, `src`, `alt`, `fallback` | Circular user image with fallback initials |
| **AvatarGroup** | `size`, `max: number` | Stacked avatars with overflow count |
| **Badge** | `variant: 'default' \| 'outline' \| 'success' \| 'warning' \| 'danger' \| 'info'`, `size: 'sm' \| 'md'` | Small colored label tag |
| **Banner** | `variant: 'info' \| 'success' \| 'warning' \| 'danger' \| 'accent'`, `dismissable` | Full-width notification bar |
| **Button** | `variant: 'primary' \| 'secondary' \| 'ghost' \| 'danger'`, `size: 'sm' \| 'md' \| 'lg' \| 'icon'`, `isLoading` | Clickable action element |
| **Card** | `padding: 'sm' \| 'md' \| 'lg' \| 'none'`, `hover` | Content container with border |
| **Divider** | `label?: string` | Horizontal separator with optional centered label |
| **EmptyState** | `icon`, `title`, `description`, `action` | Placeholder for empty content areas |
| **Input** | `label`, `error?`, `helperText?` | Text input with label and validation |
| **Kbd** | `children` | Keyboard shortcut display |
| **Modal** | `isOpen`, `onClose`, `title?` | Dialog with focus trap, backdrop, portal |
| **ProgressBar** | `value: 0-100`, `label?`, `variant`, `size: 'sm' \| 'md'`, `showLabel?` | Horizontal progress indicator |
| **Select** | `label`, `options`, `placeholder?`, `value?`, `onChange?`, `error?`, `disabled?` | Custom dropdown with keyboard nav |
| **Skeleton** | `variant: 'text' \| 'circle' \| 'rect'`, `width?`, `height?` | Animated loading placeholder |
| **Spinner** | `size: 'sm' \| 'md' \| 'lg'` | Rotating loading indicator |
| **Stat** | `label`, `value`, `trend?: { value, positive }` | Metric display card |
| **Switch** | `label`, `checked?`, `onChange?`, `disabled?` | Toggle on/off control |
| **Tabs** | `defaultValue`, compound: `TabsList`, `TabsTrigger`, `TabsContent` | Switchable content panels with arrow key nav |
| **Textarea** | `label`, `error?`, `helperText?`, `rows?` | Multi-line text input |
| **ThemeToggle** | `className?` | Dark/light mode switch |
| **Timeline** | `items: TimelineItemData[]` | Vertical event timeline |
| **Toast** | Used via `useToast()` hook, compound: `ToastItem`, `ToastContainer` | Temporary notifications with auto-dismiss |
| **Tooltip** | `content`, `position: 'top' \| 'bottom' \| 'left' \| 'right'` | Hover/focus information popup |

---

## Layout Components

| Component | File | Description |
|-----------|------|-------------|
| **Header** | `src/components/layout/Header.tsx` | Fixed nav bar with logo, pill nav, theme toggle, scroll-aware styling |
| **Container** | `src/components/layout/Container.tsx` | Centered content wrapper (`size: 'sm' \| 'md' \| 'lg' \| 'xl' \| 'wide'`) |

---

## Feature Components

| Component | File | Description |
|-----------|------|-------------|
| **ErrorBoundary** | `src/components/features/ErrorBoundary.tsx` | Catches React errors, optional custom fallback, auto-resets via `resetKeys` |
| **SeoHead** | `src/components/features/SeoHead.tsx` | Per-page meta tags (title, description, OG image, canonical URL, noIndex) |

---

## Hooks

| Hook | File | Returns |
|------|------|---------|
| **useToast** | `src/hooks/useToast.ts` | `{ toast(input) => id, dismiss(id), toasts }` — global notification state |
| **useMediaQuery** | `src/hooks/useMediaQuery.ts` | `boolean` — subscribe to CSS media queries, SSR-safe |
| **useCopyToClipboard** | `src/hooks/useCopyToClipboard.ts` | `{ copy(text) => Promise<boolean>, copied }` — clipboard with feedback |

---

## Utilities

| Utility | File | Description |
|---------|------|-------------|
| **cn()** | `src/utils/cn.ts` | Merge Tailwind classes without conflicts (clsx + tailwind-merge) |

---

## Config

| File | Description |
|------|-------------|
| `src/config/env.ts` | Environment variables with safe fallbacks (APP_NAME, APP_URL, CLOUDINARY_CLOUD_NAME, IS_DEV, IS_PROD) |
| `src/config/site.ts` | Site identity: name, URL, locale, description, OG image, contact, socials, `initialized` flag |
| `src/config/cloudinary.ts` | Optional image CDN helper: `isEnabled`, `url(publicId, options)`, `srcSet(publicId, widths)` |

---

## Context

| Provider | File | Value |
|----------|------|-------|
| **ThemeProvider** | `src/context/ThemeContext.tsx` | `{ theme, toggleTheme, setTheme }` — persists in localStorage |

---

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/Home.tsx` | Landing page (tagline, headline, subline) |
| `/playground` | `src/pages/Playground.tsx` | Design system devkit — all tokens, all components |
| `/lab` | `src/pages/Lab.tsx` | Free-form experimentation sandbox |
| `*` | `src/pages/NotFound.tsx` | 404 page with radial glow and home link |

---

## Data

| File | Description |
|------|-------------|
| `src/data/pages.ts` | Centralized page copy — `homePage`, `labPage`, `playgroundPage`, `notFoundPage` (SEO + content) |

---

## App Layout & Routing

| File | Description |
|------|-------------|
| `src/app/layouts/RootLayout.tsx` | Shared wrapper: Header, skip-to-content, page transitions, Banner, ToastContainer |
| `src/app/routes/index.tsx` | React Router 7 with lazy-loaded pages and chunk retry logic |
| `src/constants/routes.ts` | Route constants: `HOME`, `PLAYGROUND`, `LAB`, `NOT_FOUND` |

---

## Styles & Tokens

| File | Description |
|------|-------------|
| `src/index.css` | Design tokens via `@theme { }` — colors, fonts, durations, z-index, scrollbar, Tailwind imports |
| `src/styles/fonts.css` | Self-hosted `@font-face`: Space Grotesk (400/500/700) + JetBrains Mono (400/500) |
| `src/styles/animations.css` | Keyframes: fadeIn, pageEnter, slideInFromRight, wizard-slide-in, electric-shimmer + reduced-motion |

### Design Tokens

| Token | Dark | Light |
|-------|------|-------|
| `--color-bg` | `#0a0a0a` | `#b0b0a8` |
| `--color-fg` | `#f0f0f0` | `#1a1a1a` |
| `--color-accent` | `#c44040` | `#c44040` (same) |
| `--color-muted` | `#8a8a8a` | `#353530` |
| `--color-surface` | `#141414` | `#a4a49c` |
| `--color-border` | `#262626` | `#96968e` |
| `--color-success` | `#6aff8a` | |
| `--color-warning` | `#ffd60a` | |
| `--color-danger` | `#dc2626` | |
| `--color-info` | `#52b0ff` | |

| Duration | Value |
|----------|-------|
| `--duration-fast` | 150ms |
| `--duration-base` | 300ms |
| `--duration-slow` | 500ms |
| `--duration-cinematic` | 700ms |

---

## Scripts

| Command | Script | Description |
|---------|--------|-------------|
| `pnpm setup` | `scripts/setup-bootstrap.js` | Interactive project setup wizard (name, repo, cleanup, initial commit) |
| `pnpm base:update` | `scripts/setup.js --update` | Full merge from upstream base |
| `pnpm base:patch` | `scripts/base-patch.js` | Selective update by zone: `infra`, `ui`, `all` |
| `pnpm release` | `scripts/release.js` | Cross-platform release-it wrapper with GitHub token |
| `pnpm doctor` | `scripts/doctor.js` | Environment health check (Node, pnpm, git, deps) |
| `pnpm done` | `scripts/done.js` | Structural coherence check (routes, tests, imports, env vars, artifacts) |
| prebuild | `scripts/sync-csp-hash.js` | Auto-sync CSP hash from inline theme script to netlify.toml + vercel.json |
| — | `scripts/fix-changelog.js` | Deduplicates "# Changelog" header after conventional-changelog |

---

## AI Commands (31)

All in `.claude/commands/`.

| Category | Commands |
|----------|---------|
| **Scaffold** | `/new-page`, `/new-component`, `/new-feature`, `/new-hook`, `/add-api` |
| **Design** | `/brief`, `/init`, `/theme`, `/design`, `/design-convert`, `/design-explore` |
| **Quality** | `/test`, `/review`, `/fix`, `/lighthouse`, `/responsive-check`, `/health-check` |
| **Ship** | `/release`, `/deploy`, `/handoff`, `/pre-delivery`, `/changelog-client` |
| **Evolve** | `/refactor`, `/migrate`, `/update-deps`, `/legal` |
| **Explore** | `/status`, `/discover`, `/connect`, `/install-extension`, `/spec` |

---

## AI Agents (4)

All in `.claude/agents/`.

| Agent | Purpose |
|-------|---------|
| **Designer** | UI/UX design with system awareness, contrast checking, responsive recipes |
| **Debugger** | Systematic bug diagnosis with tracing, isolation, and proof |
| **Reviewer** | Code review against React/TypeScript/Tailwind/a11y checklist |
| **Tester** | Write meaningful tests documenting component behavior |

---

## AI Rules (12)

All in `.claude/rules/`. Auto-loaded by context.

| Rule | Scope |
|------|-------|
| `workflow.md` | Session start, branching, batch mode, communication format |
| `components.md` | Component structure, props, a11y requirements, import boundaries |
| `styling.md` | Tailwind 4 tokens, cn(), dark mode, accent rule, reuse-first |
| `testing.md` | Vitest, Testing Library, test behavior not implementation, coverage |
| `git.md` | Conventional commits, release batching, pre-merge checklist |
| `responsive.md` | Mobile-first (320px), dual-variant thinking, touch targets |
| `performance.md` | Images, lazy loading, bundle size, GPU-only animations, Lighthouse 90+ |
| `security.md` | Env vars with fallbacks, dependency audit, no eval/innerHTML |
| `routing.md` | React Router 7, lazy loading, route organization |
| `api.md` | Data fetching patterns, AbortController, TanStack Query |
| `extensions.md` | Check registry before adding dependencies |
| `mcp-awareness.md` | MCP server registry for external capabilities |

---

## Playground

### Shared Components (`src/workbench/playground/shared/`)

| Component | Description |
|-----------|-------------|
| **Section** | Numbered section wrapper for playground layout |
| **Copyable** | Click-to-copy chip with feedback |
| **Swatch** | Color token card reading live hex from CSS custom properties |
| **IconItem** | Icon showcase item with copy-able name |
| **SubLabel** | Small uppercase label for sub-sections |

### Sections (22) (`src/workbench/playground/sections/`)

Accordion, AvatarsSkeleton, Badges, Banners, Buttons, Cards, Colors, Contact, CTA, EmptyStates, Forms, Icons, Misc, Overlays, Pricing, Stats, TabsSpinner, Testimonials, Timeline, Toast, Typography.

### Data (`src/workbench/playground/data/`)

`colors.ts`, `pricing.ts`, `testimonials.ts`, `timeline.tsx`

---

## Root Config

| File | Description |
|------|-------------|
| `vite.config.ts` | Vite 7 + React + Tailwind 4 + sitemap + bundle visualizer |
| `vitest.config.ts` | Vitest with jsdom, coverage thresholds (76/73/85/78%) |
| `playwright.config.ts` | E2E on 3 browsers, dark mode, 2 retries in CI |
| `eslint.config.js` | ESLint 9 flat config + TypeScript + jsx-a11y + import sort + import boundaries |
| `prettier.config.js` | Semi, single quotes, trailing commas, 100 width, Tailwind class sorting |
| `tsconfig.json` | Strict mode + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` + path aliases |
| `commitlint.config.js` | Conventional commits, scope required, max 72 chars |
| `.release-it.json` | Release automation: validate + done --quick, GitHub releases, changelog |
| `lighthouserc.json` | Lighthouse CI: 90+ on perf, a11y, best practices, SEO |
| `netlify.toml` | Build config + security headers (CSP, HSTS, X-Frame-Options, COOP) |
| `vercel.json` | Build config + identical security headers |
