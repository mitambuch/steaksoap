# Contributing

Thanks for wanting to contribute! This project is built through vibe coding with AI agents, and we welcome contributions of all kinds — bug reports, feature ideas, code, and documentation.

---

## Quick setup

```bash
git clone https://github.com/Mircooo/starter.git
cd starter
pnpm install
cp .env.example .env.local   # fill in values
pnpm dev
```

Before pushing anything:

```bash
pnpm validate   # lint + typecheck + tests + build — must pass
```

---

## How to contribute

### Report a bug

Open an [issue](https://github.com/Mircooo/starter/issues/new?template=bug_report.yml) with:
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, browser)

### Suggest a feature

Open an [issue](https://github.com/Mircooo/starter/issues/new?template=feature_request.yml) with:
- The problem you're trying to solve
- Your proposed solution
- Alternatives you've considered

### Submit code

1. **Fork** the repo and create a branch: `feat/my-feature` or `fix/my-bug`
2. **Code** your changes following the conventions below
3. **Validate**: `pnpm validate` must pass with zero errors
4. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/): `feat(scope): add thing`
5. **Push** and open a Pull Request

---

## Conventions

### Code style

- **Path aliases** — Always use `@components/`, `@hooks/`, `@config/`… never `../../..`
- **`any` is forbidden** — TypeScript strict mode is enforced. No exceptions.
- **Lazy loading** — Every new page goes in `src/app/routes/index.tsx` via `lazy()`
- **Mobile-first** — Write styles for mobile first, then `sm:`, `md:`, `lg:`

### Commits

Format: `type(scope): description`

| Type | When |
|---|---|
| `feat` | New visible feature |
| `fix` | Bug fix |
| `refactor` | Restructuring without behavior change |
| `style` | CSS, UI, formatting (no logic) |
| `chore` | Config, deps, CI, tooling |
| `docs` | Documentation only |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |

Rules:
- **English**, present imperative: "add", "fix", "remove"
- **Lowercase**, no period at the end
- **Max 72 characters** for the first line
- **Scope is required**: `feat(home):` not just `feat:`

### Branch naming

| Type | Format | Example |
|---|---|---|
| Feature | `feat/<scope>` | `feat/gallery-grid` |
| Fix | `fix/<scope>` | `fix/cloudinary-url` |
| Docs | `docs/<scope>` | `docs/readme` |
| Chore | `chore/<scope>` | `chore/deps-update` |

---

## Project structure (30 seconds)

```
app/routes/    → routing (lazy loading)
app/layouts/   → page wrappers (Header + Footer + Outlet)
pages/         → one page = one file
components/ui/ → reusable atoms
features/      → complex features with their own hooks/types
config/        → Cloudinary and external services
styles/        → design tokens, fonts, animations
constants/     → routes and global constants
```

### Naming conventions

| What | Convention | Example |
|---|---|---|
| Components | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| Hooks | camelCase + use | `useScroll.ts`, `useMediaQuery.ts` |
| Utils | camelCase | `cn.ts`, `formatDate.ts` |
| Constants | UPPER_SNAKE | `ROUTES`, `BREAKPOINTS` |
| Types | PascalCase | `NavItem`, `CloudinaryImage` |
| CSS vars | kebab-case | `--color-accent`, `--font-sans` |

---

## Design tokens

Colors, fonts, and spacing are defined in `src/index.css` inside the `@theme` block.
This is the **source of truth** for the design system (Tailwind v4 CSS-first).

## Images

Use Cloudinary for all images. Use `cloudinary.url()` from `@config/cloudinary`.

## Fonts

Declared in `src/styles/fonts.css`. Font files (`.woff2`) go in `public/fonts/`.

---

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Questions?

Open a [discussion](https://github.com/Mircooo/starter/discussions) or an issue. We're happy to help.
