# /test

Run tests and identify coverage gaps.

## Arguments
$ARGUMENTS — Optional: specific file, folder, or feature name. Empty = full suite.

## Steps

1. Run tests:
   - If $ARGUMENTS provided: `pnpm test -- $ARGUMENTS`
   - If empty: `pnpm test`

2. Report results (pass/fail count).

3. Find untested files:
   - List all .tsx/.ts source files (excluding tests, types, .d.ts)
   - List all test files
   - Compare to find source files without corresponding tests

4. Prioritize untested files:
   - Components (most important to test)
   - Hooks
   - Utils/lib functions
   - Config files
   - Types (no tests needed)

5. For each high-priority untested file, propose a test and ask user if they want to create it.

6. If user agrees, create the tests and run `pnpm validate`.
