# /legal

Generate legal pages required for Swiss (nLPD) and EU (GDPR) compliance.

## Arguments
$ARGUMENTS — Company/client info (name, address, email, etc.)

## Philosophy

Every client website published in Switzerland or the EU MUST have legal pages.
This is not optional. It's the law.
- **Switzerland**: nLPD (new Federal Act on Data Protection, Sept 2023)
- **EU**: GDPR (General Data Protection Regulation)

## What to generate

### 1. Privacy Policy page (`src/pages/Privacy.tsx`)

Use `/new-page Privacy` pattern. Content must include:

```
Privacy Policy / Politique de confidentialité / Datenschutzerklärung

1. Controller
   [Company name, address, email — from $ARGUMENTS]

2. Data collected
   - No personal data is collected by default
   - If contact form exists: name, email, message (purpose: respond to inquiries)
   - If analytics installed: anonymous usage data (specify which: Plausible, Umami, etc.)

3. Cookies
   - Technical cookies only (theme preference stored in localStorage)
   - No tracking cookies
   - No third-party cookies
   (Update this section if analytics or third-party services are added later)

4. Third-party services
   - Hosting: [Vercel/Netlify] (servers may be outside Switzerland)
   - Images: Cloudinary (if configured) — CDN, no personal data processed
   - Fonts: Self-hosted (no external requests)
   - Analytics: [None by default / Plausible / Umami if installed]
   (Update this section when adding services via /install-extension)

5. Data retention
   - Contact form submissions: [specify per client needs]
   - Analytics: [specify per analytics tool]

6. Rights
   - Right of access, rectification, deletion
   - Contact: [email from $ARGUMENTS]

7. Updates
   - This policy may be updated. Last updated: [date]
```

### 2. Legal Notice / Impressum page (`src/pages/Legal.tsx`)

Use `/new-page Legal` pattern. Content must include:

```
Legal Notice / Mentions légales / Impressum

1. Site operator
   [Company name]
   [Address]
   [Email]
   [Phone if applicable]
   [Commercial register number if applicable (CH: UID, FR: SIRET)]

2. Hosting
   [Vercel Inc. / Netlify Inc. — with address]

3. Intellectual property
   All content, design, and code are property of [Company name].
   Unauthorized reproduction is prohibited.

4. Liability
   [Standard disclaimer — content provided as-is, no guarantee of accuracy]
```

### 3. Route setup

Add both pages to the router:
- `/privacy` → Privacy.tsx
- `/legal` → Legal.tsx

Add links in the Footer component (or create a minimal footer if none exists).

### 4. Cookie consent (if needed)

Only required if the site:
- Uses analytics that set cookies (Plausible and Umami are cookie-free — no consent needed)
- Uses third-party embeds (YouTube, Google Maps, social widgets)
- Uses tracking pixels or retargeting

If none of the above apply (default steaksoap setup), no cookie banner is needed.
Document this decision in `.claude/decisions.md`.

## Rules
- ALWAYS generate in the client's language (check site.ts locale)
- ALWAYS use real company info from $ARGUMENTS, never placeholders
- ALWAYS add routes and navigation links
- ALWAYS commit: `feat(legal): add privacy policy and legal notice`
- NEVER copy-paste legal text from the internet — generate project-specific content
- NEVER claim this replaces legal advice — add a comment that a lawyer should review
- UPDATE privacy policy whenever a new extension with data processing is installed
