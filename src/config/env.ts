/* ═══════════════════════════════════════════════════════════════
   ENV — environment variable access with safe fallbacks
   Dev: everything has a fallback so the app always starts.
   Prod: VITE_APP_URL is required — prevents localhost in canonical/OG/sitemap.
   ═══════════════════════════════════════════════════════════════ */

// WHY: in prod, localhost in canonical URLs and OG tags is a silent SEO/social disaster
if (import.meta.env.PROD && !import.meta.env.VITE_APP_URL) {
  throw new Error(
    '[env] VITE_APP_URL is required in production. Set it in .env.local or your deploy config.',
  );
}

export const env = {
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Project',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
