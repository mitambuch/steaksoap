import { ThemeToggle } from '@components/ui/ThemeToggle';
import { siteConfig } from '@config/site';
import { ROUTES } from '@constants/routes';
import { cn } from '@utils/cn';
import { Blocks, House } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── GitHub SVG (brand icons removed from Lucide) ───────────── */

function GitHubIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

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

function MorphingLogo({ isActive }: { isActive: boolean }) {
  return (
    <Link to={ROUTES.HOME} className="group flex items-center gap-3 focus-visible:outline-none">
      <div
        className={cn(
          'bg-accent h-5 w-5 transition-all duration-700 ease-in-out md:h-6 md:w-6',
          isActive
            ? 'scale-125 shadow-[0_0_20px_rgba(255,107,107,0.7)]'
            : 'shadow-[0_0_12px_rgba(255,107,107,0.4)]',
        )}
        style={{
          animation: `morph ${isActive ? '1s' : '4s'} ease-in-out infinite`,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
      />
      <span className="text-accent text-base leading-relaxed font-bold tracking-tighter opacity-95 md:text-xl">
        {siteConfig.name}
      </span>
    </Link>
  );
}

/* ─── Header ─────────────────────────────────────────────── */

interface HeaderProps {
  className?: string;
}

/** Floating header — classe2 style: morphing logo + separate pill. */
export const Header = ({ className }: HeaderProps) => {
  const scrolled = useScrolled();
  const [githubHovered, setGithubHovered] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className={cn('fixed top-0 right-0 left-0 z-50', 'px-6 py-4 md:px-8 md:py-5', className)}
    >
      <div className="mx-auto flex w-full max-w-[2440px] items-center justify-between">
        {/* Logo — morphing blob + text, no box, no background */}
        <MorphingLogo isActive={githubHovered} />

        {/* Pill nav — separate from logo */}
        <div
          className={cn(
            'flex items-center rounded-full border transition-all duration-500',
            scrolled
              ? 'border-border bg-surface/60 backdrop-blur-xl'
              : 'border-border/50 bg-surface/30 backdrop-blur-xl',
          )}
        >
          <Link
            to={ROUTES.HOME}
            className="text-muted hover:text-accent border-border/50 flex items-center gap-1.5 border-r px-4 py-2 text-sm transition-colors duration-300"
          >
            <House size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to={ROUTES.PLAYGROUND}
            className="text-muted hover:text-accent border-border/50 flex items-center gap-1.5 border-r px-4 py-2 text-sm transition-colors duration-300"
          >
            <Blocks size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Playground</span>
          </Link>
          <a
            href="https://github.com/mitambuch/steaksoap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent border-border/50 flex items-center gap-1.5 border-r px-4 py-2 text-sm transition-colors duration-300"
            onMouseEnter={() => setGithubHovered(true)}
            onMouseLeave={() => setGithubHovered(false)}
          >
            <GitHubIcon size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <div className="px-2 py-1">
            <ThemeToggle className="hover:bg-accent/5 rounded-full p-1.5" />
          </div>
        </div>
      </div>
    </nav>
  );
};
