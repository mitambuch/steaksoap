import { SeoHead } from '@components/features/SeoHead';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';

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
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-fg text-lg font-medium">fast</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              vite for instant hmr and lightning-fast builds. zero config, zero wait.
            </p>
          </Card>
          <Card hover padding="lg">
            <div className="bg-accent/10 text-accent mb-4 inline-flex h-10 w-10 items-center justify-center rounded-sm">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-fg text-lg font-medium">designed</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              tailwind tokens, dark mode, and accessible components out of the box.
            </p>
          </Card>
          <Card hover padding="lg">
            <div className="bg-accent/10 text-accent mb-4 inline-flex h-10 w-10 items-center justify-center rounded-sm">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
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
