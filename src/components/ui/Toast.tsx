// ═══════════════════════════════════════════════════
// Toast — temporary notification popup
//
// WHAT: Displays stacked notifications with auto-dismiss and manual close
// WHEN: Use after actions (form submit, error, success) to give feedback
// CHANGE COLORS: Edit status tokens (success, danger, warning, info) in src/index.css
// CHANGE POSITION: Modify the position classes in ToastContainer below
// CHANGE DURATION: Edit DEFAULT_DURATION in src/hooks/useToast.ts
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';
import { AlertTriangle, Check, Info, X } from 'lucide-react';
import type { ReactNode } from 'react';

import type { ToastData } from '../../hooks/useToast';
import { useToast } from '../../hooks/useToast';

const variantStyles: Record<ToastData['variant'], string> = {
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-danger/30 bg-danger/10 text-danger',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  info: 'border-info/30 bg-info/10 text-info',
};

// WHY: strokeWidth 1.5 matches classe2 elegance — lighter than default 2
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
        'pointer-events-auto flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-md',
        'animate-in slide-in-from-right duration-300',
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
        onClick={() => onDismiss(toast.id)}
        className="mt-0.5 shrink-0 opacity-50 transition-opacity hover:opacity-100"
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

  if (toasts.length === 0) return null;

  return (
    <div
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
