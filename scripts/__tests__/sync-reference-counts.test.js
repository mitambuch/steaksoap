import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

/* ═══════════════════════════════════════════════════════════════
   sync-reference-counts.js smoke tests — drift detection, write
   mode, --check gate. Tests use temp fixture repos via
   STEAKSOAP_TEST_ROOT.
   ═══════════════════════════════════════════════════════════════ */

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = resolve(__dirname, '../sync-reference-counts.js');

let root;

function seed({ ui = [], commands = [], agents = [], rules = [], reference }) {
  const mk = (sub, names) => {
    if (!names.length) return;
    mkdirSync(join(root, sub), { recursive: true });
    for (const n of names) writeFileSync(join(root, sub, n), '');
  };
  mk('src/components/ui', ui);
  mk('.claude/commands', commands);
  mk('.claude/agents', agents);
  mk('.claude/rules', rules);
  mkdirSync(join(root, 'docs'), { recursive: true });
  writeFileSync(join(root, 'docs/REFERENCE.md'), reference);
}

function run(flags = []) {
  const env = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (k.toLowerCase() !== 'npm_config_user_agent') env[k] = v;
  }
  env.STEAKSOAP_TEST_ROOT = root;
  const r = spawnSync(process.execPath, [scriptPath, ...flags], { env, encoding: 'utf-8' });
  return { ...r, status: r.status ?? (r.error ? 1 : 0) };
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'steaksoap-doc-'));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('sync-reference-counts', () => {
  it('exits 0 when counts are in sync', () => {
    seed({
      ui: ['Button.tsx', 'Card.tsx'],
      commands: ['a.md', 'b.md', 'c.md'],
      agents: ['one.md'],
      rules: ['r1.md', 'r2.md'],
      reference:
        '## UI Components (2)\n\n## AI Commands (3)\n\n## AI Agents (1)\n\n## AI Rules (2)\n',
    });
    const r = run(['--check']);
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/in sync/);
  });

  it('exits 1 in --check mode when any count drifts', () => {
    seed({
      ui: ['Button.tsx', 'Card.tsx', 'Modal.tsx'],
      commands: ['a.md'],
      agents: ['one.md'],
      rules: ['r1.md'],
      reference:
        '## UI Components (2)\n\n## AI Commands (1)\n\n## AI Agents (1)\n\n## AI Rules (1)\n',
    });
    const r = run(['--check']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/UI Components.*docs says \(2\), repo has \(3\)/);
  });

  it('rewrites drifted counts in default (write) mode', () => {
    seed({
      ui: ['Button.tsx'],
      commands: ['a.md', 'b.md'],
      agents: ['one.md'],
      rules: ['r1.md'],
      reference:
        '## UI Components (99)\n\n## AI Commands (0)\n\n## AI Agents (1)\n\n## AI Rules (1)\n',
    });
    const r = run();
    expect(r.status).toBe(0);
    const updated = readFileSync(join(root, 'docs/REFERENCE.md'), 'utf-8');
    expect(updated).toMatch(/## UI Components \(1\)/);
    expect(updated).toMatch(/## AI Commands \(2\)/);
    expect(updated).not.toMatch(/## UI Components \(99\)/);
  });

  it('preserves blank lines under each counted heading', () => {
    seed({
      ui: ['Button.tsx'],
      commands: ['a.md', 'b.md'],
      agents: ['x.md'],
      rules: ['r.md'],
      reference:
        '## UI Components (99)\n\nfirst line\n\n## AI Commands (0)\n\nsecond line\n\n## AI Agents (1)\n\n## AI Rules (1)\n',
    });
    run();
    const updated = readFileSync(join(root, 'docs/REFERENCE.md'), 'utf-8');
    // Blank line between `(N)` heading and content must survive the rewrite.
    expect(updated).toMatch(/## UI Components \(1\)\n\nfirst line/);
    expect(updated).toMatch(/## AI Commands \(2\)\n\nsecond line/);
  });

  it('ignores files that are not top-level (no recursion)', () => {
    seed({
      ui: ['Button.tsx'],
      commands: ['a.md'],
      agents: ['x.md'],
      rules: ['r.md'],
      reference:
        '## UI Components (1)\n\n## AI Commands (1)\n\n## AI Agents (1)\n\n## AI Rules (1)\n',
    });
    // nested subdir file should NOT be counted (component-count is flat ui/)
    mkdirSync(join(root, 'src/components/ui/__tests__'), { recursive: true });
    writeFileSync(join(root, 'src/components/ui/__tests__/Button.test.tsx'), '');
    const r = run(['--check']);
    expect(r.status).toBe(0); // still in sync — the subdir file isn't counted
  });
});
