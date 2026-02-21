import { SeoHead } from '@components/features/SeoHead';

/* ─── Home ───────────────────────────────────────────────────────
   Default landing page. Edit this file to build your site.
   ─────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <SeoHead />
      <div className="bg-bg text-fg flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-fg/90 font-mono text-3xl font-medium md:text-5xl">
            {import.meta.env.VITE_APP_NAME}
          </h1>
          <p className="text-muted mt-4 font-mono text-sm">
            Edit src/pages/Home.tsx to get started.
          </p>
        </div>
      </div>
    </>
  );
}
