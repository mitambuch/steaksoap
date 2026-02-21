# Dependencies

Every installed dependency is documented here with its **justification**.
Nothing is installed "just in case". Each package has a reason to exist.

---

## Dependencies (production)

| Package | Version | Why |
|---|---|---|
| `react` | ^19.2.0 | UI framework — the core of the app |
| `react-dom` | ^19.2.0 | React rendering to the browser DOM |
| `react-router-dom` | ^7.12.0 | SPA routing — navigation between pages without reload |
| `clsx` | ^2.1.1 | Conditional CSS class concatenation (`cn('a', condition && 'b')`) |
| `tailwind-merge` | ^3.5.0 | Tailwind conflict resolution (`'px-4 px-8'` → `'px-8'`). Used with clsx in `cn()` |

---

## DevDependencies (development only)

### Build & Dev

| Package | Version | Why |
|---|---|---|
| `vite` | ^7.2.4 | Bundler + dev server. Fast, modern, instant HMR |
| `@vitejs/plugin-react` | ^5.1.1 | React support in Vite (JSX transform, Fast Refresh) |
| `typescript` | ^5.9.3 | Static typing — catches bugs before runtime |

### Styles

| Package | Version | Why |
|---|---|---|
| `tailwindcss` | ^4.2.0 | Utility-first CSS framework v4 — CSS-first config, faster builds |
| `@tailwindcss/vite` | ^4.2.0 | Native Vite plugin for Tailwind v4 (replaces PostCSS + autoprefixer) |

### Code Quality

| Package | Version | Why |
|---|---|---|
| `eslint` | ^9.39.2 | Linting — detects errors and bad patterns |
| `@eslint/js` | ^9.39.1 | Base ESLint rules for JavaScript |
| `@typescript-eslint/eslint-plugin` | ^8.56.0 | TypeScript-specific ESLint rules |
| `@typescript-eslint/parser` | ^8.56.0 | Allows ESLint to parse TypeScript |
| `eslint-plugin-react-hooks` | ^7.0.1 | Validates correct React hooks usage |
| `eslint-plugin-react-refresh` | ^0.4.24 | Validates Hot Module Replacement compatibility |
| `eslint-plugin-jsx-a11y` | ^6.10.2 | Accessibility checks (missing alt, ARIA roles, etc.) |
| `eslint-plugin-simple-import-sort` | ^12.1.1 | Automatic import sorting — consistent order everywhere |
| `prettier` | ^3.5.0 | Automatic code formatting. Zero style debates |
| `prettier-plugin-tailwindcss` | ^0.7.2 | Automatic Tailwind class sorting in recommended order |
| `globals` | ^16.5.0 | Browser global variables for ESLint |

### Types

| Package | Version | Why |
|---|---|---|
| `@types/react` | ^19.2.5 | TypeScript types for React |
| `@types/react-dom` | ^19.2.3 | TypeScript types for ReactDOM |

### Testing

| Package | Version | Why |
|---|---|---|
| `vitest` | ^4.0.18 | Fast test framework, Vite-compatible, replaces Jest |
| `jsdom` | ^28.1.0 | Simulates a browser in memory for React component testing |
| `@testing-library/react` | ^16.3.2 | Utilities for testing React components (render, screen, queries) |
| `@testing-library/jest-dom` | ^6.9.1 | Extra DOM matchers (toBeVisible, toHaveTextContent…) |
| `@testing-library/user-event` | ^14.6.1 | Simulates user interactions (click, type, hover…) |
| `vitest-axe` | ^0.1.0 | Accessibility testing with axe-core integration for Vitest |

### SEO

| Package | Version | Why |
|---|---|---|
| `vite-plugin-sitemap` | ^0.8.2 | Auto-generates `sitemap.xml` + `robots.txt` at build time |

### Git Hooks & Commits

| Package | Version | Why |
|---|---|---|
| `husky` | ^9.1.7 | Automatic git hooks: runs checks before every commit |
| `lint-staged` | ^16.2.7 | Lints only staged files (not the entire project) |
| `@commitlint/cli` | ^20.4.2 | Validates that every commit follows Conventional Commits |
| `@commitlint/config-conventional` | ^20.4.2 | Default rules for commitlint |

### Releases

| Package | Version | Why |
|---|---|---|
| `release-it` | ^19.2.4 | Automates: version bump + CHANGELOG + tag + GitHub Release |
| `@release-it/conventional-changelog` | ^10.0.5 | Generates CHANGELOG from conventional commits |

### Setup

| Package | Version | Why |
|---|---|---|
| `@clack/prompts` | ^1.0.1 | Beautiful interactive CLI prompts for the setup wizard |

---

## Rules for adding a dependency

1. **Check first**: can we do without? Does a native solution exist?
2. **Verify the package**: weekly downloads, last update, open issues
3. **Explain**: in 1 sentence, why it's needed
4. **Document here**: add a row to the table
5. **Mention in the commit**: the commit body explains the addition

## Maintenance commands

```bash
# Check outdated packages
pnpm outdated

# Check vulnerabilities
pnpm audit

# Update (minor + patches)
pnpm update

# For major upgrades → case by case with explanation
```
