import { cn } from '@utils/cn';

interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
  className?: string;
}

/** Animated placeholder for loading states. */
export const Skeleton = ({ variant = 'text', width, height, className }: SkeletonProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'bg-surface animate-pulse',
        variant === 'text' && 'h-4 w-full rounded',
        variant === 'circle' && 'rounded-full',
        variant === 'rect' && 'rounded-md',
        className,
      )}
      style={{
        width: width ?? (variant === 'circle' ? '2.5rem' : undefined),
        height:
          height ?? (variant === 'circle' ? '2.5rem' : variant === 'rect' ? '6rem' : undefined),
      }}
    />
  );
};
