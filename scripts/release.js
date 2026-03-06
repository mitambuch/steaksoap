#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   RELEASE SCRIPT — cross-platform wrapper for release-it
   Sets GITHUB_TOKEN from `gh auth token` then runs release-it.
   Works on Windows, macOS, and Linux.

   Usage :
     node scripts/release.js "Descriptive Title"              → auto-detect bump
     node scripts/release.js patch "Descriptive Title"        → force patch bump
     node scripts/release.js minor "Descriptive Title"        → force minor bump
     node scripts/release.js major "Descriptive Title"        → force major bump

   The title is REQUIRED. It appears as the GitHub release name.
   Good: "Cockpit Hardening & Reuse-First Generators"
   Bad:  "v4.1.0", "release", "update"
   ═══════════════════════════════════════════════════════════════ */

import { execFileSync, execSync } from 'node:child_process';

const bumpTypes = ['patch', 'minor', 'major'];
const rawArgs = process.argv.slice(2);

// WHY: Parse args — bump type is optional, title is required.
// "patch 'Title'" or just "'Title'" (auto-detect bump).
let bump = '';
let title = '';

if (rawArgs.length === 0) {
  console.error('Error: A descriptive release title is required.');
  console.error('Usage: node scripts/release.js [patch|minor|major] "Title"');
  console.error('Example: node scripts/release.js patch "Performance & Quality Polish"');
  process.exit(1);
}

if (bumpTypes.includes(rawArgs[0])) {
  bump = rawArgs[0];
  title = rawArgs.slice(1).join(' ');
} else {
  title = rawArgs.join(' ');
}

if (!title || title.length < 5) {
  console.error('Error: A descriptive release title is required (min 5 characters).');
  console.error('Good: "Cockpit Hardening & Reuse-First Generators"');
  console.error('Bad:  "v4.1.0", "fix", "update"');
  process.exit(1);
}

try {
  const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
  const args = bump ? [bump, '--ci'] : ['--ci'];

  // WHY: Pass title via CLI override — overrides .release-it.json releaseName
  args.push(`--github.releaseName=${title}`);

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
