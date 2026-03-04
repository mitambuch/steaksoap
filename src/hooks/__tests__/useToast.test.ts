import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { _resetToasts, useToast } from '../useToast';

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    _resetToasts();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with empty toasts', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ variant: 'success', message: 'Done!' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]?.message).toBe('Done!');
    expect(result.current.toasts[0]?.variant).toBe('success');
  });

  it('supports all four variants', () => {
    const { result } = renderHook(() => useToast());
    const variants = ['success', 'error', 'warning', 'info'] as const;

    act(() => {
      for (const variant of variants) {
        result.current.toast({ variant, message: `${variant} msg` });
      }
    });

    expect(result.current.toasts).toHaveLength(4);
    expect(result.current.toasts.map(t => t.variant)).toEqual(variants);
  });

  it('dismisses a toast by id', () => {
    const { result } = renderHook(() => useToast());

    let id = '';
    act(() => {
      id = result.current.toast({ variant: 'info', message: 'hello' });
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      result.current.dismiss(id);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('auto-dismisses after default duration', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ variant: 'success', message: 'auto' });
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('uses custom duration when specified', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ variant: 'warning', message: 'custom', duration: 2000 });
    });

    act(() => {
      vi.advanceTimersByTime(1999);
    });
    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('supports title field', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ variant: 'info', message: 'body', title: 'Title' });
    });

    expect(result.current.toasts[0]?.title).toBe('Title');
  });
});
