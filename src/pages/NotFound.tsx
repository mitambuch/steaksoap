import { SeoHead } from '@components/features/SeoHead';
import { ROUTES } from '@constants/routes';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="bg-bg text-fg relative flex min-h-screen flex-col items-center justify-center px-6">
      <SeoHead title="404" description="Page not found." noIndex />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[300px] sm:w-[300px]"
        style={{
          background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="text-accent/10 text-7xl font-bold sm:text-8xl md:text-9xl">404</p>
        <p className="text-muted text-sm sm:text-base">Page not found.</p>
        <Link
          to={ROUTES.HOME}
          className="border-accent/20 text-accent/80 hover:border-accent/50 hover:text-accent mt-2 rounded-full border px-5 py-2 font-mono text-xs transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
