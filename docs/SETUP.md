# Installation Guide

This guide helps any developer or AI agent get the project running in 5 minutes.

---

## Prerequisites

| Tool | Min. version | Why |
|---|---|---|
| **Node.js** | 20+ | JavaScript runtime |
| **pnpm** | 10+ | Package manager (declared in `package.json` → `packageManager`) |
| **Git** | 2.40+ | Version control |
| **GitHub CLI** (`gh`) | 2+ | Optional — for repo creation and releases |

### Quick prerequisite install

```bash
# Node.js — via nvm (recommended)
nvm install 20
nvm use 20

# pnpm — via corepack (built into Node.js)
corepack enable
corepack prepare pnpm@10 --activate

# GitHub CLI — check auth (optional)
gh auth status
# If not authenticated:
gh auth login
```

---

## Quick start (3 steps)

```bash
# 1. Use this template on GitHub, or clone
git clone https://github.com/mitambuch/steaksoap.git my-project
cd my-project

# 2. Install dependencies
pnpm install

# 3. Start developing
pnpm dev
# → http://localhost:5173
```

No environment variables required. Everything has safe fallbacks.
To customize (e.g., enable Cloudinary), copy `.env.example` to `.env.local`.
See `src/config/env.ts` for all available variables and their defaults.

---

## Full setup (new project)

After `pnpm install`, run the interactive wizard:

```bash
pnpm setup
```

The wizard will:
1. Ask for your project name and display name (3 questions max)
2. Auto-detect your GitHub user and optionally create a repo
3. Update `package.json`, `.env.local`, and `CHANGELOG.md`
4. Clean up demo/showcase files
5. Validate everything (lint + typecheck + tests + build)
6. Create the initial commit and push

### Non-interactive mode (CI)

```bash
pnpm setup --yes
```

Accepts all defaults without prompting. Useful for CI/testing.

---

## Available commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start the development server (HMR) |
| `pnpm build` | Build the site for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Check code errors (ESLint) |
| `pnpm lint:fix` | Auto-fix what can be fixed |
| `pnpm format` | Format all code with Prettier |
| `pnpm typecheck` | Check TypeScript types |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm validate` | Lint + typecheck + tests + build — **the final check** |
| `pnpm setup` | Interactive setup wizard (or light setup if already initialized) |
| `pnpm setup --update` | Pull updates from the steaksoap template |
| `pnpm release` | Interactive release: bump + CHANGELOG + tag + GitHub Release |
| `pnpm release:patch` | Force a patch bump (0.1.0 → 0.1.1) |
| `pnpm release:minor` | Force a minor bump (0.1.0 → 0.2.0) |
| `pnpm release:major` | Force a major bump (0.1.0 → 1.0.0) |

---

## Recommended VS Code extensions

When you open the project, VS Code will offer to install the recommended extensions
(see `.vscode/extensions.json`). Accept to get:

- **ESLint** — Real-time error detection
- **Prettier** — Format on save
- **Tailwind CSS IntelliSense** — Class autocompletion
- **GitLens** — Enhanced git history
- **Git Graph** — Commit tree visualization
- **Conventional Commits** — Commit message helper
- **Error Lens** — Inline error display
- **Path Intellisense** — File path autocompletion
- **DotENV** — `.env` file syntax highlighting

---

## Customize for your project

After `pnpm setup`, edit:

| File | What to change |
|---|---|
| `src/index.css` | Colors, fonts (`@theme` block) |
| `src/config/site.ts` | Site name, SEO defaults, contact info, social links |
| `.env.local` | Cloudinary cloud name (optional), app name, URL |
| `vite.config.ts` | Add SPA routes to sitemap `dynamicRoutes` |

---

## Update from steaksoap

If steaksoap has been improved (new config, fixes, upgrades), pull the changes:

```bash
pnpm setup --update
```

This fetches and merges updates from the steaksoap template.
If there are conflicts, resolve them manually then `git add . && git commit`.

This works because the `template` remote points to the steaksoap repo.
Git smartly merges the template changes with your project code.

---

## Verify everything works

```bash
pnpm validate   # → lint OK, types OK, tests OK, build OK
pnpm dev        # → server starts without errors
```
