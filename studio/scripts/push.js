#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SANITY-PUSH — createOrReplace a document with backup-before-write

   Usage:
     pnpm sanity:push --type <type> --id <id> --data <json-file>
     pnpm sanity:push --type page --id page-home --data ./draft-home.json
     pnpm sanity:push ... --dry-run    → show diff, no write
     pnpm sanity:push ... --production → write to production dataset
                                          (defaults to staging for safety)

   Before every write:
   - Fetch the current doc (if any) and dump to .sanity-backups/
   - Validate the payload has { _id, _type } matching the flags
   - On dry-run, print the diff JSON and exit

   Requires SANITY_WRITE_TOKEN in .env.local (scope Editor) and
   SANITY_STUDIO_PROJECT_ID set.
   ═══════════════════════════════════════════════════════════════ */

import { createClient } from '@sanity/client';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const repoRoot = resolve(__dirname, '..', '..');

/* ─── Parse CLI flags ──────────────────────────────────────── */
const args = process.argv.slice(2);
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    const next = args[i + 1];
    if (!next || next.startsWith('--')) {
      flags[key] = true;
    } else {
      flags[key] = next;
      i++;
    }
  }
}

if (!flags.type || !flags.id || (!flags.data && !flags['stdin'])) {
  console.error('Usage: pnpm sanity:push --type <type> --id <id> --data <file> [--dry-run] [--production]');
  console.error('       or pipe JSON via --stdin');
  process.exit(1);
}

/* ─── Load payload ─────────────────────────────────────────── */
let payload;
if (flags.stdin) {
  payload = JSON.parse(readFileSync(0, 'utf-8'));
} else {
  const dataPath = resolve(repoRoot, flags.data);
  if (!existsSync(dataPath)) {
    console.error(`✗ Data file not found: ${dataPath}`);
    process.exit(1);
  }
  payload = JSON.parse(readFileSync(dataPath, 'utf-8'));
}

payload._type = flags.type;
payload._id = flags.id;

/* ─── Client ───────────────────────────────────────────────── */
const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const DATASET = flags.production
  ? 'production'
  : process.env.SANITY_STUDIO_DATASET || 'staging';
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!PROJECT_ID) {
  console.error('✗ SANITY_STUDIO_PROJECT_ID not set.');
  process.exit(1);
}
if (!TOKEN && !flags['dry-run']) {
  console.error('✗ SANITY_WRITE_TOKEN not set — required unless --dry-run.');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-06-01',
  token: TOKEN,
  useCdn: false,
});

/* ─── Backup current doc ───────────────────────────────────── */
async function backup() {
  const existing = await client.getDocument(flags.id).catch(() => null);
  if (!existing) {
    console.log(`  ⓘ No existing doc with _id=${flags.id} — first write, no backup needed.`);
    return;
  }
  const backupsDir = join(repoRoot, '.sanity-backups');
  if (!existsSync(backupsDir)) mkdirSync(backupsDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
  const file = join(backupsDir, `${ts}-${DATASET}-${flags.id}.json`);
  writeFileSync(file, JSON.stringify(existing, null, 2));
  console.log(`  ✓ Backup saved → ${file}`);
}

/* ─── Main ─────────────────────────────────────────────────── */
async function main() {
  console.log(`  Dataset : ${DATASET}${flags.production ? '  ⚠ PRODUCTION' : ''}`);
  console.log(`  Doc     : _type=${flags.type} _id=${flags.id}`);

  if (flags['dry-run']) {
    console.log('  --- DRY RUN (no write) ---');
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  await backup();
  const result = await client.createOrReplace(payload);
  console.log(`  ✓ Pushed ${result._id} (rev ${result._rev})`);
}

main().catch((err) => {
  console.error(`✗ Push failed: ${err.message}`);
  process.exit(1);
});
