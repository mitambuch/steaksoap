# Starter

> Production-ready React 19 + TypeScript + Vite 7 + Tailwind CSS 4 boilerplate — with strict conventions, AI-assisted workflow, and automated releases.

[![CI](https://github.com/Mircooo/starter/actions/workflows/ci.yml/badge.svg)](https://github.com/Mircooo/starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![pnpm](https://img.shields.io/badge/pnpm-10-orange)

---

## Why this starter?

Most starters are either too simple (hello world) or too complex (40 dependencies, 2 hours to understand). This one sits in between:

- **Strict conventions from day one** — commit format, folder structure, linting, releases
- **AI-ready** — ships with a `CLAUDE.md` that gives any AI agent full context on your project
- **Zero config to start** — clone, init, dev. Everything works in under 3 minutes
- **5 production dependencies** — React, ReactDOM, React Router, clsx, tailwind-merge. That's it.

Built through [vibe coding](https://en.wikipedia.org/wiki/Vibe_coding) with AI agents. Simple by design, documented so anyone can pick it up.

---

## Quick Start

```bash
# Clone and init (everything is automated)
git clone https://github.com/Mircooo/starter.git my-project
cd my-project
node scripts/init.js

# Start dev server
pnpm dev
# → http://localhost:5173
```

The `init.js` script handles everything: remotes, GitHub repo, package.json, .env.local, deps, validation, initial commit + push.

---

## Stack

| Tool | Role |
|---|---|
| **React 19** | UI framework |
| **TypeScript 5** | Strict typing (`any` forbidden) |
| **Vite 7** | Bundler + dev server (instant HMR) |
| **Tailwind CSS 4** | Utility-first CSS (CSS-first via `@theme`) |
| **React Router 7** | SPA routing |
| **Cloudinary** | Optimized image CDN |
| **ESLint** | Code linting (a11y + import sort + hooks + type-aware) |
| **Prettier** | Automatic code formatting |
| **Husky** | Git hooks (pre-commit + commit-msg) |
| **commitlint** | Conventional Commits validation |
| **lint-staged** | Lint only staged files |
| **release-it** | Automated releases + CHANGELOG |
| **vite-plugin-sitemap** | Auto-generated sitemap + robots.txt |
| **Vitest** | Unit + component testing |
| **GitHub Actions** | CI pipeline (lint + typecheck + tests + build) |

---

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Development server (HMR) |
| `pnpm build` | Production build |
| `pnpm validate` | **Lint + typecheck + tests + build** (the final check) |
| `pnpm init:project` | New project: interactive setup script |
| `pnpm setup` | Setup: install + .env.local + validate |
| `pnpm setup:update` | Pull updates from the starter template |
| `pnpm release` | Release: bump + CHANGELOG + tag + GitHub Release |

---

## Structure

```
src/
├── app/              → App root, routes, layouts
├── components/
│   ├── ui/           → Atoms (Button, Input, Card…)
│   ├── layout/       → Header, Footer, Nav…
│   └── features/     → ErrorBoundary, SeoHead…
├── config/           → env.ts, site.ts, cloudinary.ts
├── constants/        → Routes, constant values
├── pages/            → One page = one route
├── styles/           → Design tokens, fonts, animations
├── hooks/            → Custom hooks
├── types/            → Shared TypeScript types
└── utils/            → Pure functions (cn…)
```

**Path aliases**: `@components/`, `@hooks/`, `@config/`… never `../../..`.

---

## Git — Automated

Every `git commit` automatically triggers:
1. **pre-commit**: ESLint --fix + Prettier on staged files
2. **commit-msg**: Conventional Commits format validation

Commit messages: `type(scope): description`

| Type | Usage |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring |
| `style` | CSS / design |
| `chore` | Config, deps, CI |
| `docs` | Documentation |

---

## Releases

```bash
pnpm release          # auto bump + CHANGELOG + GitHub Release
pnpm release:patch    # 0.2.0 → 0.2.1
pnpm release:minor    # 0.2.0 → 0.3.0
pnpm release:major    # 0.2.0 → 1.0.0
```

---

## Customize for your project

After `node scripts/init.js`, edit:
- `.env.local` → Cloudinary cloud name, app name, URL (also used for sitemap hostname)
- `src/config/site.ts` → contact info, social links, SEO defaults
- `src/index.css` → colors, fonts (`@theme` block)
- `vite.config.ts` → add new SPA routes to the sitemap plugin's `dynamicRoutes`

## Update from the starter

```bash
pnpm setup:update
# → Fetches + merges updates from the starter template
```

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Documentation

- [CLAUDE.md](CLAUDE.md) — AI agent instructions
- [docs/SETUP.md](docs/SETUP.md) — Full installation guide
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Folder structure
- [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) — Dependency justifications
- [CHANGELOG.md](CHANGELOG.md) — Release history

## License

[MIT](LICENSE) — Built with [Claude Code](https://claude.ai/claude-code) by [Mirco](https://github.com/Mircooo).
