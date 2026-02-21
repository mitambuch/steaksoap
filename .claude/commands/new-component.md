# Create a new component

Create a new component at `src/components/ui/$ARGUMENTS.tsx` with:

1. A named export function with props interface
2. Accept optional `className` prop for style overrides
3. Use `cn()` from `@utils` for class merging
4. Comment block at top explaining what the component does
5. Responsive by default (mobile-first)

Template:
```tsx
import { cn } from '@utils';

/* ─── $ARGUMENTS ─────────────────────────────────────────────
   [Brief description of what this component does]
   ─────────────────────────────────────────────────────────── */

interface ${ARGUMENTS}Props {
  className?: string;
}

export function $ARGUMENTS({ className }: ${ARGUMENTS}Props) {
  return (
    <div className={cn('', className)}>
      {/* component content */}
    </div>
  );
}
```

Run `pnpm validate` to confirm everything compiles.
