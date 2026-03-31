# /design-convert

Convert a design exploration into production-ready code integrated with the steaksoap design system.
Run this after `/design-explore` when the user is happy with the visual direction.

## Arguments
$ARGUMENTS — Optional refinements or target page name. Examples:
- "Contact" (creates src/pages/Contact.tsx)
- "keep the scroll animation but simplify the hover"
- (empty = convert DesignExplore.tsx as-is, ask for page name)

## Step 1 — Analyze the Exploration

Read the exploration file:
```bash
cat src/pages/DesignExplore.tsx
```

Then read our design system:
```bash
grep -A 80 "@theme" src/index.css
ls src/components/ui/
```

Create an analysis:

### Color Mapping
For each color in the exploration:
```
EXPLORATION          → SYSTEM TOKEN         ACTION
#1a1a2e (dark blue)  → bg-bg (close enough) → use token
#e94560 (hot pink)   → text-accent          → PROPOSE new token or keep #c44040?
#f5f5dc (beige)      → (no match)           → PROPOSE adding to @theme
```

Ask the user: "The exploration uses [colors]. I can map them to our tokens or add new ones. What do you prefer?"

### Component Mapping
For each UI element in the exploration:
```
EXPLORATION              → EXISTING COMPONENT    ACTION
Big gradient button      → Button (variant?)     → add variant "gradient" to Button
Card with glass effect   → Card                  → add variant "glass" to Card
Custom testimonial       → (nothing)             → CREATE new component
Scroll reveal wrapper    → (nothing)             → CREATE new component
```

### New Component Proposals
For elements that are reusable and don't exist in our library:

```
PROPOSAL: ScrollReveal
  What: Wrapper that fades+slides children on scroll intersection
  Reusable: YES — any page can use this
  Add to playground: YES

PROPOSAL: GlassCard
  What: Card with backdrop-blur and border-white/20
  Reusable: YES — premium feel for any client
  Add to playground: YES

PROPOSAL: GradientText
  What: Text with gradient fill
  Reusable: MAYBE — depends on brand
  Add to playground: YES (as variant showcase)
```

Present these proposals to the user. Wait for approval before proceeding.

## Step 1b --- The Adaptation Question (ask the user)

For each major creative choice in the exploration that DIFFERS from current tokens, present all decisions as a single block:

**FONTS:**
Exploration uses [X]. Current system has [read from @theme --font-family-sans/mono].
- Option A: Update project fonts to [X] (changes the entire project feel)
- Option B: Keep current fonts, adapt the design (may lose some personality)
- User decides.

**COLORS:**
Exploration uses palette [X]. Current accent is [read from @theme --color-accent].
- Option A: Update accent + add new tokens (changes the entire project palette)
- Option B: Map exploration colors to closest existing tokens
- Option C: Hybrid --- keep accent, add 1-2 new tokens for this page only
- User decides.

**ANIMATIONS:**
Exploration has [X effect]. Current system uses CSS transitions only.
- Option A: Keep as-is (CSS @keyframes, no library)
- Option B: Simplify to standard transitions
- If the effect needs a library: propose it via /discover first
- User decides.

Present all decisions together. Don't ask one by one.
The user's answer shapes the entire conversion strategy.

## Step 2 --- Convert

Once the user approves the mapping and adaptation decisions:

### 2a. New tokens (if approved)
Edit `src/index.css` @theme block. Update both dark and light modes.

### 2b. New components (if approved)
For each approved component, follow `/new-component` pattern:
- Create in `src/components/ui/` with proper TypeScript interface
- Use cn() for className merging
- Use design tokens (NEVER hardcoded colors)
- Include all states (hover, focus, active, disabled)
- Mobile-first responsive
- Create test file beside it
- Add to playground showcase in `src/workbench/playground/sections/`

### 2c. Convert the page
Create the production page (`src/pages/$PageName.tsx`):
- Convert all inline styles → Tailwind token classes
- Convert raw colors → token classes (bg-bg, text-fg, text-accent, etc.)
- Import from @components/ui/ instead of inline elements
- Add SeoHead with proper title and description
- Add Container where appropriate
- Use cn() for all className logic
- Use named export, PascalCase file
- Lazy load below-fold images
- Semantic HTML (section, article, header, nav)
- Proper accessibility (focus states, alt text, ARIA)

### 2d. Wire up the route
Follow the same pattern as `/new-page`:
- Add route constant in `src/constants/routes.ts`
- Add lazy route in `src/app/routes/`

### 2e. Create test
```tsx
// src/pages/__tests__/$PageName.test.tsx
```

## Step 3 — Cleanup

```bash
# Remove exploration artifacts
rm src/pages/DesignExplore.tsx
# Remove temporary /explore route from route config

# Validate everything
pnpm validate
```

## Step 4 — Merge exploration into main branch

```bash
# We're still on design/explore-* branch
# Commit the converted production code
git add -A
git commit -m "feat(pages): add $PageName page — converted from design exploration"

# Switch to main and merge
git checkout main
git merge --no-ff design/explore-*
```

Wait for user approval before pushing.

## Step 5 — Summary

```
CONVERTED: design exploration → production $PageName page

TOKENS:
  - [new/modified]: list
  - [unchanged]: list

COMPONENTS:
  - [new]: list (added to playground)
  - [reused]: list (from existing ui/)
  - [modified]: list (new variants)

FILES CREATED:
  - src/pages/$PageName.tsx
  - src/pages/__tests__/$PageName.test.tsx
  - src/components/ui/NewComponent.tsx (if any)
  - src/workbench/playground/sections/NewSection.tsx (if any)

FILES MODIFIED:
  - src/index.css (if new tokens)
  - src/constants/routes.ts
  - src/app/routes/index.tsx

VALIDATION: pnpm validate → PASS
```

## REMEMBER

The conversion must preserve the SOUL of the exploration.
Don't sanitize the design into something generic during conversion.
The whole point is that the exploration created something special —
your job is to make it production-ready WITHOUT losing what made it special.

If a design choice conflicts with a rule, KEEP the design choice and
adapt the rule (or add an exception). The user chose that design for a reason.
