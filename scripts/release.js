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

import { execSync } from 'node:child_process';

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

  // WHY: build a single shell command string so we control quoting ourselves.
  // Windows cmd splits arguments on `&` (title contains "Floor & Tagged"), and
  // Node's execFileSync doesn't auto-resolve npx → npx.cmd without shell:true
  // — which then breaks arg escaping. Single quoted string bypasses both.
  // The title is double-quoted, inner `"` escaped, to survive any shell.
  const safeTitle = title.replace(/"/g, '\\"');
  const parts = ['npx release-it'];
  if (bump) parts.push(bump);
  parts.push('--ci');
  parts.push(`"--github.releaseName=${safeTitle}"`);

  // WHY: RELEASE_IT=1 signals to .husky/pre-commit that this commit is a
  // release-it generated commit on main (`chore(release): v${version}`) and
  // should bypass the anti-main gate. Only set by this trusted wrapper.
  execSync(parts.join(' '), {
    stdio: 'inherit',
    env: { ...process.env, GITHUB_TOKEN: token, RELEASE_IT: '1' },
  });
} catch (err) {
  console.error(
    err instanceof Error ? `Release failed: ${err.message}` : 'Release failed',
  );
  process.exit(1);
}
