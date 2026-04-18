// ═══════════════════════════════════════════════════
// localeText — long multilingual text (FR required, DE/EN optional)
//
// WHAT: Same as localeString but for paragraphs (multi-line). DE/EN in
//       the collapsible "🌐 Traductions" fieldset.
// WHEN: Descriptions, leads, bios, intros, editorial paragraphs.
// ═══════════════════════════════════════════════════

import { defineField, defineType } from 'sanity';

export const localeText = defineType({
  name: 'localeText',
  title: 'Texte long',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: '🌐 Traductions (DE / EN)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().warning('Le texte FR est recommandé.'),
    }),
    defineField({
      name: 'de',
      title: 'Deutsch',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
  ],
});
