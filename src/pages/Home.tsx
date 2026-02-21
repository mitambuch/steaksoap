import { SeoHead } from '@components/features/SeoHead';
import { CodeBlock } from '@components/ui/CodeBlock';
import { FeatureCard } from '@components/ui/FeatureCard';
import Noise from '@components/ui/Noise';
import { Section } from '@components/ui/Section';
import { TechBadge } from '@components/ui/TechBadge';
import { features, quickStartSteps, techStack } from '@data/showcase';
import { useEffect, useRef, useState } from 'react';

/* ─── Data ────────────────────────────────────────────────────── */

const stackLinks = [
  { label: 'React 19', href: 'https://react.dev' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { label: 'Vite 7', href: 'https://vitejs.dev' },
  { label: 'Tailwind CSS 4', href: 'https://tailwindcss.com' },
] as const;

const terminalLines = [
  { cmd: 'git clone starter && cd starter', out: null, delay: 0 },
  { cmd: 'pnpm install', out: '✓ 661 packages installed', delay: 600 },
  { cmd: 'pnpm dev', out: 'VITE v7.3 ready in 258ms', delay: 500 },
  { cmd: 'pnpm validate', out: '✓ lint ✓ types ✓ 18 tests ✓ build', delay: 700 },
  { cmd: 'pnpm release', out: '✓ v0.6.0 published', delay: 600 },
] as const;

type TypewriterStep = { text: string; pause: number; correction?: boolean };

const typewriterSequence: TypewriterStep[] = [
  { text: 'vibing', pause: 3500 },
  { text: 'pondr', pause: 500, correction: true },
  { text: 'pondering', pause: 3200 },
  { text: 'cogitating', pause: 3000 },
  { text: 'noodling', pause: 2800 },
  { text: 'percolat', pause: 600, correction: true },
  { text: 'percolating', pause: 3500 },
  { text: 'simmering', pause: 3000 },
  { text: 'brewing', pause: 2800 },
  { text: 'manifesting', pause: 3200 },
  { text: 'channel', pause: 500, correction: true },
  { text: 'channeling', pause: 3000 },
  { text: 'compiling', pause: 3400 },
  { text: 'iterating', pause: 2600 },
  { text: 'shipping', pause: 3000 },
  { text: 'deploying', pause: 2800 },
  { text: 'marinating', pause: 3200 },
  { text: 'fermenti', pause: 400, correction: true },
  { text: 'fermenting', pause: 3000 },
  { text: 'gestating', pause: 2600 },
  { text: 'crafting', pause: 3500 },
];

/* ─── Hooks ───────────────────────────────────────────────────── */

function useTypewriter(sequence: TypewriterStep[]) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const state = useRef({
    seqIndex: 0,
    charIndex: 0,
    isDeleting: false,
    isCorrecting: Boolean(sequence[0]?.correction),
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const s = state.current;

    function tick() {
      const current = sequence[s.seqIndex % sequence.length]!;

      if (!s.isDeleting) {
        const target = s.isCorrecting ? current.text.slice(0, -1) : current.text;

        if (s.charIndex <= target.length) {
          setDisplayed(target.slice(0, s.charIndex));
          s.charIndex++;
          const delay = Math.random() < 0.1 ? 400 + Math.random() * 350 : 140 + Math.random() * 160;
          timeoutRef.current = setTimeout(tick, delay);
        } else if (s.isCorrecting) {
          s.isCorrecting = false;
          s.isDeleting = true;
          timeoutRef.current = setTimeout(tick, 500 + Math.random() * 400);
        } else {
          timeoutRef.current = setTimeout(() => {
            s.isDeleting = true;
            tick();
          }, current.pause);
        }
      } else {
        const current2 = sequence[s.seqIndex % sequence.length]!;
        if (s.charIndex > 0) {
          s.charIndex--;
          setDisplayed(current2.text.slice(0, s.charIndex));
          timeoutRef.current = setTimeout(tick, 35 + Math.random() * 25);
        } else {
          s.isDeleting = false;
          s.seqIndex = (s.seqIndex + 1) % sequence.length;
          const next = sequence[s.seqIndex]!;
          s.isCorrecting = Boolean(next.correction);
          timeoutRef.current = setTimeout(tick, 400 + Math.random() * 500);
        }
      }
    }

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sequence]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(blink);
  }, []);

  return { displayed, showCursor };
}

function useCursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [visible]);

  return { pos, visible };
}

/* ─── Components ──────────────────────────────────────────────── */

function CursorGlow({ pos, visible }: { pos: { x: number; y: number }; visible: boolean }) {
  if (!visible) return null;

  return (
    <>
      {/* Glow halo */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9990] mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - 200}px, ${pos.y - 200}px, 0)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div
          className="h-[400px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 255, 0, 0.5) 0%, transparent 55%)',
            filter: 'blur(50px)',
            opacity: 0.25,
          }}
        />
      </div>

      {/* Yellow dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[10000] flex items-center justify-center"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          transition: 'transform 75ms ease-out',
        }}
      >
        <div
          className="bg-accent h-3 w-3 rounded-full"
          style={{
            boxShadow: '0 0 12px rgba(212, 255, 0, 0.8), 0 0 24px rgba(212, 255, 0, 0.4)',
          }}
        />
      </div>
    </>
  );
}

function AnimatedTerminal() {
  const [hovering, setHovering] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (hovering) {
      setVisibleLines(0);
      let i = 0;

      function showNext() {
        i++;
        setVisibleLines(i);
        if (i < terminalLines.length) {
          const nextDelay = terminalLines[i]?.delay ?? 500;
          timeoutRef.current = setTimeout(showNext, nextDelay);
        }
      }

      timeoutRef.current = setTimeout(showNext, 200);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisibleLines(0);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hovering]);

  return (
    <div
      className="h-[220px] w-full max-w-sm overflow-hidden rounded-lg border border-white/8 bg-white/[0.02] backdrop-blur-sm transition-all duration-500"
      style={{
        borderColor: hovering ? 'rgba(212,255,0,0.15)' : undefined,
        boxShadow: hovering
          ? '0 0 30px rgba(212,255,0,0.04), 0 0 60px rgba(212,255,0,0.02)'
          : 'none',
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-1.5">
        <div
          className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
          style={{ backgroundColor: hovering ? 'rgba(239,68,68,0.8)' : 'rgba(239,68,68,0.35)' }}
        />
        <div
          className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
          style={{ backgroundColor: hovering ? 'rgba(234,179,8,0.8)' : 'rgba(234,179,8,0.35)' }}
        />
        <div
          className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
          style={{ backgroundColor: hovering ? 'rgba(34,197,94,0.8)' : 'rgba(34,197,94,0.35)' }}
        />
        <span className="text-muted/50 ml-2 font-mono text-[9px]">~/steaksoap</span>
      </div>
      <div className="space-y-1 px-3 py-2.5 font-mono text-[11px]">
        {terminalLines.map((line, i) => {
          const show = hovering && i < visibleLines;
          const idle = !hovering;

          return (
            <div key={i}>
              {/* Command */}
              <div
                className="flex items-center gap-2 transition-opacity duration-300"
                style={{ opacity: idle ? 0.4 : show ? 1 : 0.15 }}
              >
                <span className="text-accent/80">$</span>
                <span className="text-fg/80">{line.cmd}</span>
              </div>
              {/* Output */}
              {line.out && (
                <div
                  className="ml-4 overflow-hidden transition-all duration-300"
                  style={{
                    opacity: show ? 0.5 : 0,
                    maxHeight: show ? '18px' : '0px',
                  }}
                >
                  <span className="text-accent/60 text-[10px]">{line.out}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default function Home() {
  const { displayed, showCursor } = useTypewriter(typewriterSequence);
  const { pos, visible } = useCursorGlow();

  /* Hide cursor glow when scrolling past the hero */
  const heroRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroInView(entry?.isIntersecting ?? false),
      {
        threshold: 0.1,
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <SeoHead
        title="steaksoap"
        description="AI-first React starter kit for vibe coders. Zero config. Type-safe."
      />

      {/* ── HERO (full viewport) ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="cursor-hidden bg-bg text-fg relative h-screen overflow-hidden"
      >
        <Noise />
        {heroInView && <CursorGlow pos={pos} visible={visible} />}

        <div className="relative z-10 flex h-full flex-col px-4 py-6 md:px-8 md:py-8">
          {/* Top */}
          <header className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-fg/90 font-mono text-sm">🥩🧼 steaksoap</span>
              <span className="text-fg/40 font-mono text-[11px]">
                Production-ready React boilerplate
              </span>
            </div>

            <nav className="flex flex-wrap justify-end gap-2">
              {stackLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-accent/10 bg-accent/3 text-fg/50 hover:border-accent/40 hover:text-accent rounded-full border px-3 py-1 font-mono text-[10px] transition-all duration-300 hover:shadow-[0_0_12px_rgba(212,255,0,0.15)]"
                >
                  {label}
                </a>
              ))}
            </nav>
          </header>

          {/* Center — "Ready to [word]" */}
          <div className="flex flex-1 items-center">
            <h1 className="leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              <span className="text-fg/80 font-medium">Ready to </span>
              <span className="text-accent font-medium">
                {displayed}
                <span
                  className="bg-accent ml-0.5 inline-block"
                  style={{
                    width: 'clamp(2px, 0.3vw, 4px)',
                    height: '0.85em',
                    opacity: showCursor ? 1 : 0,
                    verticalAlign: 'baseline',
                    transform: 'translateY(2px)',
                  }}
                />
              </span>
            </h1>
          </div>

          {/* Bottom */}
          <footer className="mb-4 flex items-end justify-between gap-6">
            <AnimatedTerminal />

            <div className="flex shrink-0 items-center gap-4">
              <p className="text-fg/25 hidden font-mono text-[10px] md:block">
                Clone. Build. Ship.
              </p>
              <a
                href="https://github.com/Mircooo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/60 hover:text-accent transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(212,255,0,0.6)]"
                aria-label="GitHub profile"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </section>

      {/* ── SHOWCASE SECTIONS ────────────────────────────────────── */}
      <div className="bg-bg text-fg">
        {/* What you get */}
        <Section
          id="features"
          title="What you get"
          subtitle="Everything configured. Nothing to figure out."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Section>

        {/* Quick start */}
        <Section id="quickstart" title="Quick start" subtitle="Three commands. That's it.">
          <div className="space-y-6">
            {quickStartSteps.map(step => (
              <CodeBlock key={step.step} {...step} />
            ))}
          </div>
        </Section>

        {/* Built with */}
        <Section
          id="stack"
          title="Built with"
          subtitle="Battle-tested tools. No experimental stuff."
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {techStack.map(tech => (
              <TechBadge key={tech.name} {...tech} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
