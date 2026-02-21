# Architecture Decisions

This file tracks key technical decisions. Read this before any architecture choice.

## Template defaults

- **State management**: React built-in (useState, useReducer, useContext). No external state library by default. Add Zustand via `/install-extension zustand` if needed.
- **Data fetching**: No library by default. Add TanStack Query via `/install-extension tanstack-query` if needed. Pattern in `.claude/rules/api.md`.
- **Styling**: Tailwind CSS 4 with @theme tokens. No CSS modules, no CSS-in-JS.
- **Routing**: React Router 7 with lazy loading. Routes in `src/app/routes/index.tsx`.
- **Testing**: Vitest + Testing Library + vitest-axe. Tests beside source files.
- **Image optimization**: Cloudinary optional. Falls back to raw URLs if not configured.
