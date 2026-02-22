---
paths: ["src/**/*.css", "src/**/*.tsx", "src/styles/**"]
---

# Styling Rules

## Tailwind CSS 4 — CSS-first configuration
- Design tokens live in `src/index.css` inside `@theme { }`
- Token classes: bg-bg, text-fg, text-accent, text-muted, bg-surface, border-border
- NEVER hardcode colors — always use token-based classes
- NEVER use @apply (defeats the purpose of utility classes)

## Responsive design — mobile-first
- Default styles = mobile (320px)
- sm: = 640px, md: = 768px, lg: = 1024px, xl: = 1280px
- Always stack on mobile, go horizontal on md+
- Touch targets: minimum 44×44px on mobile

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
- `[data-theme="dark"]` and `[data-theme="light"]` on `<html>`
- Both themes MUST be tested for every component
- Use semantic token names (bg-bg, text-fg) not raw colors

## Accent color rule
The accent color (#D4FF00 "Neon Lime") is IDENTICAL in dark and light mode.
NEVER change the accent between modes. NEVER suggest a "more readable" alternative
for light mode. The brand identity depends on this consistency.
If contrast is a concern on light backgrounds, adjust the BACKGROUND or add
a dark text container — never touch the accent value.

## Design token reference
Check `src/index.css` @theme section for current values. Key tokens:
- --color-bg: page background
- --color-fg: primary text
- --color-muted: secondary/dimmed text
- --color-accent: interactive elements, highlights
- --color-surface: cards, elevated surfaces
- --color-border: borders, dividers
