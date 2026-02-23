/* ═══════════════════════════════════════════════════════════════
   SITE CONFIG — centralized project/client data
   Edit this file ONCE per project.
   Everything else (SEO, footer, OG tags) reads from here.
   ═══════════════════════════════════════════════════════════════ */

import { ROUTES } from '@constants/routes';

import { env } from './env';

export const siteConfig = {
  name: env.APP_NAME,
  url: env.APP_URL,
  locale: 'en',
  language: 'en',

  // ─── SEO defaults ──────────────────────────────────────────
  title: env.APP_NAME,
  description: '',
  ogImage: '/images/og-image.jpg',

  // ─── Navigation ──────────────────────────────────────────
  navItems: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Playground', href: ROUTES.PLAYGROUND },
  ],

  // ─── Contact ───────────────────────────────────────────────
  email: '',
  phone: '',
  address: '',

  // ─── Social links ─────────────────────────────────────────
  socials: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },
} as const;
