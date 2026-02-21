# /deploy

Build, validate, and deploy the project.

## Steps

1. Run `pnpm validate` — if it fails, STOP and report errors. Never deploy broken code.

2. Run `pnpm build` — confirm it succeeds.

3. Detect deploy target:
   - Check if `vercel.json` exists -> Vercel deployment
   - Check if `netlify.toml` exists -> Netlify deployment
   - If both exist -> ask user which one to use

4. Deploy:
   - **Vercel**: `npx vercel --prod` (if Vercel CLI not installed, suggest `pnpm add -g vercel`)
   - **Netlify**: `npx netlify deploy --prod --dir=dist` (if Netlify CLI not installed, suggest `pnpm add -g netlify-cli`)
   - If neither CLI is available, provide manual instructions:
     a. Vercel: "Run `npx vercel` to link your project, then `npx vercel --prod` to deploy"
     b. Netlify: "Run `npx netlify init` to link, then `npx netlify deploy --prod --dir=dist`"

5. Report the deploy URL.

## Pre-flight checks
- [ ] pnpm validate passes
- [ ] No uncommitted changes
- [ ] On main branch (or user explicitly wants to deploy a branch)
