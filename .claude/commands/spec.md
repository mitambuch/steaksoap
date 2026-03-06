# /spec

Transform a vague idea into a structured specification BEFORE coding.

## Arguments
$ARGUMENTS — Natural language description of what the user wants.
Examples: "a contact form", "user authentication", "a portfolio grid with filtering"

## Steps

1. Read `.claude/decisions.md` for architectural context
2. Read `registry/extensions.json` for available integrations

3. Generate a structured spec:
   ```
   ## SPEC: [feature name]

   ### What
   [1-2 sentences: what this feature does from user perspective]

   ### Pages & Routes
   - [list of new/modified pages with their routes]

   ### Components
   - [list of new components to create]
   - [list of existing components to reuse]

   ### Data
   - [external APIs? local state? what shape?]
   - [validation needed? → suggest Zod from registry]

   ### Extensions needed
   - [check registry — any matching extension?]
   - [if yes: recommend /install-extension]

   ### Steps (what Claude Code will do)
   1. [ordered list of implementation steps]

   ### Manual steps (what the user must do)
   - [account creation, API keys, etc. — or "None"]
   ```

4. Present the spec, then start implementing

## Rules
- NEVER skip the spec and go straight to coding
- The spec is the contract — if the user says "that's not what I want", modify the spec first
- Keep specs SHORT — this is a plan, not documentation
- Save the spec in `docs/specs/[feature-name].md` for reference
