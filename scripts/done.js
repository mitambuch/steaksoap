#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   DONE — structural coherence check
   Verifies project consistency after a work session.

   Usage: pnpm done
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

let warnings = 0;
let errors = 0;

function pass(msg) {
  console.log(`  ${green('✓')} ${msg}`);
}

function warn(msg) {
  warnings++;
  console.log(`  ${yellow('⚠')} ${msg}`);
}

function fail(msg) {
  errors++;
  console.log(`  ${red('✗')} ${msg}`);
}

console.log(`\n  ${bold('steaksoap done')} — structural coherence check\n`);

// ─── 1. Routes ↔ Pages ──────────────────────────────────────
const routesPath = resolve(root, 'src/constants/routes.ts');
const pagesDir = resolve(root, 'src/pages');

if (existsSync(routesPath) && existsSync(pagesDir)) {
  const routesContent = readFileSync(routesPath, 'utf-8');
  // Extract route keys (skip commented lines and NOT_FOUND)
  const routeKeys = [];
  for (const line of routesContent.split('\n')) {
    const match = line.match(/^\s+(\w+):\s*'[^']+'/);
    if (match && !line.trim().startsWith('//') && match[1] !== 'NOT_FOUND') {
      routeKeys.push(match[1]);
    }
  }

  const pageFiles = readdirSync(pagesDir)
    .filter((f) => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'NotFound.tsx');

  let routesMissing = false;
  for (const key of routeKeys) {
    // Convert route key to expected page name (HOME → Home, PLAYGROUND → Playground)
    const expectedPage = key.charAt(0) + key.slice(1).toLowerCase();
    const hasPage = pageFiles.some(
      (f) => f.replace('.tsx', '').toLowerCase() === expectedPage.toLowerCase(),
    );
    if (!hasPage) {
      warn(`Route ${key} has no matching page file in src/pages/`);
      routesMissing = true;
    }
  }
  if (!routesMissing) {
    pass(`All routes have matching page files`);
  }
} else {
  warn('Could not check routes (routes.ts or pages/ not found)');
}

// ─── 2. Pages → Tests ───────────────────────────────────────
if (existsSync(pagesDir)) {
  const pageFiles = readdirSync(pagesDir).filter(
    (f) => f.endsWith('.tsx') && f !== 'index.ts',
  );
  // Pages may have tests in __tests__/ subdirectory or as sibling .test.tsx files
  const pagesTestDir = resolve(pagesDir, '__tests__');
  let pagesWithTests = 0;
  const pagesWithoutTests = [];

  for (const page of pageFiles) {
    const baseName = page.replace('.tsx', '');
    const testAsSibling = resolve(pagesDir, `${baseName}.test.tsx`);
    const testInDir = pagesTestDir
      ? resolve(pagesTestDir, `${baseName}.test.tsx`)
      : null;

    if (
      existsSync(testAsSibling) ||
      (testInDir && existsSync(testInDir))
    ) {
      pagesWithTests++;
    } else {
      pagesWithoutTests.push(baseName);
    }
  }

  if (pagesWithoutTests.length === 0) {
    pass(`All pages have tests (${pagesWithTests}/${pageFiles.length})`);
  } else {
    warn(
      `Pages without tests: ${pagesWithoutTests.join(', ')} (${pagesWithTests}/${pageFiles.length})`,
    );
  }
}

// ─── 3. UI Components → Tests ───────────────────────────────
const uiDir = resolve(root, 'src/components/ui');
const uiTestDir = resolve(uiDir, '__tests__');

if (existsSync(uiDir)) {
  const uiFiles = readdirSync(uiDir).filter(
    (f) => f.endsWith('.tsx') && f !== 'index.ts',
  );
  let uiWithTests = 0;
  const uiWithoutTests = [];

  for (const comp of uiFiles) {
    const baseName = comp.replace('.tsx', '');
    const testPath = resolve(uiTestDir, `${baseName}.test.tsx`);
    const testAsSibling = resolve(uiDir, `${baseName}.test.tsx`);

    if (existsSync(testPath) || existsSync(testAsSibling)) {
      uiWithTests++;
    } else {
      uiWithoutTests.push(baseName);
    }
  }

  if (uiWithoutTests.length === 0) {
    pass(`All UI components have tests (${uiWithTests}/${uiFiles.length})`);
  } else {
    warn(
      `UI components without tests: ${uiWithoutTests.join(', ')} (${uiWithTests}/${uiFiles.length})`,
    );
  }
}

// ─── 4. Env vars declared in env.ts ─────────────────────────
const envTsPath = resolve(root, 'src/config/env.ts');

if (existsSync(envTsPath)) {
  const envTsContent = readFileSync(envTsPath, 'utf-8');

  // Find all VITE_* usages in src/
  try {
    let grepResult = '';
    try {
      grepResult = execSync(
        'grep -roh "import\\.meta\\.env\\.VITE_[A-Z_]*" src/ --include="*.ts" --include="*.tsx"',
        { cwd: root, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] },
      );
    } catch {
      // grep returns exit code 1 if no matches — that's OK
    }

    const envVars = [
      ...new Set(
        grepResult
          .split('\n')
          .filter(Boolean)
          .map((line) => line.replace('import.meta.env.', '')),
      ),
    ];

    let undeclared = false;
    for (const v of envVars) {
      if (!envTsContent.includes(v)) {
        warn(`Env var ${v} used in src/ but not declared in src/config/env.ts`);
        undeclared = true;
      }
    }
    if (!undeclared && envVars.length > 0) {
      pass('All env vars declared in env.ts');
    }
  } catch {
    warn('Could not scan for env var usage');
  }
}

// ─── 5. No .tsx files directly in src/ ──────────────────────
const srcDir = resolve(root, 'src');
const topLevelTsx = readdirSync(srcDir).filter((f) => f.endsWith('.tsx'));

if (topLevelTsx.length === 0) {
  pass('No files outside allowed directories');
} else {
  for (const file of topLevelTsx) {
    // main.tsx is an exception (Vite entry point)
    if (file === 'main.tsx') continue;
    warn(`src/${file} should be in a subdirectory (pages/, components/, etc.)`);
  }
  if (topLevelTsx.every((f) => f === 'main.tsx')) {
    pass('No files outside allowed directories');
  }
}

// ─── 6. Orphan imports ──────────────────────────────────────
try {
  let grepResult = '';
  try {
    grepResult = execSync(
      "grep -roh \"from '@[^']*'\" src/ --include=\"*.ts\" --include=\"*.tsx\"",
      { cwd: root, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] },
    );
  } catch {
    // grep returns exit code 1 if no matches
  }

  const aliasMap = {
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

  const imports = [
    ...new Set(
      grepResult
        .split('\n')
        .filter(Boolean)
        .map((line) => line.replace("from '", '').replace("'", '')),
    ),
  ];

  let orphanCount = 0;
  for (const imp of imports) {
    // Find matching alias
    const alias = Object.keys(aliasMap).find((a) => imp.startsWith(a));
    if (!alias) continue;

    const relativePath = imp.replace(alias, aliasMap[alias]);
    const candidates = [
      resolve(root, `${relativePath}.ts`),
      resolve(root, `${relativePath}.tsx`),
      resolve(root, `${relativePath}/index.ts`),
      resolve(root, `${relativePath}/index.tsx`),
    ];

    if (!candidates.some((c) => existsSync(c))) {
      warn(`Orphan import: ${imp} does not resolve to an existing file`);
      orphanCount++;
    }
  }

  if (orphanCount === 0) {
    pass('No orphan imports detected');
  }
} catch {
  warn('Could not scan for orphan imports');
}

// ─── 7. pnpm validate ───────────────────────────────────────
console.log(`\n  ${dim('Running pnpm validate...')}\n`);
try {
  execSync('pnpm validate', { cwd: root, stdio: 'inherit' });
  console.log('');
  pass('pnpm validate passes');
} catch {
  console.log('');
  fail('pnpm validate failed — fix errors above');
}

// ─── Summary ─────────────────────────────────────────────────
console.log('');
if (errors > 0) {
  console.log(
    `  ${red(`Done! ${errors} error(s) and ${warnings} warning(s) found.`)}`,
  );
  process.exit(1);
} else if (warnings > 0) {
  console.log(`  ${yellow(`Done! ${warnings} warning(s) found.`)}`);
} else {
  console.log(`  ${green('Done! All checks passed.')}`);
}
console.log('');
