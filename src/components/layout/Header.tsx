import { ThemeToggle } from '@components/ui/ThemeToggle';
import { ROUTES } from '@constants/routes';
import { cn } from '@utils/cn';
import { Blocks, House } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ─── Scroll-aware hook ──────────────────────────────────── */

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/* ─── MorphingLogo — organic blob + text ─────────────────── */

function MorphingLogo() {
  return (
    <Link
      to={ROUTES.HOME}
      className="group flex items-center focus-visible:outline-none"
      aria-label="Home"
    >
      <div
        className="bg-accent h-6 w-6 shadow-[0_0_12px_rgba(255,107,107,0.4)] transition-[transform,box-shadow] duration-700 ease-in-out md:h-7 md:w-7"
        style={{
          animation: 'morph 4s ease-in-out infinite',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
      />
    </Link>
  );
}

/* ─── Header ─────────────────────────────────────────────── */

interface HeaderProps {
  className?: string;
}

/** Floating header — morphing logo + navigation pill. */
export const Header = ({ className }: HeaderProps) => {
  const scrolled = useScrolled();
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Main navigation"
      className={cn('fixed top-0 right-0 left-0 z-50', 'px-6 py-4 md:px-8 md:py-5', className)}
    >
      <div className="mx-auto flex w-full max-w-[2440px] items-center justify-between">
        <MorphingLogo />

        {/* Pill nav */}
        <div
          className={cn(
            'flex items-center rounded-full border transition-[border-color,background-color] duration-500',
            scrolled
              ? 'border-border bg-surface/60 backdrop-blur-xl'
              : 'border-border/50 bg-surface/30 backdrop-blur-xl',
          )}
        >
          <Link
            to={ROUTES.HOME}
            aria-current={pathname === ROUTES.HOME ? 'page' : undefined}
            className="text-muted hover:text-accent border-border/50 flex items-center gap-1.5 border-r px-4 py-2 text-sm transition-colors duration-300"
          >
            <House size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to={ROUTES.PLAYGROUND}
            aria-current={pathname === ROUTES.PLAYGROUND ? 'page' : undefined}
            className="text-muted hover:text-accent border-border/50 flex items-center gap-1.5 border-r px-4 py-2 text-sm transition-colors duration-300"
          >
            <Blocks size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Playground</span>
          </Link>
          <div className="px-2 py-1">
            <ThemeToggle className="hover:bg-accent/5 rounded-full p-1.5" />
          </div>
        </div>
      </div>
    </nav>
  );
};
