/* ═══════════════════════════════════════════════════════════════
   SlideContents — all 16 slide components for the Réso.NE brief
   WHAT: Named exports for each slide (content placeholder)
   WHEN: Rendered inside <Slide> wrappers by the Home orchestrator
   CHANGE: Fill in actual content per slide here
   ═══════════════════════════════════════════════════════════════ */

import { Badge } from '@components/ui/Badge';
import { Card } from '@components/ui/Card';
import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

/* ─── Shared typographic primitives ─────────────────────────── */

const Label = ({ children }: { children: ReactNode }) => (
  <div className="text-muted mb-2 font-mono text-[11px] tracking-[0.1em] uppercase">{children}</div>
);

const H1 = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn('mb-3 leading-[1.1] font-medium tracking-tight', className)}
    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
  >
    {children}
  </div>
);

const P = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('max-w-2xl text-2xl leading-[1.7] text-(--sub)', className)}>{children}</div>
);

const Divider = () => <div className="bg-accent my-4 h-[3px] w-12 rounded-full" />;

/* ─── 0. Couverture ─────────────────────────────────────────── */

export const SlideCouverture = () => (
  <div className="relative flex h-full flex-col justify-between p-10">
    {/* Top — surtitre + sous-titre */}
    <div className="flex flex-col gap-1">
      <Label>Brief créatif — 2026</Label>
      <span className="text-lg tracking-tight text-(--sub)">
        Stratégie &amp; identité de marque
      </span>
    </div>

    {/* Middle — titre accroche, aligné à gauche, prend de la place */}
    <div className="max-w-3xl">
      <div
        className="text-fg leading-[1.05] font-medium tracking-tight"
        style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
      >
        Pour que le bon réflexe
        <br />
        ne soit plus les urgences
      </div>
    </div>

    {/* Bottom — identité + méta */}
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-1">
        <span
          className="text-accent leading-none font-bold tracking-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          Réso.ne
        </span>
        <span className="mt-1 text-base text-(--sub)">
          Réseau de soins ambulatoires de proximité — Canton de Neuchâtel
        </span>
      </div>
      <div className="text-muted flex flex-col items-end gap-0.5 text-sm">
        <span>3 mars 2026</span>
        <span className="italic">Document confidentiel</span>
      </div>
    </div>
  </div>
);

/* ─── 1. Notre approche ────────────────────────────────────── */

export const SlideApproche = () => (
  <div className="flex h-full flex-col justify-between p-10">
    {/* Top — titre */}
    <div>
      <H1>Notre approche</H1>
    </div>

    {/* Middle — deux colonnes : texte courant + citation */}
    <div className="grid grid-cols-[1fr_auto] items-end gap-20">
      <div className="flex flex-col gap-6">
        <P className="max-w-none">
          Ce projet n&apos;est pas un exercice de décoration. L&apos;identité de Réso.ne doit
          résoudre un problème concret&nbsp;:{' '}
          <strong className="text-accent">
            quand un patient neuchâtelois a besoin de soins, il doit penser à Réso.ne avant de
            penser aux urgences de l&apos;hôpital.
          </strong>
        </P>
        <P className="max-w-none">
          Chaque choix sera passé au crible d&apos;un test simple&nbsp;: une personne de 65 ans à La
          Chaux-de-Fonds qui a mal au dos un mardi matin comprend-elle en 3 secondes que c&apos;est
          un endroit où elle peut aller se faire soigner&nbsp;? Si la réponse est non, on
          recommence.
        </P>
      </div>

      {/* Citation — colonne droite */}
      <blockquote className="border-accent w-64 border-l-[3px] pl-6">
        <span
          className="text-fg leading-[1.3] font-medium tracking-tight"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
        >
          Un logo n&apos;est pas fait pour plaire.
          <br />
          Il est fait pour être compris en une seconde.
        </span>
      </blockquote>
    </div>

    {/* Bottom spacer */}
    <div />
  </div>
);

/* ─── 2. Principes de design (chapter) ─────────────────────── */

const PRINCIPES = [
  {
    keyword: 'Clarté',
    suffix: 'avant esthétique',
    text: 'Le logo doit être lisible à 2 cm sur une carte de visite comme à 2 mètres sur une façade. Pas de détails fins, pas d\u2019effets qui ne survivent pas au changement d\u2019échelle.',
  },
  {
    keyword: 'Déclinabilité',
    suffix: 'avant originalité',
    text: 'Un logo génial qui ne fonctionne qu\u2019en grand format ou en couleur est un mauvais logo. Chaque proposition est testée en monochrome, en petit, en négatif, et dans le système de déclinaison.',
  },
  {
    keyword: 'Cohérence',
    suffix: 'avant coup de cœur',
    text: 'L\u2019identité doit fonctionner comme un système, pas comme une pièce isolée. Le logo, la palette, la typo et le naming forment un tout.',
  },
  {
    keyword: 'Longévité',
    suffix: 'avant tendance',
    text: 'Les tendances passent, un réseau de santé reste. Les choix graphiques doivent tenir 10 ans minimum sans paraître datés.',
  },
] as const;

export const SlidePrincipes = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div className="flex items-baseline gap-4">
      <H1>Principes de design</H1>
      <Badge variant="default" size="sm">
        4 règles
      </Badge>
    </div>

    <P className="max-w-none">Quatre règles guident chaque décision créative dans ce projet.</P>

    <div className="grid grid-cols-2 gap-4">
      {PRINCIPES.map(p => (
        <Card key={p.keyword} padding="md" className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-accent text-lg font-bold">{p.keyword}</span>
            <span className="text-muted text-sm">{p.suffix}</span>
          </div>
          <p className="text-base leading-relaxed text-(--sub)">{p.text}</p>
        </Card>
      ))}
    </div>

    <div />
  </div>
);

/* ─── En un coup d'œil — données clés ─────────────────────── */

const CHIFFRES = [
  {
    value: '370\u2019805',
    text: 'Passages ambulatoires au RHNe en 2024. Record historique. L\u2019ambulatoire croît pendant que l\u2019hospitalisation baisse. Le virage est en cours, Réso.ne doit en devenir le visage.',
    source: 'RTN, 19.05.2025',
    url: 'https://www.rtn.ch/rtn/Actualite/Region/20250519-RHNe-un-deficit-deux-fois-plus-important-qu-imagine.html',
  },
  {
    value: '430',
    text: 'Patients hospitalisés en janvier 2025, contre 340-360 en temps normal. Urgences saturées, le canton demande publiquement aux gens de ne pas venir aux urgences pour les cas non vitaux. C\u2019est exactement le rôle de Réso.ne.',
    source: 'RTS, 08.01.2025',
    url: 'https://www.rts.ch/info/regions/neuchatel/2025/article/urgences-rhne-saturees-alternatives-pour-les-cas-non-vitaux-a-neuchatel-28748676.html',
  },
  {
    value: '29,5 M',
    text: 'Déficit du RHNe en 2024. Le double du budget prévu. Les lits bloqués par les patients en attente de placement EMS paralysent le système. L\u2019ambulatoire hors murs n\u2019est plus une option, c\u2019est une nécessité économique.',
    source: 'RTS, 20.05.2025',
    url: 'https://www.rts.ch/info/regions/neuchatel/2025/article/deficit-record-de-29-5-millions-pour-l-hopital-neuchatelois-rhne-en-2024-28888761.html',
  },
  {
    value: '2 / 4',
    text: 'Deux identités visuelles pour quatre centres. Le logo Volta (3 sites) et le logo Cadolles (1 site). Aucun ne dit \u201créseau\u201d. Aucun ne dit \u201cRéso.ne\u201d. Le patient ne sait pas que ces centres sont liés entre eux ni au RHNe.',
    source: 'Audit interne',
  },
] as const;

export const SlideChiffres = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div>
      <H1>En un coup d&apos;œil</H1>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {CHIFFRES.map(c => (
        <Card key={c.value} padding="md" className="flex flex-col gap-2">
          <span
            className="text-accent leading-none font-bold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {c.value}
          </span>
          <p className="flex-1 text-sm leading-relaxed text-(--sub)">{c.text}</p>
          {'url' in c && c.url ? (
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent text-[11px] hover:underline"
            >
              {c.source}
            </a>
          ) : (
            <span className="text-muted text-[11px]">{c.source}</span>
          )}
        </Card>
      ))}
    </div>

    <div />
  </div>
);

/* ─── 4. Ce qu'est Réso.ne ──────────────────────────────────── */

const ACTIVITES = [
  {
    num: '01',
    title: 'Permanences médicales',
    text: 'Médecine de cabinet sans rendez-vous, petite traumatologie, adultes. La Chaux-de-Fonds et Neuchâtel.',
  },
  {
    num: '02',
    title: 'Médecine de premier recours',
    text: 'Généraliste, pédiatrie, gynécologie. La première entrée dans le parcours de soins.',
  },
  {
    num: '03',
    title: 'Spécialistes en soutien',
    text: 'Neurologie et autres spécialités qui viennent consulter dans les centres en appui à la médecine de premier recours.',
  },
] as const;

export const SlideResoNe = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div>
      <H1>Ce qu&apos;est Réso.ne</H1>
      <P className="mt-2 max-w-none">
        Réso.ne est une SARL née du rachat du Groupe Santé Volta par le RHNe fin 2025. Quatre
        centres, trois types d&apos;activités, un réseau.
      </P>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {ACTIVITES.map(a => (
        <Card key={a.num} padding="lg" className="flex flex-col gap-3">
          <span className="text-accent font-mono text-2xl font-bold">{a.num}</span>
          <span className="text-fg text-lg font-medium">{a.title}</span>
          <p className="text-base leading-relaxed text-(--sub)">{a.text}</p>
        </Card>
      ))}
    </div>

    <div />
  </div>
);

/* ─── 5. La mission ─────────────────────────────────────────── */

const PARCOURS = [
  'Le RHNe sort de ses murs',
  'Les médecins hospitaliers consultent dans les centres Réso.ne',
  'Le patient qui a besoin de l\u2019hôpital est orienté vers le RHNe',
  'Continuum de soins',
] as const;

export const SlideMission = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div>
      <H1>La mission</H1>
    </div>

    {/* Two columns: parcours left + citation right */}
    <div className="grid grid-cols-[1fr_auto] items-end gap-16">
      <div className="flex flex-col items-start gap-2">
        {PARCOURS.map((step, i) => (
          <div key={step} className="flex flex-col items-start gap-2">
            <Card padding="md" className="w-full">
              <p className="text-fg text-base leading-relaxed font-medium">{step}</p>
            </Card>
            {i < PARCOURS.length - 1 && (
              <span className="text-accent pl-4 text-xl font-bold">&darr;</span>
            )}
          </div>
        ))}
      </div>

      <blockquote className="border-accent w-72 border-l-[3px] pl-6">
        <span
          className="text-fg leading-[1.15] font-medium tracking-tight"
          style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}
        >
          Développer la médecine de proximité dans le canton de Neuchâtel
        </span>
      </blockquote>
    </div>

    <p className="text-muted text-sm">
      Ce projet s&apos;inscrit dans le programme du Conseil d&apos;État et dans le plan de
      développement 2026-2030 du RHNe.
    </p>
  </div>
);

/* ─── 6. Le positionnement ──────────────────────────────────── */

const POSITIONS = [
  {
    keyword: 'Juridiquement séparé',
    text: 'Réso.ne est une SARL indépendante, pas une entité étatique.',
  },
  {
    keyword: 'Administrativement indépendant',
    text: 'Gestion propre, décisions propres, identité propre.',
  },
  {
    keyword: 'Fonctionnellement complémentaire',
    text: 'Les médecins du RHNe consultent dans les centres Réso.ne. Le patient circule entre les deux sans rupture.',
  },
] as const;

export const SlidePositionnement = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div>
      <H1>Le positionnement</H1>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {POSITIONS.map(p => (
        <Card key={p.keyword} padding="lg" className="flex flex-col gap-3">
          <span className="text-accent text-xl font-bold">{p.keyword}</span>
          <p className="text-base leading-relaxed text-(--sub)">{p.text}</p>
        </Card>
      ))}
    </div>

    <P className="text-muted max-w-none text-base italic">
      L&apos;identité doit pouvoir s&apos;apparenter au RHNe tout en étant clairement séparée. Pas
      de confusion avec le logo RHNe, pas de ressemblance avec l&apos;ancien Volta. Un nouveau
      départ.
    </P>
  </div>
);

/* ─── 7. Introduction — Analyse (chapter) ─────────────────── */

export const SlideAnalyse = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div>
      <H1>Introduction</H1>
    </div>

    <div className="flex flex-col gap-6">
      <P className="max-w-none">
        Avant de dessiner quoi que ce soit, on a analysé le paysage dans lequel Réso.ne va évoluer.
        Qui sont les acteurs de la santé ambulatoire en Suisse romande, comment ils se présentent,
        ce qui fonctionne et ce qui ne fonctionne pas.
      </P>
      <P className="max-w-none">
        Cette analyse couvre quatre références&nbsp;: Medbase, le plus grand réseau ambulatoire de
        Suisse et la référence en matière de système de naming unifié. L&apos;Ensemble Hospitalier
        de la Côte (EHC), qui gère plus de 30 établissements sous une identité distinctive et
        chaleureuse. Vidymed à Lausanne, le benchmark en expérience digitale patient. Et Unisanté,
        l&apos;ancien bras ambulatoire du CHUV devenu autonome en 2019&nbsp;— le précédent
        structurel le plus directement comparable à ce que Réso.ne doit devenir.
      </P>
    </div>

    <span
      className="text-accent leading-[1.2] font-medium tracking-tight"
      style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}
    >
      Rien dans ce document n&apos;est arbitraire. Chaque décision est alimentée par cette
      recherche.
    </span>
  </div>
);

/* ─── Benchmark — grille 2×2 ──────────────────────────────── */

const BENCHMARKS = [
  {
    name: 'Medbase',
    stats: '150+ sites · Propriété de Migros · 4\u2019400 employés',
    text: 'Le plus grand réseau ambulatoire de Suisse. Centres médicaux, pharmacies, dentistes, physiothérapie, médecine du sport. Un seul système de naming partout\u00a0: \u201cMedbase + Ville\u201d. Ce n\u2019est pas un concurrent direct de Réso.ne\u00a0— ni la même échelle, ni le même modèle économique\u00a0— mais c\u2019est la référence en matière de naming ambulatoire unifié en Suisse.',
    url: 'https://www.medbase.ch',
  },
  {
    name: 'EHC · Ensemble Hospitalier de la Côte',
    stats: '30+ établissements · 2\u2019050 employés · District de la Côte (VD)',
    text: 'Hôpital de soins aigus, centres de réadaptation, 25+ centres médicaux, 3 permanences, 3 EMS. Palette corail qui rompt avec le bleu hospitalier. Tout est sous la même identité visuelle. La preuve qu\u2019on peut être un réseau de santé public et avoir une identité chaleureuse et distinctive.',
    url: 'https://www.ehc-vd.ch',
  },
  {
    name: 'Vidymed',
    stats: '3 centres + 4 urgences · Lausanne',
    text: 'Le benchmark digital. Site mobile-first, sélecteur de centre intelligent, annuaire de 40+ spécialités. Design minimaliste et confiant. Le modèle à suivre pour l\u2019expérience patient en ligne\u00a0: clair, rapide, sans friction. L\u2019échelle est comparable à Réso.ne.',
    url: 'https://www.vidymed.ch',
  },
  {
    name: 'Unisanté',
    stats: '~1\u2019000 employés · Lausanne · Autonome depuis 2019',
    text: 'L\u2019ancien bras ambulatoire du CHUV devenu un établissement autonome de droit public. Identité visuelle totalement indépendante du CHUV. Siège au Biopôle depuis octobre 2025. C\u2019est le modèle abouti de ce que Réso.ne peut devenir\u00a0: une entité ambulatoire qui existe par elle-même, sans être confondue avec l\u2019hôpital parent.',
    url: 'https://www.unisante.ch',
  },
] as const;

export const SlideBenchmark = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div>
      <H1>Benchmark</H1>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {BENCHMARKS.map(b => (
        <Card key={b.name} padding="md" className="flex flex-col gap-3">
          <span className="text-fg text-lg font-bold">{b.name}</span>
          <span className="text-accent font-mono text-xs">{b.stats}</span>
          <p className="flex-1 text-sm leading-relaxed text-(--sub)">{b.text}</p>
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm font-medium hover:underline"
          >
            Voir le site &rarr;
          </a>
        </Card>
      ))}
    </div>

    <div />
  </div>
);

/* ─── Le parcours patient — flowchart pleine page ────────── */

export const SlideParcours = () => (
  <div className="flex h-full flex-col p-8">
    <p className="text-xl text-(--sub)">
      Quand un patient a un problème de santé, où va-t-il&nbsp;?
    </p>

    <div className="mt-4 grid flex-1 grid-cols-[2.5rem_1fr] content-evenly items-center gap-x-3">
      {/* Row 1 — Start */}
      <div />
      <div className="border-fg/20 bg-surface/80 text-fg rounded-md border-2 px-5 py-3 text-base font-bold">
        J&apos;ai un problème de santé
      </div>

      {/* Row 2 — ↓ Decision 1: urgence */}
      <span className="text-accent text-center text-2xl leading-none">&darr;</span>
      <div className="flex items-center gap-3">
        <div className="border-border text-fg rounded-md border border-dashed px-4 py-2 text-base">
          Est-ce une urgence vitale&nbsp;?
        </div>
        <span className="text-accent shrink-0 text-sm font-bold">OUI &rarr;</span>
        <div className="border-danger/30 bg-danger/10 rounded-md border px-4 py-2 text-sm">
          144 &rarr; <strong className="text-danger">RHNe Urgences</strong>{' '}
          <span className="text-muted">(24h/24)</span>
        </div>
      </div>

      {/* Row 3 — ↓ NON → Decision 2: médecin traitant */}
      <div className="flex flex-col items-center">
        <span className="text-accent text-2xl leading-none">&darr;</span>
        <span className="text-muted text-xs">NON</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="border-border text-fg rounded-md border border-dashed px-4 py-2 text-base">
          Ai-je un médecin traitant&nbsp;?
        </div>
        <span className="text-accent shrink-0 text-sm font-bold">OUI &rarr;</span>
        <div className="border-border text-fg rounded-md border px-4 py-2 text-sm">
          Médecin traitant
        </div>
      </div>

      {/* Row 4 — ↓ NON → Réso.ne Permanence */}
      <div className="flex flex-col items-center">
        <span className="text-accent text-2xl leading-none">&darr;</span>
        <span className="text-muted text-xs">NON</span>
      </div>
      <div className="border-accent/40 bg-accent/10 rounded-md border px-5 py-3">
        <div className="text-accent text-base font-bold">Réso.ne &mdash; Permanence médicale</div>
        <div className="text-sm text-(--sub)">
          Sans rendez-vous &middot; adultes &middot; petite traumatologie
        </div>
      </div>

      {/* Row 5 — ↓ Decision 3: suivi */}
      <span className="text-accent text-center text-2xl leading-none">&darr;</span>
      <div className="flex items-center gap-3">
        <div className="border-border text-fg rounded-md border border-dashed px-4 py-2 text-base">
          Besoin d&apos;un suivi régulier&nbsp;?
        </div>
        <span className="text-accent shrink-0 text-sm font-bold">OUI &rarr;</span>
        <div className="border-accent/40 bg-accent/10 rounded-md border px-4 py-2 text-sm">
          <strong className="text-accent">Réso.ne</strong> &mdash; 1er recours
        </div>
        <span className="text-muted text-sm">&rarr;</span>
        <div className="border-accent/40 bg-accent/10 rounded-md border px-4 py-2 text-sm">
          <strong className="text-accent">Réso.ne</strong> &mdash; Spécialistes
        </div>
      </div>

      {/* Row 6 — ↓ Decision 4: hospitalisation */}
      <span className="text-accent text-center text-2xl leading-none">&darr;</span>
      <div className="flex items-center gap-3">
        <div className="border-border text-fg rounded-md border border-dashed px-4 py-2 text-base">
          Besoin d&apos;hospitalisation&nbsp;?
        </div>
        <span className="text-accent shrink-0 text-sm font-bold">OUI &rarr;</span>
        <div className="border-info/30 bg-info/10 rounded-md border px-4 py-2 text-sm">
          <strong className="text-info">RHNe</strong> &mdash; Continuité du dossier
        </div>
      </div>

      {/* Row 7 — ↓ NON → End */}
      <div className="flex flex-col items-center">
        <span className="text-accent text-2xl leading-none">&darr;</span>
        <span className="text-muted text-xs">NON</span>
      </div>
      <div className="border-accent/40 bg-accent/10 text-fg rounded-md border px-5 py-3 text-base">
        Le patient reste dans le réseau <strong className="text-accent">Réso.ne</strong>
      </div>
    </div>

    <p className="text-muted mt-4 text-base italic">
      Réso.ne est la porte d&apos;entrée. Le RHNe est le filet de sécurité. Le patient circule entre
      les deux sans rupture.
    </p>
  </div>
);

/* ─── 10. Aujourd'hui ────────────────────────────────────── */

const CENTRES = [
  {
    name: 'Groupe Santé Volta',
    lieu: 'La Chaux-de-Fonds',
    detail: 'Permanence + consultations gynécologie',
    note: 'Bâtiment Volta (PPE, autres médecins présents non liés à Réso.ne)',
  },
  {
    name: 'Groupe Santé Volta',
    lieu: 'Fleurier',
    detail: 'Consultations gynécologie',
  },
  {
    name: 'Groupe Santé Volta',
    lieu: 'Val-de-Ruz',
    detail: 'Consultations uniquement',
  },
  {
    name: 'Centre médical des Cadolles',
    lieu: 'Neuchâtel',
    detail: 'Permanence + premier recours + pédiatrie',
    note: 'Logo différent de Volta',
  },
] as const;

/* Offsets to scatter blocks deliberately — no alignment, no system */
const SCATTER = [
  'col-start-1 row-start-1 rotate-[-1deg]',
  'col-start-2 row-start-1 translate-y-8 rotate-[0.5deg]',
  'col-start-1 row-start-2 -translate-y-2 translate-x-4 rotate-[1deg]',
  'col-start-2 row-start-2 translate-y-6 -translate-x-2 rotate-[-0.8deg]',
] as const;

export const SlideAujourdhui = () => (
  <div className="flex h-full flex-col justify-between p-10">
    <div>
      <H1>Aujourd&apos;hui</H1>
    </div>

    {/* Scattered blocks — deliberately unaligned */}
    <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-6 py-4">
      {CENTRES.map((c, i) => (
        <div
          key={c.lieu}
          className={cn(
            'border-border bg-surface/60 flex flex-col gap-2 rounded-lg border p-5',
            SCATTER[i],
          )}
        >
          <span className="text-fg text-lg font-bold">{c.name}</span>
          <span className="text-accent font-mono text-sm font-medium">{c.lieu}</span>
          <p className="text-sm leading-relaxed text-(--sub)">{c.detail}</p>
          {'note' in c && c.note && <p className="text-muted mt-1 text-xs italic">{c.note}</p>}
        </div>
      ))}
    </div>

    <p className="text-muted text-base italic">
      Quatre centres. Deux identités. Aucun lien visible entre eux, ni avec le RHNe. Le patient ne
      sait pas qu&apos;il est dans un réseau.
    </p>
  </div>
);

/* ─── 12. Demain ─────────────────────────────────────────── */

const CENTRES_DEMAIN = [
  'Centre 1 — Neuchâtel',
  'Centre 2 — La Chaux-de-Fonds',
  'Centre 3 — Fleurier',
  'Centre 4 — Val-de-Ruz',
] as const;

export const SlideDemain = () => (
  <div className="flex h-full flex-col p-8">
    <H1>Demain</H1>

    {/* Structured hierarchy — fills entire remaining space */}
    <div className="flex flex-1 flex-col items-center justify-evenly">
      {/* RHNe — endorsement discret */}
      <div className="flex flex-col items-center gap-1">
        <div className="border-border rounded-lg border border-dashed px-8 py-4 text-center">
          <span className="text-muted text-lg font-medium">RHNe</span>
        </div>
        <p className="text-muted text-center text-xs italic">
          Endorsement discret — une mention, pas un logo, pas de co-signature
        </p>
      </div>

      {/* Dotted connector */}
      <div className="border-border/60 flex-1 border-l border-dashed" />

      {/* Réso.ne — bloc principal dominant */}
      <div className="border-accent/40 bg-accent/10 w-full max-w-lg rounded-xl border-2 px-12 py-8 text-center">
        <span
          className="text-accent font-bold tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          Réso.ne
        </span>
        <p className="mt-2 text-lg text-(--sub)">Marque réseau</p>
      </div>

      {/* Connector to centres */}
      <div className="border-accent/30 flex-1 border-l-2" />

      {/* Horizontal bar — full width */}
      <div className="bg-accent/30 h-0.5 w-full" />

      {/* 4 vertical connectors */}
      <div className="grid w-full grid-cols-4">
        {CENTRES_DEMAIN.map(c => (
          <div key={c} className="flex flex-col items-center">
            <div className="border-accent/30 h-6 border-l-2" />
          </div>
        ))}
      </div>

      {/* 4 centres — aligned, identical */}
      <div className="grid w-full grid-cols-4 gap-4">
        {CENTRES_DEMAIN.map(c => (
          <div
            key={c}
            className="border-accent/30 bg-accent/5 rounded-lg border px-4 py-5 text-center"
          >
            <span className="text-fg text-base font-medium">{c}</span>
          </div>
        ))}
      </div>

      {/* Spacer before future connector */}
      <div className="flex-1" />

      {/* Connector to future */}
      <div className="bg-accent/30 h-0.5 w-full" />
      <div className="border-accent/30 h-6 border-l-2" />

      {/* Futurs sites — dashed, full width */}
      <div className="border-border w-full rounded-lg border border-dashed px-6 py-4 text-center">
        <span className="text-muted text-base italic">Futurs sites</span>
      </div>
    </div>
  </div>
);

/* ─── 13. Contexte stratégique ──────────────────────────────── */

export const SlideContexte = () => (
  <div className="flex h-full flex-col items-start justify-center p-8">
    <H1>Contexte stratégique</H1>
    <Divider />
    <P>Contenu à venir.</P>
  </div>
);

/* ─── 9. Le triple défi ────────────────────────────────────── */

export const SlideDefi = () => (
  <div className="flex h-full flex-col items-start justify-center p-8">
    <H1>Le triple défi</H1>
    <Divider />
    <P>Contenu à venir.</P>
  </div>
);

/* ─── 15. Nomenclature — Trois niveaux de lecture ─────────── */

const NIVEAUX = [
  {
    display: 'Réso.ne',
    displayStyle: 'text-accent font-bold tracking-tight',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    tag: 'Niveau 1',
    label: 'La marque réseau',
    text: 'Identifie le réseau. Présent partout. C\u2019est le lien entre tous les centres.',
  },
  {
    display: 'Centre médical de [lieu]',
    displayStyle: 'text-fg font-medium tracking-tight',
    fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
    tag: 'Niveau 2',
    label: 'Le nom d\u2019usage',
    text: 'Ce que le patient dit, ce qu\u2019il cherche sur Google, ce qu\u2019il lit en arrivant. C\u2019est le nom du quotidien.',
  },
  {
    display: 'Réso.ne — Centre médical de [lieu]',
    displayStyle: 'text-fg font-medium tracking-tight',
    fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)',
    tag: 'Niveau 3',
    label: 'Le nom complet',
    text: 'La version officielle. Documents, signalétique complète, site web, correspondance.',
  },
] as const;

export const SlideNomenclature = () => (
  <div className="flex h-full flex-col p-10">
    <H1>Trois niveaux de lecture</H1>

    <div className="flex flex-1 flex-col justify-evenly">
      {NIVEAUX.map((n, i) => (
        <div key={n.tag} className="grid grid-cols-[1fr_1fr] items-center gap-12">
          {/* Left — display name */}
          <div
            className={cn(
              'border-border rounded-lg border px-8 py-6',
              i === 0 && 'border-accent/30 bg-accent/5',
            )}
          >
            <span className={n.displayStyle} style={{ fontSize: n.fontSize }}>
              {n.display}
            </span>
          </div>

          {/* Right — explanation */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-3">
              <Badge variant="default" size="sm">
                {n.tag}
              </Badge>
              <span className="text-fg text-lg font-medium">{n.label}</span>
            </div>
            <p className="text-base leading-relaxed text-(--sub)">{n.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── 16. Variante A — Nom de ville ──────────────────────── */

const VARIANTE_A = [
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'de Neuchâtel' },
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'de La Chaux-de-Fonds' },
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'de Fleurier' },
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'du Val-de-Ruz' },
] as const;

export const SlideVarianteA = () => (
  <div className="flex h-full flex-col p-10">
    <div className="flex items-baseline gap-4">
      <H1>Variante A — Nom de ville</H1>
      <Badge variant="success" size="sm">
        Recommandée
      </Badge>
    </div>

    <div className="mt-2 flex flex-1 flex-col justify-evenly">
      {VARIANTE_A.map((c, i) => (
        <div key={c.lieu} className="flex flex-col gap-1">
          <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
            Centre {i + 1}
          </span>
          <div className="flex items-center gap-2">
            <div className="border-accent/30 bg-accent/5 rounded-md border px-4 py-3">
              <span className="text-accent text-lg font-bold">{c.marque}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.descripteur}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.lieu}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4 flex flex-col gap-3">
      <p className="text-base leading-relaxed text-(--sub)">
        Le patient cherche un médecin près de chez lui. Il cherche par ville, pas par quartier.
        &laquo;&nbsp;Centre médical de Neuchâtel&nbsp;&raquo; est immédiatement compris par tout le
        monde&nbsp;— un enfant de 10&nbsp;ans, une personne de 80&nbsp;ans, un nouveau résident du
        canton.
      </p>
      <p className="text-base leading-relaxed text-(--sub)">
        C&apos;est le modèle qui fonctionne à grande échelle&nbsp;: Medbase Lausanne, Medbase
        Fribourg. Le principe &laquo;&nbsp;marque + ville&nbsp;&raquo; a fait ses preuves. Le nom de
        quartier (Cadolles, Volta) disparaît de la marque mais reste dans l&apos;adresse physique.
      </p>
    </div>
  </div>
);

/* ─── 17. Variante B — Descripteur par activité ────────────── */

const VARIANTE_B = [
  { marque: 'Réso.ne', descripteur: 'Centre médical & permanence', lieu: 'de Neuchâtel' },
  { marque: 'Réso.ne', descripteur: 'Centre médical & permanence', lieu: 'de La Chaux-de-Fonds' },
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'de Fleurier' },
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'du Val-de-Ruz' },
] as const;

export const SlideVarianteB = () => (
  <div className="flex h-full flex-col p-10">
    <H1>Variante B — Descripteur par activité</H1>

    <div className="mt-2 flex flex-1 flex-col justify-evenly">
      {VARIANTE_B.map((c, i) => (
        <div key={c.lieu} className="flex flex-col gap-1">
          <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
            Centre {i + 1}
          </span>
          <div className="flex items-center gap-2">
            <div className="border-accent/30 bg-accent/5 rounded-md border px-4 py-3">
              <span className="text-accent text-lg font-bold">{c.marque}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.descripteur}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.lieu}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4">
      <p className="text-base leading-relaxed text-(--sub)">
        Le patient sait d&apos;emblée s&apos;il peut venir sans rendez-vous ou pas. C&apos;est
        utile, surtout un samedi matin. Mais le système n&apos;est pas uniforme&nbsp;: deux noms
        longs, deux courts. Si demain Fleurier ouvre une permanence, il faut renommer. Le nom est
        lié à l&apos;offre du moment plutôt qu&apos;à l&apos;identité du lieu&nbsp;— et sur une
        façade, &laquo;&nbsp;Centre médical &amp; permanence de La Chaux-de-Fonds&nbsp;&raquo; pose
        un problème de signalétique.
      </p>
    </div>
  </div>
);

/* ─── 18. Variante C — Nom local + ville ──────────────────── */

const VARIANTE_C = [
  { marque: 'Réso.ne', descripteur: 'Centre médical des Cadolles', lieu: 'de Neuchâtel' },
  { marque: 'Réso.ne', descripteur: 'Centre médical Volta', lieu: 'de La Chaux-de-Fonds' },
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'de Fleurier' },
  { marque: 'Réso.ne', descripteur: 'Centre médical', lieu: 'du Val-de-Ruz' },
] as const;

export const SlideVarianteC = () => (
  <div className="flex h-full flex-col p-10">
    <H1>Variante C — Nom local + ville</H1>

    <div className="mt-2 flex flex-1 flex-col justify-evenly">
      {VARIANTE_C.map((c, i) => (
        <div key={c.lieu} className="flex flex-col gap-1">
          <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
            Centre {i + 1}
          </span>
          <div className="flex items-center gap-2">
            <div className="border-accent/30 bg-accent/5 rounded-md border px-4 py-3">
              <span className="text-accent text-lg font-bold">{c.marque}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.descripteur}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.lieu}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4">
      <p className="text-base leading-relaxed text-(--sub)">
        Les résidents de longue date connaissent &laquo;&nbsp;Volta&nbsp;&raquo; et &laquo;&nbsp;les
        Cadolles&nbsp;&raquo;&nbsp;— ils continueront à dire ces noms quoi qu&apos;on décide. Le
        naming officiel n&apos;est pas pour eux. Il est pour le nouveau résident qui cherche
        &laquo;&nbsp;médecin Neuchâtel&nbsp;&raquo; sur Google et qui a besoin de comprendre en
        3&nbsp;secondes. &laquo;&nbsp;Les Cadolles&nbsp;&raquo; ne lui dit rien. Et on garde
        &laquo;&nbsp;Volta&nbsp;&raquo; dans la marque alors que le brief demande un nouveau départ.
      </p>
    </div>
  </div>
);

/* ─── 19. Volta ────────────────────────────────────────────── */

export const SlideVolta = () => (
  <div className="flex h-full flex-col justify-between p-10">
    {/* Top — titre */}
    <div>
      <H1>Volta</H1>
    </div>

    {/* Middle — deux colonnes : texte courant + citation */}
    <div className="grid grid-cols-[1fr_auto] items-end gap-20">
      <div className="flex flex-col gap-6">
        <P className="max-w-none">
          <strong className="text-accent">Volta est un bâtiment, pas une marque.</strong> La marque,
          c&apos;est Réso.ne. L&apos;ancien Groupe Santé Volta a été racheté par le RHNe. La marque
          Volta n&apos;existe plus&nbsp;— elle est remplacée par Réso.ne. Ce qui reste, c&apos;est
          le bâtiment&nbsp;: l&apos;adresse rue Volta, la signalétique de l&apos;immeuble, le repère
          physique que les habitants connaissent.
        </P>
        <P className="max-w-none">
          Concrètement, le bâtiment est une PPE. D&apos;autres médecins y exercent sans faire partie
          de Réso.ne. Si le centre porte le nom du bâtiment, le patient ne sait pas où s&apos;arrête
          Réso.ne et où commence le reste. Et le nom ne voyage pas&nbsp;: si demain Réso.ne ouvre un
          deuxième centre à La Chaux-de-Fonds ailleurs que rue Volta, le nom n&apos;a plus de sens.
        </P>
      </div>

      {/* Citation — colonne droite */}
      <blockquote className="border-accent w-64 border-l-[3px] pl-6">
        <span
          className="text-fg leading-[1.3] font-medium tracking-tight"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
        >
          Volta reste dans l&apos;adresse.
          <br />
          Il disparaît du nom de la marque.
        </span>
      </blockquote>
    </div>

    {/* Bottom spacer */}
    <div />
  </div>
);

/* ─── 20. Extensibilité ────────────────────────────────────── */

const EXTENSIBILITE = [
  {
    label: 'Un centre d\u2019ophtalmologie ouvre à Milvignes',
    marque: 'Réso.ne',
    descripteur: 'Centre d\u2019ophtalmologie',
    lieu: 'de Milvignes',
  },
  {
    label: 'Un cabinet de gynécologie ouvre au Landeron',
    marque: 'Réso.ne',
    descripteur: 'Cabinet de gynécologie',
    lieu: 'du Landeron',
  },
  {
    label: 'Un cabinet de médecine générale ouvre au Locle',
    marque: 'Réso.ne',
    descripteur: 'Cabinet médical',
    lieu: 'du Locle',
  },
] as const;

export const SlideExtensibilite = () => (
  <div className="flex h-full flex-col p-10">
    <H1>Le système est extensible</H1>

    <div className="mt-2 flex flex-1 flex-col justify-evenly">
      {EXTENSIBILITE.map((c, i) => (
        <div key={c.lieu} className="flex flex-col gap-1">
          <P className="max-w-none">
            Exemple {i + 1} — {c.label}
          </P>
          <div className="flex items-center gap-2">
            <div className="border-accent/30 bg-accent/5 rounded-md border px-4 py-3">
              <span className="text-accent text-lg font-bold">{c.marque}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.descripteur}</span>
            </div>
            <div className="border-border rounded-md border px-4 py-3">
              <span className="text-fg text-lg font-medium">{c.lieu}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4">
      <p className="text-base leading-relaxed text-(--sub)">
        Le descripteur s&apos;adapte à l&apos;activité. Le lieu s&apos;adapte à la géographie.
        Réso.ne reste constant. Quel que soit le type de structure ou la localisation dans le
        canton, le nom se construit tout seul. Pas besoin de réinventer le système à chaque
        ouverture.
      </p>
    </div>
  </div>
);

/* ─── 20. Direction A — Cousinage (chapter) ────────────────── */

export const SlideDirectionA = () => (
  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
    <Label>Chapitre</Label>
    <H1 className="text-accent">Direction A — Cousinage</H1>
  </div>
);

/* ─── 13. Direction B — Émancipation ───────────────────────── */

export const SlideDirectionB = () => (
  <div className="flex h-full flex-col items-start justify-center p-8">
    <H1>Direction B — Émancipation</H1>
    <Divider />
    <P>Contenu à venir.</P>
  </div>
);

/* ─── 14. Typographie & Logo (chapter) ─────────────────────── */

export const SlideTypoLogo = () => (
  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
    <Label>Chapitre</Label>
    <H1 className="text-accent">Typographie &amp; Logo</H1>
  </div>
);

/* ─── 15. Prochaines étapes ────────────────────────────────── */

export const SlideEtapes = () => (
  <div className="flex h-full flex-col items-start justify-center p-8">
    <H1>Prochaines étapes</H1>
    <Divider />
    <P>Contenu à venir.</P>
  </div>
);
