import { cn } from '@utils/cn';
import type { KeyboardEvent } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

/** Custom dropdown select — themed, rounded, keyboard-accessible. */
export const Select = ({
  label,
  options,
  placeholder,
  error,
  value,
  onChange,
  className,
  disabled = false,
}: SelectProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(value ?? '');
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Controlled vs uncontrolled: use prop when provided, internal otherwise */
  const selected = value !== undefined ? value : internal;

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (e.target instanceof Node && !containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const pick = (opt: SelectOption) => {
    setInternal(opt.value);
    setOpen(false);
    onChange?.(opt.value);
    triggerRef.current?.focus();
  };

  const toggle = () => {
    if (disabled) return;
    setOpen(prev => {
      if (!prev) {
        const idx = options.findIndex(o => o.value === selected);
        setHighlighted(idx >= 0 ? idx : 0);
      }
      return !prev;
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open && highlighted >= 0 && highlighted < options.length) {
          const opt = options[highlighted];
          if (opt) pick(opt);
        } else {
          toggle();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHighlighted(0);
        } else {
          setHighlighted(prev => Math.min(prev + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (open) setHighlighted(prev => Math.max(prev - 1, 0));
        break;
      case 'Escape':
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  const handleOptionKeyDown = (e: KeyboardEvent<HTMLLIElement>, opt: SelectOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(opt);
    }
  };

  const selectedLabel = options.find(o => o.value === selected)?.label;

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label id={`${id}-label`} htmlFor={id} className="text-fg text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
          id={id}
          ref={triggerRef}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'bg-surface/80 text-fg w-full rounded-lg border px-3 py-2 pr-8 text-left backdrop-blur-sm',
            'transition-all duration-300',
            'focus:ring-1 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-danger hover:border-danger/80 focus:border-danger focus:ring-danger'
              : 'border-border hover:border-accent/30 focus:border-accent focus:ring-accent',
            !selectedLabel && 'text-muted/60',
            className,
          )}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {selectedLabel || placeholder || '\u00A0'}
        </button>

        {/* Chevron */}
        <svg
          className={cn(
            'text-muted pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 transition-transform duration-200',
            open && 'rotate-180',
          )}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>

        {/* Dropdown listbox */}
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className={cn(
            'bg-surface border-border absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-lg border shadow-lg backdrop-blur-xl',
            'transition-all duration-200',
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0',
          )}
        >
          {placeholder && (
            <li
              role="option"
              aria-selected={false}
              aria-disabled="true"
              className="text-muted/60 px-3 py-2 text-sm"
            >
              {placeholder}
            </li>
          )}
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === selected}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm transition-colors duration-150',
                opt.value === selected
                  ? 'bg-accent text-bg'
                  : highlighted === i
                    ? 'bg-accent/10 text-fg'
                    : 'text-fg hover:bg-accent/10',
              )}
              onClick={() => pick(opt)}
              onKeyDown={e => handleOptionKeyDown(e, opt)}
              onMouseEnter={() => setHighlighted(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-danger text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
