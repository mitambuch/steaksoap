// WHY: Centralized path constants — done.js and setup.js share these paths.
// Single source of truth prevents drift between scripts.

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');

export const PATHS = {
  root,
  src: resolve(root, 'src'),
  pages: resolve(root, 'src/pages'),
  components: resolve(root, 'src/components'),
  componentsUI: resolve(root, 'src/components/ui'),
  features: resolve(root, 'src/features'),
  hooks: resolve(root, 'src/hooks'),
  config: resolve(root, 'src/config'),
  constants: resolve(root, 'src/constants'),
  routes: resolve(root, 'src/constants/routes.ts'),
  routesConfig: resolve(root, 'src/app/routes/index.tsx'),
  envConfig: resolve(root, 'src/config/env.ts'),
  siteConfig: resolve(root, 'src/config/site.ts'),
  indexCSS: resolve(root, 'src/index.css'),
};

// MUST stay in sync with vite.config.ts resolve.alias and tsconfig.json paths
export const ALIASES = {
  '@': 'src',
  '@app': 'src/app',
  '@components': 'src/components',
  '@hooks': 'src/hooks',
  '@pages': 'src/pages',
  '@context': 'src/context',
  '@data': 'src/data',
  '@utils': 'src/utils',
  '@constants': 'src/constants',
  '@styles': 'src/styles',
  '@config': 'src/config',
  '@features': 'src/features',
  '@workbench': 'src/workbench',
  '@lib': 'src/lib',
};
