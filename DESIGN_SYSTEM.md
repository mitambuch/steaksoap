# DESIGN SYSTEM — steaksoap

## Palette

| Name       | Token       | Dark Mode | Light Mode | Usage                          |
|------------|-------------|-----------|------------|--------------------------------|
| **Accent** | `accent`    | #D4FF00   | #D4FF00    | CTAs, hovers, tags, highlights |
| **BG**     | `bg`        | #0A0A0A   | #D8D8D0    | Page background                |
| **FG**     | `fg`        | #F0F0F0   | #1A1A1A    | Primary text                   |
| **Muted**  | `muted`     | #666666   | #5C5C56    | Secondary text, labels         |
| **Surface**| `surface`   | #141414   | #C8C8C0    | Cards, elevated elements       |
| **Border** | `border`    | #262626   | #B8B8B0    | Dividers, card borders         |

## Typography

| Style        | Classes                                                 | Usage            |
|--------------|---------------------------------------------------------|------------------|
| Display XL   | `text-5xl md:text-7xl font-bold`                        | Hero headlines   |
| Display L    | `text-4xl md:text-6xl font-medium`                      | Page titles      |
| Heading      | `text-2xl md:text-4xl font-medium`                      | Section titles   |
| Body         | `text-base md:text-xl leading-relaxed`                  | Paragraphs       |
| Label        | `text-xs font-bold uppercase tracking-widest`           | Buttons, CTAs    |
| Mono Micro   | `font-mono text-[10px] uppercase tracking-widest`       | UI, metadata     |

Font family: **Space Grotesk** (sans), **JetBrains Mono** (mono).

## Components

- **Buttons**: Capsule shape (`rounded-full`), backdrop-blur on secondary
- **Tags**: Compact (`rounded-sm`), accent bg for role, outline for skill
- **Cards**: Subtle border, `duration-500` transitions, optional `hover:scale-[1.02]`
- **Borders**: `border-white/10` feel in dark, `border-black/20` feel in light (via tokens)

## Icons

Library: **Lucide React** (lucide.dev)

Usage:
```tsx
import { ArrowRight, Zap, Copy, Sun, Moon } from 'lucide-react';

<ArrowRight size={14} />
<Zap size={16} className="text-accent" />
```

Rules:
- Size 14 for inline (buttons, labels)
- Size 16-20 for standalone
- Size 24 for large/hero
- Always use `text-current` or token colors, never hardcode icon color
- Use `strokeWidth={1.5}` for a lighter, more elegant feel (classe2 style)

## Rules

- Accent `#D4FF00` is the SAME in dark and light mode
- No uppercase on main titles — lowercase or capitalize only
- Transitions are slow and cinematic (0.5s interactions, 1.5s theme switch)
- Labels and micro text always mono, uppercase, wide tracking
