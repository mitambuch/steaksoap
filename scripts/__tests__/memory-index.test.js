import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

/* ═══════════════════════════════════════════════════════════════
   memory-index.js smoke tests — parse YAML frontmatter, validate
   schema, generate INDEX.md, exit non-zero on malformed entries.
   Tests run against temp fixture repos via STEAKSOAP_TEST_ROOT.
   ═══════════════════════════════════════════════════════════════ */

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = resolve(__dirname, '../memory-index.js');

const CANONICAL_TAGS = `\`#template\` \`#decision\` \`#active\` \`#feedback\` \`#pattern\` \`#friction\` \`#session\``;

let root;

function writeEntry(folder, name, frontmatter, title = 'Example') {
  const dir = join(root, '.claude/memory', folder);
  mkdirSync(dir, { recursive: true });
  const body = `---\n${frontmatter}\n---\n\n# ${title}\n\nBody.\n`;
  writeFileSync(join(dir, name), body);
}

function run(...args) {
  // Strip case-insensitive npm_config_user_agent to avoid Windows leak.
  const env = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (k.toLowerCase() !== 'npm_config_user_agent') env[k] = v;
  }
  env.STEAKSOAP_TEST_ROOT = root;
  const r = spawnSync(process.execPath, [scriptPath, ...args], { env, encoding: 'utf-8' });
  return { ...r, status: r.status ?? (r.error ? 1 : 0) };
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'steaksoap-mem-'));
  // Canonical TAGS.md with the tags used by fixtures below.
  mkdirSync(join(root, '.claude/memory'), { recursive: true });
  writeFileSync(join(root, '.claude/memory/TAGS.md'), `# TAGS\n\n${CANONICAL_TAGS}\n`);
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('memory-index', () => {
  it('writes INDEX.md with 0 entries when memory is empty', () => {
    const r = run();
    expect(r.status).toBe(0);
    const idx = readFileSync(join(root, '.claude/memory/INDEX.md'), 'utf-8');
    expect(idx).toMatch(/\*\*0\*\* entries/);
  });

  it('indexes a valid decision entry with all required fields', () => {
    writeEntry(
      'decisions',
      '2026-01-01-test.md',
      `id: test\ndate: 2026-01-01\ntype: decision\ntags: [#template, #decision, #active]\nscope: template\nstatus: active`,
      'Test Decision',
    );
    const r = run();
    expect(r.status).toBe(0);
    const idx = readFileSync(join(root, '.claude/memory/INDEX.md'), 'utf-8');
    expect(idx).toMatch(/\*\*1\*\* entries/);
    expect(idx).toMatch(/Test Decision/);
    expect(idx).toMatch(/## Decisions/);
  });

  it('exits 1 on entry missing required frontmatter fields', () => {
    writeEntry(
      'decisions',
      'bad.md',
      `id: broken\ndate: 2026-01-01`, // missing type, tags, scope, status
    );
    const r = run();
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/missing required frontmatter fields/);
  });

  it('exits 1 on entry with no frontmatter block at all', () => {
    mkdirSync(join(root, '.claude/memory/decisions'), { recursive: true });
    writeFileSync(join(root, '.claude/memory/decisions/raw.md'), '# No frontmatter\n');
    const r = run();
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/missing or malformed YAML frontmatter/);
  });

  it('exits 1 on unknown tags (closed-set vocabulary is a hard rule)', () => {
    writeEntry(
      'feedback',
      'unknown.md',
      `id: x\ndate: 2026-01-01\ntype: feedback\ntags: [#template, #feedback, #active, #unlisted-tag]\nscope: template\nstatus: active`,
    );
    const r = run();
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/unknown tag/i);
    expect(r.stderr).toContain('#unlisted-tag');
  });

  it('writes INDEX.md to the temp root, not the real repo', () => {
    const r = run();
    expect(r.status).toBe(0);
    expect(existsSync(join(root, '.claude/memory/INDEX.md'))).toBe(true);
  });

  describe('--check mode', () => {
    it('exits 0 when INDEX.md is up to date', () => {
      writeEntry(
        'decisions',
        '2026-01-01-test.md',
        `id: test\ndate: 2026-01-01\ntype: decision\ntags: [#template, #decision, #active]\nscope: template\nstatus: active`,
        'Test',
      );
      expect(run().status).toBe(0);
      const check = run('--check');
      expect(check.status).toBe(0);
      expect(check.stdout).toMatch(/up to date/);
    });

    it('exits 1 when INDEX.md is missing', () => {
      const r = run('--check');
      expect(r.status).toBe(1);
      expect(r.stderr).toMatch(/out of date/);
    });

    it('exits 1 when INDEX.md is stale', () => {
      writeEntry(
        'decisions',
        '2026-01-01-test.md',
        `id: test\ndate: 2026-01-01\ntype: decision\ntags: [#template, #decision, #active]\nscope: template\nstatus: active`,
        'Test',
      );
      expect(run().status).toBe(0);
      writeEntry(
        'decisions',
        '2026-01-02-second.md',
        `id: second\ndate: 2026-01-02\ntype: decision\ntags: [#template, #decision, #active]\nscope: template\nstatus: active`,
        'Second',
      );
      const r = run('--check');
      expect(r.status).toBe(1);
      expect(r.stderr).toMatch(/out of date/);
    });
  });
});
