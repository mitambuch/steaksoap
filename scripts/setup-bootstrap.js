#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SETUP BOOTSTRAP — ensures dependencies exist before setup
   Runs pnpm install if node_modules is missing, then launches
   the real setup wizard.

   Usage: node scripts/setup-bootstrap.js [--update] [--yes] [--check]
   --check: only remind user to run setup if project is unconfigured

   NOTE: The base package name is also checked in setup.js (BASE_PACKAGE_NAME).
   Keep both in sync if the canonical base project is renamed.
   ═══════════════════════════════════════════════════════════════ */

import { execFileSync, execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const nodeModules = resolve(root, 'node_modules');

// WHY: --check mode is used by postinstall to remind user without launching wizard
// Launching an interactive wizard in postinstall would break CI/CD pipelines
const isCheckMode = process.argv.includes('--check');

if (isCheckMode) {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));
  if (pkg.name === 'steaksoap') {
    console.log('\n  \x1b[33m⚡ Fresh clone detected.\x1b[0m Run \x1b[1mpnpm setup\x1b[0m to initialize your project.\n');
  }
  process.exit(0);
}

if (!existsSync(nodeModules)) {
  console.log('\n  Dependencies not found — installing...\n');
  execSync('pnpm install', { cwd: root, stdio: 'inherit' });
}

// WHY: execFileSync prevents shell injection from crafted argv values
execFileSync('node', ['scripts/setup.js', ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit',
});
