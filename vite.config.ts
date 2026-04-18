import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
const isBaseProject = pkg._baseProject === true;

// WHY: tsconfig.json is the single source of truth for path aliases.
// Stripping JSON comments here keeps us dep-free (no jsonc parser needed).
const tsconfigRaw = readFileSync(resolve(__dirname, 'tsconfig.json'), 'utf-8');
const tsconfig = JSON.parse(
  tsconfigRaw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''),
);
const tsPaths: Record<string, string[]> = tsconfig.compilerOptions?.paths ?? {};
const alias = Object.fromEntries(
  Object.entries(tsPaths).map(([key, [target]]) => [
    key.replace(/\/\*$/, ''),
    resolve(__dirname, (target ?? '').replace(/\/\*$/, '')),
  ]),
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  const isAnalyze = process.env.ANALYZE === 'true';

  // WHY: production builds on initialized client projects MUST have VITE_APP_URL.
  // Without it, sitemap.xml + canonical tags + OG unfurls point at localhost —
  // silently tanking SEO and social previews on deployed client sites.
  // The base template itself is allowed to build without VITE_APP_URL — it has
  // _baseProject: true in package.json (removed during `pnpm setup` for clients).
  if (isProd && !isBaseProject && !env.VITE_APP_URL) {
    throw new Error(
      '✗ VITE_APP_URL is required for production builds on initialized projects.\n' +
        '  Set it in .env.local or your deploy environment (e.g. VITE_APP_URL=https://yoursite.com).\n' +
        '  Reason: canonical URLs, OG tags, and sitemap.xml must not fall back to localhost.',
    );
  }

  return {
    plugins: [
      tailwindcss(),
      react(),
      // Sitemap + robots.txt only in production build (not in dev/preview)
      isProd &&
        (() => {
          // WHY: initialized client prod builds throw above if VITE_APP_URL is
          // missing. The fallback below only ever runs on the base template
          // (isBaseProject = true), where a localhost sitemap is harmless.
          //
          // Multi-locale sitemap: emit every canonical path under each locale
          // prefix (i18n-sanity.md lesson #7). Must stay in sync with
          // SUPPORTED_LOCALES from src/config/i18n.ts.
          const LOCALES = ['fr', 'de', 'en'] as const;
          const PATHS = ['', '/playground', '/lab'] as const;
          const dynamicRoutes = LOCALES.flatMap(l => PATHS.map(p => `/${l}${p}`));
          return Sitemap({
            hostname: env.VITE_APP_URL || 'http://localhost:5173',
            dynamicRoutes,
            exclude: ['/', '/playground', '/lab', '/404'],
            generateRobotsTxt: true,
          });
        })(),
      isAnalyze &&
        visualizer({
          filename: 'stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ],

    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },

    resolve: { alias },

    build: {
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/react-router')) {
              return 'vendor-router';
            }
          },
        },
      },
    },
  };
});
