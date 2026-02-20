# Architecture du projet

Ce document explique **pourquoi** chaque dossier existe et **quoi** y mettre.

---

## Vue d'ensemble

```
cdn/
├── .github/              → CI, templates PR/issues
├── .husky/               → Git hooks (pre-commit, commit-msg)
├── .vscode/              → Config éditeur (extensions, settings)
├── docs/                 → Documentation projet
├── public/               → Fichiers statiques servis tels quels
│   ├── fonts/            → Polices servies directement (non importées)
│   └── images/           → Images statiques (favicon, og-image…)
├── src/                  → Code source
│   ├── app/              → Racine de l'application
│   ├── assets/           → Fichiers importés dans le code
│   ├── components/       → Composants React réutilisables
│   ├── config/           → Configuration applicative
│   ├── constants/        → Valeurs constantes
│   ├── context/          → React Contexts
│   ├── data/             → Données statiques / fixtures
│   ├── features/         → Features complexes autonomes
│   ├── hooks/            → Custom hooks React
│   ├── lib/              → Wrappers de librairies tierces
│   ├── pages/            → Pages (1 page = 1 route)
│   ├── styles/           → Styles globaux
│   ├── types/            → Types TypeScript partagés
│   └── utils/            → Fonctions utilitaires pures
└── [configs]             → vite, tsconfig, eslint, prettier, vercel…
```

---

## Détail de chaque dossier

### `public/`

Fichiers servis **tels quels** par Vite. Pas d'import, pas de transformation.
- `fonts/` → Polices `.woff2` référencées dans `@font-face` via URL absolue `/fonts/...`
- `images/` → `favicon.svg`, `og-image.png`, robots.txt...

> **Règle** : si un fichier est **importé** dans le code → il va dans `src/assets/`.
> Si il est **référencé par URL** → il va dans `public/`.

### `src/app/`

Le coeur de l'application. Contient :
- `App.tsx` → Point d'entrée : ErrorBoundary + BrowserRouter + Providers
- `routes/index.tsx` → Configuration de toutes les routes (lazy loading)
- `layouts/RootLayout.tsx` → Wrapper commun (Header + Outlet + Footer)

### `src/assets/`

Fichiers **importés** dans le code (Vite les transforme, les hash, les optimise) :
- `fonts/` → Polices importées via `@font-face` dans `fonts.css`
- `images/` → Images importées dans les composants via `import`
- `icons/` → SVG importés comme composants React

### `src/components/`

Composants **réutilisables** dans plusieurs pages :
- `ui/` → Atomes : Button, Input, Badge, Card, Modal…
- `layout/` → Structure de page : Header, Footer, Sidebar, Nav…
- `features/` → Composants liés à une logique (ErrorBoundary, Toast…)

> **Règle** : un composant n'est ici que s'il est utilisé dans **2+ pages**.
> S'il est spécifique à une feature, il va dans `src/features/<nom>/`.

### `src/config/`

Configuration applicative :
- `cloudinary.ts` → Helper centralisé pour les URLs Cloudinary

### `src/constants/`

Valeurs constantes utilisées partout :
- `routes.ts` → Toutes les URLs de l'app. **Jamais** de strings en dur dans les composants.

### `src/context/`

React Contexts pour le state global : ThemeContext, AuthContext…

### `src/data/`

Données statiques : JSON de contenu, fixtures, mock data.
Utile pour les sites vitrines où le contenu est hardcodé (pas de CMS).

### `src/features/`

Pour les **features complexes** qui méritent leur propre dossier :

```
src/features/counter/        ← exemple inclus dans le starter
├── Counter.tsx              → Composant principal
├── useCounter.ts            → Hook spécifique
├── types.ts                 → Types spécifiques
└── index.ts                 → Barrel export
```

> **Règle** : une feature a son propre dossier quand elle a **3+ fichiers liés**.
> L'exemple `counter/` est un modèle de référence — à supprimer quand tu démarres un vrai projet.

### `src/hooks/`

Custom hooks **partagés** entre plusieurs composants/pages :
`useMediaQuery`, `useScroll`, `useSEO`…

### `src/lib/`

Wrappers et abstractions de librairies tierces : analytics, i18n, etc.
Objectif : **isoler** les dépendances pour qu'un changement de lib ne touche qu'un fichier.

### `src/pages/`

**1 fichier = 1 page = 1 route.** Toujours lazy-loaded dans `routes/index.tsx`.
- `Home.tsx`, `About.tsx`, `Contact.tsx`, `NotFound.tsx`…

### `src/styles/`

Styles globaux :
- `fonts.css` → Déclarations `@font-face`
- `animations.css` → Keyframes globaux

> **Règle** : les design tokens (couleurs, fonts) sont définis dans `@theme` de `src/index.css`. C'est la **source de vérité** du design system (Tailwind v4 CSS-first).

### `src/types/`

Types TypeScript partagés : `common.ts` pour les types utilitaires, interfaces globales…

### `src/utils/`

Fonctions pures et utilitaires : `cn()` (class merge), formatters, parsers…

---

## Conventions de nommage

| Type | Convention | Exemple |
|---|---|---|
| Composant React | PascalCase | `HeroSection.tsx` |
| Hook | camelCase avec `use` | `useMediaQuery.ts` |
| Utilitaire | camelCase | `formatDate.ts` |
| Constante | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Type/Interface | PascalCase | `CloudinaryImage` |
| Fichier CSS | kebab-case | `animations.css` |
| Dossier | kebab-case | `hero-section/` |

---

## Ajouter une page

```bash
# 1. Créer la page
# src/pages/About.tsx

# 2. Ajouter la route dans constants/routes.ts
# ABOUT: '/about',

# 3. Ajouter dans src/app/routes/index.tsx
# const About = lazy(() => import('@pages/About'));
# <Route path={ROUTES.ABOUT} element={<About />} />
```

## Ajouter une feature complexe

```bash
mkdir -p src/features/ma-feature
# Créer : index.ts, types.ts, MaFeature.tsx
# + hooks/ si custom hooks nécessaires
```
