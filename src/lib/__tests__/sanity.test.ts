import { describe, expect, it } from 'vitest';

import { hasSanity, sanityClient, urlFor } from '../sanity';

describe('sanity lib (no env configured)', () => {
  it('exposes hasSanity=false when SANITY_PROJECT_ID env is empty', () => {
    expect(hasSanity).toBe(false);
  });

  it('exposes a null sanityClient when not configured', () => {
    expect(sanityClient).toBeNull();
  });

  it('throws a clear error when urlFor is called without Sanity', () => {
    expect(() =>
      urlFor({ _type: 'image', asset: { _ref: 'image-abc', _type: 'reference' } }),
    ).toThrowError(/Sanity is not configured/);
  });
});
