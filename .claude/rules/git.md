---
paths: [".github/**", "scripts/release.js", "CHANGELOG.md"]
---

# Git & Release Rules

## Branching
See workflow.md "Always, no exceptions" point 2 for the branching procedure.
Quick ref: `git checkout main && git pull` → `git checkout -b <type>/<scope>`.
Never commit directly to main. Delete branch after merge.

## Commits — Conventional Commits (enforced by commitlint)
Format: `type(scope): description`

Types:
- feat: — new feature (triggers minor version bump)
- fix: — bug fix (triggers patch version bump)
- docs: — documentation only
- style: — formatting, missing semicolons, etc. (no logic change)
- refactor: — code restructuring (no feature/fix)
- test: — adding or updating tests
- chore: — maintenance, dependencies, tooling
- merge: — merge commits (merge(main): ...)

Breaking changes: `feat!:` or add `BREAKING CHANGE:` in commit body → major version bump

Rules:
- Atomic: 1 commit = 1 logical change
- In English — commitlint validates automatically
- Present imperative: "add", "fix", "remove" — not "added", "fixes"
- Max 72 characters for the first line
- Lowercase only, no trailing period
- Scope is required (commitlint enforces scope-empty rule)

## Commit body — enriched format for feat/fix (required)

Every `feat` and `fix` commit must include a structured body. The pre-existing
commit-msg hook warns (not blocks) if `WHY:` is missing.

```
type(scope): title (<72 chars)

WHY: why this change, now — link to the motivation
WHAT: the concrete change — what the diff does
IMPACT: files / features / users affected
TEST: how the change is validated (command, manual step, reference)
REFS: optional — link to memory entry, issue, or decision
      e.g. REFS: .claude/memory/decisions/2026-04-16-template-baseline.md
```

For `chore`, `docs`, `style`, `refactor`, `test`: body is free-form and optional
(no WHY enforcement). Keep reasons inline if non-obvious.

The intent is **no silent decisions** — every meaningful change has a paper trail
in the Git log ("psychopath-level logs" — owner's own words).

## Timing
- Branch: before any modification
- Commit: as soon as a logical change is done and working
- Push: only on explicit request (see workflow.md)
- Merge: when branch is done + `pnpm validate` passes. Always `--no-ff`

## Release workflow — BATCH RELEASES
Releases are the project's logbook. Each one must have meaningful content.
The CHANGELOG + GitHub Releases = the readable history of the project.

**Principle: NO release for every small change.** A release groups a logical batch of work.

### When to release
YES, release now:
- At least 1 `feat` + a few accumulated `fix`/`chore`
- A batch of 5+ coherent commits (even without feat)
- A critical fix that must ship immediately
- The owner explicitly says "release"
- End of a major work session with many changes

NO, accumulate:
- A single small fix or chore in isolation
- A minor docs change
- An internal refactor with no visible impact
- Fewer than 3 commits since last release (unless critical fix)

### Release type (automatic choice)
| Accumulated commits since last release | Type |
|---|---|
| Only fix, docs, chore, refactor | patch (0.6.0 → 0.6.1) |
| At least one feat | minor (0.6.0 → 0.7.0) |
| Breaking change | major (0.6.0 → 1.0.0) |

### Running a release
```bash
node scripts/release.js <type> "Descriptive Title"
```
Examples:
- `node scripts/release.js patch "Cockpit Hardening & Quality Polish"`
- `node scripts/release.js minor "Lab Page & Lint Boundaries"`
- `node scripts/release.js "Audit Fixes & Reuse-First"` (auto-detect bump)

**The title is mandatory.** It must describe what the release contains, not the version number.
Good: "Performance & Quality Polish" — Bad: "v4.1.0", "release", "update"

### CHANGELOG rules
- The `.release-it.json` defines which commit types appear in the CHANGELOG
- NEVER set `"hidden": true` on any commit type (except `merge`)
- Every feat, fix, chore, docs, refactor, style, test, perf MUST appear
- If the owner reports an empty CHANGELOG → it's a config bug

### Session summary (mandatory at end of every session)
```
SESSION SUMMARY:
- Commits since last release: X (list types)
- Release done: yes vX.Y.Z / no — not enough content
- Next release estimated: when Y is finished
```

## Pull Requests
- Short title (<70 chars): `type(scope): description`
- Body: `## Summary` + `## Test plan`
- Always link related issues

## Pre-merge checklist
Before merging any PR:
- [ ] `pnpm validate` passes (lint + typecheck + test + build)
- [ ] No console.log/console.warn left in production code
- [ ] Tests cover new functionality
- [ ] Responsive tested at 320px and 1024px minimum
- [ ] Accessibility basics: focus visible, labels present, contrast OK
- [ ] Commit messages follow conventional format

## Husky hooks (automatic)
Every `git commit` triggers:
1. pre-commit → lint-staged (eslint --fix + prettier --write on staged files)
2. commit-msg → commitlint (validates conventional format)
Non-auto-fixable ESLint error → commit BLOCKED
