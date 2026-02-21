import RootLayout from '@app/layouts/RootLayout';
import { ROUTES } from '@constants/routes';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/* ─── Lazy loading — each page is a separate chunk ─────────────
   Pattern: const PageName = lazy(() => import('@pages/PageName'))
   ──────────────────────────────────────────────────────────── */
const Home = lazy(() => import('@pages/Home'));
const Playground = lazy(() => import('@pages/Playground'));
const NotFound = lazy(() => import('@pages/NotFound'));

/* ─── Loading fallback ────────────────────────────────────────── */
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="text-sm opacity-30">Loading…</span>
    </div>
  );
}

/* ─── Main router ─────────────────────────────────────────────── */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Root layout — wraps all pages */}
        <Route element={<RootLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PLAYGROUND} element={<Playground />} />
          {/* Add routes here: */}
          {/* <Route path={ROUTES.ABOUT} element={<About />} /> */}
          {/* <Route path={ROUTES.PROJECT} element={<ProjectDetail />} /> */}
        </Route>

        {/* 404 — outside layout for a blank page if needed */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
