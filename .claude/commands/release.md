# /release

Evaluate pending changes and create a versioned release.

## Steps

1. Pre-checks:
   - Confirm we're on `main` branch
   - Confirm working tree is clean (`git status --porcelain` is empty)
   - Run `pnpm validate` — abort if fails

2. Analyze unreleased commits:
   ```bash
   git log $(git describe --tags --abbrev=0 2>/dev/null)..HEAD --oneline
   ```
   Group by type: feat, fix, docs, refactor, chore, etc.

3. Determine version bump:
   - Only `fix:` commits -> patch (x.y.Z)
   - Any `feat:` commits -> minor (x.Y.0)
   - Any `feat!:` or BREAKING CHANGE -> major (X.0.0)

4. Present to user:
   - Current version: (from package.json)
   - Proposed version: (based on analysis)
   - Changelog preview (list of commits grouped by type)
   - Ask for confirmation

5. If confirmed, execute: `pnpm release` (runs release-it)
   - This handles: version bump, CHANGELOG.md update, git tag, GitHub release

6. Report: new version number, changelog URL, git tag name.

## Notes
- Never release if validate fails
- Batch changes — don't release after every commit
- If user wants to force a specific version: `pnpm release:patch`, `pnpm release:minor`, `pnpm release:major`
