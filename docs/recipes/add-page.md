# Add a Page

> Create a new page with route, SEO, and test in 60 seconds.

## AI shortcut

```
/new-page About
```

This creates the page, route, and test automatically.

## Manual steps

1. **Add the route constant** — `src/constants/routes.ts`:

```ts
export const ROUTES = {
  HOME: '/',
  PLAYGROUND: '/playground',
  ABOUT: '/about', // ← add this
  NOT_FOUND: '*',
} as const;
```

2. **Create the page** — `src/pages/About.tsx`:

```tsx
import { Container } from '@components/layout/Container';
import { SeoHead } from '@components/features/SeoHead';

export default function About() {
  return (
    <>
      <SeoHead title="About" description="About page." />
      <Container>
        <h1 className="text-fg mb-6 text-3xl font-bold">About</h1>
        <p className="text-muted">Your content here.</p>
      </Container>
    </>
  );
}
```

3. **Register the route** — `src/app/routes/index.tsx`:

```tsx
import { ROUTES } from '@constants/routes';
import { lazy } from 'react';

const About = lazy(() => import('@pages/About'));

// In the <Route> section:
<Route path={ROUTES.ABOUT} element={<About />} />
```

4. **Create the test** — `src/pages/__tests__/About.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import About from '../About';

describe('About', () => {
  it('renders heading', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });
});
```

5. **(Optional) Add to navigation** — `src/config/site.ts`:

```ts
navItems: [
  { label: 'Home', href: '/' },
  { label: 'Playground', href: '/playground' },
  { label: 'About', href: '/about' }, // ← add this
],
```

6. **Validate**: `pnpm validate`
