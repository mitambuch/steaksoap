// ═══════════════════════════════════════════════════
// localeString — short multilingual text (FR required, DE/EN optional)
//
// WHAT: FR is the source of truth. DE/EN sit in a collapsible
//       "🌐 Traductions" fieldset so a novice editor focuses on FR.
// WHEN: Titles, labels, CTAs, eyebrow text ≤ 80 characters.
// RULE: .claude/rules/i18n-sanity.md lesson #2 — FR is warning, never required.
// ═══════════════════════════════════════════════════

import { defineField, defineType } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Texte court',
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
      type: 'string',
      // WHY: warning (not error) — an empty field doesn't block publishing
      // but is surfaced so the editor can't ship a blank page unknowingly.
      validation: Rule => Rule.required().warning('Le texte FR est recommandé.'),
    }),
    defineField({ name: 'de', title: 'Deutsch', type: 'string', fieldset: 'translations' }),
    defineField({ name: 'en', title: 'English', type: 'string', fieldset: 'translations' }),
  ],
});
