# /install-extension

Install a specific extension from the steaksoap registry by ID.

## Arguments
$ARGUMENTS — Extension ID (e.g., "zustand", "three-js", "auth-clerk").

## Steps (follow this exact sequence)

1. **LOAD REGISTRY** — Read `registry/extensions.json`

2. **FIND** — Look up the extension by exact ID match:
   - If found: proceed to step 3
   - If NOT found: list all available extension IDs grouped by category and ask the user to pick one

3. **CONFIRM** — Show what will be installed:
   ```
   EXTENSION: [name]
   PACKAGES: [npm_packages]
   SETUP STEPS:
   1. [step 1]
   2. [step 2]
   ...
   ```
   Ask: "Proceed with installation?"

4. **INSTALL** — Execute the setup:
   - Install npm packages with `pnpm add` (use `-D` for dev dependencies like testing/storybook)
   - Follow each step in `setup_instructions`
   - Create necessary files following project conventions
   - Add environment variables to `.env.example` and `src/config/env.ts` if needed
   - If setup_instructions mention "User action": clearly explain what the user needs to do manually

5. **VALIDATE**:
   ```bash
   pnpm validate
   ```

6. **COMMIT**:
   ```
   feat(<scope>): add <extension-name> integration
   ```

## Available extensions

| ID | Name | Category |
|---|---|---|
| `three-js` | Three.js + React Three Fiber | frontend |
| `stripe-payments` | Stripe Payments | backend |
| `auth-clerk` | Clerk Authentication | backend |
| `tanstack-query` | TanStack Query | data |
| `zod` | Zod | data |
| `framer-motion` | Motion (Framer Motion) | frontend |
| `i18n` | react-i18next | frontend |
| `mdx-blog` | MDX Blog | content |
| `playwright-e2e` | Playwright E2E Testing | quality |
| `storybook` | Storybook | quality |
| `zustand` | Zustand | data |
| `resend-email` | Resend Email | backend |
