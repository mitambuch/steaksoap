#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   DOCTOR — environment health check
   Verifies that the development environment is correctly set up.

   Usage: pnpm doctor
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

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

console.log(`\n  ${bold('steaksoap doctor')}\n`);

// ─── Node.js version ─────────────────────────────────────────
const nodeVersion = parseInt(process.version.slice(1));
if (nodeVersion >= 20) {
  pass(`Node ${process.version} (required: >=20)`);
} else {
  fail(`Node ${process.version} — version 20+ required`);
}

// ─── pnpm version ────────────────────────────────────────────
try {
  const pnpmVersion = execSync('pnpm --version', { encoding: 'utf-8' }).trim();
  const pnpmMajor = parseInt(pnpmVersion);
  if (pnpmMajor >= 9) {
    pass(`pnpm ${pnpmVersion} (required: >=9)`);
  } else {
    fail(`pnpm ${pnpmVersion} — version 9+ required`);
  }
} catch {
  fail('pnpm not found — install it: npm install -g pnpm');
}

// ─── TypeScript strict mode ──────────────────────────────────
const tsconfigPath = resolve(root, 'tsconfig.json');
if (existsSync(tsconfigPath)) {
  try {
    const tsconfig = readFileSync(tsconfigPath, 'utf-8');
    if (tsconfig.includes('"strict"') && tsconfig.includes('true')) {
      pass('TypeScript strict: enabled');
    } else {
      warn('TypeScript strict mode not detected in tsconfig.json');
    }
  } catch {
    warn('Could not read tsconfig.json');
  }
} else {
  fail('tsconfig.json not found');
}

// ─── ESLint configuration ────────────────────────────────────
const eslintConfig = resolve(root, 'eslint.config.js');
if (existsSync(eslintConfig)) {
  pass('ESLint: configured (flat config)');
} else {
  warn('eslint.config.js not found');
}

// ─── Husky ───────────────────────────────────────────────────
const huskyDir = resolve(root, '.husky');
if (existsSync(huskyDir)) {
  pass('Husky: active (hooks installed)');
} else {
  warn('.husky/ directory not found — run: pnpm prepare');
}

// ─── Git working tree ────────────────────────────────────────
try {
  const gitStatus = execSync('git status --porcelain', {
    cwd: root,
    encoding: 'utf-8',
  }).trim();
  if (gitStatus === '') {
    pass('Git: clean working directory');
  } else {
    const fileCount = gitStatus.split('\n').length;
    warn(`Git: ${fileCount} uncommitted change(s)`);
  }
} catch {
  warn('Git not available or not a git repository');
}

// ─── .env.local ──────────────────────────────────────────────
const envLocal = resolve(root, '.env.local');
if (existsSync(envLocal)) {
  pass('.env.local: found');
} else {
  warn('.env.local: not found (optional — app works without it)');
}

// ─── Summary ─────────────────────────────────────────────────
console.log('');
if (errors > 0) {
  console.log(`  ${red(`✗ ${errors} error(s) found — fix them before continuing`)}`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`  ${yellow(`⚠ ${warnings} warning(s) — all checks passed`)}`);
} else {
  console.log(`  ${green('✓ All checks passed')}`);
}
console.log('');
