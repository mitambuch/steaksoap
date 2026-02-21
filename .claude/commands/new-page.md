# /new-page

Create a new page with route, SEO head, and test file.

## Arguments
$ARGUMENTS — PascalCase page name. Examples: "About", "Pricing", "Contact"

## Steps

1. Create `src/pages/$ARGUMENTS.tsx`:

```tsx
import { Container } from '@components/layout/Container';
import { SeoHead } from '@components/layout/SeoHead';

/** $ARGUMENTS page. */
export const $ARGUMENTS = () => {
  return (
    <>
      <SeoHead title="$ARGUMENTS" description="$ARGUMENTS page description." />
      <Container>
        <h1 className="text-3xl font-bold text-fg mb-6">$ARGUMENTS</h1>
        <p className="text-muted">This is the $ARGUMENTS page. Edit this file to add your content.</p>
      </Container>
    </>
  );
};
```

2. Add lazy route in `src/app/routes/` (find the route config file):
   - Add: `const $ARGUMENTS = lazy(() => import('@pages/$ARGUMENTS'));`
   - Add route: `{ path: '/<kebab-case-of-$ARGUMENTS>', element: <$ARGUMENTS /> }`
   - Import `lazy` from 'react' if not already imported

3. Create test `src/pages/__tests__/$ARGUMENTS.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { $ARGUMENTS } from '../$ARGUMENTS';

describe('$ARGUMENTS page', () => {
  it('renders the heading', () => {
    render(
      <MemoryRouter>
        <$ARGUMENTS />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: '$ARGUMENTS' })).toBeInTheDocument();
  });
});
```

4. Run `pnpm validate` — must pass.

## Validation
- [ ] Page exists at src/pages/$ARGUMENTS.tsx
- [ ] Route added with lazy loading
- [ ] Test exists and passes
- [ ] pnpm validate passes
