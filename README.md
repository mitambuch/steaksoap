# Project

**AI-native React development system.**

React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 4 + pnpm.

23 commands, 4 agents, zero config. A complete development system where AI rules, commands, and agents are the product. The React starter is the vehicle.

![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![pnpm](https://img.shields.io/badge/pnpm-10-orange)

---

## Why this project?

| | This Project | Typical React Starter |
|---|---|---|
| **AI workflow** | 23 slash commands, 4 sub-agents | None or afterthought |
| **Setup** | One interactive wizard | Clone + manual config |
| **UI components** | 24 accessible components ready to use | Empty src/ |
| **Git workflow** | Conventional commits + auto changelog | Manual |
| **Validation** | Lint + typecheck + test + build in one command | `npm run build` |
| **Releases** | Automated version bump + changelog + tag | Manual |

## Getting Started

### 1. Clone & install

```bash
git clone <repo-url> my-project
cd my-project
pnpm install
```

### 2. Setup

```bash
pnpm setup
```

This renames the project, configures git, and validates everything.

### 3. Start dev server

```bash
pnpm dev
```

Open [localhost:5173](http://localhost:5173).

### 4. Make it yours

```bash
claude
```

Then type `/init` — Claude will ask about your project and customize colors, fonts, and content.

### Pages

| URL | What it is |
|-----|------------|
| `/` | Home page |
| `/playground` | All UI components with your current design tokens |
| `/lab` | Experimental prototyping sandbox |

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
| `/spec "contact form"` | Generate structured spec before coding |
| `/status` | Git summary + health check + outdated deps |
| `/deploy` | Build, validate, deploy to Vercel/Netlify |
| `/release` | Evaluate commits, version bump, changelog, tag |
| `/update-deps` | Safe dependency updates with validation |
| `/fix "button doesn't work"` | Systematic bug diagnosis and fix |
| `/migrate "../old-project"` | Analyze existing project, structured migration plan |

### Discovery
| Command | What it does |
|---|---|
| `/discover "animations"` | Find extensions and MCP servers by description |
| `/install-extension zustand` | Install a curated extension by ID |
| `/connect github` | Install a MCP server from the registry |
| `/refactor src/features/auth` | Analyze code against rules, classify and fix issues |

### Quality
| Command | What it does |
|---|---|
| `/review` | Code review with a11y, perf, and security checklist |
| `/lighthouse` | Lighthouse + bundle size + accessibility audit |
| `/test` | Run tests + identify coverage gaps |
| `/theme "make it blue"` | Modify design tokens interactively |
| `/responsive-check` | Verify all breakpoints |

[Full command reference](docs/commands.md)

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
- 24 accessible UI components (Button, Input, Card, Modal, Toast, Tabs, Accordion, Switch, Timeline...)
- Dark/light mode toggle
- SEO head management
- Error boundaries
- Pre-configured CI (lint + typecheck + test + build)

## Project Structure

```
src/
├── app/            — Routes, providers, layout
├── components/
│   ├── ui/         — Reusable atoms (Button, Input, Card...)
│   ├── layout/     — Header, Footer, Container, CursorGlow
│   └── features/   — ErrorBoundary, SeoHead
├── config/         — env.ts, site.ts, cloudinary.ts
├── features/       — Feature modules (component + hook + types)
├── hooks/          — Custom React hooks
├── pages/          — Page components
├── styles/         — Global styles, @theme tokens
├── utils/          — cn(), helpers
└── workbench/      — Playground sections, shared components, data
```

## Stay Updated

Pull improvements from the template:

```bash
pnpm setup:update
```

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

## License

UNLICENSED — private project.
