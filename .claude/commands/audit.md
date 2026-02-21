# /audit

Run performance and accessibility audits.

## Steps

1. Build: `pnpm build`

2. Bundle analysis:
   - Report total dist/ size
   - Report largest files in dist/
   - Flag any single file > 200KB

3. Accessibility scan (static):
   - Search for images without alt in src/**/*.tsx
   - Search for buttons without text/aria-label: review button components
   - Check for skip-to-content link in layout
   - Check for focus-visible styles in CSS
   - Check that cursor:none is not used anywhere

4. Performance checks:
   - Verify all pages use lazy loading: check route config for `lazy()`
   - Check for large imports: look for imports of entire libraries
   - Verify images use responsive loading (srcSet/sizes or Cloudinary)

5. Report:
   **Bundle**: total size, largest chunks
   **Accessibility**: findings with severity
   **Performance**: optimization opportunities
   **Score**: estimated readiness (pass/warn/fail per category)
