# Canonical Tag Vocabulary

**Strict closed set.** Using a tag not listed here = protocol violation — the indexer warns on unknown tags.

**Template-owned**: this file propagates from the steaksoap template via
`pnpm base:update` and overwrites any local edits. To add a tag, land the
change on the steaksoap template with a `decisions/` entry explaining why,
then re-sync. Tag vocabulary is a shared standard across all derived projects.

## Domain tags (what area of the product)

| Tag | When to use |
|---|---|
| `#design` | Visual design, tokens, composition, UX decisions |
| `#routing` | React Router config, route structure, route guards |
| `#auth` | Authentication, sessions, user identity |
| `#forms` | Form implementations, validation, submission flows |
| `#seo` | Meta tags, sitemap, robots, OG images, schema |
| `#perf` | Performance optimizations, bundle size, rendering |
| `#a11y` | Accessibility — contrast, keyboard, screen readers, ARIA |
| `#i18n` | Translations, locale handling, content multilingue |
| `#content` | Copywriting, taxonomy, content strategy |
| `#security` | Env vars, CSP, sanitization, dependency audit |
| `#state` | State management, context, data flow |
| `#testing` | Test strategy, coverage, fixtures, Vitest config |
| `#build` | Vite config, bundling, dev server, build output |
| `#deploy` | Netlify, Vercel, hosting config, CI/CD |
| `#git` | Git workflow, hooks, branch strategy |
| `#release` | Release cuts, CHANGELOG, versioning |
| `#memory` | Memory system itself (meta) |
| `#workflow` | How the team works (processes, conventions) |

## Type tags (what kind of entry)

| Tag | Folder | Purpose |
|---|---|---|
| `#decision` | `decisions/` | An architectural choice made, with alternatives considered |
| `#pattern` | `patterns/` | A validated pattern for reuse |
| `#friction` | `frictions/` | A point of friction + how it was resolved |
| `#feedback` | `feedback/` | Owner feedback (correction or validation) |
| `#bug` | any | Recurring or notable bug worth remembering |

## Scope tags

| Tag | Meaning |
|---|---|
| `#template` | Applies to the steaksoap template and all derived projects |
| `#client-specific` | Applies to the current client project only — never in template |

## Priority tags

| Tag | Urgency |
|---|---|
| `#p0` | Must be known/respected immediately |
| `#p1` | Important but not blocking |
| `#p2` | Nice to know |

## Status tags (optional — primary status is in frontmatter `status:`)

| Tag | Meaning |
|---|---|
| `#active` | Currently followed |
| `#deprecated` | No longer followed |
| `#superseded` | Replaced (see frontmatter `supersedes:`) |

## Special tags

| Tag | When to use |
|---|---|
| `#baseline` | Initial template state snapshot |
| `#imported` | Content migrated from another source |
| `#milestone` | Release markers, major checkpoints |
| `#delegated` | Output from a Sonnet delegation session |

## Every entry must have at minimum

- 1 domain tag
- 1 type tag
- 1 scope tag
- (optionally) priority + special tags

Example: `tags: [#design, #decision, #template, #p1]`

## Why closed vocabulary

Free-form tags = chaos within 20 entries. Closed set keeps search reliable.
Growth is intentional: add a tag = write a decision = deliberate choice.
