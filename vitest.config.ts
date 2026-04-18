// WHY: Extends vite.config.ts via mergeConfig to avoid duplicating aliases.
// vite.config.ts is the single source of truth for resolve.alias.

import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfigFn from './vite.config';

const viteResolved = viteConfigFn({ mode: 'test', command: 'serve' });

export default mergeConfig(
  viteResolved,
  defineConfig({
    define: {
      __APP_VERSION__: JSON.stringify('0.0.0-test'),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      exclude: ['e2e/**', 'node_modules/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'text-summary', 'html'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.test.{ts,tsx}',
          'src/**/__tests__/**',
          'src/test/**',
          'src/vite-env.d.ts',
          'src/main.tsx',
          'src/config/i18n.ts', // WHY: side-effect i18next singleton init — not meaningfully unit-testable
        ],
        // WHY: Thresholds ratchet UP only — lock current coverage so it never decreases.
        // Set ~1–2 pts below the last-observed run (90.15/81.26/90.76/92.37 as of v5.2.0)
        // so minor per-run jitter doesn't break CI while a real drop is caught.
        thresholds: {
          statements: 88,
          branches: 80,
          functions: 89,
          lines: 91,
        },
      },
    },
  }),
);
