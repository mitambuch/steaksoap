---
paths: ["src/features/**", "src/hooks/**", "src/lib/**"]
---

# Data Fetching Rules

## Default state

This project ships with NO data fetching library. This is intentional.
Check `.claude/decisions.md` before adding one.

## Pattern: fetch without a library

Use a custom hook with AbortController and explicit error handling:

```ts
function useResource() {
  const [data, setData] = useState<Resource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch('/api/resource', { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: unknown = await res.json();
        if (!isResource(json)) throw new Error('Invalid response shape');
        setData(json);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { data, error, loading };
}
```

## Pattern: TanStack Query (if installed)

If TanStack Query is installed via `/install-extension tanstack-query`:

```ts
function useResource(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/resource/${id}`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<Resource>;
    },
  });
}
```

## Rules

### NEVER
- Call `fetch()` directly inside a component — always use a hook or service
- Trust raw JSON from an API without validating the shape
- Forget `AbortController` — every fetch must be cancellable
- Ignore error and loading states in the UI

### ALWAYS
- Put fetch logic in `src/features/<name>/use<Name>.ts` or `src/hooks/`
- Use `AbortController` with cleanup in `useEffect`
- Handle all three states in the UI: loading, error, empty/success
- Validate API responses (Zod schema if installed, manual check otherwise)
- Use the `signal` option on fetch for cancellation support
