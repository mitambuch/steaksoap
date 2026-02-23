import { cn } from '@utils/cn';

interface ProgressBarProps {
  /** Progress value from 0 to 100. */
  value: number;
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const variantColors: Record<NonNullable<ProgressBarProps['variant']>, string> = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
};

/** Animated progress bar with percentage label option. */
export const ProgressBar = ({
  value,
  variant = 'accent',
  size = 'md',
  showLabel = false,
  className,
}: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-muted font-mono text-[10px]">Progress</span>
          <span className="text-fg font-mono text-[10px] font-medium">{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          'bg-border/50 w-full overflow-hidden rounded-full',
          size === 'sm' ? 'h-1' : 'h-2',
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantColors[variant],
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
