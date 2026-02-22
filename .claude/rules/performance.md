---
paths: ["src/**/*.tsx", "src/**/*.ts"]
---

# Performance Rules

## Images
- ALWAYS `loading="lazy"` on images below the fold
- ALWAYS provide width and height (prevents layout shift)
- Prefer WebP/AVIF via Cloudinary config
- Use srcSet for responsive images
- Never serve images larger than display size
- On mobile: serve smaller image variants (srcSet with width descriptors)

## Components
- Lazy load any component > 50 lines not immediately visible
- React.lazy + Suspense with Skeleton fallback
- Memoize callbacks in lists with useCallback
- Memoize expensive computed values with useMemo
- Never inline objects/arrays in JSX props

## Data fetching
- ALWAYS AbortController in useEffect fetches
- Never fetch in component body — use custom hook
- Cache when appropriate (SWR pattern or TanStack Query)
- Show loading state immediately

## Bundle
- No dependency > 50kb without justification
- Tree-shake: `import { specific }` not `import *`
- Route-level code splitting via lazy() in routes/index.tsx
- Check bundle impact before adding dependencies

## Animations
- CSS transitions > JS animations
- `transform` and `opacity` only for 60fps (GPU-accelerated)
- NEVER animate width, height, top, left (layout recalc)
- Respect `prefers-reduced-motion`
- Use `will-change` sparingly
- On mobile: reduce particle counts, simplify physics, shorten durations

## Lighthouse targets
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
