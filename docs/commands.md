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

### Example: Creating a page

```
You: /new-page About

Claude Code creates:
  src/pages/About.tsx           — page component with SeoHead
  src/pages/__tests__/About.test.tsx  — render + a11y test
  src/constants/routes.ts       — ABOUT: '/about' added
  src/app/routes/index.tsx      — lazy import + Route added
```

## Workflow

| Command | Arguments | What it does |
|---|---|---|
| `/status` | — | Git status, validation report, dependency health |
| `/deploy` | — | Validate, build, deploy to Vercel or Netlify |
| `/release` | — | Analyze commits, version bump, changelog, git tag |
| `/update-deps` | — | Safe dependency updates with validation after each |
| `/fix` | `"description of bug"` | Systematic bug diagnosis and fix |

### Example: Checking status

```
You: /status

Claude Code:
  Branch: main (clean)
  Last release: v1.4.0 (3 commits since)
  Validation: ✓ all checks pass
  Outdated: 2 packages (minor updates available)
  Suggestion: "Ready for a patch release when you want."
```

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

## Discovery

| Command | Arguments | What it does |
|---|---|---|
| `/discover` | `"description"` | Find extensions by natural language (e.g., "animations", "auth") |
| `/install-extension` | `extension-id` | Install a specific extension by ID (e.g., "zustand") |
| `/refactor` | `file or feature` | Analyze code against rules, classify and fix issues |

### Example: Discovering an extension

```
You: /discover "I want users to log in"

Claude Code:
  1. Reads registry/extensions.json
  2. Matches → Clerk Authentication (auth-clerk)
  3. Shows packages: @clerk/clerk-react
  4. Shows setup steps and docs
  5. Asks: "Want me to install this?"
  6. If yes → installs, configures, validates, commits
```

### Example: Refactoring code

```
You: /refactor src/features/auth

Claude Code:
  1. Reads rules: components.md, api.md, testing.md
  2. Reads decisions.md for architectural context
  3. Analyzes all files in src/features/auth/
  4. Classifies:
     MUST FIX: missing AbortController in fetch hook
     SHOULD FIX: inline styles instead of tokens
     NICE TO HAVE: extract shared types to .types.ts
  5. Asks: "Apply all? Or pick which ones?"
  6. Applies → validates → commits
```

See [recipes/add-extension.md](recipes/add-extension.md) for the full list of available extensions.

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

### Example: Running an audit

```
You: /audit

Claude Code:
  Bundle: 265kb (gzip: 85kb) — ✓ under budget
  Lighthouse: Performance 97, A11y 100, SEO 100, BP 100
  Images: 0 unoptimized
  Unused CSS: none detected
  Recommendation: "Bundle is healthy. No action needed."
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

### Example: Using an agent

```
You: "Act as the designer agent and improve the About page"

Claude Code (as designer):
  1. Reads src/index.css tokens + DESIGN_SYSTEM.md
  2. Reads src/pages/About.tsx
  3. Proposes: larger hero, mono micro labels, capsule CTAs
  4. Applies changes following the classe2 style DNA
  5. Validates → commits
```
