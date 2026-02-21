#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   UPDATE — pull updates from the starter template
   Cross-platform (Windows, macOS, Linux).

   This script:
   1. Adds the starter repo as "template" remote (if not already done)
   2. Fetches the latest changes
   3. Merges the template's main branch into the project

   If there are conflicts, resolve them manually then git commit.

   Usage:
     pnpm setup:update
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'child_process';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..');
const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

const TEMPLATE_REMOTE = 'template';
const TEMPLATE_URL = 'https://github.com/Mircooo/starter.git';

// ─── Colors ──────────────────────────────────────────────────
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

console.log(bold('\n  Starter — Update from template\n'));

// ─── 1. Check working tree is clean ─────────────────────────
const status = run('git status --porcelain');
if (status) {
  console.error(red('  ✗ Working tree not clean. Commit or stash your changes.'));
  process.exit(1);
}
console.log(green('  ✓ Working tree clean'));

// ─── 2. Add template remote if needed ───────────────────────
const remotes = run('git remote');
if (!remotes.split('\n').includes(TEMPLATE_REMOTE)) {
  console.log(yellow(`  → Adding remote "${TEMPLATE_REMOTE}"...`));
  run(`git remote add ${TEMPLATE_REMOTE} ${TEMPLATE_URL}`);
  console.log(green(`  ✓ Remote "${TEMPLATE_REMOTE}" added`));
} else {
  console.log(green(`  ✓ Remote "${TEMPLATE_REMOTE}" already exists`));
}

// ─── 3. Fetch latest from template ──────────────────────────
console.log(yellow('  → Fetching updates...'));
runVisible(`git fetch ${TEMPLATE_REMOTE}`);
console.log(green('  ✓ Fetch OK'));

// ─── 4. Merge template/main ─────────────────────────────────
console.log(yellow('  → Merging template/main...'));
try {
  runVisible(`git merge ${TEMPLATE_REMOTE}/main --no-edit`);
  console.log(green('\n  ✓ Update complete!'));
} catch {
  console.log(yellow('\n  ⚠ Conflicts detected. Resolve them manually then:'));
  console.log(yellow('    git add . && git commit'));
}

// ─── 5. Reinstall deps (versions may have changed) ──────────
console.log(yellow('\n  → Updating dependencies...'));
runVisible('pnpm install');
console.log(green('  ✓ Dependencies up to date'));

console.log(bold(green('\n  Update complete.\n')));
