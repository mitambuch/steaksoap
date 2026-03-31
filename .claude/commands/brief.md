# /brief --- Design Direction

Capture l'intention creative du projet. A lancer APRES `pnpm setup`, AVANT `/init`.
N'ecrit QUE dans CLAUDE.md. Ne touche AUCUN fichier source.

## Protege --- NE PAS toucher
- Tout `src/`
- Tous les slash commands dans `.claude/commands/`
- Toutes les rules dans `.claude/rules/`
- Tous les agents dans `.claude/agents/`

## Interview (UNE question a la fois, attendre chaque reponse)

1. **Type de projet**
   "C'est quoi ce projet ?"
   (site vitrine, application, dashboard, landing page, portfolio, jeu, e-commerce, outil interne...)

2. **Univers**
   "C'est pour quel univers ?"
   (restaurant, fintech, galerie d'art, studio creatif, sport, tech, mode, sante, industrie, education...)

3. **References**
   "Montre-moi des exemples ou des references"
   Accepter tout : URLs, noms de marques, adjectifs, screenshots, descriptions de mood.
   Si l'utilisateur ne sait pas, proposer des directions basees sur le type + univers.

4. **Type d'interface**
   "Quel type d'interface ?"
   (editorial/magazine, bento grid, app-like avec sidebar, scroll storytelling, minimal une-colonne, brutalist, dense dashboard, immersif plein ecran...)

5. **Anti-patterns**
   "Qu'est-ce qu'on veut PAS ?"
   (hero centre generique, cards avec ombres portees, gradients decoratifs, illustrations cartoon, animations bounce, texte Lorem ipsum visible...)

## Appliquer --- ecrire dans CLAUDE.md

Inserer deux sections dans CLAUDE.md :
- APRES `## Protected Pages`
- AVANT `## Detailed Rules`

Si ces sections existent deja, LES REMPLACER (idempotent).

### Section 1 : `## Design Direction`

Format strict --- 6 lignes, pas plus :
```markdown
## Design Direction
Type: [reponse Q1]
Univers: [reponse Q2]
References: [reponse Q3, condensee en une ligne]
Interface: [reponse Q4]
Eviter: [reponse Q5]
Personnalite: [UNE phrase synthetique deduite des 5 reponses]
```

### Section 2 : `## Composition Rules`

Deduire 5-8 regles CONCRETES et SPECIFIQUES des reponses.
Chaque regle doit contenir des valeurs Tailwind ou des directions CSS precises.

Couvrir obligatoirement :
- **Grid** : systeme de colonnes, max-width, symetrique ou non
- **Rythme vertical** : padding entre sections, minimum
- **Titres** : tailles, alignement, style
- **Images** : traitement (bords, coins, cadrage)
- **Spacing** : philosophie (dense, aere, genereux)
- **Motion** : type de transitions, duree, easing
- **Interdit** : patterns explicitement bannis

Exemple (a adapter selon les reponses) :
```markdown
## Composition Rules
- Grid: 12 colonnes, max-w-7xl, asymetrique autorise
- Rythme vertical: sections py-24 md:py-32, jamais moins
- Titres: text-4xl md:text-6xl, alignes a gauche, jamais centres
- Images: plein bord ou conteneur strict, jamais de coins arrondis
- Spacing: genereux (gap-16+), aere, pas compact
- Motion: transitions 700ms ease-out, pas de bounce
- Interdit: centrer un hero, ombres portees, gradients decoratifs
```

### Ce que /brief ne fait PAS

- Ne modifie PAS les tokens CSS (c'est le role de `/init`)
- Ne duplique PAS les regles de `.claude/rules/styling.md` (usage Tailwind)
- Ne duplique PAS les regles de `.claude/rules/components.md` (structure composants)
- Ne choisit PAS de couleurs ou fonts (c'est le role de `/init`)

/brief = INTENTION. /init = EXECUTION.

## Resume

Afficher les deux sections ecrites et demander confirmation avant de modifier CLAUDE.md.
Si l'utilisateur valide, ecrire dans CLAUDE.md et confirmer.

```
Done! Design direction written to CLAUDE.md.

Next step: run /init to apply colors, fonts, and styling.
```
