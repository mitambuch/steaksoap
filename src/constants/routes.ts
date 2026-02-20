/* ═══════════════════════════════════════════════════════════════
   ROUTES — source de vérité pour toutes les URLs
   Toujours utiliser ces constantes, jamais des strings en dur.
   ═══════════════════════════════════════════════════════════════ */

export const ROUTES = {
  HOME: '/',
  // Ajouter les routes au fil du projet :
  // ABOUT:   '/about',
  // PROJECT: '/projects/:slug',
  NOT_FOUND: '*',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
