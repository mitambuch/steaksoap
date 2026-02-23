import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

interface KbdProps {
  children: ReactNode;
  className?: string;
}

/** Keyboard shortcut display. */
export const Kbd = ({ children, className }: KbdProps) => {
  return (
    <kbd
      className={cn(
        'bg-surface border-border text-muted inline-flex items-center justify-center rounded-md border',
        'px-1.5 py-0.5 font-mono text-[11px] font-medium',
        'shadow-[0_1px_0_1px_var(--color-border)]',
        className,
      )}
    >
      {children}
    </kbd>
  );
};
