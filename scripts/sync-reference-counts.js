#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SYNC-REFERENCE-COUNTS — keep docs/REFERENCE.md inventory counts
   aligned with the actual filesystem. No more "31 commands" claim
   while the repo holds 33 — a chronic drift source per the audit.

   Runs as `pnpm docs:sync` + wired into pnpm validate (silent
   no-op when in sync, fails CI when drifted).

   Sections handled (H2 with `(N)` suffix):
   - UI Components        ← src/components/ui/*.tsx (excl. __tests__ + index)
   - AI Commands          ← .claude/commands/*.md
   - AI Agents            ← .claude/agents/*.md
   - AI Rules             ← .claude/rules/*.md
   ═══════════════════════════════════════════════════════════════ */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { PATHS } from './utils/paths.js';

// WHY: STEAKSOAP_TEST_ROOT env var lets smoke tests point the script at a
// temp-dir fixture instead of the real repo root.
const ROOT = process.env.STEAKSOAP_TEST_ROOT || PATHS.root;
const REFERENCE_PATH = join(ROOT, 'docs/REFERENCE.md');

function countFiles(dir, predicate) {
  try {
    return readdirSync(dir)
      .filter((name) => {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) return false;
        return predicate(name);
      }).length;
  } catch {
    return 0;
  }
}

// Count .tsx files at the top level (exclude index/barrel + __tests__ dir).
const uiCount = countFiles(
  join(ROOT, 'src/components/ui'),
  (n) => n.endsWith('.tsx') && !n.startsWith('index.') && !n.includes('.test.'),
);

const commandsCount = countFiles(
  join(ROOT, '.claude/commands'),
  (n) => n.endsWith('.md'),
);

const agentsCount = countFiles(
  join(ROOT, '.claude/agents'),
  (n) => n.endsWith('.md'),
);

const rulesCount = countFiles(
  join(ROOT, '.claude/rules'),
  (n) => n.endsWith('.md'),
);

const sections = [
  { heading: 'UI Components', count: uiCount },
  { heading: 'AI Commands', count: commandsCount },
  { heading: 'AI Agents', count: agentsCount },
  { heading: 'AI Rules', count: rulesCount },
];

let content = readFileSync(REFERENCE_PATH, 'utf-8');
let changed = false;
const drift = [];

for (const { heading, count } of sections) {
  // Match: `## UI Components (24)` — tolerant of trailing spaces but NOT of
  // the newline (JS \s matches \n even in multiline mode, which would eat
  // a blank line under the heading).
  const re = new RegExp(`^(##[ \\t]+${heading})[ \\t]*\\((\\d+)\\)[ \\t]*$`, 'm');
  const match = content.match(re);
  if (!match) {
    drift.push(`- "${heading}": heading "## ${heading} (N)" not found in REFERENCE.md`);
    continue;
  }
  const currentStr = match[2];
  const current = Number(currentStr);
  if (current !== count) {
    drift.push(`- "${heading}": docs says (${current}), repo has (${count})`);
    content = content.replace(re, `$1 (${count})`);
    changed = true;
  }
}

const mode = process.argv.includes('--check') ? 'check' : 'write';

if (drift.length === 0) {
  console.log('  ✓ docs/REFERENCE.md inventory counts in sync.');
  process.exit(0);
}

if (mode === 'check') {
  console.error('\n  ✗ docs/REFERENCE.md inventory counts drifted:');
  drift.forEach((line) => console.error(`    ${line}`));
  console.error('\n  Fix: pnpm docs:sync\n');
  process.exit(1);
}

writeFileSync(REFERENCE_PATH, content);
console.log('\n  ✓ docs/REFERENCE.md counts resynced:');
drift.forEach((line) => console.log(`    ${line}`));
console.log(`\n  Commit the updated docs/REFERENCE.md.\n`);
