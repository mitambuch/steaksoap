# Architecture Decisions

This file tracks key technical decisions. Read this before any architecture choice.

## Template defaults

- **State management**: React built-in (useState, useReducer, useContext). No external state library by default. Add Zustand via `/install-extension zustand` if needed.
- **Data fetching**: No library by default. Add TanStack Query via `/install-extension tanstack-query` if needed. Pattern in `.claude/rules/api.md`.
- **Styling**: Tailwind CSS 4 with @theme tokens. No CSS modules, no CSS-in-JS. classe2 aesthetic by default.
- **Font**: Space Grotesk (sans), JetBrains Mono (mono). Loaded via Google Fonts.
- **Accent**: #FF6B6B (coral red) — identical in dark AND light mode. Never changes per-theme.
- **Light mode bg**: #B0B0A8 (warm concrete gray) — classe2 aesthetic.
- **Routing**: React Router 7 with lazy loading. Routes in `src/app/routes/index.tsx`.
- **Testing**: Vitest + Testing Library + vitest-axe. Tests beside source files.
- **Image optimization**: Cloudinary optional. Falls back to raw URLs if not configured.
- **Spec-first workflow**: Use `/spec` to plan features before coding. Specs saved in `docs/specs/`.

## Patch history decisions

- **Accent changed to Coral #FF6B6B**: thematic alignment with project identity.
- **Light mode bg is warm gray**: not near-white. Matches classe2 aesthetic.
- **Lucide React as default dep**: every project needs icons, tree-shakable.
- **Toast/Tabs/Spinner in core**: most commonly needed UI patterns.
- **Batch mode**: autonomous execution on "fonce" or "go". Stops on validation failure. Previously called "trust mode".
- **Smart model switching**: Opus for complex, Haiku for mechanical tasks.
- **Auto-invocation**: rules enforce command patterns without slash commands.
- **/audit merged into /lighthouse**: /audit was a subset, removed.
- **/fix delegates to debugger agent**: single source of truth for debug workflow.
- **Structure is non-negotiable**: scripts assume fixed directories. Intentional.
- **Neural flow particles**: signature visual effect, disabled on mobile.
- **Morphing logo**: organic blob in Header, all pages.
- **Custom cursor**: coral dot + light halo, desktop only, all pages.
- **MCP awareness**: Claude Code recommends MCP servers when it detects a need beyond its native capabilities. Registry in `registry/mcp-servers.json`, same pattern as extensions. `/discover` searches both extensions and MCP servers. `/connect` installs MCP servers.
