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

# 2. Setup automatique (installe, crée .env.local, valide)
pnpm install && pnpm setup

# 3. Remplir .env.local avec les vraies valeurs

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
| `pnpm init:project` | **Nouveau projet** : script interactif qui configure tout |
| `pnpm setup` | Setup automatique : install + .env.local + validate |
| `pnpm setup:update` | Pull les mises à jour du starter template |
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

## Nouveau projet client

```bash
# 1. Cloner le starter
git clone https://github.com/Mircooo/starter.git nom-du-client
cd nom-du-client

# 2. Lancer le script interactif (tout est automatisé)
node scripts/init.js
```

Le script `init.js` fait tout automatiquement :
- Demande le nom du projet + nom d'affichage
- Renomme le remote `origin` → `template` (garde le lien pour les updates)
- Crée le repo GitHub privé + l'ajoute comme `origin` (via `gh`)
- Met à jour `package.json` avec le nom du projet
- Crée `.env.local` avec le nom d'affichage
- Installe les dépendances
- Valide (lint + typecheck + tests + build)
- Commit initial + push

Ensuite, adapter les fichiers du client :
- `.env.local` → Cloudinary cloud name, URL de prod
- `src/config/site.ts` → contact, réseaux sociaux, SEO defaults
- `src/index.css` → couleurs, fonts du client (bloc `@theme`)
- `public/robots.txt` → URL du sitemap
- `public/images/og-image.jpg` → image de partage réseaux sociaux

## Mettre à jour depuis le starter

Si le starter a été amélioré (nouvelle config, fix, upgrade), tu peux pull les changements :

```bash
pnpm setup:update
# → Fetch + merge les mises à jour du starter template
# → En cas de conflit, résous manuellement puis git commit
```

Cela fonctionne parce que le remote `template` pointe vers le repo starter.
Git merge intelligemment les changements du starter avec ton code client.
