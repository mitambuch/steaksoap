# Guide d'installation

Ce guide permet à un dev humain ou un agent IA de démarrer le projet en 5 minutes.

---

## Prérequis

| Outil | Version min. | Pourquoi |
|---|---|---|
| **Node.js** | 20+ | Runtime JavaScript |
| **pnpm** | 10+ | Package manager (déclaré dans `package.json` → `packageManager`) |
| **Git** | 2.40+ | Versioning |
| **GitHub CLI** (`gh`) | 2+ | Authentification pour les releases (`pnpm release`) |

### Installation rapide des prérequis

```bash
# Node.js — via nvm (recommandé)
nvm install 20
nvm use 20

# pnpm — via corepack (intégré à Node.js)
corepack enable
corepack prepare pnpm@10 --activate

# GitHub CLI — vérifier l'auth
gh auth status
# Si pas authentifié :
gh auth login
```

---

## Installation du projet

```bash
# 1. Cloner le repo
git clone https://github.com/Mircooo/starter.git
cd starter

# 2. Installer les dépendances
pnpm install
# → Installe aussi Husky automatiquement (script "prepare")

# 3. Configurer les variables d'environnement
# Linux/macOS :
cp .env.example .env.local
# Windows (PowerShell) :
# Copy-Item .env.example .env.local
# → Ouvrir .env.local et remplir les valeurs :
#   VITE_CLOUDINARY_CLOUD_NAME=ton_cloud_name
#   VITE_APP_NAME=Nom du projet
#   VITE_APP_URL=http://localhost:5173

# 4. Lancer le dev server
pnpm dev
# → http://localhost:5173
```

---

## Commandes disponibles

| Commande | Ce qu'elle fait |
|---|---|
| `pnpm dev` | Lance le serveur de développement (HMR) |
| `pnpm build` | Compile le site pour la production |
| `pnpm preview` | Prévisualise le build de production |
| `pnpm lint` | Vérifie les erreurs de code (ESLint) |
| `pnpm lint:fix` | Corrige automatiquement ce qui peut l'être |
| `pnpm format` | Formate tout le code avec Prettier |
| `pnpm typecheck` | Vérifie les types TypeScript |
| `pnpm test` | Lance les tests unitaires (Vitest) |
| `pnpm test:watch` | Lance les tests en mode watch |
| `pnpm validate` | Lint + typecheck + tests + build — **la commande de vérification finale** |
| `pnpm release` | Release interactive : bump + CHANGELOG + tag + GitHub Release |
| `pnpm release:patch` | Force un bump patch (0.1.0 → 0.1.1) |
| `pnpm release:minor` | Force un bump minor (0.1.0 → 0.2.0) |
| `pnpm release:major` | Force un bump major (0.1.0 → 1.0.0) |

---

## Extensions VS Code recommandées

A l'ouverture du projet, VS Code proposera d'installer les extensions recommandées
(voir `.vscode/extensions.json`). Accepter pour avoir :

- **ESLint** — Erreurs en temps réel
- **Prettier** — Format on save
- **Tailwind CSS IntelliSense** — Autocomplétion des classes
- **GitLens** — Historique git enrichi
- **Git Graph** — Visualisation de l'arbre de commits
- **Conventional Commits** — Assistant pour écrire les messages de commit
- **Error Lens** — Affiche les erreurs inline dans le code
- **Path Intellisense** — Autocomplétion des chemins de fichiers
- **DotENV** — Coloration des fichiers `.env`

---

## Vérification que tout marche

```bash
# Après installation, ces commandes doivent toutes passer :
pnpm validate          # → lint OK, types OK, tests OK, build OK
pnpm dev               # → serveur démarre sans erreur
```

---

## Adapter pour un nouveau client

```bash
# 1. Cloner ce repo comme base
git clone https://github.com/Mircooo/starter.git nom-du-client
cd nom-du-client

# 2. Supprimer l'historique git et repartir à zéro
# Linux/macOS :
rm -rf .git
# Windows (PowerShell) :
# Remove-Item -Recurse -Force .git
git init
git add -A
git commit -m "chore: initial scaffold from cdn template"

# 3. Configurer le nouveau remote
git remote add origin https://github.com/Mircooo/nom-du-client.git
git push -u origin main

# 4. Adapter :
#    - package.json → "name"
#    - .env.local → Cloudinary cloud name, nom de l'app, URL
#    - src/config/site.ts → contact, réseaux sociaux, SEO defaults
#    - src/styles/tokens.css → couleurs, fonts du client
#    - tailwind.config.js → si tokens changent
#    - public/robots.txt → URL du sitemap
#    - public/images/og-image.jpg → image de partage réseaux sociaux
```
