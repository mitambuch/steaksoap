#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════
// VALIDATE-I18N — detects hardcoded French strings in the src tree.
//
// Rule: any JSX text node or string literal (aria-label, title, alt,
// placeholder) that contains a French accent character is a candidate.
// Locales JSON is the source of truth — these strings must come from
// t() or from Sanity.
//
// Usage:
//   node scripts/validate-i18n.js          → reports + exits 1 if violations
//
// i18n-sanity.md lesson #1.
// ═══════════════════════════════════════════════════════════════

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');
const srcDir = join(root, 'src');

const FRENCH_ACCENT = /[àâäéèêëîïôöùûüÿœçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸŒÇ]/;

// Files we explicitly skip — translations themselves, tests, fixtures.
const SKIP_PATTERNS = [
  /\\locales\\/,
  /\/locales\//,
  /__tests__/,
  /\.test\.[tj]sx?$/,
  /\\data\\pages\.ts$/,
  /\/data\/pages\.ts$/,
  /\\config\\site\.ts$/,
  /\/config\/site\.ts$/,
  /vite-env\.d\.ts$/,
];

// Comments to ignore inside source — we only look at JSX text + string literals.
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      yield full;
    }
  }
}

function scanFile(file) {
  const rel = relative(root, file);
  if (SKIP_PATTERNS.some((p) => p.test(rel))) return [];

  const raw = readFileSync(file, 'utf-8');
  const src = stripComments(raw);
  const violations = [];

  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. JSX text: look for `>text<` patterns containing an accent.
    const jsxTextRe = />([^<>{}\n]*[àâäéèêëîïôöùûüÿœçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸŒÇ][^<>{}\n]*)</g;
    let m;
    while ((m = jsxTextRe.exec(line)) !== null) {
      const text = m[1].trim();
      if (text.length >= 2) {
        violations.push({ file: rel, line: i + 1, match: text, kind: 'jsx-text' });
      }
    }

    // 2. String-literal props that render text: aria-label, title, alt,
    //    placeholder. Only flag if the literal contains a French accent.
    const propRe = /(aria-label|title|alt|placeholder)\s*=\s*(['"])([^'"]*?)\2/gi;
    while ((m = propRe.exec(line)) !== null) {
      const text = m[3];
      if (FRENCH_ACCENT.test(text) && text.trim().length >= 2) {
        violations.push({
          file: rel,
          line: i + 1,
          match: `${m[1]}="${text}"`,
          kind: 'jsx-prop',
        });
      }
    }
  }

  return violations;
}

const allViolations = [];
for (const file of walk(srcDir)) {
  allViolations.push(...scanFile(file));
}

if (allViolations.length === 0) {
  console.log('  ✓ No hardcoded French strings in src/**/*.{ts,tsx}');
  process.exit(0);
}

console.error(`  ✗ ${allViolations.length} hardcoded French string(s) found:`);
console.error('');
for (const v of allViolations) {
  console.error(`    ${v.file}:${v.line}  [${v.kind}]  ${v.match}`);
}
console.error('');
console.error('  Move each to src/locales/*.json and use t() / resolveField() instead.');
console.error('  See .claude/rules/i18n-sanity.md for the arbitrage rule.');
process.exit(1);
