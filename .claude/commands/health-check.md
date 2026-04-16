# /health-check

Comprehensive project health audit. Run monthly or before any major delivery.

## Philosophy

Code rots. Dependencies age. Docs drift. Tests erode.
This command catches decay early — before it becomes a problem.

## Phase 1 — Validation Gate

```bash
pnpm validate
```

If this fails, stop and fix. Everything else is secondary.

## Phase 2 — Dependency Health

### Outdated packages
```bash
pnpm outdated
```

Classify each outdated package:
- **Critical**: security patch or major framework (React, Vite, Tailwind, TypeScript)
- **Important**: testing tools, lint tools, build tools
- **Low priority**: cosmetic, optional utilities

### Security audit
```bash
pnpm audit --prod
```

Report any vulnerabilities with severity and affected package.

### Unused dependencies
Check each production dependency in `package.json`:
- Search for imports of that package across `src/`
- If no imports found → flag as potentially unused

## Phase 3 — Code Quality

### Dead code scan
Check for:
- Exported functions/components with zero imports elsewhere
- Files in `src/` with no imports from other files
- Empty barrel exports (`index.ts` that export nothing useful)
- Unused type definitions

### Token consistency
Verify design tokens are in sync:
1. Read accent color from `src/index.css` @theme
2. Grep for hardcoded color values in `src/` (any hex that matches accent but isn't using the token)
3. Verify all transparent accent usages use `color-mix()`, not `rgba()` with manual RGB
4. Check that `.claude/decisions.md` matches the actual accent value

### Import hygiene
```bash
# Check for relative imports that should use aliases
grep -r "from '\.\./\.\./\.\." src/ --include="*.ts" --include="*.tsx" | head -20
```

Flag any deep relative imports (3+ levels) that should use path aliases.

## Phase 4 — Test Health

### Coverage check
```bash
pnpm test:coverage 2>&1 | tail -20
```

Report:
- Overall coverage percentage
- Files with 0% coverage
- Components without any test file

### Missing tests
For each file in these directories, check if a corresponding test exists:
- `src/components/ui/` → `src/components/ui/__tests__/`
- `src/components/layout/` → `src/components/layout/__tests__/`
- `src/pages/` → `src/pages/__tests__/`
- `src/hooks/` → `src/hooks/__tests__/`
- `src/features/*/` → `src/features/*/__tests__/`

### Accessibility test coverage
For each UI component test, check if it includes `toHaveNoViolations()` (vitest-axe).
List components missing a11y tests.

## Phase 5 — Documentation Drift

Check these files exist and are not stale:
- `CLAUDE.md` — does it reference the correct project structure?
- `docs/ARCHITECTURE.md` — does the folder tree match reality?
- `docs/SETUP.md` — do the commands still work?
- `docs/DEPENDENCIES.md` — does it list all current deps?
- `.claude/decisions.md` — does it point to `.claude/memory/INDEX.md`?
- `.claude/memory/INDEX.md` — regenerate with `pnpm memory:index` and diff
- `HANDOFF.md` — does it exist? Is it up to date?

For each doc, compare key claims against reality (file paths, command names, version numbers).

### Phase 5.5 — `.claude/` vs `docs/` drift

`docs/` files summarise `.claude/` with examples. They drift when new commands
or rules are added without updating the guide.

Run these counts and flag any mismatch:

```bash
ls .claude/commands/*.md | wc -l          # actual command count
grep -c '^- `/' docs/REFERENCE.md         # commands listed in REFERENCE

ls .claude/rules/*.md | wc -l              # actual rule count
grep -c '^- `.claude/rules/' docs/REFERENCE.md || true

ls .claude/agents/*.md | wc -l             # actual agent count
grep -c '^### ' docs/agents.md            # agents documented
```

If `.claude/` has MORE than `docs/` → guide needs updating.
If `docs/` has MORE than `.claude/` → orphan references to removed commands.

## Phase 6 — Infrastructure Check

### CI/CD
- Do GitHub Actions workflows exist?
- Are they using the current Node version?
- Is the CI running the same checks as `pnpm validate`?

### Git hooks
```bash
ls .husky/ 2>/dev/null
```
- Is pre-commit hook present?
- Is commit-msg hook present?

### TypeScript strictness
```bash
grep -A5 '"strict"' tsconfig.json
```
Verify strict mode is still enabled with all strict flags.

## Phase 7 — Report

Present findings as:

```
═══════════════════════════════════════════════════════════
HEALTH CHECK: [project name] — [date]
═══════════════════════════════════════════════════════════

VALIDATION           ✅ Pass / ❌ Fail
DEPENDENCIES         ✅ Up to date / ⚠️ X outdated / ❌ vulnerabilities
CODE QUALITY         ✅ Clean / ⚠️ X issues
TEST COVERAGE        ✅ X% / ⚠️ below threshold / ❌ failing tests
DOCUMENTATION        ✅ In sync / ⚠️ X files drifted
INFRASTRUCTURE       ✅ Complete / ⚠️ missing pieces

SCORE: X/10

ACTIONS NEEDED (by priority):
  🔴 Critical: [must fix now]
  🟡 Important: [fix this week]
  🟢 Nice to have: [fix when convenient]
```

## Rules
- Run this command with NO code changes — read-only audit
- Never auto-fix issues — report them for the user to decide
- Compare against project reality, not docs (code is the source of truth)
- Be honest about the score — don't inflate
