#!/usr/bin/env node

/**
 * sync-csp-hash — recalculates the SHA-256 hash of the inline theme script
 * in index.html and updates netlify.toml + vercel.json automatically.
 *
 * Run: node scripts/sync-csp-hash.js
 * Hooked into: prebuild (so the hash is always fresh before deploy)
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// --- 1. Extract inline script from index.html ---
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);

if (!match) {
  console.log('✓ No inline script found in index.html — nothing to hash.');
  process.exit(0);
}

// --- 2. Compute SHA-256 hash ---
const scriptContent = match[1];
const hash = createHash('sha256').update(scriptContent, 'utf8').digest('base64');
const newHash = `sha256-${hash}`;

// --- 3. Replace in deploy configs ---
const CSP_HASH_RE = /sha256-[A-Za-z0-9+/]+=*/g;
const files = ['netlify.toml', 'vercel.json'];
let updated = 0;

for (const file of files) {
  const filePath = resolve(root, file);
  const content = readFileSync(filePath, 'utf8');

  // Find the CSP line containing script-src
  const lines = content.split('\n');
  let changed = false;

  const newLines = lines.map(line => {
    if (!line.includes('script-src')) return line;

    const hashes = line.match(CSP_HASH_RE);
    if (!hashes || hashes.length === 0) return line;

    // Replace the existing hash with the new one
    if (hashes[0] === newHash) return line;

    changed = true;
    return line.replace(hashes[0], newHash);
  });

  if (changed) {
    writeFileSync(filePath, newLines.join('\n'), 'utf8');
    updated++;
    console.log(`✓ ${file} — updated hash to ${newHash}`);
  }
}

if (updated === 0) {
  console.log(`✓ CSP hash already current (${newHash})`);
} else {
  console.log(`\n  ${updated} file(s) updated. Commit the changes.`);
}
