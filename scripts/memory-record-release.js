#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   MEMORY-RECORD-RELEASE — writes a decision entry after release-it

   Called by .release-it.json "after:release" hook. Captures the
   release in .claude/memory/decisions/ so future sessions can trace
   every version back to its motivation.
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { PATHS } from './utils/paths.js';

const run = (cmd) => execSync(cmd, { cwd: PATHS.root, encoding: 'utf-8' }).trim();

// Extract owner/repo from `git remote get-url origin`. Supports both
// HTTPS and SSH URLs, falls back to null on detached / no-remote setups.
function detectRepoSlug() {
  try {
    const url = run('git remote get-url origin');
    const m = url.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    return m ? `${m[1]}/${m[2]}` : null;
  } catch {
    return null;
  }
}

function main() {
  const pkg = JSON.parse(readFileSync(join(PATHS.root, 'package.json'), 'utf-8'));
  const version = pkg.version;
  const today = new Date().toISOString().slice(0, 10);
  const slug = `release-v${version}`;
  const file = join(PATHS.root, '.claude/memory/decisions', `${today}-${slug}.md`);

  if (existsSync(file)) {
    console.log(`  ⓘ memory entry already exists: ${file}`);
    return;
  }

  // Collect commits since previous tag
  let commits = '';
  let previousTag = null;
  try {
    const tags = run('git tag --sort=-v:refname').split('\n').filter(Boolean);
    previousTag = tags[1] || null; // current = tags[0], previous = tags[1]
    if (previousTag) {
      commits = run(`git log ${previousTag}..HEAD --pretty=format:"- %s"`);
    } else {
      commits = run('git log --pretty=format:"- %s" -20');
    }
  } catch {
    commits = '(unable to gather commits)';
  }

  // Build cross-reference links so each release entry traces back to the
  // canonical artifacts (git tag, CHANGELOG anchor, compare diff).
  const repoSlug = detectRepoSlug();
  const refs = [];
  if (repoSlug) {
    refs.push(`- **Git tag:** [v${version}](https://github.com/${repoSlug}/releases/tag/v${version})`);
    if (previousTag) {
      refs.push(`- **Diff:** [${previousTag}…v${version}](https://github.com/${repoSlug}/compare/${previousTag}...v${version})`);
    }
  }
  // CHANGELOG anchor: GitHub strips dots from heading ids ("5.4.1" → "541").
  const anchor = version.replace(/\./g, '');
  refs.push(`- **CHANGELOG:** [${version}](../../../CHANGELOG.md#${anchor})`);
  const refsBlock = `## References\n\n${refs.join('\n')}\n\n`;

  // Latest CHANGELOG section (best effort)
  let changelogExcerpt = '';
  try {
    const changelog = readFileSync(join(PATHS.root, 'CHANGELOG.md'), 'utf-8');
    const match = changelog.match(/^##[^\n]*\n[\s\S]*?(?=\n##\s|$)/m);
    if (match) changelogExcerpt = match[0].trim();
  } catch {
    // no changelog — skip
  }

  const content = `---
id: ${slug}
date: ${today}
type: decision
tags: [#release, #milestone, #template, #active]
scope: template
status: active
---

# Release v${version}

Automated record from \`release-it\` after:release hook.

${refsBlock}## Commits since previous tag

${commits || '(none)'}

${changelogExcerpt ? `## CHANGELOG excerpt\n\n${changelogExcerpt}\n` : ''}
## Why this release now

_To be filled by the author if the release needed human context beyond the commit log._
`;

  writeFileSync(file, content);
  console.log(`  ✓ Memory entry written: .claude/memory/decisions/${today}-${slug}.md`);
}

main();
