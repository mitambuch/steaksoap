# Installation Guide

This guide helps any developer or AI agent get the project running in 5 minutes.

---

## Prerequisites

| Tool | Min. version | Why |
|---|---|---|
| **Node.js** | 20+ | JavaScript runtime |
| **pnpm** | 10+ | Package manager (declared in `package.json` → `packageManager`) |
| **Git** | 2.40+ | Version control |
| **GitHub CLI** (`gh`) | 2+ | Authentication for releases (`pnpm release`) |

### Quick prerequisite install

```bash
# Node.js — via nvm (recommended)
nvm install 20
nvm use 20

# pnpm — via corepack (built into Node.js)
corepack enable
corepack prepare pnpm@10 --activate

# GitHub CLI — check auth
gh auth status
# If not authenticated:
gh auth login
```

---

## Project installation

```bash
# 1. Clone the repo
git clone https://github.com/Mircooo/starter.git
cd starter

# 2. Automatic setup (installs, creates .env.local, validates)
pnpm install && pnpm setup

# 3. Fill in .env.local with your values

# 4. Start the dev server
pnpm dev
# → http://localhost:5173
```

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
| `pnpm init:project` | **New project**: interactive script that configures everything |
| `pnpm setup` | Automatic setup: install + .env.local + validate |
| `pnpm setup:update` | Pull updates from the starter template |
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

## Verify everything works

```bash
# After installation, these should all pass:
pnpm validate          # → lint OK, types OK, tests OK, build OK
pnpm dev               # → server starts without errors
```

---

## New project from the starter

```bash
# 1. Clone the starter
git clone https://github.com/Mircooo/starter.git my-project
cd my-project

# 2. Run the interactive script (everything is automated)
node scripts/init.js
```

The `init.js` script does everything automatically:
- Asks for project name + display name
- Renames the `origin` remote → `template` (keeps the link for updates)
- Creates a GitHub repo + adds it as `origin` (via `gh`)
- Updates `package.json` with the project name
- Creates `.env.local` with the display name
- Installs dependencies
- Validates (lint + typecheck + tests + build)
- Initial commit + push

Then customize for your project:
- `.env.local` → Cloudinary cloud name, production URL
- `src/config/site.ts` → contact info, social links, SEO defaults
- `src/index.css` → client colors, fonts (`@theme` block)
- `public/robots.txt` → sitemap URL
- `public/images/og-image.jpg` → social media share image

## Update from the starter

If the starter has been improved (new config, fixes, upgrades), you can pull the changes:

```bash
pnpm setup:update
# → Fetches + merges updates from the starter template
# → If there are conflicts, resolve them manually then git commit
```

This works because the `template` remote points to the starter repo.
Git smartly merges the starter changes with your project code.
