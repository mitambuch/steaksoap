// ═══════════════════════════════════════════════════
// Sanity CLI config — projectId / dataset for `sanity deploy`
//
// Values read from env (SANITY_STUDIO_*). No hardcoded fallback in the
// template — client projects set these in studio/.env when onboarding.
// ═══════════════════════════════════════════════════

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
});
