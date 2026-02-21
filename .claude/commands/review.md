# /review

Perform a code review of recent changes.

## Steps

1. Get changed files:
   ```bash
   git diff main --name-only 2>/dev/null || git diff HEAD~1 --name-only
   ```

2. For EACH changed file, check against this checklist:

   **TypeScript**
   - [ ] No `any` types
   - [ ] No unsafe `as` casts
   - [ ] Proper error handling (try/catch with typed errors)

   **React**
   - [ ] No unnecessary re-renders
   - [ ] Proper useEffect dependency arrays
   - [ ] Keys on lists (never array index for dynamic lists)

   **Accessibility**
   - [ ] Interactive elements have accessible names
   - [ ] Form inputs have labels
   - [ ] Focus visible on all interactive elements

   **Responsive**
   - [ ] Mobile-first classes
   - [ ] No fixed widths that break on mobile

   **Testing**
   - [ ] New code has tests
   - [ ] Tests test behavior, not implementation

   **Security**
   - [ ] No hardcoded secrets
   - [ ] No dangerouslySetInnerHTML with user data

   **Code Quality**
   - [ ] Using path aliases (@components, @utils, etc.)
   - [ ] No dead code (unused imports, variables, functions)
   - [ ] No console.log left in production code

3. Report findings:
   **Must Fix** — blocks merge
   **Should Fix** — quality concern
   **Nice to Have** — improvement suggestion

   For each finding: file, line, what's wrong, how to fix it.
