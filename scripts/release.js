#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   RELEASE SCRIPT — cross-platform wrapper for release-it
   Sets GITHUB_TOKEN from `gh auth token` then runs release-it.
   Works on Windows, macOS, and Linux.

   Usage :
     node scripts/release.js          → interactive release
     node scripts/release.js patch    → force patch bump
     node scripts/release.js minor    → force minor bump
     node scripts/release.js major    → force major bump
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'child_process';

const bump = process.argv[2] ?? '';

try {
  const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
  const cmd = bump ? `release-it ${bump}` : 'release-it';

  execSync(cmd, {
    stdio: 'inherit',
    env: { ...process.env, GITHUB_TOKEN: token },
  });
} catch {
  process.exit(1);
}
