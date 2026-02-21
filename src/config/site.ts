/* ═══════════════════════════════════════════════════════════════
   SITE CONFIG — centralized project/client data
   Edit this file ONCE per project.
   Everything else (SEO, footer, OG tags) reads from here.
   ═══════════════════════════════════════════════════════════════ */

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
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
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
