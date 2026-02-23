import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/** Placeholder for empty lists, search results, or error states. */
export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon && <div className="text-muted/40 mb-4">{icon}</div>}
      <h3 className="text-fg text-lg font-medium">{title}</h3>
      {description && (
        <p className="text-muted mt-2 max-w-sm text-sm leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
