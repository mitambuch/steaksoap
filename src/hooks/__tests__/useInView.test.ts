import { act, render, renderHook, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useInView } from '../useInView';

/** Helper component that uses the hook and exposes isInView as text. */
function TestComponent({ threshold, once }: { threshold?: number; once?: boolean }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold, once });
  return createElement('div', { ref, 'data-testid': 'target' }, isInView ? 'visible' : 'hidden');
}

describe('useInView', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let capturedCallback: IntersectionObserverCallback;
  let originalIO: typeof IntersectionObserver;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    originalIO = globalThis.IntersectionObserver;

    class MockIO {
      constructor(callback: IntersectionObserverCallback) {
        capturedCallback = callback;
      }
      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = disconnectMock;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).IntersectionObserver = MockIO;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
  });

  it('returns a ref and isInView defaults to false', () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.ref).toBeDefined();
    expect(result.current.isInView).toBe(false);
  });

  it('observes the element when ref is attached', () => {
    render(createElement(TestComponent));
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('sets isInView to true when element intersects', () => {
    render(createElement(TestComponent));
    expect(screen.getByTestId('target')).toHaveTextContent('hidden');

    act(() => {
      capturedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByTestId('target')).toHaveTextContent('visible');
  });

  it('calls disconnect on unmount', () => {
    const { unmount } = render(createElement(TestComponent));
    expect(disconnectMock).not.toHaveBeenCalled();
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('unobserves after intersection when once is true (default)', () => {
    render(createElement(TestComponent, { once: true }));

    act(() => {
      capturedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(unobserveMock).toHaveBeenCalled();
  });
});
