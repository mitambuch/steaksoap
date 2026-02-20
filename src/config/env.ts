/* ═══════════════════════════════════════════════════════════════
   ENV — validation des variables d'environnement au démarrage
   Si une variable requise manque, l'app crash immédiatement
   avec un message clair au lieu d'un bug mystérieux plus tard.
   ═══════════════════════════════════════════════════════════════ */

function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(
      `[env] Missing required environment variable: ${key}\n` +
        `→ Copy .env.example to .env.local and fill in the values.`,
    );
  }
  return value;
}

export const env = {
  CLOUDINARY_CLOUD_NAME: requireEnv('VITE_CLOUDINARY_CLOUD_NAME'),
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Starter',
  APP_URL: import.meta.env.VITE_APP_URL ?? 'http://localhost:5173',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
