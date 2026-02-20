#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   INIT — initialise un nouveau projet client depuis le starter
   Cross-platform (Windows, macOS, Linux).

   Ce script (interactif) :
   1. Demande le nom du projet + nom d'affichage
   2. Renomme le remote origin → template
   3. Crée le repo GitHub et l'ajoute comme origin (optionnel)
   4. Met à jour package.json avec le nom du projet
   5. Crée .env.local avec le nom d'affichage
   6. Installe les dépendances
   7. Valide (lint + typecheck + tests + build)
   8. Commit initial + push

   Usage :
     git clone https://github.com/Mircooo/starter.git mon-projet
     cd mon-projet
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

console.log(bold('\n  Starter — Nouveau Projet\n'));

// ─── 1. Check Node version ──────────────────────────────────
const nodeVersion = parseInt(process.version.slice(1));
if (nodeVersion < 20) {
  console.error(red(`  ✗ Node.js 20+ requis (actuel : ${process.version})`));
  rl.close();
  process.exit(1);
}

// ─── 2. Collect info ─────────────────────────────────────────
const projectName = await ask('Nom du projet (slug)', slugify(resolve(root).split(/[\\/]/).pop() || 'project'));
const displayName = await ask('Nom d\'affichage', projectName);
const ghOrg = 'Mircooo';
const createRepo = (await ask(`Créer le repo GitHub ${ghOrg}/${projectName} ? (o/n)`, 'o')).toLowerCase();
const wantsGitHub = createRepo === 'o' || createRepo === 'oui' || createRepo === 'y' || createRepo === 'yes';

console.log('');

// ─── 3. Configure remotes ────────────────────────────────────
const remotes = run('git remote').split('\n').filter(Boolean);

if (remotes.includes('origin') && !remotes.includes('template')) {
  console.log(yellow('  → Renommage origin → template...'));
  run('git remote rename origin template');
  console.log(green('  ✓ Remote "template" → starter'));
} else if (remotes.includes('template')) {
  console.log(green('  ✓ Remote "template" existe déjà'));
} else {
  console.log(yellow('  → Pas de remote origin à renommer'));
}

// ─── 4. Create GitHub repo + set as origin ───────────────────
if (wantsGitHub) {
  if (!hasCommand('gh')) {
    console.log(red('  ✗ GitHub CLI (gh) non trouvé. Installe-le : https://cli.github.com'));
    console.log(yellow('  → Tu pourras ajouter le remote manuellement plus tard.'));
  } else {
    const repoFullName = `${ghOrg}/${projectName}`;
    console.log(yellow(`  → Création du repo ${repoFullName} sur GitHub...`));
    try {
      run(`gh repo create ${repoFullName} --private --source=. --remote=origin`);
      console.log(green(`  ✓ Repo ${repoFullName} créé et ajouté comme origin`));
    } catch (e) {
      if (e.message?.includes('already exists')) {
        console.log(yellow(`  → Le repo ${repoFullName} existe déjà`));
        if (!remotes.includes('origin')) {
          run(`git remote add origin https://github.com/${repoFullName}.git`);
          console.log(green(`  ✓ Remote origin ajouté`));
        }
      } else {
        console.log(red(`  ✗ Erreur création repo : ${e.message}`));
        console.log(yellow('  → Tu pourras le créer manuellement plus tard.'));
      }
    }
  }
} else {
  console.log(dim('  ⏭ Création GitHub repo ignorée'));
}

// ─── 5. Update package.json ──────────────────────────────────
console.log(yellow('\n  → Mise à jour de package.json...'));
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
console.log(green(`  ✓ .env.local créé avec APP_NAME="${displayName}"`));

// ─── 7. Reset CHANGELOG.md ──────────────────────────────────
console.log(yellow('\n  → Réinitialisation du CHANGELOG...'));
const today = new Date().toISOString().split('T')[0];
const freshChangelog = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## [0.1.0] (${today})\n\n### ✨ Features\n\n- project initialized from starter\n`;
writeFileSync(resolve(root, 'CHANGELOG.md'), freshChangelog);
console.log(green('  ✓ CHANGELOG.md remis à zéro'));

// ─── 8. Install dependencies ─────────────────────────────────
console.log(yellow('\n  → Installation des dépendances...'));
runVisible('pnpm install');
console.log(green('  ✓ Dépendances installées'));

// ─── 9. Validate ─────────────────────────────────────────────
console.log(yellow('\n  → Validation (lint + typecheck + tests + build)...'));
try {
  runVisible('pnpm validate');
  console.log(green('  ✓ Tout passe !'));
} catch {
  console.log(yellow('  ⚠ Validation échouée — corrige les erreurs avant de push.'));
}

// ─── 10. Initial commit + push ───────────────────────────────
console.log(yellow('\n  → Commit initial...'));
try {
  run('git add -A');
  run(`git commit -m "chore(init): bootstrap ${projectName} from starter"`);
  console.log(green('  ✓ Commit initial créé'));

  // Push if origin exists
  const currentRemotes = run('git remote').split('\n').filter(Boolean);
  if (currentRemotes.includes('origin')) {
    console.log(yellow('  → Push vers origin/main...'));
    runVisible('git push -u origin main');
    console.log(green('  ✓ Pushé sur origin/main'));
  }
} catch (e) {
  console.log(yellow(`  ⚠ ${e.message?.split('\n')[0]}`));
}

// ─── Done ────────────────────────────────────────────────────
console.log(bold(green(`\n  Projet "${displayName}" prêt !`)));
console.log(dim('  Lance pnpm dev pour démarrer.\n'));

rl.close();
