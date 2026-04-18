---
id: content-stack-complete
date: 2026-04-18
type: decision
tags: [#i18n, #sanity, #content, #decision, #template, #milestone, #active, #baseline]
scope: template
status: active
supersedes:
---

# Content stack 5-phase plan — complete

Clôture de la décision maîtresse
`2026-04-18-content-stack-integration.md`. Les 5 phases ont toutes shippé
dans la soirée du 2026-04-18 en 5 releases consécutives :

| Phase | Release | Tag | Contenu |
|---|---|---|---|
| 1 Foundation | v5.5.0 | [`v5.5.0`](https://github.com/mitambuch/steaksoap/releases/tag/v5.5.0) | i18n scaffold, Sanity client nullable-safe, rule always-loaded, client profile |
| 2 Studio baseline | v5.6.0 | [`v5.6.0`](https://github.com/mitambuch/steaksoap/releases/tag/v5.6.0) | monorepo workspace, schemas, deskStructure, Dashboard + HelpGuide + StudioLayout |
| 3 App locale wiring | v5.7.0 | [`v5.7.0`](https://github.com/mitambuch/steaksoap/releases/tag/v5.7.0) | `/:locale/*` routing, LocaleProvider, SeoHead hreflang, useSanityDoc/useSiteConfig |
| 4 Clinical workflow | v5.8.0 | [`v5.8.0`](https://github.com/mitambuch/steaksoap/releases/tag/v5.8.0) | /wire-content, /translate, /sync-content, 3 validators, push + promote, backups |
| 5 Propagation polish | v5.8.1 | v5.8.1 | dynamic tagline, Studio preview URLs, protected-sync validator, `pnpm handoff` |

## Invariants qui sont maintenant enforced par la toolchain

1. **Pas de FR hardcodé** en JSX/aria — `pnpm validate:i18n`
2. **Pas de champ éditable non-locale** dans un document schema —
   `pnpm validate:sanity-schema`
3. **Zéro champ vide** sur les singletons canoniques en prod —
   `pnpm validate:sanity-content`
4. **PROTECTED mirror** entre base-patch.js et setup.js —
   `pnpm validate:protected-sync`
5. **Schema typecheck** à chaque validate — `pnpm studio:typecheck`
6. **Tout passe dans pnpm validate** — CI-ready, husky-blocking.

## Les 13 leçons HDVA sont toutes enforced

- #1 → validate-i18n.js
- #2 → schema locale* avec `.warning()` (pas `.required()`)
- #3 → LocaleProvider sync `document.documentElement.lang`
- #4 → resolveFieldOrFallback
- #5 → useSanityDoc avec `{ loading, error, retry }`
- #6 → hook expose `loading` avant toute navigation
- #7 → vite.config.ts sitemap `dynamicRoutes` multi-locale
- #8 → SeoHead hreflang + x-default
- #9 → validate-sanity-schema.js
- #10 → sanity.config.ts `document.actions` filter pour singletons
- #11 → field `description` systématique dans les schemas (convention)
- #12 → StudioLayout importé verbatim d'étoiles
- #13 → validate-sanity-content.js

## Référence pour les prochains clients

- `pnpm setup` — wizard interactif d'initialisation (extensions,
  identité, env)
- `.claude/client.md` — à remplir au premier run
- `/wire-content <page>` — le seul chemin sanctionné pour créer du
  contenu à l'init
- `/translate <type> <id>` — comble DE/EN manquants
- `/sync-content` — audit complet du dataset
- `pnpm sanity:push` / `pnpm sanity:promote` — writes + promote
- `pnpm handoff` — PDF/HTML de livraison client

Cross-refs :
- Règle always-loaded : [`i18n-sanity.md`](../../rules/i18n-sanity.md)
- Client profile : [`client.md`](../../client.md)
- Tag : [`tag-sanity-addition`](2026-04-18-tag-sanity-addition.md)
- Décision ouvrante : [`content-stack-integration`](2026-04-18-content-stack-integration.md)
