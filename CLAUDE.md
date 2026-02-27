## ⚠️ BEFORE YOU DO ANYTHING

STOP. Read this ENTIRE file and .claude/rules/workflow.md BEFORE writing any code.
Do NOT create branches, files, or commits until you have read and understood the workflow.

You are NOT a generic AI assistant. You are operating inside a structured system with:
- Rules that MUST be followed (.claude/rules/)
- Commands that define quality standards (.claude/commands/)
- Agents with specific expertise (.claude/agents/)
- A workflow that dictates HOW you work (.claude/rules/workflow.md)

If you skip this, you WILL make mistakes: wrong branches, missing tests, broken conventions.
The owner WILL notice and it wastes everyone's time.

### ⛔ THE #1 RULE
**NEVER commit directly to main. NEVER. Not even "just a small fix".**
Before ANY code change: `git checkout main && git pull && git checkout -b <type>/<scope>`
If you find yourself on main with uncommitted changes → stash → create branch → apply stash.
This rule has ZERO exceptions. If you violate it, the entire session is compromised.

## 🚀 Fresh Clone?

If this project still has the default steaksoap identity (check: does
`package.json` name say "steaksoap"?), run these two commands:

1. `pnpm setup` — renames the project, configures git, validates
2. Then in Claude Code: `/init` — customizes colors, fonts, content, vibe

After both are done, this section can be removed.

# steaksoap

AI-first React starter kit for vibe coders.
The commands and rules are the product. The boilerplate is the vehicle.

## Stack
React 19 · TypeScript 5.9 · Vite 7 · Tailwind CSS 4 · pnpm · Vitest · ESLint 9

## Commands
pnpm dev              — dev server (port 5173)
pnpm build            — production build
pnpm preview          — preview production build
pnpm validate         — lint + typecheck + test + build (run before every PR)
pnpm setup            — interactive project setup wizard
pnpm setup:update     — pull latest template improvements
pnpm release          — create versioned release with changelog

## Architecture
src/
├── app/            — routes, providers, app layout
├── components/ui/  — reusable atoms (Button, Input, Card, Modal…)
├── components/layout/ — Header, Footer, Container, Section
├── config/         — env.ts (with fallbacks), site.ts, cloudinary.ts
├── features/       — feature modules (component + hook + types)
├── hooks/          — custom React hooks
├── pages/          — page components (one per route)
├── utils/          — cn() and helpers

## Code Rules (brief)
These are loaded automatically from `.claude/rules/` — details there, summary here:
- TypeScript strict — no `any`, no `as`, no `!`
- Named exports, PascalCase files, mobile-first responsive
- `cn()` for className, design tokens only, tests beside source
- Path aliases: @components, @hooks, @pages, @utils, @config, @features

## Workflow
See `.claude/rules/workflow.md` for the full workflow (branching, validation, commits).
The essential rule: **NEVER commit to main. ALWAYS branch first. No exceptions.**

## Communication Style
- Start with ACTION (what you're doing), then WHERE (which files), then WHY
- After completing work: summary of changes, files modified, what to test
- If unsure: ask one focused question, don't guess

## Protected Pages
- `/playground` — Component reference page. NEVER delete. NEVER remove from nav.
  When design tokens change, verify Playground still renders correctly.
- `/steaksoap` — Original template showcase. NEVER delete. Keep for reference.
- `/welcome` — Post-clone setup guide. Removed automatically by `pnpm setup`.

## Detailed Rules
See .claude/rules/ — these files are loaded automatically based on what you're working on.
