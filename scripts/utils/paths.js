// WHY: Centralized path constants — done.js and setup.js share these paths.
// Single source of truth prevents drift between scripts.

import { resolve } from 'node:path';

const root = process.cwd();

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

export const ALIASES = {
  '@components': 'src/components',
  '@hooks': 'src/hooks',
  '@pages': 'src/pages',
  '@utils': 'src/utils',
  '@config': 'src/config',
  '@features': 'src/features',
  '@constants': 'src/constants',
  '@context': 'src/context',
  '@lib': 'src/lib',
};
