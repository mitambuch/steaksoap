# Changelog

All notable changes to this project are documented here.

Format: [Keep a Changelog](https://keepachangelog.com) · Versioning: [Semantic Versioning](https://semver.org)


## [0.3.3](https://github.com/Mircooo/starter/compare/v0.3.2...v0.3.3) (2026-02-20)

### 🐛 Bug Fixes

* **release:** show all commit types in changelog and github releases ([907db57](https://github.com/Mircooo/starter/commit/907db57))

## [0.3.2](https://github.com/Mircooo/starter/compare/v0.3.1...v0.3.2) (2026-02-20)

### 🔧 Chores

* **init:** reset changelog on new project + enforce pnpm ([b632fca](https://github.com/Mircooo/starter/commit/b632fca))

## [0.3.1](https://github.com/Mircooo/starter/compare/v0.3.0...v0.3.1) (2026-02-20)

### 🔧 Chores

* **dx:** final polish — tailwind sorting, responsive pages, mobile-first rules ([6c87015](https://github.com/Mircooo/starter/commit/6c87015))

## [0.3.0](https://github.com/Mircooo/starter/compare/v0.2.1...v0.3.0) (2026-02-20)

### ✨ Features

* **seo:** add automatic sitemap + robots.txt generation ([bf5c518](https://github.com/Mircooo/starter/commit/bf5c518))

## [0.2.1](https://github.com/Mircooo/starter/compare/v0.2.0...v0.2.1) (2026-02-20)

### 🐛 Bug Fixes

* **dx:** graceful env fallback in dev and update readme ([9b6422d](https://github.com/Mircooo/starter/commit/9b6422d))

### 📚 Documentation

* **claude:** add standard workflow and simplify instructions ([2af8d30](https://github.com/Mircooo/starter/commit/2af8d30))
* **claude:** enforce mandatory release after every session ([9736f4d](https://github.com/Mircooo/starter/commit/9736f4d))

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
