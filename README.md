# steaksoap

Personal production & prototyping base.

React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 4 + pnpm.

---

## Quick start

```bash
pnpm install
pnpm dev        # → http://localhost:5173
```

## Pages

| URL | Purpose |
|-----|---------|
| `/` | Home |
| `/playground` | Design system showcase — all tokens, all components |
| `/lab` | Experimentation sandbox — prototypes and ideas |

## Structure

```
src/
├── app/              — routes, providers, layout
├── components/ui/    — 24 reusable atoms (Button, Input, Card, Modal…)
├── components/layout/ — Header, Footer, Container, CursorGlow
├── components/features/ — ErrorBoundary, SeoHead
├── config/           — env.ts, site.ts, cloudinary.ts
├── features/         — feature modules (component + hook + types)
├── hooks/            — custom React hooks
├── pages/            — page components (one per route)
├── styles/           — fonts.css, animations.css
├── utils/            — cn(), helpers
├── lib/              — API services (created by /add-api)
└── workbench/        — playground sections, shared components, data
```

## Design system

Tokens live in `src/index.css` @theme block. Single source of truth.

- **Accent**: #c44040 — same in dark and light mode
- **Fonts**: Space Grotesk (sans), JetBrains Mono (mono)
- **Dark bg**: #0A0A0A — **Light bg**: #B0B0A8

Components consume tokens, never invent values. See `DESIGN_SYSTEM.md`.

## Principles

- **Reuse-first**: check existing components before creating new ones
- **Token-first**: no local colors/spacing if a token covers the need
- **Branch-first**: never commit to main directly
- **Validate-first**: `pnpm validate` before every commit

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server (port 5173) |
| `pnpm build` | Production build |
| `pnpm validate` | Lint + typecheck + test + build |
| `pnpm release` | Version bump + changelog + tag |

## AI workflow

23 slash commands, 4 agents. Open Claude Code and type `/` to see available commands.

Key commands: `/new-page`, `/new-component`, `/new-feature`, `/theme`, `/lighthouse`, `/release`.

Full reference: [docs/commands.md](docs/commands.md).

## License

UNLICENSED — private project.
