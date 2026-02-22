import { cn } from '@utils/cn';
import type { ButtonHTMLAttributes } from 'react';

import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent text-bg border border-transparent hover:bg-accent/90',
  secondary:
    'bg-transparent border backdrop-blur-md border-border hover:bg-accent hover:text-bg hover:border-transparent',
  ghost: 'bg-transparent text-fg hover:text-accent',
  danger: 'bg-danger text-white border border-transparent hover:bg-danger/90',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  icon: 'h-10 w-10 p-0',
};

/** Versatile button with variants, sizes, and loading state. */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium',
        'transition-colors duration-200',
        'focus-visible:ring-accent focus-visible:ring-offset-bg focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" aria-label="Loading" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};
