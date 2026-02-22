import { cn } from '@utils/cn';
import type { ButtonHTMLAttributes } from 'react';

import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-accent text-bg border border-accent/50 hover:border-accent hover:shadow-[0_0_20px_rgba(255,107,107,0.15)] hover:brightness-110 active:scale-[0.97]',
  secondary:
    'bg-transparent text-fg border border-border backdrop-blur-md hover:border-accent/30 hover:bg-accent/5 active:scale-[0.97]',
  ghost: 'bg-transparent text-muted hover:text-fg hover:bg-accent/5 active:scale-[0.97]',
  danger:
    'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20 hover:border-danger/50 active:scale-[0.97]',
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
        'transition-all duration-300',
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
          <Spinner size="sm" aria-label="Loading" className="text-inherit" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};
