import { Footer } from '@components/layout/Footer';
import { Header } from '@components/layout/Header';
import { Banner } from '@components/ui/Banner';
import { siteConfig } from '@config/site';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Outlet, useLocation } from 'react-router-dom';

/* ─── RootLayout ─────────────────────────────────────────────
   Shared wrapper for all pages.
   Place here: Header, Footer, global navigation, etc.

   Outlet = the active page renders here.
   ─────────────────────────────────────────────────────────── */
export default function RootLayout() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div className="bg-bg text-fg flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="focus:bg-accent focus:text-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>
      {!siteConfig.initialized && (
        <Banner variant="warning">
          Project not initialized — run <code className="font-mono font-bold">pnpm setup</code> then{' '}
          <code className="font-mono font-bold">/init</code>
        </Banner>
      )}
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        <div key={pathname} className={prefersReducedMotion ? undefined : 'animate-page-enter'}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
