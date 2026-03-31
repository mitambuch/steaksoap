# /theme

Modify design tokens interactively.

## Arguments
$ARGUMENTS — Natural language description. Examples:
- "make it blue"
- "warmer colors, more contrast"
- "bigger headings"
- "more spacing between sections"

## Steps

1. Read current tokens from `src/index.css` — find the `@theme { }` block.

2. Interpret $ARGUMENTS and propose changes:
   - Show: Current value -> Proposed value
   - Group by: Colors, Typography, Spacing

3. Apply changes to `@theme { }` in src/index.css.

4. If dark mode tokens exist (in `[data-theme='light']` or similar), update those too for consistency. Maintain contrast ratios.

5. Sync all dependents:
   - If accent changed: update `public/favicon.svg` if accent-colored, playground color swatches in `src/workbench/playground/data/colors.ts`
   - If font changed: update `src/styles/fonts.css`, `index.html` font imports
   - If bg changed: update `index.html` meta theme-color

6. Run `pnpm validate`.

## Rules
- NEVER break the @theme CSS syntax
- ALWAYS maintain text/background contrast (4.5:1 minimum)
- ALWAYS update both light and dark themes if both exist
- Use CSS custom property format: --color-name: value;
