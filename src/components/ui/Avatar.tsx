import { cn } from '@utils/cn';
import { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

/** Circular avatar with image and fallback initials. */
export const Avatar = ({ src, alt, fallback, size = 'md', className }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  const showImage = src && !hasError;

  return (
    <div
      className={cn(
        'bg-surface inline-flex items-center justify-center overflow-hidden rounded-full',
        sizeStyles[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-muted font-medium" aria-label={alt}>
          {fallback ?? alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};
