import { SeoHead } from '@components/features/SeoHead';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';

/* ─── Home ───────────────────────────────────────────────────────
   Default landing page created by steaksoap setup.
   Edit sections below to build your site.
   ─────────────────────────────────────────────────────────────── */
export default function Home() {
  const appName = import.meta.env.VITE_APP_NAME || 'My Project';

  return (
    <>
      <SeoHead />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <h1 className="text-fg text-4xl font-bold tracking-tight md:text-6xl">{appName}</h1>
        <p className="text-muted mt-4 max-w-lg text-lg">
          A modern web application built with React, TypeScript, and Tailwind CSS.
        </p>
        <div className="mt-8 flex gap-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-fg text-lg font-semibold">Fast</h3>
          <p className="text-muted mt-2 text-sm">
            Built with Vite for instant hot module replacement and lightning-fast builds.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-fg text-lg font-semibold">Modern</h3>
          <p className="text-muted mt-2 text-sm">
            Tailwind CSS with design tokens, dark mode, and responsive design out of the box.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-fg text-lg font-semibold">Reliable</h3>
          <p className="text-muted mt-2 text-sm">
            TypeScript strict mode with comprehensive testing and automated validation.
          </p>
        </Card>
      </section>
    </>
  );
}
