#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SETUP — unified project setup wizard
   Cross-platform (Windows, macOS, Linux).

   Modes:
     pnpm setup           → auto-detect (init wizard or light setup)
     pnpm setup --update  → pull updates from starter template
     pnpm setup --yes     → non-interactive init (CI/testing)

   The script auto-detects whether this is a fresh clone
   (package name is "starter") or an already-initialized project.
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';

import { PATHS } from './utils/paths.js';

const root = PATHS.root;
const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

// ─── Mode detection ─────────────────────────────────────────
const isUpdate = process.argv.includes('--update');
const isAutoYes =
  process.argv.includes('--yes') || process.argv.includes('-y');

// ─── Fresh clone detection ──────────────────────────────────
const pkgPath = resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const isFreshClone = pkg.name === 'steaksoap';

// ─── Node version check ────────────────────────────────────
const nodeVersion = parseInt(process.version.slice(1));
if (nodeVersion < 20) {
  console.error(`\n  ✗ Node.js 20+ required (current: ${process.version})\n`);
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

  clack.intro('steaksoap — New Project');

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

  let projectName, displayName, createRepo, keepPlayground, keepSteaksoap;

  if (isAutoYes) {
    // ─── Non-interactive mode ───────────────────────────
    projectName = defaultSlug;
    displayName = defaultSlug;
    createRepo = false;
    keepPlayground = false;
    keepSteaksoap = true;
    clack.log.info(`Using defaults: ${projectName}`);
  } else {
    // ─── Interactive wizard (3 questions) ───────────────
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

    keepPlayground = await clack.confirm({
      message: 'Keep the Playground page? (UI component showcase at /playground)',
      initialValue: false,
    });
    if (clack.isCancel(keepPlayground)) {
      clack.cancel('Setup cancelled.');
      process.exit(0);
    }

    keepSteaksoap = await clack.confirm({
      message: 'Keep the Steaksoap showcase page? (original template at /steaksoap)',
      initialValue: true,
    });
    if (clack.isCancel(keepSteaksoap)) {
      clack.cancel('Setup cancelled.');
      process.exit(0);
    }
  }

  // ─── Configure git remotes ──────────────────────────────
  const s = clack.spinner();
  s.start('Configuring project...');

  const remotes = run('git remote').split('\n').filter(Boolean);
  if (remotes.includes('origin') && !remotes.includes('template')) {
    try {
      const originUrl = run('git remote get-url origin');
      const isTemplateOrigin =
        originUrl.includes('mitambuch/starter') ||
        originUrl.includes('mitambuch/steaksoap');

      if (isTemplateOrigin) {
        // Direct clone — rename origin to template so user can add their own origin
        run('git remote rename origin template');
      } else {
        // "Use this template" — origin is already the user's repo, add template separately
        run(
          'git remote add template https://github.com/mitambuch/steaksoap.git',
        );
      }
    } catch {
      // No git or remote issues — ignore silently
    }
  }

  // ─── Create GitHub repo ─────────────────────────────────
  if (createRepo && ghUser) {
    s.message(`Creating ${ghUser}/${projectName} on GitHub...`);
    try {
      run(
        `gh repo create ${ghUser}/${projectName} --public --source=. --remote=origin`,
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

  // ─── Create .env.local ─────────────────────────────────
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

  // ─── Reset CHANGELOG.md ────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  writeFileSync(
    resolve(root, 'CHANGELOG.md'),
    `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## [0.1.0] (${today})\n\n### Features\n\n- project initialized from steaksoap\n`,
  );

  // ─── Clean up demo/showcase files ──────────────────────
  s.message('Cleaning up demo files...');

  // Replace showcase Home with minimal template
  const templateHome = resolve(root, 'scripts/templates/Home.tsx');
  if (existsSync(templateHome)) {
    copyFileSync(templateHome, resolve(root, 'src/pages/Home.tsx'));
  }

  // Always remove Welcome page (post-clone guide, not needed after setup)
  const welcomePath = resolve(root, 'src/pages/Welcome.tsx');
  if (existsSync(welcomePath)) rmSync(welcomePath);

  // Remove Welcome route and import from routes/index.tsx
  const welcomeRoutesPath = PATHS.routesConfig;
  if (existsSync(welcomeRoutesPath)) {
    let routes = readFileSync(welcomeRoutesPath, 'utf-8');
    routes = routes.replace(
      /const Welcome = lazy\(\(\) => import\('@pages\/Welcome'\)\);\n/,
      '',
    );
    routes = routes.replace(
      /\s*<Route path=\{ROUTES\.WELCOME\} element=\{<Welcome \/>\} \/>\n/,
      '\n',
    );
    writeFileSync(welcomeRoutesPath, routes);
  }

  // Remove WELCOME from route constants
  const welcomeRouteConstsPath = PATHS.routes;
  if (existsSync(welcomeRouteConstsPath)) {
    let consts = readFileSync(welcomeRouteConstsPath, 'utf-8');
    consts = consts.replace(/\s*WELCOME:\s*'\/welcome',?\n/, '\n');
    writeFileSync(welcomeRouteConstsPath, consts);
  }

  // Remove Welcome nav item from site config
  const welcomeSiteConfigPath = PATHS.siteConfig;
  if (existsSync(welcomeSiteConfigPath)) {
    let siteTs = readFileSync(welcomeSiteConfigPath, 'utf-8');
    siteTs = siteTs.replace(
      /\s*\{\s*label:\s*'Welcome',\s*href:\s*ROUTES\.WELCOME\s*\},?\n/,
      '\n',
    );
    writeFileSync(welcomeSiteConfigPath, siteTs);
  }

  // Remove files no longer needed post-setup
  const filesToRemove = [
    // Always removed (not needed post-setup)
    'src/features/counter',
  ];

  // Showcase-dependent files — only remove if Steaksoap page is also removed
  if (!keepSteaksoap) {
    filesToRemove.push(
      'src/data/showcase.ts',
      'src/components/ui/FeatureCard.tsx',
      'src/components/ui/CodeBlock.tsx',
      'src/components/ui/TechBadge.tsx',
      'src/components/ui/Noise.tsx',
      'src/components/ui/Section.tsx',
      'src/hooks/useInView.ts',
    );
  }

  for (const file of filesToRemove) {
    const p = resolve(root, file);
    if (existsSync(p)) {
      const stat = statSync(p);
      if (stat.isDirectory()) {
        rmSync(p, { recursive: true });
      } else {
        rmSync(p);
      }
    }
  }

  // Remove cursor-hidden CSS utility (showcase-only, a11y concern)
  const indexCssPath = PATHS.indexCSS;
  if (existsSync(indexCssPath)) {
    let css = readFileSync(indexCssPath, 'utf-8');
    css = css.replace(
      /\n?\/\* a11y: cursor-hidden.*\*\/\n\.cursor-hidden,\n\.cursor-hidden \* \{\n\s*cursor: none !important;\n\}\n/,
      '\n',
    );
    writeFileSync(indexCssPath, css);
  }

  // Remove Playground page and route (unless user chose to keep it)
  if (!keepPlayground) {
    const playgroundPath = resolve(root, 'src/pages/Playground.tsx');
    if (existsSync(playgroundPath)) rmSync(playgroundPath);

    // Remove Playground route and import from routes/index.tsx
    const routesPath = PATHS.routesConfig;
    if (existsSync(routesPath)) {
      let routes = readFileSync(routesPath, 'utf-8');
      routes = routes.replace(
        /const Playground = lazy\(\(\) => import\('@pages\/Playground'\)\);\n/,
        '',
      );
      routes = routes.replace(
        /\s*<Route path=\{ROUTES\.PLAYGROUND\} element=\{<Playground \/>\} \/>\n/,
        '\n',
      );
      writeFileSync(routesPath, routes);
    }

    // Remove PLAYGROUND from route constants
    const routeConstsPath = PATHS.routes;
    if (existsSync(routeConstsPath)) {
      let consts = readFileSync(routeConstsPath, 'utf-8');
      consts = consts.replace(/\s*PLAYGROUND:\s*'\/playground',?\n/, '\n');
      writeFileSync(routeConstsPath, consts);
    }

    // Remove Playground nav item from site config
    const siteConfigPath = PATHS.siteConfig;
    if (existsSync(siteConfigPath)) {
      let siteTs = readFileSync(siteConfigPath, 'utf-8');
      siteTs = siteTs.replace(
        /\s*\{\s*label:\s*'Playground',\s*href:\s*'\/playground'\s*\},?\n/,
        '\n',
      );
      writeFileSync(siteConfigPath, siteTs);
    }
  }

  // Remove Steaksoap page and route (unless user chose to keep it)
  if (!keepSteaksoap) {
    const steaksoapPath = resolve(root, 'src/pages/Steaksoap.tsx');
    if (existsSync(steaksoapPath)) rmSync(steaksoapPath);

    // Remove Steaksoap route and import from routes/index.tsx
    const routesPath = PATHS.routesConfig;
    if (existsSync(routesPath)) {
      let routes = readFileSync(routesPath, 'utf-8');
      routes = routes.replace(
        /const Steaksoap = lazy\(\(\) => import\('@pages\/Steaksoap'\)\);\n/,
        '',
      );
      routes = routes.replace(
        /\s*<Route path=\{ROUTES\.STEAKSOAP\} element=\{<Steaksoap \/>\} \/>\n/,
        '\n',
      );
      writeFileSync(routesPath, routes);
    }

    // Remove STEAKSOAP from route constants
    const routeConstsPath = PATHS.routes;
    if (existsSync(routeConstsPath)) {
      let consts = readFileSync(routeConstsPath, 'utf-8');
      consts = consts.replace(/\s*STEAKSOAP:\s*'\/steaksoap',?\n/, '\n');
      writeFileSync(routeConstsPath, consts);
    }

    // Remove Steaksoap nav item from site config
    const steaksoapSiteConfigPath = PATHS.siteConfig;
    if (existsSync(steaksoapSiteConfigPath)) {
      let siteTs = readFileSync(steaksoapSiteConfigPath, 'utf-8');
      siteTs = siteTs.replace(
        /\s*\{\s*label:\s*'Steaksoap',\s*href:\s*ROUTES\.STEAKSOAP\s*\},?\n/,
        '\n',
      );
      writeFileSync(steaksoapSiteConfigPath, siteTs);
    }
  }

  s.stop('Project configured');

  // ─── Validate ──────────────────────────────────────────
  clack.log.step(
    'Running validation (lint + typecheck + tests + build)...',
  );
  try {
    runVisible('pnpm validate');
    clack.log.success('All checks passed');
  } catch {
    clack.log.warn(
      'Validation had issues — check the output above and fix before pushing',
    );
  }

  // ─── Initial commit + push ─────────────────────────────
  try {
    run('git add -A');
    run(
      `git commit -m "chore(init): bootstrap ${projectName} from steaksoap"`,
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
  console.log('\n  steaksoap — Setup\n');
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
// UPDATE — pull latest changes from starter template
// ═══════════════════════════════════════════════════════════════

async function runUpdate() {
  const TEMPLATE_REMOTE = 'template';
  const TEMPLATE_URL = 'https://github.com/mitambuch/steaksoap.git';

  console.log('\n  steaksoap — Update from template\n');

  // Check clean working tree
  const status = run('git status --porcelain');
  if (status) {
    console.error(
      '  ✗ Working tree not clean. Commit or stash your changes first.',
    );
    process.exit(1);
  }
  console.log('  ✓ Working tree clean');

  // Add template remote if needed
  const remotes = run('git remote');
  if (!remotes.split('\n').includes(TEMPLATE_REMOTE)) {
    console.log(`  → Adding remote "${TEMPLATE_REMOTE}"...`);
    run(`git remote add ${TEMPLATE_REMOTE} ${TEMPLATE_URL}`);
    console.log(`  ✓ Remote "${TEMPLATE_REMOTE}" added`);
  } else {
    console.log(`  ✓ Remote "${TEMPLATE_REMOTE}" exists`);
  }

  // Fetch + merge
  console.log('  → Fetching updates...');
  runVisible(`git fetch ${TEMPLATE_REMOTE}`);

  console.log('  → Merging template/main...');
  try {
    runVisible(`git merge ${TEMPLATE_REMOTE}/main --no-edit`);
    console.log('\n  ✓ Merge complete');
  } catch {
    console.log(
      '\n  ⚠ Conflicts detected. Resolve them manually then: git add . && git commit',
    );
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
