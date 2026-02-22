import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hover?: boolean;
  children: ReactNode;
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
  none: 'p-0',
};

/** Container card with border, smooth transitions, and optional hover scale. */
export const Card = ({ className, padding = 'md', hover = false, children }: CardProps) => {
  return (
    <div
      className={cn(
        'border-border bg-surface rounded-lg border transition-all duration-500',
        hover && 'hover:scale-[1.02]',
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </div>
  );
};
