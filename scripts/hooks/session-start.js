#!/usr/bin/env node

/* SessionStart hook — surfaces project memory at the top of every session.
   Outputs JSON with additionalContext per Claude Code hook protocol.
   Cross-platform (no shell dependencies — pure Node). */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const memoryDir = join(root, '.claude', 'memory');
const indexPath = join(memoryDir, 'INDEX.md');
const sessionsDir = join(memoryDir, 'sessions');

const parts = [];
parts.push('# Memory snapshot (auto-loaded at session start)');
parts.push('');

if (existsSync(indexPath)) {
  parts.push('## .claude/memory/INDEX.md');
  parts.push('');
  parts.push(readFileSync(indexPath, 'utf-8'));
  parts.push('');
} else {
  parts.push('_No INDEX.md yet — run `pnpm memory:index`._');
  parts.push('');
}

if (existsSync(sessionsDir)) {
  const sessions = readdirSync(sessionsDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .reverse();
  if (sessions.length > 0) {
    const latest = sessions[0];
    parts.push(`## Latest session journal — ${latest}`);
    parts.push('');
    parts.push(readFileSync(join(sessionsDir, latest), 'utf-8'));
    parts.push('');
  } else {
    parts.push('_No prior session journal in `.claude/memory/sessions/`._');
    parts.push('');
  }
}

parts.push('---');
parts.push('Reminder of always-loaded rules: critical.md · memory-protocol.md · principles.md · releases.md · workflow.md');
parts.push('Before any non-trivial task: `grep -rl "#<domain>" .claude/memory/`');

const output = {
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: parts.join('\n'),
  },
};

process.stdout.write(JSON.stringify(output));
