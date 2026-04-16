# /integrate

Ingest the output of a `/delegate` session and merge it back into the project.

## Arguments

`/integrate` — then the user pastes the Sonnet session's output as the next message.

## Steps

### 1. Parse the handoff

Read the pasted output. Extract:
- Files changed (paths + diffs or full content)
- Decisions taken (what + why)
- Frictions encountered
- Test command + residual risks
- Any flagged dependencies

### 2. Validate before applying

For each change:
- Does it respect always-loaded rules (`critical.md`, `principles.md`, `memory-protocol.md`)?
- Does it match patterns in similar parts of the repo?
- Does it stay within scope of the original task?
- Are sizing limits (`.claude/rules/sizing.md`) respected?

If anything fails: flag it with the user before applying. Do **not** silently fix mismatches.

### 3. Apply changes on the current branch

If the current branch is `main`/`master`: refuse and prompt to branch first
(the husky pre-commit will block anyway).

Apply edits using Edit/Write. Run `pnpm validate` after.

### 4. Write a memory entry

Create `.claude/memory/decisions/YYYY-MM-DD-<slug>.md` with frontmatter:

```yaml
---
id: <slug>
date: YYYY-MM-DD
type: decision
tags: [#delegated, #<domain>, #template-or-client-specific, #active]
scope: template | client-specific
status: active
---

# <short title>

## Source
Delegated to a parallel Sonnet session on <date>. Original task:
> <verbatim original task>

## Outcome
<summary of what was done, what was decided, what was rejected and why>

## Frictions encountered
<list — surfaces useful context for future similar work>

## Risks / follow-ups
<residual risks, deferred items>
```

### 5. Run memory:index + summarize

```bash
pnpm memory:index
```

Then output to the user:
- Files changed (paths)
- New memory entry path
- Validation result (`pnpm validate`)
- RELEASE CHECK block (per `.claude/rules/releases.md`)

## Notes

- A delegation that produced no actionable output still deserves a memory entry under `frictions/` — captures dead-ends so we don't redo them.
- If the Sonnet output conflicts with project rules, **rules win**. Surface the conflict, don't paper over it.
