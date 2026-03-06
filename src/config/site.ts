/* ═══════════════════════════════════════════════════════════════
   SITE CONFIG — SEO, contact, and social data
   Edit this file ONCE per project.
   SeoHead, Footer, and OG tags read from here.
   Navigation lives in Header.tsx (needs icons + routes).
   ═══════════════════════════════════════════════════════════════ */

import { env } from './env';

export const siteConfig = {
  name: env.APP_NAME,
  url: env.APP_URL,
  locale: 'en',
  language: 'en',

  // ─── SEO defaults ──────────────────────────────────────────
  title: env.APP_NAME,
  description: 'A modern React application',
  ogImage: '', // Add your OG image to public/images/ and update this path

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
