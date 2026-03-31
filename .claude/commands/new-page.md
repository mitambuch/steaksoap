# /new-page

Create a new page with route, SEO head, and test file.

## Arguments
$ARGUMENTS — PascalCase page name. Examples: "About", "Pricing", "Contact"

## Steps

1. **Read context**: Check CLAUDE.md for `## Composition Rules` and `## Design Direction`.
   If they exist, the page skeleton MUST follow them (grid system, vertical rhythm, title style, spacing).
   If they don't exist, use the generic template below.

2. **Reuse check**: Search `src/pages/`, `src/workbench/playground/sections/` for existing pages or sections that overlap. Propose reusing or composing with them before creating from scratch.

3. Create `src/pages/$ARGUMENTS.tsx`:

**If Composition Rules exist** — adapt the skeleton to match. Example with rules "titles left-aligned text-4xl, sections py-24 md:py-32, generous spacing":
```tsx
import { SeoHead } from '@components/features/SeoHead';

/** $ARGUMENTS page. */
export default function $ARGUMENTS() {
  return (
    <>
      <SeoHead title="$ARGUMENTS" description="$ARGUMENTS page description." />
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <h1 className="text-fg text-4xl font-medium tracking-tight md:text-6xl">$ARGUMENTS</h1>
        <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
          Content goes here.
        </p>
      </section>
    </>
  );
}
```

**If no Composition Rules** — use generic template:
```tsx
import { Container } from '@components/layout/Container';
import { SeoHead } from '@components/features/SeoHead';

/** $ARGUMENTS page. */
export default function $ARGUMENTS() {
  return (
    <>
      <SeoHead title="$ARGUMENTS" description="$ARGUMENTS page description." />
      <Container>
        <h1 className="text-3xl font-medium text-fg mb-6">$ARGUMENTS</h1>
        <p className="text-muted">This is the $ARGUMENTS page. Edit this file to add your content.</p>
      </Container>
    </>
  );
}
```

4. Add route constant in `src/constants/routes.ts`:
   - Add: `UPPER_CASE: '/<kebab-case-of-$ARGUMENTS>',` to the ROUTES object

5. Add lazy route in `src/app/routes/` (find the route config file):
   - Add: `const $ARGUMENTS = lazyWithRetry(() => import('@pages/$ARGUMENTS'));`
   - Add route: `<Route path={ROUTES.UPPER_CASE} element={<$ARGUMENTS />} />`
   - Import ROUTES from '@constants/routes' if not already imported

6. Create test `src/pages/__tests__/$ARGUMENTS.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import $ARGUMENTS from '../$ARGUMENTS';

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

7. Run `pnpm validate` — must pass.

## Validation
- [ ] Page exists at src/pages/$ARGUMENTS.tsx
- [ ] Route added with lazy loading
- [ ] Test exists and passes
- [ ] pnpm validate passes
