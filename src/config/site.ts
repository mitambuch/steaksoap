/* ═══════════════════════════════════════════════════════════════
   SITE CONFIG — centralized project/client data
   Edit this file ONCE per project.
   Everything else (SEO, footer, OG tags) reads from here.
   ═══════════════════════════════════════════════════════════════ */

import { env } from './env';

export const siteConfig = {
  name: env.APP_NAME,
  url: env.APP_URL,
  repo: 'https://github.com/mitambuch/steaksoap',
  locale: 'en',
  language: 'en',

  // ─── SEO defaults ──────────────────────────────────────────
  title: env.APP_NAME,
  description: `Built with ${env.APP_NAME} — AI-first React starter kit`,
  ogImage: '/images/og-image.jpg',

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
