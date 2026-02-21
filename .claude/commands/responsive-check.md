# /responsive-check

Verify responsive design across breakpoints.

## Arguments
$ARGUMENTS — Optional: specific page or component. Empty = all pages.

## Steps

1. Identify all pages:
   - Read the route config to list all routes and their page components

2. For each page, analyze the code for responsive issues:

   **At 320px (mobile):**
   - [ ] No horizontal overflow (no fixed widths > 300px)
   - [ ] Text readable (no text smaller than 14px)
   - [ ] Touch targets >= 44x44px
   - [ ] Images contained (max-w-full or w-full)
   - [ ] Single column layout (no side-by-side that causes squish)

   **At 768px (tablet):**
   - [ ] Grid/flex layouts transition properly (sm: or md: breakpoints used)
   - [ ] Navigation works (hamburger or visible links)

   **At 1024px (desktop):**
   - [ ] Content doesn't stretch to full width (max-w used)
   - [ ] Multi-column layouts active
   - [ ] Hover states present where appropriate

   **At 1440px (wide):**
   - [ ] Content centered or constrained (not stretching edge to edge)
   - [ ] Font sizes appropriate (not too small on large screens)

3. Report issues:
   For each issue: file, line number, breakpoint, what's wrong, suggested fix.

4. Offer to fix the most critical issues.
