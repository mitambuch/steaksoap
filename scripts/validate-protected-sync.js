#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════
// VALIDATE-PROTECTED-SYNC — guards the PROTECTED list invariant
//
// scripts/base-patch.js and scripts/setup.js both declare a PROTECTED
// array that lists client-owned paths never overwritten by
// `pnpm base:update`. These lists MUST stay identical — if one drifts,
// `base:update` silently overwrites (or silently misses) a protected
// path on client projects.
//
// This script parses both files, compares the arrays, and fails
// `pnpm validate` when they diverge.
// ═══════════════════════════════════════════════════════════════

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');

function extractArray(file, varName) {
  const src = readFileSync(resolve(root, file), 'utf-8');
  // Match `const <varName> = [ ... ];` tolerating whitespace and comments.
  const re = new RegExp(`(?:const|let)\\s+${varName}\\s*=\\s*\\[([\\s\\S]*?)\\]`);
  const m = re.exec(src);
  if (!m) throw new Error(`Could not find ${varName} in ${file}`);
  return Array.from(m[1].matchAll(/['"]([^'"]+)['"]/g)).map((mm) => mm[1]);
}

try {
  const patch = extractArray('scripts/base-patch.js', 'PROTECTED').sort();
  const setup = extractArray('scripts/setup.js', 'PROTECTED').sort();

  const onlyInPatch = patch.filter((p) => !setup.includes(p));
  const onlyInSetup = setup.filter((p) => !patch.includes(p));

  if (onlyInPatch.length === 0 && onlyInSetup.length === 0) {
    console.log(`  ✓ PROTECTED lists in sync (${patch.length} paths).`);
    process.exit(0);
  }

  console.error('  ✗ PROTECTED lists have drifted between base-patch.js and setup.js:');
  if (onlyInPatch.length > 0) {
    console.error(`      only in base-patch.js: ${onlyInPatch.join(', ')}`);
  }
  if (onlyInSetup.length > 0) {
    console.error(`      only in setup.js:      ${onlyInSetup.join(', ')}`);
  }
  console.error('');
  console.error('  Fix : copy the canonical list across both files before committing.');
  process.exit(1);
} catch (err) {
  console.error(`  ✗ validate-protected-sync failed: ${err.message}`);
  process.exit(1);
}
