#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   INIT — initialize a new project from the starter
   Cross-platform (Windows, macOS, Linux).

   This script (interactive):
   1. Asks for project name + display name
   2. Renames the origin remote → template
   3. Creates a GitHub repo and adds it as origin (optional)
   4. Updates package.json with the project name
   5. Creates .env.local with the display name
   6. Installs dependencies
   7. Validates (lint + typecheck + tests + build)
   8. Initial commit + push

   Usage:
     git clone https://github.com/Mircooo/starter.git my-project
     cd my-project
     node scripts/init.js
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { resolve } from 'path';
import { createInterface } from 'readline/promises';

const root = resolve(import.meta.dirname, '..');
const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

// ─── Colors ──────────────────────────────────────────────────
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

// ─── Helpers ─────────────────────────────────────────────────
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

// ─── Main ────────────────────────────────────────────────────
const rl = createInterface({ input: process.stdin, output: process.stdout });

async function ask(question, fallback) {
  const suffix = fallback ? dim(` (${fallback})`) : '';
  const answer = await rl.question(`  ${question}${suffix} : `);
  return answer.trim() || fallback || '';
}

console.log(bold('\n  Starter — New Project\n'));

// ─── 1. Check Node version ──────────────────────────────────
const nodeVersion = parseInt(process.version.slice(1));
if (nodeVersion < 20) {
  console.error(red(`  ✗ Node.js 20+ required (current: ${process.version})`));
  rl.close();
  process.exit(1);
}

// ─── 2. Collect info ─────────────────────────────────────────
const projectName = await ask('Project name (slug)', slugify(resolve(root).split(/[\\/]/).pop() || 'project'));
const displayName = await ask('Display name', projectName);
const ghOrg = 'Mircooo';
const createRepo = (await ask(`Create GitHub repo ${ghOrg}/${projectName}? (y/n)`, 'y')).toLowerCase();
const wantsGitHub = createRepo === 'y' || createRepo === 'yes';

console.log('');

// ─── 3. Configure remotes ────────────────────────────────────
const remotes = run('git remote').split('\n').filter(Boolean);

if (remotes.includes('origin') && !remotes.includes('template')) {
  console.log(yellow('  → Renaming origin → template...'));
  run('git remote rename origin template');
  console.log(green('  ✓ Remote "template" → starter'));
} else if (remotes.includes('template')) {
  console.log(green('  ✓ Remote "template" already exists'));
} else {
  console.log(yellow('  → No origin remote to rename'));
}

// ─── 4. Create GitHub repo + set as origin ───────────────────
if (wantsGitHub) {
  if (!hasCommand('gh')) {
    console.log(red('  ✗ GitHub CLI (gh) not found. Install it: https://cli.github.com'));
    console.log(yellow('  → You can add the remote manually later.'));
  } else {
    const repoFullName = `${ghOrg}/${projectName}`;
    console.log(yellow(`  → Creating repo ${repoFullName} on GitHub...`));
    try {
      run(`gh repo create ${repoFullName} --private --source=. --remote=origin`);
      console.log(green(`  ✓ Repo ${repoFullName} created and added as origin`));
    } catch (e) {
      if (e.message?.includes('already exists')) {
        console.log(yellow(`  → Repo ${repoFullName} already exists`));
        if (!remotes.includes('origin')) {
          run(`git remote add origin https://github.com/${repoFullName}.git`);
          console.log(green(`  ✓ Remote origin added`));
        }
      } else {
        console.log(red(`  ✗ Error creating repo: ${e.message}`));
        console.log(yellow('  → You can create it manually later.'));
      }
    }
  }
} else {
  console.log(dim('  ⏭ GitHub repo creation skipped'));
}

// ─── 5. Update package.json ──────────────────────────────────
console.log(yellow('\n  → Updating package.json...'));
const pkgPath = resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
pkg.name = projectName;
pkg.version = '0.1.0';
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(green(`  ✓ name: "${projectName}"`));

// ─── 6. Create .env.local ────────────────────────────────────
const envLocal = resolve(root, '.env.local');
const envExample = resolve(root, '.env.example');

if (!existsSync(envLocal)) {
  copyFileSync(envExample, envLocal);
}

// Update APP_NAME in .env.local
let envContent = readFileSync(envLocal, 'utf-8');
envContent = envContent.replace(/VITE_APP_NAME=.*/, `VITE_APP_NAME=${displayName}`);
writeFileSync(envLocal, envContent);
console.log(green(`  ✓ .env.local created with APP_NAME="${displayName}"`));

// ─── 7. Reset CHANGELOG.md ──────────────────────────────────
console.log(yellow('\n  → Resetting CHANGELOG...'));
const today = new Date().toISOString().split('T')[0];
const freshChangelog = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## [0.1.0] (${today})\n\n### ✨ Features\n\n- project initialized from starter\n`;
writeFileSync(resolve(root, 'CHANGELOG.md'), freshChangelog);
console.log(green('  ✓ CHANGELOG.md reset'));

// ─── 8. Install dependencies ─────────────────────────────────
console.log(yellow('\n  → Installing dependencies...'));
runVisible('pnpm install');
console.log(green('  ✓ Dependencies installed'));

// ─── 9. Validate ─────────────────────────────────────────────
console.log(yellow('\n  → Validating (lint + typecheck + tests + build)...'));
try {
  runVisible('pnpm validate');
  console.log(green('  ✓ All checks passed!'));
} catch {
  console.log(yellow('  ⚠ Validation failed — fix the errors before pushing.'));
}

// ─── 10. Initial commit + push ───────────────────────────────
console.log(yellow('\n  → Initial commit...'));
try {
  run('git add -A');
  run(`git commit -m "chore(init): bootstrap ${projectName} from starter"`);
  console.log(green('  ✓ Initial commit created'));

  // Push if origin exists
  const currentRemotes = run('git remote').split('\n').filter(Boolean);
  if (currentRemotes.includes('origin')) {
    console.log(yellow('  → Pushing to origin/main...'));
    runVisible('git push -u origin main');
    console.log(green('  ✓ Pushed to origin/main'));
  }
} catch (e) {
  console.log(yellow(`  ⚠ ${e.message?.split('\n')[0]}`));
}

// ─── Done ────────────────────────────────────────────────────
console.log(bold(green(`\n  Project "${displayName}" ready!`)));
console.log(dim('  Run pnpm dev to get started.\n'));

rl.close();
