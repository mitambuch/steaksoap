# /wire-content

Câble une page à ses sources de contenu (i18n + Sanity) et remplit
automatiquement les champs créés — **depuis Claude Code, pas depuis le
Studio**. C'est la commande qui matérialise la règle "zéro champ vide"
et le principe "contenu rédigé depuis ici, pas à la main dans Sanity".

## Arguments

`$ARGUMENTS` — nom de la page à câbler. Exemples : `Home`, `AboutPage`,
`ContactPage`. Accepte aussi un chemin relatif : `src/pages/Home.tsx`.

## Pré-requis

1. `.claude/client.md` rempli (sinon demander au propriétaire avant de
   générer du texte).
2. `SANITY_WRITE_TOKEN` dans `.env.local` (scope `Editor`, dataset
   `staging`). Si absent : **`--dry-run` forcé**, aucun push effectif,
   diff affiché + mobilisation humaine pour obtenir le token.
3. Memory check : `grep -rl "#i18n" .claude/memory/` + même pour
   `#sanity`. Lire les 3-5 entrées les plus récentes avant d'agir —
   éviter de re-décider ce qui l'a déjà été.

## Procédure (7 étapes)

### 1. Inventaire

Lire le fichier `src/pages/$ARGUMENTS.tsx` et extraire **chaque string
visible** : JSX text children, `aria-label`, `title`, `alt`,
`placeholder`, `button` text, etc. Ignorer les classes Tailwind, les
noms de routes, les clés d'objet.

### 2. Arbitrage i18n vs Sanity

Appliquer les règles déterministes de `.claude/rules/i18n-sanity.md` :

**→ i18n static** : label d'UI, bouton nav global, texte a11y, état
système (loading/empty/error), validations de form, erreurs techniques.

**→ Sanity** : titre de page, titre de section, paragraphe éditorial,
CTA contextuel, date/info spécifique, tout ce que le client pourrait
vouloir changer sans redéployer.

**Ambigu** → défaut i18n + note dans la decision memory.

### 3. Proposition de diff

Afficher un tableau au propriétaire :

```
| Ligne | String                      | → i18n / sanity       |
|-------|-----------------------------|-----------------------|
|   14  | "Retour"                    | 🌐 i18n common.back   |
|   22  | "Notre histoire"            | 📝 sanity page.heroHeading |
...
```

Attendre un GO explicite (`ok`, `go`) ou une correction (`ligne 14 →
sanity`). Ne rien écrire avant approval.

### 4. Préparation

Pour chaque string :
- **i18n** : ajouter les clés dans `src/locales/fr.json`, `de.json`,
  `en.json` (FR rédigé, DE/EN traduits par toi Claude en respectant le
  ton de `.claude/client.md`).
- **Sanity** : ajouter le champ dans `studio/schemas/documents/page.ts`
  (ou schéma approprié). Si le champ existe déjà, pas de modif du schéma.

### 5. Push Sanity (backup + createOrReplace)

Utiliser `studio/scripts/push.js` :

```bash
pnpm sanity:push --type page --id page-<slug> --data '<JSON payload>'
```

Le script fait un `createOrReplace` sur `dataset=staging` par défaut.
Backup automatique du doc avant le write dans `.sanity-backups/YYYY-MM-DD-HHmm-<id>.json`.

**Si `--dry-run`** : affiche le diff JSON, ne push pas.

### 6. Refactor la page

Remplacer les strings par `t('common.back')` / `resolveField(page.heroHeading,
locale)` — en respectant les hooks `useTranslation()` et `useSiteConfig()` /
`usePage(slug)`.

### 7. Commit + memory + validate

- 3 commits atomiques :
  - `chore(i18n)/wire-$ARGUMENTS` — ajout des clés i18n
  - `chore(sanity)/wire-$ARGUMENTS` — ajout des champs au schéma + seed
  - `refactor(pages)/wire-$ARGUMENTS` — migration des strings
- Écrire `.claude/memory/decisions/YYYY-MM-DD-content-wire-$ARGUMENTS.md`
  avec la table d'arbitrage finale.
- `pnpm validate` doit passer (inclut `validate-i18n`,
  `validate-sanity-schema`, `validate-sanity-content`).

## Garantie zéro champ vide (règle #13)

À la fin de l'exécution, lancer `pnpm validate:sanity-content`. Si une
locale manque sur un champ nouvellement créé, **ne pas commit** —
re-traduire et re-push avant de finaliser.

## Flags

- `--dry-run` → montre le diff proposé sans rien pusher ni écrire
- `--production` → pousse sur `dataset=production` (déconseillé, préfère
  `pnpm sanity:promote` après staging validé)

## Validation

- [ ] Tableau d'arbitrage approuvé par le propriétaire
- [ ] Aucune string FR hardcodée restante dans le fichier page
- [ ] Tous les nouveaux champs Sanity ont FR + DE + EN remplis
- [ ] `pnpm validate` green
- [ ] Decision memory écrite
- [ ] 3 commits (i18n, sanity, refactor) atomiques
