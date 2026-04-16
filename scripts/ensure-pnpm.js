#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   ENSURE-PNPM — package-manager guard (runs as `preinstall`)

   Replaces `npx only-allow pnpm`, which fetches + executes remote
   code before the lockfile is verified (supply-chain exposure).

   This script only reads process.env.npm_config_user_agent, set by
   whichever PM invoked the install. Zero network, zero deps, fast.
   ═══════════════════════════════════════════════════════════════ */

const ua = process.env.npm_config_user_agent || '';

// PM pass-through for CI wrappers that don't set the UA (rare — allow by default)
if (!ua) process.exit(0);

if (!ua.startsWith('pnpm/')) {
  const match = /^(\w+)\//.exec(ua);
  const pm = match ? match[1] : 'unknown';
  console.error('');
  console.error(`  ✗ This project uses pnpm. You invoked ${pm}.`);
  console.error('  → Run with pnpm instead:  pnpm install');
  console.error('  → Install pnpm:          https://pnpm.io/installation');
  console.error('');
  process.exit(1);
}
