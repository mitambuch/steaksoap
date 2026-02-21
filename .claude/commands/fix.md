# /fix

Systematically diagnose and fix a bug.

## Arguments
$ARGUMENTS — Description of the bug, error message, or unexpected behavior.

## Steps (follow this exact sequence)

1. **REPRODUCE** — Understand the bug:
   - What is the expected behavior?
   - What is the actual behavior?
   - Search codebase for related files
   - Check recent changes: `git log --oneline -10`

2. **ISOLATE** — Find the source:
   - Narrow down to specific file(s) and function(s)
   - Check if the bug is in our code or a dependency
   - If dependency: check their issues/changelog for known bugs

3. **ROOT CAUSE** — Explain WHY:
   - Report to the user:
     - ACTION: "I'm investigating the bug in [file]"
     - WHERE: "The issue is in [function] at line [N]"
     - WHY: "It breaks because [root cause]"
     - RISK: "Fixing this could affect [related functionality]"

4. **FIX** — Minimal change:
   - Fix ONLY the reported bug
   - Don't refactor other code while fixing
   - Don't fix "other things I noticed"
   - Preserve existing behavior for unrelated code paths

5. **TEST** — Prove the fix:
   - Write a test that FAILS without the fix
   - Confirm the test PASSES with the fix
   - If a test already exists that should have caught this, fix the test too

6. **VALIDATE** — Confirm no regressions:
   ```bash
   pnpm validate
   ```

7. **COMMIT**:
   ```
   fix(<scope>): <what was fixed>

   Root cause: <brief explanation>
   ```
