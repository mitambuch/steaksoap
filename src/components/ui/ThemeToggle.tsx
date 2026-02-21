import { useTheme } from '@context/ThemeContext';
import { cn } from '@utils/cn';

interface ThemeToggleProps {
  className?: string;
}

/** Toggle between light and dark mode with sun/moon icons. */
export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center rounded-md p-2',
        'text-muted hover:text-fg hover:bg-surface',
        'transition-colors duration-200',
        'focus-visible:ring-accent focus-visible:ring-offset-bg focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon — visible in dark mode (click to switch to light) */}
      <svg
        className={cn(
          'h-5 w-5 transition-transform duration-200',
          isDark ? 'scale-100' : 'absolute scale-0',
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon — visible in light mode (click to switch to dark) */}
      <svg
        className={cn(
          'h-5 w-5 transition-transform duration-200',
          !isDark ? 'scale-100' : 'absolute scale-0',
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};
