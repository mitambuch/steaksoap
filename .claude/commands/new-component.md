# /new-component

Create a new component with props interface, cn() styling, and test.

## Arguments
$ARGUMENTS — "ComponentName" or "ComponentName location"
- ComponentName: PascalCase (e.g., "AlertBanner", "PriceTag")
- location (optional): "ui" (default), "features", or "layout"

## Steps

1. Parse $ARGUMENTS:
   - Split by space. First word = ComponentName, second = location (default: "ui")
   - Target folder: src/components/<location>/

2. Create `src/components/<location>/<ComponentName>.tsx`:

```tsx
// ═══════════════════════════════════════════════════
// <ComponentName> — Brief title
//
// WHAT: What this component renders (1 sentence)
// WHEN: When to use it (1 sentence)
// CHANGE COLORS: Edit tokens in src/index.css, not here
// CHANGE SIZES: Edit the sizeStyles object or className below
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';

interface <ComponentName>Props {
  className?: string;
  children?: React.ReactNode;
}

/** Brief description of <ComponentName>. */
export const <ComponentName> = ({ className, children }: <ComponentName>Props) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};
```

3. Create test `src/components/<location>/__tests__/<ComponentName>.test.tsx`:

```tsx
import { axe } from 'vitest-axe';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { <ComponentName> } from '../<ComponentName>';

describe('<ComponentName>', () => {
  it('renders children', () => {
    render(<<ComponentName>>Hello</<ComponentName>>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<<ComponentName> className="test-class">Content</<ComponentName>>);
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<<ComponentName>>Content</<ComponentName>>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

4. Run `pnpm validate`.

## Validation
- [ ] Component file created with WHAT/WHEN/CHANGE header
- [ ] Test file created with a11y test and passes
- [ ] pnpm validate passes
