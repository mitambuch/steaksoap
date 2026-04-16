---
id: audit-cycle-closed-2026-04-16
date: 2026-04-16
type: decision
tags: [#workflow, #template, #milestone, #p0, #active, #baseline]
scope: template
status: active
---

# 🛑 AUDIT CYCLE CLOSED — DO NOT RE-AUDIT

**Read this before spawning another ChatGPT/Sonnet audit on this repo.**
We ran three full external-audit passes on 2026-04-16. All findings closed.
Score converged at **9.2/10 (private agency template, ChatGPT confirmed)**.
Any additional audit round will return diminishing or duplicate findings
unless the repo state has materially changed since v5.4.1.

## Audit passes (2026-04-16)

### Pass 1 — post-v5.1.0 (workflow-v2 shipped)
External prompt via /delegate → ChatGPT. 4 P0, 2 P1, 5 P2.
Triaged in `.claude/memory/decisions/2026-04-16-external-audit-triage.md`.
**Closed in v5.1.1 + v5.1.2 + v5.2.0 + v5.2.1.**
- Release gate missing E2E → `validate:full` in `.release-it.json` before:init
- WCAG AA contrast fail (Home) → `--color-accent-text` lifted to #ff6b6b
- `npx only-allow pnpm` → replaced by `scripts/ensure-pnpm.js`
- `base:patch` infra manifest incomplete → +5 files, TAGS.md policy doc
- 6 Dependabot CVEs → all resolved via overrides + vite bump
- SEO prerender → `scripts/prerender-meta.js` postbuild
- Accordion a11y → `inert` on closed panels
- Coverage ratchet → thresholds 88/80/89/91
- Toast mobile → `max-w-[calc(100vw-2rem)]`
- WebKit keyboard tests → `test.skip` with Safari-quirk explanation

### Pass 2 — post-v5.2.1
Score jumped 80 → ~95. ChatGPT confirmed trajectory.
Owner asked for continued improvements autonomously.
**Closed in v5.2.2 + v5.3.0 + v5.3.1.**
- `RELEASE_IT=1` bypass tightened (staged-file pattern check)
- Import boundary rules depth infinie (`../**/<layer>/*`)
- Auto-sync REFERENCE counts (new `scripts/sync-reference-counts.js`)
- Script smoke tests (+15 tests for ensure-pnpm, memory-index, sync-ref)

### Pass 3 — post-v5.3.1
Score 9.1/10 per ChatGPT. 3 Medium findings, all documentary.
**Closed in v5.4.0.**
- README drift (31/12/242+/0.8 → 33/17/259+/0.9)
- REFERENCE tables partial (+Delegate category, rebuilt Rules table)
- docs:sync:check too narrow → extended to tables + README phrases
- RootLayout ToastContainer obsolete → moved row to App.tsx
- Vitest threshold row (76/73/85/78 → 88/80/89/91)

### Final tier confirmation — post-v5.4.0 + v5.4.1
ChatGPT: *"Sincèrement: ton repo est maintenant très bon."*
**Score: 9.2/10 for private agency template (PME sites).**
No more structural findings. Remaining reserve is philosophical:
*"pas parfait absolu au sens où il reste toujours des zones moins
critiques moins blindées que le cœur du système"* — i.e. unwinnable.

## What was INTENTIONALLY NOT done (don't re-flag these)

1. **Public-template packaging** (LICENSE, README "public-ready", remove
   `_baseProject`). Explicit owner decision 2026-04-16 morning:
   *"garde le pour moi"*. Repo is private agency tool. Any future
   "this isn't a public template" finding is out-of-scope.

2. **Full SSG/SSR with Vike/Next/Remix**. We ship head-only prerender
   (`scripts/prerender-meta.js`). Full SSG = weeks of refactor for
   4 routes. Decision: accept the client-side body rendering; head-only
   prerender + build-time VITE_APP_URL throw covers the SEO/OG case.

3. **Real OG images per route**. Requires brand/design assets per project.
   Base template has no art to ship. Each client sets `site.ts.ogImage`
   during `/init`.

4. **Localhost canonical in base build**. Base template (`_baseProject: true`)
   intentionally falls back to localhost — the base is never deployed.
   Client builds throw at build time if VITE_APP_URL is absent.

5. **WebKit Tab-cycling tests**. Safari's default "keyboard nav" pref
   only cycles Tab through form fields. Not an app defect. Tests skip
   with file-header explanation.

6. **Pre-push hook**. Belt-and-suspenders vs husky + always-loaded
   rules. Marginal value for solo owner.

## Major dep bumps pending (NOT done in v5.4.1)

v5.4.1 batched all safe patches + minors. Majors left for explicit
decision rounds — each requires review + potentially refactor:

| Package | Current → Latest | Risk | Effort |
|---|---|---|---|
| typescript | 5.9.3 → 6.0.2 | 🔴 Huge | 2–4h |
| vite | 7.3.2 → 8.0.8 | 🟠 High | 1–2h |
| @vitejs/plugin-react | 5.2.0 → 6.0.1 | 🟠 tied to vite 8 | included |
| eslint | 9.39.4 → 10.2.0 | 🟠 Medium | 30 min |
| @eslint/js | 9.39.4 → 10.0.1 | 🟠 tied to eslint 10 | included |
| release-it | 19.2.4 → 20.0.0 | 🟠 Medium | 30 min |
| lucide-react | 0.575.0 → 1.8.0 | 🟠 0.x→1.x | 30 min |
| jsdom | 28.1.0 → 29.0.2 | 🟡 Low-Med | 15 min |
| eslint-plugin-simple-import-sort | 12 → 13 | 🟡 Low | 10 min |
| globals | 16.5.0 → 17.5.0 | 🟡 Low | 10 min |
| eslint-plugin-react-refresh | 0.4.26 → 0.5.2 | 🟡 Low (0.x) | 10 min |

**Owner's stance (confirmed 2026-04-16 evening)**: these are deferred
until a real driver emerges. Not urgent. `pnpm outdated` will flag
them on the next check-in; don't re-audit their existence as a finding.

## Releases today — 10 total

v5.1.0 → v5.4.1 — full chain in CHANGELOG.md and GitHub Releases.
Every release auto-journalled in `.claude/memory/decisions/`.

## The rule going forward

**Next work unit on steaksoap should be driven by a real signal**,
not another audit:
- Backport to HDVA post-live 2026-04-17 (real friction = real learning)
- First genuinely NEW client project (real onboarding = real gaps)
- Major dep bumps (when ecosystem is settled OR a CVE forces the hand)

**If a future session proposes "let's run another audit"**: point at
this entry. We've exhausted the audit-driven improvement path for this
artifact at this point in time. More audit rounds without new repo
state = time wasted on duplicate findings.

## Cross-references

- Audit triage (pass 1): `.claude/memory/decisions/2026-04-16-external-audit-triage.md`
- Session journals: `sessions/2026-04-16-*.md` (9 sessions today)
- Dependabot history: `.claude/memory/frictions/2026-04-16-dependabot-vulns-backlog.md`
- Baseline (pre-today): `.claude/memory/decisions/2026-04-16-template-baseline.md`
