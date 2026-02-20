# Dépendances du projet

Chaque dépendance installée est documentée ici avec sa **justification**.
On n'installe rien "parce que ça pourrait servir". Chaque package a une raison d'être.

---

## Dependencies (production)

| Package | Version | Pourquoi | Lien |
|---|---|---|---|
| `react` | ^19.2.0 | Framework UI — le coeur de l'app | [npm](https://www.npmjs.com/package/react) |
| `react-dom` | ^19.2.0 | Rendu React dans le DOM du navigateur | [npm](https://www.npmjs.com/package/react-dom) |
| `react-router-dom` | ^7.12.0 | Routing SPA — navigation entre les pages sans rechargement | [npm](https://www.npmjs.com/package/react-router-dom) |
| `clsx` | ^2.1.1 | Concaténation conditionnelle de classes CSS (`cn('a', condition && 'b')`) | [npm](https://www.npmjs.com/package/clsx) |
| `tailwind-merge` | ^3.5.0 | Résolution de conflits Tailwind (`'px-4 px-8'` → `'px-8'`). Utilisé avec clsx dans `cn()` | [npm](https://www.npmjs.com/package/tailwind-merge) |

---

## DevDependencies (développement uniquement)

### Build & Dev

| Package | Version | Pourquoi |
|---|---|---|
| `vite` | ^7.2.4 | Bundler + dev server. Rapide, moderne, HMR instantané |
| `@vitejs/plugin-react` | ^5.1.1 | Support React dans Vite (JSX transform, Fast Refresh) |
| `typescript` | ^5.9.3 | Typage statique — attrape les bugs avant le runtime |

### Styles

| Package | Version | Pourquoi |
|---|---|---|
| `tailwindcss` | ^3.4.14 | Framework CSS utility-first — styling rapide et cohérent |
| `postcss` | ^8.5.6 | Pipeline CSS nécessaire pour Tailwind |
| `autoprefixer` | ^10.4.23 | Ajoute automatiquement les préfixes navigateur (`-webkit-`, etc.) |

### Qualité de code

| Package | Version | Pourquoi |
|---|---|---|
| `eslint` | ^9.39.1 | Le correcteur d'orthographe du code. Détecte les erreurs |
| `@eslint/js` | ^9.39.1 | Règles ESLint de base pour JavaScript |
| `@typescript-eslint/eslint-plugin` | ^8.54.0 | Règles ESLint spécifiques TypeScript |
| `@typescript-eslint/parser` | ^8.54.0 | Permet à ESLint de lire le TypeScript |
| `eslint-plugin-react-hooks` | ^7.0.1 | Vérifie l'utilisation correcte des hooks React |
| `eslint-plugin-react-refresh` | ^0.4.24 | Vérifie la compatibilité avec le Hot Module Replacement |
| `eslint-plugin-jsx-a11y` | ^6.10.2 | Vérifie l'accessibilité du JSX (alt manquant, rôles ARIA, etc.) |
| `eslint-plugin-simple-import-sort` | ^12.1.1 | Tri automatique des imports — ordre cohérent partout |
| `prettier` | ^3.5.0 | Formatage automatique du code. Zéro débat sur le style |
| `globals` | ^16.5.0 | Variables globales du navigateur pour ESLint |

### Types

| Package | Version | Pourquoi |
|---|---|---|
| `@types/react` | ^19.2.5 | Types TypeScript pour React |
| `@types/react-dom` | ^19.2.3 | Types TypeScript pour ReactDOM |

### Git Hooks & Commits

| Package | Version | Pourquoi |
|---|---|---|
| `husky` | ^9.1.7 | Git hooks automatiques : exécute du code avant chaque commit |
| `lint-staged` | ^16.2.7 | Lint uniquement les fichiers stagés (pas tout le projet) |
| `@commitlint/cli` | ^20.4.2 | Valide que chaque message de commit suit Conventional Commits |
| `@commitlint/config-conventional` | ^20.4.2 | Règles par défaut pour commitlint |

### Tests

| Package | Version | Pourquoi |
|---|---|---|
| `vitest` | ^4.0.18 | Framework de tests rapide, compatible Vite, remplace Jest |

### Releases

| Package | Version | Pourquoi |
|---|---|---|
| `release-it` | ^19.2.4 | Automatise : bump version + CHANGELOG + tag + GitHub Release |
| `@release-it/conventional-changelog` | ^10.0.5 | Génère le CHANGELOG depuis les commits conventionnels |

---

## Règles pour ajouter une dépendance

1. **Vérifier avant** : est-ce qu'on peut faire sans ? Une solution native existe ?
2. **Checker le package** : downloads/semaine, dernière mise à jour, issues ouvertes
3. **Expliquer à Mirco** : en 1 phrase, pourquoi on en a besoin
4. **Documenter ici** : ajouter la ligne dans le tableau
5. **Mentionner dans le commit** : le body du commit explique l'ajout

## Commandes de maintenance

```bash
# Voir les packages outdated
pnpm outdated

# Vérifier les vulnérabilités
pnpm audit

# Mettre à jour (mineures + patches)
pnpm update

# Pour les majeures → au cas par cas avec explication
```
