import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width variant. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeStyles: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
};

/** Centered content container with consistent padding. */
export const Container = ({ size = 'lg', className, children, ...rest }: ContainerProps) => (
  <div className={cn('mx-auto w-full px-4 md:px-8', sizeStyles[size], className)} {...rest}>
    {children}
  </div>
);
