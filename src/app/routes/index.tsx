import RootLayout from '@app/layouts/RootLayout';
import { LocaleProvider } from '@app/LocaleProvider';
import { LocaleRedirect } from '@app/LocaleRedirect';
import { Spinner } from '@components/ui/Spinner';
import { getInitialLocale, isLocale } from '@config/i18n';
import { ROUTES } from '@constants/routes';
import type { ComponentType } from 'react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';

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
const Playground = lazyWithRetry(() => import('@pages/Playground'));
const Lab = lazyWithRetry(() => import('@pages/Lab'));
const NotFound = lazyWithRetry(() => import('@pages/NotFound'));

/* ─── Loading fallback — themed, no white flash ───────────────── */
function PageLoader() {
  return (
    <div className="bg-bg flex min-h-screen items-center justify-center">
      <Spinner size="sm" aria-label="Loading page" />
    </div>
  );
}

/* ─── Locale-scoped layout ────────────────────────────────────
   Every locale-prefixed route renders inside <LocaleProvider> which
   syncs i18n + document.lang + localStorage, plus the shared RootLayout.

   If the `:locale` segment is not a supported code (e.g. `/foo` landing
   here because of React Router's permissive param match), we redirect
   to the detected locale and preserve the original path. This way
   `/unknown` becomes `/fr/unknown` → nested `*` renders NotFound.
   ─────────────────────────────────────────────────────────── */
function LocaleLayout() {
  const { locale: param } = useParams<{ locale?: string }>();
  const { pathname, search, hash } = useLocation();

  if (param !== undefined && !isLocale(param)) {
    const fallback = getInitialLocale();
    return <Navigate to={`/${fallback}${pathname}${search}${hash}`} replace />;
  }

  return (
    <LocaleProvider>
      <RootLayout />
    </LocaleProvider>
  );
}

/* ─── Main router ─────────────────────────────────────────────
   Un-prefixed paths (/ /playground /lab) redirect once to the
   canonical /:locale/... counterpart. All real rendering happens
   under the locale branch so SEO/hreflang alternates are coherent.
   Page transition animation lives in RootLayout around <Outlet />.
   ─────────────────────────────────────────────────────────── */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ─── Un-prefixed → redirect to detected locale ─── */}
        <Route path={ROUTES.HOME} element={<LocaleRedirect />} />
        <Route path={ROUTES.PLAYGROUND} element={<LocaleRedirect />} />
        <Route path={ROUTES.LAB} element={<LocaleRedirect />} />

        {/* ─── Canonical locale-prefixed tree ─────────────── */}
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<Home />} />
          <Route path="playground" element={<Playground />} />
          <Route path="lab" element={<Lab />} />
          {/* Add routes here: */}
          {/* <Route path="about" element={<About />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ─── Catch-all outside the locale tree ──────────── */}
        <Route path={ROUTES.NOT_FOUND} element={<LocaleRedirect />} />
      </Routes>
    </Suspense>
  );
}
