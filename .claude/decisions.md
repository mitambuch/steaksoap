# Architecture Decisions

This file tracks key technical decisions. Read this before any architecture choice.

## Template defaults

- **State management**: React built-in (useState, useReducer, useContext). No external state library by default. Add Zustand via `/install-extension zustand` if needed.
- **Data fetching**: No library by default. Add TanStack Query via `/install-extension tanstack-query` if needed. Pattern in `.claude/rules/api.md`.
- **Styling**: Tailwind CSS 4 with @theme tokens. No CSS modules, no CSS-in-JS. classe2 aesthetic by default.
- **Font**: Space Grotesk (sans), JetBrains Mono (mono). Loaded via Google Fonts.
- **Accent**: #D4FF00 (neon lime) — identical in dark AND light mode. Never changes per-theme.
- **Light mode bg**: #D8D8D0 (warm dark gray "Paper") — like classe2 contact page.
- **Routing**: React Router 7 with lazy loading. Routes in `src/app/routes/index.tsx`.
- **Testing**: Vitest + Testing Library + vitest-axe. Tests beside source files.
- **Image optimization**: Cloudinary optional. Falls back to raw URLs if not configured.
- **Spec-first workflow**: Use `/spec` to plan features before coding. Specs saved in `docs/specs/`.
