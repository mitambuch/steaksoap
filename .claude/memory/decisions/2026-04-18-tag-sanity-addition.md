---
id: tag-sanity-addition
date: 2026-04-18
type: decision
tags: [#memory, #decision, #template, #active]
scope: template
status: active
---

# Ajout du tag #sanity au vocabulaire canonique

Le protocole `memory-protocol.md` exige une decision entry pour toute addition au
vocabulaire de tags. Cette entrée justifie l'ajout.

## Problème

L'intégration Sanity CMS devient un pilier permanent du starter (voir
`2026-04-18-content-stack-integration`). Les entrées mémoire futures sur les
schémas, la config Studio, les patterns de fetch GROQ, les frictions d'édition,
les scripts de push doivent être taggables précisément. `#content` est trop large
(il couvre aussi le copywriting pur, qui n'a rien à voir avec Sanity).

## Décision

Ajouter **`#sanity`** au `TAGS.md` comme domain tag.

Utilisation prévue :

- Schémas (`documents/`, `objects/`, `singletons/`)
- Structure custom (`deskStructure.ts`)
- Configuration Studio (plugins, layout, actions)
- Helpers côté app (client, hooks, URL builders)
- GROQ queries partagées
- Scripts Studio (seed, migration, push content)
- Frictions spécifiques à Sanity

`#i18n` reste séparé : on peut faire de l'i18n sans Sanity (fixtures JSON pures).
Les deux tags cohabitent sur une entrée quand pertinent.

## Alternatives considérées

- **`#cms` générique** : rejeté — trop large, on ne changera pas de CMS dans ce
  starter (Sanity est la décision finale).
- **`#sanity` + `#sanity-studio`** : rejeté — granularité inutile, le Studio est
  une facette de Sanity.
- **Pas de tag dédié, réutiliser `#content`** : rejeté — dilue la recherche.

## Impact

- 1 ligne ajoutée à `TAGS.md`.
- Propagation via `pnpm base:update` aux repos clients.
- Les entrées futures sur Sanity seront taggables sans violer le protocole.
