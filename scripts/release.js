#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   RELEASE SCRIPT — cross-platform wrapper for release-it
   Sets GITHUB_TOKEN from `gh auth token` then runs release-it.
   Works on Windows, macOS, and Linux.

   Usage :
     node scripts/release.js          → release (auto-detects bump type, non-interactive)
     node scripts/release.js patch    → force patch bump
     node scripts/release.js minor    → force minor bump
     node scripts/release.js major    → force major bump
   ═══════════════════════════════════════════════════════════════ */

import { execFileSync, execSync } from 'node:child_process';

const bump = process.argv[2] ?? '';
const validBumps = ['', 'patch', 'minor', 'major'];

if (!validBumps.includes(bump)) {
  console.error(`Invalid bump type: "${bump}". Use: patch, minor, or major.`);
  process.exit(1);
}

try {
  const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
  const args = bump ? [bump, '--ci'] : ['--ci'];

  execFileSync('npx', ['release-it', ...args], {
    stdio: 'inherit',
    env: { ...process.env, GITHUB_TOKEN: token },
  });
} catch (err) {
  console.error(
    err instanceof Error ? `Release failed: ${err.message}` : 'Release failed',
  );
  process.exit(1);
}
