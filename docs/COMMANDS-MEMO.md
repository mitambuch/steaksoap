# Commandes steaksoap — Memo

## Design & Creation

| Commande | Description |
|----------|-------------|
| `/design-explore` | Exploration creative PURE — carte blanche, branche isolee, pur design |
| `/design-convert` | Convertir l'exploration en code production avec nos tokens/composants |
| `/design` | Designer des pages/sections directement dans le design system |
| `/theme` | Modifier les design tokens (couleurs, typo, spacing) en langage naturel |
| `/new-page` | Creer une page avec route, SEO, et test |
| `/new-component` | Creer un composant UI avec props, cn(), et test |
| `/new-feature` | Creer un module feature complet (composant + hook + types + test) |
| `/new-hook` | Creer un custom hook React avec test |
| `/spec` | Transformer une idee vague en spec structuree AVANT de coder |

## Qualite & Tests

| Commande | Description |
|----------|-------------|
| `/review` | Code review des changements recents |
| `/test` | Lancer les tests et identifier les trous de couverture |
| `/fix` | Diagnostiquer et corriger un bug systematiquement |
| `/refactor` | Analyser le code et proposer un plan de cleanup |
| `/lighthouse` | Audit de performance, accessibilite, SEO |
| `/responsive-check` | Verifier le responsive a toutes les tailles d'ecran |

## Projet & Deploiement

| Commande | Description |
|----------|-------------|
| `/status` | Sante du projet + git status complet |
| `/deploy` | Build, valider, et deployer le projet |
| `/release` | Creer une release versionnee avec changelog |
| `/changelog-client` | Generer un resume des changements pour communiquer au client |

## Setup & Extensions

| Commande | Description |
|----------|-------------|
| `/init` | Personnaliser le template pour un nouveau projet client |
| `/discover` | Chercher des extensions et MCP servers dans le registry |
| `/install-extension` | Installer une extension du registry (ex: cms-sanity) |
| `/connect` | Installer un serveur MCP pour Claude Code |
| `/add-api` | Scaffolder un service API avec TanStack Query |
| `/migrate` | Transformer un projet existant vers notre systeme |
| `/update-deps` | Mettre a jour les dependances en securite |

## Terminal (pnpm)

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de dev (port 5173) |
| `pnpm build` | Build de production |
| `pnpm preview` | Preview du build de production |
| `pnpm validate` | Lint + typecheck + test + build (AVANT chaque PR) |
| `pnpm setup` | Wizard de setup interactif (nouveau projet) |
| `pnpm setup:update` | Tirer les mises a jour du template |
| `pnpm release` | Creer une release versionnee |
| `pnpm test` | Lancer les tests une fois |
| `pnpm test:watch` | Tests en mode watch |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier sur tout le projet |
| `pnpm doctor` | Check de sante du projet |

## Workflow type pour un nouveau client

```
1. git clone steaksoap mon-client
2. cd mon-client && pnpm install
3. /init                          → configure nom, URL, etc.
4. /install-extension cms-sanity  → ajoute Sanity CMS
5. /theme "couleurs bleu nordique, typo elegante"
6. /design-explore "hero epique pour garage premium"
   → iterer jusqu'a satisfaction
7. /design-convert "Home"         → convertir en production
8. /design "page services"        → directement dans le systeme
9. /design "section contact"      → directement dans le systeme
10. pnpm validate                 → tout passe
11. /deploy                       → en ligne sur Netlify
```
