import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('starts at initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('defaults to 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it('decrements', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-1);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => result.current.increment());
    act(() => result.current.increment());
    expect(result.current.count).toBe(5);
    act(() => result.current.reset());
    expect(result.current.count).toBe(3);
  });

  it('respects max bound', () => {
    const { result } = renderHook(() => useCounter(9, -10, 10));
    act(() => result.current.increment());
    expect(result.current.count).toBe(10);
    act(() => result.current.increment());
    expect(result.current.count).toBe(10); // clamped
  });

  it('respects min bound', () => {
    const { result } = renderHook(() => useCounter(-9, -10, 10));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-10);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-10); // clamped
  });

  it('exposes min and max in state', () => {
    const { result } = renderHook(() => useCounter(0, -5, 5));
    expect(result.current.min).toBe(-5);
    expect(result.current.max).toBe(5);
  });
});
