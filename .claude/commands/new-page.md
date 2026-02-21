# Create a new page

Create a new page component at `src/pages/$ARGUMENTS.tsx` with:

1. A default export function named `$ARGUMENTS`
2. SeoHead component imported from `@components/features/SeoHead`
3. Basic responsive layout using design tokens (bg-bg, text-fg)
4. Comment block at top explaining the page purpose

Then update `src/app/routes/index.tsx`:
1. Add a lazy import: `const $ARGUMENTS = lazy(() => import('@pages/$ARGUMENTS'))`
2. Add the route inside the RootLayout Route: `<Route path={ROUTES.$ARGUMENTS_UPPER} element={<$ARGUMENTS />} />`

Then update `src/constants/routes.ts`:
1. Add the route constant: `$ARGUMENTS_UPPER: '/$ARGUMENTS_LOWER'`

Run `pnpm validate` to confirm everything compiles.
