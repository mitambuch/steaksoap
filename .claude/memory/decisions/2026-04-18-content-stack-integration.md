---
id: content-stack-integration
date: 2026-04-18
type: decision
tags: [#i18n, #sanity, #content, #decision, #template, #milestone, #p0, #active, #baseline]
scope: template
status: active
---

# Décision maîtresse — intégration i18n + Sanity dans le starter

## Contexte

Le propriétaire livre régulièrement des sites clients qui nécessitent i18n
multi-locale + CMS éditable par le client. Le repo `hdva` (416 commits, 30+ fix
i18n/sanity) a servi de terrain d'apprentissage mais au prix de nombreuses
frictions post-hoc. Le repo `etoiles-aux-atomes` (152 commits, monorepo pnpm)
représente l'évolution propre du pattern.

Décision prise de **baker** cette stack dans le starter `steaksoap` pour que chaque
projet client démarre avec le socle éprouvé, et que le workflow de rédaction +
traduction soit **clinique** (jamais de champ vide, jamais de friction i18n).

## Décision

Intégration en 5 phases, chacune = 1 release traçable :

1. **v5.5.0 — Foundation** (Phase 1, en cours) : règle `i18n-sanity.md`, client
   i18next + 3 locales (fr/de/en), client Sanity nullable-safe, env vars, client
   profile `.claude/client.md`.
2. **v5.6.0 — Studio baseline** : monorepo pnpm workspace `{ ., studio }`, objets
   `locale*`, docs `siteConfig` + `page`, deskStructure, Dashboard + HelpGuide +
   StudioLayout, plugins (`language-filter`, `vision`).
3. **v5.7.0 — App wiring** : `LocaleProvider`, URL routing `/:locale/*`,
   `SeoHead` + `hreflang`, sitemap multi-locale, hook `useSanityDoc`.
4. **v5.8.0 — Slash commands + validation** : `/wire-content`, `/translate`,
   `/sync-content`, `validate-i18n.ts`, `validate-sanity-schema.ts`,
   `validate-sanity-content.ts`, staging dataset + `sanity:promote`, backup
   automatique avant push.
5. **v5.8.1 — Propagation + docs** : `base-patch.js` protection, preview URLs,
   screenshots automatiques, `pnpm handoff` package client.

## Principes non-négociables (issus des leçons HDVA)

1. **Taxonomie stricte** : inline dans `page` pour le contenu unique / menu dédié
   pour les listes répétables / `siteConfig` pour le partagé.
2. **Zéro champ vide** : les 3 locales de tout champ `locale*` d'un singleton
   canonique DOIVENT être remplies, enforced par `pnpm validate`.
3. **Contenu depuis Claude Code** : on n'ouvre pas le Studio pour remplir les
   champs à l'initialisation — `/wire-content` écrit FR + DE + EN et pousse.
4. **Fallback chain** : Sanity → i18n JSON → dernier recours dev only.
5. **FR en `.warning()`, jamais `.required()`** — le client doit pouvoir
   sauvegarder un draft incomplet.
6. **Staging dataset par défaut** — prod est promue explicitement.

## Alternatives considérées

- **Document-level i18n** (un doc par locale via `@sanity/document-internationalization`)
  : rejeté — lourd pour 3 locales, pattern étoiles + HDVA utilise field-level et
  marche bien.
- **Pas de préfixe locale dans l'URL** (pattern étoiles) : rejeté — SEO
  multilingue nécessite `/fr/`, `/de/`, `/en/` pour que `hreflang` fonctionne et
  que Google indexe proprement les 3 versions.
- **Sanity en dur dans tous les clients** : rejeté — un site statique simple ne
  doit pas embarquer un CMS. `hasSanity` guard + fallback fixtures rend Sanity
  opt-in.

## Références

- Session d'analyse : [`sessions/2026-04-18-<HHMM>.md`](../sessions/)
- Repos étudiés : `mitambuch/hdva` (frictions) + `mitambuch/etoiles-aux-atomes`
  (pattern propre) — clones conservés dans `C:/Users/mirco/Desktop/_research/`
- Règle fille : [`i18n-sanity.md`](../../rules/i18n-sanity.md)
- Tag ajouté : [`tag-sanity-addition`](2026-04-18-tag-sanity-addition.md)
