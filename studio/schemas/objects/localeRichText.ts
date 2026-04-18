// ═══════════════════════════════════════════════════
// localeRichText — multilingual Portable Text (FR required, DE/EN optional)
//
// WHAT: Rich content (paragraphs, bold, italic, links, headings) in 3
//       languages. DE/EN in the collapsible "🌐 Traductions" fieldset.
// WHEN: Body copy, articles, long descriptions that need formatting.
// ═══════════════════════════════════════════════════

import { defineField, defineType } from 'sanity';

const richBlock = {
  type: 'array' as const,
  of: [
    {
      type: 'block' as const,
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Titre', value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object' as const,
            title: 'Lien',
            fields: [{ name: 'href', type: 'url', title: 'URL' }],
          },
        ],
      },
    },
  ],
};

export const localeRichText = defineType({
  name: 'localeRichText',
  title: 'Contenu riche',
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
      ...richBlock,
      validation: Rule => Rule.required().warning('Le contenu FR est recommandé.'),
    }),
    defineField({ name: 'de', title: 'Deutsch', fieldset: 'translations', ...richBlock }),
    defineField({ name: 'en', title: 'English', fieldset: 'translations', ...richBlock }),
  ],
});
