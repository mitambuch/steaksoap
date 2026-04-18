// ═══════════════════════════════════════════════════
// Dashboard — Studio landing tool (first tool in the bar)
//
// WHAT: Auto-adapts to whichever document types are present in the
//       dataset. Shows : alerts on missing critical fields, counts per
//       type, recent activity, quick-jump actions for singletons.
// WHEN: First tool → landing page when the Studio opens.
// NOTE: Introspection-driven: when a client adds a new document type
//       via a new schema file, it automatically appears in the counts
//       + last-updated blocks. No code change required here.
// ═══════════════════════════════════════════════════

import { useEffect, useMemo, useState } from 'react';
import { useClient } from 'sanity';
import { useRouter } from 'sanity/router';

import { PAGE_SINGLETONS } from '../structure/deskStructure';

const C = {
  bg: 'transparent',
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceHover: 'rgba(255, 255, 255, 0.08)',
  border: 'rgba(255, 255, 255, 0.09)',
  fg: 'var(--card-fg-color, #F0FFFF)',
  muted: 'rgba(240, 240, 240, 0.55)',
  ok: '#4ade80',
  warn: '#facc15',
  danger: '#f87171',
  accent: '#60a5fa',
};

interface SiteConfigSnapshot {
  _updatedAt?: string;
  siteName?: { fr?: string };
  seoTitle?: { fr?: string };
  primaryNav?: Array<unknown>;
  contactEmail?: string;
}

interface TypeCount {
  type: string;
  count: number;
}

interface RecentDoc {
  _id: string;
  _type: string;
  _updatedAt: string;
  title?: string | { fr?: string };
}

interface Snapshot {
  siteConfig: SiteConfigSnapshot | null;
  typeCounts: TypeCount[];
  recent: RecentDoc[];
  pagesPublished: string[];
}

const SNAPSHOT_QUERY = `{
  "siteConfig": *[_type == "siteConfig"][0]{
    _updatedAt, siteName, seoTitle, primaryNav, contactEmail
  },
  "typeCounts": array::unique(*[!(_id in path("drafts.**"))]._type)[] {
    "type": @,
    "count": count(*[_type == ^ && !(_id in path("drafts.**"))])
  },
  "recent": *[!(_id in path("drafts.**"))] | order(_updatedAt desc)[0..4]{
    _id, _type, _updatedAt, title
  },
  "pagesPublished": *[_type == "page" && !(_id in path("drafts.**"))]._id
}`;

function relativeTime(iso?: string): string {
  if (!iso) return 'jamais';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} j`;
  if (days < 30) return `il y a ${Math.floor(days / 7)} sem.`;
  return `il y a ${Math.floor(days / 30)} mois`;
}

function resolveTitle(doc: RecentDoc): string {
  if (typeof doc.title === 'string') return doc.title;
  if (doc.title && typeof doc.title === 'object') return doc.title.fr ?? doc._type;
  return doc._id;
}

const CARD_STYLE: React.CSSProperties = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  padding: '16px 20px',
};

export function Dashboard() {
  const client = useClient({ apiVersion: '2024-06-01' });
  const router = useRouter();
  const [data, setData] = useState<Snapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    client
      .fetch<Snapshot>(SNAPSHOT_QUERY)
      .then(d => {
        if (!cancelled) setData(d);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Erreur inconnue.');
      });
    return () => {
      cancelled = true;
    };
  }, [client]);

  const openSiteConfig = () =>
    router.navigateIntent('edit', { id: 'siteConfig-singleton', type: 'siteConfig' });
  const openPage = (slug: string) =>
    router.navigateIntent('edit', { id: `page-${slug}`, type: 'page' });

  const alerts = useMemo(() => {
    if (!data) return [];
    const list: Array<{
      tone: 'ok' | 'warn' | 'danger';
      label: string;
      message: string;
      onClick?: () => void;
    }> = [];

    if (!data.siteConfig) {
      list.push({
        tone: 'danger',
        label: 'Configuration globale',
        message: "Le document de configuration n'existe pas encore. Clique ici pour le créer.",
        onClick: openSiteConfig,
      });
    } else {
      if (!data.siteConfig.siteName?.fr) {
        list.push({
          tone: 'warn',
          label: 'Nom du site',
          message: "Pas encore défini — apparaît dans l'onglet du navigateur.",
          onClick: openSiteConfig,
        });
      }
      if (!data.siteConfig.primaryNav || data.siteConfig.primaryNav.length === 0) {
        list.push({
          tone: 'warn',
          label: 'Menu principal',
          message: "Vide — aucun lien ne s'affichera dans le header.",
          onClick: openSiteConfig,
        });
      }
      if (!data.siteConfig.contactEmail) {
        list.push({
          tone: 'warn',
          label: 'Email de contact',
          message: 'Non renseigné.',
          onClick: openSiteConfig,
        });
      }
      if (list.length === 0) {
        list.push({ tone: 'ok', label: 'Configuration globale', message: 'Tout est en ordre.' });
      }
    }

    const missingPages = PAGE_SINGLETONS.filter(p => !data.pagesPublished.includes(`page-${p.id}`));
    if (missingPages.length > 0) {
      list.push({
        tone: 'warn',
        label: 'Pages à initialiser',
        message: `${missingPages.length} page(s) pas encore publiée(s) : ${missingPages.map(p => p.title).join(', ')}.`,
      });
    }

    return list;
  }, [data]);

  if (error) {
    return (
      <div style={{ padding: 32, color: C.danger, fontFamily: 'system-ui' }}>
        <strong>Erreur de chargement :</strong> {error}
      </div>
    );
  }

  if (!data) {
    return <div style={{ padding: 32, color: C.muted, fontFamily: 'system-ui' }}>Chargement…</div>;
  }

  return (
    <div
      style={{
        padding: '32px 40px',
        fontFamily: 'system-ui',
        color: C.fg,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>👋 Bonjour</h1>
        <p style={{ color: C.muted, marginTop: 6 }}>Voici l'état du site en un coup d'œil.</p>
      </header>

      {/* ─── Alerts ─────────────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: C.muted,
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Alertes
        </h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {alerts.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={a.onClick}
              disabled={!a.onClick}
              style={{
                ...CARD_STYLE,
                cursor: a.onClick ? 'pointer' : 'default',
                textAlign: 'left',
                background: C.surface,
                color: C.fg,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>
                {a.tone === 'ok' ? '✅' : a.tone === 'warn' ? '⚠️' : '🛑'}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{a.label}</div>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{a.message}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Counts ─────────────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: C.muted,
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Contenu
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          {data.typeCounts
            .filter(t => !t.type.startsWith('system.'))
            .sort((a, b) => b.count - a.count)
            .map(t => (
              <div key={t.type} style={CARD_STYLE}>
                <div style={{ fontSize: 24, fontWeight: 600 }}>{t.count}</div>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{t.type}</div>
              </div>
            ))}
        </div>
      </section>

      {/* ─── Quick actions ──────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: C.muted,
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Raccourcis
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={openSiteConfig}
            style={{
              ...CARD_STYLE,
              cursor: 'pointer',
              background: C.surface,
              color: C.fg,
              textAlign: 'left',
            }}
          >
            <div style={{ fontSize: 18 }}>⚙️</div>
            <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>Configuration globale</div>
          </button>
          {PAGE_SINGLETONS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => openPage(p.id)}
              style={{
                ...CARD_STYLE,
                cursor: 'pointer',
                background: C.surface,
                color: C.fg,
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 18 }}>{p.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>{p.title}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Recent activity ────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: C.muted,
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Activité récente
        </h2>
        {data.recent.length === 0 ? (
          <div style={{ ...CARD_STYLE, color: C.muted }}>
            Aucun document n'a encore été modifié.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 8 }}>
            {data.recent.map(d => (
              <div
                key={d._id}
                style={{
                  ...CARD_STYLE,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{resolveTitle(d)}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{d._type}</div>
                </div>
                <div style={{ color: C.muted, fontSize: 12 }}>{relativeTime(d._updatedAt)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer
        style={{
          marginTop: 32,
          paddingTop: 16,
          borderTop: `1px solid ${C.border}`,
          color: C.muted,
          fontSize: 12,
        }}
      >
        N'oublie pas de cliquer <strong style={{ color: C.fg }}>Publier</strong> pour que tes
        modifications apparaissent sur le site. Besoin d'aide ? Va voir le{' '}
        <strong style={{ color: C.fg }}>📖 Guide</strong> en haut à droite.
      </footer>
    </div>
  );
}
