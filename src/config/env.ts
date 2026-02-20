/* ═══════════════════════════════════════════════════════════════
   ENV — validation des variables d'environnement au démarrage
   En production, les variables manquantes font crasher l'app
   immédiatement avec un message clair.
   En développement, des valeurs placeholder sont utilisées
   pour que l'app démarre toujours, même sans .env.local.
   ═══════════════════════════════════════════════════════════════ */

function requireEnv(key: string, devFallback?: string): string {
  const value = import.meta.env[key];
  if (value) return value;

  if (import.meta.env.DEV && devFallback !== undefined) {
    console.warn(
      `[env] Missing ${key} — using dev fallback.\n` +
        `→ Run "pnpm setup" or copy .env.example to .env.local`,
    );
    return devFallback;
  }

  throw new Error(
    `[env] Missing required environment variable: ${key}\n` +
      `→ Copy .env.example to .env.local and fill in the values.`,
  );
}

export const env = {
  CLOUDINARY_CLOUD_NAME: requireEnv('VITE_CLOUDINARY_CLOUD_NAME', 'placeholder'),
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Starter',
  APP_URL: import.meta.env.VITE_APP_URL ?? 'http://localhost:5173',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
