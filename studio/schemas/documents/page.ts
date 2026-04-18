// ═══════════════════════════════════════════════════
// page — full editable content of a site page
//
// WHAT: One document per page (home, about, contact, …). IDs are fixed
//       (`page-<slug>`) so the app fetches by a known key. Repeatable
//       entities (team, testimonials, products) live in their own
//       document types — not as inline arrays here.
// WHEN: Edited in the Studio under "Pages du site", consumed by the app
//       via `usePage(slug)`.
// RULE: .claude/rules/i18n-sanity.md — taxonomy "inline pour la page,
//       menu dédié pour les listes répétables".
// ═══════════════════════════════════════════════════

import { defineField, defineType } from 'sanity';

import { icon } from '../../icons';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: icon('📄'),
  description: "Contenu éditable d'une page du site.",
  groups: [
    { name: 'content', title: '📝 Contenu', default: true },
    { name: 'cta', title: '🎯 CTA' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'advanced', title: '⚙️ Avancé' },
  ],
  fields: [
    // ─── Technical identity ───────────────────────
    defineField({
      name: 'title',
      title: 'Nom interne',
      type: 'string',
      group: 'content',
      description: 'Ex : « Accueil », « À propos ». Affiché dans le Studio uniquement.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse web (ne pas modifier)',
      type: 'slug',
      group: 'advanced',
      options: { source: 'title', maxLength: 60 },
      description:
        'Ex : home, about, contact. Identifiant technique — ne pas modifier après création.',
      readOnly: ({ document }) =>
        Boolean(document?._createdAt && document._createdAt !== document._updatedAt),
      validation: Rule => Rule.required(),
    }),

    // ─── Hero ─────────────────────────────────────
    defineField({
      name: 'eyebrow',
      title: 'Mini-titre au-dessus',
      type: 'localeString',
      group: 'content',
      description: 'Petit texte en majuscules au-dessus du titre principal.',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Titre principal',
      type: 'localeString',
      group: 'content',
      description: 'Le grand titre affiché en haut de la page.',
    }),
    defineField({
      name: 'heroText',
      title: 'Sous-titre / lead',
      type: 'localeText',
      group: 'content',
      description: 'Paragraphe de présentation sous le titre.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Image hero',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Image principale de la page. Format paysage 16:9 ou 21:9 recommandé.',
    }),

    // ─── Intro ────────────────────────────────────
    defineField({
      name: 'introHeading',
      title: 'Titre intro',
      type: 'localeString',
      group: 'content',
      description: "Titre de la section d'introduction (sous le hero).",
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Paragraphes intro',
      type: 'array',
      group: 'content',
      of: [{ type: 'localeText' }],
      description: "Un paragraphe par item. L'ordre est respecté.",
    }),

    // ─── CTA ──────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'Titre CTA',
      type: 'localeString',
      group: 'cta',
      description: 'Ex : « Prêt à démarrer ? ».',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texte CTA',
      type: 'localeText',
      group: 'cta',
      description: 'Paragraphe de contexte juste avant le bouton.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Libellé bouton',
      type: 'localeString',
      group: 'cta',
      description: 'Ex : « Contactez-nous ».',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Destination bouton',
      type: 'string',
      group: 'cta',
      description: 'Chemin interne (/contact) ou URL complète (https://...).',
    }),

    // ─── SEO ──────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'localeString',
      group: 'seo',
      description: "Recommandé 50-60 caractères. Affiché dans l'onglet du navigateur.",
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'localeText',
      group: 'seo',
      description: 'Recommandé 140-160 caractères. Affichée dans les résultats Google.',
    }),

    // ─── Free body ────────────────────────────────
    defineField({
      name: 'body',
      title: 'Contenu libre (optionnel)',
      type: 'localeRichText',
      group: 'advanced',
      description: 'Zone libre pour ajouter du contenu riche à la fin de la page.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Page sans nom',
        subtitle: subtitle ? `/${subtitle}` : 'Slug non défini',
      };
    },
  },
});
