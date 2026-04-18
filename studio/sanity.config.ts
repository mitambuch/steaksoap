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
  },

  studio: {
    components: {
      layout: StudioLayout,
      logo: Logo,
    },
  },
});
