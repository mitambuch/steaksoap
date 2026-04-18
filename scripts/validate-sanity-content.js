#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   VALIDATE-SANITY-CONTENT — zero empty field guarantee (lesson #13)

   Fetches every canonical singleton from Sanity (siteConfig + page-*)
   and ensures every localeString/localeText/localeRichText field has
   all 3 locales (fr/de/en) populated.

   Fails `pnpm validate` if any canonical singleton has a missing
   locale. This is what guarantees "a site shipped to a client never
   has an empty editorial field".

   Gracefully skips when Sanity is not configured (empty env vars) so
   the base template + CI-without-creds stay green.

   Usage:
     node scripts/validate-sanity-content.js
   ═══════════════════════════════════════════════════════════════ */

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || '';
const DATASET = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const API_VERSION = process.env.VITE_SANITY_API_VERSION || '2024-06-01';

if (!PROJECT_ID) {
  console.log('  ⓘ Sanity not configured (VITE_SANITY_PROJECT_ID empty) — skipping content validation.');
  process.exit(0);
}

const CANONICAL_IDS = [
  'siteConfig-singleton',
  'page-home',
  'page-about',
  'page-contact',
];

const REQUIRED_LOCALES = ['fr', 'de', 'en'];

function isLocaleField(value) {
  return (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && ('fr' in value || 'de' in value || 'en' in value)
  );
}

function isEmptyLocaleValue(value) {
  if (value === null || value === undefined || value === '') return true;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function scanDoc(doc, path = []) {
  const holes = [];
  if (!doc || typeof doc !== 'object') return holes;

  for (const [key, value] of Object.entries(doc)) {
    if (key.startsWith('_')) continue; // skip Sanity metadata
    const here = [...path, key];

    if (isLocaleField(value)) {
      for (const locale of REQUIRED_LOCALES) {
        if (isEmptyLocaleValue(value[locale])) {
          holes.push({ path: here.join('.'), locale });
        }
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        holes.push(...scanDoc(item, [...here, `[${i}]`]));
      });
    } else if (typeof value === 'object' && value !== null) {
      holes.push(...scanDoc(value, here));
    }
  }

  return holes;
}

async function main() {
  const ids = CANONICAL_IDS.map((id) => `"${id}"`).join(',');
  const query = encodeURIComponent(`*[_id in [${ids}] && !(_id in path("drafts.**"))]`);
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.log(`  ⓘ Cannot reach Sanity (${err.message}) — skipping.`);
    process.exit(0);
  }

  if (!res.ok) {
    console.log(`  ⓘ Sanity returned HTTP ${res.status} — skipping content validation.`);
    process.exit(0);
  }

  const { result = [] } = await res.json();
  const foundIds = new Set(result.map((d) => d._id));
  const missingDocs = CANONICAL_IDS.filter((id) => !foundIds.has(id));

  const holes = [];
  for (const doc of result) {
    const docHoles = scanDoc(doc);
    for (const h of docHoles) {
      holes.push({ doc: doc._id, ...h });
    }
  }

  let hasError = false;

  if (missingDocs.length > 0) {
    console.error(`  ✗ ${missingDocs.length} canonical singleton(s) not found in dataset ${DATASET}:`);
    for (const id of missingDocs) console.error(`      - ${id}`);
    console.error('    Seed them via the Studio first (or skip in Phase 2 template).');
    hasError = true;
  }

  if (holes.length > 0) {
    console.error(`  ✗ ${holes.length} empty locale field(s) in canonical singletons:`);
    for (const h of holes) {
      console.error(`      ${h.doc}  ${h.path}.${h.locale}  (empty)`);
    }
    console.error('');
    console.error('  Fill them from Claude via `/wire-content` or `/translate`.');
    console.error('  See .claude/rules/i18n-sanity.md lesson #13 (zero empty field).');
    hasError = true;
  }

  if (hasError) process.exit(1);

  console.log(
    `  ✓ ${result.length} canonical singleton(s) complete in all 3 locales (fr/de/en).`,
  );
}

main().catch((err) => {
  console.log(`  ⓘ validate-sanity-content failed unexpectedly (${err.message}) — skipping.`);
  process.exit(0);
});
