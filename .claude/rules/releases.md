---
paths: ["**"]
---

# Release Proactivity (always loaded)

The owner wants **every decision traceable** via Git. No silent accumulation.
Full release mechanics in `.claude/rules/git.md`.

## Mandatory: end-of-session RELEASE CHECK

Every session must end with this block — no exceptions:

```
RELEASE CHECK:
- Commits depuis dernière release : X
- Types : feat(N) · fix(N) · chore(N) · docs(N) · refactor(N) · test(N)
- Recommandation : release v<X.Y.Z> | wait
- Raison : [explicit argument based on git.md criteria]
- Next milestone : [if waiting, what triggers the next release]
```

## Quick decision matrix (from git.md)

**Release now** if any of:
- 1+ `feat` + 3+ accumulated `fix`/`chore`
- 5+ coherent commits since last release
- Critical fix that must ship immediately
- Owner explicitly says "release"
- End of major work session with many changes

**Accumulate** if:
- Single small fix or chore in isolation
- Only minor docs change
- Internal refactor with no visible impact
- Fewer than 3 commits since last release (unless critical)

## Release type (auto-detect)

| Commits since last release | Bump |
|---|---|
| Only fix/docs/chore/refactor | patch |
| 1+ feat | minor |
| Any `feat!:` or `BREAKING CHANGE:` | major |

## Release title (mandatory)

Descriptive, human-readable, 5+ chars. Must describe *content*, not version.
- ✓ "Workflow Hardening & Tagged Memory"
- ✓ "Accessibility Pass & Form Validation Fixes"
- ✗ "v1.2.0" · "release" · "update"

## Auto-journaling

On successful release (via `release-it` `after:release` hook), `scripts/memory-record-release.js` writes a decision entry to `.claude/memory/decisions/YYYY-MM-DD-release-vX.Y.Z.md` tagged `#release #milestone`. No manual action required.

## Why this rule exists

Without proactive release checks, commits accumulate silently and CHANGELOG value degrades. The owner wants the Git log to read like a logbook — every milestone captured, every decision dated.
