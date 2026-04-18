// ═══════════════════════════════════════════════════
// HelpGuide — in-Studio tutorials tool (last tab in the bar)
//
// WHAT: Three baseline step-by-step guides for novice editors. Left
//       sidebar lists the guides, right panel shows the active one.
// WHEN: Click 📖 Guide in the top tool bar.
// EXTEND: append to the `GUIDES` array below.
// ═══════════════════════════════════════════════════

import { useState } from 'react';
import { useRouter } from 'sanity/router';

interface Step {
  title: string;
  detail: string;
  link?: { label: string; path: string };
}

interface Guide {
  id: string;
  icon: string;
  title: string;
  summary: string;
  steps: Step[];
  tips?: string[];
}

const GUIDES: Guide[] = [
  {
    id: 'modify-page',
    icon: '📝',
    title: "Modifier le contenu d'une page",
    summary:
      'Chaque page du site (Accueil, À propos, Contact…) a son propre document. Tu peux changer les titres, textes et images sans toucher au code.',
    steps: [
      {
        title: 'Ouvre la page',
        detail:
          'Dans la barre latérale gauche, clique sur « 📄 Pages du site » puis choisis la page à modifier.',
        link: { label: 'Aller aux pages', path: '/structure/pages' },
      },
      {
        title: 'Modifie le texte',
        detail:
          'Les champs sont organisés par onglets (Contenu, CTA, SEO, Avancé). Clique dans un champ et tape. Tes changements sont sauvegardés automatiquement en brouillon.',
      },
      {
        title: 'Publie',
        detail:
          "Clique sur le bouton « Publier » en bas à droite. C'est seulement à ce moment que les changements sont visibles sur le site en ligne.",
      },
    ],
    tips: [
      'Tes modifications sont sauvegardées automatiquement en brouillon — rien ne se perd.',
      'Pour revenir en arrière : icône horloge en haut à droite → « Historique ».',
      "Les traductions DE/EN sont dans l'onglet replié « 🌐 Traductions ». FR suffit.",
    ],
  },
  {
    id: 'global-config',
    icon: '⚙️',
    title: 'Changer la configuration globale',
    summary:
      'Le document « Configuration globale » centralise tout ce qui est partagé entre les pages : nom du site, menu, footer, réseaux sociaux.',
    steps: [
      {
        title: 'Ouvre la configuration',
        detail:
          "Barre latérale → « ⚙️ Configuration globale ». Il n'y a qu'un seul document de ce type — impossible de le supprimer ou dupliquer.",
        link: { label: 'Ouvrir la config', path: '/structure/site-config' },
      },
      {
        title: 'Parcours les onglets',
        detail:
          'Identité · Navigation · Footer · Contact · SEO. Chaque onglet regroupe les champs par thème pour éviter de tout scroller.',
      },
      {
        title: 'Modifie le menu',
        detail:
          "Dans l'onglet « Navigation », ajoute ou supprime des liens. Pour un lien interne, tape le chemin (/contact). Pour un lien externe, colle l'URL complète.",
      },
      {
        title: 'Publie',
        detail:
          "Bouton « Publier » en bas à droite. Le nouveau menu apparaît sur le site en moins d'une minute.",
      },
    ],
    tips: [
      'Laisser un champ vide est autorisé — le site utilise des valeurs par défaut.',
      'Un lien social vide = le bouton correspondant disparaît du footer.',
    ],
  },
  {
    id: 'add-image',
    icon: '🖼️',
    title: 'Ajouter ou changer une image',
    summary:
      'Les images sont hébergées par Sanity et optimisées automatiquement pour le web (WebP, redimensionnement adaptatif).',
    steps: [
      {
        title: 'Trouve le champ image',
        detail:
          'Ouvre la page ou le document concerné. Les champs « image » sont facilement repérables — zone grise avec un symbole appareil photo.',
      },
      {
        title: 'Glisse-dépose ou sélectionne',
        detail:
          'Fais glisser une image depuis ton Finder/Explorer sur la zone, ou clique dessus pour ouvrir le sélecteur de fichiers. JPG, PNG, WebP et SVG acceptés.',
      },
      {
        title: 'Ajuste le cadrage (hotspot)',
        detail:
          "Après upload, un cercle bleu apparaît sur l'image : c'est le « point focal ». Déplace-le sur la partie importante (visage, logo) — le site recadrera autour, peu importe la largeur d'écran.",
      },
      {
        title: 'Publie',
        detail: 'Clique sur « Publier » pour que la nouvelle image apparaisse en ligne.',
      },
    ],
    tips: [
      'Résolution recommandée : au moins 1600px de large pour les images hero.',
      'Format paysage (16:9 ou 21:9) pour les hero de page, carré pour les avatars.',
      'Pas besoin de compresser toi-même — Sanity optimise automatiquement à la livraison.',
    ],
  },
];

const C = {
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceHover: 'rgba(255, 255, 255, 0.08)',
  border: 'rgba(255, 255, 255, 0.09)',
  fg: 'var(--card-fg-color, #F0FFFF)',
  muted: 'rgba(240, 240, 240, 0.55)',
  accent: '#60a5fa',
};

export function HelpGuide() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string>(GUIDES[0]!.id);
  const active = GUIDES.find(g => g.id === activeId) ?? GUIDES[0]!;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        height: '100%',
        fontFamily: 'system-ui',
        color: C.fg,
      }}
    >
      {/* ─── Sidebar ──────────────────────────── */}
      <aside
        style={{
          borderRight: `1px solid ${C.border}`,
          padding: 16,
          overflowY: 'auto',
        }}
      >
        <h2
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: C.muted,
            margin: '0 0 12px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Guides
        </h2>
        <nav style={{ display: 'grid', gap: 4 }}>
          {GUIDES.map(g => {
            const isActive = g.id === activeId;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveId(g.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: isActive ? C.surfaceHover : 'transparent',
                  border: `1px solid ${isActive ? C.border : 'transparent'}`,
                  color: C.fg,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span style={{ fontSize: 16 }} aria-hidden="true">
                  {g.icon}
                </span>
                {g.title}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ─── Active guide ─────────────────────── */}
      <section style={{ padding: '32px 40px', overflowY: 'auto', maxWidth: 760 }}>
        <header style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }} aria-hidden="true">
            {active.icon}
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>{active.title}</h1>
          <p style={{ color: C.muted, marginTop: 8, lineHeight: 1.5 }}>{active.summary}</p>
        </header>

        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {active.steps.map((step, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '32px 1fr',
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.accent,
                }}
              >
                {i + 1}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{step.title}</h3>
                <p style={{ color: C.muted, lineHeight: 1.55, marginTop: 4 }}>{step.detail}</p>
                {step.link && (
                  <button
                    type="button"
                    onClick={() => router.navigateUrl({ path: step.link!.path })}
                    style={{
                      marginTop: 8,
                      fontSize: 13,
                      color: C.accent,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    → {step.link.label}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>

        {active.tips && active.tips.length > 0 && (
          <aside
            style={{
              marginTop: 24,
              padding: 16,
              background: C.surface,
              borderRadius: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            <h3
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.muted,
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              💡 Astuces
            </h3>
            <ul
              style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 13, lineHeight: 1.6 }}
            >
              {active.tips.map((tip, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  {tip}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </section>
    </div>
  );
}
