# Configure Environment Variables

> The app works without any env vars. All have safe fallbacks.

## Available variables

Check `src/config/env.ts` for the full list. Current defaults:

| Variable | Default | Purpose |
|---|---|---|
| `VITE_APP_NAME` | (project name) | App name in UI and meta tags |
| `VITE_APP_URL` | `http://localhost:5173` | Base URL for SEO |
| `VITE_CLOUDINARY_CLOUD_NAME` | (empty) | Cloudinary image optimization |

## Adding a new env var

> **Security**: Variables prefixed with `VITE_` are embedded in the client bundle
> and visible to anyone. NEVER put secrets (API keys, tokens, passwords) in `VITE_` variables.
> Secrets must stay server-side (edge functions, API routes, backend).

1. **Add to `.env.example`** with a placeholder:

```
VITE_API_BASE_URL=https://api.example.com
```

2. **Add to `src/config/env.ts`** with a fallback:

```ts
export const env = {
  // ... existing vars
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
};
```

3. **Use in your code**:

```ts
import { env } from '@config/env';

if (env.API_BASE_URL) {
  // Use the API base URL
}
```

## Rules

- All client vars **must** start with `VITE_` (Vite requirement)
- **Never** put secrets in `VITE_` vars — they end up in the client bundle
- **Always** provide a fallback so the app doesn't crash without `.env.local`
- **Document** every var in `.env.example`
- Use `||` (not `??`) when empty string should trigger the fallback
