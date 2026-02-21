# /update-deps

Update project dependencies safely with validation.

## Steps

1. Check current state:
   ```bash
   pnpm outdated
   ```

2. Categorize updates:
   - SAFE (auto-apply): patch updates only (x.y.PATCH)
   - REVIEW (ask user): minor updates (x.MINOR.z)
   - BREAKING (always ask): major updates (MAJOR.y.z)

3. Apply SAFE updates:
   ```bash
   pnpm update  # Updates within semver ranges
   ```

4. Run `pnpm validate` after safe updates:
   - If passes -> commit: `chore(deps): update patch dependencies`
   - If fails -> revert with `git checkout pnpm-lock.yaml package.json && pnpm install`

5. For REVIEW and BREAKING updates:
   - List each with: package name, current -> proposed version
   - Ask user which to apply
   - Apply one at a time, validate after each
   - Commit each successful update separately

6. Update `docs/DEPENDENCIES.md` if any dependency versions changed significantly.

## Notes
- NEVER auto-update major versions
- ALWAYS validate after every update batch
- If a specific update breaks things, revert just that one
