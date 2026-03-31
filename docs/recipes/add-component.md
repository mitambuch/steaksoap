# Add a Component

> Create a reusable UI component with test.

## AI shortcut

```
/new-component AlertBanner ui
```

## Manual steps

1. **Choose the location**:
   - `src/components/ui/` — reusable atoms (Button, Input, Card, Badge)
   - `src/components/layout/` — structural (Header, Container)
   - `src/components/features/` — domain-specific (ErrorBoundary, etc.)

2. **Create the component** — e.g., `src/components/ui/AlertBanner.tsx`:

```tsx
import { cn } from '@utils/cn';

interface AlertBannerProps {
  className?: string;
  children: React.ReactNode;
}

export const AlertBanner = ({ className, children }: AlertBannerProps) => (
  <div
    className={cn(
      'rounded-lg border border-border bg-surface p-4 text-fg',
      className,
    )}
  >
    {children}
  </div>
);
```

3. **Create the test** — `src/components/ui/__tests__/AlertBanner.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AlertBanner } from '../AlertBanner';

describe('AlertBanner', () => {
  it('renders children', () => {
    render(<AlertBanner>Warning!</AlertBanner>);
    expect(screen.getByText('Warning!')).toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(
      <AlertBanner className="mt-4">Test</AlertBanner>,
    );
    expect(container.firstChild).toHaveClass('mt-4');
  });
});
```

4. **Validate**: `pnpm validate`

## Key rules

- Always use `cn()` for className merging
- Always accept `className?: string` prop
- Always use design tokens (`bg-surface`, `text-fg`, etc.) — never hardcode colors
- Always use named exports, never default
- Tests go in `__tests__/` folder next to the component
