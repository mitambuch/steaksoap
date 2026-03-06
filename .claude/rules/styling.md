---
paths: ["src/**/*.css", "src/**/*.tsx", "src/styles/**"]
---

# Styling Rules

## Tailwind CSS 4 — CSS-first configuration
- Design tokens live in `src/index.css` inside `@theme { }`
- Token classes: bg-bg, text-fg, text-accent, text-muted, bg-surface, border-border
- NEVER hardcode colors — always use token-based classes
- NEVER use @apply (defeats the purpose of utility classes)

## Responsive design
See `responsive.md` for the full responsive rules.
Quick ref: mobile default → sm: → md: → lg: → xl:

## Class ordering in JSX
Follow this order in className strings:
1. Layout (flex, grid, relative, absolute)
2. Sizing (w-, h-, max-w-)
3. Spacing (p-, m-, gap-)
4. Typography (text-, font-, leading-)
5. Colors (bg-, text-, border-)
6. Effects (shadow-, opacity-, transition-)

## cn() utility
- Import from `@utils/cn`
- Use for ALL conditional classes: `cn('base', isActive && 'active-class')`
- Handles Tailwind class conflicts via tailwind-merge

## Dark mode
- Tokens are CSS custom properties set via `@theme`
- `[data-theme='light']` on `<html>` (dark is the default, no data-attribute needed)
- Both themes MUST be tested for every component
- Use semantic token names (bg-bg, text-fg) not raw colors

## Accent color rule
The accent color (#c44040 "Coral Red") is IDENTICAL in dark and light mode.
NEVER change the accent between modes. NEVER suggest a "more readable" alternative
for light mode. The brand identity depends on this consistency.
If contrast is a concern on light backgrounds, adjust the BACKGROUND or add
a dark text container — never touch the accent value.

## Exception: box-shadow & canvas
`rgba()` with `--color-accent-rgb` is acceptable in:
- `box-shadow` values (Tailwind can't use tokens in `shadow-[]`)
- Canvas 2D context (`fillStyle`, `strokeStyle`)
Always use the `--color-accent-rgb` CSS variable, never raw RGB values.

## Token-first
Never create a local color, typo, spacing, shadow, or radius if a system
token already covers the need. `src/index.css` `@theme` is the single source.
Components consume tokens — they never invent values.

## Reuse-first
Before creating a component, check in this order:
1. `src/components/ui/` (atoms)
2. `src/components/layout/` (structure)
3. `src/workbench/playground/shared/` (visual utilities)
4. `src/workbench/playground/sections/` (assembled modules)
If an existing brick covers the need: use it or extend it. Don't recreate.

## Design token reference
Check `src/index.css` @theme section for current values. Key tokens:
- --color-bg: page background
- --color-fg: primary text
- --color-muted: secondary/dimmed text
- --color-accent: interactive elements, highlights
- --color-surface: cards, elevated surfaces
- --color-border: borders, dividers
