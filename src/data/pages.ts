/* ═══════════════════════════════════════════════════════════════
   PAGE CONTENT — all user-facing text in one place.
   Edit this file to change page copy without touching components.
   ═══════════════════════════════════════════════════════════════ */

// WHY: __APP_VERSION__ is injected by vite.config.ts `define` from
// package.json at build time — so every release auto-bumps the tagline
// shown on /, and steaksoap.app never drifts from the current tag.
export const homePage = {
  seo: {},
  tagline: `v${__APP_VERSION__} — production ready`,
  headline: 'Build something great.',
  subline: "Clean slate, zero bloat. Everything you need, nothing you don't.\nLet's go.",
};

export const labPage = {
  seo: {
    title: 'Lab',
    description: 'Experimental prototyping space.',
  },
  headline: 'Lab',
  subline: 'Prototype ideas here. This page is your sandbox for experiments.',
};

export const playgroundPage = {
  seo: {
    title: 'playground',
    description: 'design system devkit — all components, tokens, and typography.',
  },
  label: 'design system',
  headline: 'devkit',
  subline:
    'every token, every component, every pattern. click any chip to copy. scroll down for ready-to-use modules.',
};

export const notFoundPage = {
  seo: {
    title: '404',
    description: 'Page not found.',
  },
  headline: '404',
  subline: 'Page not found.',
  cta: 'Back to home',
};
