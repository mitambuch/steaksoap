# AI Sub-agents

This project includes 4 specialized agents in `.claude/agents/`.
These are personas that Claude Code can adopt for specific tasks.

## How to use

Tell Claude Code: "Act as the [agent name] agent" or reference them in your prompt.

## Agents

### Reviewer

**File**: `.claude/agents/reviewer.md`
**Use when**: You want a thorough code review of recent changes.

Runs a systematic checklist covering TypeScript strictness, React patterns, accessibility, performance, Tailwind usage, and security. Output is grouped by severity:

- **MUST FIX** — bugs, security issues, broken accessibility
- **SHOULD FIX** — non-ideal patterns, missing edge cases
- **NICE TO HAVE** — style improvements, minor optimizations

Always suggests concrete fixes, never just points out problems.

### Debugger

**File**: `.claude/agents/debugger.md`
**Use when**: Something is broken and you need systematic diagnosis.

Follows a strict 8-step workflow:
1. Reproduce the bug
2. Search for related code
3. Isolate the failure point
4. Find the root cause
5. Implement the fix
6. Prove with a test (must fail if fix is reverted)
7. Validate (`pnpm validate`)
8. Commit

Reports ACTION / FINDING / NEXT at every step. Never guesses — traces and proves.

### Designer

**File**: `.claude/agents/designer.md`
**Use when**: Making UI/UX decisions within the design system.

Always reads design tokens first, designs mobile-first (320px minimum), and ensures accessibility. Every component gets a full state checklist:

- Default, hover, active, focus, disabled
- Loading, error, empty states

Constraints: 3 colors max per section, token classes only, generous whitespace.

### Tester

**File**: `.claude/agents/tester.md`
**Use when**: Writing or reviewing tests.

Tests **behavior**, not implementation — tests must survive refactoring. Structure:

1. Rendering (does it show up?)
2. Variants (do props change output?)
3. Interactions (do clicks/inputs work?)
4. Edge cases (empty, loading, error states)
5. Accessibility (roles, labels, keyboard)

Anti-patterns it avoids: snapshot tests, `getByTestId` as first choice, testing CSS directly, mocking internal modules.
