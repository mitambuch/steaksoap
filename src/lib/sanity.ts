// ═══════════════════════════════════════════════════
// Sanity — nullable-safe client + image URL builder
//
// WHAT: Runtime client for GROQ queries. If env vars are missing (starter
//       without Sanity configured yet), `hasSanity` is false and callers
//       must fall back to local fixtures. Pattern importé d'etoiles-aux-atomes.
// WHEN: Every Sanity fetch passes through `sanityClient`. Images via `urlFor`.
// RULE: see .claude/rules/i18n-sanity.md — lessons #5 + #6 (defensive fallback,
//       wait for loading before 404).
// ═══════════════════════════════════════════════════

import { env } from '@config/env';
import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const hasSanity = Boolean(env.SANITY_PROJECT_ID);

export const sanityClient: SanityClient | null = hasSanity
  ? createClient({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      apiVersion: env.SANITY_API_VERSION,
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export type SanityImageSource = Parameters<NonNullable<typeof builder>['image']>[0];

export const urlFor = (source: SanityImageSource) => {
  if (!builder) throw new Error('[sanity] urlFor called but Sanity is not configured.');
  return builder.image(source);
};
