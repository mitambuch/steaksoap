/* ═══════════════════════════════════════════════════════════════
   Home — Réso.NE presentation orchestrator
   WHAT: Full-screen presentation with sidebar nav, stepper, slides
   WHEN: Landing page at /
   CHANGE: Add slides in SlideContents.tsx, update SECTIONS in sections.ts
   ═══════════════════════════════════════════════════════════════ */

import { Slide } from '@components/features/Slide';
import { BottomBar } from '@components/layout/BottomBar';
import { NavPanel } from '@components/layout/NavPanel';
import { PresentationHeader } from '@components/layout/PresentationHeader';
import { Stage } from '@components/layout/Stage';
import { Stepper } from '@components/layout/Stepper';
import { NAV_GROUPS, SECTIONS, TOTAL_SLIDES } from '@data/sections';
import {
  SlideAnalyse,
  SlideApproche,
  SlideAujourdhui,
  SlideBenchmark,
  SlideChiffres,
  SlideContexte,
  SlideCouverture,
  SlideDefi,
  SlideDemain,
  SlideDirectionA,
  SlideDirectionB,
  SlideEtapes,
  SlideExtensibilite,
  SlideMission,
  SlideNomenclature,
  SlideParcours,
  SlidePositionnement,
  SlidePrincipes,
  SlideResoNe,
  SlideTypoLogo,
  SlideVarianteA,
  SlideVarianteB,
  SlideVarianteC,
  SlideVolta,
} from '@features/presentation/SlideContents';
import { useKeyboard } from '@hooks/useKeyboard';
import type { FC } from 'react';
import { useCallback, useState } from 'react';

/* ─── Slide component map (order matches SECTIONS) ──────────── */

const SLIDE_COMPONENTS: FC[] = [
  SlideCouverture, // 0
  SlideApproche, // 1
  SlidePrincipes, // 2
  SlideResoNe, // 3
  SlideMission, // 4
  SlidePositionnement, // 5
  SlideAnalyse, // 6
  SlideBenchmark, // 7
  SlideChiffres, // 8
  SlideParcours, // 9
  SlideAujourdhui, // 10
  SlideDemain, // 11
  SlideContexte, // 12
  SlideDefi, // 13
  SlideNomenclature, // 14
  SlideVarianteA, // 15
  SlideVarianteB, // 16
  SlideVarianteC, // 17
  SlideVolta, // 18
  SlideExtensibilite, // 19
  SlideDirectionA, // 20
  SlideDirectionB, // 21
  SlideTypoLogo, // 22
  SlideEtapes, // 23
];

/* ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent(prev => Math.min(prev + 1, TOTAL_SLIDES - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrent(prev => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useKeyboard({ onNext: goNext, onPrev: goPrev });

  /* ─── Compute section label for Stage ─────────────────────── */

  const groupIndex = NAV_GROUPS.findIndex(g => {
    const all = g.chapterIndex !== undefined ? [g.chapterIndex, ...g.items] : [...g.items];
    return all.includes(current);
  });
  const pad = (n: number) => String(n).padStart(2, '0');
  const sectionLabel =
    groupIndex >= 0 ? `${pad(groupIndex + 1)} — ${NAV_GROUPS[groupIndex]?.label ?? ''}` : undefined;

  /* ─── Render ──────────────────────────────────────────────── */

  return (
    <div className="bg-bg text-fg flex h-full flex-col">
      <PresentationHeader current={current} total={TOTAL_SLIDES} />
      <Stepper current={current} total={TOTAL_SLIDES} onGo={goTo} />

      {/* Main grid: sidebar + stage */}
      <div className="grid min-h-0 flex-1 grid-cols-[220px_1fr] gap-6 px-6 py-4">
        <NavPanel current={current} onGo={goTo} />
        <Stage sectionLabel={sectionLabel}>
          {SLIDE_COMPONENTS.map((SlideContent, i) => (
            <Slide key={SECTIONS[i]?.title ?? i} active={current === i}>
              <SlideContent />
            </Slide>
          ))}
        </Stage>
      </div>

      <BottomBar current={current} total={TOTAL_SLIDES} onPrev={goPrev} onNext={goNext} />
    </div>
  );
}
