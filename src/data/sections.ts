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
  { title: 'Architecture', layout: 'chapter' }, // 10
  { title: "Aujourd'hui", layout: 'default' }, // 11
  { title: 'Demain', layout: 'default' }, // 12
  { title: 'Contexte stratégique', layout: 'default' }, // 13
  { title: 'Le triple défi', layout: 'default' }, // 14
  { title: 'Nomenclature', layout: 'default' }, // 15
  { title: 'Architecture de marque', layout: 'default' }, // 16
  { title: 'Direction A — Cousinage', layout: 'chapter' }, // 17
  { title: 'Direction B — Émancipation', layout: 'default' }, // 18
  { title: 'Typographie & Logo', layout: 'chapter' }, // 19
  { title: 'Prochaines étapes', layout: 'default' }, // 20
];

export const TOTAL_SLIDES = SECTIONS.length;

export const NAV_GROUPS: NavGroup[] = [
  { label: 'Introduction', items: [0, 1] },
  { label: 'Principes', items: [], chapterIndex: 2 },
  { label: 'Contexte', items: [3, 4, 5] },
  { label: 'Analyse', items: [7, 8, 9], chapterIndex: 6 },
  { label: 'Architecture', items: [11, 12], chapterIndex: 10 },
  { label: 'Stratégie', items: [13, 14, 15, 16] },
  { label: 'Directions', items: [18], chapterIndex: 17 },
  { label: 'Identité & suite', items: [20], chapterIndex: 19 },
];
