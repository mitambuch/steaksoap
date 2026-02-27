import RootLayout from '@app/layouts/RootLayout';
import { Spinner } from '@components/ui/Spinner';
import { ROUTES } from '@constants/routes';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/* ─── Lazy loading — each page is a separate chunk ─────────────
   Pattern: const PageName = lazy(() => import('@pages/PageName'))
   ──────────────────────────────────────────────────────────── */
const Home = lazy(() => import('@pages/Home'));
const Playground = lazy(() => import('@pages/Playground'));
const Steaksoap = lazy(() => import('@pages/Steaksoap'));
const NotFound = lazy(() => import('@pages/NotFound'));

/* ─── Loading fallback — themed, no white flash ───────────────── */
function PageLoader() {
  return (
    <div className="bg-bg flex min-h-screen items-center justify-center">
      <Spinner size="sm" aria-label="Loading page" />
    </div>
  );
}

/* ─── Main router ─────────────────────────────────────────────
   Page transition (animate-page-enter) lives in RootLayout around <Outlet />,
   NOT here. Wrapping <Routes> with key={pathname} would remount the entire
   layout (Header, Footer, contexts) on every navigation.
   ─────────────────────────────────────────────────────────── */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Root layout — wraps ALL pages with Header + Footer */}
        <Route element={<RootLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PLAYGROUND} element={<Playground />} />
          <Route path={ROUTES.STEAKSOAP} element={<Steaksoap />} />
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
