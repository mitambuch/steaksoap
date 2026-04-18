#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SETUP — unified project setup wizard
   Cross-platform (Windows, macOS, Linux).

   Modes:
     pnpm setup           → auto-detect (init wizard or light setup)
     pnpm setup --update  → pull updates from upstream base
     pnpm setup --yes     → non-interactive init (CI/testing)

   The script auto-detects whether this is a fresh clone
   (package name still matches the base project) or an
   already-initialized project.
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';

import { PATHS } from './utils/paths.js';

const root = PATHS.root;
const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

// ─── Upstream base config ────────────────────────────────────
// Change these if your canonical base repo moves or is renamed.
const BASE_REPO_OWNER = 'Mircooo';
const BASE_REPO_NAME = 'steaksoap';
const BASE_REMOTE_NAME = 'base';
const BASE_REMOTE_URL = `https://github.com/${BASE_REPO_OWNER}/${BASE_REPO_NAME}.git`;

// ─── Mode detection ─────────────────────────────────────────
const isUpdate = process.argv.includes('--update');
let isAutoYes =
  process.argv.includes('--yes') || process.argv.includes('-y');

// Auto-enable non-interactive mode in CI / piped shells
if (!process.stdin.isTTY) isAutoYes = true;

// ─── Fresh clone detection ──────────────────────────────────
// Uses the _baseProject field — set to true in the base, removed during setup.
const pkgPath = resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const isFreshClone = pkg._baseProject === true;

// ─── Node version check ────────────────────────────────────
// WHY: single source of truth is package.json "engines.node". Hard-coding
// a separate minor here caused a mismatch (setup allowed 20, doctor + engines
// required 22 → users got "setup OK, commands fail later"). External audit
// flagged this. Now we read + parse from engines.
const requiredNode = parseInt(pkg.engines?.node?.match(/\d+/)?.[0] ?? '0');
const currentNode = parseInt(process.version.slice(1));
if (Number.isFinite(requiredNode) && currentNode < requiredNode) {
  console.error(
    `\n  ✗ Node.js ${requiredNode}+ required (current: ${process.version})\n` +
      `    Source: package.json engines.node = ${pkg.engines?.node}\n`,
  );
  process.exit(1);
}

// ─── Route to the right mode ────────────────────────────────
if (isUpdate) {
  await runUpdate();
} else if (isFreshClone) {
  await runInit();
} else {
  await runSetup();
}

// ═══════════════════════════════════════════════════════════════
// INIT — interactive wizard for fresh clones
// ═══════════════════════════════════════════════════════════════

async function runInit() {
  let clack;
  try {
    clack = await import('@clack/prompts');
  } catch {
    console.log('\n  Installing dependencies first...\n');
    runVisible('pnpm install');
    clack = await import('@clack/prompts');
  }

  clack.intro('New Project Setup');

  // ─── Auto-detect defaults ───────────────────────────────
  const dirName = resolve(root).split(/[\\/]/).pop() || 'project';
  const defaultSlug = slugify(dirName);

  let ghUser = '';
  if (hasCommand('gh')) {
    try {
      ghUser = run('gh api user -q .login');
    } catch {
      /* gh installed but not authenticated */
    }
  }

  let projectName, displayName, createRepo;

  if (isAutoYes) {
    // ─── Non-interactive mode ───────────────────────────
    projectName = defaultSlug;
    displayName = defaultSlug;
    createRepo = false;
    clack.log.info(`Using defaults: ${projectName}`);
  } else {
    // ─── Interactive wizard ─────────────────────────────
    projectName = await clack.text({
      message: 'Project name (slug)',
      placeholder: defaultSlug,
      defaultValue: defaultSlug,
      validate: (v) => {
        if (!v) return 'Required';
        if (!/^[a-z0-9-]+$/.test(v))
          return 'Lowercase letters, numbers, and hyphens only';
      },
    });
    if (clack.isCancel(projectName)) {
      clack.cancel('Setup cancelled.');
      process.exit(0);
    }

    displayName = await clack.text({
      message: 'Display name',
      placeholder: String(projectName),
      defaultValue: String(projectName),
    });
    if (clack.isCancel(displayName)) {
      clack.cancel('Setup cancelled.');
      process.exit(0);
    }

    if (ghUser) {
      createRepo = await clack.confirm({
        message: `Create GitHub repo ${ghUser}/${projectName}?`,
        initialValue: true,
      });
      if (clack.isCancel(createRepo)) {
        clack.cancel('Setup cancelled.');
        process.exit(0);
      }
    } else {
      createRepo = false;
      if (hasCommand('gh')) {
        clack.log.info(
          'GitHub user not detected — run gh auth login to enable',
        );
      } else {
        clack.log.info(
          'GitHub CLI not found — install gh to enable repo creation',
        );
      }
    }
  }

  // ─── Configure git remotes ──────────────────────────────
  const s = clack.spinner();
  s.start('Configuring project...');

  try {
    const remotes = run('git remote').split('\n').filter(Boolean);
    if (remotes.includes('origin')) {
      const originUrl = run('git remote get-url origin');
      if (originUrl.includes(`${BASE_REPO_OWNER}/${BASE_REPO_NAME}`) || originUrl.includes(`mitambuch/${BASE_REPO_NAME}`)) {
        run(`git remote rename origin ${BASE_REMOTE_NAME}`);
      }
    }
  } catch {
    // No git or remote issues — ignore silently
  }

  // ─── Create GitHub repo ─────────────────────────────────
  if (createRepo && ghUser) {
    s.message(`Creating ${ghUser}/${projectName} on GitHub...`);
    try {
      run(
        `gh repo create ${ghUser}/${projectName} --private --source=. --remote=origin`,
      );
    } catch (e) {
      if (e.message?.includes('already exists')) {
        const currentRemotes = run('git remote').split('\n').filter(Boolean);
        if (!currentRemotes.includes('origin')) {
          run(
            `git remote add origin https://github.com/${ghUser}/${projectName}.git`,
          );
        }
      }
    }
  }

  // ─── Update package.json ────────────────────────────────
  pkg.name = String(projectName);
  pkg.version = '0.1.0';
  delete pkg._baseProject;
  if (ghUser && createRepo) {
    pkg.homepage = `https://github.com/${ghUser}/${projectName}`;
    pkg.repository = {
      type: 'git',
      url: `https://github.com/${ghUser}/${projectName}.git`,
    };
    pkg.bugs = {
      url: `https://github.com/${ghUser}/${projectName}/issues`,
    };
  }
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  // ─── Update manifest.json ───────────────────────────────
  const manifestPath = resolve(root, 'public/manifest.json');
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    manifest.name = String(displayName);
    manifest.short_name = String(projectName);
    manifest.description = String(displayName);
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  }

  // ─── Create .env.local ─────────────────────────────────
  const envLocal = resolve(root, '.env.local');
  const envExample = resolve(root, '.env.example');
  if (!existsSync(envLocal)) {
    copyFileSync(envExample, envLocal);
  }
  let envContent = readFileSync(envLocal, 'utf-8');
  envContent = envContent.replace(/VITE_APP_NAME=.*/, () => `VITE_APP_NAME=${displayName}`);
  writeFileSync(envLocal, envContent);

  // ─── Clean template artifacts ──────────────────────────
  const today = new Date().toISOString().split('T')[0];

  // WHY: index.html <title> shows "Project" until React hydrates — set it at setup time
  const indexHtmlPath = resolve(root, 'index.html');
  if (existsSync(indexHtmlPath)) {
    let indexHtml = readFileSync(indexHtmlPath, 'utf-8');
    indexHtml = indexHtml.replace(/<title>.*<\/title>/, `<title>${displayName}</title>`);
    writeFileSync(indexHtmlPath, indexHtml);
  }

  // WHY: README keeps template clone instructions — strip them, keep tech reference
  const readmePath = resolve(root, 'README.md');
  if (existsSync(readmePath)) {
    const readme = readFileSync(readmePath, 'utf-8');
    const techStackIdx = readme.indexOf('## Tech stack');
    if (techStackIdx !== -1) {
      writeFileSync(readmePath, `# ${displayName}\n\n---\n\n${readme.slice(techStackIdx)}`);
    }
  }

  // WHY: HANDOFF.md stays frozen with template name and version
  const handoffPath = resolve(root, 'HANDOFF.md');
  if (existsSync(handoffPath)) {
    let handoff = readFileSync(handoffPath, 'utf-8');
    handoff = handoff.replace(/^# .+/m, `# ${displayName} — Developer Handoff`);
    handoff = handoff.replace(/Project version: .+/, `Project version: 0.1.0`);
    handoff = handoff.replace(/Generated on: .+/, `Generated on: ${today}`);
    writeFileSync(handoffPath, handoff);
  }

  // WHY: Template logo image is meaningless in client projects
  const templateImg = resolve(root, 'public/images/steaksoap.png');
  if (existsSync(templateImg)) {
    unlinkSync(templateImg);
  }

  // ─── Reset CHANGELOG.md ────────────────────────────────
  writeFileSync(
    resolve(root, 'CHANGELOG.md'),
    `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## [0.1.0] (${today})\n\n### Features\n\n- project initialized\n`,
  );

  s.stop('Project configured');

  // ─── Validate ──────────────────────────────────────────
  clack.log.step(
    'Running validation (lint + typecheck + tests + build)...',
  );
  try {
    runVisible('pnpm validate');
    clack.log.success('All checks passed');
  } catch {
    clack.log.error(
      'Validation failed — fix the errors above before pushing.',
    );
    process.exit(1);
  }

  // ─── Initial commit + push ─────────────────────────────
  try {
    run('git add -A');
    run(
      `git commit -m "chore(init): bootstrap ${projectName}"`,
    );

    const currentRemotes = run('git remote').split('\n').filter(Boolean);
    if (currentRemotes.includes('origin')) {
      const pushSpinner = clack.spinner();
      pushSpinner.start('Pushing to origin/main...');
      runVisible('git push -u origin main');
      pushSpinner.stop('Pushed to origin/main');
    }
  } catch {
    // May fail if nothing to commit or no remote — that's OK
  }

  // ─── Done ──────────────────────────────────────────────
  clack.note(
    [
      'pnpm dev          → Start dev server',
      '',
      'Then open Claude Code and type /init',
      'Claude will customize colors, fonts, and content for your project.',
      '',
      'Other useful commands:',
      '  pnpm validate   → Run all checks',
      '  pnpm release    → Create a release',
      '  /help           → See all Claude Code commands',
    ].join('\n'),
    'Next steps',
  );

  clack.outro(`Project "${displayName}" ready!`);
}

// ═══════════════════════════════════════════════════════════════
// SETUP — light setup for already-initialized projects
// ═══════════════════════════════════════════════════════════════

async function runSetup() {
  console.log('\n  Project Setup\n');
  console.log('  ✓ Node.js ' + process.version);

  // Create .env.local if missing
  const envLocal = resolve(root, '.env.local');
  if (!existsSync(envLocal)) {
    copyFileSync(resolve(root, '.env.example'), envLocal);
    console.log('  → .env.local created from .env.example');
    console.log('    Fill in the values before running pnpm dev');
  } else {
    console.log('  ✓ .env.local exists');
  }

  // Validate
  console.log('\n  → Validating...\n');
  try {
    runVisible('pnpm validate');
    console.log('\n  ✓ All checks passed!');
  } catch {
    console.error('\n  ✗ Validation failed. Fix the errors above.');
    process.exit(1);
  }

  console.log('\n  Setup complete. Run pnpm dev to get started.\n');
}

// ═══════════════════════════════════════════════════════════════
// UPDATE — pull latest changes from upstream base
// ═══════════════════════════════════════════════════════════════

async function runUpdate() {
  console.log('\n  Update from upstream base\n');

  // Check clean working tree
  const status = run('git status --porcelain');
  if (status) {
    console.error(
      '  ✗ Working tree not clean. Commit or stash your changes first.',
    );
    process.exit(1);
  }
  console.log('  ✓ Working tree clean');

  // Add base remote if needed (also migrate legacy "template" remote)
  const remotes = run('git remote').split('\n').filter(Boolean);
  if (remotes.includes('template') && !remotes.includes(BASE_REMOTE_NAME)) {
    console.log(`  → Migrating "template" remote to "${BASE_REMOTE_NAME}"...`);
    run(`git remote rename template ${BASE_REMOTE_NAME}`);
    run(`git remote set-url ${BASE_REMOTE_NAME} ${BASE_REMOTE_URL}`);
    console.log(`  ✓ Remote "${BASE_REMOTE_NAME}" configured`);
  } else if (!remotes.includes(BASE_REMOTE_NAME)) {
    console.log(`  → Adding remote "${BASE_REMOTE_NAME}"...`);
    run(`git remote add ${BASE_REMOTE_NAME} ${BASE_REMOTE_URL}`);
    console.log(`  ✓ Remote "${BASE_REMOTE_NAME}" added`);
  } else {
    console.log(`  ✓ Remote "${BASE_REMOTE_NAME}" exists`);
  }

  // Fetch + merge
  console.log('  → Fetching updates...');
  runVisible(`git fetch ${BASE_REMOTE_NAME}`);

  // Client-owned memory paths — never overwritten by upstream.
  // MUST stay in sync with scripts/base-patch.js PROTECTED list.
  const PROTECTED = [
    '.claude/memory/decisions/',
    '.claude/memory/feedback/',
    '.claude/memory/patterns/',
    '.claude/memory/frictions/',
    '.claude/memory/sessions/',
    '.claude/memory/INDEX.md',
    '.claude/client.md',
  ];
  const protectedBackup = new Map();
  for (const p of PROTECTED) {
    try {
      const list = run(`git ls-files "${p}"`).split('\n').filter(Boolean);
      for (const f of list) {
        protectedBackup.set(f, readFileSync(resolve(PATHS.root, f), 'utf-8'));
      }
    } catch {
      // path may not exist yet — skip
    }
  }

  console.log(`  → Merging ${BASE_REMOTE_NAME}/main...`);
  try {
    runVisible(`git merge ${BASE_REMOTE_NAME}/main --no-edit`);
    console.log('\n  ✓ Merge complete');
  } catch {
    console.log(
      '\n  ⚠ Conflicts detected. Resolve them manually then: git add . && git commit',
    );
  }

  // Restore protected memory files if merge altered them
  if (protectedBackup.size > 0) {
    for (const [file, content] of protectedBackup) {
      writeFileSync(resolve(PATHS.root, file), content);
    }
    console.log(`  ✓ Restored ${protectedBackup.size} protected memory file(s).`);
  }

  // Reinstall deps (versions may have changed)
  console.log('\n  → Updating dependencies...');
  runVisible('pnpm install');

  console.log('\n  Done.\n');
}

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function hasCommand(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}
