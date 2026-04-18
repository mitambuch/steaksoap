# /sync-content

Audit global du contenu Sanity : liste tous les singletons canoniques +
les documents de types collection, détecte les locales manquantes, et
propose de les combler un par un.

## Arguments

Aucun (commande globale).

## Pré-requis

1. `SANITY_PROJECT_ID` + `SANITY_WRITE_TOKEN` configurés.
2. `.claude/client.md` rempli (pour les traductions générées).

## Procédure

1. **Fetch l'inventaire** : GROQ query qui retourne tous les docs non-
   draft avec leurs métadonnées :

   ```groq
   {
     "singletons": *[_id in ["siteConfig-singleton", "page-*"]] {
       _id, _type, _updatedAt
     },
     "collections": *[!(_id in path("drafts.**")) && _type != "siteConfig"
                       && !(_id match "page-*")] {
       _id, _type, _updatedAt
     }
   }
   ```

2. **Audit par doc** : pour chaque document, scan récursif des champs
   `locale*` → liste les trous (locale vide ou absente).

3. **Rapport** : affiche un tableau synthétique

   ```
   Doc                        Champs avec trous
   siteConfig-singleton       2 (footerTagline.de, footerTagline.en)
   page-about                 1 (introHeading.de)
   person-marie               3 (bio.de, bio.en, title.en)
   ...
   TOTAL : 6 trous sur 8 docs
   ```

4. **Proposition interactive** : pour chaque trou, propose :
   - `[T]ranslate` → génère la traduction, la montre, push si approuvée
   - `[S]kip` → laisse tel quel (marqué dans la decision memory)
   - `[M]obilize` → écrit un bloc ACTION HUMAINE REQUISE

5. **Execution batch** : regrouper tous les `translate` en un seul push
   par doc (1 backup par doc, pas 1 par champ).

6. **Commit final** : `chore(i18n)/sync-content-YYYY-MM-DD` avec la
   liste des docs et champs modifiés.

## Mode rapide

- `/sync-content --auto` → génère + push toutes les traductions
  manquantes sans demander (réservé aux cas où tu es sûr du ton).
- `/sync-content --report-only` → rapport uniquement, aucune action.

## Écho mémoire

Écrire `.claude/memory/decisions/YYYY-MM-DD-sync-content.md` avec :
- Le nombre de trous trouvés
- Le nombre traduits / skippés / mobilisés
- Les fields skip (avec raison) pour référence future

## Validation

- [ ] Rapport produit et affiché
- [ ] Chaque décision (translate/skip/mobilize) tracée
- [ ] `pnpm validate:sanity-content` clean après exécution
- [ ] Backups présents pour chaque doc modifié
- [ ] Memory entry écrite
