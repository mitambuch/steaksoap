# /new-hook

Create a custom React hook with JSDoc and test.

## Arguments
$ARGUMENTS — Hook name WITHOUT "use" prefix. Example: "MediaQuery" creates useMediaQuery

## Steps

1. Create `src/hooks/use$ARGUMENTS.ts`:
```tsx
import { useEffect, useState } from 'react';

/**
 * Hook description for use$ARGUMENTS.
 *
 * @example
 * ```tsx
 * const value = use$ARGUMENTS();
 * ```
 */
export const use$ARGUMENTS = () => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    // Hook logic here
  }, []);

  return value;
};
```

2. Create `src/hooks/__tests__/use$ARGUMENTS.test.ts`:
```tsx
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { use$ARGUMENTS } from '../use$ARGUMENTS';

describe('use$ARGUMENTS', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => use$ARGUMENTS());
    expect(result.current).toBeDefined();
  });
});
```

3. Run `pnpm validate`.

## Validation
- [ ] Hook file created with JSDoc
- [ ] Test file created and passes
- [ ] pnpm validate passes
