// ═══════════════════════════════════════════════════
// icons — emoji-based icon helper for the Studio
//
// WHAT: Turns an emoji into an icon component Sanity accepts (structure
//       items, list items, schema types, tools).
// USE: `icon: icon('📄')` in a schema or listItem.
// ═══════════════════════════════════════════════════

import type { ReactElement } from 'react';

export const icon = (emoji: string) => (): ReactElement => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      fontSize: 14,
      lineHeight: 1,
    }}
  >
    {emoji}
  </span>
);

/** Larger variant for list items and tool-bar icons. */
export const bigIcon = (emoji: string) => (): ReactElement => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      fontSize: 18,
      lineHeight: 1,
    }}
  >
    {emoji}
  </span>
);
