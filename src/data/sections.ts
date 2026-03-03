/* ═══════════════════════════════════════════════════════════════
   SECTIONS — slide metadata and navigation groups for the
   Réso.NE presentation.
   ═══════════════════════════════════════════════════════════════ */

export interface Section {
  title: string;
  layout: 'default' | 'chapter';
}

export interface NavGroup {
  label: string;
  items: number[];
  chapterIndex?: number;
}

export const SECTIONS: Section[] = [
  { title: 'Couverture', layout: 'default' }, // 0
  { title: 'Notre approche', layout: 'default' }, // 1
  { title: 'Principes de design', layout: 'chapter' }, // 2
  { title: "Ce qu'est Réso.ne", layout: 'default' }, // 3
  { title: 'La mission', layout: 'default' }, // 4
  { title: 'Le positionnement', layout: 'default' }, // 5
  { title: 'Introduction', layout: 'chapter' }, // 6
  { title: 'Benchmark', layout: 'default' }, // 7
  { title: "En un coup d'oeil", layout: 'default' }, // 8
  { title: 'Le parcours patient', layout: 'default' }, // 9
  { title: "Aujourd'hui", layout: 'default' }, // 10
  { title: 'Demain', layout: 'default' }, // 11
  { title: 'Contexte stratégique', layout: 'default' }, // 12
  { title: 'Le triple défi', layout: 'default' }, // 13
  { title: 'Nomenclature', layout: 'default' }, // 14
  { title: 'Variante A', layout: 'default' }, // 15
  { title: 'Variante B', layout: 'default' }, // 16
  { title: 'Variante C', layout: 'default' }, // 17
  { title: 'Volta', layout: 'default' }, // 18
  { title: 'Extensibilité', layout: 'default' }, // 19
  { title: 'Direction A — Cousinage', layout: 'chapter' }, // 20
  { title: 'Direction B — Émancipation', layout: 'default' }, // 21
  { title: 'Typographie & Logo', layout: 'chapter' }, // 22
  { title: 'Prochaines étapes', layout: 'default' }, // 23
];

export const TOTAL_SLIDES = SECTIONS.length;

export const NAV_GROUPS: NavGroup[] = [
  { label: 'Introduction', items: [0, 1] },
  { label: 'Principes', items: [], chapterIndex: 2 },
  { label: 'Contexte', items: [3, 4, 5] },
  { label: 'Analyse', items: [7, 8, 9], chapterIndex: 6 },
  { label: 'Stratégie', items: [12, 13] },
  { label: 'Architecture', items: [10, 11, 14, 15, 16, 17, 18, 19] },
  { label: 'Directions', items: [21], chapterIndex: 20 },
  { label: 'Identité & suite', items: [23], chapterIndex: 22 },
];
