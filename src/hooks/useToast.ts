// ═══════════════════════════════════════════════════
// useToast — global toast notification state
//
// WHAT: Provides toast(), dismiss(), and toasts array for notification management
// WHEN: Use anywhere you need to show a temporary notification
// CHANGE DURATION: Edit DEFAULT_DURATION below
// ═══════════════════════════════════════════════════

import { useCallback, useSyncExternalStore } from 'react';

export interface ToastData {
  id: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

type ToastInput = Omit<ToastData, 'id'>;

const DEFAULT_DURATION = 5000;

let toasts: ToastData[] = [];
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

function getSnapshot() {
  return toasts;
}

let counter = 0;

function addToast(input: ToastInput): string {
  const id = `toast-${++counter}`;
  const toast: ToastData = { ...input, id };
  toasts = [...toasts, toast];
  emitChange();

  // WHY: Auto-dismiss after duration — uses the toast's custom duration or default
  const duration = input.duration ?? DEFAULT_DURATION;
  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }

  return id;
}

function dismissToast(id: string) {
  toasts = toasts.filter(t => t.id !== id);
  emitChange();
}

/** Hook for managing toast notifications. */
export function useToast() {
  const currentToasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const toast = useCallback((input: ToastInput) => addToast(input), []);
  const dismiss = useCallback((id: string) => dismissToast(id), []);

  return { toast, toasts: currentToasts, dismiss };
}

// WHY: Export for testing — allows resetting state between tests
export function _resetToasts() {
  toasts = [];
  counter = 0;
  emitChange();
}
