// ═══════════════════════════════════════════════════
// schemas — Studio types index
//
// Structure:
// - objects/   reusable types (localeString, localeText, localeRichText)
// - documents/ editable entities shown in the deskStructure
//
// Adding a type: import it here + append to the schemaTypes array + add
// a listItem in structure/deskStructure.ts.
// ═══════════════════════════════════════════════════

import { page } from './documents/page';
import { siteConfig } from './documents/siteConfig';
import { localeRichText } from './objects/localeRichText';
import { localeString } from './objects/localeString';
import { localeText } from './objects/localeText';

export const schemaTypes = [
  // Reusable objects
  localeString,
  localeText,
  localeRichText,
  // Editable documents
  siteConfig,
  page,
];
