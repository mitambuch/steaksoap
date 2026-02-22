import { CursorGlow } from '@components/layout/CursorGlow';
import Footer from '@components/layout/Footer';
import { Header } from '@components/layout/Header';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';
import { Outlet } from 'react-router-dom';

/* ─── RootLayout ─────────────────────────────────────────────
   Shared wrapper for all pages.
   Place here: Header, Footer, global navigation, etc.

   Outlet = the active page renders here.
   ─────────────────────────────────────────────────────────── */
export default function RootLayout() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className={cn('bg-bg text-fg flex min-h-screen flex-col', isDesktop && 'cursor-hidden')}>
      <a
        href="#main-content"
        className="focus:bg-accent focus:text-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>
      <CursorGlow enabled={isDesktop} />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
