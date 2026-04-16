---
paths: ["src/**", "scripts/**", "docs/**", "*.md", "*.json", "*.ts", "*.js"]
---

# Workflow Rules

## Session start (first thing, every session)

Before any work, get oriented:
1. `git log --oneline -10` — what happened recently
2. `git status && git branch` — where are we now
3. Read CLAUDE.md — architecture, conventions, and if present: Design Direction + Composition Rules
4. Read `.claude/decisions.md` — active architectural decisions

This replaces re-explaining context. The code and git history are the source of truth.

## Non-negotiable (every task, every time)

1. **Branch from main**: `git checkout main && git pull && git checkout -b <type>/<scope>`
   Never commit to main. Never work on a leftover branch. Never skip this.
2. **Read before act**: Read CLAUDE.md + relevant .claude/rules/ before touching code
3. **Check state**: `git status && git branch` before starting
4. **Validate before commit**: `pnpm validate` must pass. No exceptions.
5. **Conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
6. **Protected pages**: Never delete `/playground` or `/lab`. Verify after design token changes.
7. **Reuse Playground components**: Check workbench/ before creating new UI components.

## Task checklist — standard (default)

1. `git checkout main && git pull origin main`
2. `git checkout -b <type>/<short-name>`
3. Read relevant .claude/rules/ files
4. Code — explain important decisions
5. `pnpm validate` — zero errors
6. Commit (conventional, atomic)
7. Summarize: what changed, what to test

**Stop here.** Merge, push, and release only on explicit request.

## Merge & push (on request only)

When the user says "merge", "push", or delivery is clearly requested:
1. `git checkout main && git merge --no-ff <branch>`
2. `git push origin main`
3. `git branch -d <branch>`
4. Evaluate if release is warranted (see git.md)

"push" always means: merge to main + push to origin. Not a raw `git push` of a feature branch.

## User profile

The owner is a vibe coder: describes goals, AI executes with rigor.
- Prefers summaries over raw code
- High standards — if it's not clean, it doesn't ship
- AI handles git, terminal, config, commands
- Adapt: if they paste code, be technical. If they describe features, explain everything.

## Communication format

Major action:
```
ACTION: [what]  WHERE: [file(s)]  WHY: [1 sentence]  RISK: [none/low/medium]
```

Bug:
```
ERROR: [name]  CAUSE: [simple explanation]  FIX: [proposal]  WHERE: [file:line]
```

New package:
```
PACKAGE: [name] — [what it does]  STATS: [downloads, last updated]  WHY: [reason]
```

## When the owner says...

| They say | You do |
|---|---|
| "add/fix X" | Branch → code → validate → commit (stop). Merge/push only if asked. |
| "commit" | git add + conventional commit |
| "push" | Merge to main + git push origin main |
| "release" | Immediate release with correct type |
| "status?" | git status + log since last release + summary |

## Bug reports

Fix is NOT enough. Also:
1. Understand root cause
2. Add a rule to prevent recurrence
3. Document in commit message

## NEVER

- Act without explaining what and why
- Install a package without justification
- Use --force, --no-verify, or reset --hard without asking
- Leave dead code or unresolved TODOs
- Assert something is unused without verifying in code first
- Change project direction without owner approval

## ALWAYS

- Check git status and branch before coding
- `pnpm validate` before merge/push
- Separate commits by topic
- Add `// WHY: ...` comments on non-obvious decisions
- Update `docs/DEPENDENCIES.md` when adding/removing packages
- Follow `/new-page`, `/new-component`, `/new-hook`, `/new-feature` patterns automatically
- Check extension registry before recommending any library (`/discover`)
- Preserve `pnpm setup --update` workflow

## Proactive guidance

Never wait for the user to figure things out:
1. Check extension registry first — use `/install-extension` if a curated option exists
2. Recommend approach with reasoning: "For this, I suggest X because Y"
3. Split work: "I'll handle [technical]. You need to [human-only: accounts, API keys]"
4. Handle everything: install, configure, wire up, test, commit

The user should never research libraries, read docs for setup, or touch terminal/git/config.
They only: create accounts, copy API keys, approve payments.

## User mobilization (when help is needed)

The owner is part of the equation, not a spectator. Use them when only a human
can do the task: visual judgment, account creation, API keys, cross-device
testing, taste calls. Use this exact format every time so it's scannable:

```
🧑 ACTION HUMAINE REQUISE
QUOI    : [exact action — single sentence]
POURQUOI: [why this is needed now, not optional]
COMMENT : [step-by-step, numbered if multi-step]
LIVRABLE : [what you need back from the user — screenshot, key, yes/no, file path]
DEADLINE: [optional — only if blocking other work]
```

When to mobilize:
- Visual checks (screenshot a page, click test, design judgment)
- Account creation, API keys, payment authorizations
- Brand / taste / copy decisions only the owner can make
- Cross-device testing on physical hardware Claude can't reach
- Validations from third parties (client approval, legal review)

When NOT to mobilize:
- Anything Claude can do (running commands, reading files, writing code)
- Asking the owner to research a library — Claude must check the extension
  registry and recommend instead.

## Delegation to a parallel Sonnet session

For heavy research, independent implementations, or work that would burn this
session's context, generate a self-contained handoff with `/delegate <task>`.
The owner pastes the output into a sibling session, runs it, then pastes the
result back here for `/integrate`.

## Execution modes

### Batch mode (default)

Execute plans without asking confirmation at each step.
- Follow ALL rules, conventions, quality standards
- `pnpm validate` after each commit — fix failures before continuing
- At the end, provide a single summary:
  ```
  DONE:
  1. [action] → [result]
  2. [action] → [result]
  All commits passed pnpm validate.
  ```

### STOP even in batch mode

- `pnpm validate` fails and fix isn't obvious
- Decision could break existing functionality
- Deleting files not in the plan
- Installing unplanned packages
- Anything irreversible not explicitly requested

### Checkpoint mode

When the user says "checkpoint", "stop and ask", "attends":
- Ask confirmation before each major action
- Use for sensitive or learning contexts

### Switching

- "batch" / "trust" / "go" / "fonce" / "fais tout" → batch mode
- "checkpoint" / "attends" / "stop and ask" → checkpoint mode
