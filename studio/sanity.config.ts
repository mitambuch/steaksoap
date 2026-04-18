// ═══════════════════════════════════════════════════
// Sanity Studio — root configuration
//
// Tools bar order : 📊 Tableau de bord · 📄 Structure · 🔭 Vision · 📖 Guide.
// Dashboard is first so it's the landing page when the Studio opens.
// Desk structure is customised (see structure/deskStructure.ts).
// StudioLayout injects global CSS that fixes 5 default-UX pain points.
// Singleton documents cannot be created/deleted/duplicated from the UI.
// ═══════════════════════════════════════════════════

import { languageFilter } from '@sanity/language-filter';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { Logo } from './components/Logo';
import { StudioLayout } from './components/StudioLayout';
import { schemaTypes } from './schemas';
import { SINGLETON_TYPES, structure } from './structure/deskStructure';
import { dashboardTool } from './tools/dashboardTool';
import { helpGuideTool } from './tools/helpGuideTool';

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID ?? '';
const DATASET = process.env.SANITY_STUDIO_DATASET ?? 'production';

// WHY: enables the "View" button in the Studio top-right. Opens the rendered
// draft of the current doc in a new tab. Falls back to process.env for Node,
// and a localhost default so the Studio stays usable in `pnpm studio:dev`.
const PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL ??
  process.env.SANITY_STUDIO_SITE_URL ??
  'http://localhost:5173';
const DEFAULT_LOCALE = 'fr';

export default defineConfig({
  name: 'steaksoap-studio',
  title: 'Studio',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    // 1st → landing page
    dashboardTool(),
    structureTool({ structure }),
    visionTool(),
    // last → Guide tab on the right
    helpGuideTool(),
    languageFilter({
      supportedLanguages: [
        { id: 'fr', title: 'Français' },
        { id: 'de', title: 'Deutsch' },
        { id: 'en', title: 'English' },
      ],
      defaultLanguages: ['fr'],
      documentTypes: ['page', 'siteConfig'],
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Block singleton creation from "New document"
    templates: prev => prev.filter(t => !SINGLETON_TYPES.includes(t.schemaType)),
  },

  document: {
    // Block create / delete / duplicate / unpublish on singletons
    actions: (prev, context) => {
      if (SINGLETON_TYPES.includes(context.schemaType)) {
        return prev.filter(a => !['duplicate', 'unpublish', 'delete'].includes(a.action ?? ''));
      }
      return prev;
    },

    // "View" button (top-right of the editor) — opens the rendered draft
    // of the current doc. Wire-up per type : siteConfig → home, page →
    // /:locale/:slug, future types can be added below.
    productionUrl: async (prev, context) => {
      const { document } = context;
      if (document._type === 'siteConfig') {
        return `${PREVIEW_URL}/${DEFAULT_LOCALE}`;
      }
      if (document._type === 'page') {
        const slug = (document.slug as { current?: string } | undefined)?.current;
        if (!slug) return prev;
        const path = slug === 'home' ? '' : `/${slug}`;
        return `${PREVIEW_URL}/${DEFAULT_LOCALE}${path}?draft=1`;
      }
      return prev;
    },
  },

  studio: {
    components: {
      layout: StudioLayout,
      logo: Logo,
    },
  },
});
