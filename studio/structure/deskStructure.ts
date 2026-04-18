// ═══════════════════════════════════════════════════
// deskStructure — custom sidebar menu of the Studio
//
// WHAT: The hierarchy a novice editor sees when opening the Studio.
//   📊 Tableau de bord (landing tool)
//   ⚙️ Configuration globale (singleton)
//   📄 Pages du site (list of page singletons by fixed ID)
//   📦 Contenus (placeholder — clients append types here)
//
// Adding a page : append an entry to PAGE_SINGLETONS.
// Adding a collection type (e.g. person, testimonial) : append a
// listItem block after the divider at the bottom.
// ═══════════════════════════════════════════════════

import type { StructureResolver } from 'sanity/structure';

import { icon } from '../icons';

/** Document types that must remain single-instance (blocked in "New document"). */
export const SINGLETON_TYPES = ['siteConfig'];

/**
 * Page documents with fixed IDs.
 *
 * Each entry = one page singleton. `page-<id>` is the _id used everywhere,
 * so the app fetches with `*[_id == "page-home"][0]` and never wonders
 * which document represents the home page.
 */
export const PAGE_SINGLETONS: ReadonlyArray<{
  id: string;
  title: string;
  icon: string;
}> = [
  { id: 'home', title: 'Accueil', icon: '🏠' },
  { id: 'about', title: 'À propos', icon: 'ℹ️' },
  { id: 'contact', title: 'Contact', icon: '✉️' },
];

export const structure: StructureResolver = S =>
  S.list()
    .title('Contenu')
    .items([
      // ── Global config ────────────────────────────
      S.listItem()
        .id('site-config')
        .title('Configuration globale')
        .icon(icon('⚙️'))
        .child(
          S.document()
            .documentId('siteConfig-singleton')
            .schemaType('siteConfig')
            .title('Configuration globale'),
        ),
      S.divider(),

      // ── Page singletons ──────────────────────────
      S.listItem()
        .id('pages')
        .title('Pages du site')
        .icon(icon('📄'))
        .child(
          S.list()
            .title('Pages du site')
            .items(
              PAGE_SINGLETONS.map(p =>
                S.listItem()
                  .id(`page-${p.id}`)
                  .title(p.title)
                  .icon(icon(p.icon))
                  .child(S.document().documentId(`page-${p.id}`).schemaType('page').title(p.title)),
              ),
            ),
        ),
      S.divider(),

      // ── Collections placeholder ──────────────────
      // Clients add repeatable entities here:
      //
      //   S.listItem()
      //     .id('team')
      //     .title('Équipe')
      //     .icon(icon('👥'))
      //     .child(S.documentTypeList('person').title('Équipe')),
    ]);
