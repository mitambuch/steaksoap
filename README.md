# Starter

**React starter kit. You code, the AI handles the rest.**

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 — with an AI-powered workflow that manages branches, commits, validation, and releases for you.

[![CI](https://github.com/Mircooo/starter/actions/workflows/ci.yml/badge.svg)](https://github.com/Mircooo/starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![pnpm](https://img.shields.io/badge/pnpm-10-orange)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mircooo/starter&project-name=my-project)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Mircooo/starter)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Mircooo/starter)

---

## Quick Start

```bash
# 1. Use this template on GitHub (or clone)
git clone https://github.com/Mircooo/starter.git my-project
cd my-project

# 2. Install dependencies
pnpm install

# 3. Start developing
pnpm dev
```

That's it. No env vars required. No mandatory config. `localhost:5173` is live.

Want the full setup (project name, GitHub repo, cleanup)? Run `pnpm setup` after install.

---

## What's included

- **React 19** + **TypeScript** (strict, zero `any`)
- **Vite 7** — instant HMR, fast builds
- **Tailwind CSS 4** — CSS-first config via `@theme` tokens
- **AI workflow** — `CLAUDE.md` + `.cursorrules` + Copilot instructions. Works with Claude Code, Cursor, and GitHub Copilot
- **Git automation** — Husky hooks, commitlint, lint-staged. Every commit is validated
- **Automated releases** — release-it + conventional changelog. One command to ship
- **Testing** — Vitest + Testing Library, pre-configured
- **CI/CD** — GitHub Actions (Node 20 + 22), deploy configs for Vercel and Netlify
- **Mobile-first** — designed for 375px, scales up with Tailwind breakpoints

---

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with HMR |
| `pnpm build` | Production build |
| `pnpm validate` | Lint + typecheck + test + build |
| `pnpm setup` | Interactive setup wizard |
| `pnpm setup --update` | Pull updates from starter template |
| `pnpm release` | Bump + changelog + tag + GitHub Release |

---

## AI Workflow

This starter is built for **vibe coding**. Tell the AI what you want, it handles the rest:

- **`CLAUDE.md`** — Full project context for [Claude Code](https://claude.ai/claude-code)
- **`.cursorrules`** — Same conventions for [Cursor](https://cursor.com)
- **`.github/copilot-instructions.md`** — Same conventions for [GitHub Copilot](https://github.com/features/copilot)
- **`.claude/commands/`** — Slash commands: `/new-page`, `/new-component`

The AI manages branches, commits (conventional), validation, merges, and releases automatically. You focus on what to build, not how to ship it.

---

## Customize

After `pnpm setup`:

| File | What to change |
|---|---|
| `src/index.css` | Colors, fonts (`@theme` block) |
| `src/config/site.ts` | Site name, SEO, contact info |
| `.env.local` | Cloudinary (optional), app name, URL |
| `src/pages/` | Add your pages |

---

## Documentation

| Doc | Content |
|---|---|
| [CLAUDE.md](CLAUDE.md) | AI agent instructions (the full contract) |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Folder structure and conventions |
| [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) | Every dependency justified |
| [docs/SETUP.md](docs/SETUP.md) | Step-by-step setup guide |
| [CHANGELOG.md](CHANGELOG.md) | Release history |

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE) — Built with [Claude Code](https://claude.ai/claude-code).
