---
paths: ["src/**", "scripts/**", "docs/**", "*.md", "*.json", "*.ts", "*.js"]
---

# Workflow Rules

## Non-negotiable (every task, every time)

1. **Branch from main**: `git checkout main && git pull && git checkout -b <type>/<scope>`
   Never commit to main. Never work on a leftover branch. Never skip this.
2. **Read before act**: Read CLAUDE.md + relevant .claude/rules/ before touching code
3. **Check state**: `git status && git branch` before starting
4. **Validate before commit**: `pnpm validate` must pass. No exceptions.
5. **Conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
6. **Protected pages**: Never delete `/playground` or `/lab`. Verify after design token changes.
7. **Reuse Playground components**: Check workbench/ before creating new UI components.

## Task checklist

1. `git checkout main && git pull origin main`
2. `git checkout -b <type>/<short-name>`
3. Read relevant .claude/rules/ files
4. Code — explain important decisions
5. `pnpm validate` — zero errors
6. Commit (conventional, atomic)
7. `git checkout main && git merge --no-ff <branch>`
8. `git push origin main`
9. `git branch -d <branch>`
10. Evaluate if release is warranted (see git.md)
11. Summarize: what changed, what to test

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
| "add/fix X" | Full workflow: branch → code → validate → commit → merge → push |
| "commit" | git add + conventional commit |
| "push" | git push origin main (or active branch) |
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
