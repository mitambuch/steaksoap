// ═══════════════════════════════════════════════════
// Banner — dismissable notification bar
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface BannerProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'accent';
  dismissable?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<BannerProps['variant']>, string> = {
  info: 'bg-info/10 text-info border-info/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  accent: 'bg-accent/10 text-accent border-accent/20',
};

/** Sticky notification bar with optional dismiss. */
export const Banner = ({
  variant = 'info',
  dismissable = true,
  children,
  className,
}: BannerProps) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      role="status"
      className={cn(
        'flex items-center justify-center gap-3 border-b px-4 py-2.5 text-center text-sm',
        variantStyles[variant],
        className,
      )}
    >
      <span className="flex-1">{children}</span>
      {dismissable && (
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="shrink-0 rounded-md p-0.5 opacity-70 transition-opacity hover:opacity-100"
        >
          <X size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
