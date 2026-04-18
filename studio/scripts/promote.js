#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SANITY-PROMOTE — copy staging dataset → production

   Thin wrapper over `sanity dataset copy staging production`.
   Rationale: content is pushed to `staging` by default (see push.js),
   client reviews, then we promote explicitly to `production`. This
   removes the "accidental prod write" risk entirely.

   Usage:
     pnpm sanity:promote               → interactive confirmation
     pnpm sanity:promote --yes         → skip confirmation (CI)

   Requires Sanity CLI (bundled with the `sanity` dep in studio/) and
   an active session (`sanity login` at least once on this machine).
   ═══════════════════════════════════════════════════════════════ */

import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const studioDir = resolve(__dirname, '..');

const args = process.argv.slice(2);
const skipConfirm = args.includes('--yes') || args.includes('-y');

function ask(prompt) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((r) => rl.question(prompt, (ans) => { rl.close(); r(ans.trim()); }));
}

async function main() {
  console.log('');
  console.log('  ═══ Sanity dataset promote ═══');
  console.log('  staging  →  production');
  console.log('');

  if (!skipConfirm) {
    const ans = await ask('  Type "PROMOTE" to continue, anything else to abort: ');
    if (ans !== 'PROMOTE') {
      console.log('  Aborted.');
      process.exit(0);
    }
  }

  console.log('  → Running: sanity dataset copy staging production');
  const result = spawnSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['exec', 'sanity', 'dataset', 'copy', 'staging', 'production', '--skip-history'],
    { cwd: studioDir, stdio: 'inherit' },
  );

  if (result.status !== 0) {
    console.error('  ✗ Promote failed.');
    process.exit(result.status || 1);
  }

  console.log('  ✓ staging → production copy complete.');
}

main().catch((err) => {
  console.error(`✗ promote failed: ${err.message}`);
  process.exit(1);
});
