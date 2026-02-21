#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SETUP — first-run setup script for a new project
   Cross-platform (Windows, macOS, Linux).

   Usage:
     pnpm setup               → full setup
     pnpm setup:update        → pull starter updates
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..');
const run = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

// ─── Colors (works in all terminals) ─────────────────────────
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

console.log(bold('\n  Starter — Setup\n'));

// ─── 1. Check Node version ──────────────────────────────────
const nodeVersion = parseInt(process.version.slice(1));
if (nodeVersion < 20) {
  console.error(red(`  Node.js 20+ required (current: ${process.version})`));
  process.exit(1);
}
console.log(green('  ✓ Node.js ' + process.version));

// ─── 2. Install dependencies ────────────────────────────────
console.log(yellow('\n  → Installing dependencies...'));
run('pnpm install');
console.log(green('  ✓ Dependencies installed'));

// ─── 3. Create .env.local if missing ────────────────────────
const envLocal = resolve(root, '.env.local');
const envExample = resolve(root, '.env.example');

if (!existsSync(envLocal)) {
  copyFileSync(envExample, envLocal);
  console.log(yellow('  → .env.local created from .env.example'));
  console.log(yellow('    Open .env.local and fill in the values!'));
} else {
  console.log(green('  ✓ .env.local already exists'));
}

// ─── 4. Run validate ─────────────────────────────────────────
console.log(yellow('\n  → Validating (lint + typecheck + tests + build)...'));
try {
  run('pnpm validate');
  console.log(green('  ✓ All checks passed!'));
} catch {
  console.error(red('  ✗ Validation failed. Fix the errors above.'));
  process.exit(1);
}

console.log(bold(green('\n  Setup complete. Run pnpm dev to get started.\n')));
