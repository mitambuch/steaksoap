#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   INIT — initialize a new project from the starter
   Cross-platform (Windows, macOS, Linux).

   This script (interactive):
   1. Checks Node 20+ and pnpm
   2. Asks for project name + display name
   3. Auto-detects GitHub user, optionally creates a public repo
   4. Renames the origin remote → template
   5. Creates GitHub repo + sets as origin
   6. Updates package.json with project name
   7. Creates .env.local with the display name
   8. Resets CHANGELOG.md
   9. Cleans up demo files (showcase, counter)
   10. Installs dependencies
   11. Validates (lint + typecheck + tests + build)
   12. Initial commit + push + welcome message

   Usage:
     git clone https://github.com/Mircooo/starter.git my-project
     cd my-project
     node scripts/init.js

   Flags:
     --yes, -y    Accept all defaults (for CI/testing)
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'child_process';
import {
  existsSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  rmSync,
} from 'fs';
import { resolve } from 'path';
import { createInterface } from 'readline/promises';

const root = resolve(import.meta.dirname, '..');
const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });
const autoYes =
  process.argv.includes('--yes') || process.argv.includes('-y');

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
  if (autoYes) return fallback || '';
  const suffix = fallback ? dim(` (${fallback})`) : '';
  const answer = await rl.question(`  ${question}${suffix} : `);
  return answer.trim() || fallback || '';
}

console.log(bold('\n  Starter — New Project\n'));

// ─── 1. Check prerequisites ─────────────────────────────────
const nodeVersion = parseInt(process.version.slice(1));
if (nodeVersion < 20) {
  console.error(
    red(`  ✗ Node.js 20+ required (current: ${process.version})`),
  );
  rl.close();
  process.exit(1);
}

if (!hasCommand('pnpm')) {
  console.error(red('  ✗ pnpm not found.'));
  console.log(
    yellow(
      '  → Install it: corepack enable && corepack prepare pnpm@latest --activate',
    ),
  );
  console.log(dim('  → Or: npm install -g pnpm'));
  rl.close();
  process.exit(1);
}
console.log(green('  ✓ Node ' + process.version + ' + pnpm'));

// ─── 2. Collect info ─────────────────────────────────────────
const defaultSlug = slugify(
  resolve(root).split(/[\\/]/).pop() || 'project',
);
const projectName = await ask('Project name (slug)', defaultSlug);
const displayName = await ask('Display name', projectName);

// ─── 3. Detect GitHub user ───────────────────────────────────
let ghUser = '';
const hasGh = hasCommand('gh');

if (hasGh) {
  try {
    ghUser = run('gh api user -q .login');
  } catch {
    // gh installed but not authenticated
  }
}

let wantsGitHub = false;
if (ghUser) {
  const createRepo = (
    await ask(`Create public GitHub repo ${ghUser}/${projectName}? (y/n)`, 'y')
  ).toLowerCase();
  wantsGitHub = createRepo === 'y' || createRepo === 'yes';
} else if (hasGh) {
  console.log(
    dim('  ⏭ GitHub user not detected (run `gh auth login` to enable)'),
  );
} else {
  console.log(dim('  ⏭ GitHub CLI not found (install gh to enable)'));
}

console.log('');

// ─── 4. Configure remotes ────────────────────────────────────
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

// ─── 5. Create GitHub repo + set as origin ───────────────────
if (wantsGitHub && ghUser) {
  const repoFullName = `${ghUser}/${projectName}`;
  console.log(yellow(`  → Creating repo ${repoFullName} on GitHub...`));
  try {
    run(
      `gh repo create ${repoFullName} --public --source=. --remote=origin`,
    );
    console.log(green(`  ✓ Repo ${repoFullName} created (public)`));
  } catch (e) {
    if (e.message?.includes('already exists')) {
      console.log(yellow(`  → Repo ${repoFullName} already exists`));
      const currentRemotes = run('git remote').split('\n').filter(Boolean);
      if (!currentRemotes.includes('origin')) {
        run(
          `git remote add origin https://github.com/${repoFullName}.git`,
        );
        console.log(green('  ✓ Remote origin added'));
      }
    } else {
      console.log(red(`  ✗ Error creating repo: ${e.message}`));
      console.log(yellow('  → You can create it manually later.'));
    }
  }
} else if (!wantsGitHub) {
  console.log(dim('  ⏭ GitHub repo creation skipped'));
}

// ─── 6. Update package.json ──────────────────────────────────
console.log(yellow('\n  → Updating package.json...'));
const pkgPath = resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
pkg.name = projectName;
pkg.version = '0.1.0';
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(green(`  ✓ name: "${projectName}"`));

// ─── 7. Create .env.local ────────────────────────────────────
const envLocal = resolve(root, '.env.local');
const envExample = resolve(root, '.env.example');

if (!existsSync(envLocal)) {
  copyFileSync(envExample, envLocal);
}

let envContent = readFileSync(envLocal, 'utf-8');
envContent = envContent.replace(
  /VITE_APP_NAME=.*/,
  `VITE_APP_NAME=${displayName}`,
);
writeFileSync(envLocal, envContent);
console.log(green(`  ✓ .env.local created with APP_NAME="${displayName}"`));

// ─── 8. Reset CHANGELOG.md ──────────────────────────────────
console.log(yellow('\n  → Resetting CHANGELOG...'));
const today = new Date().toISOString().split('T')[0];
const freshChangelog = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## [0.1.0] (${today})\n\n### ✨ Features\n\n- project initialized from starter\n`;
writeFileSync(resolve(root, 'CHANGELOG.md'), freshChangelog);
console.log(green('  ✓ CHANGELOG.md reset'));

// ─── 9. Clean up demo files ─────────────────────────────────
console.log(yellow('\n  → Cleaning up demo files...'));

// Replace showcase Home with minimal template
const templateHome = resolve(root, 'scripts/templates/Home.tsx');
if (existsSync(templateHome)) {
  copyFileSync(templateHome, resolve(root, 'src/pages/Home.tsx'));
  console.log(green('  ✓ Home.tsx → minimal template'));
}

// Remove showcase data
const showcaseData = resolve(root, 'src/data/showcase.ts');
if (existsSync(showcaseData)) {
  rmSync(showcaseData);
  console.log(green('  ✓ Removed showcase data'));
}

// Remove counter demo feature
const counterDir = resolve(root, 'src/features/counter');
if (existsSync(counterDir)) {
  rmSync(counterDir, { recursive: true });
  console.log(green('  ✓ Removed counter demo'));
}

// Remove showcase-only components
const showcaseComponents = [
  'src/components/ui/FeatureCard.tsx',
  'src/components/ui/CodeBlock.tsx',
  'src/components/ui/TechBadge.tsx',
];
for (const file of showcaseComponents) {
  const filePath = resolve(root, file);
  if (existsSync(filePath)) {
    rmSync(filePath);
  }
}
console.log(green('  ✓ Removed showcase components'));

// ─── 10. Install dependencies ────────────────────────────────
console.log(yellow('\n  → Installing dependencies...'));
runVisible('pnpm install');
console.log(green('  ✓ Dependencies installed'));

// ─── 11. Validate ────────────────────────────────────────────
console.log(yellow('\n  → Validating (lint + typecheck + tests + build)...'));
try {
  runVisible('pnpm validate');
  console.log(green('  ✓ All checks passed!'));
} catch {
  console.log(
    yellow('  ⚠ Validation failed — fix the errors before pushing.'),
  );
}

// ─── 12. Initial commit + push ───────────────────────────────
console.log(yellow('\n  → Initial commit...'));
try {
  run('git add -A');
  run(
    `git commit -m "chore(init): bootstrap ${projectName} from starter"`,
  );
  console.log(green('  ✓ Initial commit created'));

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
console.log(bold(green(`\n  ✓ Project "${displayName}" ready!\n`)));
console.log(`  ${bold('Next steps:')}`);
console.log(`    ${dim('pnpm dev')}          → Start dev server`);
console.log(`    ${dim('pnpm validate')}     → Run all checks`);
console.log(`    ${dim('pnpm release')}      → Create a release`);
console.log('');
console.log(`  ${bold('Useful files:')}`);
console.log(`    ${dim('CLAUDE.md')}         → AI agent instructions`);
console.log(`    ${dim('src/pages/')}        → Add your pages here`);
console.log(`    ${dim('src/components/')}   → Reusable UI components`);
console.log('');
console.log(dim('  Happy building!\n'));

rl.close();
