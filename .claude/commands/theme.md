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

3. Wait for user confirmation.

4. Apply changes to `@theme { }` in src/index.css.

5. If dark mode tokens exist (in `[data-theme="dark"]` or similar), update those too for consistency. Maintain contrast ratios.

6. Run `pnpm dev` and describe the visual result, or suggest the user check it.

## Rules
- NEVER break the @theme CSS syntax
- ALWAYS maintain text/background contrast (4.5:1 minimum)
- ALWAYS update both light and dark themes if both exist
- Use CSS custom property format: --color-name: value;
