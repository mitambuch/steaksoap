import { SeoHead } from '@components/features/SeoHead';
import { ROUTES } from '@constants/routes';
import { notFoundPage } from '@data/pages';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="bg-bg text-fg relative flex min-h-screen flex-col items-center justify-center px-6">
      <SeoHead title={notFoundPage.seo.title} description={notFoundPage.seo.description} noIndex />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[300px] sm:w-[300px]"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 4%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="text-accent/10 text-7xl font-bold sm:text-8xl md:text-9xl">
          {notFoundPage.headline}
        </h1>
        <p className="text-muted text-sm sm:text-base">{notFoundPage.subline}</p>
        <Link
          to={ROUTES.HOME}
          className="border-accent/20 text-accent-text hover:border-accent/50 hover:text-accent focus-visible:ring-accent mt-2 rounded-full border px-5 py-2 font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {notFoundPage.cta}
        </Link>
      </div>
    </div>
  );
}
