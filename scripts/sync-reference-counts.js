#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SYNC-REFERENCE-COUNTS — keeps docs/REFERENCE.md + README.md aligned
   with the actual filesystem. Three passes run on every invocation:

   1. REFERENCE heading counts (auto-fixable in write mode)
      `## UI Components (N)`, `## AI Commands (N)`, `## AI Agents (N)`,
      `## AI Rules (N)` compared to file counts in their source dirs.

   2. REFERENCE table content (detect-only, check mode fails)
      - Commands table: slash commands present in the table vs actual
        files in .claude/commands/*.md. Flags missing or extra entries.
      - Rules table: rule filenames present in the table vs actual
        files in .claude/rules/*.md. Flags missing or extra entries.

   3. README count phrases (detect-only, check mode fails)
      "N slash commands, … Y contextual rules" must match reality.
      Agent count is a fixed 4 in the README — not validated.

   Usage:
     pnpm docs:sync            → heading auto-fix + drift report
     pnpm docs:sync:check      → detect-only, exit 1 on any drift
   ═══════════════════════════════════════════════════════════════ */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { PATHS } from './utils/paths.js';

// WHY: STEAKSOAP_TEST_ROOT env var lets smoke tests point the script at a
// temp-dir fixture instead of the real repo root.
const ROOT = process.env.STEAKSOAP_TEST_ROOT || PATHS.root;
const REFERENCE_PATH = join(ROOT, 'docs/REFERENCE.md');
const README_PATH = join(ROOT, 'README.md');

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

function listFiles(dir, predicate) {
  try {
    return readdirSync(dir).filter((name) => {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) return false;
      return predicate(name);
    });
  } catch {
    return [];
  }
}

/* ─── Filesystem truth ──────────────────────────────────────── */

const uiCount = countFiles(
  join(ROOT, 'src/components/ui'),
  (n) => n.endsWith('.tsx') && !n.startsWith('index.') && !n.includes('.test.'),
);

const commandFiles = listFiles(
  join(ROOT, '.claude/commands'),
  (n) => n.endsWith('.md'),
);
const commandsCount = commandFiles.length;
const commandNames = new Set(commandFiles.map((n) => n.replace(/\.md$/, '')));

const agentsCount = countFiles(
  join(ROOT, '.claude/agents'),
  (n) => n.endsWith('.md'),
);

const ruleFiles = listFiles(
  join(ROOT, '.claude/rules'),
  (n) => n.endsWith('.md'),
);
const rulesCount = ruleFiles.length;
const ruleNames = new Set(ruleFiles);

/* ─── Pass 1: REFERENCE heading counts (auto-fixable) ──────── */

let referenceContent;
try {
  referenceContent = readFileSync(REFERENCE_PATH, 'utf-8');
} catch {
  referenceContent = '';
}

const headingSections = [
  { heading: 'UI Components', count: uiCount },
  { heading: 'AI Commands', count: commandsCount },
  { heading: 'AI Agents', count: agentsCount },
  { heading: 'AI Rules', count: rulesCount },
];

const headingDrift = [];
let referenceChanged = false;

for (const { heading, count } of headingSections) {
  const re = new RegExp(`^(##[ \\t]+${heading})[ \\t]*\\((\\d+)\\)[ \\t]*$`, 'm');
  const match = referenceContent.match(re);
  if (!match) {
    if (referenceContent) {
      headingDrift.push(
        `- REFERENCE heading missing: "## ${heading} (N)" — expected ${count}`,
      );
    }
    continue;
  }
  const current = Number(match[2]);
  if (current !== count) {
    headingDrift.push(`- REFERENCE "${heading}": docs says (${current}), repo has (${count})`);
    referenceContent = referenceContent.replace(re, `$1 (${count})`);
    referenceChanged = true;
  }
}

/* ─── Pass 2: REFERENCE table content (detect-only) ─────────── */

// WHY: substring slicing beats lookahead regex here — the section might be
// the LAST thing in the file (no trailing `##` or `---`), which breaks any
// lookahead that requires a next boundary.
function extractSection(content, heading) {
  const start = content.indexOf(`## ${heading}`);
  if (start < 0) return null;
  const after = content.slice(start);
  // Next H2 OR separator OR end-of-file — whichever comes first.
  const boundaryRe = /\n##[ \t]|\n---[ \t]*\n/;
  const m = boundaryRe.exec(after);
  return m ? after.slice(0, m.index) : after;
}

const tableDrift = [];

if (referenceContent) {
  // Commands table: inline-code slash names.
  const cmdSection = extractSection(referenceContent, 'AI Commands');
  if (cmdSection) {
    const tableSlugs = new Set(
      Array.from(cmdSection.matchAll(/`\/([a-z][a-z0-9-]*)`/g), (m) => m[1]),
    );
    const missing = [...commandNames].filter((n) => !tableSlugs.has(n));
    const extra = [...tableSlugs].filter((n) => !commandNames.has(n));
    if (missing.length) tableDrift.push(`- REFERENCE commands table missing: ${missing.map((n) => `/${n}`).join(', ')}`);
    if (extra.length) tableDrift.push(`- REFERENCE commands table has orphans: ${extra.map((n) => `/${n}`).join(', ')}`);
  }

  // Rules table: inline-code `<name>.md` entries.
  const ruleSection = extractSection(referenceContent, 'AI Rules');
  if (ruleSection) {
    const tableRuleFiles = new Set(
      Array.from(ruleSection.matchAll(/`([a-z][a-z0-9-]*\.md)`/g), (m) => m[1]),
    );
    const missing = [...ruleNames].filter((n) => !tableRuleFiles.has(n));
    const extra = [...tableRuleFiles].filter((n) => !ruleNames.has(n));
    if (missing.length) tableDrift.push(`- REFERENCE rules table missing: ${missing.join(', ')}`);
    if (extra.length) tableDrift.push(`- REFERENCE rules table has orphans: ${extra.join(', ')}`);
  }
}

/* ─── Pass 3: README count phrases (detect-only) ────────────── */

const readmeDrift = [];

let readmeContent = '';
try {
  readmeContent = readFileSync(README_PATH, 'utf-8');
} catch {
  // README may be absent in fixtures — silently skip.
}

if (readmeContent) {
  const phraseRe = /(\d+)\s+slash commands[^.\n]*?(\d+)\s+contextual rules/i;
  const m = readmeContent.match(phraseRe);
  if (m) {
    const claimedCmds = Number(m[1]);
    const claimedRules = Number(m[2]);
    if (claimedCmds !== commandsCount) {
      readmeDrift.push(
        `- README claims "${claimedCmds} slash commands" — repo has ${commandsCount}`,
      );
    }
    if (claimedRules !== rulesCount) {
      readmeDrift.push(
        `- README claims "${claimedRules} contextual rules" — repo has ${rulesCount}`,
      );
    }
  }
}

/* ─── Report + exit ─────────────────────────────────────────── */

const mode = process.argv.includes('--check') ? 'check' : 'write';
const allDrift = [...headingDrift, ...tableDrift, ...readmeDrift];

if (allDrift.length === 0) {
  console.log('  ✓ docs/REFERENCE.md + README.md inventory counts in sync.');
  process.exit(0);
}

if (mode === 'check') {
  console.error('\n  ✗ Doc drift detected:');
  allDrift.forEach((line) => console.error(`    ${line}`));
  console.error(
    '\n  Heading counts auto-fix via `pnpm docs:sync`. Table/README drift needs manual edit.\n',
  );
  process.exit(1);
}

// Write mode: only heading counts are auto-fixable. Report the rest.
if (referenceChanged) writeFileSync(REFERENCE_PATH, referenceContent);

console.log('\n  ✓ Heading counts resynced (auto-fix):');
if (headingDrift.length) headingDrift.forEach((line) => console.log(`    ${line}`));
else console.log('    (no heading drift)');

if (tableDrift.length || readmeDrift.length) {
  console.log('\n  ⚠ Manual fixes required (tables + README):');
  [...tableDrift, ...readmeDrift].forEach((line) => console.log(`    ${line}`));
  console.log('\n  Edit the files by hand — table rows and README phrases are structural.\n');
  process.exit(1);
}

console.log('\n  Commit the updated docs/REFERENCE.md.\n');
