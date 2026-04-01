/* ═══════════════════════════════════════════════════════════════
   ENV — environment variable access with safe fallbacks
   Dev: everything has a fallback so the app always starts.
   Prod: VITE_APP_URL is required — prevents localhost in canonical/OG/sitemap.
   ═══════════════════════════════════════════════════════════════ */

// WHY: in prod, localhost in canonical URLs and OG tags is a silent SEO/social disaster.
// The base template (initialized: false) is allowed to run without it — client projects are not.
if (import.meta.env.PROD && !import.meta.env.VITE_APP_URL) {
  console.warn(
    '[env] VITE_APP_URL not set in production — canonical URLs and OG tags will use localhost. Set it in .env.local or your deploy config.',
  );
}

export const env = {
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Project',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
