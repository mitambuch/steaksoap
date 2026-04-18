// ═══════════════════════════════════════════════════
// useSanityDoc — generic Sanity GROQ fetch hook
//
// WHAT: Fetches a single value / doc via a GROQ query. Returns a
//       predictable { data, loading, error, retry } shape so callers
//       can branch on loading BEFORE deciding whether to redirect 404
//       (HDVA lesson #6).
// WHEN: Any Sanity-backed data in the app. Prefer the dedicated
//       hooks (useSiteConfig, usePage, …) when they exist — they wrap
//       this with proper typing.
// NOTE: When !hasSanity, returns { data: null, loading: false, error:
//       null, retry: noop }. Callers should fall back to local fixtures.
// ═══════════════════════════════════════════════════

import { hasSanity, sanityClient } from '@lib/sanity';
import { useCallback, useEffect, useState } from 'react';

export interface SanityDocState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useSanityDoc<T>(
  query: string,
  params?: Record<string, unknown>,
): SanityDocState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(hasSanity);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // WHY: initial `loading` already reflects `hasSanity`, so we never need to
    // setState when Sanity is disabled — the early return avoids the
    // react-hooks/set-state-in-effect lint.
    if (!hasSanity || !sanityClient) return;

    let cancelled = false;

    sanityClient
      .fetch<T>(query, params ?? {})
      .then(result => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown Sanity error');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query, params, attempt]);

  const retry = useCallback(() => setAttempt(n => n + 1), []);

  return { data, loading, error, retry };
}
