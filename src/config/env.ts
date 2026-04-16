/* ═══════════════════════════════════════════════════════════════
   ENV — environment variable access with safe fallbacks
   Dev: everything has a fallback so the app always starts.
   Prod: VITE_APP_URL is enforced at BUILD time in vite.config.ts for
   initialized client projects. This runtime warn is the last-line guard
   for the base template + any edge case that bypasses the build check.
   ═══════════════════════════════════════════════════════════════ */

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
