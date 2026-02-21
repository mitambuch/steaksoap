# /refactor

Analyze code against project rules and propose a cleanup plan.

## Arguments
$ARGUMENTS — File path, feature name, or "all recent" to check recent changes.

## Steps (follow this exact sequence)

1. **READ CONTEXT** — Load relevant rules:
   - Read `.claude/decisions.md` for architecture decisions
   - Read rules in `.claude/rules/` relevant to the target files
   - Check `CLAUDE.md` for project-wide conventions

2. **SCOPE** — Determine what to analyze:
   - If a file path: analyze that file
   - If a feature name: analyze everything in `src/features/<name>/`
   - If "all recent": run `git diff main~5..main --name-only` and analyze changed files

3. **ANALYZE** — Compare code against rules:
   - TypeScript strict compliance (no `any`, no `as`, no non-null assertions)
   - Import path aliases (@components, @hooks, etc.)
   - cn() for all className merging
   - Tailwind tokens only (no hardcoded colors)
   - Mobile-first responsive (base then sm: md: lg:)
   - Test coverage (test file exists beside each component/hook)
   - Naming conventions (PascalCase components, camelCase hooks)
   - Dead code, unused imports, TODO comments

4. **CLASSIFY** — Present findings:
   ```
   MUST FIX — Rule violations:
   - [file:line] Description of the violation

   SHOULD FIX — Non-ideal patterns:
   - [file:line] Description and suggested improvement

   NICE TO HAVE — Optional improvements:
   - [file:line] Description
   ```

5. **CONFIRM** — Wait for user approval:
   - Present the plan clearly
   - Ask: "Which categories should I fix? (all / must only / pick specific items)"
   - Do NOT proceed without confirmation

6. **APPLY** — Fix approved items:
   - Apply changes one file at a time
   - Preserve existing behavior
   - Don't introduce new features while refactoring

7. **VALIDATE**:
   ```bash
   pnpm validate
   ```

8. **COMMIT**:
   ```
   refactor(<scope>): <what was cleaned up>
   ```
