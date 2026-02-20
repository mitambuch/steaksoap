# Starter

> Boilerplate React 19 + Vite 7 + TypeScript + Tailwind CSS de l'agence.

---

## Stack

| Outil | Version | Rôle |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5 strict | Typage |
| Vite | 7 | Build + Dev server |
| Tailwind CSS | 3 | Styling |
| React Router | 7 | Routing |
| Prettier | 3 | Formatting |
| pnpm | 10 | Package manager |
| Cloudinary | CDN | Images |

---

## Quick Start

```bash
# 1. Installer les dépendances
pnpm install

# 2. Copier les variables d'environnement
cp .env.example .env.local
# → Remplir les valeurs dans .env.local

# 3. Lancer le dev server
pnpm dev
# → http://localhost:5173

# 4. Vérifier avant de push
pnpm validate
```

---

## Structure

```
├── public/
│   ├── fonts/          → Fonts statiques (servies directement)
│   └── images/         → Images statiques (favicon, og-image…)
│
└── src/
    ├── app/
    │   ├── App.tsx     → Root : BrowserRouter + Providers
    │   ├── routes/     → Configuration des routes (lazy loading)
    │   └── layouts/    → RootLayout, AuthLayout…
    │
    ├── assets/
    │   ├── fonts/      → Fonts importées via @font-face dans fonts.css
    │   ├── images/     → Images importées dans les composants
    │   └── icons/      → SVG icons (importés comme composants)
    │
    ├── components/
    │   ├── ui/         → Atomes : Button, Input, Badge, Card…
    │   ├── layout/     → Header, Footer, Sidebar, Nav…
    │   └── features/   → Composants feature légère (sans dossier dédié)
    │
    ├── config/
    │   └── cloudinary.ts → Helper centralisé pour les URLs Cloudinary
    │
    ├── constants/
    │   └── routes.ts   → Toutes les URLs de l'app (jamais de strings en dur)
    │
    ├── context/        → React contexts (Theme, Auth…)
    ├── data/           → Données statiques / fixtures
    ├── hooks/          → Custom hooks (useX.ts)
    ├── lib/            → Wrappers tiers (analytics, i18n…)
    ├── pages/          → Une page = une route = un fichier
    ├── styles/
    │   ├── tokens.css  → Variables CSS (couleurs, fonts, spacing, z-index…)
    │   ├── fonts.css   → Déclarations @font-face
    │   └── animations.css → Keyframes globaux
    ├── types/          → Types TypeScript partagés
    └── utils/          → Fonctions pures (cn, format, parse…)
```

---

## Règles d'or

1. **Path aliases** — Jamais de `../../..`. Toujours `@components/`, `@hooks/`, etc.
2. **`any` interdit** — ESLint bloque. Si t'as besoin, justifie avec un commentaire.
3. **Barrel exports** — Chaque dossier a son `index.ts`. On importe le dossier, pas le fichier.
4. **Lazy loading** — Toutes les pages passent par `lazy()` dans `routes/index.tsx`.
5. **Design tokens** — Couleurs, fonts, spacing → `styles/tokens.css`. Jamais en dur dans le code.
6. **Cloudinary** — Toutes les images via `cloudinary.url()`. Jamais d'URL en dur.
7. **`pnpm validate`** doit passer avant chaque push. Pas de discussion.
8. **Features complexes** → dossier `src/features/[nom]/` avec ses propres `types.ts`, `constants.ts`, `hooks/`, composants.

---

## Ajouter une page

```bash
# 1. Créer la page
touch src/pages/About.tsx

# 2. Ajouter la route dans constants/routes.ts
# ABOUT: '/about',

# 3. Ajouter dans src/app/routes/index.tsx
# const About = lazy(() => import('@pages/About'));
# <Route path={ROUTES.ABOUT} element={<About />} />
```

## Ajouter une feature complexe

```bash
mkdir -p src/features/ma-feature
# Créer : index.ts, types.ts, constants.ts, MaFeature.tsx
# + hooks/ si custom hooks nécessaires
```

## Images Cloudinary

```tsx
import { cloudinary } from '@config/cloudinary';

// Image simple optimisée
<img
  src={cloudinary.url('folder/image-name', { w: 800, q: 'auto' })}
  alt="Description"
/>

// Image responsive
<img
  src={cloudinary.url('folder/image-name', { w: 1200 })}
  srcSet={cloudinary.srcSet('folder/image-name')}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Description"
/>
```

---

## Git

Voir [CLAUDE.md](CLAUDE.md) pour les conventions complètes.

```bash
# Nouvelle feature
git checkout -b feat/<scope>
# ... commits ...
git checkout main
git merge --no-ff feat/<scope>
git push origin main

# Release
pnpm release         # bump auto + CHANGELOG + GitHub Release
pnpm release:minor   # force minor bump
```

### Convention commits

Format : `type(scope): description` — commitlint valide automatiquement.

| Type | Usage |
|---|---|
| `feat` | Nouvelle feature |
| `fix` | Correction de bug |
| `refactor` | Refactoring sans changement de comportement |
| `style` | CSS / design uniquement |
| `chore` | Config, deps, tooling |
| `docs` | Documentation |
| `perf` | Performance |

Exemples : `feat(ui): add button component` · `fix(router): handle 404 redirect`
