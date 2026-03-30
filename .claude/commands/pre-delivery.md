# /pre-delivery

Ultimate checklist before shipping a project to a client. Run this EVERY time.

## Philosophy

A project is not "done" when the code works. It's done when:
- A developer can maintain it without you
- A client can't break it by clicking randomly
- Search engines can find it
- It loads fast on a phone in a train
- Nothing leaks, nothing crashes, nothing is ugly

## Step 1 — Validation (blocks everything)

```bash
pnpm validate
```

If this fails, stop. Fix first.

## Step 2 — Generate HANDOFF.md

Run `/handoff` to generate or update the HANDOFF.md file.
This is the "if I get hit by a bus" document. No AI required to read it.

Verify HANDOFF.md:
- [ ] Quick start works (clone → install → dev)
- [ ] All routes listed with descriptions
- [ ] Design tokens documented with actual hex values
- [ ] Tech decisions explained (why, not just what)
- [ ] Zero references to AI commands as the way to do things

## Step 3 — Health check

Run `/health-check` and review the report.

Must be green:
- [ ] No security vulnerabilities in dependencies
- [ ] No outdated critical packages (React, Vite, Tailwind, TypeScript)
- [ ] Documentation matches code reality
- [ ] Test coverage above thresholds

## Step 4 — Responsive check

Run `/responsive-check` on every page.

Verify at minimum:
- [ ] 320px (small phone)
- [ ] 375px (iPhone SE)
- [ ] 768px (tablet)
- [ ] 1024px (laptop)
- [ ] 1440px (desktop)

No horizontal scroll at any width. No text overflow. No broken layouts.

## Step 5 — Lighthouse audit

Run `/lighthouse` on every page (not just home).

Minimum scores:
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

## Step 6 — Security headers verification

Check deployment platform (Vercel/Netlify) headers:
- [ ] Content-Security-Policy present and strict
- [ ] Strict-Transport-Security (HSTS) enabled
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy set
- [ ] Permissions-Policy restricts camera/microphone/geolocation

## Step 7 — SEO basics

- [ ] Every page has `<SeoHead>` with unique title and description
- [ ] OG image exists and renders correctly (check with https://opengraph.xyz)
- [ ] Sitemap generated (check /sitemap.xml after build)
- [ ] Robots.txt allows crawling (check /robots.txt after build)
- [ ] Canonical URLs are correct
- [ ] No orphan pages (every page reachable from navigation)

## Step 8 — Legal compliance (nLPD/GDPR)

- [ ] Privacy policy page exists (`/privacy`)
- [ ] Legal notice / Impressum page exists (`/legal`)
- [ ] Both pages have real company info (not placeholders)
- [ ] Footer links to both legal pages
- [ ] If analytics installed: privacy policy mentions it
- [ ] If contact form exists: privacy policy mentions data collection
- [ ] No third-party requests without consent (check Network tab in DevTools)

If legal pages are missing, run `/legal "Company Name, Address, Email"`.

## Step 9 — Environment cleanup

- [ ] `.env.local` has production values (not localhost URLs)
- [ ] No console.log in production code (ESLint catches this)
- [ ] No test/debug data visible on the site
- [ ] Favicon is the client's, not the template default
- [ ] Site title in `src/config/site.ts` is the client's

## Step 10 — Git hygiene

- [ ] On main branch, clean working tree
- [ ] All feature branches merged and deleted
- [ ] CHANGELOG.md up to date
- [ ] Latest version tagged

## Step 11 — Final report

Present to the user:

```
═══════════════════════════════════════════════════════════
PRE-DELIVERY CHECK: [project name] — [date]
═══════════════════════════════════════════════════════════

  Validation        ✅ / ❌
  HANDOFF.md        ✅ Generated / ❌ Missing
  Health check      ✅ Score X/10 / ⚠️ Issues found
  Responsive        ✅ All widths / ❌ Issues at Xpx
  Lighthouse        ✅ 90+ all / ⚠️ Below threshold
  Security headers  ✅ Complete / ❌ Missing X
  SEO               ✅ Complete / ⚠️ Missing X
  Environment       ✅ Production-ready / ❌ Debug data found
  Git               ✅ Clean / ⚠️ Unpushed commits

  VERDICT: READY TO SHIP ✅ / NOT READY ❌
═══════════════════════════════════════════════════════════
```

## Rules
- NEVER skip a step — even if "it's just a small site"
- NEVER ship with Lighthouse below 90 on any category
- NEVER ship without HANDOFF.md
- NEVER ship with security vulnerabilities in deps
- If verdict is NOT READY: fix ALL issues, then run /pre-delivery again
