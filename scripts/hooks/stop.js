#!/usr/bin/env node

/* Stop hook — checks if a session journal was written today.
   If not, emits a systemMessage reminding the model + a non-blocking nudge.
   Cross-platform pure Node. */

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const sessionsDir = join(root, '.claude', 'memory', 'sessions');
const today = new Date().toISOString().slice(0, 10);

let hasTodayJournal = false;
if (existsSync(sessionsDir)) {
  const files = readdirSync(sessionsDir).filter((f) => f.endsWith('.md'));
  hasTodayJournal = files.some((f) => f.startsWith(today));
}

if (hasTodayJournal) {
  process.stdout.write(JSON.stringify({}));
  process.exit(0);
}

const message = [
  '⚠ No session journal yet for today.',
  'Before stopping: write `.claude/memory/sessions/' + today + '-HHMM.md`,',
  'run `pnpm memory:index`, and output the RELEASE CHECK block.',
  'Skip if this was a trivial single-action session.',
].join(' ');

process.stdout.write(
  JSON.stringify({
    systemMessage: message,
  }),
);
