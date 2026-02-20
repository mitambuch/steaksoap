# Git Workflow & Conventions

Ce fichier est la **source de vérité** pour la gestion Git de ce repo.
Il est lu automatiquement par Claude Code à chaque session.

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
- `main` est protégée — on ne commit **jamais** directement dessus (sauf initial commit).
- Toujours créer une branche avant de travailler.
- Une branche = un sujet. Ne pas mélanger plusieurs features dans une branche.
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

### Règles commits

- **Atomiques** : 1 commit = 1 changement logique. Pas de commits fourre-tout.
- **En anglais** : les messages de commit sont toujours en anglais.
- **Présent impératif** : "add", "fix", "remove" — pas "added", "fixes", "removing".
- **Max 72 caractères** pour la première ligne.
- Si un commit touche plusieurs fichiers pour la même raison, c'est OK en un seul commit.
- Si un commit touche plusieurs sujets différents, **séparer en plusieurs commits**.

### Exemples

```
feat(cloudinary): add responsive srcSet helper

fix(router): handle trailing slash redirect

chore(deps): upgrade react to v19.2

refactor(utils): replace manual cn() with clsx + tailwind-merge

style(layout): adjust header spacing on mobile
```

---

## Quand créer une branche ?

- **Avant** toute modification de code (sauf hotfix critique sur main).
- Même pour un "petit" changement : branche → commit(s) → merge/PR.

## Quand commit ?

- Dès qu'un changement logique est **terminé et fonctionnel**.
- Ne pas accumuler 10 modifications avant de commit.
- Ne pas commit du code cassé (sauf WIP explicite sur une branche perso).

## Quand push ?

- Après chaque session de travail.
- Après un ensemble de commits cohérent.
- Avant de demander une review.

## Quand merge dans main ?

- Quand la branche est **terminée**, testée, et prête.
- Préférer les **merge commits** (pas de fast-forward) pour garder l'historique lisible.
- Ou **squash merge** si la branche a beaucoup de petits commits intermédiaires.

---

## PR (Pull Requests)

Si le repo est public et collaboratif :
- Titre court (<70 chars), format : `type(scope): description`
- Body avec `## Summary` + `## Test plan`
- Toujours link les issues reliées si applicable.

---

## Hooks automatiques (Husky)

Chaque `git commit` déclenche automatiquement deux validations :

### 1. `pre-commit` → lint-staged
Lance ESLint + Prettier uniquement sur les fichiers stagés.
- `*.{ts,tsx}` : eslint --fix + prettier --write
- `*.css` : prettier --write

Si un fichier a une erreur ESLint **non auto-fixable** → commit **BLOQUÉ**.

### 2. `commit-msg` → commitlint
Valide le message de commit selon Conventional Commits.

| Exemple | Résultat |
|---------|---------|
| `wip` | ❌ BLOQUÉ |
| `fix stuff` | ❌ BLOQUÉ |
| `fix(router): handle 404 redirect` | ✅ OK |
| `feat(ui): add button component` | ✅ OK |

Règles actives (voir [commitlint.config.js](commitlint.config.js)) :
- Type doit être dans la liste autorisée
- Scope recommandé (warning si absent)
- Max 72 caractères
- Tout en minuscules
- Pas de point final

---

## Releases — Semantic Versioning

### Numérotation (SemVer)

```
v MAJOR . MINOR . PATCH
  │       │       └── fix: bug fixes, corrections
  │       └────────── feat: nouvelles fonctionnalités
  └────────────────── breaking change (BREAKING CHANGE: dans le commit)
```

**Conventions pre-1.0 (phase de dev) :**
- `0.y.z` = projet en développement, rien n'est stable
- `0.1.0` → `0.2.0` : nouvelle feature
- `0.1.0` → `0.1.1` : bug fix
- `1.0.0` = première release publique stable

### Commandes

```bash
pnpm release          # release interactive (release-it détecte le bump)
pnpm release:patch    # force patch  → 0.1.0 → 0.1.1
pnpm release:minor    # force minor  → 0.1.0 → 0.2.0
pnpm release:major    # force major  → 0.1.0 → 1.0.0
```

### Ce que fait `pnpm release` automatiquement

1. `pnpm validate` — lint + typecheck + build (bloque si cassé)
2. Calcule le bump de version depuis le dernier tag git
3. Bumpe `package.json` → `version`
4. Génère / met à jour `CHANGELOG.md`
5. Commit `chore(release): vX.Y.Z`
6. Crée le tag git `vX.Y.Z`
7. Push le commit + le tag
8. Crée la GitHub Release avec les notes auto-générées

### Quand releaser ?

- Après un ensemble de features / fixes mergés dans `main`
- **Toujours depuis `main`**, working tree clean
- **Jamais** en plein milieu d'un développement
- `pnpm release` = acte intentionnel, pas automatique

### Ce qui apparaît dans le CHANGELOG

| Type de commit | Dans le changelog |
|----------------|------------------|
| `feat:` | ✅ ✨ Features |
| `fix:` | ✅ 🐛 Bug Fixes |
| `perf:` | ✅ ⚡ Performance |
| `refactor:` | ✅ ♻️ Refactoring |
| `docs:` | ✅ 📚 Documentation |
| `chore:` / `style:` / `test:` / `merge:` | ❌ caché |

### Breaking changes

Dans le body ou footer du commit :
```
feat(api): change image URL structure

BREAKING CHANGE: publicId format changed from "folder/name" to "folder__name"
```
→ bumpe automatiquement le MAJOR (ex: `0.3.0` → `1.0.0`)

---

## Rappels pour Claude Code

- **Toujours demander** avant de push sur main.
- **Toujours informer** l'utilisateur quand il faut changer de branche.
- **Toujours vérifier** `git status` avant de commit.
- **Ne jamais** utiliser `--force`, `--no-verify`, ou `reset --hard` sans demander.
- **Séparer** les commits par sujet, même si c'est dans la même session.
