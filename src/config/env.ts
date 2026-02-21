/* ═══════════════════════════════════════════════════════════════
   ENV — environment variable access with safe fallbacks
   Every variable has a fallback so the app always starts,
   even without .env.local. No build crashes, no mandatory config.
   ═══════════════════════════════════════════════════════════════ */

export const env = {
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? '',
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Starter',
  APP_URL: import.meta.env.VITE_APP_URL ?? 'http://localhost:5173',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
