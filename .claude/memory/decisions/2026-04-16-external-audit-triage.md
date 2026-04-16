---
id: 2026-04-16-external-audit-triage
date: 2026-04-16
type: decision
tags: [#delegated, #security, #workflow, #release, #template, #p0, #active]
scope: template
status: active
---

# External Audit (ChatGPT) — Triage & Action Plan

## Source

ChatGPT audit run via `/delegate` prompt on 2026-04-16 against repo
`mitambuch/steaksoap` @ commit 2334203 (post v5.1.0). Full report pasted
into the originating Claude session. Self-contained, evidence-based,
prioritized — 4 P0, 5 P1/P2, 6 positive observations, 3 unanswered questions.

## Claims verification (sample)

| Finding | Verified | Method |
|---|---|---|
| E2E fails on release (3/84) | ✓ 2/84 actual (keyboard.spec webkit) | Ran `pnpm test:e2e` |
| 33 commands / 17 rules (not 31/12) | ✓ exact | `ls .claude/commands` + `.claude/rules` |
| setup.js Node 20 vs engines Node 22 | ✓ confirmed | `grep` scripts/setup.js:57 |
| Mircooo refs in code | Historical CHANGELOG only (accepted) | `grep` on \*.md |

All sampled claims hold. Treat the rest as high-confidence.

## Triage

### 🔴 P0 — Must fix before next client backport

1. **Release gate must include E2E** (ChatGPT P1 → upgrade to P0)
   - V5.1.0 shipped with 2 failing webkit tests. Validate green ≠ release-safe.
   - Fix: add `pnpm test:e2e` to `.release-it.json` before:init OR create a
     `pnpm validate:full` and point before:init at it.
   - Effort: S. **Blocker for the next release.**

2. **WCAG AA contrast fail on Home** (ChatGPT P1 → P0)
   - Token-level defect. Contrast 4.45:1 < 4.5:1 required.
   - Fix: darken `--color-accent-text` OR increase tagline size/weight.
     Re-run `pnpm test:e2e -- a11y.spec`.
   - Effort: S.

3. **`npx only-allow pnpm` preinstall** (ChatGPT P1)
   - Runs remote code before lockfile. Supply chain exposure + pointless CI/offline break.
   - Fix: inline script checking `process.env.npm_config_user_agent`.
   - Effort: S.

4. **`base:patch infra` manifest incomplete + TAGS.md unprotected**
   (ChatGPT P1)
   - Missing from infra zone: `.release-it.json`, `netlify.toml`, `vercel.json`,
     `playwright.config.ts`, `.prettierrc` is there but `prettier.config.js`
     variant isn't covered. Lockfile never syncs.
   - TAGS.md policy: decide template-owned (our current de-facto stance) vs
     client-extensible — document and enforce.
   - Fix: single shared manifest (PATHS constant in `scripts/utils/`) used
     by both `base-patch.js` and `setup.js`. Add `TAGS.md` + `README.md`
     to PROTECTED or explicitly declare them template-propagated.
   - Effort: M.

### 🟡 P1 — Next focused session

5. **SEO / OG / sitemap production safety** (ChatGPT P0 — deferred, not downgraded)
   - Real P0 for crawlers, but the fix is LARGE (prerender/SSG or SSR).
   - Intermediate path: hard-fail production build when `VITE_APP_URL` is
     missing for non-base projects (`__BASE_PROJECT__` flag already exists).
     Document "SEO is client responsibility post-`/init`" until prerender lands.
   - Effort: S (guard) + L (prerender, separate project).

6. **Dependabot vulns** (6 flagged, already in `frictions/2026-04-16-dependabot-vulns-backlog.md`)
   - Combine with this triage into the next focused session.
   - Effort: M (depends on what the CVEs are).

### 🟢 P2 — Backlog

7. **Anti-main `RELEASE_IT=1` bypass is loose** — add staged-file pattern check
   or move exception to `commit-msg` where the message is available. Effort: S.

8. **setup.js Node 20 / engines Node 22 mismatch** — read from `package.json`
   as single source of truth in setup.js + doctor.js. Effort: S.

9. **`memory-index.js` silent on malformed entries** — validate required
   frontmatter fields per file, exit non-zero on errors. Effort: S.

10. **Doc drift** (REFERENCE counts 31/12 vs actual 33/17) — don't hand-maintain
    inventory counts. Generate them or remove. Effort: S.

11. **Boundary rules miss deep relative imports** (`../../../features/*` passes) —
    switch to path-based enforcement. Effort: M.

12. **Scripts have zero direct tests** — add smoke tests with temp-dir fixtures.
    Effort: M.

## What we are NOT actioning

- **Mircooo refs in CHANGELOG.md**: historical artifacts, CHANGELOG is
  append-only by contract. Not a drift issue.
- **`src/components/ui/Select.tsx` size**: ChatGPT confirmed acceptable.
  Matches our earlier call to raise component per-function cap to 200.

## Recommended next session

One focused session with branch `fix/audit-P0`, batching:
- Add `pnpm test:e2e` to release preflight
- Fix Home contrast
- Replace `npx only-allow pnpm`
- Reshape `base:patch` manifest + TAGS.md policy
- Fix WCAG test, re-verify green
- Release as `patch` v5.1.1 "Audit-Fix Batch 1"

Then a second focused session for P1 (Dependabot + SEO guard).

## Positive observations (confirmed)

- Zero `dangerouslySetInnerHTML` / `innerHTML` / `eval` usage in `src/`
- `pnpm validate` green (90.15% statements, 81.26% branches, 92.37% lines)
- Route-level lazy loading everywhere
- Protection symmetry between `base-patch.js` and `setup.js` (PROTECTED list)
- `memory-record-release.js` fails gracefully on tag lookup miss
- Netlify/Vercel header baseline above average

## Meta

The `/delegate` + external audit + `/integrate` workflow we designed in v5.1.0
**worked as intended on its first real use**. The report was self-contained,
evidence-based, and directly integratable — no back-and-forth needed. Pattern
validated. First concrete payoff of the workflow-v2 investment.
