# AI Command Reference

Complete list of Claude Code slash commands in steaksoap.

## Scaffolding

| Command | Arguments | What it creates |
|---|---|---|
| `/new-page` | `PageName` | Page + route constant + lazy import + test |
| `/new-component` | `ComponentName [ui\|feature\|layout]` | Component + test in the right folder |
| `/new-feature` | `FeatureName` | Feature folder (component + hook + types + barrel + test) |
| `/new-hook` | `HookName` (without "use") | Custom hook + test |
| `/add-api` | `resourceName` | TanStack Query service + hooks |

### Example: Creating a full feature

```
You: /new-feature UserProfile

Claude Code creates:
  src/features/user-profile/
  ├── UserProfile.tsx         — main component
  ├── UserProfile.types.ts    — TypeScript interfaces
  ├── useUserProfile.ts       — custom hook
  ├── index.ts                — barrel export
  └── __tests__/
      └── UserProfile.test.tsx — component test
```

## Workflow

| Command | Arguments | What it does |
|---|---|---|
| `/status` | — | Git status, validation report, dependency health |
| `/deploy` | — | Validate, build, deploy to Vercel or Netlify |
| `/release` | — | Analyze commits, version bump, changelog, git tag |
| `/update-deps` | — | Safe dependency updates with validation after each |
| `/fix` | `"description of bug"` | Systematic bug diagnosis and fix |

### Example: Fixing a bug

```
You: /fix "Modal doesn't close when clicking outside"

Claude Code:
  1. Reproduces → opens the Modal, clicks backdrop
  2. Searches → finds Modal.tsx, reads click handler
  3. Isolates → backdrop onClick missing stopPropagation
  4. Fixes → adds event handler
  5. Proves → writes test that fails without fix
  6. Validates → pnpm validate passes
  7. Commits → fix(modal): close on backdrop click
```

## Quality

| Command | Arguments | What it does |
|---|---|---|
| `/review` | — | Code review of recent changes |
| `/audit` | — | Bundle size + accessibility + performance analysis |
| `/test` | `[file or feature]` | Run tests + find coverage gaps |
| `/theme` | `"description of changes"` | Modify design tokens interactively |
| `/responsive-check` | `[page or component]` | Verify all breakpoints (320px to 1440px) |

### Example: Theme customization

```
You: /theme "warm orange accents, softer backgrounds"

Claude Code:
  1. Reads current tokens in src/index.css
  2. Proposes: accent #f97316, bg #0f0f0f, surface #1a1a1a
  3. Shows contrast ratios for each combination
  4. Applies changes to both dark and light themes
  5. Validates → pnpm validate passes
```

## Sub-agents

Agents are specialized personas that Claude Code can adopt.
See [agents.md](agents.md) for full documentation.

| Agent | When to use |
|---|---|
| `reviewer` | "Act as the reviewer agent and check my code" |
| `debugger` | "Act as the debugger agent to fix this issue" |
| `designer` | "Act as the designer agent for this UI change" |
| `tester` | "Act as the tester agent to write tests for this" |
