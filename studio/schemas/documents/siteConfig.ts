// ═══════════════════════════════════════════════════
// siteConfig — global config singleton
//
// WHAT: Identity, navigation, footer, SEO defaults, socials — shared
//       across every page of the site. One single document, ever.
// WHEN: Read by the app via a singleton fetch (useSiteConfig hook).
// RULE: .claude/rules/i18n-sanity.md — taxonomy "singleton partagé".
// ═══════════════════════════════════════════════════

import { defineField, defineType } from 'sanity';

import { icon } from '../../icons';

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Configuration globale',
  type: 'document',
  icon: icon('⚙️'),
  description: 'Textes et liens partagés sur toutes les pages du site.',
  groups: [
    { name: 'identity', title: '🏷️ Identité', default: true },
    { name: 'nav', title: '🧭 Navigation' },
    { name: 'footer', title: '📎 Footer' },
    { name: 'contact', title: '📞 Contact & réseaux' },
    { name: 'seo', title: '🔍 SEO par défaut' },
  ],
  fields: [
    // ─── Identity ─────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'localeString',
      group: 'identity',
      description: "Affiché dans l'onglet du navigateur et les partages sociaux.",
    }),
    defineField({
      name: 'tagline',
      title: 'Baseline / tagline',
      type: 'localeString',
      group: 'identity',
      description: 'Phrase courte qui décrit le site. Ex : « Hôtel 4★ à Neuchâtel ».',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'identity',
      description: 'SVG ou PNG transparent, bien net.',
    }),

    // ─── Navigation ───────────────────────────────
    defineField({
      name: 'primaryNav',
      title: 'Menu principal',
      type: 'array',
      group: 'nav',
      description: "Liens du header, dans l'ordre. Ex : Accueil / À propos / Contact.",
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Libellé', type: 'localeString' }),
            defineField({
              name: 'href',
              title: 'URL (interne ou externe)',
              type: 'string',
              description: 'Chemin interne (/, /about) ou URL complète (https://...).',
            }),
          ],
          preview: {
            select: { title: 'label.fr', subtitle: 'href' },
          },
        },
      ],
    }),

    // ─── Footer ───────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Tagline du footer',
      type: 'localeString',
      group: 'footer',
      description: 'Courte phrase à côté du wordmark en bas de page.',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      group: 'footer',
      description: 'Ex : « © 2026 Mon Entreprise Sàrl ».',
    }),

    // ─── Contact & socials ────────────────────────
    defineField({
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
      group: 'contact',
      description: 'Affiché dans le footer et sur la page contact.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Téléphone (optionnel)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Adresse (optionnel)',
      type: 'localeText',
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Réseaux sociaux',
      type: 'object',
      group: 'contact',
      description: 'Laisser un champ vide pour masquer le lien correspondant.',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'x', title: 'X (Twitter)', type: 'url' }),
      ],
    }),

    // ─── SEO defaults ─────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO par défaut',
      type: 'localeString',
      group: 'seo',
      description: "50-60 caractères. Fallback quand une page n'en définit pas.",
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO par défaut',
      type: 'localeText',
      group: 'seo',
      description: "140-160 caractères. Fallback quand une page n'en définit pas.",
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph par défaut',
      type: 'image',
      group: 'seo',
      description: 'Affichée lors des partages sur réseaux sociaux. 1200×630px recommandé.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Configuration globale',
      subtitle: '⚙️ Un seul document pour tout le site',
    }),
  },
});
