# Studio — Sanity Content Studio

Client-agnostic Sanity Studio baseline shipped with the steaksoap starter.
This is where site editors (your clients) go to edit content.

## Setup

1. Create a Sanity project at https://sanity.io/manage
2. Copy the `projectId` + dataset
3. Fill `studio/.env` (see `.env.example`)
4. From the repo root: `pnpm install` (workspace resolves this package)
5. Start the Studio : `pnpm --filter @steaksoap/studio dev` → http://localhost:3333

## What's inside

- **`schemas/objects/locale{String,Text,RichText}.ts`** — multilingual
  text primitives (FR source of truth, DE/EN optional, all in a
  collapsible "Traductions" fieldset).
- **`schemas/documents/siteConfig.ts`** — singleton with site identity,
  navigation, footer, SEO defaults, social links.
- **`schemas/documents/page.ts`** — multi-singleton (one doc per slug:
  home, about, contact as baseline). Groups: Contenu / CTA / SEO / Avancé.
- **`structure/deskStructure.ts`** — 4-section menu: Configuration
  globale · Pages du site · Contenus · (placeholder for collections).
- **`components/Dashboard.tsx`** — landing page tool, introspects schema
  + surfaces alerts / counts / recent activity. Adapts when new types
  land.
- **`components/HelpGuide.tsx`** — 3 baseline step-by-step guides for
  novice editors.
- **`components/StudioLayout.tsx`** — 5 CSS fixes that repair known
  Sanity UX pain points (narrow panel, hidden H2 duplicate, compact
  group tabs, loud Publish button).
- **`tools/{dashboard,helpGuide}Tool.tsx`** — registers Dashboard as
  first tool and Help Guide as last.

## Extending for a client

- **New repeatable entity** (e.g. team) : create
  `schemas/documents/person.ts`, register in `schemas/index.ts`, add a
  list item in `deskStructure.ts` with an emoji icon.
- **New page** : add a slug to `PAGE_IDS` in `deskStructure.ts`.
  Document is auto-created via `studio/scripts/seed-singletons.ts`
  (Phase 4).
- **Brand the Studio** : edit `components/Logo.tsx` with the client's
  wordmark.

Full protocol: `.claude/rules/i18n-sanity.md`.
