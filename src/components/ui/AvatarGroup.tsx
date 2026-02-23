import { cn } from '@utils/cn';

import { Avatar } from './Avatar';

interface AvatarGroupProps {
  avatars: { src?: string; alt: string; fallback?: string }[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** Stacked avatar group with overflow count. */
export const AvatarGroup = ({ avatars, max = 4, size = 'md', className }: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visible.map((avatar, i) => (
        <div key={i} className="ring-bg rounded-full ring-2">
          <Avatar src={avatar.src} alt={avatar.alt} fallback={avatar.fallback} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'bg-surface border-border text-muted ring-bg flex items-center justify-center rounded-full border ring-2',
            'font-mono text-[10px] font-medium',
            size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12',
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};
