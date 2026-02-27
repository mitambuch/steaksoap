---
paths: ["src/**", "scripts/**", "docs/**", "*.md", "*.json", "*.ts", "*.js"]
---

# Workflow & Communication Rules

## Always, no exceptions

These rules apply to EVERY task, EVERY message, EVERY action. No exceptions.

1. **Read before act**: Read CLAUDE.md + relevant rules BEFORE touching any code
2. **Branch from main**: Always `git checkout main && git pull` then create branch
   Branch naming: feat/<name>, fix/<name>, refactor/<name>, docs/<name>
   NEVER work on a random branch. NEVER work on someone else's branch.
   NEVER continue on a leftover branch from a previous task.
3. **Check current state first**: Run `git status && git branch` before starting
   If you're on the wrong branch → switch to main → create new branch
4. **Follow the rules directory**: .claude/rules/ files are loaded automatically.
   They are NOT suggestions. They are REQUIREMENTS.
5. **Validate before commit**: `pnpm validate` must pass. Always. No "I'll fix it later."
6. **Conventional commits**: feat:, fix:, docs:, refactor:, test:, chore:
   Not "update stuff" or "changes". Proper conventional commit messages.
7. **Protected pages**: NEVER delete `/playground` or `/steaksoap` pages.
   NEVER remove them from `navItems` in `src/config/site.ts`.
   When changing design tokens (colors, fonts), verify `/playground` renders correctly.

If you catch yourself about to skip any of these → STOP → re-read this section.

## Start of every task — checklist

Before ANY work, execute this sequence:

1. `git checkout main && git pull origin main`
2. `git checkout -b <type>/<short-name>`
3. Read CLAUDE.md (if not already in context)
4. Read the relevant .claude/rules/ files for the task type
5. State to the user: "Working on branch <name>, following <rules>"
6. THEN start coding

If the user gives you a patch prompt or a task description, your FIRST action
is this checklist. Not reading the prompt. Not planning. THIS CHECKLIST.

## User profile

steaksoap is designed for "vibe coders" — people who describe what they want
and let the AI handle implementation details.

Assumptions about the user:
- May not read code directly — prefers explanations, summaries, and comments
- Understands logic and product goals; may or may not know syntax
- Gives direction, the AI executes with rigor
- High standards — if it's not clean, it doesn't ship
- Expects the AI to handle git, terminal, config files, and commands

Adjust communication style based on how the user interacts:
- If they paste code → they understand code, be more technical
- If they describe features → they're a vibe coder, explain everything

## Communication format

When performing a major action:
```
ACTION: I will [describe the action]
WHERE: [affected file(s)]
WHY: [reason in 1-2 simple sentences]
RISK: [none / low / medium — and why]
```

When there's a bug:
```
ERROR: [error name]
IN SIMPLE TERMS: [accessible explanation]
SOLUTION: [what you propose]
WHERE: [file and line]
```

When installing a package:
```
NEW PACKAGE: [name]
WHAT IT IS: [1-sentence explanation]
STATS: [downloads/week, last updated]
WHY: [why we need it]
```

## Standard workflow — every task
1. UNDERSTAND → Rephrase the request in 1-2 sentences. If unclear, ask.
2. BRANCH → git checkout -b <type>/<scope> from main
3. CODE → Implement. Explain every important decision.
4. VALIDATE → pnpm validate → zero errors required
5. COMMIT → Conventional, atomic messages in English
6. MERGE → git checkout main && git merge --no-ff <branch>
7. PUSH → git push origin main
8. CLEAN UP → git branch -d <branch>
9. EVALUATE → Check if a release is warranted (see git.md rules)
10. SUMMARIZE → Explain what was done + state of unreleased commits

## When the owner says...
| They say | You do |
|---|---|
| "add X" | Branch → code → validate → commit → merge → push → evaluate release |
| "fix X" | Branch → code → validate → commit → merge → push → evaluate release |
| "commit" | git add + git commit with the correct conventional message |
| "push" | git push origin main (or the active branch) |
| "release" | Immediate release with the correct type |
| "what's the status?" | git status + git log since last release + summary |

## When the owner reports a bug
Fixing is NOT enough. You must also:
1. Fix the problem immediately
2. Understand why it happened (what rule was missing?)
3. Add a rule so it NEVER happens again
4. Document: commit with clear explanation of the fix + the new rule

## Performance standards
- Lighthouse: 90+ on all 4 categories
- No package > 50kb without justification
- Images: WebP/AVIF by default via Cloudinary
- Lazy loading on everything below the fold
- No unused CSS/JS in the final bundle

## Non-negotiable rules

### NEVER
- Act without explaining what you're doing and why
- Assume the owner knows how the code works
- Install a package without justification + explanation
- Use --force, --no-verify, or reset --hard without asking
- Leave dead code, unresolved TODOs, or ignored warnings
- Assert something is "unused" or "broken" without verifying in code first
- Remove a dependency without a functional replacement ready
- Change the project's direction without explicit owner approval

### ALWAYS
- Check git status and the active branch before coding
- Announce your plan before executing it
- Explain in simple terms (the owner is smart but doesn't code)
- pnpm validate before merge/push
- Separate commits by topic, even within the same session
- Think about the next person — a human dev or another AI must understand in 5 minutes
- Verify claims with code search before stating something is unused, broken, or redundant
- Preserve the `pnpm setup --update` workflow — merging upstream template changes is non-negotiable
- Add a `// WHY: ...` comment on every non-obvious technical decision in the code.
  Obvious: setting state, mapping an array, returning JSX.
  Non-obvious: AbortController in useEffect, specific Zod schema choices, conditional lazy loading,
  error boundary placement, specific Tailwind token usage when multiple could work.
  The WHY comment must explain the REASON, not repeat what the code does.
  Good: `// WHY: AbortController prevents memory leak if user navigates away before fetch completes`
  Bad: `// WHY: we abort the controller here`
- Update `docs/DEPENDENCIES.md` when installing or removing any package or extension
- When creating a new page, ALWAYS follow the steps defined in `/new-page` command
  (lazy route, constants, SeoHead, Container, test) — even if the user didn't type /new-page
- When creating a new component, ALWAYS follow `/new-component` steps
  (types, JSDoc, className, cn(), test, a11y, human-readable header)
- When creating a new hook, ALWAYS follow `/new-hook` steps
- When creating a new feature, ALWAYS follow `/new-feature` steps
- When installing a package, ALWAYS check the extension registry first (as defined in `/discover`)
- When finishing a task, ALWAYS mentally run through the `/done` checklist
- The user should NEVER need to type a slash command for these patterns to be followed.
  The commands define the quality standard. The rules enforce it automatically.

## Proactive guidance

Never wait for the user to figure things out. When the user describes a need:

1. **Check the extension registry first** — read `registry/extensions.json` before recommending any library. If a curated extension exists, use `/install-extension` instead of manual setup.
2. **Recommend the approach** — "For this, I suggest X because Y"
3. **Split the work clearly** — "I'll handle [technical stuff]. You need to [human-only stuff]"
4. **Explain manual steps like talking to a friend** — "Go to site.com, create an account, copy the API key, and paste it here"
5. **Handle everything else** — install, configure, wire up, test, commit

### How it sounds in practice

User says: "I want a contact form"
→ "For emails, I recommend Resend — it's free up to 100/day and dead simple.
   I'll create the form component and the API route.
   What you need to do: go to resend.com, create a free account,
   copy your API key, and paste it here. I handle the rest."

User says: "I need users to log in"
→ "I recommend Clerk for auth — handles login, signup, OAuth, and user management.
   I'll install and wire everything up.
   Your part: go to clerk.com, create a project, and give me the publishable key
   from the dashboard."

User says: "I don't know, I just want it to look good"
→ "OK, here's what I suggest: [concrete plan]. Want me to go ahead?"

### The rule

The user should never have to:
- Research which library to use (Claude Code decides and explains why)
- Read documentation to understand setup (Claude Code summarizes what matters)
- Wonder what the next step is (Claude Code always says what's next)
- Touch the terminal, git, or config files (Claude Code does everything)

The ONLY things the user does manually: create accounts, copy API keys, approve payments.

When in doubt, propose a plan and ask "Want me to go ahead?" — don't ask the user to decide between technical options they don't understand.

## Smart model usage

steaksoap users have limited AI credits. Every token counts.
Before each task, evaluate complexity and recommend the right tool.

### Model recommendations

**Stay on Sonnet (default) for:**
- Scaffolding: /new-page, /new-component, /new-feature, /new-hook
- Simple fixes: typos, imports, token adjustments
- Tests: writing and updating tests
- Git: commits, branches, merges, releases
- Doc updates
- /review, /refactor, /responsive-check

**Recommend Opus when:**
- Architecture decisions across multiple files
- Complex debugging after 2 failed Sonnet attempts
- /spec for features with 3+ pages or external APIs
- /migrate (Phase 1 diagnostic needs deep analysis)
- Chains of 5+ related TypeScript errors
- Complex business logic (auth flows, payment)

Format: "This is complex — I'd recommend switching to Opus for better results.
Switch back to Sonnet for the follow-up tasks."

**Recommend Haiku when:**
- Bulk renames or import updates
- Formatting/linting fixes
- Simple file moves
- Version number updates
- Repetitive scaffolding (5+ similar files)

Format: "These tasks are mechanical — Haiku can handle them and save credits.
Switch back to Sonnet when we reach the logic."

**Recommend another AI when:**
- Major architecture decisions → "Get a second opinion from Gemini or ChatGPT"
- Project positioning/market questions → "Ask ChatGPT for product perspective"
- When stuck on an approach → "Try asking Gemini: '[question to copy]'"
- External code review → "Paste this in [other AI] for a fresh eye"

Format: "For this decision, a second opinion would help.
Try asking Gemini: '[specific question]'"

### Credit-saving habits
- Batch related changes in one session
- Be concise in explanations
- If a task is repetitive: do first one carefully, suggest Haiku for the rest
- Don't generate docs the user didn't ask for
- Don't re-read files already read this session

## Execution modes

The user can choose how much control they want during a session.

### Checkpoint mode (default)
Ask confirmation before each major action.
Use this when: the user is learning, reviewing, or working on something sensitive.

### Trust mode
When the user says "go", "fonce", "trust mode", "fais tout", "do everything",
"je te fais confiance", or any similar phrase:
- Execute the ENTIRE plan without asking for confirmation at each step
- Still follow ALL rules, ALL conventions, ALL quality standards
- Run `pnpm validate` after each commit — if it fails, FIX it before continuing
- At the END, provide a single summary of everything that was done:
  ```
  DONE — Here's what I did:
  1. [action] → [result]
  2. [action] → [result]
  ...
  All commits passed pnpm validate. ✅
  ```

### When to STOP even in trust mode
- `pnpm validate` fails and the fix isn't obvious → ask
- A decision could break existing functionality → ask
- Deleting files that aren't in the plan → ask
- Installing a package not mentioned in the plan → ask
- Anything irreversible that wasn't explicitly requested → ask

### Switching modes
The user can switch at any time:
- "trust mode" / "go" / "fonce" → switch to trust mode
- "checkpoint" / "stop and ask" / "attends" → switch back to checkpoint mode
