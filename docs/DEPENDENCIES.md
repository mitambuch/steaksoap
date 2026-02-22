# Project Registry

Everything this project uses, and why.

## Stack

| Technology | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety (strict mode) |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 4 | Styling (CSS-native, @theme tokens) |
| React Router | 7 | Client-side routing with lazy loading |
| Vitest | latest | Unit & component testing |
| ESLint | 9 | Code quality (flat config) |
| Prettier | latest | Code formatting |
| pnpm | >=9 | Package manager |

## Design

| Element | Value | Source |
|---|---|---|
| Font (sans) | Space Grotesk | Google Fonts / local |
| Font (mono) | JetBrains Mono | Google Fonts / local |
| Accent color | #D4FF00 (Neon Lime) | Same in dark & light |
| Dark background | #0A0A0A (Void) | @theme in index.css |
| Light background | #D8D8D0 (Paper) | @theme in index.css |
| Button shape | Capsule (rounded-full) | Button.tsx |
| Transitions | 0.5s interactions, 1.5s theme switch | index.css |

Full visual reference: see `DESIGN_SYSTEM.md`

## Runtime Dependencies

| Package | What it does | Why we need it |
|---|---|---|
| react | UI rendering | Core framework |
| react-dom | DOM rendering | React needs this to render in browsers |
| react-router-dom | Page routing | Navigate between pages without reload |
| clsx | CSS class conditionals | Build className strings like `cn('a', isActive && 'b')` |
| tailwind-merge | Resolve Tailwind conflicts | When two classes conflict, last one wins correctly |

## Dev Dependencies

| Package | What it does | Why we need it |
|---|---|---|
| vite | Dev server + bundler | Fast HMR, fast builds |
| @vitejs/plugin-react | React support for Vite | JSX, fast refresh |
| tailwindcss | CSS framework | Utility-first styling |
| @tailwindcss/vite | Tailwind 4 Vite plugin | CSS-native Tailwind, no PostCSS |
| typescript | Type checking | Catch errors before runtime |
| vitest | Test runner | Fast, Vite-native testing |
| @testing-library/react | Component testing | Test what users see, not implementation |
| @testing-library/jest-dom | DOM assertions | `toBeInTheDocument()`, `toHaveClass()` etc. |
| @testing-library/user-event | User interaction simulation | Click, type, tab — realistic events |
| vitest-axe | Accessibility testing | Catch a11y issues in tests |
| eslint | Linting | Code quality rules |
| @eslint/js | Base ESLint rules | JavaScript lint rules |
| @typescript-eslint/* | TS-aware linting | Type-safe lint rules |
| eslint-plugin-jsx-a11y | Accessibility linting | Catch a11y issues in JSX |
| eslint-plugin-react-hooks | Hook rules | Enforce rules of hooks |
| eslint-plugin-react-refresh | HMR safety | Prevent HMR-breaking patterns |
| eslint-plugin-simple-import-sort | Import ordering | Consistent import groups |
| prettier | Code formatting | Consistent style |
| prettier-plugin-tailwindcss | Tailwind class sorting | Consistent class order |
| husky | Git hooks | Run checks before commit |
| @commitlint/cli | Commit message linting | Enforce conventional commits |
| @commitlint/config-conventional | Commitlint config | feat:, fix:, docs:, etc. |
| lint-staged | Staged file linting | Only lint changed files |
| release-it | Release automation | Version bump, changelog, git tag |
| @release-it/conventional-changelog | Changelog generation | Auto-generate from commits |
| @clack/prompts | CLI prompts | Interactive setup wizard |
| jsdom | Browser simulation | Tests run without a real browser |
| globals | Global variables | ESLint browser/node globals |
| vite-plugin-sitemap | Sitemap generation | SEO: auto-generate sitemap.xml |
| @types/react | TypeScript types | Type definitions for React |
| @types/react-dom | TypeScript types | Type definitions for ReactDOM |

## Extensions (installed via registry)

_None yet. Use `/discover` or `/install-extension` to add integrations._

When an extension is installed, Claude Code MUST add it to this section with:
- Name and version
- What it does (1 sentence)
- Why it was added
- Date installed
