// ═══════════════════════════════════════════════════
// Toast — temporary notification popup
//
// WHAT: Displays stacked notifications with auto-dismiss and manual close
// WHEN: Use after actions (form submit, error, success) to give feedback
// CHANGE COLORS: Edit status tokens (success, danger, warning, info) in src/index.css
// CHANGE POSITION: Modify the position classes in ToastContainer below
// CHANGE DURATION: Edit DEFAULT_DURATION in src/hooks/useToast.ts
// ═══════════════════════════════════════════════════

import type { ToastData } from '@hooks/useToast';
import { useToast } from '@hooks/useToast';
import { cn } from '@utils/cn';
import { AlertTriangle, Check, Info, X } from 'lucide-react';
import type { ReactNode } from 'react';

const variantStyles: Record<ToastData['variant'], string> = {
  success: 'border-success/30 bg-success/10 text-success-text',
  error: 'border-danger/30 bg-danger/10 text-danger-text',
  warning: 'border-warning/30 bg-warning/10 text-warning-text',
  info: 'border-info/30 bg-info/10 text-info-text',
};

// WHY: strokeWidth 1.5 matches the lighter icon weight used across the system
const variantIcons: Record<ToastData['variant'], ReactNode> = {
  success: <Check size={16} strokeWidth={1.5} />,
  error: <X size={16} strokeWidth={1.5} />,
  warning: <AlertTriangle size={16} strokeWidth={1.5} />,
  info: <Info size={16} strokeWidth={1.5} />,
};

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  return (
    <div
      role="alert"
      className={cn(
        // WHY max-w-[calc(100vw-2rem)]: on 320px viewports, w-80 (320px) + the
        // right-4 positioning (~16px gutter) overflowed horizontally. Desktop
        // keeps the 320px target; mobile clips to fit.
        'pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-md',
        'animate-toast-in',
        variantStyles[toast.variant],
      )}
    >
      <span className="mt-0.5 shrink-0" aria-hidden="true">
        {toast.icon ?? variantIcons[toast.variant]}
      </span>
      <div className="min-w-0 flex-1">
        {toast.title && <p className="text-sm font-semibold">{toast.title}</p>}
        <p className={cn('text-sm', toast.title && 'mt-0.5 opacity-80')}>{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="focus-visible:ring-accent mt-0.5 shrink-0 rounded-sm opacity-50 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
        aria-label="Dismiss notification"
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

/** Renders all active toasts. Place once in your app layout. */
export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed right-4 bottom-4 z-[var(--z-toast)] flex flex-col gap-2"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
}
