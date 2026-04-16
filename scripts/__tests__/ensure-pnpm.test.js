import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/* ═══════════════════════════════════════════════════════════════
   ensure-pnpm.js smoke tests — verifies the preinstall guard
   correctly allows pnpm, rejects npm/yarn, and passes through when
   the package manager user-agent is absent (CI without UA).
   ═══════════════════════════════════════════════════════════════ */

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = resolve(__dirname, '../ensure-pnpm.js');

function run(userAgent) {
  // WHY: on Windows, env var names are case-insensitive. pnpm injects
  // NPM_CONFIG_USER_AGENT (uppercase) which shadows any lowercase override.
  // Strip ALL case-variants before reinstating the target.
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (key.toLowerCase() !== 'npm_config_user_agent') env[key] = value;
  }
  if (userAgent !== undefined) env.npm_config_user_agent = userAgent;
  const r = spawnSync(process.execPath, [scriptPath], { env, encoding: 'utf-8' });
  return { ...r, status: r.status ?? (r.error ? 1 : r.signal ? 1 : 0) };
}

describe('ensure-pnpm', () => {
  it('exits 0 when invoked via pnpm', () => {
    const r = run('pnpm/10.28.0 npm/? node/v24.12.0 win32 x64');
    expect(r.status).toBe(0);
    expect(r.stderr).toBe('');
  });

  it('exits 1 with guidance when invoked via npm', () => {
    const r = run('npm/10.0.0 node/v24.12.0 win32 x64');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/uses pnpm/);
    expect(r.stderr).toMatch(/invoked npm/);
  });

  it('exits 1 when invoked via yarn', () => {
    const r = run('yarn/1.22.19 npm/? node/v24.12.0 win32 x64');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/invoked yarn/);
  });

  it('exits 0 when no user-agent is set (CI pass-through)', () => {
    const r = run(undefined);
    expect(r.status).toBe(0);
    expect(r.stderr).toBe('');
  });
});
