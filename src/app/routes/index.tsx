import RootLayout from '@app/layouts/RootLayout';
import { Spinner } from '@components/ui/Spinner';
import { ROUTES } from '@constants/routes';
import type { ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

/* ─── Lazy loading — each page is a separate chunk ─────────────
   Pattern: const PageName = lazy(() => import('@pages/PageName'))
   ──────────────────────────────────────────────────────────── */
const Home = lazy(() => import('@pages/Home'));
const Playground = lazy(() => import('@pages/Playground'));
const NotFound = lazy(() => import('@pages/NotFound'));

/* ─── Loading fallback — themed, no white flash ───────────────── */
function PageLoader() {
  return (
    <div className="bg-bg flex min-h-screen items-center justify-center">
      <Spinner size="sm" aria-label="Loading page" />
    </div>
  );
}

/* ─── Page transition — fade + lift on mount ──────────────────── */
function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="animate-page-enter">
      {children}
    </div>
  );
}

/* ─── Main router ─────────────────────────────────────────────── */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageTransition>
        <Routes>
          {/* WHY: Home has its own inline nav — no global Header/Footer */}
          <Route path={ROUTES.HOME} element={<Home />} />

          {/* Root layout — wraps all other pages with Header + Footer */}
          <Route element={<RootLayout />}>
            <Route path={ROUTES.PLAYGROUND} element={<Playground />} />
            {/* Add routes here: */}
            {/* <Route path={ROUTES.ABOUT} element={<About />} /> */}
            {/* <Route path={ROUTES.PROJECT} element={<ProjectDetail />} /> */}
          </Route>

          {/* 404 — outside layout for a blank page if needed */}
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </PageTransition>
    </Suspense>
  );
}
