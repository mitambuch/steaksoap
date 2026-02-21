---
paths: ["package.json", "src/lib/**", "src/features/**"]
---

# Extension Discovery Rule

Before installing a new library or integration, check if the steaksoap registry has a curated extension for it.

## Process

1. Read `registry/extensions.json`
2. Search extensions by tags, name, and description
3. If a match exists: suggest `/install-extension {id}` to the user
4. If no match: proceed with manual installation following project conventions

## Why

Curated extensions include:
- Verified package combinations that work together
- Step-by-step setup instructions aligned with steaksoap conventions
- Documentation links for the user
- Proper environment variable handling

Manual installation should only happen when the registry has no matching extension.
