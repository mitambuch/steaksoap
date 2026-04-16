---
paths: ["**"]
---

# Critical — Non-Negotiables (always loaded)

These rules apply to **every** task, every session, every file. No exceptions.
Short form here. Full details in the pointed-to rules.

## 1. Branch before code
Never commit directly to main. Before any change:
`git checkout main && git pull && git checkout -b <type>/<scope>`
Full workflow: `.claude/rules/workflow.md`.

## 2. Consult memory before acting
Before any non-trivial task, grep the relevant domain tag:
`grep -r "#<domain>" .claude/memory/`
Write to memory when decisions are made. Protocol: `.claude/rules/memory-protocol.md`.

## 3. Release check at end of every session
At session end, always output:
```
RELEASE CHECK:
- Commits depuis dernière release : X (types)
- Recommandation : [release vX.Y.Z / wait]
- Raison : [explicit]
```
Full rule: `.claude/rules/releases.md`.

## 4. Karpathy principles (every change)
Think before coding · Simplicity first · Surgical changes · Goal-driven execution.
Full rule: `.claude/rules/principles.md`.

## 5. User mobilization
When a task requires the owner (screenshots, keys, tests, validation), use:
```
🧑 ACTION HUMAINE REQUISE
QUOI : [exact action]
POURQUOI : [reason]
COMMENT : [steps]
LIVRABLE : [what to return]
```

## 6. Validate before commit
`pnpm validate` must pass (lint + typecheck + test + build). No `--no-verify` escape.

## Why this file exists
Only `workflow.md` was always-loaded before; other rules were path-triggered.
Under context fatigue, non-negotiables were forgotten. This file keeps them in context regardless of which files are touched.
