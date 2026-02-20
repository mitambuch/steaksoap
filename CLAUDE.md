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

## Rappels pour Claude Code

- **Toujours demander** avant de push sur main.
- **Toujours informer** l'utilisateur quand il faut changer de branche.
- **Toujours vérifier** `git status` avant de commit.
- **Ne jamais** utiliser `--force`, `--no-verify`, ou `reset --hard` sans demander.
- **Séparer** les commits par sujet, même si c'est dans la même session.
