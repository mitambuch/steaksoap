import { siteConfig } from '@config/site';
import { cn } from '@utils/cn';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logo?: ReactNode;
  navItems?: readonly NavItem[];
  showThemeToggle?: boolean;
  className?: string;
}

/** Responsive header with mobile hamburger menu and optional theme toggle. */
export const Header = ({
  logo,
  navItems = siteConfig.navItems,
  showThemeToggle = true,
  className,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Close on click outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      className={cn(
        'border-border bg-bg/80 sticky top-0 z-40 border-b backdrop-blur-sm',
        className,
      )}
    >
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <a href="/" className="text-fg font-mono text-sm font-semibold">
          {logo ?? siteConfig.name}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted hover:text-fg text-sm transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}

          {showThemeToggle && (
            <button
              type="button"
              aria-label="Toggle theme"
              className="text-muted hover:text-fg focus-visible:ring-accent rounded-md p-1.5 transition-colors duration-200 focus-visible:ring-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 118.25 2.071a.75.75 0 01-.795-.067z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="text-muted hover:text-fg focus-visible:ring-accent rounded-md p-1.5 transition-colors duration-200 focus-visible:ring-2 md:hidden"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {isMenuOpen ? (
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            ) : (
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={cn(
          'border-border overflow-hidden border-t transition-all duration-200 md:hidden',
          isMenuOpen ? 'max-h-96' : 'max-h-0 border-t-0',
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="text-muted hover:bg-surface hover:text-fg rounded-md px-3 py-2 text-sm transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}

          {showThemeToggle && (
            <button
              type="button"
              aria-label="Toggle theme"
              className="text-muted hover:bg-surface hover:text-fg mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 1118.25 2.071a.75.75 0 01-.795-.067z"
                  clipRule="evenodd"
                />
              </svg>
              Theme
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
