#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   PRERENDER-META — per-route static HTML with injected SEO/OG meta

   Runs after `vite build` (wired as `postbuild` in package.json).
   For each route in ROUTES, writes dist/<route>/index.html with
   route-specific <title>, <meta description>, <link rel=canonical>,
   OG and Twitter Card tags. The page body still renders client-side —
   crawlers that read only the <head> (social unfurls, most indexers)
   see the correct metadata immediately, per-page.

   Why not SSG/SSR? This template ships 3 routes; full framework
   overhead (puppeteer, Vike/Remix/Next) is overkill. Head-only
   prerender solves the SEO issue with zero new deps.

   Both Netlify and Vercel's default routing serves static files first,
   falling back to /index.html via the existing SPA rewrite. The new
   per-route files slot in naturally.
   ═══════════════════════════════════════════════════════════════ */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');
const baseHtmlPath = join(distDir, 'index.html');

if (!existsSync(baseHtmlPath)) {
  console.error('  ✗ dist/index.html not found — run `pnpm build` first.');
  process.exit(1);
}

/* ─── Explicit route manifest ───────────────────────────────── */
const ROUTES = [
  { path: '/', pageKey: 'homePage', isHome: true },
  { path: '/playground', pageKey: 'playgroundPage' },
  { path: '/lab', pageKey: 'labPage' },
];

/* ─── Shared inputs (read once) ─────────────────────────────── */
const siteTs = readFileSync(join(root, 'src/config/site.ts'), 'utf-8');
const pagesTs = readFileSync(join(root, 'src/data/pages.ts'), 'utf-8');
const baseHtml = readFileSync(baseHtmlPath, 'utf-8');

const APP_URL = process.env.VITE_APP_URL || 'http://localhost:5173';
const APP_NAME = process.env.VITE_APP_NAME || extractStringField(siteTs, 'name') || 'Project';
const SITE_DESCRIPTION = extractStringField(siteTs, 'description');
const SITE_LOCALE = extractStringField(siteTs, 'locale') || 'en';
const SITE_OG_IMAGE = extractStringField(siteTs, 'ogImage');

/* ─── Extractors (lightweight, format-stable for this template) ─ */

function extractStringField(src, key) {
  const re = new RegExp(`\\b${key}:\\s*['"]([^'"]*)['"]`);
  const m = src.match(re);
  return m ? m[1] : '';
}

function extractPageSeo(pageKey) {
  // Find `export const <pageKey> = { ... };` then the `seo: { ... }` inside.
  const blockRe = new RegExp(`export const ${pageKey}\\s*=\\s*\\{([\\s\\S]*?)^\\};`, 'm');
  const block = pagesTs.match(blockRe);
  if (!block) return { title: '', description: '' };
  const seoRe = /seo:\s*\{([\s\S]*?)\}/;
  const seo = block[1].match(seoRe);
  if (!seo) return { title: '', description: '' };
  return {
    title: extractStringField(seo[1], 'title'),
    description: extractStringField(seo[1], 'description'),
  };
}

/* ─── HTML building ──────────────────────────────────────────── */

function escapeAttr(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function absoluteOgImage() {
  if (!SITE_OG_IMAGE) return '';
  return SITE_OG_IMAGE.startsWith('http') ? SITE_OG_IMAGE : `${APP_URL}${SITE_OG_IMAGE}`;
}

function buildMeta(route) {
  const seo = extractPageSeo(route.pageKey);
  const fullTitle =
    seo.title && seo.title !== APP_NAME ? `${seo.title} | ${APP_NAME}` : APP_NAME;
  const description = seo.description || SITE_DESCRIPTION;
  const canonical = `${APP_URL}${route.isHome ? '' : route.path}`;
  const ogImage = absoluteOgImage();
  const hasImage = Boolean(ogImage);

  const lines = [
    `    <title>${escapeAttr(fullTitle)}</title>`,
    `    <meta name="description" content="${escapeAttr(description)}" />`,
    `    <link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `    <meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
    `    <meta property="og:description" content="${escapeAttr(description)}" />`,
    `    <meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:locale" content="${escapeAttr(SITE_LOCALE)}" />`,
    hasImage ? `    <meta property="og:image" content="${escapeAttr(ogImage)}" />` : '',
    `    <meta name="twitter:card" content="${hasImage ? 'summary_large_image' : 'summary'}" />`,
    `    <meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`,
    `    <meta name="twitter:description" content="${escapeAttr(description)}" />`,
    hasImage ? `    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />` : '',
  ].filter(Boolean);

  return lines.join('\n');
}

function injectHead(html, newMeta) {
  // Replace the <title>...</title> line through the default <meta description>.
  // Base index.html contains exactly these two lines, consecutive.
  const re = /^\s*<title>[^<]*<\/title>\s*<meta\s+name="description"[^>]*>/m;
  if (!re.test(html)) {
    throw new Error('base index.html missing expected <title>/<meta description> block');
  }
  return html.replace(re, newMeta);
}

/* ─── Emit ───────────────────────────────────────────────────── */

let generated = 0;
for (const route of ROUTES) {
  const meta = buildMeta(route);
  const html = injectHead(baseHtml, meta);
  const outPath = route.isHome ? baseHtmlPath : join(distDir, route.path.slice(1), 'index.html');
  if (!route.isHome) mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  const rel = outPath.slice(root.length + 1).replace(/\\/g, '/');
  console.log(`  ✓ ${route.path.padEnd(12)} → ${rel}`);
  generated++;
}

console.log(`\n  ✓ Prerendered ${generated} route(s) with static <head> meta (canonical: ${APP_URL})`);
