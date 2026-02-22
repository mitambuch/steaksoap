import { cn } from '@utils/cn';
import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

/** Text input with label, error, and helper text. */
export const Input = ({ label, error, helperText, className, ...rest }: InputProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-fg text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'bg-surface/80 text-fg rounded-lg border px-3 py-2 backdrop-blur-sm',
          'transition-all duration-300',
          'placeholder:text-muted/60',
          'focus:ring-1 focus:outline-none',
          error
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-border focus:border-accent focus:ring-accent',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-danger text-sm" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-muted text-sm">
          {helperText}
        </p>
      )}
    </div>
  );
};
