// ═══════════════════════════════════════════════════
// Avatar — circular user image with fallback initials
//
// WHAT: Displays a user avatar image or initials fallback
// WHEN: Use in user profiles, comments, team lists
// CHANGE COLORS: Edit design tokens in src/index.css
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';
import { useState } from 'react';

interface AvatarProps {
  src?: string | undefined;
  alt: string;
  fallback?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

const sizePx: Record<NonNullable<AvatarProps['size']>, number> = {
  sm: 32,
  md: 40,
  lg: 56,
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
          width={sizePx[size]}
          height={sizePx[size]}
          loading="lazy"
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
