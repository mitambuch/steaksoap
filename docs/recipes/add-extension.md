# Add an Extension

steaksoap includes a curated registry of extensions. Use `/discover` or `/install-extension` to add them.

## Using /discover (recommended)

Describe what you need in natural language:

```
You: /discover "I want users to log in"
→ Claude Code finds: Clerk Authentication
→ Shows packages, setup steps, docs
→ Asks: "Want me to install this?"
```

```
You: /discover animations
→ Claude Code finds: Motion (Framer Motion)
```

```
You: /discover 3D
→ Claude Code finds: Three.js + React Three Fiber
```

## Using /install-extension (direct)

If you already know the extension ID:

```
You: /install-extension zustand
→ Claude Code installs zustand, creates store example, validates
```

## Available extensions

| ID | Name | Category |
|---|---|---|
| `three-js` | Three.js + React Three Fiber | frontend |
| `stripe-payments` | Stripe Payments | backend |
| `auth-clerk` | Clerk Authentication | backend |
| `tanstack-query` | TanStack Query | data |
| `zod` | Zod | data |
| `framer-motion` | Motion (Framer Motion) | frontend |
| `i18n` | react-i18next | frontend |
| `mdx-blog` | MDX Blog | content |
| `playwright-e2e` | Playwright E2E Testing | quality |
| `storybook` | Storybook | quality |
| `zustand` | Zustand | data |
| `resend-email` | Resend Email | backend |

## Contributing to the registry

Extensions are defined in `registry/extensions.json`. Each entry has:

```json
{
  "id": "kebab-case-id",
  "name": "Display Name",
  "description": "One-sentence description.",
  "tags": ["keyword1", "keyword2"],
  "category": "frontend | backend | data | content | quality",
  "npm_packages": ["package-name"],
  "setup_instructions": ["Step 1", "Step 2"],
  "references": ["https://docs.example.com"]
}
```

To add a new extension: edit `registry/extensions.json`, validate the JSON, and submit a PR.
