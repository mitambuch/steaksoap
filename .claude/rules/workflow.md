---
paths: ["src/**", "scripts/**", "docs/**", "*.md", "*.json", "*.ts", "*.js"]
---

# Workflow & Communication Rules

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
