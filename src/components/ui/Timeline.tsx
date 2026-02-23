import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

interface TimelineItemData {
  title: string;
  description?: string;
  date?: string;
  badge?: ReactNode;
  icon?: ReactNode;
}

interface TimelineProps {
  items: TimelineItemData[];
  className?: string;
}

/** Vertical timeline with dots, connecting line, and content. */
export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn('relative space-y-0', className)}>
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Vertical line */}
          {i < items.length - 1 && (
            <div className="bg-border absolute top-6 left-[9px] h-full w-px" aria-hidden="true" />
          )}

          {/* Dot or icon */}
          <div className="relative z-10 flex shrink-0 items-start pt-1">
            {item.icon ? (
              <div className="text-accent">{item.icon}</div>
            ) : (
              <div className="bg-accent mt-1 h-[18px] w-[18px] rounded-full border-[3px] border-[var(--color-bg)]" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-fg text-sm font-medium">{item.title}</h4>
              {item.badge}
            </div>
            {item.date && (
              <time className="text-muted/60 mt-0.5 block font-mono text-[10px]">{item.date}</time>
            )}
            {item.description && (
              <p className="text-muted mt-1.5 text-sm leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
