# /design

Create distinctive, production-grade pages and sections using the steaksoap design system.
Inspired by Anthropic's Frontend Design Skill — adapted for our token system, components, and workflow.

## Arguments
$ARGUMENTS — Natural language description of what to design. Examples:
- "hero section for a Volvo garage in Neuchatel, nordic premium vibe"
- "pricing page with 3 tiers, luxury automotive feel"
- "contact section with map placeholder, clean and minimal"
- "services grid for a restaurant, warm and inviting"

## Phase 1 --- Design Thinking (BEFORE any code)

### 0. Load context (CHECK FIRST)
Read CLAUDE.md for `## Design Direction` and `## Composition Rules`.

**If they exist** (written by /brief):
- Skip questions 1 and 2 below --- the answers are already there.
- Use Design Direction for vibe/aesthetic, Composition Rules for layout decisions.
- Confirm briefly: "Brief says [Personality line]. I'm designing with that in mind."

**If they do NOT exist**: ask questions 1 and 2 as usual.

### 1. Context (skip if brief exists)
- **Who visits?** (age, expectations, device --- most vitrine visitors are on mobile)
- **What's the goal?** (book appointment, call, see services, get directions)
- **What's the vibe?** (the client's brand personality)

### 2. Aesthetic Direction (skip if brief exists)
Pick ONE clear direction and commit fully. Don't be generic. Examples:
- Brutalist / raw / industrial
- Luxury / refined / editorial
- Warm / organic / artisanal
- Nordic / minimal / spacious
- Retro-futuristic / bold / geometric
- Playful / colorful / energetic

**CRITICAL**: Every client site must feel UNIQUE. Never produce the same layout twice.
Never default to safe, predictable choices. The user comes here because ChatGPT and Gemini
produce generic AI slop --- we don't.

### 3. The Memorable Thing
What's the ONE detail someone will remember about this page?
- An unexpected animation on scroll?
- A dramatic typography choice?
- An asymmetric layout that breaks the grid?
- A creative use of the accent color?
- An immersive full-screen hero?

State it explicitly before coding.

### 4. Mobile Strategy
For EVERY visual element, classify:
- **KEEP**: works on both (color transitions, typography)
- **SIMPLIFY**: reduce on mobile (animations, particle counts)
- **REPLACE**: different interaction (hover → tap)
- **DISABLE**: desktop-only with fallback (custom cursor, parallax)

## Phase 2 — Design System Integration

Read the current design system before coding:

```bash
grep -A 80 "@theme" src/index.css
ls src/components/ui/
```

### Mandatory Rules
- **Token-first**: NEVER hardcode colors. Use bg-bg, text-fg, text-accent, text-muted, bg-surface, border-border
- **Reuse-first**: check src/components/ui/ BEFORE creating anything new
- **cn()**: ALL className merging via cn() from @utils/cn
- **Accent consistency**: accent color is IDENTICAL in dark and light mode (read from @theme). Never change it per theme.
- **Duration tokens**: Use duration-fast, duration-base, duration-slow, duration-cinematic. Never raw ms values.
- **Responsive**: Mobile-first. Design for 320px, enhance at md: and lg:

### Typography DNA
- Display fonts: read from @theme --font-family-sans --- hero headlines
- Mono micro: `font-mono text-[10px] uppercase tracking-widest` --- labels, metadata
- No aggressive UPPERCASE on titles — prefer lowercase or capitalize
- Pair weight + color for hierarchy, not just size

### Component DNA
- Buttons: capsule (rounded-full), backdrop-blur on secondary
- Cards: subtle border, duration-slow hover, optional scale-[1.02]
- Icons: Lucide React, size 14 inline / 16-20 standalone, strokeWidth 1.5
- Borders: border-border token (white/10 feel dark, black/20 feel light)

## Phase 3 — Creative Execution

### What makes us DIFFERENT from generic AI

| Generic AI slop | What WE do |
|---|---|
| Centered everything, symmetrical | Asymmetric layouts, grid-breaking elements |
| Purple gradients on white | Bold use of accent color with dramatic contrast |
| Inter/Roboto/Arial everywhere | Project font with intentional weight pairing |
| Predictable hero → features → CTA | Narrative flow that tells the client's story |
| Small safe animations | Cinematic reveals, staggered delays, scroll-triggered moments |
| Stock photo grids | Creative image compositions, overlaps, bleeds |
| Cookie-cutter testimonials | Context-specific social proof that fits the brand |

### Animation Strategy
- Prioritize CSS-only: transitions, @keyframes
- One well-orchestrated entrance sequence > scattered micro-interactions
- Use animation-delay for staggered reveals (0.1s increments)
- Scroll-trigger effects: opacity + translateY on intersection
- Hover states that surprise: scale, color shift, reveal hidden elements
- Respect prefers-reduced-motion

### Spatial Composition
- Generous negative space — vitrines breathe
- Section spacing: py-16 mobile, py-24 desktop minimum
- Break the grid intentionally: overlap elements, use negative margins
- Create depth: layered elements, subtle shadows, z-index play
- Full-bleed sections mixed with contained content

## Phase 4 — Implementation

1. **Present the design direction** (2-3 sentences + the memorable thing)
2. **List components to reuse** from src/components/ui/
3. **List new elements** needed (with mobile strategy for each)
4. **Build** with TypeScript, Tailwind tokens, cn(), proper imports
5. **Test responsive** at 320px, 768px, 1024px mentally

### Code Standards
- Named exports, PascalCase files
- SeoHead on every page
- Container for contained sections
- Lazy loading for below-fold images
- Semantic HTML (section, article, nav, header, footer)
- Accessible: focus states, alt text, ARIA where needed

## Phase 5 — Output

Present:
```
DESIGN: [aesthetic direction in 1 sentence]
MEMORABLE: [the one thing people will remember]
REUSING: [components from ui/]
NEW: [new elements created]
MOBILE: [strategy summary]
```

Then the code.

## Remember

You are not a code generator. You are a designer who codes.
Every pixel is a choice. Every transition is intentional.
The user's clients are paying for a site that looks like it was made by a human designer,
not by an AI. Prove them right.
