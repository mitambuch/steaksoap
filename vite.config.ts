import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // Sitemap + robots.txt only in production build (not in dev/preview)
    isProd &&
      Sitemap({
        hostname: process.env.VITE_APP_URL || 'http://localhost:5173',
        // SPA : ajouter ici les routes client-side quand le projet grandit
        // dynamicRoutes: ['/about', '/contact'],
        exclude: ['/404'],
        generateRobotsTxt: true,
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
      '@types': resolve(__dirname, './src/types'),
      '@config': resolve(__dirname, './src/config'),
      '@lib': resolve(__dirname, './src/lib'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },

  build: {
    chunkSizeWarningLimit: 500,
  },
});
