# Handoff Guide

You just got access to this project. Here's everything you need to work on it.

## Run it

```bash
pnpm install    # install dependencies
pnpm dev        # start dev server at localhost:5173
pnpm validate   # check everything is OK (lint + types + tests + build)
```

If `pnpm validate` passes, you're good. If it doesn't, fix what it tells you.

## How the code is organized

```
src/
├── app/              → Routing and main layout (start here to understand page flow)
├── components/ui/    → Reusable UI pieces (Button, Card, Input, Modal...)
├── components/layout/→ Page structure (Header, Footer, Container)
├── config/           → Settings: env.ts (environment), site.ts (project info)
├── pages/            → One file per page (Home.tsx = homepage, etc.)
├── features/         → Bigger features with their own logic (component + hook + types)
├── hooks/            → Reusable React logic (useTheme, useMediaQuery...)
├── styles/           → Global CSS, font imports, animations
└── utils/            → Small helpers (cn() for CSS class merging)
```

**Rule of thumb**: if you need to change what a page looks like, edit `src/pages/`.
If you need to change a reusable element (button, card), edit `src/components/ui/`.
If you need to change colors or fonts, edit `src/index.css` (the @theme section).

## Change colors or fonts

All design tokens are in `src/index.css` inside the `@theme { }` block.
Change a value there and it updates everywhere automatically.

```css
@theme {
  --color-accent: #d4ff00;  /* ← change this to change all accent colors */
  --color-bg: #0a0a0a;      /* ← page background */
  --font-family-sans: 'Space Grotesk', system-ui, sans-serif;
}
```

The full visual reference is in `DESIGN_SYSTEM.md`.

## Add a page

1. Create `src/pages/MyPage.tsx`
2. Add a lazy import in `src/app/routes/index.tsx`
3. Add the route constant in `src/constants/routes.ts`
4. Done — visit `/my-page` in the browser

## Add a component

1. Create `src/components/ui/MyComponent.tsx`
2. Create `src/components/ui/__tests__/MyComponent.test.tsx`
3. Use it anywhere with `import { MyComponent } from '@components/ui/MyComponent'`

## Deploy

Click the Vercel or Netlify button in the README, or:
```bash
pnpm build        # creates production files in dist/
```
Upload the `dist/` folder to any static hosting.

## Tests

```bash
pnpm test          # run all tests
pnpm test:watch    # re-run on file changes
```

Tests live next to the code they test: `Button.tsx` → `__tests__/Button.test.tsx`.

## What NOT to touch (unless you know what you're doing)

- `.claude/` → AI assistant configuration. Ignore it — the app works without it.
- `.husky/` → Git hooks for commit quality. Don't delete.
- `scripts/setup.js` → Template setup wizard. Only relevant when starting a new project.
- Config files at root (vite.config.ts, eslint.config.js, etc.) → They work. Don't "fix" them.

## The AI stuff

This project was built with AI assistants (Claude Code, Cursor, Copilot).
The `.claude/` folder contains instructions for these tools.
**You can completely ignore it if you're coding manually.**
It doesn't affect the app, the build, or anything at runtime.
It's just context files that AI tools read when they work on this project.

## Need help?

- `DESIGN_SYSTEM.md` → Colors, fonts, component styles
- `docs/ARCHITECTURE.md` → How everything connects
- `docs/recipes/` → Step-by-step guides for common tasks
- `docs/DEPENDENCIES.md` → What every package does and why it's here
