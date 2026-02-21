import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  children: ReactNode;
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
  none: 'p-0',
};

/** Container card with border and configurable padding. */
export const Card = ({ className, padding = 'md', children }: CardProps) => {
  return (
    <div
      className={cn(
        'border-border bg-surface rounded-lg border',
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </div>
  );
};
