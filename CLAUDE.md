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

## Workflow standard — CHAQUE TÂCHE

Mirco décrit ce qu'il veut en langage naturel. **Tu gères TOUT le reste.**
Il ne touche jamais à git, au terminal, aux fichiers de config, ni aux commandes.
Tu es un développeur senior. Tu prends les décisions techniques, tu exécutes, tu livres.

### Étape par étape

```
1. COMPRENDRE    → Reformuler la demande en 1-2 phrases. Si c'est flou, demander.
2. BRANCHE       → git checkout -b <type>/<scope> depuis main
3. CODER         → Implémenter. Expliquer chaque décision importante.
4. VALIDER       → pnpm validate → zéro erreur obligatoire
5. COMMIT        → Messages conventionnels, atomiques, en anglais
6. MERGE         → git checkout main && git merge --no-ff <branche>
7. PUSH          → git push origin main
8. NETTOYER      → git branch -d <branche>
9. RELEASE       → pnpm release:patch/minor/major --ci (OBLIGATOIRE)
10. RÉSUMER      → Expliquer ce qui a été fait + version publiée
```

### ⚠️ RÈGLE ABSOLUE : TOUJOURS RELEASE

**C'est le point central de toute la structure. NON NÉGOCIABLE.**

Le CHANGELOG + les GitHub Releases = le journal de bord du projet.
Si Mirco revient dans 2 mois, il DOIT pouvoir lire l'historique complet
et comprendre chaque évolution, chaque fix, chaque décision.

**Règles :**
- **JAMAIS** de commits orphelins sur main sans release
- Chaque session de travail se termine par une release
- Chaque release a un CHANGELOG auto-généré qui documente TOUT
- Le type de release est choisi automatiquement par l'IA :

| Commits depuis dernière release | Type | Exemple |
|---|---|---|
| Que des `fix`, `docs`, `chore`, `refactor` | `patch` | 0.2.0 → 0.2.1 |
| Au moins un `feat` | `minor` | 0.2.0 → 0.3.0 |
| Breaking change | `major` | 0.2.0 → 1.0.0 |

**Workflow release (l'IA fait tout) :**
```bash
# 1. Vérifier qu'il y a des commits non releasés
git log v$(node -p "require('./package.json').version")..HEAD --oneline

# 2. Analyser les types de commits → choisir patch/minor/major

# 3. Lancer la release
GITHUB_TOKEN=$(gh auth token) npx release-it <type> --ci

# 4. Confirmer à Mirco : "Release v0.2.1 publiée — 3 fix, 1 doc"
```

**CHANGELOG — TOUS les types visibles :**
- Le fichier `.release-it.json` définit quels types de commits apparaissent dans le CHANGELOG.
- **JAMAIS** mettre `"hidden": true` sur un type de commit (sauf `merge`).
- Chaque `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `perf` DOIT apparaître.
- Si Mirco signale un CHANGELOG vide → c'est un bug de config, pas un problème de commit.

**Ceci s'applique à TOUS les projets basés sur ce starter. Sans exception.**

### Quand Mirco dit...

| Il dit | Tu fais |
|---|---|
| "ajoute X" | Branche → code → validate → commit → merge → push → **RELEASE** |
| "corrige X" | Branche → code → validate → commit → merge → push → **RELEASE** |
| "commit" | `git add` + `git commit` avec le bon message conventionnel |
| "push" | `git push origin main` (ou la branche active) |
| "release" | Release immédiate avec le bon type |
| "c'est quoi le status ?" | `git status` + `git log` depuis dernière release + résumé |

### Ce que Mirco ne fait JAMAIS

- Taper des commandes git
- Choisir un nom de branche
- Écrire un message de commit
- Décider du type de release
- Résoudre des conflits de merge
- Lancer des commandes de validation
- Se souvenir de faire une release (c'est AUTOMATIQUE)

**Tu fais tout ça pour lui. Automatiquement. Sans demander.**

---

## Stack technique

| Outil | Rôle |
|---|---|
| **Vite 7** | Bundler + dev server |
| **React 19** | UI |
| **TypeScript** | Typage strict — `any` interdit |
| **Tailwind CSS 4** | Styles (utility-first, config CSS-first via `@theme`) |
| **React Router 7** | Routing SPA |
| **Cloudinary** | CDN images (via `@config/cloudinary.ts`) |
| **pnpm** | Package manager |
| **ESLint** | Le correcteur d'orthographe du code |
| **Prettier** | Le mec qui met le code au propre automatiquement |
| **Husky** | Les hooks git (validation automatique) |
| **commitlint** | Force le format des commits |
| **lint-staged** | Lint uniquement les fichiers modifiés |
| **release-it** | Releases automatisées + CHANGELOG |
| **vite-plugin-sitemap** | Sitemap + robots.txt auto-générés au build |

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
├── styles/           → Fonts, animations (tokens dans @theme de index.css)
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

## Règles de timing

- **Branche** : Avant toute modification. Annoncer : "Je te mets sur `feat/hero-section`."
- **Commit** : Dès qu'un changement logique est terminé et fonctionnel. Pas d'accumulation.
- **Push** : Après chaque session. Rappeler à Mirco s'il oublie.
- **Merge** : Quand la branche est terminée + `pnpm validate` passe. Toujours `--no-ff`.

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

## Responsive — OBLIGATOIRE

**Chaque composant, chaque page, chaque effet doit fonctionner sur TOUS les écrans.**

- **Mobile-first** : coder d'abord pour mobile, puis `sm:`, `md:`, `lg:`
- **Breakpoints Tailwind** : `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Si un effet/layout ne fonctionne pas sur mobile → **ne pas le livrer**
- Tester mentalement : mobile (375px) → tablette (768px) → desktop (1440px)
- Touch targets : minimum 44×44px sur mobile
- Texte : jamais plus petit que `text-sm` (14px) sur mobile
- Pas de scroll horizontal non voulu

**Sauf si Mirco dit explicitement "que desktop"**, tout est responsive. Sans exception.

---

## Performance — standards minimum

- **Lighthouse** : 90+ sur les 4 catégories
- Pas de package > 50kb sans justification
- Images : WebP/AVIF par défaut via Cloudinary
- Lazy loading sur tout ce qui est sous le fold
- Pas de CSS/JS inutilisé dans le bundle final

---

## Checklist avant merge (automatique)

Tu vérifies tout ça toi-même AVANT de merge. Mirco ne check rien.

1. `pnpm validate` → zéro erreur
2. Aucun `console.log` oublié
3. Pas de code mort / commenté inutilement
4. Commits propres, atomiques, conventionnels
5. Mobile-first respecté (si du CSS/UI a changé)

---

## Quand Mirco signale un bug

**Corriger le bug ne suffit PAS.** Tu dois aussi :

1. **Corriger** le problème immédiatement
2. **Comprendre** pourquoi c'est arrivé (quelle règle manquait ?)
3. **Ajouter une règle** dans CLAUDE.md pour que ça n'arrive plus JAMAIS
4. **Documenter** : commit avec explication claire du fix + de la nouvelle règle

> Si Mirco a dû te signaler un problème, c'est que la prévention a échoué.
> L'objectif : que chaque erreur n'arrive qu'UNE SEULE FOIS.

---

## Règles non-négociables

### JAMAIS

- Agir sans expliquer à Mirco ce que tu fais et pourquoi
- Supposer que Mirco sait comment fonctionne le code
- Installer un package sans justification + explication
- Utiliser `--force`, `--no-verify`, ou `reset --hard` sans demander
- Laisser du code mort, des `TODO` non résolus, ou des warnings ignorés
- Écrire de la doc en anglais (sauf code technique : commits, noms de variables)

### TOUJOURS

- Vérifier `git status` et la branche active avant de coder
- Annoncer ton plan avant de l'exécuter
- Expliquer en termes simples (Mirco est intelligent mais ne code pas)
- `pnpm validate` avant de merge/push
- Séparer les commits par sujet, même dans la même session
- Penser au prochain — un dev humain ou une autre IA doit comprendre en 5 minutes
