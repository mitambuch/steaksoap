// ═══════════════════════════════════════════════════
// Spinner — loading indicator
//
// WHAT: Renders a rotating arc in the accent color to indicate loading
// WHEN: Use inside buttons (isLoading), skeleton placeholders, or standalone
// CHANGE COLOR: Edit the accent token in src/index.css
// CHANGE SIZES: Edit the sizeStyles object below
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
}

const sizeStyles: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

/** Accessible loading spinner with reduced-motion support. */
export function Spinner({
  size = 'md',
  className,
  'aria-label': ariaLabel = 'Loading',
}: SpinnerProps) {
  return (
    <svg
      className={cn('text-accent motion-safe:animate-spin', sizeStyles[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={ariaLabel}
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        d="M4 12a8 8 0 018-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
