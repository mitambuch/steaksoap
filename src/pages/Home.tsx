import { SeoHead } from '@components/features/SeoHead';
import {
  featuredCommands,
  featuredExtensions,
  features,
  moreExtensions,
  quickStartLines,
} from '@data/showcase';
import { useInView } from '@hooks/useInView';
import { cn } from '@utils/cn';
import { FlaskConical, GitBranch, Shield, Smartphone, Terminal, Zap } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';

import type { Feature } from '../data/showcase';
import { SetupWizard } from '../features/onboarding';
import { DynamicParticles } from '../features/particles/DynamicParticles';

/* ─── Icon resolver ────────────────────────────────────────────── */

const iconMap: Record<Feature['iconName'], typeof Zap> = {
  Zap,
  Terminal,
  Shield,
  FlaskConical,
  Smartphone,
  GitBranch,
};

/* ─── Staggered fade-in wrapper ────────────────────────────────── */

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Section label ────────────────────────────────────────────── */

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-12 flex items-baseline gap-3 md:mb-16">
      <span className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase">{number}</span>
      <span className="text-muted/60 font-mono text-[10px] tracking-[0.2em] uppercase">
        // {title}
      </span>
    </div>
  );
}

/* ─── Smooth scroll helper ─────────────────────────────────────── */

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════════════════ */
/* ═══  HOME PAGE  ══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);

  // WHY: Footer dispatches a custom event to reopen the wizard from any page
  useEffect(() => {
    const handler = () => setShowWizard(true);
    window.addEventListener('open-setup-wizard', handler);
    return () => window.removeEventListener('open-setup-wizard', handler);
  }, []);

  return (
    <>
      <SeoHead
        title="steaksoap"
        description="The AI-native React system for solo builders. 22 commands, 12 rules, 18 extensions."
      />

      {/* ── HERO (100vh) ───────────────────────────────────── */}
      <section className="bg-bg text-fg relative -mt-20 flex h-screen flex-col overflow-hidden">
        <DynamicParticles />

        <div className="relative z-10 flex flex-1 flex-col px-6 pt-20 md:px-8">
          {/* Center content */}
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
            <FadeIn delay={0}>
              <h1 className="leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
                <span className="text-fg font-medium">
                  The AI-native <span className="whitespace-nowrap">React system</span>
                </span>
                <br />
                <span className="text-accent font-medium">for solo builders.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={150}>
              <p className="text-muted mt-4 max-w-lg text-base leading-relaxed md:mt-6 md:text-lg">
                You describe it. The AI builds it.
              </p>
            </FadeIn>

            {/* Stats bar */}
            <FadeIn delay={250}>
              <div className="mt-4 flex items-center gap-6 font-mono text-sm tracking-wide md:gap-8">
                <span>
                  <span className="text-accent font-bold">22</span>{' '}
                  <span className="text-muted">commands</span>
                </span>
                <span className="text-muted/30">·</span>
                <span>
                  <span className="text-accent font-bold">12</span>{' '}
                  <span className="text-muted">rules</span>
                </span>
                <span className="text-muted/30">·</span>
                <span>
                  <span className="text-accent font-bold">18</span>{' '}
                  <span className="text-muted">extensions</span>
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={400} className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-4 md:mt-10">
              <a
                href="https://github.com/mitambuch/steaksoap"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent border-fg/20 hover:border-accent inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-mono text-sm font-medium text-[#0a0a0a] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,107,0.4)] hover:brightness-90 active:scale-[0.97]"
              >
                View on GitHub
                <span aria-hidden="true">&rarr;</span>
              </a>
              <button
                type="button"
                onClick={() => scrollTo('features')}
                className="text-fg border-border hover:border-accent/20 hover:bg-accent/5 inline-flex items-center justify-center gap-2 rounded-full border bg-transparent px-6 py-3 font-mono text-sm backdrop-blur-md transition-all duration-500 active:scale-[0.98]"
              >
                Get started
                <span aria-hidden="true">&darr;</span>
              </button>
            </FadeIn>
          </div>

          {/* Footer micro */}
          <div className="flex shrink-0 items-end justify-between pb-4 md:pb-6">
            <a
              href="https://github.com/mitambuch/steaksoap/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg/60 hover:text-accent flex items-center gap-1.5 font-mono text-[10px] underline-offset-2 transition-colors"
            >
              <span className="bg-success inline-block h-1.5 w-1.5 rounded-full shadow-[0_0_6px_rgba(106,255,138,0.6)]" />
              v{__APP_VERSION__}
            </a>
            <span className="text-fg/60 font-mono text-[10px]">
              MIT · by{' '}
              <a
                href="https://github.com/mitambuch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-300"
              >
                mitambuch
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section id="features" className="bg-bg text-fg px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionLabel number="01" title="features" />
          </FadeIn>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.iconName];
              return (
                <FadeIn key={feature.title} delay={i * 100}>
                  <div className="group hover:border-accent/20 border-border bg-accent/2 hover:bg-accent/4 rounded-lg border p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,107,0.03)]">
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-accent mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-fg font-mono text-sm font-medium tracking-wide uppercase">
                      {feature.title}
                    </h3>
                    <p className="text-muted mt-2 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI WORKFLOW ─────────────────────────────────────── */}
      <section className="bg-bg text-fg px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionLabel number="02" title="ai workflow" />
          </FadeIn>

          <FadeIn delay={50}>
            <p className="text-muted mb-4 max-w-lg text-base leading-relaxed">
              You talk to the AI. The AI follows the rules.
            </p>
            <p className="text-muted/60 mb-12 max-w-lg text-sm leading-relaxed">
              Smart tool detection — Claude recommends the right MCP server when you need databases,
              GitHub, Figma, or monitoring.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {featuredCommands.map((cmd, i) => (
              <FadeIn key={cmd.name} delay={i * 80}>
                <div className="group hover:border-accent/15 border-border rounded-lg border bg-transparent p-5 transition-all duration-300">
                  <span className="text-accent font-mono text-sm">{cmd.name}</span>
                  <p className="text-muted mt-1 text-sm">{cmd.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={600}>
            <p className="text-muted/50 mt-8 font-mono text-xs">
              and 16 more commands{' '}
              <a
                href="https://github.com/mitambuch/steaksoap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/60 hover:text-accent transition-colors duration-300"
              >
                &rarr;
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── EXTENSIONS ─────────────────────────────────────── */}
      <section className="bg-bg text-fg px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionLabel number="03" title="extensions" />
          </FadeIn>

          <FadeIn delay={50}>
            <p className="text-muted mb-12 max-w-lg text-base leading-relaxed">
              Need auth? Payments? 3D? One command to install.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {featuredExtensions.map((ext, i) => (
              <FadeIn key={ext.name} delay={i * 60}>
                <a
                  href={ext.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:border-accent/15 border-border block rounded-lg border bg-transparent p-4 transition-all duration-300"
                >
                  <span className="text-fg group-hover:text-accent font-mono text-sm transition-colors duration-300">
                    {ext.name}
                  </span>
                  <span className="text-muted mt-1 block text-[10px] tracking-wider uppercase">
                    {ext.category}
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={800}>
            <p className="text-muted mt-6 text-sm">
              + {moreExtensions.join(', ')}{' '}
              <a
                href="https://github.com/mitambuch/steaksoap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/70 hover:text-accent font-mono transition-colors duration-300"
              >
                Browse all &rarr;
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── GET STARTED — full-screen closing CTA ────────── */}
      <section className="bg-bg text-fg relative flex min-h-screen flex-col items-center justify-center px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <FadeIn>
            <SectionLabel number="04" title="get started" />
          </FadeIn>

          {/* Centered content */}
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn delay={100}>
              <h2
                className="text-fg leading-[1.1] font-medium"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
              >
                Start building
                <br />
                <span className="text-accent">in 30 seconds.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-muted mx-auto mt-6 max-w-md text-base leading-relaxed md:text-lg">
                Clone. Install. Ship. Five commands and your next project is live.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-surface/30 border-border mx-auto mt-10 max-w-xl overflow-x-auto rounded-lg border p-6 text-left font-mono text-xs backdrop-blur-sm md:text-sm">
                {quickStartLines.map((line, i) => (
                  <div key={i} className="group/line flex items-center gap-2">
                    <span className="text-accent shrink-0">{line.prompt}</span>
                    <code className="text-fg/80 flex-1">{line.command}</code>
                    <button
                      type="button"
                      onClick={() => void navigator.clipboard.writeText(line.command)}
                      className="text-muted hover:text-accent shrink-0 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/line:opacity-100"
                      aria-label={`Copy: ${line.command}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={350}>
              <button
                type="button"
                onClick={() => setShowWizard(true)}
                className="text-muted hover:text-accent mt-6 font-mono text-sm transition-colors"
              >
                New to coding? Follow the step-by-step guide &rarr;
              </button>
            </FadeIn>

            <FadeIn
              delay={450}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
            >
              <a
                href="https://github.com/mitambuch/steaksoap"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent border-fg/20 hover:border-accent inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 font-mono text-sm font-medium text-[#0a0a0a] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,107,0.4)] hover:brightness-90 active:scale-[0.97]"
              >
                View on GitHub
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="https://vercel.com/new/clone?repository-url=https://github.com/mitambuch/steaksoap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg border-border hover:border-accent/20 hover:bg-accent/5 inline-flex items-center justify-center gap-2 rounded-full border bg-transparent px-8 py-3.5 font-mono text-sm backdrop-blur-md transition-all duration-500 active:scale-[0.98]"
              >
                Deploy on Vercel
              </a>
            </FadeIn>
          </div>
        </div>

        {/* Tagline pinned to bottom */}
        <FadeIn delay={600} className="absolute right-0 bottom-6 left-0 text-center">
          <p className="text-muted/40 font-mono text-xs">
            MIT · Free forever · Made for solo builders
          </p>
        </FadeIn>
      </section>

      {/* ── Setup wizard modal ──────────────────────────── */}
      {showWizard && <SetupWizard onClose={() => setShowWizard(false)} />}
    </>
  );
}
