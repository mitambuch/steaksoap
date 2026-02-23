import { cn } from '@utils/cn';
import { useId } from 'react';

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/** Accessible toggle switch. Uses role="switch" per WAI-ARIA. */
export const Switch = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  className,
}: SwitchProps) => {
  const id = useId();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
          'transition-colors duration-200',
          'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-accent' : 'bg-border',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm',
            'transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-1',
          )}
          aria-hidden="true"
        />
      </button>
      <label htmlFor={id} className="text-fg cursor-pointer text-sm select-none">
        {label}
      </label>
    </div>
  );
};
