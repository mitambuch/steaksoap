# /new-feature

Create a complete feature module with component, custom hook, types, barrel export, and test.

## Arguments
$ARGUMENTS — Feature name in PascalCase. Examples: "UserProfile", "ShoppingCart", "NewsletterSignup"

## Steps

1. Derive names:
   - Folder: src/features/<kebab-case>/ (e.g., src/features/user-profile/)
   - Component: $ARGUMENTS (PascalCase)
   - Hook: use$ARGUMENTS
   - Types file: $ARGUMENTS.types.ts

2. Create `src/features/<kebab-case>/$ARGUMENTS.types.ts`:
```tsx
/** Data model for the $ARGUMENTS feature. */
export interface $ARGUMENTSData {
  id: string;
  // Add your data fields here
}

/** Props for the $ARGUMENTS component. */
export interface $ARGUMENTSProps {
  className?: string;
}
```

3. Create `src/features/<kebab-case>/use$ARGUMENTS.ts`:
```tsx
import { useState } from 'react';

import type { $ARGUMENTSData } from './$ARGUMENTS.types';

/** Hook that manages $ARGUMENTS state and logic. */
export const use$ARGUMENTS = () => {
  const [data, setData] = useState<$ARGUMENTSData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return { data, isLoading };
};
```

4. Create `src/features/<kebab-case>/$ARGUMENTS.tsx`:
```tsx
import { cn } from '@utils/cn';

import type { $ARGUMENTSProps } from './$ARGUMENTS.types';
import { use$ARGUMENTS } from './use$ARGUMENTS';

/** $ARGUMENTS feature component. */
export const $ARGUMENTS = ({ className }: $ARGUMENTSProps) => {
  const { data, isLoading } = use$ARGUMENTS();

  if (isLoading) return <div className="animate-pulse">Loading...</div>;

  return (
    <div className={cn('', className)}>
      <h2 className="text-xl font-semibold text-fg">$ARGUMENTS</h2>
      {data ? <p>{JSON.stringify(data)}</p> : <p className="text-muted">No data yet.</p>}
    </div>
  );
};
```

5. Create `src/features/<kebab-case>/index.ts`:
```tsx
export { $ARGUMENTS } from './$ARGUMENTS';
export { use$ARGUMENTS } from './use$ARGUMENTS';
export type { $ARGUMENTSData, $ARGUMENTSProps } from './$ARGUMENTS.types';
```

6. Create `src/features/<kebab-case>/__tests__/$ARGUMENTS.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { $ARGUMENTS } from '../$ARGUMENTS';

describe('$ARGUMENTS', () => {
  it('renders heading', () => {
    render(<$ARGUMENTS />);
    expect(screen.getByRole('heading', { name: '$ARGUMENTS' })).toBeInTheDocument();
  });
});
```

7. Run `pnpm validate`.

## Validation
- [ ] Feature folder created with 5 files + test
- [ ] Barrel export works: `import { $ARGUMENTS } from '@features/<kebab-case>'`
- [ ] Test passes
- [ ] pnpm validate passes
