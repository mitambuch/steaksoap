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
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  const isAnalyze = process.env.ANALYZE === 'true';

  return {
    plugins: [
      tailwindcss(),
      react(),
      // Sitemap + robots.txt only in production build (not in dev/preview)
      isProd &&
        Sitemap({
          // WHY: no fallback in prod — prevents localhost sitemap (env.ts throws if missing)
          hostname: env.VITE_APP_URL || 'http://localhost:5173',
          // SPA : ajouter ici les routes client-side quand le projet grandit
          // dynamicRoutes: ['/about', '/contact'],
          exclude: ['/404'],
          generateRobotsTxt: true,
        }),
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

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@app': resolve(__dirname, './src/app'),
        '@components': resolve(__dirname, './src/components'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@pages': resolve(__dirname, './src/pages'),
        '@context': resolve(__dirname, './src/context'),
        '@data': resolve(__dirname, './src/data'),
        '@utils': resolve(__dirname, './src/utils'),
        '@constants': resolve(__dirname, './src/constants'),
        '@styles': resolve(__dirname, './src/styles'),
        '@config': resolve(__dirname, './src/config'),
        '@features': resolve(__dirname, './src/features'),
        '@workbench': resolve(__dirname, './src/workbench'),
        '@lib': resolve(__dirname, './src/lib'),
      },
    },

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
