// ═══════════════════════════════════════════════════
// Badge — small label tag
//
// WHAT: Renders a colored label with variant styling
// WHEN: Use for status indicators, tags, categories
// CHANGE COLORS: Edit design tokens in src/index.css
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-accent text-on-accent font-bold',
  outline: 'border border-border bg-transparent',
  success: 'bg-success/15 text-success-text',
  warning: 'bg-warning/15 text-warning-text',
  danger: 'bg-danger/15 text-danger-text',
  info: 'bg-info/15 text-info-text',
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

// WHY: No ARIA role — Badge is a presentational label, not an interactive or live-region element.
// Per WAI-ARIA, adding role="status" would be incorrect unless content updates dynamically.
/** Inline badge for status labels and tags. */
export const Badge = ({ variant = 'default', size = 'sm', children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm font-medium tracking-wide uppercase',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
};
