import { SeoHead } from '@components/features/SeoHead';
import {
  AccordionSection,
  AvatarsSkeletonSection,
  BadgesSection,
  BannersSection,
  ButtonsSection,
  CardsSection,
  ColorsSection,
  ContactSection,
  CTASection,
  EmptyStatesSection,
  FormsSection,
  IconsSection,
  MiscSection,
  OverlaysSection,
  PricingSection,
  StatsSection,
  TabsSpinnerSection,
  TestimonialsSection,
  TimelineSection,
  ToastSection,
  TypographySection,
} from '@workbench/playground/sections';

/* ═══════════════════════════════════════════════════════════════
   Playground — design system devkit
   All sections live in src/workbench/playground/sections/
   Shared components in src/workbench/playground/shared/
   Static data in src/workbench/playground/data/
   ═══════════════════════════════════════════════════════════════ */

export default function Playground() {
  return (
    <>
      <SeoHead
        title="playground"
        description="design system devkit — all components, tokens, and typography."
      />
      <div className="bg-bg text-fg min-h-screen">
        {/* Hero header — full width, generous breathing room */}
        <div className="mx-auto max-w-350 px-6 pt-12 pb-8 md:px-10 md:pt-16 md:pb-12">
          <span className="text-accent-text font-mono text-[10px] tracking-[0.2em] uppercase">
            design system
          </span>
          <h1 className="text-fg mt-3 text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl">
            devkit
          </h1>
          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed md:text-lg">
            every token, every component, every pattern. click any chip to copy. scroll down for
            ready-to-use modules.
          </p>
          <div className="bg-accent mt-6 h-px w-16" />
        </div>

        {/* Main content — wider container */}
        <div className="mx-auto max-w-350 space-y-20 px-6 pb-20 md:px-10">
          {/* Foundation — 2-col grid for compact sections */}
          <div className="grid gap-16 lg:grid-cols-2">
            <TypographySection />
            <ColorsSection />
          </div>

          {/* Interactive primitives — 2-col where it fits */}
          <div className="grid gap-16 lg:grid-cols-2">
            <ButtonsSection />
            <BadgesSection />
          </div>

          {/* Forms — full width, needs horizontal space */}
          <FormsSection />

          {/* Visual components — 2-col */}
          <div className="grid gap-16 lg:grid-cols-2">
            <CardsSection />
            <AvatarsSkeletonSection />
          </div>

          {/* Overlays & feedback — 2-col */}
          <div className="grid gap-16 lg:grid-cols-2">
            <OverlaysSection />
            <ToastSection />
          </div>

          {/* Icons & small atoms — 2-col */}
          <div className="grid gap-16 lg:grid-cols-2">
            <IconsSection />
            <TabsSpinnerSection />
          </div>

          {/* Assembled modules — full width for complex layouts */}
          <AccordionSection />
          <PricingSection />
          <TestimonialsSection />
          <ContactSection />
          <CTASection />

          {/* Status & data — 2-col */}
          <div className="grid gap-16 lg:grid-cols-2">
            <BannersSection />
            <StatsSection />
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <TimelineSection />
            <EmptyStatesSection />
          </div>

          <MiscSection />
        </div>
      </div>
    </>
  );
}
