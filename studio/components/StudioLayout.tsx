// ═══════════════════════════════════════════════════
// StudioLayout — global CSS fixes for known Sanity v4 UX pain points
//
// WHAT: Sanity's default form UI is cramped (narrow edit panel, H2 title
//       duplicated in the breadcrumb, noisy "All fields" tab, tiny
//       Publish button). This layout injects 5 surgical CSS overrides
//       that widen + clean without touching core styles.
// WHEN: Registered via `studio.components.layout` in sanity.config.ts.
// RULE: .claude/rules/i18n-sanity.md lesson #12.
// ═══════════════════════════════════════════════════

import type { LayoutProps } from 'sanity';

const GLOBAL_CSS = `
/* 1. The edit panel takes all available width */
[data-ui="Pane"]:last-child { flex: 1 1 auto !important; min-width: 0 !important; }
[data-ui="Container"] { max-width: 100% !important; }
[data-testid="document-panel-scroller"] form { max-width: 100% !important; }

/* 2. Hide the redundant H2 title + its Stack wrapper (already shown in breadcrumb) */
[data-testid="document-panel-document-title"],
[data-testid="form-view"] > [data-ui="Stack"]:first-child { display: none !important; }

/* 3. Hide the "All fields" tab — duplicate of our field groups */
[data-testid="group-tab-all-fields"] { display: none !important; }

/* 4. Compact pill-shaped group tabs */
[data-testid^="group-tab-"] {
  padding: 0.3rem 0.75rem !important;
  border-radius: 6px !important;
  font-size: 0.78rem !important;
}
[role="tablist"] {
  flex-wrap: wrap !important;
  gap: 0.25rem !important;
  margin: 0 !important;
}
[data-testid="field-groups"] { padding: 0.5rem 0 !important; }

/* 5. Publish button styled as the primary action */
button[data-testid*="ublish"] {
  font-weight: 600 !important;
  padding: 0.55rem 1.1rem !important;
  border-radius: 8px !important;
  font-size: 0.9rem !important;
}
`;

export function StudioLayout(props: LayoutProps) {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {props.renderDefault(props)}
    </>
  );
}
