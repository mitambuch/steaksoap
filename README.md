# Starter

> Boilerplate React 19 + Vite 7 + TypeScript + Tailwind CSS pour l'agence.

[![CI](https://github.com/Mircooo/starter/actions/workflows/ci.yml/badge.svg)](https://github.com/Mircooo/starter/actions/workflows/ci.yml)

---

## Quick Start

```bash
# Nouveau projet client (tout est automatisé)
git clone https://github.com/Mircooo/starter.git mon-projet
cd mon-projet
node scripts/init.js

# Lancer le dev server
pnpm dev
# → http://localhost:5173
```

Le script `init.js` gère tout : remotes, GitHub repo, package.json, .env.local, deps, validation, commit initial + push.

---

## Stack

| Outil | Rôle |
|---|---|
| **React 19** | UI |
| **TypeScript 5** | Typage strict (`any` interdit) |
| **Vite 7** | Build + Dev server (HMR) |
| **Tailwind CSS 4** | Styling utility-first (CSS-first via `@theme`) |
| **React Router 7** | Routing SPA |
| **Cloudinary** | CDN images optimisées |
| **ESLint** | Lint (a11y + import sort + hooks) |
| **Prettier** | Formatting automatique |
| **Husky** | Git hooks (pre-commit + commit-msg) |
| **commitlint** | Validation Conventional Commits |
| **lint-staged** | Lint uniquement les fichiers modifiés |
| **release-it** | Releases automatisées + CHANGELOG |
| **vite-plugin-sitemap** | Sitemap + robots.txt auto-générés au build |
| **Vitest** | Tests unitaires |
| **GitHub Actions** | CI (lint + typecheck + tests + build) |

---

## Commandes

| Commande | Ce qu'elle fait |
|---|---|
| `pnpm dev` | Serveur de développement (HMR) |
| `pnpm build` | Build production |
| `pnpm validate` | **Lint + typecheck + tests + build** |
| `pnpm init:project` | Nouveau projet : script interactif |
| `pnpm setup` | Setup : install + .env.local + validate |
| `pnpm setup:update` | Pull les mises à jour du starter |
| `pnpm release` | Release : bump + CHANGELOG + tag + GitHub Release |

---

## Structure

```
src/
├── app/              → App root, routes, layouts
├── components/
│   ├── ui/           → Atomes (Button, Input, Card…)
│   ├── layout/       → Header, Footer, Nav…
│   └── features/     → ErrorBoundary, SeoHead…
├── config/           → env.ts, site.ts, cloudinary.ts
├── constants/        → Routes, valeurs constantes
├── pages/            → Une page = une route
├── styles/           → Design tokens, fonts, animations
├── hooks/            → Custom hooks
├── types/            → Types TypeScript partagés
└── utils/            → Fonctions pures (cn…)
```

**Path aliases** : `@components/`, `@hooks/`, `@config/`… jamais de `../../..`.

---

## Git — automatisé

Chaque `git commit` déclenche automatiquement :
1. **pre-commit** : ESLint --fix + Prettier sur les fichiers stagés
2. **commit-msg** : validation du format Conventional Commits

Messages de commit : `type(scope): description`

| Type | Usage |
|---|---|
| `feat` | Nouvelle feature |
| `fix` | Correction de bug |
| `refactor` | Restructuration |
| `style` | CSS / design |
| `chore` | Config, deps, CI |
| `docs` | Documentation |

---

## Releases

```bash
pnpm release          # bump auto + CHANGELOG + GitHub Release
pnpm release:patch    # 0.2.0 → 0.2.1
pnpm release:minor    # 0.2.0 → 0.3.0
pnpm release:major    # 0.2.0 → 1.0.0
```

---

## Adapter pour un client

Après `node scripts/init.js`, modifier :
- `.env.local` → Cloudinary, nom de l'app, URL (utilisé aussi pour le hostname du sitemap)
- `src/config/site.ts` → contact, réseaux sociaux, SEO
- `src/index.css` → couleurs, fonts (bloc `@theme`)
- `vite.config.ts` → ajouter les nouvelles routes SPA dans `dynamicRoutes` du plugin Sitemap

## Mettre à jour depuis le starter

```bash
pnpm setup:update
# → Fetch + merge les mises à jour du starter
```

---

## Documentation

- [CLAUDE.md](CLAUDE.md) — Instructions pour les agents IA
- [docs/SETUP.md](docs/SETUP.md) — Guide d'installation complet
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Structure des dossiers
- [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) — Dépendances justifiées
- [CHANGELOG.md](CHANGELOG.md) — Historique des changements
