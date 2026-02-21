# /add-api

Scaffold an API service with TanStack Query hooks for a resource.

## Arguments
$ARGUMENTS — Resource name in lowercase plural. Examples: "products", "users", "posts"

## Steps

1. Check if @tanstack/react-query is installed:
   - Look in package.json dependencies
   - If NOT installed:
     a. Run `pnpm add @tanstack/react-query`
     b. Create `src/app/providers/QueryProvider.tsx`:
        ```tsx
        import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

        const queryClient = new QueryClient({
          defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
        });

        export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
        ```
     c. Wrap the app in QueryProvider (in main.tsx or the root layout)

2. Create `src/services/$ARGUMENTS.ts`:
```tsx
// Types
export interface $SINGULAR {
  id: string;
  // Add fields here
}

// API base URL — customize in .env.local
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Service functions
export const $ARGUMENTSService = {
  async getAll(): Promise<$SINGULAR[]> {
    const res = await fetch(`${API_URL}/$ARGUMENTS`);
    if (!res.ok) throw new Error(`Failed to fetch $ARGUMENTS`);
    return res.json();
  },

  async getById(id: string): Promise<$SINGULAR> {
    const res = await fetch(`${API_URL}/$ARGUMENTS/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch $SINGULAR ${id}`);
    return res.json();
  },
};
```
(Replace $SINGULAR with the singular form of $ARGUMENTS, e.g., products -> Product)

3. Create `src/hooks/use$ARGUMENTS.ts`:
```tsx
import { useQuery } from '@tanstack/react-query';

import { $ARGUMENTSService } from '@services/$ARGUMENTS';

export const use$ARGUMENTS = () => {
  return useQuery({
    queryKey: ['$ARGUMENTS'],
    queryFn: $ARGUMENTSService.getAll,
  });
};

export const use$SINGULAR = (id: string) => {
  return useQuery({
    queryKey: ['$ARGUMENTS', id],
    queryFn: () => $ARGUMENTSService.getById(id),
    enabled: !!id,
  });
};
```

4. Run `pnpm validate`.

## Notes
- The service functions use plain fetch — no axios dependency needed
- Query keys follow the convention: ['resource'] for lists, ['resource', id] for singles
- Error handling is built into the fetch wrapper (throws on non-ok response)
- TanStack Query handles loading/error states — use `isLoading`, `isError`, `data` from the hook

## Validation
- [ ] @tanstack/react-query installed (if wasn't already)
- [ ] QueryProvider wraps the app (if wasn't already)
- [ ] Service file with typed functions
- [ ] Hook file with useQuery
- [ ] pnpm validate passes
