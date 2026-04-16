# Memory — Project-scoped persistent context

Tagged, versioned, greppable. Survives sessions. Inspired by claude-mem, without its runtime complexity.

## Structure

```
decisions/     architectural decisions (ADR-style)
feedback/      owner feedback (corrections + validations)
patterns/      validated reusable patterns
frictions/     friction encountered + how it was resolved
sessions/      end-of-session journals (YYYY-MM-DD-HHMM.md)
```

## Quickstart

**Find prior context before a task**:
```bash
grep -rl "#design" .claude/memory/
grep -rl "#design" .claude/memory/ | xargs grep -l "#a11y"
```

**Rebuild the index**:
```bash
pnpm memory:index
```

**Write a new entry**: copy the frontmatter template from `.claude/rules/memory-protocol.md` and drop a file in the right folder.

## Tag vocabulary

Strict closed set. See `TAGS.md`. Unlisted tags = refused by the indexer.

## Scope

- `#template` entries propagate to client projects via `pnpm base:update`
- `#client-specific` entries stay local — **never** committed in the steaksoap template
- `scripts/base-patch.js` protects `decisions/`, `feedback/`, `patterns/`, `frictions/`, `sessions/` from overwrite on update

## Lifecycle

- **active** → current truth
- **deprecated** → no longer followed, kept for history
- **superseded** → replaced by another entry (pointed to by `supersedes`)

Never delete. Git is the audit trail.

## Full protocol

`.claude/rules/memory-protocol.md` (always loaded).
