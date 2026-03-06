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

5. Draft a descriptive release title (mandatory):
   - Summarize the key changes in 3-6 words
   - Good: "Cockpit Hardening & Reuse-First Generators"
   - Bad: "v4.1.0", "release", "various fixes"
   - Present the title to the user for approval

6. If confirmed, execute:
   ```bash
   node scripts/release.js <type> "<Title>"
   ```
   This handles: version bump, CHANGELOG.md update, git tag, GitHub release with descriptive name.

7. Report: new version number, release title, changelog URL, git tag name.

## Notes
- Never release if validate fails
- Batch changes — don't release after every commit
- The release title is **required** — the script will refuse to run without one
- To force a specific version: `node scripts/release.js patch "Title"`, `minor`, or `major`
