import RootLayout from '@app/layouts/RootLayout';
import { Spinner } from '@components/ui/Spinner';
import { ROUTES } from '@constants/routes';
import type { ComponentType } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/* ─── Lazy loading with retry — survives chunk load failures ───
   Retries the dynamic import up to 3 times with exponential backoff.
   Handles deploy-time hash mismatches when users have stale tabs.
   ──────────────────────────────────────────────────────────── */
function lazyWithRetry<T extends ComponentType>(
  factory: () => Promise<{ default: T }>,
  retries = 3,
) {
  return lazy(() => {
    const attempt = (remaining: number): Promise<{ default: T }> =>
      factory().catch((err: unknown) => {
        if (remaining <= 0) return Promise.reject(err);
        return new Promise<{ default: T }>(resolve =>
          setTimeout(() => resolve(attempt(remaining - 1)), 2 ** (retries - remaining) * 1000),
        );
      });
    return attempt(retries);
  });
}

const Home = lazyWithRetry(() => import('@pages/Home'));
const Welcome = lazyWithRetry(() => import('@pages/Welcome'));
const Playground = lazyWithRetry(() => import('@pages/Playground'));
const Steaksoap = lazyWithRetry(() => import('@pages/Steaksoap'));
const NotFound = lazyWithRetry(() => import('@pages/NotFound'));

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
          <Route path={ROUTES.WELCOME} element={<Welcome />} />
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
