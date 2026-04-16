---
paths: ["src/**/*.tsx", "src/**/*.ts"]
---

# Sizing Limits

Hard limits to prevent the 1000-line page hellscape observed in the HDVA audit.
ESLint warns at these thresholds (`max-lines`, `max-lines-per-function`).
Markdown rule = guidance; ESLint warn = visible signal; both reinforce.

## Limits

| Surface | Soft cap | Hard cap (ESLint warn) |
|---|---|---|
| Component (`src/components/**/*.tsx`) | 200 LOC | 300 LOC |
| Page (`src/pages/**/*.tsx`) | 350 LOC | 500 LOC |
| Hook | 100 LOC | 150 LOC |
| Function in **page** | 100 lines | 150 lines |
| Function in **component atom** (looser — stateful atoms) | 150 lines | 200 lines |
| Inline logic in component before JSX | 30 lines | 50 lines |

LOC = source lines, comments and blank lines excluded.

## Triggers — when to split

- **Render() > 150 lines** → extract sub-component.
- **Component logic > 50 lines** before JSX → extract a hook.
- **More than 2 responsibilities** in one file → split into `src/features/<name>/`.
- **Two pages with > 60% structure overlap** → factor into a generic component with datasource props (HDVA's `RestaurantCarte` + `RestaurantCarteVins` pattern — they should have been one `MenuPage<T>` from the start).
- **Three+ inline `style={{...}}` for the same property** (e.g., padding clamps) → extract a constant.
- **Three+ icon maps** in one file → centralize in `src/config/icons.ts` (or feature-local equivalent).

## Anti-patterns to refuse

- A single `<section>` containing > 5 logical blocks → it's not one section, it's a container of features.
- Copy-paste between two pages with only data swapped → extract.
- Inline data structures > 50 lines → move to `src/data/<name>.ts` or fetch from CMS.

## Exceptions

- Generated files (`vite.config.ts`, schema files): no limit.
- Test files: no hard cap (covered in `testing.md`).
- Single-screen prototype on `/lab`: no enforcement (lab is a sandbox).

## Why this rule exists

HDVA produced `Hotel.tsx` at 1097 lines, `RestaurantCarte.tsx` at 1081 lines, with a copy-paste sibling at 980 lines. No rule existed to flag these as defects. They became permanent technical debt before anyone noticed. This rule + ESLint warn = the file gets noisy as it grows, and noise prompts a split.
