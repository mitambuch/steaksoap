import RootLayout from '@app/layouts/RootLayout';
import { ROUTES } from '@constants/routes';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/* ─── Lazy loading — chaque page est un chunk séparé ────────────
   Pattern : const PageName = lazy(() => import('@pages/PageName'))
   ──────────────────────────────────────────────────────────── */
const Home = lazy(() => import('@pages/Home'));
const NotFound = lazy(() => import('@pages/NotFound'));

/* ─── Fallback pendant le chargement ─────────────────────────── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="opacity-30 text-sm">Loading…</span>
    </div>
  );
}

/* ─── Router principal ───────────────────────────────────────── */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Layout root — wraps toutes les pages */}
        <Route element={<RootLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          {/* Ajouter les routes ici : */}
          {/* <Route path={ROUTES.ABOUT} element={<About />} /> */}
          {/* <Route path={ROUTES.PROJECT} element={<ProjectDetail />} /> */}
        </Route>

        {/* 404 — hors layout si besoin d'une page blank */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
