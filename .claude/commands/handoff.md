# /handoff

Generate a comprehensive HANDOFF.md so any developer can understand, run, and maintain this project without AI assistance.

## Philosophy

This is the safety net. If every AI tool disappears tomorrow, a competent developer
should be able to read HANDOFF.md and fully understand this project in 30 minutes.
Write for humans, not machines. No jargon, no assumptions, no "see AI command X".

## Steps

1. Gather project state:
   ```bash
   # Project identity
   cat package.json | head -10

   # Current version
   node -e "console.log(require('./package.json').version)"

   # Dependencies count
   node -e "const p=require('./package.json'); console.log('prod:', Object.keys(p.dependencies||{}).length, 'dev:', Object.keys(p.devDependencies||{}).length)"

   # Pages
   ls src/pages/

   # Features
   ls src/features/ 2>/dev/null || echo "No features"

   # Components
   ls src/components/ui/
   ls src/components/layout/

   # Tests count
   find src -name "*.test.tsx" -o -name "*.test.ts" | wc -l

   # Routes
   cat src/constants/routes.ts
   ```

2. Read key files for context:
   - `src/config/site.ts` — project identity
   - `src/index.css` — design tokens
   - `docs/ARCHITECTURE.md` — structure
   - `.claude/decisions.md` — technical decisions
   - `src/app/routes/index.tsx` — routing setup

3. Generate `HANDOFF.md` at the project root with this structure:

```markdown
# [Project Name] — Developer Handoff

> This document contains everything a developer needs to understand, run,
> and maintain this project. No AI tools required.

Generated on: [date]
Project version: [version]

---

## Quick Start

1. Prerequisites: Node.js 20+, pnpm 10+
2. `pnpm install`
3. `pnpm dev` → http://localhost:5173
4. `pnpm validate` → lint + typecheck + tests + build

## Project Overview

[1-2 paragraphs: what this project IS, who it's for, what it does]

## Tech Stack

| Layer | Tool | Version | Why |
|-------|------|---------|-----|
| Framework | React | X | ... |
| Language | TypeScript | X | Strict mode, zero `any` |
| Build | Vite | X | Fast HMR, optimized builds |
| Styling | Tailwind CSS | X | Utility-first, design tokens in index.css |
| Testing | Vitest | X | Fast, Vite-native |
| Linting | ESLint + Prettier | X | Auto-fixed on commit via Husky |
| Package manager | pnpm | X | Fast, strict |

## Architecture

[Copy from docs/ARCHITECTURE.md, simplified]

### Key patterns
- Design tokens live in `src/index.css` @theme block
- Pages are lazy-loaded in `src/app/routes/index.tsx`
- Components use `cn()` from `@utils/cn` for class merging
- Path aliases: @components, @hooks, @pages, @utils, etc.

## Pages & Routes

| Route | File | Description |
|-------|------|-------------|
[List every route with its page file and what it does]

## Design System

### Colors (from index.css @theme)
[List all color tokens with hex values and purpose]

### Fonts
[List font families and where they're loaded]

### Key UI Components
[List the components in src/components/ui/ with one-line descriptions]

## Features

[For each directory in src/features/: what it does, key files]

## How To...

### Add a new page
1. Create `src/pages/MyPage.tsx` (default export)
2. Add route constant in `src/constants/routes.ts`
3. Add lazy import in `src/app/routes/index.tsx`
4. Run `pnpm validate`

### Add a new component
1. Create in `src/components/ui/` (reusable) or `src/features/X/` (specific)
2. Named export, PascalCase file
3. Accept `className?: string` prop
4. Add test in `__tests__/` folder next to it

### Change the color theme
1. Edit `src/index.css` → `@theme { }` block
2. Update `--color-accent-rgb` in `:root` to match (R, G, B format)
3. Check Playground page to verify all tokens

### Deploy
[Read from existing deploy recipe or CI config]

### Run tests
- `pnpm test` — run all once
- `pnpm test:watch` — watch mode
- `pnpm test:coverage` — with coverage report

### Create a release
- `pnpm release` — interactive version bump + changelog + git tag

## Environment Variables

[List from .env.example or src/config/env.ts with descriptions]
All variables have safe fallbacks — the app runs without any .env file.

## Git Workflow

- **Never commit to main directly** — always branch first
- Branch naming: `feat/`, `fix/`, `docs/`, `refactor/`
- Commits: conventional format (`feat:`, `fix:`, `docs:`, etc.)
- Pre-commit hook auto-fixes lint/format issues
- `pnpm validate` must pass before merging

## CI/CD

[Describe what GitHub Actions do: validate, security audit, bundle check, etc.]

## Technical Decisions

[Copy key decisions from .claude/decisions.md — the WHY behind choices]

## Known Constraints

- Protected pages: `/playground` and `/lab` must never be deleted
- Accent color is identical in dark and light mode (brand decision)
- [Any other project-specific constraints]

## The .claude/ Directory

This folder contains AI-assisted development tooling (slash commands, rules, agents).
It is **completely optional** — removing it does not affect the app in any way.
The app compiles and runs identically without it. It's a productivity layer, not a dependency.
```

4. After generating, verify the document reads well:
   - No references to "ask Claude" or "run /command"
   - Every section is self-contained
   - A developer with React+TS experience could follow it cold

5. Report what was generated and its location.

## Rules
- NEVER reference AI commands as the way to do things — always give manual steps
- NEVER assume the reader has Claude, Copilot, or any AI tool
- ALWAYS include actual values (version numbers, hex colors, file paths) — not placeholders
- ALWAYS explain WHY decisions were made, not just WHAT they are
- This file should be regenerated before any client delivery or major handoff
