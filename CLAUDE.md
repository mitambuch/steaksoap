# CLAUDE.md — Source de vérité pour les agents IA

Ce fichier est lu automatiquement par Claude Code (et tout autre agent IA) à chaque session.
C'est le **contrat** entre l'humain et l'IA. Chaque règle ici est non-négociable.

---

## Contexte du projet

Ce repo est un **boilerplate réutilisable** pour les sites vitrines clients de l'agence.
Chaque nouveau client = un clone de ce repo + adaptation.

- **Cible** : PME suisses (garages, hôtels, artisans…)
- **Stack** : React 19 · TypeScript · Vite 7 · Tailwind CSS · pnpm
- **SEO** : local, multilingue possible (FR/DE)
- **Mobile-first** : 70%+ du trafic est mobile en Suisse

> Ce projet a été construit en **vibe coding** avec des agents IA.
> La structure est volontairement simple et documentée pour que n'importe qui puisse reprendre.

---

## Qui est Mirco (le boss)

- Ne lit pas le code. Il lit les **explications, résumés, commentaires**.
- Comprend la logique, pas la syntaxe. Il sait ce qu'il veut, pas comment l'écrire.
- **Vibe code** : il donne la direction, l'IA exécute avec rigueur.
- Est **exigeant**. Si c'est pas clean, c'est pas livré.

### Comment s'adresser à lui

- Comme à un **débutant intelligent**. Pas condescendant. Pas simpliste. Clair.
- Expliquer le **POURQUOI** avant le COMMENT.
- Utiliser des analogies concrètes quand c'est possible.

### Format de communication

**Quand tu fais une grosse action :**
```
ACTION : Je vais [décrire l'action]
OÙ : [fichier(s) concerné(s)]
POURQUOI : [raison en 1-2 phrases simples]
RISQUE : [aucun / faible / moyen — et pourquoi]
```

**Quand il y a un bug :**
```
ERREUR : [nom de l'erreur]
EN SIMPLE : [explication accessible]
SOLUTION : [ce que tu proposes]
OÙ : [fichier et ligne]
```

**Quand tu installes un package :**
```
NOUVEAU PACKAGE : [nom]
C'EST QUOI : [explication en 1 phrase]
STATS : [downloads/semaine, dernière mise à jour]
POURQUOI : [pourquoi on en a besoin]
```

---

## Stack technique

| Outil | Rôle |
|---|---|
| **Vite 7** | Bundler + dev server |
| **React 19** | UI |
| **TypeScript** | Typage strict — `any` interdit |
| **Tailwind CSS 3** | Styles (utility-first) |
| **React Router 7** | Routing SPA |
| **Cloudinary** | CDN images (via `@config/cloudinary.ts`) |
| **pnpm** | Package manager |
| **ESLint** | Le correcteur d'orthographe du code |
| **Prettier** | Le mec qui met le code au propre automatiquement |
| **Husky** | Les hooks git (validation automatique) |
| **commitlint** | Force le format des commits |
| **lint-staged** | Lint uniquement les fichiers modifiés |
| **release-it** | Releases automatisées + CHANGELOG |

---

## Architecture

Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) pour le détail complet.

```
src/
├── app/              → App root, routes, layouts
├── assets/           → Fonts, images, icons (importés dans le code)
├── components/
│   ├── ui/           → Atomes réutilisables (Button, Input, Card…)
│   ├── layout/       → Header, Footer, Sidebar, Nav…
│   └── features/     → Composants feature (ErrorBoundary…)
├── config/           → Config app (Cloudinary, SEO…)
├── constants/        → Routes, valeurs constantes
├── context/          → React contexts (Theme, Auth…)
├── data/             → Données statiques / fixtures
├── features/         → Features complexes (dossier par feature)
├── hooks/            → Custom hooks (useX.ts)
├── lib/              → Wrappers tiers (analytics, i18n…)
├── pages/            → Une page = une route = un fichier
├── styles/           → Design tokens, fonts, animations
├── types/            → Types TypeScript partagés
└── utils/            → Fonctions pures (cn, format, parse…)
```

**Path aliases** — jamais de `../../..`. Toujours `@components/`, `@hooks/`, etc.

---

## Sécurité — non-négociable

- **Jamais** exposer de clés API, tokens, ou secrets dans le code → `.env` uniquement
- **Jamais** installer un package sans vérifier : downloads, dernière mise à jour, dépendances, issues
- Privilégier les **solutions natives** avant d'ajouter une dépendance
- Chaque nouvelle dépendance doit être **justifiée** dans le commit ET expliquée à Mirco
- **Fichiers sensibles** : `.env`, `vite.config.ts`, `package.json`, `eslint.config.js` → pas touche sans explication

---

## Branches

| Type | Format | Exemple | Depuis |
|------|--------|---------|--------|
| Feature | `feat/<scope>` | `feat/gallery-grid` | `main` |
| Fix | `fix/<scope>` | `fix/cloudinary-url` | `main` |
| Refactor | `refactor/<scope>` | `refactor/routing` | `main` |
| Chore | `chore/<scope>` | `chore/deps-update` | `main` |
| Docs | `docs/<scope>` | `docs/readme` | `main` |
| Style | `style/<scope>` | `style/dark-mode` | `main` |

**Règles :**
- `main` est protégée — on ne commit **jamais** directement dessus.
- Toujours créer une branche avant de travailler.
- Une branche = un sujet. Ne pas mélanger plusieurs features.
- Supprimer la branche après merge.

---

## Commits — Conventional Commits

Format strict :

```
<type>(<scope>): <description courte>

<body optionnel — le "pourquoi", pas le "quoi">
```

### Types autorisés

| Type | Quand |
|------|-------|
| `feat` | Nouvelle fonctionnalité visible |
| `fix` | Correction de bug |
| `refactor` | Restructuration sans changement de comportement |
| `style` | CSS, UI, formatting (pas de logique) |
| `chore` | Config, deps, CI, tooling |
| `docs` | Documentation uniquement |
| `perf` | Amélioration de performance |
| `test` | Ajout ou modification de tests |
| `merge` | Merge commits (`merge(main): ...`) |

### Règles

- **Atomiques** : 1 commit = 1 changement logique
- **En anglais** — commitlint valide automatiquement
- **Présent impératif** : "add", "fix", "remove" — pas "added", "fixes"
- **Max 72 caractères** pour la première ligne
- **Minuscules uniquement**, pas de point final

---

## Quand créer une branche ?

- **Avant** toute modification de code.
- Même pour un "petit" changement : branche → commit(s) → merge.
- **Annoncer à Mirco** : "Je te mets sur `feat/hero-section` pour travailler sur la section hero."

## Quand commit ?

- Dès qu'un changement logique est **terminé et fonctionnel**.
- Ne pas accumuler 10 modifications avant de commit.
- Ne pas commit du code cassé (sauf WIP explicite sur une branche perso).

## Quand push ?

- Après chaque session de travail.
- Rappeler à Mirco s'il oublie : "N'oublie pas de push tes changements."

## Quand merge dans main ?

- Quand la branche est **terminée**, testée, et prête.
- Préférer les **merge commits** (`--no-ff`) pour garder l'historique lisible.

---

## Hooks automatiques (Husky)

Chaque `git commit` déclenche automatiquement :

### 1. `pre-commit` → lint-staged
- `*.{ts,tsx}` : eslint --fix + prettier --write
- `*.css` : prettier --write
- Erreur ESLint non auto-fixable → commit **BLOQUÉ**

### 2. `commit-msg` → commitlint
- Valide le format Conventional Commits
- `wip` → BLOQUÉ · `fix stuff` → BLOQUÉ · `fix(router): handle 404` → OK

---

## Releases — Semantic Versioning

```
v MAJOR . MINOR . PATCH
  │       │       └── fix: bug fixes
  │       └────────── feat: nouvelles fonctionnalités
  └────────────────── BREAKING CHANGE
```

**Pre-1.0** : `0.y.z` = développement, rien n'est stable.

```bash
pnpm release          # release interactive (bump auto)
pnpm release:patch    # 0.1.0 → 0.1.1
pnpm release:minor    # 0.1.0 → 0.2.0
pnpm release:major    # 0.1.0 → 1.0.0
```

`pnpm release` fait tout automatiquement : validate → bump → CHANGELOG → tag → push → GitHub Release.

---

## PR (Pull Requests)

- Titre court (<70 chars) : `type(scope): description`
- Body : `## Summary` + `## Test plan`
- Toujours link les issues reliées

---

## Documentation

Fichiers de documentation obligatoires :
- [README.md](README.md) — Vue d'ensemble, quick start
- [CLAUDE.md](CLAUDE.md) — Ce fichier. Instructions IA.
- [CHANGELOG.md](CHANGELOG.md) — Log de tous les changements
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Structure des dossiers
- [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) — Chaque dépendance justifiée
- [docs/SETUP.md](docs/SETUP.md) — Guide d'installation pas à pas

### Commentaires dans le code

- Chaque composant : un bloc en haut qui explique ce qu'il fait
- Chaque fonction utilitaire : ce qu'elle prend et ce qu'elle retourne
- Chaque "truc bizarre" : si c'est contre-intuitif, expliquer pourquoi

---

## Performance — standards minimum

- **Lighthouse** : 90+ sur les 4 catégories
- Pas de package > 50kb sans justification
- Images : WebP/AVIF par défaut via Cloudinary
- Lazy loading sur tout ce qui est sous le fold
- Pas de CSS/JS inutilisé dans le bundle final

---

## Checklist avant merge

- [ ] `pnpm validate` → zéro erreur (lint + typecheck + build)
- [ ] Console du navigateur → zéro erreur
- [ ] Responsive testé (mobile, tablette, desktop)
- [ ] Aucun `console.log` oublié
- [ ] Aucun commentaire `TODO` non résolu
- [ ] CHANGELOG.md à jour
- [ ] Commits propres et descriptifs

---

## Rappels pour Claude Code

- **Toujours vérifier** la branche active avant de coder
- **Toujours annoncer** le plan avant de l'exécuter
- **Toujours demander** avant de push sur main
- **Toujours informer** quand il faut changer de branche
- **Toujours vérifier** `git status` avant de commit
- **Ne jamais** utiliser `--force`, `--no-verify`, ou `reset --hard` sans demander
- **Ne jamais** installer un package sans expliquer
- **Ne jamais** supprimer un fichier sans confirmation
- **Ne jamais** toucher à `.env`, `vite.config.ts`, `package.json`, `eslint.config.js` sans expliquer
- **Séparer** les commits par sujet, même dans la même session
- **Rappeler** les bonnes pratiques même si Mirco ne demande pas
- **Logger** les changements significatifs dans CHANGELOG.md

---

## Ce que tu ne fais JAMAIS

1. Agir sans expliquer
2. Supposer que Mirco sait
3. Installer des deps sans justification
4. Toucher à main directement
5. Laisser du code mort / commenté inutilement
6. Ignorer les warnings
7. Créer des fichiers sans les placer dans la bonne structure
8. Oublier le mobile
9. Écrire de la doc en anglais (sauf code technique)

## Ce que tu fais TOUJOURS

1. Vérifier la branche active
2. Annoncer ton plan
3. Expliquer en termes simples
4. Documenter dans le code ET dans les docs
5. Tester après chaque changement (lint + build)
6. Proposer des améliorations quand tu vois un problème
7. Garder le code DRY
8. Penser au prochain — un dev humain ou une autre IA doit comprendre en 5 minutes
