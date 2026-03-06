# Template Maintenance Guide

This file is for maintainers of the project template. If you're a user, ignore it.

## How the template update system works

Users can pull latest template improvements:

```bash
pnpm setup:update
```

This runs `git fetch template && git merge template/main --allow-unrelated-histories`.

The `template` remote is set up during `pnpm setup`:
- If the user cloned directly: `origin` is renamed to `template`
- If the user used "Use this template": `template` is added as a new remote

## What's safe for users to modify

Everything in `src/` is user territory. They can change anything.

## What should stay stable

- `scripts/` — setup and release scripts
- `.claude/` — AI rules, commands, agents
- Config files (eslint, prettier, commitlint, vite, vitest, tsconfig)
- `.github/workflows/` — CI configuration

Changes to these files will be pulled by `setup:update` and may cause merge conflicts.

## Contributing to the template

1. Fork the repo
2. Create a feature branch
3. Make changes
4. Run `pnpm validate`
5. Submit a PR with conventional commit message

## Release process

Template releases follow semver:
- **Patch**: bug fixes, doc updates
- **Minor**: new components, new commands, new features
- **Major**: breaking changes to structure or config
