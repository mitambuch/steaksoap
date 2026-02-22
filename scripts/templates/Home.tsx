import { SeoHead } from '@components/features/SeoHead';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Palette, Shield, Zap } from 'lucide-react';

/* ─── Home ───────────────────────────────────────────────────────
   Default landing page created by steaksoap setup.
   Edit sections below to build your site.
   ─────────────────────────────────────────────────────────────── */
export default function Home() {
  const appName = import.meta.env.VITE_APP_NAME || 'my project';

  return (
    <>
      <SeoHead />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="text-muted mb-6 font-mono text-[10px] tracking-widest uppercase">
          built with steaksoap
        </span>
        <h1 className="text-fg text-4xl font-medium tracking-tight md:text-6xl">{appName}</h1>
        <p className="text-muted mt-6 max-w-md text-base leading-relaxed md:text-xl">
          a modern web application, ready to ship.
        </p>
        <div className="mt-10 flex gap-4">
          <Button variant="primary" size="lg">
            get started
          </Button>
          <Button variant="secondary" size="lg">
            learn more
          </Button>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <span className="text-muted mb-8 block font-mono text-[10px] tracking-widest uppercase">
          what you get
        </span>
        <div className="grid gap-6 md:grid-cols-3">
          <Card hover padding="lg">
            <div className="bg-accent/10 text-accent mb-4 inline-flex h-10 w-10 items-center justify-center rounded-sm">
              <Zap size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-fg text-lg font-medium">fast</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              vite for instant hmr and lightning-fast builds. zero config, zero wait.
            </p>
          </Card>
          <Card hover padding="lg">
            <div className="bg-accent/10 text-accent mb-4 inline-flex h-10 w-10 items-center justify-center rounded-sm">
              <Palette size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-fg text-lg font-medium">designed</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              tailwind tokens, dark mode, and accessible components out of the box.
            </p>
          </Card>
          <Card hover padding="lg">
            <div className="bg-accent/10 text-accent mb-4 inline-flex h-10 w-10 items-center justify-center rounded-sm">
              <Shield size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-fg text-lg font-medium">reliable</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              typescript strict, comprehensive tests, and automated validation pipeline.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
