---
id: dependabot-vulns-backlog-2026-04-16
date: 2026-04-16
type: friction
tags: [#security, #friction, #template, #p1, #deprecated]
scope: template
status: deprecated
---

# 6 Dependabot Vulnerabilities Signaled Post-v5.1.0 Push

> **RESOLVED 2026-04-17.** All 6 alerts closed by GitHub Dependabot
> (state: `fixed`). Verified via `gh api repos/mitambuch/steaksoap/dependabot/alerts`
> → 0 open alerts. `pnpm audit` (prod + dev, 960 deps) → 0 vulnerabilities.
> Fix shipped across v5.1.1 → v5.2.0 (vite bump + pnpm overrides) — see
> [audit-cycle-closed](../decisions/2026-04-16-audit-cycle-closed.md):28.
> Kept for history per memory protocol (never delete, only deprecate).

## The signal

GitHub's push response after `git push origin main` for v5.1.0:

```
remote: GitHub found 6 vulnerabilities on mitambuch/steaksoap's default branch
remote: (5 high, 1 moderate). To find out more, visit:
remote:      https://github.com/mitambuch/steaksoap/security/dependabot
```

## Why it matters (business angle)

Steaksoap is the **template** from which all paid client sites are derived.
Any vulnerability on the template propagates to every future project via
`pnpm base:update` (unless explicitly updated on the client).

**Not fixing = shipping vulnerable infrastructure to paying clients.**

## Why not fixed in this session

- `pnpm audit --prod` endpoint returned HTTP 410 (deprecated, points to new bulk API)
- Workflow-v2 rollout session was already long; proper vuln triage needs a focused session
- Fixing blindly (bump everything) risks breaking tests / introducing regressions

## Next session checklist

1. **Inspect the 6 CVEs** via the URL above (or `gh api repos/mitambuch/steaksoap/dependabot/alerts`)
2. For each:
   - Note CVE ID, severity, affected package, fix version
   - Check if it's a transitive dep (common) or direct
   - Check if the fix is breaking
3. **Strategy per vuln**:
   - Transitive dep with patch available → `pnpm update <dep>` + test
   - Direct dep needing major bump → branch, test thoroughly, likely its own release
   - Dev-only dep (not in bundle) → lower priority
4. Run `pnpm validate` after every bump
5. Single release `chore(deps): fix N security advisories` with full CVE list in commit body

## Entry points

- https://github.com/mitambuch/steaksoap/security/dependabot
- `gh api repos/mitambuch/steaksoap/dependabot/alerts --jq '.[] | {severity, package: .security_vulnerability.package.name, state: .state, summary: .security_advisory.summary}'`

## Why tagged as friction (not decision)

This entry exists because the issue was **surfaced but not resolved** in
this session. A future session will either produce a decision entry (the
fix strategy) or a pattern entry (how we handle dependabot alerts).
