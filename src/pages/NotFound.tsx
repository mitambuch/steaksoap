import { SeoHead } from '@components/features/SeoHead';
import { ROUTES } from '@constants/routes';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-fg">
      <SeoHead title="404" description="Page introuvable." noIndex />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[300px] sm:w-[300px]"
        style={{
          background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="text-7xl font-bold text-accent/10 sm:text-8xl md:text-9xl">404</p>
        <p className="text-sm text-muted sm:text-base">Page introuvable.</p>
        <Link
          to={ROUTES.HOME}
          className="mt-2 rounded-full border border-accent/20 px-5 py-2 font-mono text-xs text-accent/80 transition-colors hover:border-accent/50 hover:text-accent"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
