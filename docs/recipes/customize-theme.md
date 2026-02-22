# Customize the Theme

> Change colors, fonts, and spacing for both dark and light modes.

## AI shortcut

```
/theme "make it warmer with orange accents"
```

## Where tokens live

`src/index.css` — find the `@theme { }` block:

```css
@theme {
  /* Dark mode — DEFAULT (classe2 "brutaliste suisse") */
  --color-bg: #0a0a0a;
  --color-fg: #f0f0f0;
  --color-accent: #ff6b6b;
  --color-muted: #8a8a8a;
  --color-surface: #141414;
  --color-border: #262626;

  /* Semantic status colors */
  --color-success: #6aff8a;
  --color-warning: #ffd60a;
  --color-danger: #dc2626;
  --color-info: #52b0ff;
}
```

And the light mode override right below:

```css
[data-theme='light'] {
  --color-bg: #b0b0a8;
  --color-fg: #1a1a1a;
  --color-accent: #ff6b6b;
  --color-muted: #4a4a44;
  --color-surface: #a4a49c;
  --color-border: #96968e;

  --color-success: #00c853;
  --color-warning: #e6a800;
  --color-danger: #b91c1c;
  --color-info: #1e88e5;
}
```

## Changing colors

1. Edit the hex values inside `@theme` (dark mode)
2. Edit the matching values in `[data-theme='light']`
3. Check contrast: text on background must be 4.5:1 minimum

## Changing fonts

1. Add your font files to `public/fonts/`
2. Update `src/styles/fonts.css` with `@font-face` declarations
3. Update `--font-family-sans` in `@theme`
4. Preload in `index.html`:
   ```html
   <link rel="preload" href="/fonts/YourFont.woff2" as="font" type="font/woff2" crossorigin />
   ```

## Rules

- **Always** update both dark and light tokens
- Check contrast with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Never hardcode colors in components — always use token classes (`bg-surface`, `text-fg`, etc.)
- The theme toggle (sun/moon icon in the header) lets users switch between modes
