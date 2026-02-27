---
paths: ["src/components/**", "src/features/**"]
---

# Component Rules

## Human-readable header (required)
Every component file MUST start with a comment block that explains:
- **WHAT**: What does this component do (1 sentence)
- **WHEN**: When should someone use it (1 sentence)
- **CHANGE [X]**: How to modify the most common things (colors, shape, sizes)

Write these for a human who has never seen React.
Use plain English, no jargon. If you say "variant", explain what that means.

Example:
```tsx
// ═══════════════════════════════════════════════════
// Button — Clickable action element
//
// WHAT: Renders a styled button with variants (primary, secondary, ghost, danger)
// WHEN: Use for any clickable action — forms, navigation, toggles
// CHANGE COLORS: Edit the accent token in src/index.css, not here
// CHANGE SHAPE: Modify rounded-full in the className below
// CHANGE SIZES: Edit the sizeStyles object below
// ═══════════════════════════════════════════════════
```

## File structure
```tsx
// 0. Human-readable header (see above)

// 1. Imports (sorted by eslint-plugin-simple-import-sort)
import { cn } from '@utils/cn';

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

// 3. Component (arrow function, named export)
/** Primary action button with loading state support. */
export const Button = ({ variant = 'primary', size = 'md', isLoading, className, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn('...base', variantClasses[variant], sizeClasses[size], className)}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
```

## Rules
- Functional components ONLY — no class components
- Arrow functions with named export — no default exports
- Props interface defined ABOVE the component, named `<ComponentName>Props`
- Destructure ALL props in the function signature
- ALWAYS accept `className?: string` for override capability
- Use cn() for ALL className construction
- JSDoc comment on every exported component (one line is fine)

## Organization
- `src/components/ui/` → reusable atoms: Button, Input, Card, Modal, Badge, Skeleton, Avatar, Tooltip, Select, Textarea
- `src/components/layout/` → structural: Header, Footer, Container, Section, SeoHead
- `src/components/features/` → domain-specific components (user creates these)
- `src/features/<name>/` → feature modules: component + hook + types + barrel

## Naming
- Component files: PascalCase — `Button.tsx`, `UserCard.tsx`
- Hook files: camelCase with use prefix — `useTheme.ts`, `useMediaQuery.ts`
- Test files: `__tests__/<ComponentName>.test.tsx`
- Types: `<ComponentName>Props` for props, descriptive names for others

## Accessibility requirements (every component)
- Interactive elements MUST have accessible names (text content or aria-label)
- Form inputs MUST have associated <label> via htmlFor/id
- Images MUST have meaningful alt text (or alt="" for decorative)
- Focus MUST be visible on all interactive elements (never remove outline without replacement)
- Color contrast MUST meet WCAG AA: 4.5:1 for text, 3:1 for large text
- NEVER use cursor: none
- Modals MUST trap focus (tab cycles inside modal)
- Dropdowns/menus MUST be keyboard navigable (arrow keys, Escape to close)

## Props patterns
- Variant prop for visual variations: `variant?: 'primary' | 'secondary' | ...`
- Size prop for sizing: `size?: 'sm' | 'md' | 'lg'`
- State props: `isLoading?`, `isDisabled?`, `isOpen?`
- Always provide sensible defaults
- Spread remaining HTML attrs: `...rest` → applied to root element

## Responsive requirements (every component)
- Mobile layout (320px) MUST be the default — add breakpoints for larger screens
- If the component has hover states, it MUST also have active/tap states for mobile
- If the component uses effects that don't work on touch (cursor, hover-reveal):
  provide a mobile alternative or disable with fallback
- Images in components MUST have max-w-full or w-full
- Text in components MUST be readable at 320px (minimum 14px)
- Fixed/absolute positioned elements MUST NOT cause overflow on mobile
- Always test: "does this make sense on a phone screen?"

## Import boundaries (enforced by ESLint)

These boundaries are automatically enforced — violations block the lint.

| Layer | Can import | Cannot import |
|-------|-----------|---------------|
| `components/ui/` | utils, config, hooks, lib, constants, context | features/, pages/, app/ |
| `features/` | ui/, utils, config, hooks, lib, constants, context | pages/, app/routes/ |
| `pages/` | everything | — |
| `hooks/` | utils, config, lib, constants, context | — |

If ESLint blocks an import, it means the architecture is wrong.
Move the logic to the correct layer instead of disabling the rule.
