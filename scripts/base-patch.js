#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   BASE:PATCH — selective update from upstream base

   Shows new upstream commits and lets you cherry-pick by zone:
   - infrastructure: .claude/, scripts/, config files
   - ui: src/components/ui/, src/components/layout/
   - all: full merge (same as base:update)

   Usage:
     pnpm base:patch              → interactive zone selection
     pnpm base:patch infra        → infrastructure only
     pnpm base:patch ui           → UI components only
     pnpm base:patch all          → full merge
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { PATHS } from './utils/paths.js';

const root = PATHS.root;
const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

const BASE_REPO_OWNER = 'Mircooo';
const BASE_REPO_NAME = 'steaksoap';
const BASE_REMOTE = 'base';
const BASE_URL = `https://github.com/${BASE_REPO_OWNER}/${BASE_REPO_NAME}.git`;

// Zones — paths that belong to each category.
// WHY: external audit (2026-04-16) found the original infra zone missed
// deploy configs (netlify/vercel), release config, and playwright config,
// so "infra" updates silently drifted on client repos. List is now aligned
// with what actually changes on the template side.
const ZONES = {
  infra: [
    '.claude/',
    'scripts/',
    '.github/',
    'eslint.config.js',
    'tsconfig.json',
    'tsconfig.eslint.json',
    'vite.config.ts',
    'vitest.config.ts',
    'playwright.config.ts',
    'commitlint.config.js',
    '.prettierrc',
    '.release-it.json',
    'netlify.toml',
    'vercel.json',
    'lighthouserc.json',
  ],
  ui: [
    'src/components/ui/',
    'src/components/layout/',
    'src/components/features/',
    'src/hooks/',
    'src/utils/',
  ],
};

// Paths NEVER overwritten by base:patch or base:update — client-owned project memory.
// Must stay in sync with scripts/setup.js --update exclusion list.
const PROTECTED = [
  '.claude/memory/decisions/',
  '.claude/memory/feedback/',
  '.claude/memory/patterns/',
  '.claude/memory/frictions/',
  '.claude/memory/sessions/',
  '.claude/memory/INDEX.md',
  '.claude/client.md', // WHY: per-project brand voice consumed by /wire-content — never overwrite
];

const isProtected = (file) => PROTECTED.some((p) => file.startsWith(p));

const zone = process.argv[2] || '';

console.log('\n  Base Patch — selective upstream update\n');

// ─── Pre-checks ─────────────────────────────────────────────
const status = run('git status --porcelain');
if (status) {
  console.error('  ✗ Working tree not clean. Commit or stash first.');
  process.exit(1);
}

// ─── Ensure base remote ─────────────────────────────────────
const remotes = run('git remote').split('\n').filter(Boolean);
if (!remotes.includes(BASE_REMOTE)) {
  console.log(`  → Adding remote "${BASE_REMOTE}"...`);
  run(`git remote add ${BASE_REMOTE} ${BASE_URL}`);
}

// ─── Fetch ──────────────────────────────────────────────────
console.log('  → Fetching upstream...');
runVisible(`git fetch ${BASE_REMOTE}`);

// ─── Show what's new ────────────────────────────────────────
let mergeBase;
try {
  mergeBase = run(`git merge-base HEAD ${BASE_REMOTE}/main`);
} catch {
  console.error('  ✗ Cannot find common ancestor with base/main.');
  process.exit(1);
}

const newCommits = run(
  `git log ${mergeBase}..${BASE_REMOTE}/main --oneline`,
);

if (!newCommits) {
  console.log('  ✓ Already up to date with upstream.\n');
  process.exit(0);
}

console.log(`\n  New upstream commits:\n`);
newCommits.split('\n').forEach((c) => console.log(`    ${c}`));

// ─── Show changed files by zone ─────────────────────────────
const changedFiles = run(
  `git diff ${mergeBase}..${BASE_REMOTE}/main --name-only`,
).split('\n').filter(Boolean);

const infraFiles = changedFiles.filter((f) =>
  ZONES.infra.some((z) => f.startsWith(z)),
);
const uiFiles = changedFiles.filter((f) =>
  ZONES.ui.some((z) => f.startsWith(z)),
);
const otherFiles = changedFiles.filter(
  (f) =>
    !ZONES.infra.some((z) => f.startsWith(z)) &&
    !ZONES.ui.some((z) => f.startsWith(z)),
);

console.log(`\n  Changed files by zone:`);
console.log(`    infra: ${infraFiles.length} files`);
console.log(`    ui:    ${uiFiles.length} files`);
console.log(`    other: ${otherFiles.length} files`);

if (!zone) {
  console.log(`\n  Usage: pnpm base:patch <zone>`);
  console.log(`    infra  → ${ZONES.infra.join(', ')}`);
  console.log(`    ui     → UI components, layout, hooks, utils`);
  console.log(`    all    → full merge (same as base:update)`);
  console.log('');
  process.exit(0);
}

// ─── Apply selected zone ────────────────────────────────────
if (zone === 'all') {
  console.log('\n  → Full merge...');
  // Pre-save protected paths (client memory) before merge; restore after
  const protectedBackup = new Map();
  for (const p of PROTECTED) {
    try {
      const list = run(`git ls-files "${p}"`).split('\n').filter(Boolean);
      for (const f of list) {
        protectedBackup.set(f, readFileSync(resolve(root, f), 'utf-8'));
      }
    } catch {
      // path may not exist yet — skip
    }
  }
  try {
    runVisible(`git merge ${BASE_REMOTE}/main --no-edit`);
    console.log('  ✓ Merge complete');
  } catch {
    console.log('  ⚠ Conflicts detected. Resolve manually.');
  }
  // Restore protected files verbatim if merge altered them
  if (protectedBackup.size > 0) {
    for (const [file, content] of protectedBackup) {
      writeFileSync(resolve(root, file), content);
    }
    console.log(`  ✓ Restored ${protectedBackup.size} protected memory file(s).`);
  }
} else {
  const paths = ZONES[zone];
  if (!paths) {
    console.error(`  ✗ Unknown zone "${zone}". Use: infra, ui, all`);
    process.exit(1);
  }

  const rawFilesToPatch = changedFiles.filter((f) =>
    paths.some((z) => f.startsWith(z)),
  );
  const filesToPatch = rawFilesToPatch.filter((f) => !isProtected(f));
  const skipped = rawFilesToPatch.filter(isProtected);

  if (filesToPatch.length === 0) {
    console.log(`\n  ✓ No changes in "${zone}" zone (after protection filter).\n`);
    if (skipped.length > 0) {
      console.log(`  ⓘ ${skipped.length} protected file(s) skipped:`);
      skipped.forEach((f) => console.log(`    - ${f}`));
    }
    process.exit(0);
  }

  console.log(`\n  → Patching ${filesToPatch.length} files from "${zone}"...`);
  filesToPatch.forEach((f) => console.log(`    ${f}`));
  if (skipped.length > 0) {
    console.log(`\n  ⓘ Protected from overwrite (${skipped.length}):`);
    skipped.forEach((f) => console.log(`    - ${f}`));
  }

  // Checkout specific files from upstream
  for (const file of filesToPatch) {
    try {
      run(`git checkout ${BASE_REMOTE}/main -- ${file}`);
    } catch {
      console.log(`  ⚠ Skipped ${file} (may not exist locally)`);
    }
  }

  console.log(`\n  ✓ ${filesToPatch.length} files patched.`);
  console.log('  → Review with: git diff --cached');
  console.log('  → Commit with: git commit -m "chore(base): patch <zone>"');
  console.log('');
}

// Reinstall deps if needed
if (zone === 'all' || zone === 'infra') {
  console.log('  → Updating dependencies...');
  runVisible('pnpm install');
}

console.log('\n  Done.\n');
