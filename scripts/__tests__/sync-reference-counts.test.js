import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

/* ═══════════════════════════════════════════════════════════════
   sync-reference-counts.js smoke tests — heading counts, table
   content validation, README phrase validation. All via spawned
   child against temp fixture repos (STEAKSOAP_TEST_ROOT).
   ═══════════════════════════════════════════════════════════════ */

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = resolve(__dirname, '../sync-reference-counts.js');

let root;

function seed({
  ui = [],
  commands = [],
  agents = [],
  rules = [],
  reference,
  readme,
}) {
  const mk = (sub, names) => {
    if (!names.length) return;
    mkdirSync(join(root, sub), { recursive: true });
    for (const n of names) writeFileSync(join(root, sub, n), '');
  };
  mk('src/components/ui', ui);
  mk('.claude/commands', commands);
  mk('.claude/agents', agents);
  mk('.claude/rules', rules);
  if (reference !== undefined) {
    mkdirSync(join(root, 'docs'), { recursive: true });
    writeFileSync(join(root, 'docs/REFERENCE.md'), reference);
  }
  if (readme !== undefined) writeFileSync(join(root, 'README.md'), readme);
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

// Reference fixture with valid heading counts + table content matching
// the passed commands/rules. Used as the "all in sync" baseline.
function buildReference({ ui, commands, agents, rules }) {
  const cmdRow = commands.map((n) => `\`/${n.replace(/\.md$/, '')}\``).join(', ');
  const ruleRows = rules
    .map((n) => `| \`${n}\` | triggered | scope |`)
    .join('\n');
  return [
    `## UI Components (${ui.length})`,
    '',
    '| Component | Description |',
    '|-----------|-------------|',
    ...ui.map((n) => `| **${n.replace(/\.tsx$/, '')}** | — |`),
    '',
    '---',
    '',
    `## AI Commands (${commands.length})`,
    '',
    '| Category | Commands |',
    '|----------|---------|',
    `| **All** | ${cmdRow} |`,
    '',
    '---',
    '',
    `## AI Agents (${agents.length})`,
    '',
    `## AI Rules (${rules.length})`,
    '',
    '| Rule | Load | Scope |',
    '|------|------|-------|',
    ruleRows,
    '',
  ].join('\n');
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'steaksoap-doc-'));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('sync-reference-counts — heading counts', () => {
  it('exits 0 when all headings match', () => {
    const ui = ['Button.tsx', 'Card.tsx'];
    const commands = ['a.md', 'b.md', 'c.md'];
    const agents = ['one.md'];
    const rules = ['r1.md', 'r2.md'];
    seed({ ui, commands, agents, rules, reference: buildReference({ ui, commands, agents, rules }) });
    const r = run(['--check']);
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/in sync/);
  });

  it('--check exits 1 when any heading count drifts', () => {
    const ui = ['Button.tsx', 'Card.tsx', 'Modal.tsx'];
    const commands = ['a.md'];
    const agents = ['one.md'];
    const rules = ['r1.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({
        ui: ['x.tsx', 'y.tsx'], // claims 2
        commands,
        agents,
        rules,
      }),
    });
    const r = run(['--check']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/UI Components.*docs says \(2\), repo has \(3\)/);
  });

  it('default (write) mode auto-fixes heading counts', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md', 'b.md'];
    const agents = ['one.md'];
    const rules = ['r1.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({
        ui: ['x.tsx', 'y.tsx', 'z.tsx'], // claims 3
        commands: ['z.md'], // claims 1
        agents,
        rules,
      }),
    });
    run();
    const updated = readFileSync(join(root, 'docs/REFERENCE.md'), 'utf-8');
    expect(updated).toMatch(/## UI Components \(1\)/);
    expect(updated).toMatch(/## AI Commands \(2\)/);
  });

  it('preserves blank lines under each numbered heading', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md', 'b.md'];
    const agents = ['x.md'];
    const rules = ['r.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: `## UI Components (99)\n\nfirst\n\n## AI Commands (0)\n\nsecond\n\n## AI Agents (1)\n\n## AI Rules (1)\n\n| \`r.md\` | x | y |\n`,
    });
    run();
    const updated = readFileSync(join(root, 'docs/REFERENCE.md'), 'utf-8');
    expect(updated).toMatch(/## UI Components \(1\)\n\nfirst/);
    expect(updated).toMatch(/## AI Commands \(2\)\n\nsecond/);
  });
});

describe('sync-reference-counts — commands table content', () => {
  it('flags commands present on disk but missing from the table', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md', 'b.md', 'new-cmd.md'];
    const agents = ['x.md'];
    const rules = ['r.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({ ui, commands: ['a.md', 'b.md'], agents, rules }).replace(
        '(2)',
        '(3)',
      ),
    });
    const r = run(['--check']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/commands table missing:\s*\/new-cmd/);
  });

  it('flags orphan commands in the table (exist in docs but not on disk)', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md'];
    const agents = ['x.md'];
    const rules = ['r.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({
        ui,
        commands: ['a.md', 'b.md'], // table lists /a and /b, but /b doesn't exist
        agents,
        rules,
      }).replace('(2)', '(1)'),
    });
    const r = run(['--check']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/commands table has orphans:\s*\/b/);
  });
});

describe('sync-reference-counts — rules table content', () => {
  it('flags rules present on disk but missing from the table', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md'];
    const agents = ['x.md'];
    const rules = ['r1.md', 'r2.md', 'new-rule.md'];
    const docRules = ['r1.md', 'r2.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({ ui, commands, agents, rules: docRules }).replace(
        /## AI Rules \(2\)/,
        '## AI Rules (3)',
      ),
    });
    const r = run(['--check']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/rules table missing:\s*new-rule\.md/);
  });
});

describe('sync-reference-counts — README phrase validation', () => {
  it('flags README phrase drift when command count is wrong', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md', 'b.md', 'c.md'];
    const agents = ['x.md'];
    const rules = ['r.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({ ui, commands, agents, rules }),
      readme: '# Project\n\n99 slash commands, 4 specialized agents, 1 contextual rules — all in `.claude/`.\n',
    });
    const r = run(['--check']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/README claims "99 slash commands"/);
  });

  it('flags README phrase drift when rules count is wrong', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md'];
    const agents = ['x.md'];
    const rules = ['r1.md', 'r2.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({ ui, commands, agents, rules }),
      readme: '# Project\n\n1 slash commands, 4 specialized agents, 42 contextual rules — all in `.claude/`.\n',
    });
    const r = run(['--check']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/README claims "42 contextual rules"/);
  });

  it('passes when README phrase is absent (no validation = no failure)', () => {
    const ui = ['Button.tsx'];
    const commands = ['a.md'];
    const agents = ['x.md'];
    const rules = ['r.md'];
    seed({
      ui,
      commands,
      agents,
      rules,
      reference: buildReference({ ui, commands, agents, rules }),
      readme: '# Project\n\nNo count phrase here.\n',
    });
    const r = run(['--check']);
    expect(r.status).toBe(0);
  });
});
