---
paths: ["**"]
---

# i18n + Sanity — Protocole contenu (always-loaded)

La gestion multilingue + CMS est historiquement la première source de frictions
en projet client. Cette règle concentre les **13 leçons HDVA** + le pattern
`etoiles-aux-atomes` pour qu'aucun projet ne les re-découvre.

Appliquée dès qu'on touche :
- un composant qui rend du texte affiché
- un fichier dans `src/locales/`
- un schéma Sanity (`studio/schemas/**`)
- une config Studio (`studio/sanity.config.ts`)
- un hook ou helper dans `src/lib/i18nField.ts` ou `src/lib/sanity.ts`

Décision maîtresse : `.claude/memory/decisions/2026-04-18-content-stack-integration.md`.

## 1. Taxonomie (ce qui va où)

Règle d'arbitrage stricte, non-négociable :

| Cas | Pattern Sanity | Studio UX |
|---|---|---|
| Contenu unique propre à une page (hero, intro, CTA contextuel) | `localeString/Text/RichText` **inline** dans `page` | Visible en tabs dans l'éditeur de la page |
| Liste d'entités structurées répétables (équipe, témoignages, produits, articles, projets) | Type de doc dédié (`person`, `testimonial`…) + `array of reference` dans `page` | **Menu dédié** dans le desk, avec picto |
| Élément partagé entre pages (bandeau, contact, SEO default, socials) | Champ inline dans `siteConfig` (singleton) | "Configuration globale" |

Exemple concret : une équipe affichée sur `/accueil` = **PAS** un array inline
dans `page-home`, mais un menu `👥 Équipe` avec liste de `person`, et
`page-home.featuredMembers: [ref→person]`. Le même membre édité une fois,
propagé partout. Zéro duplication.

## 2. Arbitrage i18n vs Sanity (déterministe)

Règles appliquées automatiquement par `/wire-content` :

**→ i18n static** (`src/locales/{fr,de,en}.json`) si :
- Label d'UI, bouton de nav global ("Retour", "Fermer", "Menu")
- Texte d'a11y (`aria-label`, `title`, `alt` générique)
- État système ("Chargement…", "Erreur", "Aucun résultat")
- Validation de form ("Ce champ est requis")
- Erreurs techniques

**→ Sanity** (`localeString/Text/RichText` dans un doc) si :
- Titre de page, titre de section
- Paragraphe éditorial
- CTA contextuel ("Découvrir le projet")
- Date/info spécifique au projet
- Texte que le client pourrait vouloir changer sans redéployer

**Ambigu** → défaut i18n, note dans la decision memory de la page.

## 3. Les 13 leçons HDVA (enforcement built-in)

Chaque leçon a un moyen d'enforcement automatique pour qu'un dev sous
context fatigue ne la redécouvre pas.

| # | Leçon | Enforcement |
|---|---|---|
| 1 | Jamais de string FR hardcodé dans un composant | `scripts/validate-i18n.ts` — fail `pnpm validate` |
| 2 | FR en `.warning()`, pas `.required()` sur les `locale*` | Built-in dans `studio/schemas/objects/locale*.ts` |
| 3 | `<html lang>` synchronisé avec la locale active | `LocaleProvider` set `document.documentElement.lang` |
| 4 | Fallback i18n JSON quand Sanity manque DE/EN | Helper `resolveFieldOrFallback` |
| 5 | Fallback défensif per-field si doc Sanity partiel | Hook `useSanityDoc` renvoie `{ data, loading, error }` |
| 6 | Attendre le chargement Sanity avant redirect 404 | Pattern `if (loading) return <Skeleton/>` AVANT tout `<Navigate>` |
| 7 | Sitemap doit lister toutes les locales × toutes les routes | `scripts/generate-sitemap.ts` itère `SUPPORTED_LOCALES` |
| 8 | `hreflang` alternates dans `<head>` | `SeoHead` émet `<link rel="alternate" hreflang="...">` |
| 9 | Aucun champ éditable non-locale dans un doc Sanity | `scripts/validate-sanity-schema.ts` |
| 10 | Singletons = actions filtrées (no create/delete/duplicate) | `sanity.config.ts` `document.actions` filter |
| 11 | Description humaine sur chaque field Sanity | `studio/scripts/validate-descriptions.ts` |
| 12 | StudioLayout avec CSS fixes anti-UX pénibles | Composant importé tel quel d'étoiles |
| 13 | Tout champ Sanity DOIT avoir les 3 locales remplies | `scripts/validate-sanity-content.ts` + CI gate |

## 4. Feature killer — contenu depuis Claude Code

On ne remplit **jamais** un champ Sanity à la main dans le Studio lors du
dev initial. Tous les contenus partent d'ici via :

- `/wire-content <page>` — détecte les strings, arbitre i18n/sanity, rédige FR,
  traduit DE/EN, push les 3 locales dans Sanity.
- `/translate <type> <id>` — remplit les DE/EN manquants d'un doc existant.
- `/sync-content` — audite tout Sanity, liste les trous, propose de les combler.

Technique :
- `@sanity/client` + `SANITY_WRITE_TOKEN` (jamais préfixé `VITE_`, donc jamais
  bundlé côté client — respecte `security.md`).
- Backup-before-push systématique dans `.sanity-backups/` (gitignored).
- Dataset par défaut = `staging` ; promotion explicite via `pnpm sanity:promote`.
- Validation contre le schéma avant push (échec si champ inconnu).

## 5. Zéro champ vide (règle #13 détaillée)

`pnpm validate` fail si un singleton canonique (`siteConfig`, `page-*`) a un
`localeString/Text/RichText` avec une locale manquante parmi fr/de/en.

Cette règle garantit qu'un site livré au client n'a pas de trous éditoriaux.
En prod, tout champ qui existe dans le schéma DOIT avoir du contenu.

## 6. Fallback chain (à respecter)

Quand on rend un `LocaleField` côté React :

```ts
resolveFieldOrFallback(sanityField, locale, t(`${key}.fallback`))
```

Ce qui résout :
1. `sanityField[locale]` — valeur Sanity pour la locale active
2. `sanityField.fr` — fallback FR Sanity
3. `t('<key>.fallback')` — clé i18n locale
4. En dev : `'(à remplir)'` — dernier recours visible

En prod, la chaîne réussit à l'étape 1 grâce à la règle #13.

## 7. Client profile

`.claude/client.md` (client-owned, protégé par `base-patch.js`) contient la voix
de marque du client courant. Lu par `/wire-content` avant chaque génération de
contenu — le texte sonne comme le client, pas comme du Lorem AI générique.

Si `client.md` est vide/placeholder, Claude demande à l'utilisateur de le
remplir avant de rédiger. Jamais poussé en prod, jamais exposé côté client.

## 8. Check before action

Avant toute intervention sur du contenu :

```bash
grep -rl "#i18n" .claude/memory/
grep -rl "#sanity" .claude/memory/
```

Lire les 3-5 entrées les plus récentes — éviter de re-décider ce qui l'a
déjà été.

## Pourquoi cette règle existe

HDVA a produit 30+ commits `fix(i18n)` / `fix(sanity)` post-hoc parce qu'aucune
règle ne codifiait ces leçons. Cette règle est le contrat qui les fige — chaque
leçon a un mécanisme d'enforcement automatique.

Cross-refs :
- Décision maîtresse : `.claude/memory/decisions/2026-04-18-content-stack-integration.md`
- Tag `#sanity` : `.claude/memory/decisions/2026-04-18-tag-sanity-addition.md`
- Client profile : `.claude/client.md`
- Extension registry : `registry/extensions.json` entrée `i18n`
