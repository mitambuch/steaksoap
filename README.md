# project-base

Private production base for front-end projects.
React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 4.

---

## What this is

An internal foundation optimized for fast, clean front-end work:

- **Concept presentations** and landing pages
- **Premium showcase sites** and client websites
- **Projects connecting to external APIs** (REST, GraphQL, headless CMS)
- **Optional Sanity integration** (add when needed, not baked in)

Not a public template. Not a framework. A disciplined starting point.

## Quick start

```bash
# Clone from the canonical base
git clone git@github.com:Mircooo/steaksoap.git my-project
cd my-project
pnpm install
pnpm setup          # Interactive wizard — name, repo (private), cleanup
pnpm dev            # → http://localhost:5173
```

Then in Claude Code, run `/brief` (design direction) then `/init` (colors, fonts, styling).

## Keeping projects up to date

Two strategies for pulling upstream improvements:

### Selective patch (recommended)

```bash
pnpm base:patch
```

Cherry-pick updates by zone — only pull what you need, avoid merge conflicts:

| Zone | What it updates |
|------|----------------|
| `infra` | `.claude/`, `scripts/`, config files |
| `ui` | `src/components/ui/`, `src/components/layout/` |
| `all` | Full merge (same as `base:update`) |

```bash
pnpm base:patch infra    # infrastructure only
pnpm base:patch ui       # UI components only
```

### Full merge

```bash
pnpm base:update
```

Fetches and merges everything from `base/main`. Resolve conflicts if any, then commit.

### Remote setup

The `base` remote is configured automatically during `pnpm setup`. If you need to add it manually:

```bash
git remote add base https://github.com/Mircooo/steaksoap.git
```

## Tech stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19 |
| Language | TypeScript | 5.9 (strict, all flags) |
| Bundler | Vite | 7 |
| Styling | Tailwind CSS | 4 |
| Testing | Vitest + Playwright | latest |
| Linting | ESLint 9 + Prettier | latest |
| Package manager | pnpm | 10 |
| Icons | Lucide React | latest |

## Design system

All tokens live in [`src/index.css`](src/index.css) — single source of truth.

| Token | Dark | Light |
|-------|------|-------|
| `accent` | #c44040 | #c44040 |
| `bg` | #0A0A0A | #B0B0A8 |
| `fg` | #F0F0F0 | #1A1A1A |
| `surface` | #141414 | #A4A49C |
| `muted` | #8A8A8A | #4A4A44 |

Fonts: **Space Grotesk** (sans) + **JetBrains Mono** (mono).
Duration tokens: `fast` (150ms), `base` (300ms), `slow` (500ms), `cinematic` (700ms).

Customize per project via `/init` or edit `src/index.css` directly.

## AI workflow

24 slash commands, 4 specialized agents, 12 contextual rules — all in `.claude/`.

| Category | Commands |
|----------|----------|
| **Scaffold** | `/new-page`, `/new-component`, `/new-feature`, `/new-hook`, `/add-api` |
| **Quality** | `/test`, `/review`, `/fix`, `/lighthouse`, `/responsive-check` |
| **Ship** | `/release`, `/deploy`, `/commit` |
| **Evolve** | `/brief`, `/init`, `/refactor`, `/migrate`, `/theme`, `/update-deps` |
| **Explore** | `/status`, `/discover`, `/connect`, `/install-extension`, `/spec` |

## Architecture

```
src/
├── app/                — routes, providers, layout
├── components/
│   ├── ui/             — reusable atoms (Button, Card, Modal, Select, Tabs…)
│   ├── layout/         — Header, Container
│   └── features/       — ErrorBoundary, SeoHead
├── config/             — env.ts, site.ts, cloudinary.ts
├── context/            — ThemeContext
├── features/           — feature modules (component + hook + types)
├── hooks/              — useToast, useMediaQuery, useCopyToClipboard, useDebounce, useInView
├── pages/              — page components (one per route)
├── styles/             — fonts.css, animations.css
├── utils/              — cn(), helpers
├── lib/                — API services
└── workbench/          — playground sections, shared components
```

## Scripts

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Dev server (port 5173) |
| `pnpm build` | Production build |
| `pnpm validate` | Lint + typecheck + test + build |
| `pnpm test:coverage` | Unit tests with coverage report |
| `pnpm test:e2e` | Playwright E2E tests |
| `pnpm release` | Version bump + changelog + tag |
| `pnpm setup` | Interactive project setup wizard |
| `pnpm base:update` | Pull updates from upstream base |
| `pnpm analyze` | Bundle size visualization |
| `pnpm doctor` | Project health check |

## Testing

- **Unit**: Vitest with jsdom, 340+ tests, 75%+ coverage thresholds
- **E2E**: Playwright on production build
- **A11y**: axe-core integration (unit + E2E)
- **Lighthouse CI**: a11y/best-practices/SEO ≥ 0.9, performance ≥ 0.8

## CI/CD

GitHub Actions pipeline:
1. **validate** — ESLint, TypeScript, Vitest, Vite build (Node 20 + 22 matrix)
2. **e2e** — Playwright on built preview
3. **lighthouse** — Performance + a11y scores

## Security headers & external services

The base ships with strict CSP and security headers in [`netlify.toml`](netlify.toml) and [`vercel.json`](vercel.json).

When connecting to external APIs, Sanity, or third-party services, you'll need to expand these per project:

```
# Example: adding Sanity CDN and an external API
img-src 'self' data: https://cdn.sanity.io https://res.cloudinary.com;
connect-src 'self' https://api.example.com https://*.sanity.io;
```

**Where to adjust:**
- `netlify.toml` → `Content-Security-Policy` header value
- `vercel.json` → `Content-Security-Policy` header value
- For other platforms: configure equivalent headers in your deployment config

Do not loosen security globally. Add only the domains your project actually uses.

## Principles

- **Reuse-first** — check `components/ui/` before creating anything new
- **Token-first** — no local colors/spacing if a token covers the need
- **Branch-first** — never commit to `main` directly
- **Validate-first** — `pnpm validate` before every commit
