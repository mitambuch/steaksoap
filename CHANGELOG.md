# Changelog

## [1.2.0](https://github.com/Mircooo/steaksoap/compare/v1.1.0...v1.2.0) (2026-02-21)

### ✨ Features

* **agents:** add 4 specialized ai sub-agents ([3846c87](https://github.com/Mircooo/steaksoap/commit/3846c874686418cb44ecfa4854d620bf205cabf4))
* **commands:** add /refactor command for rule-aligned code cleanup ([309dfdf](https://github.com/Mircooo/steaksoap/commit/309dfdf8f02234eb78eca0909f41b33e98b1b9a1))
* **commands:** add 13 new ai slash commands (15 total) ([cd4c5ab](https://github.com/Mircooo/steaksoap/commit/cd4c5ab13f267e2904fba864e196ae51d3ead5dc))
* **context:** add decisions.md for architectural decision tracking ([f447bcd](https://github.com/Mircooo/steaksoap/commit/f447bcdd733f1cc74872b7713c855f3238a518dd))
* **pages:** add component showcase page at /showcase ([fc7b47a](https://github.com/Mircooo/steaksoap/commit/fc7b47adcd2591368ccef0eaaafceedbc1f3f3be))
* **rules:** add api.md rule for data fetching patterns ([6e1746a](https://github.com/Mircooo/steaksoap/commit/6e1746ac8b34cebe28748f5c4060c87b7b65e30c))
* **setup:** add 'Keep Playground?' option to project initialization wizard ([08cd55c](https://github.com/Mircooo/steaksoap/commit/08cd55cc5315f7b5fab829d89e619b171fbbd5e7))
* **theme:** add dark/light mode with theme system ([85cb540](https://github.com/Mircooo/steaksoap/commit/85cb540d0a05796864b562fa0971f53659e71438))
* **ui:** add base ui component library ([de05402](https://github.com/Mircooo/steaksoap/commit/de05402cab5c30c0f37e16d8a1b627d330e337b0))

### 🐛 Bug Fixes

* **a11y:** accessibility improvements and axe-core tests ([9c12be5](https://github.com/Mircooo/steaksoap/commit/9c12be53697306cca95c21bf9362b72d6664afa5))
* **core:** consolidation pass from dual-ai audit ([012d5ee](https://github.com/Mircooo/steaksoap/commit/012d5eee875759dff58ec5e56766367551cadb7c))
* **core:** critical bugfixes and rename to steaksoap ([5681db3](https://github.com/Mircooo/steaksoap/commit/5681db3096c1237a8e4dedcdf3e4c9995c24973b))
* **layout:** enable header with navigation and theme toggle ([f72fd10](https://github.com/Mircooo/steaksoap/commit/f72fd10c05bb27d8bd08cfe15aacad3adb734ee5))

### ♻️  Refactoring

* **rules:** split claude.md into modular rules system ([fc920c4](https://github.com/Mircooo/steaksoap/commit/fc920c49adf9b0edd21b1cb1a3b3b67d80e9cc1b))

### 📚 Documentation

* **positioning:** rebrand as ai-first starter kit ([fc0aedb](https://github.com/Mircooo/steaksoap/commit/fc0aedbde96ff0bb86fa124747f49427fabfde54))
* **recipes:** add recipes, commands, agents, and template guide ([abc8f5d](https://github.com/Mircooo/steaksoap/commit/abc8f5d89881cef9d38ab123226508ce4c2accba))

### 🔧 Chores

* **ci:** add bundle check, auto-label, stale bot, devcontainer ([3e79ca0](https://github.com/Mircooo/steaksoap/commit/3e79ca03b11cf9779a6706b747999b9b2f9cbc1d))
* **release:** v1.1.0 ([b945e8d](https://github.com/Mircooo/steaksoap/commit/b945e8dc2f411ecd410b01bc35bcf1318a588a71))

* merge(main): phase 4 — 4 ai sub-agents (4834384)
* feat(agents): add 4 specialized ai sub-agents (3846c87)
* merge(main): phase 3 — 15 ai slash commands (3d58a34)
* feat(commands): add 13 new ai slash commands (15 total) (cd4c5ab)
* merge(main): phase 2 modular rules system (a113048)
* refactor(rules): split claude.md into modular rules system (fc920c4)
* merge(main): phase 1 positioning and readme rebrand (540a2d7)
* docs(positioning): rebrand as ai-first starter kit (fc0aedb)
* merge(main): phase 0 bugfixes and rename to steaksoap (00308c5)
* fix(core): critical bugfixes and rename to steaksoap (5681db3)

## [1.1.0](https://github.com/Mircooo/starter/compare/v1.0.0...v1.1.0) (2026-02-21)

### ✨ Features

* **ai:** add multi-ai workflow support and slash commands ([6ee42e4](https://github.com/Mircooo/starter/commit/6ee42e47b067d6086827e28d95ee9662a20e855f))
* **deploy:** add deploy buttons, netlify config, and rewrite readme ([3b85dec](https://github.com/Mircooo/starter/commit/3b85decb768d7af00c49889af0b2a0d61f8f29ee))
* **setup:** unified interactive wizard with 3 modes ([fb30f96](https://github.com/Mircooo/starter/commit/fb30f96f12b881fc178ba8ccf034e470d795ce29))

### ♻️  Refactoring

* **core:** make all env vars optional and remove dead code ([49475e3](https://github.com/Mircooo/starter/commit/49475e3a7d1c89c27b11e6b880926e3d31604981))

### 📚 Documentation

* **open-source:** add dependabot, update contributing and setup guide ([ed433e2](https://github.com/Mircooo/starter/commit/ed433e2dd331a3df8d5f73d1375bec8b3f0da383))

### ✅ Tests

* **env:** add env fallback tests and fix empty string handling ([9e4efa3](https://github.com/Mircooo/starter/commit/9e4efa3d901a831f1bbbb731cafa6e0951c748f4))

## [1.0.0](https://github.com/Mircooo/starter/compare/v0.7.0...v1.0.0) (2026-02-21)

### ♻️  Refactoring

* **init:** enhance cli with auto-detect, cleanup, and welcome message ([16cd896](https://github.com/Mircooo/starter/commit/16cd896f65bfb1df2685c09d334df4707670c217))

### 🔧 Chores

* **ci:** add node 22 to test matrix ([4ed3cf4](https://github.com/Mircooo/starter/commit/4ed3cf40752f407020fe63636920ddde6cfee290))
* **cleanup:** replace todo with informational comment ([aaebe99](https://github.com/Mircooo/starter/commit/aaebe994278e8c701a628c34b9d140e917155b5b))
* **env:** translate .env.example comment to english ([93cc5ae](https://github.com/Mircooo/starter/commit/93cc5aec218f40112bdcacb60fb65a139e25abb8))
* **pkg:** add open-source metadata to package.json ([df3356f](https://github.com/Mircooo/starter/commit/df3356fe2dc00dd9428f551eb91d18a773bc821a))

## [0.7.0](https://github.com/Mircooo/starter/compare/v0.6.1...v0.7.0) (2026-02-21)

### ✨ Features

* **data:** add showcase landing page content ([e2211af](https://github.com/Mircooo/starter/commit/e2211afca6a1672cb0307231fd9937a2c0163158))
* **home:** add showcase sections below hero ([fbb0f4e](https://github.com/Mircooo/starter/commit/fbb0f4e91d96597d66209c66c8b4323f32f2129c))
* **hooks:** add scroll-triggered animation hook ([ef552f3](https://github.com/Mircooo/starter/commit/ef552f3c219318b3f4ec583503a127bb9bd433cc))
* **layout:** add site-wide footer with version and credits ([9126a60](https://github.com/Mircooo/starter/commit/9126a6009778d2cac94fcc041f6689e1f10db97c))
* **ui:** add section, feature card, code block, tech badge components ([acb733b](https://github.com/Mircooo/starter/commit/acb733b51d15607bed401744d2bd3e95386a38ff))

### 🐛 Bug Fixes

* **styles:** scope cursor-hidden to hero section only ([e598b2a](https://github.com/Mircooo/starter/commit/e598b2a38653ab2db7b609c5300f62b70a1f51c9))

## [0.6.1](https://github.com/Mircooo/starter/compare/v0.6.0...v0.6.1) (2026-02-21)

### 📚 Documentation

* **claude:** switch from mandatory release to batch release strategy ([2e4ed6b](https://github.com/Mircooo/starter/commit/2e4ed6b1d63e71338bbd6f395bcaa8f07fc5e619))
* **community:** add governance files and improve github templates ([b0e77f9](https://github.com/Mircooo/starter/commit/b0e77f9b8299258220db756679dc2983fcab10e8))
* **i18n:** translate all documentation and code to english ([130c894](https://github.com/Mircooo/starter/commit/130c89456c7868e6e24b33ac6b6de24b0b57b385))

### 🔧 Chores

* **release:** consolidate 20 releases into 6 logical batches ([c6cb63b](https://github.com/Mircooo/starter/commit/c6cb63b5b41b8ecc24ed29b993031be205d209ee))

## [0.6.0](https://github.com/Mircooo/starter/compare/v0.5.0...v0.6.0) (2026-02-21)

### ✨ Features

* **home:** redesign landing page with typewriter, grain, and custom cursor ([ba09524](https://github.com/Mircooo/starter/commit/ba09524))

### 📖 Docs

* **claude:** switch from mandatory release to batch release strategy ([2e4ed6b](https://github.com/Mircooo/starter/commit/2e4ed6b))

## [0.5.0](https://github.com/Mircooo/starter/compare/v0.4.0...v0.5.0) (2026-02-20)

### ✨ Features

* **lint:** enable type-aware eslint rules ([9ef66ff](https://github.com/Mircooo/starter/commit/9ef66ff))

### 🐛 Bug Fixes

* **a11y:** respect prefers-reduced-motion for smooth scroll ([713b08d](https://github.com/Mircooo/starter/commit/713b08d))
* **config:** use esm-safe __dirname in vite config ([8e26ff2](https://github.com/Mircooo/starter/commit/8e26ff2))
* **config:** use loadenv for reliable env access in vite config ([803b942](https://github.com/Mircooo/starter/commit/803b942))
* **lint:** extend node globals to scripts directory ([375dce2](https://github.com/Mircooo/starter/commit/375dce2))
* **lint:** use esm-safe dirname for node 20 compat ([5f79ec0](https://github.com/Mircooo/starter/commit/5f79ec0))

### 📚 Documentation

* **claude:** clarify spa seo limitations ([30491b6](https://github.com/Mircooo/starter/commit/30491b6))
* **readme:** sync docs with current stack and config ([a460e1c](https://github.com/Mircooo/starter/commit/a460e1c))

## [0.4.0](https://github.com/Mircooo/starter/compare/v0.3.0...v0.4.0) (2026-02-20)

### ✨ Features

* **dx:** upgrade tailwind v4, add vercel config, add feature example ([1b44fc1](https://github.com/Mircooo/starter/commit/1b44fc1))

### 🐛 Bug Fixes

* **release:** clean changelog header from v0.4.0 release ([306cc07](https://github.com/Mircooo/starter/commit/306cc07))
* **release:** re-stage changelog after dedup to include fix in commit ([7852c1c](https://github.com/Mircooo/starter/commit/7852c1c))

### 🔧 Chores

* **docs:** sync docs with tailwind v4 and migrate animations to @utility ([d5bc4ee](https://github.com/Mircooo/starter/commit/d5bc4ee))
* **dx:** improve testing, formatting, and project config ([716cce8](https://github.com/Mircooo/starter/commit/716cce8))
* **dx:** remove double tsc, fix eslint flags, add engines ([06bcf5b](https://github.com/Mircooo/starter/commit/06bcf5b))

## [0.3.0](https://github.com/Mircooo/starter/compare/v0.2.0...v0.3.0) (2026-02-20)

### ✨ Features

* **seo:** add automatic sitemap + robots.txt generation ([bf5c518](https://github.com/Mircooo/starter/commit/bf5c518))

### 🐛 Bug Fixes

* **dx:** graceful env fallback in dev and update readme ([9b6422d](https://github.com/Mircooo/starter/commit/9b6422d))
* **release:** show all commit types in changelog and github releases ([907db57](https://github.com/Mircooo/starter/commit/907db57))
* **docs:** complete changelog with all commits since v0.1.0 ([9c38c80](https://github.com/Mircooo/starter/commit/9c38c80))
* **release:** prevent duplicate header in changelog ([dc12260](https://github.com/Mircooo/starter/commit/dc12260))
* **release:** add post-bump script to deduplicate changelog header ([e7cc3e3](https://github.com/Mircooo/starter/commit/e7cc3e3))
* **release:** fix changelog header deduplication ([2fee06b](https://github.com/Mircooo/starter/commit/2fee06b))
* **release:** move changelog fix to before:release hook ([bc3f332](https://github.com/Mircooo/starter/commit/bc3f332))

### 🔧 Chores

* **dx:** final polish — tailwind sorting, responsive pages, mobile-first rules ([6c87015](https://github.com/Mircooo/starter/commit/6c87015))
* **init:** reset changelog on new project + enforce pnpm ([b632fca](https://github.com/Mircooo/starter/commit/b632fca))

### 📚 Documentation

* **claude:** enforce mandatory release after every session ([9736f4d](https://github.com/Mircooo/starter/commit/9736f4d))
* **claude:** add standard workflow and simplify instructions ([2af8d30](https://github.com/Mircooo/starter/commit/2af8d30))

## [0.2.0](https://github.com/Mircooo/starter/compare/v0.1.0...v0.2.0) (2026-02-20)

### ✨ Features

* **ci:** add github actions workflow for lint, typecheck, and build ([fa402ba](https://github.com/Mircooo/starter/commit/fa402ba))
* **components:** add error boundary and wrap app ([a8209ad](https://github.com/Mircooo/starter/commit/a8209ad))
* **config:** add env validation with clear error messages ([7789c61](https://github.com/Mircooo/starter/commit/7789c61))
* **dx:** add setup and update scripts ([01b3d93](https://github.com/Mircooo/starter/commit/01b3d93))
* **lint:** add eslint-plugin-jsx-a11y for accessibility checks ([90f7266](https://github.com/Mircooo/starter/commit/90f7266))
* **lint:** add eslint-plugin-simple-import-sort ([0b0e4f1](https://github.com/Mircooo/starter/commit/0b0e4f1))
* **seo:** add seohead component and site config ([56b0b98](https://github.com/Mircooo/starter/commit/56b0b98))
* **ui:** add welcome page and init:project script ([c908d5c](https://github.com/Mircooo/starter/commit/c908d5c))

### 🐛 Bug Fixes

* **build:** remove manual chunks causing empty react-vendor warning ([ad265b4](https://github.com/Mircooo/starter/commit/ad265b4))
* **git:** remove .claude/ from repo and add to .gitignore ([ebc3893](https://github.com/Mircooo/starter/commit/ebc3893))
* **release:** make release scripts cross-platform ([3d833b0](https://github.com/Mircooo/starter/commit/3d833b0))
* **seo:** fix placeholders and add canonical url support ([dba4705](https://github.com/Mircooo/starter/commit/dba4705))
* **styles:** use valid easing value in animations.css ([2f5562a](https://github.com/Mircooo/starter/commit/2f5562a))
* **types:** use inline import for react types in common.ts ([c749210](https://github.com/Mircooo/starter/commit/c749210))

### ♻️  Refactoring

* **config:** centralize aliases via vitest mergeconfig ([c216c53](https://github.com/Mircooo/starter/commit/c216c53))

### 🔧 Chores

* **config:** add .prettierignore ([099083d](https://github.com/Mircooo/starter/commit/099083d))
* **github:** add pr template and issue templates ([a621a8d](https://github.com/Mircooo/starter/commit/a621a8d))
* **quality:** harden gitignore, logging, commitlint, and docs ([8bbfe3e](https://github.com/Mircooo/starter/commit/8bbfe3e))
* **repo:** rename project to starter ([7406383](https://github.com/Mircooo/starter/commit/7406383))
* **seo:** add public/robots.txt ([f080c64](https://github.com/Mircooo/starter/commit/f080c64))
* **structure:** add missing folders (hooks, context, data, lib) ([57cc0e9](https://github.com/Mircooo/starter/commit/57cc0e9))
* **test:** add explicit vitest.config.ts with path aliases ([f049433](https://github.com/Mircooo/starter/commit/f049433))
* **vscode:** add versioned editor config with recommended extensions ([2e3e6db](https://github.com/Mircooo/starter/commit/2e3e6db))
* **vscode:** disable editor as commit input ([5d85b0a](https://github.com/Mircooo/starter/commit/5d85b0a))
* add .gitattributes to enforce lf line endings ([ebf8b8e](https://github.com/Mircooo/starter/commit/ebf8b8e))
* create missing directories referenced in readme ([d7a1ff5](https://github.com/Mircooo/starter/commit/d7a1ff5))

### ✅ Tests

* **utils:** add vitest with tests for cn() and cloudinary ([84e5fe7](https://github.com/Mircooo/starter/commit/84e5fe7))

### 📚 Documentation

* **architecture:** add complete folder structure documentation ([7522155](https://github.com/Mircooo/starter/commit/7522155))
* **changelog:** add initial changelog for v0.1.0 ([f7c1fae](https://github.com/Mircooo/starter/commit/f7c1fae))
* **claude:** add release workflow and semver conventions ([6084045](https://github.com/Mircooo/starter/commit/6084045))
* **claude:** document automated git hooks ([3572ebb](https://github.com/Mircooo/starter/commit/3572ebb))
* **claude:** rewrite claude.md with full agency conventions ([af0a537](https://github.com/Mircooo/starter/commit/af0a537))
* **deps:** add dependencies documentation with justifications ([9208a2f](https://github.com/Mircooo/starter/commit/9208a2f))
* **readme:** update git section to match current conventions ([5eb0e13](https://github.com/Mircooo/starter/commit/5eb0e13))
* **setup:** add step-by-step installation guide ([da7a85d](https://github.com/Mircooo/starter/commit/da7a85d))

## [0.1.0](https://github.com/Mircooo/starter/releases/tag/v0.1.0) (2026-02-20)

### Initial Release

First development release — project scaffold.

### 🔧 Chores

* initial project scaffold ([2bf78d4](https://github.com/Mircooo/starter/commit/2bf78d4))
* add src/assets/ directory to match @assets path alias ([0680298](https://github.com/Mircooo/starter/commit/0680298))
* remove empty barrel exports ([ab56bbb](https://github.com/Mircooo/starter/commit/ab56bbb))
* **deps:** add husky, commitlint, lint-staged ([9f82b8e](https://github.com/Mircooo/starter/commit/9f82b8e))
* **deps:** add release-it and conventional-changelog plugin ([a11dc8f](https://github.com/Mircooo/starter/commit/a11dc8f))
* **commitlint:** add commitlint config with conventional commits rules ([03393f0](https://github.com/Mircooo/starter/commit/03393f0))
* **commitlint:** add merge type to allowed list ([a2adb16](https://github.com/Mircooo/starter/commit/a2adb16))
* **husky:** add pre-commit and commit-msg hooks ([964972a](https://github.com/Mircooo/starter/commit/964972a))
* **release:** add release-it config with conventional changelog ([4717cf2](https://github.com/Mircooo/starter/commit/4717cf2))

### ♻️  Refactoring

* **utils:** replace manual cn() with clsx + tailwind-merge ([37c56a3](https://github.com/Mircooo/starter/commit/37c56a3))

### 🎨 Styles

* **css:** remove redundant reset already handled by Tailwind Preflight ([e74222b](https://github.com/Mircooo/starter/commit/e74222b))

### 🐛 Bug Fixes

* **config:** remove unused VITE_CLOUDINARY_BASE_URL from .env.example ([b08e4df](https://github.com/Mircooo/starter/commit/b08e4df))

> Pre-1.0 — development phase, nothing is stable yet.
