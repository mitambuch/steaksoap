# Copilot Instructions — steaksoap

## Project
steaksoap — AI-first React starter kit for vibe coders.
React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 4 + pnpm.
The AI commands and rules are the core value, not the boilerplate itself.
Mobile-first.

## Conventions
- Strict TypeScript: no `any`, no implicit any.
- Path aliases: `@components/`, `@hooks/`, `@pages/`, `@utils/`, `@config/`, etc. Never `../../..`.
- Tailwind CSS 4 with CSS-first config via `@theme` in `src/index.css`.
- Design tokens: `bg-bg`, `text-fg`, `text-accent`, `text-muted`, `font-sans`, `font-mono`.
- Use `cn()` from `@utils` for conditional Tailwind classes.
- Functional components only. Named exports for components, default exports for pages.
- Mobile-first: design for 375px, then `sm:`, `md:`, `lg:`.

## Git
- Conventional Commits: `type(scope): description` (lowercase, imperative, max 72 chars).
- Types: feat, fix, refactor, style, chore, docs, perf, test.
- Always validate with `pnpm validate` before merge.

## Architecture
```
src/app/          → Routes, layouts
src/components/   → ui/ (atoms), layout/ (header/footer), features/
src/config/       → Cloudinary, SEO, env
src/pages/        → One file per route
src/hooks/        → Custom hooks
src/utils/        → Pure functions (cn, etc.)
src/types/        → Shared TypeScript types
src/data/         → Static data
src/styles/       → Fonts, animations
```

## Key Rules
- No dead code, no TODO comments, no console.log in production.
- Every component must have a comment block explaining its purpose.
- All environment variables are optional with fallbacks (see `src/config/env.ts`).
- Prefer native solutions before adding dependencies.
