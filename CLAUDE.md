## BEFORE YOU DO ANYTHING

Read this file and `.claude/rules/workflow.md` BEFORE writing any code.
You operate inside a structured system: rules (.claude/rules/), commands (.claude/commands/), agents (.claude/agents/).

### THE #1 RULE
**NEVER commit directly to main.** Not even "just a small fix."
Before ANY code change: `git checkout main && git pull && git checkout -b <type>/<scope>`
On main with uncommitted changes? Stash → branch → apply. Zero exceptions.

# Project

React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 4 + pnpm + Vitest + ESLint 9

## Commands
pnpm dev              — dev server (port 5173)
pnpm build            — production build
pnpm preview          — preview production build
pnpm validate         — lint + typecheck + test + build (run before every PR)
pnpm setup            — interactive project setup wizard
pnpm base:update      — pull latest improvements from upstream base
pnpm release          — create versioned release with changelog

## Architecture
src/
├── app/            — routes, providers, app layout
├── components/ui/  — reusable atoms (Button, Input, Card, Modal…)
├── components/layout/ — Header, Container
├── config/         — env.ts (with fallbacks), site.ts, cloudinary.ts
├── features/       — feature modules (component + hook + types per feature)
├── components/features/ — app-wide React patterns (ErrorBoundary, SeoHead) — NOT the same as src/features/
├── hooks/          — custom React hooks
├── pages/          — page components (one per route)
├── utils/          — cn() and helpers
├── workbench/      — playground sections, shared components, data

## Source of truth (in case of conflict)
1. The actual code (always wins)
2. `.claude/memory/` (tagged decisions, patterns, feedback, frictions)
3. `.claude/decisions.md` (pointer to memory index — legacy)
4. This file (CLAUDE.md)
5. `.claude/rules/*.md`
6. `docs/*.md` and other markdown

If docs contradict code, the docs are wrong.

## Memory

Project-scoped persistent memory lives in `.claude/memory/`, tracked in Git.
- `.claude/memory/INDEX.md` — auto-generated sommaire (run `pnpm memory:index`)
- `.claude/memory/TAGS.md` — canonical tag vocabulary (closed set)
- `.claude/memory/{decisions,feedback,patterns,frictions,sessions}/` — entries

**Before any non-trivial task**: `grep -rl "#<domain>" .claude/memory/` to surface prior context.
**At end of every session**: write journal entry in `sessions/YYYY-MM-DD-HHMM.md`, run `pnpm memory:index`.
Full protocol: `.claude/rules/memory-protocol.md`.

## Session protocol

**Start of every session** (before any code):
1. `git log --oneline -10` + `git status && git branch`
2. Read `CLAUDE.md` + `.claude/memory/INDEX.md` + most recent `sessions/` entry
3. Grep memory for any tags relevant to the incoming task

**End of every session** (mandatory):
1. Output RELEASE CHECK block (see `.claude/rules/releases.md`)
2. Write `sessions/YYYY-MM-DD-HHMM.md` journal entry
3. Run `pnpm memory:index`
4. Summarize: what changed, what to test

## Release proactivity

At session end, always output:
```
RELEASE CHECK:
- Commits depuis dernière release : X (types)
- Recommandation : [release vX.Y.Z | wait]
- Raison : [explicit]
```
Full rule: `.claude/rules/releases.md`.

## User mobilization

When a task requires the owner, use this standardized block:
```
🧑 ACTION HUMAINE REQUISE
QUOI : [exact action]
POURQUOI : [reason]
COMMENT : [steps]
LIVRABLE : [what to return]
```
Use cases: screenshots, cross-device tests, API keys, taste/brand judgment, client validation.

## Autonomy
Can do without asking: branch, code in scope, local refactor, sync docs, add/fix tests, run validate, update related MD.
Must ask: delete a feature, add a dependency, change deploy config, force push, act outside scope.

## Reuse-first (mandatory)
Before creating ANY component, check existing ones in this order:
1. `src/components/ui/` — 24 atoms (Button, Card, Modal, Select, Tabs…)
2. `src/components/layout/` — Header, Container
3. `src/workbench/playground/shared/` — Copyable, Swatch, Section…
If something exists: use it or extend it. Never recreate.

## Code Rules
Loaded from `.claude/rules/` — summary:
- TypeScript strict — no `any`, no `as`, no `!`
- Named exports, PascalCase files, mobile-first responsive
- `cn()` for className, design tokens only, tests beside source
- Path aliases: @components, @hooks, @pages, @utils, @config, @features, @constants, @context, @workbench, @lib

## Workflow
See `.claude/rules/workflow.md`. Batch mode is default — execute without asking at each step.
**NEVER commit to main. ALWAYS branch first.**

## Communication
- ACTION → WHERE → WHY
- After work: summary + files modified + what to test
- Unsure? One focused question, don't guess

## Protected Pages
`/playground` and `/lab` — NEVER delete, NEVER remove from nav.
Verify after design token changes.

- `/playground` = structured design system showcase (all tokens, all components)
- `/lab` = free-form experimentation sandbox (prototypes, ideas, tests)

## Detailed Rules
See `.claude/rules/` — most loaded automatically based on task type.
**Always-loaded** (every task, every file): `critical.md`, `memory-protocol.md`, `principles.md`, `releases.md`, `workflow.md`.
