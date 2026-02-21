/* ═══════════════════════════════════════════════════════════════
   ROUTES — single source of truth for all URLs
   Always use these constants, never hardcode strings.
   ═══════════════════════════════════════════════════════════════ */

export const ROUTES = {
  HOME: '/',
  // Add routes as the project grows:
  // ABOUT:   '/about',
  // PROJECT: '/projects/:slug',
  NOT_FOUND: '*',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
