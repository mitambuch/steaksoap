#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   FIX-CHANGELOG — deduplicate "# Changelog" header
   Called automatically by release-it after:bump hook.

   conventional-changelog sometimes duplicates the header.
   This script ensures exactly ONE "# Changelog" at the top.
   ═══════════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync } from 'fs';

const file = 'CHANGELOG.md';
let content = readFileSync(file, 'utf-8');

// Remove every "# Changelog" line (with surrounding blank lines)
content = content.replace(/^# Changelog\s*/gm, '');

// Re-add a single clean header at the top
content = '# Changelog\n\n' + content.trimStart();

writeFileSync(file, content);
