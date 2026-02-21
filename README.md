# steaksoap

**AI-first React starter kit for vibe coders.**

You describe it. The AI builds it. Zero git knowledge needed, zero config, zero bullshit.

Not another React boilerplate — a complete vibe coding workflow with Claude Code commands, sub-agents, and strict automation built in.

> **Work in Progress** — Some features listed below are being implemented.
> Follow the [roadmap](https://github.com/Mircooo/steaksoap/issues) for progress.

[![CI](https://github.com/Mircooo/steaksoap/actions/workflows/ci.yml/badge.svg)](https://github.com/Mircooo/steaksoap/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![pnpm](https://img.shields.io/badge/pnpm-10-orange)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mircooo/steaksoap&project-name=my-project)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Mircooo/steaksoap)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Mircooo/steaksoap)

---

## Why steaksoap?

There are hundreds of React + Vite + Tailwind starters. Here's what makes this one different:

| | steaksoap | Typical React Starter |
|---|---|---|
| **AI workflow** | 18 slash commands, 4 sub-agents | None or afterthought |
| **Setup** | One interactive wizard | Clone + manual config |
| **UI components** | 10 accessible atoms ready to use | Empty src/ |
| **Git workflow** | Conventional commits + auto changelog | Manual |
| **Validation** | Lint + typecheck + test + build in one command | `npm run build` |
| **Releases** | Automated version bump + changelog + tag | Manual |
| **Multi-AI** | Claude Code + Cursor + Copilot rules | Single tool or none |

## Quick Start

```bash
# Clone and setup
git clone https://github.com/Mircooo/steaksoap.git my-project
cd my-project
pnpm install
pnpm setup

# Start building
pnpm dev
```

The setup wizard will:
- Rename the project to your chosen name
- Configure git remotes
- Clean up template files
- Give you a ready-to-use project

## AI Commands

Open Claude Code and type these commands:

### Scaffolding
| Command | What it does |
|---|---|
| `/new-page About` | Creates page + route + test |
| `/new-component Button ui` | Creates component + test in ui/ |
| `/new-feature UserProfile` | Creates full feature folder (component, hook, types, test) |
| `/new-hook MediaQuery` | Creates custom hook + test |
| `/add-api products` | Scaffolds API service with TanStack Query |

### Workflow
| Command | What it does |
|---|---|
| `/status` | Git summary + health check + outdated deps |
| `/deploy` | Build → validate → deploy to Vercel/Netlify |
| `/release` | Evaluate commits → version bump → changelog → tag |
| `/update-deps` | Safe dependency updates with validation |
| `/fix "button doesn't work"` | Systematic bug diagnosis and fix |

### Discovery
| Command | What it does |
|---|---|
| `/discover "animations"` | Find extensions by description |
| `/install-extension zustand` | Install a curated extension by ID |
| `/refactor src/features/auth` | Analyze code against rules, classify and fix issues |

### Quality
| Command | What it does |
|---|---|
| `/review` | Code review with a11y, perf, and security checklist |
| `/audit` | Lighthouse + bundle size + accessibility audit |
| `/test` | Run tests + identify coverage gaps |
| `/theme "make it blue"` | Modify design tokens interactively |
| `/responsive-check` | Verify all breakpoints |

[→ Full command reference](docs/commands.md)

## Stack

- **React 19** — latest with concurrent features
- **TypeScript 5.9** — strict mode, no `any`
- **Vite 7** — HMR in milliseconds
- **Tailwind CSS 4** — CSS-first @theme configuration
- **React Router 7** — lazy-loaded routes
- **Vitest** — fast unit & component tests
- **ESLint 9** — type-aware linting with a11y rules
- **Prettier** — consistent formatting with Tailwind class sorting
- **Husky + commitlint** — enforced conventional commits
- **release-it** — automated releases with changelog generation

## After Setup

Your project includes:
- A responsive landing page with Header, Hero, Features, and Footer
- 10 accessible UI components (Button, Input, Card, Modal, etc.)
- Dark/light mode toggle
- SEO head management
- Error boundaries
- Pre-configured CI (lint + typecheck + test + build)

## Project Structure

```
src/
├── app/            ← Routes, providers, layout
├── components/
│   ├── ui/         ← Reusable atoms (Button, Input, Card...)
│   ├── layout/     ← Header, Footer, Container, Section
│   └── features/   ← Domain-specific components
├── config/         ← env.ts, site.ts, cloudinary.ts
├── features/       ← Feature modules (component + hook + types)
├── hooks/          ← Custom React hooks
├── pages/          ← Page components
├── styles/         ← Global styles, @theme tokens
├── types/          ← Shared TypeScript types
└── utils/          ← cn(), helpers
```

## Recipes

Step-by-step guides for common tasks:

- [Add a page](docs/recipes/add-page.md)
- [Add a component](docs/recipes/add-component.md)
- [Add a feature](docs/recipes/add-feature.md)
- [Configure env variables](docs/recipes/env-vars.md)
- [Add an extension](docs/recipes/add-extension.md)
- [Deploy](docs/recipes/deploy.md)
- [Customize the theme](docs/recipes/customize-theme.md)

## Use as Plugin

Already have a project? Install steaksoap as a Claude Code plugin to get all commands, agents, and rules without cloning:

```bash
claude plugin marketplace add Mircooo/steaksoap
```

This gives you access to all 18 slash commands and 4 sub-agents in your existing project.

## Stay Updated

Pull improvements from the template:

```bash
pnpm setup:update
```

This fetches the latest changes from the steaksoap template and merges them into your project.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start dev server (port 5173) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm validate` | Lint + typecheck + test + build |
| `pnpm setup` | Interactive project setup |
| `pnpm setup:update` | Pull template updates |
| `pnpm release` | Create a new release |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — do whatever you want with it.

---

**Built by [Mircooo](https://github.com/Mircooo)** · [Report a bug](https://github.com/Mircooo/steaksoap/issues) · [Request a feature](https://github.com/Mircooo/steaksoap/issues)
