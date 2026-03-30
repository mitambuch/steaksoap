# /design-explore

Pure creative design exploration — NO constraints, NO design system, full artistic freedom.
Creates an isolated branch for experimentation. This is the "parenthesis" where anything goes.

## Arguments
$ARGUMENTS — What to design, with as much or as little direction as you want. Examples:
- "page contact ultra premium pour un garage Volvo"
- "landing page restaurant gastronomique, surprends-moi"
- "hero section qui donne des frissons"
- "quelque chose de brutaliste et raw"

## Step 1 — Isolate

Create a design exploration branch:
```bash
git stash --include-untracked -m "before design exploration" 2>/dev/null
git checkout main
git checkout -b design/explore-$(date +%Y%m%d-%H%M)
```

This is a throwaway branch. Nothing here needs to pass lint, tests, or build.
The only goal is to produce something visually stunning.

## Step 2 — Pure Design (Anthropic Frontend Design Skill mode)

You are now a DESIGNER, not a developer. Forget everything about:
- ❌ Design tokens
- ❌ cn() utility
- ❌ Component library
- ❌ TypeScript strictness
- ❌ Import aliases
- ❌ Mobile-first (for now)
- ❌ Tests

You ONLY care about:
- ✅ Making something visually UNFORGETTABLE
- ✅ Bold aesthetic choices
- ✅ Typography that has PERSONALITY
- ✅ Color that creates EMOTION
- ✅ Layout that SURPRISES
- ✅ Animations that DELIGHT
- ✅ Details that show CRAFT

### Design Thinking

Before coding, commit to a direction:

1. **Mood**: Pick an extreme — don't be safe
   - Brutalist / raw / concrete
   - Luxury / gold / editorial
   - Organic / flowing / natural
   - Retro-futuristic / neon / cyber
   - Swiss / grid / precise
   - Japanese / zen / space
   - Maximalist / chaotic / layered
   - Art deco / geometric / ornate

2. **Typography**: Choose fonts that are DISTINCTIVE
   - NEVER use Inter, Roboto, Arial, system fonts
   - NEVER default to Space Grotesk (that's our system font — this is exploration)
   - Go wild: serif + mono, display + handwritten, variable fonts
   - Use Google Fonts, Fontsource, or any CDN

3. **Color**: Commit to a palette that creates ATMOSPHERE
   - Not our #c44040 — invent something new
   - 2-3 colors max, used with conviction
   - Think about what the color FEELS like, not just what it looks like

4. **The Hook**: What's the ONE thing someone screenshots?
   - A scroll animation that tells a story?
   - A hover effect that reveals something unexpected?
   - A layout that breaks every convention?
   - A texture or background that creates depth?

### Creative Guidelines

- **Vary EVERYTHING** between explorations. Never converge on the same choices.
- **Go further than comfortable**. If it feels safe, push harder.
- **Reference real design**, not other AI output. Think: awwwards.com, siteinspire.com
- **Details matter**: custom cursors, grain overlays, scroll-triggered reveals, staggered animations, creative loading states
- **Backgrounds create worlds**: gradient meshes, noise textures, geometric patterns, layered transparencies
- **Spatial composition**: asymmetry, overlap, diagonal flow, grid-breaking, generous negative space OR controlled density

## Step 3 — Build the Exploration

Create a single file: `src/pages/DesignExplore.tsx`

Rules for this file:
- It CAN use inline styles, raw hex colors, external fonts, anything
- It CAN be a single massive component — this is a prototype
- It SHOULD use React + JSX (so conversion is easier later)
- It SHOULD import from 'lucide-react' for icons (we have it)
- It SHOULD include both desktop AND mobile considerations (even rough)
- It MUST be visually STUNNING

Add a temporary route so the user can see it at `/explore`:
```tsx
// In the route config, add temporarily:
<Route path="/explore" element={<DesignExplore />} />
```

## Step 4 — Iterate

Tell the user:
```
EXPLORATION READY — check http://localhost:5173/explore

Direction: [aesthetic in 1 sentence]
Hook: [the memorable thing]
Fonts: [what you chose and why]
Palette: [colors and what they evoke]

This is pure design — nothing is wired to the system yet.
Tell me what you like, what to change, what to push further.
When you're happy, say "convert" and I'll integrate it properly.
```

The user will iterate: "more contrast", "bigger hero", "different font", "add a scroll effect".
Keep refining until they say "convert" or "c'est bon".

## Step 5 — When the user says "convert"

Tell them to run `/design-convert` which will:
1. Analyze everything in the exploration
2. Map colors → our tokens (or propose new tokens)
3. Map components → our ui/ library (or propose new components)
4. Convert to TypeScript strict, cn(), proper imports
5. Propose new components for the playground if something is reusable

## REMEMBER

This is the creative sandbox. The user comes here because they're tired of
generating designs on ChatGPT/Gemini and copy-pasting code. Give them something
that makes them say "putain c'est beau" — not "ok c'est correct".

Show what Claude can REALLY do when the guardrails come off.
