# /translate

Remplit les traductions DE/EN manquantes d'un document Sanity existant.
Ne touche pas aux valeurs déjà présentes, n'écrase rien — ne fait que
combler les trous.

## Arguments

`$ARGUMENTS` — sous forme `<type> <id>`. Exemples :

- `page page-home` → remplit DE/EN manquants sur la page Accueil
- `siteConfig siteConfig-singleton` → remplit sur la config globale
- `person person-alice` → si un type collection existe

## Pré-requis

1. `.claude/client.md` rempli (pour rester dans le ton de la marque).
2. `SANITY_WRITE_TOKEN` présent dans `.env.local`.
3. Le document cible doit exister (sinon erreur claire).

## Procédure

1. **Fetch** le document via `@sanity/client` :

   ```groq
   *[_id == "$ID"][0]
   ```

2. **Scan** récursivement chaque champ `localeString`, `localeText`,
   `localeRichText` (identifiés par la présence de `{fr, de?, en?}`).
   Pour chaque champ :
   - Si `fr` absent : **abort** et mobiliser le propriétaire (FR est
     source de vérité, ne pas le générer à partir de DE/EN).
   - Si `de` absent mais `fr` présent : **générer** la traduction
     allemande en respectant le ton de `client.md`.
   - Idem pour `en`.
   - Si les 3 sont présents : skip.

3. **Affiche le diff** : montre chaque champ à remplir + la traduction
   proposée. Attendre `ok` ou corrections ligne-par-ligne.

4. **Backup + push** via `pnpm sanity:push` (backup automatique dans
   `.sanity-backups/`).

5. **Validate** : `pnpm validate:sanity-content` doit être clean pour ce doc.

6. **Commit** : `chore(i18n)/translate-$TYPE-$ID` avec body WHY/WHAT/IMPACT/TEST.

## Ton de traduction

- Le ton de `client.md` prime sur la littéralité. Ex : si `client.md`
  dit "décontracté + tutoiement", la DE utilise `du`/`ihr`, pas `Sie`.
- Respecter le registre (formel/familier) et les tournures spécifiques
  à la marque ("expressions signature").
- Ne pas traduire les noms propres, marques, slogans si le brief
  l'indique.

## Flags

- `--dry-run` → affiche les traductions sans pousser ni commit
- `--only=de,en` → limite les locales cibles

## Validation

- [ ] Aucun champ `fr` généré (règle : FR = source de vérité)
- [ ] Toutes les traductions approuvées par le propriétaire
- [ ] Backup créé dans `.sanity-backups/`
- [ ] `pnpm validate:sanity-content` clean pour ce doc
- [ ] Commit atomique avec body
