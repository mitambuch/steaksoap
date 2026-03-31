# /init --- Project Identity Setup

Customize this base for YOUR project.

## When to use
Run this ONCE after cloning, AFTER `pnpm setup` (which handles the technical setup).
/init handles the CREATIVE setup: colors, fonts, vibe, content.

## Protected --- do NOT touch these during /init
- `/playground` page -> KEEP, it reflects new tokens automatically
- All slash commands in `.claude/commands/`
- All rules in `.claude/rules/`
- All agents in `.claude/agents/`

## Step 1 --- Interview (ask ONE question at a time, wait for each answer)

1. **Project name** --- DO NOT ASK.
   Read `siteConfig.name` from `src/config/site.ts` (which reads `env.APP_NAME`).
   If the name is NOT "Project" (the default fallback), confirm:
   "Le projet s'appelle [name], correct ?"
   If it IS "Project", STOP and tell the user: "Run `pnpm setup` first to set the project name."

2. **Description**
   "Describe your project in 1-2 sentences."
   -> Used in: site.ts description, meta description, README, CLAUDE.md

3. **Who is it for?** --- CHECK BRIEF FIRST.
   Read CLAUDE.md for a `## Design Direction` section.
   If it exists and has Type + Universe lines, SKIP this question (already covered).
   If it does NOT exist, ask: "Who is this for? (portfolio, client site, SaaS, agency, blog...)"
   -> Used in: CLAUDE.md context, tone guidance

4. **Vibe/aesthetic** --- CHECK BRIEF FIRST.
   If `## Design Direction` exists in CLAUDE.md, show the Personality line and ask:
   "Le brief dit: '[Personality]'. On garde ce vibe ou tu veux ajuster ?"
   If confirmed, SKIP this question.
   If no brief exists, ask: "What vibe? (minimal, bold, playful, corporate, brutalist, dark, warm...)"
   -> Used in: font suggestions, spacing decisions, animation choices

5. **Accent color**
   "Pick an accent color. Hex code, color name, or 'keep current' (#c44040)."
   -> If the user gives a name like "blue" or "warm orange", pick an appropriate hex.
   -> Show the chosen color and ask confirmation.
   -> MUST check contrast ratio against both dark bg (#0a0a0a) and light bg (#b0b0a8).
   -> Minimum contrast ratio: 4.5:1 for text, 3:1 for large text.
   -> If contrast fails, suggest an adjusted version and explain why.

6. **Dark, light, or both?**
   "Dark mode, light mode, or both? (currently: both)"
   -> If "dark only": can simplify by removing [data-theme='light'] block
   -> If "light only": swap the default
   -> If "both": keep current structure

7. **Font preference**
   "Font preference? (modern sans, monospace, serif, or keep Space Grotesk + JetBrains Mono)"
   -> If Google Font: update both `src/styles/fonts.css` AND `index.html` preload
   -> Update `@theme { --font-family-sans: ... }` in `src/index.css`
   -> Update `@theme { --font-family-mono: ... }` if mono changes too

## Step 2 --- Apply changes (in this EXACT order)

### 2.1 --- CSS tokens in `src/index.css`

Edit the `@theme { }` block (lines 11-27 approximately):
- `--color-accent` -> new accent color
- Generate `--color-success`, `--color-warning` that harmonize (or keep defaults)
- If vibe is "warm", adjust `--color-surface` and `--color-border` slightly warmer

Edit the `[data-theme='light']` block (lines 30-42 approximately):
- `--color-accent` -> same accent in light mode (or adjusted for contrast)
- Verify ALL contrast ratios:
  - `--color-fg` (#1a1a1a) on `--color-bg` -> must be >= 4.5:1
  - `--color-accent` on `--color-bg` -> must be >= 4.5:1
  - `--color-muted` on `--color-bg` -> must be >= 4.5:1

Also update the scrollbar colors (lines 48-60) to use the new accent.

IMPORTANT: When changing `--color-accent`, ALWAYS also update `--color-accent-rgb` in the
`:root` block with the matching R, G, B values. These MUST stay in sync.

### 2.2 --- Fonts (if changed)

**Path A --- Font files exist in `public/fonts/`** (preferred):
- Update `@font-face` declarations in `src/styles/fonts.css`
- Update `@theme` `--font-family-sans` and/or `--font-family-mono` in `src/index.css`
- Update preload links in `index.html` if weight/style changed

**Path B --- Font NOT in `public/fonts/`** (Google Fonts fallback):
- Add preconnect + stylesheet `<link>` tags in `index.html` `<head>`
- Comment out replaced `@font-face` blocks in `fonts.css`
- Update `@theme` `--font-family-sans` in `src/index.css`
- Update CSP in `netlify.toml` AND `vercel.json`: add `fonts.googleapis.com` to style-src, `fonts.gstatic.com` to font-src
- WARN user: "Self-hosting is preferred for privacy/GDPR. Consider downloading the font files later."

### 2.3 --- Site config: `src/config/site.ts`

Update:
- `description` field with user's description
- The `name` is read from `env.APP_NAME` which comes from `.env.local` (set by pnpm setup)
  -> If pnpm setup was NOT run, tell user to run it first or set VITE_APP_NAME in .env.local

### 2.35 --- Manifest sync: `public/manifest.json`

Update:
- `theme_color` -> the chosen accent color hex
- `background_color` -> the `--color-bg` value from the @theme block
- `description` -> the user's description from question 2

Also update `<meta name="theme-color">` in `index.html` line 6 to match accent.

### 2.4 --- SEO / index.html

In `index.html`:
- Update `<title>` tag (line 9)
- Update `<meta name="description">` (line 10)
- Keep the FOUC script localStorage key as-is (changing it breaks existing users)

### 2.5 --- CLAUDE.md

Rewrite the header and context:
- Replace `# Project` with `# [project name]`
- Replace the stack description line with user's description
- Add in a new "## Project Context" section (after existing content, before ## Design Direction if it exists, or before ## Detailed Rules):
  ```
  This project is a [user's description]. It has a [vibe] aesthetic.
  Built for: [who is it for].
  ```
- Keep ALL rules, commands, workflow, architecture sections INTACT
- Keep the "Protected Pages" section INTACT
- Keep `## Design Direction` and `## Composition Rules` sections INTACT if they exist (written by /brief)

### 2.6 --- README.md

Replace the header sections at the top:
- `# Project` or existing header -> `# [project name]`
- Update description paragraph
- Keep ALL technical sections (Stack, Commands, Architecture)
- Keep the Getting Started section

### 2.7 --- Home page: `src/pages/Home.tsx`

Update text content:
- Update the welcome message to reflect the project name
- The example prompt should reflect the user's actual project

### 2.8 --- Footer/Header cleanup consideration

The Footer (`src/components/layout/Footer.tsx`) and Header may have hardcoded links.

ASK the user: "The footer/header may have external links. Want me to:
(a) replace with your repo URL, (b) remove external links, or (c) leave as-is for now?"

### 2.9 --- Favicon

ASK: "Want me to keep the current favicon or would you like to change it later?
(You can always replace the files in /public/ manually.)"

If they want to change: explain which files to replace:
- `public/favicon.svg` (vector, used by modern browsers)
- `public/favicon-32.png` (32x32 fallback)
- `public/apple-touch-icon.png` (180x180 for iOS)

### 2.10 --- Mark as initialized

In `src/config/site.ts`, change `initialized: false` to `initialized: true`.
This removes the setup banner from RootLayout and switches the Header to show the project name.

## Step 3 --- Validate

```bash
pnpm validate
```

Open browser and check:
- `localhost:5173` -> Home page with new project name
- `localhost:5173/playground` -> Components with new colors
- Toggle dark/light mode -> both work with new tokens

## Step 4 --- Summary

Print:
```
Done! Project identity set up as "[name]"

Changed:
  -> src/index.css: accent color, [fonts if changed]
  -> src/config/site.ts: description, initialized flag
  -> public/manifest.json: theme_color, background_color, description
  -> index.html: title, meta description, theme-color
  -> CLAUDE.md: project context
  -> README.md: project identity
  -> src/pages/Home.tsx: welcome text
  [-> src/styles/fonts.css + index.html: font if changed]
  [-> Footer.tsx / Header.tsx: links if changed]

Next steps:
  -> Describe your homepage and I'll build it
  -> Use /new-page to add pages
  -> Use /theme to tweak colors later
  -> Visit /playground to see your design system
```
