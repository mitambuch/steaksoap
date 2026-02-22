---
paths: ["src/components/**", "src/features/**", "src/pages/**"]
---

# Responsive-First Rules

## The law
Every component, every page, every feature MUST work on mobile (320px).
This is not optional. This is not "we'll fix it later".
If it doesn't work on a phone, it doesn't ship.

## Dual-variant thinking

When creating ANY visual effect or interaction, always think in two tracks:

### Desktop experience
- Hover states, cursor effects, large animations
- Multi-column layouts, side-by-side content
- Subtle details (small particles, grain, parallax)

### Mobile experience
- Tap states instead of hover
- Single column, stacked layouts
- Simplified or disabled animations
- Touch-friendly targets (44x44px minimum)

### Decision framework for effects

Before implementing any visual effect, classify it:

| Classification | Desktop | Mobile | Example |
|---|---|---|---|
| **KEEP** | Full effect | Same effect | Border animations, color transitions |
| **SIMPLIFY** | Full effect | Reduced version | Particles: 100 → 20, parallax: full → subtle |
| **REPLACE** | Hover-based | Tap-based | Ghost cards: hover-reveal → tap-reveal |
| **DISABLE** | Visible | Hidden + fallback | Custom cursor, complex canvas |

CRITICAL: When you DISABLE something on mobile, you MUST provide a visual fallback.
Never leave empty space. If a particle field is hidden on mobile, replace it with
a subtle gradient, a static image, or a simpler CSS effect.

## Implementation patterns

### Responsive component with dual behavior
```tsx
const ParticleField = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // WHY: Canvas particles are too heavy on mobile, replace with CSS gradient
  if (isMobile) {
    return <div className={cn('bg-gradient-to-b from-transparent to-accent/5', className)} />;
  }

  return <canvas className={cn('...', className)} />;
};
```

### Responsive interaction
```tsx
// WHY: hover doesn't exist on touch — use tap/click instead
<div
  className="opacity-50 md:hover:opacity-100 active:opacity-100 transition-opacity"
  onClick={isMobile ? handleTapReveal : undefined}
  onMouseEnter={!isMobile ? handleHoverReveal : undefined}
>
```

### Responsive animation
```tsx
// WHY: 3.3s reveal is too slow on mobile — users expect instant feedback
const revealDuration = isMobile ? '0.5s' : '3.3s';
```

## Testing responsive

Every component test should include at minimum:
```tsx
it('renders correctly at mobile width', () => {
  // Mock useMediaQuery to return true for mobile
  render(<Component />);
  // Verify mobile-specific behavior
});
```

When running /responsive-check, verify EVERY page at 320px, 768px, 1024px, 1440px.

## Non-negotiable
- Touch targets: 44x44px minimum on ALL interactive elements
- No horizontal scroll at any breakpoint
- Text: minimum 14px on mobile (never smaller)
- Images: ALWAYS max-w-full or w-full
- Fixed/absolute elements: MUST NOT overflow screen on mobile
- Modals/drawers: MUST be full-screen or near-full on mobile
- Forms: inputs MUST be full-width on mobile
