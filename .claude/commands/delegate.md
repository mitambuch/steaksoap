# /delegate

Generate a self-contained prompt to hand off to a parallel Sonnet session
(or any sibling Claude instance). The output is copy-paste-able — no extra
context required from the recipient.

## Use cases

- Heavy research that would burn the main thread's context
- Independent implementation tasks (build N variants of X, audit Y file)
- Security/perf audits in parallel
- Long-running validation work the owner can babysit elsewhere

## Arguments

`/delegate <task description>`

## Steps

### 1. Surface relevant context (don't dump everything)

- Identify the **domain tags** implied by the task (`#design`, `#perf`, `#a11y`, etc.)
- Run `grep -rl "#<tag>" .claude/memory/` for each relevant tag
- Read the matching memory entries (decisions, patterns, frictions)
- Note the relevant rule files (`.claude/rules/*.md`) — only those that apply

### 2. Compose the prompt block

Output a single fenced block the user can copy. Structure:

```text
=== STEAKSOAP DELEGATION PROMPT ===
Generated: <ISO date>
Source repo: <repo name>
Source branch: <current branch>

## Project at a glance
<3-line summary from CLAUDE.md: stack + purpose + key conventions>

## Always-loaded rules (the recipient must respect these)
- .claude/rules/critical.md    — non-negotiables
- .claude/rules/principles.md  — Karpathy four
- .claude/rules/memory-protocol.md
- .claude/rules/releases.md
- .claude/rules/workflow.md

## Relevant project memory (curated for this task)
<list of .claude/memory/**/*.md entries with their tag set, full body inlined
 — only the entries actually relevant to the task>

## Task
<verbatim task description from the user, expanded with success criteria>

## Constraints
- Do NOT touch <files outside scope>
- Do NOT introduce new dependencies without listing them in the return
- Match existing patterns in <file or area>

## Deliverables (return format)
- Bullet list of what you must hand back to the requesting session
- Format: markdown, no fenced JSON unless asked
- Include: changed files (path + diff), decisions taken, friction encountered,
  reproducible test command, residual risks

## Hand-back protocol
The owner pastes your full output back into the originating session, which
will run `/integrate` to merge findings into project memory.
=== END PROMPT ===
```

### 3. Tell the user what to do

```
🧑 ACTION HUMAINE REQUISE
QUOI    : open a parallel Claude Code (Sonnet) session and paste the block above
POURQUOI: offload <reason> without consuming this thread's context
COMMENT : new terminal → claude → paste prompt → wait for output
LIVRABLE: paste the Sonnet output back here, then I run /integrate
```

## Notes

- Keep the prompt **self-contained**. The recipient session has zero history.
- Do **not** include secrets or API keys (memory entries should never contain them anyway).
- Prefer Sonnet for the delegated session: cheaper, faster, sufficient for most delegated tasks.
- If the task is trivial enough to do in-thread, skip `/delegate` and just do it.
