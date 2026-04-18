#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════
// HANDOFF — generate a client-facing package at delivery time.
//
// Output :  dist-handoff/handoff.html  (printable, opens in any browser)
//
// Contents :
//   - site URL + Studio URL
//   - login / onboarding steps
//   - top-3 tasks the client will do most
//   - a printout of the Studio HelpGuide
//   - contact / support block
//
// Usage :
//   pnpm handoff              → writes dist-handoff/handoff.html
//   pnpm handoff --print      → also `start handoff.html` (Windows/macOS)
// ═══════════════════════════════════════════════════════════════

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));
const version = pkg.version;

const SITE_URL = process.env.VITE_APP_URL || 'https://example.com';
const STUDIO_URL =
  process.env.SANITY_STUDIO_URL ||
  (process.env.SANITY_STUDIO_PROJECT_ID
    ? `https://${process.env.SANITY_STUDIO_PROJECT_ID}.sanity.studio`
    : 'https://your-project.sanity.studio');

// Read client profile for the brand name, if filled.
let clientName = 'your project';
try {
  const clientMd = readFileSync(resolve(root, '.claude/client.md'), 'utf-8');
  // Line-by-line: find `- **Nom** : <value>` and accept only non-empty,
  // non-placeholder values on that exact line.
  for (const line of clientMd.split(/\r?\n/)) {
    const m = /^\s*-\s*\*\*Nom\*\*\s*:\s*(.*)$/.exec(line);
    if (m) {
      const value = m[1].trim();
      if (value && !value.startsWith('(') && !value.startsWith('<')) {
        clientName = value;
      }
      break;
    }
  }
} catch {
  // client.md missing — stick with the default label
}

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Handoff — ${clientName}</title>
<style>
  @page { margin: 24mm; }
  body { font: 15px/1.6 system-ui, sans-serif; color: #18181b; max-width: 680px; margin: 40px auto; padding: 0 24px; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  h2 { font-size: 18px; margin: 32px 0 12px; border-bottom: 1px solid #e5e5e5; padding-bottom: 6px; }
  h3 { font-size: 15px; margin: 20px 0 6px; }
  code, kbd { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font: 13px ui-monospace, monospace; }
  a { color: #2563eb; }
  ol { padding-left: 20px; }
  ol li { margin: 6px 0; }
  .card { border: 1px solid #e5e5e5; border-radius: 10px; padding: 16px 20px; margin: 12px 0; }
  .meta { color: #71717a; font-size: 13px; }
  .tip { background: #fff7ed; border-left: 3px solid #fb923c; padding: 10px 14px; margin: 12px 0; border-radius: 4px; }
  @media print { a { color: inherit; text-decoration: none; } }
</style>
</head>
<body>

<h1>${clientName}</h1>
<p class="meta">Livraison · version ${version} · ${new Date().toISOString().slice(0, 10)}</p>

<h2>🔗 Liens essentiels</h2>
<div class="card">
  <p><strong>Site en ligne</strong> &nbsp; <a href="${SITE_URL}">${SITE_URL}</a></p>
  <p><strong>Studio d'édition</strong> &nbsp; <a href="${STUDIO_URL}">${STUDIO_URL}</a></p>
</div>

<h2>🚪 Première connexion au Studio</h2>
<ol>
  <li>Clique sur le lien du Studio ci-dessus.</li>
  <li>Sélectionne <strong>Continue with Google</strong> (ou l'adresse e-mail utilisée pour ton invitation).</li>
  <li>Autorise l'accès. Tu arrives sur le <strong>Tableau de bord</strong>.</li>
  <li>Si tu n'as pas été invité : envoie-moi l'e-mail que tu veux utiliser, je t'ajoute en tant qu'<em>Editor</em>.</li>
</ol>

<h2>✏️ Les 3 actions que tu feras le plus souvent</h2>

<h3>1. Modifier le contenu d'une page</h3>
<p>Barre latérale → <strong>📄 Pages du site</strong> → choisis la page → modifie → <strong>Publier</strong>.</p>

<h3>2. Changer les infos globales (menu, footer, réseaux sociaux)</h3>
<p>Barre latérale → <strong>⚙️ Configuration globale</strong> → 5 onglets → <strong>Publier</strong>.</p>

<h3>3. Ajouter ou remplacer une image</h3>
<p>Ouvre le champ image → glisse-dépose ton fichier → ajuste le point focal bleu → <strong>Publier</strong>.</p>

<div class="tip">
  <strong>💡 Astuce</strong> — le guide pas-à-pas complet est accessible en permanence dans le Studio :
  clique sur <strong>📖 Guide</strong> tout en haut à droite.
</div>

<h2>🌐 Multilingue (fr / de / en)</h2>
<p>
  Le site gère 3 langues : français (source de vérité), allemand, anglais.
  Dans le Studio, les champs DE et EN sont cachés dans un onglet replié
  <strong>🌐 Traductions</strong>. Le français est obligatoire, DE/EN
  sont optionnels (fallback auto vers FR).
</p>

<h2>🆘 Support</h2>
<p>
  Pour toute question, bug ou nouvelle demande : contacte-moi directement.
  Les incidents critiques (site down, donnée perdue) sont traités sous
  24 h ouvrées.
</p>

<p class="meta" style="margin-top: 60px;">
  Ce document a été généré automatiquement par <code>pnpm handoff</code>
  depuis la version ${version} du starter steaksoap.
</p>

</body>
</html>
`;

const outDir = resolve(root, 'dist-handoff');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, 'handoff.html');
writeFileSync(outFile, html);

console.log(`  ✓ Handoff package written → ${outFile}`);
console.log(`    Client: ${clientName}`);
console.log(`    Site  : ${SITE_URL}`);
console.log(`    Studio: ${STUDIO_URL}`);

if (process.argv.includes('--print')) {
  const { spawnSync } = await import('node:child_process');
  const opener = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  spawnSync(opener, [outFile], { shell: true, stdio: 'ignore' });
}
