# /status

Show comprehensive project health and git status.

## Steps

1. Gather git info:
   ```bash
   echo "=== Branch ==="
   git branch --show-current

   echo "=== Uncommitted Changes ==="
   git status --short

   echo "=== Unpushed Commits ==="
   git log origin/main..HEAD --oneline 2>/dev/null || echo "No remote tracking"

   echo "=== Last Release ==="
   git describe --tags --abbrev=0 2>/dev/null || echo "No releases yet"

   echo "=== Commits Since Last Release ==="
   git log $(git describe --tags --abbrev=0 2>/dev/null)..HEAD --oneline 2>/dev/null || git log --oneline -10
   ```

2. Run validation silently and report status:
   ```bash
   pnpm lint 2>&1 >/dev/null && echo "Lint OK" || echo "Lint FAIL"
   pnpm typecheck 2>&1 >/dev/null && echo "Types OK" || echo "Types FAIL"
   pnpm test 2>&1 >/dev/null && echo "Tests OK" || echo "Tests FAIL"
   pnpm build 2>&1 >/dev/null && echo "Build OK" || echo "Build FAIL"
   ```

3. Check dependency health:
   ```bash
   echo "=== Outdated Packages ==="
   pnpm outdated 2>/dev/null || echo "All up to date"

   echo "=== Security ==="
   pnpm audit 2>/dev/null || echo "No vulnerabilities"
   ```

4. Present a summary with recommended next actions based on findings.
