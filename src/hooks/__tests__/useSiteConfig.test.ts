import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSiteConfig } from '../useSiteConfig';

describe('useSiteConfig (no Sanity configured)', () => {
  it('surfaces the disabled shape when Sanity is not configured', () => {
    const { result } = renderHook(() => useSiteConfig());
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
