---
paths: ["**"]
---

# Memory Protocol (always loaded)

Project-scoped persistent memory lives in `.claude/memory/`, tracked in Git.
Source of truth for decisions, patterns, feedback, frictions, session journals.

## Structure

```
.claude/memory/
├── INDEX.md              auto-generated via `pnpm memory:index`
├── TAGS.md               canonical tag vocabulary (closed set)
├── README.md             usage guide
├── decisions/            one file per architectural decision (ADR-style)
├── feedback/             owner feedback entries
├── patterns/             validated reusable patterns
├── frictions/            friction + resolution entries
└── sessions/             end-of-session journals
```

## When to READ

**Before any non-trivial task**, grep the relevant domain tag to surface prior context:
```bash
grep -rl "#<domain>" .claude/memory/
```
Read the top 3-5 matches before acting. Don't re-derive what's already decided.

**Always read on session start**:
- `.claude/memory/INDEX.md` (sommaire)
- Most recent file in `.claude/memory/sessions/`

## When to WRITE

| Event | Action |
|---|---|
| Architectural decision made | New file in `decisions/` immediately |
| Owner gives feedback (correction or validation) | New file in `feedback/` |
| Pattern validated as reusable | New file in `patterns/` |
| Friction encountered + resolved | New file in `frictions/` |
| End of session | Journal entry in `sessions/YYYY-MM-DD-HHMM.md` |
| Release cut | Auto-generated via `scripts/memory-record-release.js` |

**Mandatory at end of session**: write journal entry summarizing actions, decisions, frictions, next steps. Run `pnpm memory:index` before session end.

## Entry format (YAML frontmatter required)

```yaml
---
id: <slug-unique-kebab-case>
date: YYYY-MM-DD
type: decision | pattern | friction | feedback | session
tags: [#domain-tag, #type-tag, #scope-tag, #priority-tag]
scope: template | client-specific
status: active | deprecated | superseded
supersedes: <id>   # optional, if replacing prior entry
---

# Title (short, imperative)

Body in markdown. Keep focused — one decision or observation per file.
Cross-link related entries: [other entry](../decisions/other.md).
```

## Tag vocabulary (strict closed set)

Defined in `.claude/memory/TAGS.md`. Using an unlisted tag = protocol violation.
If new domain needed: add to TAGS.md via a `decisions/` entry explaining why.

## Search patterns

```bash
# all design-related entries
grep -rl "#design" .claude/memory/

# active decisions only
grep -rl "status: active" .claude/memory/decisions/

# recent sessions
ls -t .claude/memory/sessions/ | head -5

# cross-tag (design AND a11y)
grep -rl "#design" .claude/memory/ | xargs grep -l "#a11y"
```

## Lifecycle

- **active** → current truth
- **deprecated** → no longer followed, kept for history
- **superseded** → replaced by another entry (pointed to by `supersedes`)

Never delete entries. Deprecate or supersede. Git history is the audit trail.

## Scope discipline

- `#template` entries propagate to client projects via `pnpm base:update`
- `#client-specific` entries are **never** written in the steaksoap template repo
- `scripts/base-patch.js` protects `.claude/memory/decisions|feedback|patterns|frictions|sessions` from overwrite on update

## What NOT to write to memory

- Code snippets (the code is the source of truth)
- File-path listings derivable from `ls` or `git ls-files`
- Transient todos (use TodoWrite)
- Secrets or credentials (ever)

## Why this protocol exists

Sessions lose context. Git history shows *what* but not *why chosen now over alternatives*. Memory fills the gap: persistent, taggable, greppable, versioned. Inspired by claude-mem without its runtime complexity.
