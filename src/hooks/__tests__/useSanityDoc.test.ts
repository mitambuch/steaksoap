import * as sanityLib from '@lib/sanity';
import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSanityDoc } from '../useSanityDoc';

// vi.mock() is hoisted above imports — see https://vitest.dev/api/vi.html#vi-mock
vi.mock('@lib/sanity', () => {
  const state = { mockFetch: vi.fn() };
  return {
    hasSanity: true,
    sanityClient: { fetch: (...args: unknown[]) => state.mockFetch(...args) },
    __state: state,
  };
});

interface SanityLibMock {
  __state: { mockFetch: ReturnType<typeof vi.fn> };
}

const mockFetch = (sanityLib as unknown as SanityLibMock).__state.mockFetch;

afterEach(() => {
  mockFetch.mockReset();
});

describe('useSanityDoc (Sanity configured)', () => {
  it('returns data after a successful fetch', async () => {
    mockFetch.mockResolvedValueOnce({ foo: 'bar' });

    const { result } = renderHook(() => useSanityDoc<{ foo: string }>('*[_type=="x"][0]'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual({ foo: 'bar' });
    expect(result.current.error).toBeNull();
  });

  it('surfaces the error message when the fetch rejects', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network down'));

    const { result } = renderHook(() => useSanityDoc('*[_type=="x"][0]'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Network down');
  });

  it('falls back to a generic message for non-Error rejections', async () => {
    mockFetch.mockRejectedValueOnce('boom');

    const { result } = renderHook(() => useSanityDoc('*[_type=="x"][0]'));

    await waitFor(() => {
      expect(result.current.error).toBe('Unknown Sanity error');
    });
  });

  it('retry triggers a fresh fetch', async () => {
    mockFetch.mockResolvedValueOnce({ n: 1 }).mockResolvedValueOnce({ n: 2 });

    const { result } = renderHook(() => useSanityDoc<{ n: number }>('*[_type=="x"][0]'));

    await waitFor(() => {
      expect(result.current.data).toEqual({ n: 1 });
    });

    result.current.retry();

    await waitFor(() => {
      expect(result.current.data).toEqual({ n: 2 });
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
