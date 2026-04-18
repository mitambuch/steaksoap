import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig([
  globalIgnores([
    'dist',
    'node_modules',
    'coverage',
    'test-results',
    'playwright-report',
    // WHY: studio/ is a standalone @steaksoap/studio package with its own tsconfig and
    // lint rules — the root ESLint config is for the React app only.
    'studio',
  ]),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        __APP_VERSION__: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_',
      }],
      'no-unused-vars': 'off',
      'eqeqeq': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-multiple-empty-lines': ['warn', { max: 2 }],
      'comma-dangle': ['warn', 'always-multiline'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',
    },
  },

  // ─── Import boundaries — architecture enforcement ──────────
  // WHY: patterns cover BOTH alias imports (`@features/*`) and relative imports
  // at any depth. Previously we only blocked `../features/*` and `../../features/*`;
  // a `../../../features/*` could slip through. `../**/<layer>/**` matches any
  // number of parent traversals followed by the layer name.
  //
  // ui/ components are pure visual atoms: no business logic, no page imports
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@features/*', '@features/**', '../**/features/*', '../**/features/**'],
            message: 'ui/ components must not import from features/. Move business logic to features/ or hooks/.',
          },
          {
            group: ['@pages/*', '@pages/**', '../**/pages/*', '../**/pages/**'],
            message: 'ui/ components must not import from pages/. Components should be page-agnostic.',
          },
          {
            group: ['@app/*', '@app/**', '../**/app/*', '../**/app/**'],
            message: 'ui/ components must not import from app/. Use props or context instead.',
          },
          {
            group: ['@workbench/*', '@workbench/**', '../**/workbench/*', '../**/workbench/**'],
            message: 'ui/ components must not import from workbench/. Workbench consumes ui/, not the reverse.',
          },
        ],
      }],
    },
  },

  // features/ contain business logic: can use ui/ and lib/, but not pages/ or routes/
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@pages/*', '@pages/**', '../**/pages/*', '../**/pages/**'],
            message: 'features/ must not import from pages/. Pages orchestrate features, not the reverse.',
          },
          {
            group: ['@app/routes/*', '@app/routes/**', '../**/app/routes/*', '../**/app/routes/**'],
            message: 'features/ must not import from routes/. Routes import features, not the reverse.',
          },
          {
            group: ['@workbench/*', '@workbench/**', '../**/workbench/*', '../**/workbench/**'],
            message: 'features/ must not import from workbench/. Workbench is a dev tool, not a dependency.',
          },
        ],
      }],
    },
  },

  // hooks/ are pure logic: no pages, no app, no features, no workbench
  {
    files: ['src/hooks/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@features/*', '@features/**', '../**/features/*', '../**/features/**'],
            message: 'hooks/ must not import from features/. Hooks are consumed by features, not the reverse.',
          },
          {
            group: ['@pages/*', '@pages/**', '../**/pages/*', '../**/pages/**'],
            message: 'hooks/ must not import from pages/.',
          },
          {
            group: ['@app/*', '@app/**', '../**/app/*', '../**/app/**'],
            message: 'hooks/ must not import from app/.',
          },
          {
            group: ['@workbench/*', '@workbench/**', '../**/workbench/*', '../**/workbench/**'],
            message: 'hooks/ must not import from workbench/.',
          },
        ],
      }],
    },
  },

  // workbench/ is a dev tool: no pages, no app (features/ allowed — workbench demos them)
  {
    files: ['src/workbench/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@pages/*', '@pages/**', '../**/pages/*', '../**/pages/**'],
            message: 'workbench/ must not import from pages/.',
          },
          {
            group: ['@app/*', '@app/**', '../**/app/*', '../**/app/**'],
            message: 'workbench/ must not import from app/.',
          },
        ],
      }],
    },
  },

  // ─── Sizing limits (warn only — see .claude/rules/sizing.md) ──
  // Pages: 500 LOC max (warn). Render functions: 150 lines max.
  // Note: pnpm lint uses --max-warnings 0, so warn → blocking in validate.
  // To work past intentionally large files: add an inline eslint-disable
  // comment with a one-line rationale. Re-evaluate after acclimatation.
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: {
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 150, skipBlankLines: true, skipComments: true, IIFEs: true }],
    },
  },
  // Components: 300 LOC max (warn). Per-function 200 (looser than pages —
  // stateful atoms like Modal/Select/Tabs legitimately need more space).
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true, skipComments: true, IIFEs: true }],
    },
  },

  // Config files (vite, vitest, etc.) → Node globals
  {
    files: ['*.config.{ts,js}', 'scripts/**/*.{ts,js}'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // E2E tests (Playwright) → no React rules, Node globals
  {
    files: ['e2e/**/*.{ts,js}'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
])
