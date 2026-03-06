# DESIGN SYSTEM

> **Single source of truth: `src/index.css`** — this document is a human-readable summary.
> All tokens below are defined in the `@theme` block. Change them there, they propagate everywhere.

## Palette

| Name       | Token       | Dark Mode | Light Mode | Usage                          |
|------------|-------------|-----------|------------|--------------------------------|
| **Accent** | `accent`    | #c44040   | #c44040    | CTAs, hovers, tags, highlights |
| **BG**     | `bg`        | #0A0A0A   | #B0B0A8    | Page background                |
| **FG**     | `fg`        | #F0F0F0   | #1A1A1A    | Primary text                   |
| **Muted**  | `muted`     | #8A8A8A   | #4A4A44    | Secondary text, labels         |
| **Surface**| `surface`   | #141414   | #A4A49C    | Cards, elevated elements       |
| **Border** | `border`    | #262626   | #96968E    | Dividers, card borders         |
| **Success**| `success`   | #6AFF8A   | #00C853    | Success states, confirmations  |
| **Warning**| `warning`   | #FFD60A   | #E6A800    | Warnings, caution              |
| **Danger** | `danger`    | #DC2626   | #B91C1C    | Errors, destructive actions    |
| **Info**   | `info`      | #52B0FF   | #1E88E5    | Informational, links           |
| **On-Accent** | `on-accent` | #0A0A0A | #0A0A0A  | Text on accent backgrounds     |

## Durations

| Token          | Value  | Tailwind class       | Usage                       |
|----------------|--------|----------------------|-----------------------------|
| `duration-fast`| 150ms  | `duration-fast`      | Micro-interactions, toggles |
| `duration-base`| 300ms  | `duration-base`      | Standard transitions        |
| `duration-slow`| 500ms  | `duration-slow`      | Cards, emphasis             |
| `duration-cinematic`| 700ms | `duration-cinematic` | Hero elements, dramatic |

Theme switch uses a dedicated 1.5s transition (`.transition-theme` class).

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
- **Cards**: Subtle border, `duration-slow` transitions, optional `hover:scale-[1.02]`
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

- Accent `#c44040` is the SAME in dark and light mode
- No uppercase on main titles — lowercase or capitalize only
- Use duration tokens (`duration-base`, `duration-slow`), never raw values (`duration-300`)
- Labels and micro text always mono, uppercase, wide tracking
