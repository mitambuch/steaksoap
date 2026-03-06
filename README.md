# steaksoap

AI-first React starter kit for vibe coders. Clone, setup, ship.

[![Version](https://img.shields.io/badge/version-4.0.0-c44040)](https://github.com/Mircooo/steaksoap/releases)
[![Build](https://img.shields.io/github/actions/workflow/status/Mircooo/steaksoap/ci.yml?branch=main)](https://github.com/Mircooo/steaksoap/actions)
[![Coverage](https://img.shields.io/badge/coverage-75%25-brightgreen)](#testing)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-339933)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D9-f69220)](https://pnpm.io/)

---

## Why steaksoap?

- **AI-native workflow** — 23 slash commands + 4 agents + 12 contextual rules. Claude Code understands your project structure out of the box.
- **Design system included** — Classe2 "brutaliste suisse" aesthetic. Dark + light mode, tokenized colors, durations, and typography. Single source of truth in `src/index.css`.
- **Production-grade quality** — TypeScript strict (all flags), ESLint 9, Prettier, Husky, commitlint, 75%+ test coverage, Lighthouse CI, Playwright E2E.
- **Clinical duplication** — `pnpm setup` wizard transforms the template into your project. Name, colors, fonts, routes — everything adapts.
- **Zero config CI/CD** — GitHub Actions with matrix testing (Node 20+22), dependency review, security audit, bundle size checks, and Lighthouse scores.

## Quick start

```bash
npx degit Mircooo/steaksoap my-project
cd my-project
pnpm install
pnpm setup          # Interactive wizard — name, colors, cleanup
pnpm dev            # → http://localhost:5173
```

## Tech stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19 |
| Language | TypeScript | 5.9 |
| Bundler | Vite | 7 |
| Styling | Tailwind CSS | 4 |
| Testing | Vitest + Playwright | latest |
| Linting | ESLint 9 + Prettier | latest |
| Package manager | pnpm | 10 |
| Icons | Lucide React | latest |

## Features

### Design system

All tokens live in [`src/index.css`](src/index.css) — single source of truth.

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `accent` | #c44040 | #c44040 | CTAs, hovers, highlights |
| `bg` | #0A0A0A | #B0B0A8 | Page background |
| `fg` | #F0F0F0 | #1A1A1A | Primary text |
| `surface` | #141414 | #A4A49C | Cards, panels |
| `muted` | #8A8A8A | #4A4A44 | Secondary text |

Fonts: **Space Grotesk** (sans) + **JetBrains Mono** (mono). Duration tokens: `fast` (150ms), `base` (300ms), `slow` (500ms), `cinematic` (700ms).

See [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) for full reference.

### AI workflow

23 slash commands, 4 specialized agents, 12 contextual rules.

| Category | Commands |
|----------|----------|
| **Scaffold** | `/new-page`, `/new-component`, `/new-feature`, `/new-hook`, `/add-api` |
| **Quality** | `/test`, `/review`, `/fix`, `/lighthouse`, `/responsive-check` |
| **Ship** | `/release`, `/deploy`, `/commit` |
| **Evolve** | `/refactor`, `/migrate`, `/theme`, `/init`, `/update-deps` |
| **Explore** | `/status`, `/discover`, `/connect`, `/install-extension`, `/spec` |

Agents: `debugger`, `designer`, `reviewer`, `tester` — each with focused context and tools.

Full reference: [docs/commands.md](docs/commands.md).

### Testing

- **Unit**: Vitest with jsdom, 340+ tests, 75%+ coverage thresholds
- **E2E**: Playwright on production build (not dev server)
- **A11y**: axe-core integration (unit + E2E)
- **Lighthouse CI**: a11y/best-practices/SEO ≥ 0.9, performance ≥ 0.8

```bash
pnpm test              # Unit tests
pnpm test:coverage     # Coverage report
pnpm test:e2e          # Playwright E2E
pnpm validate          # Lint + typecheck + test + build
```

### CI/CD

GitHub Actions pipeline:
1. **validate** — ESLint, TypeScript, Vitest, Vite build (Node 20 + 22 matrix)
2. **e2e** — Playwright on built preview
3. **lighthouse** — Performance + a11y scores

Plus: Dependabot weekly updates, dependency-review on PRs, security audit.

## Architecture

```
src/
├── app/                — routes, providers, layout
├── components/
│   ├── ui/             — 24 reusable atoms (Button, Card, Modal, Select, Tabs…)
│   ├── layout/         — Header, Footer, Container, CursorGlow
│   └── features/       — ErrorBoundary, SeoHead
├── config/             — env.ts, site.ts, cloudinary.ts
├── context/            — ThemeContext
├── features/           — feature modules (component + hook + types)
├── hooks/              — useToast, useMediaQuery, useCopyToClipboard, useDebounce, useInView
├── pages/              — page components (one per route)
├── styles/             — fonts.css, animations.css
├── utils/              — cn(), helpers
├── lib/                — API services
└── workbench/          — playground sections, shared components, data
```

**Path aliases**: `@components`, `@hooks`, `@pages`, `@utils`, `@config`, `@features`, `@context`, `@workbench`, `@lib`, `@styles`, `@constants`, `@data`, `@app`.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Showcase landing — brutaliste swiss design |
| `/playground` | Interactive design system — all tokens, all components |
| `/lab` | Experimentation sandbox — prototypes and ideas |

## Principles

- **Reuse-first** — check `components/ui/` before creating anything new
- **Token-first** — no local colors/spacing if a token covers the need
- **Branch-first** — never commit to `main` directly
- **Validate-first** — `pnpm validate` before every commit

## Scripts

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Dev server (port 5173) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm validate` | Lint + typecheck + test + build |
| `pnpm test:coverage` | Unit tests with coverage report |
| `pnpm test:e2e` | Playwright E2E tests |
| `pnpm release` | Version bump + changelog + tag |
| `pnpm setup` | Interactive project setup wizard |
| `pnpm doctor` | Project health check |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Run `pnpm validate` before committing
4. Open a pull request

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) with scope: `feat(ui): add tooltip component`.

## License

[MIT](LICENSE) — Mirco
