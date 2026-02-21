# CLAUDE.md — Source of truth for AI agents

This file is automatically read by Claude Code (and any other AI agent) at the start of every session.
It is the **contract** between the human and the AI. Every rule here is non-negotiable.

---

## Project context

This repo is a **reusable boilerplate** for client showcase websites.
Each new project = a clone of this repo + customization.

- **Stack**: React 19 · TypeScript · Vite 7 · Tailwind CSS · pnpm
- **SEO**: SPA-level (client-side meta tags, auto sitemap). For real SEO (crawlers, reliable OG previews), plan for SSR or prerender.
- **Mobile-first**: design for mobile screens first, then scale up

> This project was built with **vibe coding** using AI agents.
> The structure is intentionally simple and documented so anyone can pick it up.

---

## Who is the project owner

- Does not read code. Reads **explanations, summaries, comments**.
- Understands logic, not syntax. Knows what they want, not how to write it.
- **Vibe codes**: gives direction, the AI executes with rigor.
- Is **demanding**. If it's not clean, it doesn't ship.

### How to communicate

- Like talking to a **smart beginner**. Not condescending. Not oversimplified. Clear.
- Explain the **WHY** before the HOW.
- Use concrete analogies when possible.

### Communication format

**When performing a major action:**
```
ACTION: I will [describe the action]
WHERE: [affected file(s)]
WHY: [reason in 1-2 simple sentences]
RISK: [none / low / medium — and why]
```

**When there's a bug:**
```
ERROR: [error name]
IN SIMPLE TERMS: [accessible explanation]
SOLUTION: [what you propose]
WHERE: [file and line]
```

**When installing a package:**
```
NEW PACKAGE: [name]
WHAT IT IS: [1-sentence explanation]
STATS: [downloads/week, last updated]
WHY: [why we need it]
```

---

## Standard workflow — EVERY TASK

The owner describes what they want in plain language. **You handle EVERYTHING else.**
They never touch git, the terminal, config files, or commands.
You are a senior developer. You make technical decisions, execute, and deliver.

### Step by step

```
1. UNDERSTAND    → Rephrase the request in 1-2 sentences. If unclear, ask.
2. BRANCH        → git checkout -b <type>/<scope> from main
3. CODE          → Implement. Explain every important decision.
4. VALIDATE      → pnpm validate → zero errors required
5. COMMIT        → Conventional, atomic messages in English
6. MERGE         → git checkout main && git merge --no-ff <branch>
7. PUSH          → git push origin main
8. CLEAN UP      → git branch -d <branch>
9. EVALUATE      → Check if a release is warranted (see rules below)
10. SUMMARIZE    → Explain what was done + state of unreleased commits
```

### RELEASE RULE: BATCH RELEASES

**Releases are the project's logbook. Each one must have meaningful CONTENT.**

The CHANGELOG + GitHub Releases = the readable history of the project.
If the owner comes back in 2 months, they MUST be able to read the full history
and understand every evolution, every fix, every decision.

**Principle: NO release for every small change.**
A release groups a **logical batch** of work. Not 1 commit = 1 release.

### When the AI triggers a release

The AI **evaluates** at the end of each task whether a release is warranted.

**YES, release now:**
- At least 1 `feat` + a few accumulated `fix`/`chore`
- A batch of 5+ coherent commits (even without feat)
- A critical fix that must ship immediately
- The owner explicitly says "release"
- End of a major work session with many changes

**NO, accumulate:**
- A single small fix or chore in isolation
- A minor docs change
- An internal refactor with no visible impact
- Fewer than 3 commits since last release (unless critical fix)

### Release type (automatic choice by the AI)

| Accumulated commits since last release | Type | Example |
|---|---|---|
| Only `fix`, `docs`, `chore`, `refactor` | `patch` | 0.6.0 → 0.6.1 |
| At least one `feat` | `minor` | 0.6.0 → 0.7.0 |
| Breaking change | `major` | 0.6.0 → 1.0.0 |

### Release workflow (the AI handles everything)

```bash
# 1. Check unreleased commits
git log v$(node -p "require('./package.json').version")..HEAD --oneline

# 2. Evaluate: enough content for a release? (see rules above)

# 3. If yes → analyze commit types → choose patch/minor/major

# 4. Run the release
GITHUB_TOKEN=$(gh auth token) npx release-it <type> --ci

# 5. Confirm to owner: "Release v0.7.0 published — 2 feat, 3 fix, 1 chore"
```

### End of session — mandatory summary

At the end of every session, the AI must **always** summarize the state:
```
SESSION SUMMARY:
- Commits since last release: X (list types)
- Release done: yes v0.7.0 / no — not enough content
- Next release estimated: when Y is finished
```

**CHANGELOG — ALL types visible:**
- The `.release-it.json` file defines which commit types appear in the CHANGELOG.
- **NEVER** set `"hidden": true` on any commit type (except `merge`).
- Every `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `perf` MUST appear.
- If the owner reports an empty CHANGELOG → it's a config bug, not a commit issue.

**This applies to ALL projects based on this starter. No exceptions.**

### When the owner says...

| They say | You do |
|---|---|
| "add X" | Branch → code → validate → commit → merge → push → **evaluate release** |
| "fix X" | Branch → code → validate → commit → merge → push → **evaluate release** |
| "commit" | `git add` + `git commit` with the correct conventional message |
| "push" | `git push origin main` (or the active branch) |
| "release" | Immediate release with the correct type |
| "what's the status?" | `git status` + `git log` since last release + summary |

### What the owner NEVER does

- Type git commands
- Choose a branch name
- Write a commit message
- Decide the release type
- Resolve merge conflicts
- Run validation commands

**You do all of this for them. Automatically. Without asking.**

---

## Tech stack

| Tool | Role |
|---|---|
| **Vite 7** | Bundler + dev server |
| **React 19** | UI |
| **TypeScript** | Strict typing — `any` is forbidden |
| **Tailwind CSS 4** | Styles (utility-first, CSS-first config via `@theme`) |
| **React Router 7** | SPA routing |
| **Cloudinary** | Image CDN (via `@config/cloudinary.ts`) |
| **pnpm** | Package manager |
| **ESLint** | Code spell-checker (type-aware) |
| **Prettier** | Auto-formatter |
| **Husky** | Git hooks (automatic validation) |
| **commitlint** | Enforces commit message format |
| **lint-staged** | Lints only modified files |
| **release-it** | Automated releases + CHANGELOG |
| **Vitest** | Unit + component tests (jsdom + testing-library) |
| **vite-plugin-sitemap** | Auto-generated sitemap + robots.txt at build (prod only) |

---

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full details.

```
src/
├── app/              → App root, routes, layouts
├── assets/           → Fonts, images, icons (imported in code)
├── components/
│   ├── ui/           → Reusable atoms (Button, Input, Card…)
│   ├── layout/       → Header, Footer, Sidebar, Nav…
│   └── features/     → Feature components (ErrorBoundary…)
├── config/           → App config (Cloudinary, SEO…)
├── constants/        → Routes, constant values
├── context/          → React contexts (Theme, Auth…)
├── data/             → Static data / fixtures
├── features/         → Complex features (one folder per feature)
├── hooks/            → Custom hooks (useX.ts)
├── lib/              → Third-party wrappers (analytics, i18n…)
├── pages/            → One page = one route = one file
├── styles/           → Fonts, animations (tokens in @theme of index.css)
├── types/            → Shared TypeScript types
└── utils/            → Pure functions (cn, format, parse…)
```

**Path aliases** — never `../../..`. Always `@components/`, `@hooks/`, etc.

---

## Security — non-negotiable

- **Never** expose API keys, tokens, or secrets in code → `.env` only
- **Never** install a package without checking: downloads, last update, dependencies, issues
- Prefer **native solutions** before adding a dependency
- Every new dependency must be **justified** in the commit AND explained to the owner
- **Sensitive files**: `.env`, `vite.config.ts`, `package.json`, `eslint.config.js` → don't touch without explanation

---

## Branches

| Type | Format | Example | From |
|------|--------|---------|------|
| Feature | `feat/<scope>` | `feat/gallery-grid` | `main` |
| Fix | `fix/<scope>` | `fix/cloudinary-url` | `main` |
| Refactor | `refactor/<scope>` | `refactor/routing` | `main` |
| Chore | `chore/<scope>` | `chore/deps-update` | `main` |
| Docs | `docs/<scope>` | `docs/readme` | `main` |
| Style | `style/<scope>` | `style/dark-mode` | `main` |

**Rules:**
- `main` is protected — **never** commit directly to it.
- Always create a branch before working.
- One branch = one topic. Don't mix multiple features.
- Delete the branch after merge.

---

## Commits — Conventional Commits

Strict format:

```
<type>(<scope>): <short description>

<optional body — the "why", not the "what">
```

### Allowed types

| Type | When |
|------|------|
| `feat` | New visible feature |
| `fix` | Bug fix |
| `refactor` | Restructuring with no behavior change |
| `style` | CSS, UI, formatting (no logic) |
| `chore` | Config, deps, CI, tooling |
| `docs` | Documentation only |
| `perf` | Performance improvement |
| `test` | Adding or modifying tests |
| `merge` | Merge commits (`merge(main): ...`) |

### Rules

- **Atomic**: 1 commit = 1 logical change
- **In English** — commitlint validates automatically
- **Present imperative**: "add", "fix", "remove" — not "added", "fixes"
- **Max 72 characters** for the first line
- **Lowercase only**, no trailing period

---

## Timing rules

- **Branch**: Before any modification. Announce: "Switching to `feat/hero-section`."
- **Commit**: As soon as a logical change is done and working. No accumulation.
- **Push**: After every session or completed task.
- **Merge**: When the branch is done + `pnpm validate` passes. Always `--no-ff`.

---

## Automatic hooks (Husky)

Every `git commit` automatically triggers:

### 1. `pre-commit` → lint-staged
- `*.{ts,tsx}`: eslint --fix + prettier --write
- `*.css`: prettier --write
- Non-auto-fixable ESLint error → commit **BLOCKED**

### 2. `commit-msg` → commitlint
- Validates Conventional Commits format
- `wip` → BLOCKED · `fix stuff` → BLOCKED · `fix(router): handle 404` → OK

---

## Releases — Semantic Versioning

```
v MAJOR . MINOR . PATCH
  │       │       └── fix: bug fixes
  │       └────────── feat: new features
  └────────────────── BREAKING CHANGE
```

**Pre-1.0**: `0.y.z` = development, nothing is stable.

```bash
pnpm release          # interactive release (auto bump)
pnpm release:patch    # 0.1.0 → 0.1.1
pnpm release:minor    # 0.1.0 → 0.2.0
pnpm release:major    # 0.1.0 → 1.0.0
```

`pnpm release` handles everything automatically: validate → bump → CHANGELOG → tag → push → GitHub Release.

---

## PR (Pull Requests)

- Short title (<70 chars): `type(scope): description`
- Body: `## Summary` + `## Test plan`
- Always link related issues

---

## Documentation

Required documentation files:
- [README.md](README.md) — Overview, quick start
- [CLAUDE.md](CLAUDE.md) — This file. AI instructions.
- [CHANGELOG.md](CHANGELOG.md) — Log of all changes
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Folder structure
- [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) — Every dependency justified
- [docs/SETUP.md](docs/SETUP.md) — Step-by-step setup guide

### Code comments

- Every component: a block at the top explaining what it does
- Every utility function: what it takes and what it returns
- Every "weird thing": if it's counter-intuitive, explain why

---

## Responsive — MANDATORY

**Every component, every page, every effect must work on ALL screens.**

- **Mobile-first**: code for mobile first, then `sm:`, `md:`, `lg:`
- **Tailwind breakpoints**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- If an effect/layout doesn't work on mobile → **don't ship it**
- Mentally test: mobile (375px) → tablet (768px) → desktop (1440px)
- Touch targets: minimum 44×44px on mobile
- Text: never smaller than `text-sm` (14px) on mobile
- No unintended horizontal scroll

**Unless the owner explicitly says "desktop only"**, everything is responsive. No exceptions.

---

## Performance — minimum standards

- **Lighthouse**: 90+ on all 4 categories
- No package > 50kb without justification
- Images: WebP/AVIF by default via Cloudinary
- Lazy loading on everything below the fold
- No unused CSS/JS in the final bundle

---

## Pre-merge checklist (automatic)

You verify all of this yourself BEFORE merging. The owner checks nothing.

1. `pnpm validate` → zero errors
2. No leftover `console.log`
3. No dead code / unnecessarily commented code
4. Clean, atomic, conventional commits
5. Mobile-first respected (if CSS/UI changed)

---

## When the owner reports a bug

**Fixing the bug is NOT enough.** You must also:

1. **Fix** the problem immediately
2. **Understand** why it happened (what rule was missing?)
3. **Add a rule** in CLAUDE.md so it NEVER happens again
4. **Document**: commit with clear explanation of the fix + the new rule

> If the owner had to report a problem, prevention has failed.
> The goal: every mistake only happens ONCE.

---

## Non-negotiable rules

### NEVER

- Act without explaining what you're doing and why
- Assume the owner knows how the code works
- Install a package without justification + explanation
- Use `--force`, `--no-verify`, or `reset --hard` without asking
- Leave dead code, unresolved `TODO`s, or ignored warnings

### ALWAYS

- Check `git status` and the active branch before coding
- Announce your plan before executing it
- Explain in simple terms (the owner is smart but doesn't code)
- `pnpm validate` before merge/push
- Separate commits by topic, even within the same session
- Think about the next person — a human dev or another AI must understand in 5 minutes
