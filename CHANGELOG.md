# Changelog

## [2.2.0](https://github.com/mitambuch/steaksoap/compare/v2.1.3...v2.2.0) (2026-02-23)

### ✨ Features

* **home:** revamp get started section and add home nav link ([386cc88](https://github.com/mitambuch/steaksoap/commit/386cc8838fc5fe5e20c1647eae1179376e4e3ab5))

## [2.1.3](https://github.com/mitambuch/steaksoap/compare/v2.1.2...v2.1.3) (2026-02-23)

### 🐛 Bug Fixes

* **ui:** shrink theme icons and fix hero footer on mobile ([8d3e965](https://github.com/mitambuch/steaksoap/commit/8d3e9656b262157d8096ea61e0acb36e63a3a19e))

## [2.1.2](https://github.com/mitambuch/steaksoap/compare/v2.1.1...v2.1.2) (2026-02-23)

### 🐛 Bug Fixes

* **ui:** hero title wrap, light mode borders, github button text color ([925997b](https://github.com/mitambuch/steaksoap/commit/925997b98c30400dd1ded86ef569cbadb9378257)), closes [#b0b0a8](https://github.com/mitambuch/steaksoap/issues/b0b0a8) [#0a0a0a](https://github.com/mitambuch/steaksoap/issues/0a0a0a)

## [2.1.1](https://github.com/mitambuch/steaksoap/compare/v2.1.0...v2.1.1) (2026-02-23)

### 🐛 Bug Fixes

* **branding:** transparent favicon svg with morph animation + apple-touch-icon ([80815e1](https://github.com/mitambuch/steaksoap/commit/80815e167d777d03ea110bac552200ada4a495e9))
* **layout:** push header logo left, nav right, cap at 2440px ([f21f28d](https://github.com/mitambuch/steaksoap/commit/f21f28d85aa5ba6b83ddbb0ba78439c404ac83fd))

## [2.1.0](https://github.com/mitambuch/steaksoap/compare/v2.0.2...v2.1.0) (2026-02-23)

### ✨ Features

* **branding:** add steaksoap blob as favicon (svg + png) ([b8747cb](https://github.com/mitambuch/steaksoap/commit/b8747cbf39ac6725cad91d4f567a778ebdccf6db))

### 🐛 Bug Fixes

* **commands:** replace [@services](https://github.com/services) references with existing [@lib](https://github.com/lib) alias ([731d0a7](https://github.com/mitambuch/steaksoap/commit/731d0a7d883fd76599b4a0efc78c034303275092))
* **router:** move page transition to outlet level to prevent layout remount ([c531d41](https://github.com/mitambuch/steaksoap/commit/c531d41683308f834253f0a8950a41a6c2eeb587))
* **seo:** use pathname for canonical url instead of hardcoded base ([7e32b6d](https://github.com/mitambuch/steaksoap/commit/7e32b6da172eaea531f00334570ef8a91b99c516))
* **ui:** dark overlay background, dark text on accent buttons ([c4dc18a](https://github.com/mitambuch/steaksoap/commit/c4dc18a4f2c280b0074dcc8f09df52b2e57ea7cb)), closes [#0a0a0a](https://github.com/mitambuch/steaksoap/issues/0a0a0a) [#0a0a0a](https://github.com/mitambuch/steaksoap/issues/0a0a0a) [#b0b0a8](https://github.com/mitambuch/steaksoap/issues/b0b0a8)

## [2.0.2](https://github.com/mitambuch/steaksoap/compare/v2.0.1...v2.0.2) (2026-02-23)

### 🐛 Bug Fixes

* **a11y:** document aria decisions for badge and card components ([1d813aa](https://github.com/mitambuch/steaksoap/commit/1d813aa3a2a470576316a2cf4c5a599e7377a70a))
* **docs:** correct og-image extension in architecture.md ([ee0a2b1](https://github.com/mitambuch/steaksoap/commit/ee0a2b1a62863217416952f432e2c3d89b4b33a1))
* **docs:** update changelog links from starter to steaksoap ([ef76f03](https://github.com/mitambuch/steaksoap/commit/ef76f036414786756d81d7e39e63285b688e59d8))
* **fonts:** load jetbrains mono from google fonts ([ed11c08](https://github.com/mitambuch/steaksoap/commit/ed11c08546354506b5c849af14ef2beb5791bc93))
* **particles:** support devicepixelratio for sharp retina rendering ([af11a0b](https://github.com/mitambuch/steaksoap/commit/af11a0b56dd4340922bd2716ce9ebe62b3472e05))
* **plugin:** sync version in plugin.json with package.json ([fba85de](https://github.com/mitambuch/steaksoap/commit/fba85de3c9e4d4ec099f336c7781698a354574eb))
* **scripts:** replace grep with node-native scan for windows compatibility ([07257f6](https://github.com/mitambuch/steaksoap/commit/07257f6ba166e49f7ff468636842f9f90d6d791e))
* **seo:** remove placeholder robots.txt, let vite-plugin-sitemap generate it ([58fcc01](https://github.com/mitambuch/steaksoap/commit/58fcc018a4964a6cc13eddc10f60c747febd094e))
* **toast:** replace tailwindcss-animate classes with custom css animation ([f697ad9](https://github.com/mitambuch/steaksoap/commit/f697ad9bcfcfaec84ac9d9afb21cbf456b693611))

### ♻️  Refactoring

* **imports:** replace deep relative imports with path aliases ([b13ec99](https://github.com/mitambuch/steaksoap/commit/b13ec9954ecf639c89ae64adfe2aa44e4d7c51dc))

### 📚 Documentation

* **fonts:** clarify fonts.css is a placeholder template ([3a389cf](https://github.com/mitambuch/steaksoap/commit/3a389cf47adceec23730c54091a36b0accf26156))

## [2.0.1](https://github.com/mitambuch/steaksoap/compare/v2.0.0...v2.0.1) (2026-02-23)

### 🐛 Bug Fixes

* **config:** create missing src/types dir for path alias ([041aed7](https://github.com/mitambuch/steaksoap/commit/041aed7771e14af2cb7cb4735bf049bcea287d6b))
* **docs:** replace dangerous vite api key example with safe alternative ([c36b40c](https://github.com/mitambuch/steaksoap/commit/c36b40c7a05a10707fbc053b16ffbf9d8b8dc844))
* **header:** replace anchor tags with router link for internal nav ([f2d8980](https://github.com/mitambuch/steaksoap/commit/f2d89804cfddd57dc8b11739e47d777f690ce7ee))
* **plugin:** update command and rule counts in plugin.json ([c40bced](https://github.com/mitambuch/steaksoap/commit/c40bced13c2e8b0678eea882b1b0dc18692003b6))
* **theme:** protect localstorage access for safari private mode ([16a4ca4](https://github.com/mitambuch/steaksoap/commit/16a4ca480b4ce63042875a78672b9b33f8567d07))

### 🔧 Chores

* **ci:** add dependabot for automated dependency updates ([8f55246](https://github.com/mitambuch/steaksoap/commit/8f55246eed6ff3df2aed868da361530f936163e8))
* **deps:** remove dependabot config ([004cd78](https://github.com/mitambuch/steaksoap/commit/004cd78742b3a83166e684ba2e60b65622da3c64))

## [2.0.0](https://github.com/mitambuch/steaksoap/compare/v1.9.0...v2.0.0) (2026-02-22)

### ✨ Features

* **ui:** link version badge to github releases ([9f5b183](https://github.com/mitambuch/steaksoap/commit/9f5b1838cf74356bbb6fc1c2fa9261191248b033))

## [1.9.0](https://github.com/mitambuch/steaksoap/compare/v1.8.0...v1.9.0) (2026-02-22)

### ✨ Features

* **commands:** /discover now searches mcp servers alongside extensions ([f952b84](https://github.com/mitambuch/steaksoap/commit/f952b840f538874b80d49bc26a5146065f696d4e))
* **commands:** add /connect to install mcp servers from registry ([dc65708](https://github.com/mitambuch/steaksoap/commit/dc65708df8e8a4fbf7db558a06dee94152a33a7b))
* **home:** add mcp mention and sync counts (22 commands, 12 rules) ([5dd9ef1](https://github.com/mitambuch/steaksoap/commit/5dd9ef10d9fae93a55d72e3414314ab4a1ab3bc7))
* **registry:** add mcp servers catalog with 9 verified servers ([0808844](https://github.com/mitambuch/steaksoap/commit/08088447942150e57b64a14aceb0ec9f3104d949))
* **rules:** add mcp awareness for smart tool suggestions ([a2d1829](https://github.com/mitambuch/steaksoap/commit/a2d1829397ae69a65e9724beaaecd5eac76ab7a1))

### 📚 Documentation

* **commands:** add /connect and update /discover with mcp support ([7643a9a](https://github.com/mitambuch/steaksoap/commit/7643a9a17e0a152509e7186e85e71644d51250b5))
* **decisions:** document mcp awareness feature ([18d6d94](https://github.com/mitambuch/steaksoap/commit/18d6d945dd435b19665c6936171f4c19789b32c1))

## [1.8.0](https://github.com/mitambuch/steaksoap/compare/v1.7.0...v1.8.0) (2026-02-22)

### ✨ Features

* **home:** redesign landing page with brutaliste swiss aesthetic ([2f7101e](https://github.com/mitambuch/steaksoap/commit/2f7101e3092138e1ced66b85a7a6db739a2caef1))
* **ui:** custom select dropdown, replace native select ([2cec605](https://github.com/mitambuch/steaksoap/commit/2cec6053e7579e3ba144abfa1c6ece92d6a7bd46))
* **ui:** floating bar nav, coral accent, neutral light mode ([10cb3e9](https://github.com/mitambuch/steaksoap/commit/10cb3e9c59ce79eb3b8f86f962a4435eba569c34)), closes [#D4FF00](https://github.com/mitambuch/steaksoap/issues/D4FF00) [#FF6B6B](https://github.com/mitambuch/steaksoap/issues/FF6B6B) [#DC2626](https://github.com/mitambuch/steaksoap/issues/DC2626) [#B91C1C](https://github.com/mitambuch/steaksoap/issues/B91C1C) [#B8B8B8](https://github.com/mitambuch/steaksoap/issues/B8B8B8)
* **ui:** polish form fields and buttons hover states ([713304e](https://github.com/mitambuch/steaksoap/commit/713304e58e5b065b38061e011dc81d7018a80ccc))
* **ui:** unified nav, tokens, devkit copy, cursor fix ([36b769f](https://github.com/mitambuch/steaksoap/commit/36b769f8ddfe91260ad4e5e6c81c74d38a9bc69f))

### 🐛 Bug Fixes

* **rules:** enforce workflow compliance — ai must always follow rules ([9efb6fb](https://github.com/mitambuch/steaksoap/commit/9efb6fbb296ce3224a4b4f895e61c7e1a2882fd0))
* **tokens:** replace old neon lime gradient with coral in 404 page ([af1c58c](https://github.com/mitambuch/steaksoap/commit/af1c58c27775907a994327e388395a88f7e6ccf2))
* **ui:** replace white page loader with themed transition ([575482b](https://github.com/mitambuch/steaksoap/commit/575482b2df309f90138f6eee6bb8a3968f9862f0))

### ♻️  Refactoring

* **commands:** /fix now delegates to debugger agent instead of duplicating it ([11047b0](https://github.com/mitambuch/steaksoap/commit/11047b0e58befa0b17b17cbc331c1878a2a057dc))
* **commands:** merge /audit into /lighthouse, remove duplicate ([e22fff6](https://github.com/mitambuch/steaksoap/commit/e22fff622f7666cfbc53cd89a5708b36e4ebee51))
* **scripts:** centralize path constants in scripts/utils/paths.js ([9907f94](https://github.com/mitambuch/steaksoap/commit/9907f947aaa84996d130f74d6c791119f808fb6e))
* **ui:** rework components for classe2 aesthetic ([31886c4](https://github.com/mitambuch/steaksoap/commit/31886c4902d294206cfb4100ea6acf735317c6e3))
* **ui:** unified header, single nav for all pages, accent cleanup ([5c80859](https://github.com/mitambuch/steaksoap/commit/5c8085975019680e9ab913d40daef6ba90955cbe))

### 📚 Documentation

* **decisions:** document architecture decisions from patches 3a-ui ([2af0212](https://github.com/mitambuch/steaksoap/commit/2af0212d737b8b4f1e7e55ad5941f4e61f8de15c))
* **design:** update tokens with new colors and status palette ([31f3c84](https://github.com/mitambuch/steaksoap/commit/31f3c846a9d2e8306c7ad8982a58db63ad647f7f))
* **readme:** sync counts and paths with actual repo state ([4033a36](https://github.com/mitambuch/steaksoap/commit/4033a368b9ec6b05773e85ec64f9114d6757baab))

### 🔧 Chores

* **types:** remove empty types/index.ts ([7b55a04](https://github.com/mitambuch/steaksoap/commit/7b55a0449906e9a869c236dabaad8d316eaa1bf4))
* **ui:** save in-progress work before branch switch ([9ff8079](https://github.com/mitambuch/steaksoap/commit/9ff807957a8a0a87a27577212cee732a94fed91b))

### ✅ Tests

* **components:** add missing tests for cursorglow, home, notfound, playground ([99923f3](https://github.com/mitambuch/steaksoap/commit/99923f32324864d416e01e2aa9b85b685f3f2123))

## [1.7.0](https://github.com/mitambuch/steaksoap/compare/v1.6.2...v1.7.0) (2026-02-22)

### ✨ Features

* **ui:** redesign home page with brutaliste swiss aesthetic ([8ea520c](https://github.com/mitambuch/steaksoap/commit/8ea520c071841cd69d0eda6c028c80e7085d8ebd))

## [1.6.2](https://github.com/mitambuch/steaksoap/compare/v1.6.1...v1.6.2) (2026-02-22)

### ✨ Features

* **deps:** add lucide-react as default icon library ([21c3205](https://github.com/mitambuch/steaksoap/commit/21c32053d8830bc08747a74ff78db49efa5b0b31))
* **registry:** add 6 extensions (forms, dates, analytics, seo) ([73a0770](https://github.com/mitambuch/steaksoap/commit/73a0770528a0ce46e7588a7caafee758021de3b1))
* **ui:** integrate lucide icons into toast, template, and playground ([0b14dd0](https://github.com/mitambuch/steaksoap/commit/0b14dd0945f4e7240678e7b1d37bde0d095d21d0))

### 📚 Documentation

* **deps:** sync dependencies.md with new deps and registry count ([29c003d](https://github.com/mitambuch/steaksoap/commit/29c003d26a94957c88e19849707c91e10f195fc4))

## [1.6.1](https://github.com/mitambuch/steaksoap/compare/v1.6.0...v1.6.1) (2026-02-22)

### ✨ Features

* **rules:** add trust mode for autonomous execution ([0859329](https://github.com/mitambuch/steaksoap/commit/0859329b916d4d37f091e160946db57681e4045c))

## [1.6.0](https://github.com/mitambuch/steaksoap/compare/v1.5.1...v1.6.0) (2026-02-22)

### ✨ Features

* **agents:** add mobile-first mandate and component awareness to designer ([a2e9659](https://github.com/mitambuch/steaksoap/commit/a2e96599c169dab5fab974aa8d3e4d436be041dc))
* **commands:** add /changelog-client for human-readable client updates ([dec3513](https://github.com/mitambuch/steaksoap/commit/dec35134447be7bbfe2d5bd90ecb995bb37a36ae))
* **commands:** add /lighthouse for quality audit with responsive check ([c30bd50](https://github.com/mitambuch/steaksoap/commit/c30bd5057b952cb599b1cefe0735cb8499900565))
* **commands:** rewrite /migrate as guided multi-phase migration experience ([d83980b](https://github.com/mitambuch/steaksoap/commit/d83980be301fb782d9d0ac6f0e1ebec878b81f5e))
* **dx:** add robots.txt and postinstall setup reminder ([5dc9096](https://github.com/mitambuch/steaksoap/commit/5dc90968768495c3db67c4a7739c4fc16b7b7622))
* **rules:** add performance.md for optimization guidance ([bf2fe34](https://github.com/mitambuch/steaksoap/commit/bf2fe34a308b8c08e0aa5b60142962c1338ff60b))
* **rules:** add responsive requirements to components rule ([930b375](https://github.com/mitambuch/steaksoap/commit/930b375f5ed70bc7933bffe2e159dbaeb77e33c4))
* **rules:** add responsive.md with dual-variant thinking and mobile fallbacks ([3df2f1f](https://github.com/mitambuch/steaksoap/commit/3df2f1f9038e4fc6a321f814cf8b4121bc69bd92))
* **rules:** add smart model switching for credit optimization ([5116bae](https://github.com/mitambuch/steaksoap/commit/5116bae9dfef39240751f185c3db44d087966eb6))

## [1.5.1](https://github.com/mitambuch/steaksoap/compare/v1.5.0...v1.5.1) (2026-02-22)

### ✨ Features

* **commands:** add /migrate for structured project migration ([39ab977](https://github.com/mitambuch/steaksoap/commit/39ab97799f2c4f9732d27faef8533ec451f16bc4))
* **hooks:** add usemediaquery, usecopytoclipboard, usedebounce ([5e98097](https://github.com/mitambuch/steaksoap/commit/5e98097f16a1dcc531b0cdfa0fe5e8d5795cb463))
* **playground:** add toast, tabs, and spinner demos ([855471c](https://github.com/mitambuch/steaksoap/commit/855471c1ae2de3b9bad0d7a6ff222a0478052da3))
* **rules:** add // why: comment convention for non-obvious decisions ([0e7ddd0](https://github.com/mitambuch/steaksoap/commit/0e7ddd08eafaa78893aa0506fe569bfbe3789d0e))
* **rules:** add plain english component headers for human readability ([33b5777](https://github.com/mitambuch/steaksoap/commit/33b57774dded3a2c3cb8d86a1387a96ce10a4264))
* **rules:** enforce identical accent color across dark and light mode ([f3517de](https://github.com/mitambuch/steaksoap/commit/f3517de2d20777c11c1e137bfcbe005342ef73e1))
* **ui:** add accessible tabs component with keyboard navigation ([2fbb265](https://github.com/mitambuch/steaksoap/commit/2fbb2653478400365d2e5095fb190a15367add35))
* **ui:** add spinner component and integrate with button isloading ([14a274f](https://github.com/mitambuch/steaksoap/commit/14a274f6567405f52fa51f5e6b180b32824ade18))
* **ui:** add toast notification system with usetoast hook ([3f0cb94](https://github.com/mitambuch/steaksoap/commit/3f0cb94fc1a1b92996ecbd33e5d35a57ab1dc19c))

### 🐛 Bug Fixes

* **plugin:** sync plugin version with package.json ([4f3e739](https://github.com/mitambuch/steaksoap/commit/4f3e739a4c3d155146735e116bb0df823f47cc03))
* **theme:** darken light mode background from near-white to warm gray ([ce74976](https://github.com/mitambuch/steaksoap/commit/ce749768846200f1fbc5b927aa24b2f8f8a1cd78)), closes [#f4f4f0](https://github.com/mitambuch/steaksoap/issues/f4f4f0) [#e8e8e4](https://github.com/mitambuch/steaksoap/issues/e8e8e4) [#deded8](https://github.com/mitambuch/steaksoap/issues/deded8) [#c8c8c2](https://github.com/mitambuch/steaksoap/issues/c8c8c2)
* **tokens:** darker warm gray for light mode background ([dc8c8f0](https://github.com/mitambuch/steaksoap/commit/dc8c8f0137f5135eb5e4ed46770eed2f860d22dd)), closes [#e8e8e4](https://github.com/mitambuch/steaksoap/issues/e8e8e4) [#d8d8d0](https://github.com/mitambuch/steaksoap/issues/d8d8d0) [#c8c8c0](https://github.com/mitambuch/steaksoap/issues/c8c8c0) [#b8b8b0](https://github.com/mitambuch/steaksoap/issues/b8b8b0)
* **tokens:** replace raw white values with design system tokens ([30ad658](https://github.com/mitambuch/steaksoap/commit/30ad658e1589774fb8b2e3388ed4debd89e663df))

### 📚 Documentation

* **deps:** rewrite dependencies.md as complete project registry ([fb913fe](https://github.com/mitambuch/steaksoap/commit/fb913fe7bc933bd036c84f12018b5a202ef5e6df))
* **onboarding:** add handoff.md for developer onboarding without ai context ([91c9fcb](https://github.com/mitambuch/steaksoap/commit/91c9fcbeb1c8ec886c91cf00ea6cf2caed0ad120))
* **readme:** sharpen positioning and update component counts ([7ebe59f](https://github.com/mitambuch/steaksoap/commit/7ebe59f668e20b546de299c00903a2a6e58405c4))

### ✅ Tests

* **components:** add missing tests for footer, seohead, errorboundary ([9aa0700](https://github.com/mitambuch/steaksoap/commit/9aa07002a3d3f5eab175ea0165b2e1cbe81f02cf))

## [1.5.0](https://github.com/mitambuch/steaksoap/compare/v1.4.0...v1.5.0) (2026-02-22)

### ✨ Features

* **agents:** update designer with classe2 style dna ([788f14c](https://github.com/mitambuch/steaksoap/commit/788f14c06d7afdabe014b49212c3cbfce297c90d))
* **badge:** classe2-style tags with accent default and outline variant ([78b93cf](https://github.com/mitambuch/steaksoap/commit/78b93cf3cfd6bc1a068db16773d215c80f3bcffc))
* **button:** capsule style with backdrop-blur and icon size ([6f8503f](https://github.com/mitambuch/steaksoap/commit/6f8503f4ea285f3ccb738d1212825f244845ea74))
* **card:** smooth transitions and optional hover scale ([2e48eb8](https://github.com/mitambuch/steaksoap/commit/2e48eb81e91db1f98e75288a4402900b0cfb50e9))
* **commands:** add /spec command for plan-before-code workflow ([a880fe2](https://github.com/mitambuch/steaksoap/commit/a880fe2bee1746dd50c4312eac48cf59db4b569d))
* **context:** add visual identity decisions to decisions.md ([9b65abe](https://github.com/mitambuch/steaksoap/commit/9b65abe96217c5bf46b5324d1373b6bae4eef055))
* **fonts:** add space grotesk as default sans-serif ([63eca0b](https://github.com/mitambuch/steaksoap/commit/63eca0b68a86af035c99388cac2ddbe05b8712cb))
* **playground:** devkit-style component showcase at /playground ([38cca2c](https://github.com/mitambuch/steaksoap/commit/38cca2cf3833caccc76d53a877687393a8d14d96))
* **rules:** add extension registry check to proactive guidance ([b0155c4](https://github.com/mitambuch/steaksoap/commit/b0155c4ea3b8ddd09d0b818703de67dfa71d7ca8))
* **template:** rich post-setup landing page with hero and features ([02c0e56](https://github.com/mitambuch/steaksoap/commit/02c0e560bafd8cf6958e21fd3eab520d9b3eef92))
* **tokens:** align design tokens with classe2 visual identity ([55c64ee](https://github.com/mitambuch/steaksoap/commit/55c64ee8094ba445e967c290a18184ce90be5a51)), closes [#e0e0e0](https://github.com/mitambuch/steaksoap/issues/e0e0e0) [#f0f0f0](https://github.com/mitambuch/steaksoap/issues/f0f0f0) [#fafafa](https://github.com/mitambuch/steaksoap/issues/fafafa) [#f4f4f0](https://github.com/mitambuch/steaksoap/issues/f4f4f0) [#4d7c0f](https://github.com/mitambuch/steaksoap/issues/4d7c0f) [#d4ff00](https://github.com/mitambuch/steaksoap/issues/d4ff00)
* **transitions:** add slow cinematic transitions for theme switch ([add7d61](https://github.com/mitambuch/steaksoap/commit/add7d615e10cf13e1b1f2b82eb8d91f024b6aa9e))

### 🐛 Bug Fixes

* **setup:** auto-install dependencies before setup ([be61705](https://github.com/mitambuch/steaksoap/commit/be61705ab07cd9da13024359e946947c40a93d56))

### 📚 Documentation

* **commands:** add usage examples for all command sections ([5463697](https://github.com/mitambuch/steaksoap/commit/5463697a6b08b6bdb01ec2d53d4405fb4d50d3f1))
* **design:** add design_system.md with visual reference ([8587928](https://github.com/mitambuch/steaksoap/commit/8587928667118a62673bcb842624891311717e5b))

## [1.4.0](https://github.com/mitambuch/steaksoap/compare/v1.3.0...v1.4.0) (2026-02-22)

### ✨ Features

* **dx:** add pnpm doctor for environment health check ([c6a76d6](https://github.com/mitambuch/steaksoap/commit/c6a76d62ca9f896016909b1cdfc95b70ca05f2be))
* **dx:** add pnpm done for structural coherence check ([7798966](https://github.com/mitambuch/steaksoap/commit/7798966799170cf34a0d2171f3d71dc70ac54f54))

## [1.3.0](https://github.com/mitambuch/steaksoap/compare/v1.2.0...v1.3.0) (2026-02-21)

### ✨ Features

* **commands:** add /discover command for extension discovery ([e8cae88](https://github.com/mitambuch/steaksoap/commit/e8cae88f83dea4e45ab14a2afdba4e1fe23860f1))
* **commands:** add /install-extension for direct extension installation ([3c9cde3](https://github.com/mitambuch/steaksoap/commit/3c9cde35f5ce8c677741bb0d15b6390a2bac0b9a))
* **plugin:** make steaksoap installable as claude code plugin ([ab546c0](https://github.com/mitambuch/steaksoap/commit/ab546c0f9c14f2be99918e5095c318e9e6f6b43c))
* **registry:** add curated extension registry with 12 extensions ([4804a61](https://github.com/mitambuch/steaksoap/commit/4804a617a41c57ae895583326d0074e9ba056e86))
* **rules:** add auto-invoked rule for extension discovery ([1fbfc85](https://github.com/mitambuch/steaksoap/commit/1fbfc8578551801f37286f5198da1821ba630440))

### 📚 Documentation

* **extensions:** add extension discovery recipe and plugin installation guide ([4896c33](https://github.com/mitambuch/steaksoap/commit/4896c337b8f28c2e332fe390b59316a2f8c0e285))

## [1.2.0](https://github.com/mitambuch/steaksoap/compare/v1.1.0...v1.2.0) (2026-02-21)

### ✨ Features

* **agents:** add 4 specialized ai sub-agents ([3846c87](https://github.com/mitambuch/steaksoap/commit/3846c874686418cb44ecfa4854d620bf205cabf4))
* **commands:** add /refactor command for rule-aligned code cleanup ([309dfdf](https://github.com/mitambuch/steaksoap/commit/309dfdf8f02234eb78eca0909f41b33e98b1b9a1))
* **commands:** add 13 new ai slash commands (15 total) ([cd4c5ab](https://github.com/mitambuch/steaksoap/commit/cd4c5ab13f267e2904fba864e196ae51d3ead5dc))
* **context:** add decisions.md for architectural decision tracking ([f447bcd](https://github.com/mitambuch/steaksoap/commit/f447bcdd733f1cc74872b7713c855f3238a518dd))
* **pages:** add component showcase page at /showcase ([fc7b47a](https://github.com/mitambuch/steaksoap/commit/fc7b47adcd2591368ccef0eaaafceedbc1f3f3be))
* **rules:** add api.md rule for data fetching patterns ([6e1746a](https://github.com/mitambuch/steaksoap/commit/6e1746ac8b34cebe28748f5c4060c87b7b65e30c))
* **setup:** add 'Keep Playground?' option to project initialization wizard ([08cd55c](https://github.com/mitambuch/steaksoap/commit/08cd55cc5315f7b5fab829d89e619b171fbbd5e7))
* **theme:** add dark/light mode with theme system ([85cb540](https://github.com/mitambuch/steaksoap/commit/85cb540d0a05796864b562fa0971f53659e71438))
* **ui:** add base ui component library ([de05402](https://github.com/mitambuch/steaksoap/commit/de05402cab5c30c0f37e16d8a1b627d330e337b0))

### 🐛 Bug Fixes

* **a11y:** accessibility improvements and axe-core tests ([9c12be5](https://github.com/mitambuch/steaksoap/commit/9c12be53697306cca95c21bf9362b72d6664afa5))
* **core:** consolidation pass from dual-ai audit ([012d5ee](https://github.com/mitambuch/steaksoap/commit/012d5eee875759dff58ec5e56766367551cadb7c))
* **core:** critical bugfixes and rename to steaksoap ([5681db3](https://github.com/mitambuch/steaksoap/commit/5681db3096c1237a8e4dedcdf3e4c9995c24973b))
* **layout:** enable header with navigation and theme toggle ([f72fd10](https://github.com/mitambuch/steaksoap/commit/f72fd10c05bb27d8bd08cfe15aacad3adb734ee5))

### ♻️  Refactoring

* **rules:** split claude.md into modular rules system ([fc920c4](https://github.com/mitambuch/steaksoap/commit/fc920c49adf9b0edd21b1cb1a3b3b67d80e9cc1b))

### 📚 Documentation

* **positioning:** rebrand as ai-first starter kit ([fc0aedb](https://github.com/mitambuch/steaksoap/commit/fc0aedbde96ff0bb86fa124747f49427fabfde54))
* **recipes:** add recipes, commands, agents, and template guide ([abc8f5d](https://github.com/mitambuch/steaksoap/commit/abc8f5d89881cef9d38ab123226508ce4c2accba))

### 🔧 Chores

* **ci:** add bundle check, auto-label, stale bot, devcontainer ([3e79ca0](https://github.com/mitambuch/steaksoap/commit/3e79ca03b11cf9779a6706b747999b9b2f9cbc1d))
* **release:** v1.1.0 ([b945e8d](https://github.com/mitambuch/steaksoap/commit/b945e8dc2f411ecd410b01bc35bcf1318a588a71))

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

## [1.1.0](https://github.com/mitambuch/steaksoap/compare/v1.0.0...v1.1.0) (2026-02-21)

### ✨ Features

* **ai:** add multi-ai workflow support and slash commands ([6ee42e4](https://github.com/mitambuch/steaksoap/commit/6ee42e47b067d6086827e28d95ee9662a20e855f))
* **deploy:** add deploy buttons, netlify config, and rewrite readme ([3b85dec](https://github.com/mitambuch/steaksoap/commit/3b85decb768d7af00c49889af0b2a0d61f8f29ee))
* **setup:** unified interactive wizard with 3 modes ([fb30f96](https://github.com/mitambuch/steaksoap/commit/fb30f96f12b881fc178ba8ccf034e470d795ce29))

### ♻️  Refactoring

* **core:** make all env vars optional and remove dead code ([49475e3](https://github.com/mitambuch/steaksoap/commit/49475e3a7d1c89c27b11e6b880926e3d31604981))

### 📚 Documentation

* **open-source:** add dependabot, update contributing and setup guide ([ed433e2](https://github.com/mitambuch/steaksoap/commit/ed433e2dd331a3df8d5f73d1375bec8b3f0da383))

### ✅ Tests

* **env:** add env fallback tests and fix empty string handling ([9e4efa3](https://github.com/mitambuch/steaksoap/commit/9e4efa3d901a831f1bbbb731cafa6e0951c748f4))

## [1.0.0](https://github.com/mitambuch/steaksoap/compare/v0.7.0...v1.0.0) (2026-02-21)

### ♻️  Refactoring

* **init:** enhance cli with auto-detect, cleanup, and welcome message ([16cd896](https://github.com/mitambuch/steaksoap/commit/16cd896f65bfb1df2685c09d334df4707670c217))

### 🔧 Chores

* **ci:** add node 22 to test matrix ([4ed3cf4](https://github.com/mitambuch/steaksoap/commit/4ed3cf40752f407020fe63636920ddde6cfee290))
* **cleanup:** replace todo with informational comment ([aaebe99](https://github.com/mitambuch/steaksoap/commit/aaebe994278e8c701a628c34b9d140e917155b5b))
* **env:** translate .env.example comment to english ([93cc5ae](https://github.com/mitambuch/steaksoap/commit/93cc5aec218f40112bdcacb60fb65a139e25abb8))
* **pkg:** add open-source metadata to package.json ([df3356f](https://github.com/mitambuch/steaksoap/commit/df3356fe2dc00dd9428f551eb91d18a773bc821a))

## [0.7.0](https://github.com/mitambuch/steaksoap/compare/v0.6.1...v0.7.0) (2026-02-21)

### ✨ Features

* **data:** add showcase landing page content ([e2211af](https://github.com/mitambuch/steaksoap/commit/e2211afca6a1672cb0307231fd9937a2c0163158))
* **home:** add showcase sections below hero ([fbb0f4e](https://github.com/mitambuch/steaksoap/commit/fbb0f4e91d96597d66209c66c8b4323f32f2129c))
* **hooks:** add scroll-triggered animation hook ([ef552f3](https://github.com/mitambuch/steaksoap/commit/ef552f3c219318b3f4ec583503a127bb9bd433cc))
* **layout:** add site-wide footer with version and credits ([9126a60](https://github.com/mitambuch/steaksoap/commit/9126a6009778d2cac94fcc041f6689e1f10db97c))
* **ui:** add section, feature card, code block, tech badge components ([acb733b](https://github.com/mitambuch/steaksoap/commit/acb733b51d15607bed401744d2bd3e95386a38ff))

### 🐛 Bug Fixes

* **styles:** scope cursor-hidden to hero section only ([e598b2a](https://github.com/mitambuch/steaksoap/commit/e598b2a38653ab2db7b609c5300f62b70a1f51c9))

## [0.6.1](https://github.com/mitambuch/steaksoap/compare/v0.6.0...v0.6.1) (2026-02-21)

### 📚 Documentation

* **claude:** switch from mandatory release to batch release strategy ([2e4ed6b](https://github.com/mitambuch/steaksoap/commit/2e4ed6b1d63e71338bbd6f395bcaa8f07fc5e619))
* **community:** add governance files and improve github templates ([b0e77f9](https://github.com/mitambuch/steaksoap/commit/b0e77f9b8299258220db756679dc2983fcab10e8))
* **i18n:** translate all documentation and code to english ([130c894](https://github.com/mitambuch/steaksoap/commit/130c89456c7868e6e24b33ac6b6de24b0b57b385))

### 🔧 Chores

* **release:** consolidate 20 releases into 6 logical batches ([c6cb63b](https://github.com/mitambuch/steaksoap/commit/c6cb63b5b41b8ecc24ed29b993031be205d209ee))

## [0.6.0](https://github.com/mitambuch/steaksoap/compare/v0.5.0...v0.6.0) (2026-02-21)

### ✨ Features

* **home:** redesign landing page with typewriter, grain, and custom cursor ([ba09524](https://github.com/mitambuch/steaksoap/commit/ba09524))

### 📖 Docs

* **claude:** switch from mandatory release to batch release strategy ([2e4ed6b](https://github.com/mitambuch/steaksoap/commit/2e4ed6b))

## [0.5.0](https://github.com/mitambuch/steaksoap/compare/v0.4.0...v0.5.0) (2026-02-20)

### ✨ Features

* **lint:** enable type-aware eslint rules ([9ef66ff](https://github.com/mitambuch/steaksoap/commit/9ef66ff))

### 🐛 Bug Fixes

* **a11y:** respect prefers-reduced-motion for smooth scroll ([713b08d](https://github.com/mitambuch/steaksoap/commit/713b08d))
* **config:** use esm-safe __dirname in vite config ([8e26ff2](https://github.com/mitambuch/steaksoap/commit/8e26ff2))
* **config:** use loadenv for reliable env access in vite config ([803b942](https://github.com/mitambuch/steaksoap/commit/803b942))
* **lint:** extend node globals to scripts directory ([375dce2](https://github.com/mitambuch/steaksoap/commit/375dce2))
* **lint:** use esm-safe dirname for node 20 compat ([5f79ec0](https://github.com/mitambuch/steaksoap/commit/5f79ec0))

### 📚 Documentation

* **claude:** clarify spa seo limitations ([30491b6](https://github.com/mitambuch/steaksoap/commit/30491b6))
* **readme:** sync docs with current stack and config ([a460e1c](https://github.com/mitambuch/steaksoap/commit/a460e1c))

## [0.4.0](https://github.com/mitambuch/steaksoap/compare/v0.3.0...v0.4.0) (2026-02-20)

### ✨ Features

* **dx:** upgrade tailwind v4, add vercel config, add feature example ([1b44fc1](https://github.com/mitambuch/steaksoap/commit/1b44fc1))

### 🐛 Bug Fixes

* **release:** clean changelog header from v0.4.0 release ([306cc07](https://github.com/mitambuch/steaksoap/commit/306cc07))
* **release:** re-stage changelog after dedup to include fix in commit ([7852c1c](https://github.com/mitambuch/steaksoap/commit/7852c1c))

### 🔧 Chores

* **docs:** sync docs with tailwind v4 and migrate animations to @utility ([d5bc4ee](https://github.com/mitambuch/steaksoap/commit/d5bc4ee))
* **dx:** improve testing, formatting, and project config ([716cce8](https://github.com/mitambuch/steaksoap/commit/716cce8))
* **dx:** remove double tsc, fix eslint flags, add engines ([06bcf5b](https://github.com/mitambuch/steaksoap/commit/06bcf5b))

## [0.3.0](https://github.com/mitambuch/steaksoap/compare/v0.2.0...v0.3.0) (2026-02-20)

### ✨ Features

* **seo:** add automatic sitemap + robots.txt generation ([bf5c518](https://github.com/mitambuch/steaksoap/commit/bf5c518))

### 🐛 Bug Fixes

* **dx:** graceful env fallback in dev and update readme ([9b6422d](https://github.com/mitambuch/steaksoap/commit/9b6422d))
* **release:** show all commit types in changelog and github releases ([907db57](https://github.com/mitambuch/steaksoap/commit/907db57))
* **docs:** complete changelog with all commits since v0.1.0 ([9c38c80](https://github.com/mitambuch/steaksoap/commit/9c38c80))
* **release:** prevent duplicate header in changelog ([dc12260](https://github.com/mitambuch/steaksoap/commit/dc12260))
* **release:** add post-bump script to deduplicate changelog header ([e7cc3e3](https://github.com/mitambuch/steaksoap/commit/e7cc3e3))
* **release:** fix changelog header deduplication ([2fee06b](https://github.com/mitambuch/steaksoap/commit/2fee06b))
* **release:** move changelog fix to before:release hook ([bc3f332](https://github.com/mitambuch/steaksoap/commit/bc3f332))

### 🔧 Chores

* **dx:** final polish — tailwind sorting, responsive pages, mobile-first rules ([6c87015](https://github.com/mitambuch/steaksoap/commit/6c87015))
* **init:** reset changelog on new project + enforce pnpm ([b632fca](https://github.com/mitambuch/steaksoap/commit/b632fca))

### 📚 Documentation

* **claude:** enforce mandatory release after every session ([9736f4d](https://github.com/mitambuch/steaksoap/commit/9736f4d))
* **claude:** add standard workflow and simplify instructions ([2af8d30](https://github.com/mitambuch/steaksoap/commit/2af8d30))

## [0.2.0](https://github.com/mitambuch/steaksoap/compare/v0.1.0...v0.2.0) (2026-02-20)

### ✨ Features

* **ci:** add github actions workflow for lint, typecheck, and build ([fa402ba](https://github.com/mitambuch/steaksoap/commit/fa402ba))
* **components:** add error boundary and wrap app ([a8209ad](https://github.com/mitambuch/steaksoap/commit/a8209ad))
* **config:** add env validation with clear error messages ([7789c61](https://github.com/mitambuch/steaksoap/commit/7789c61))
* **dx:** add setup and update scripts ([01b3d93](https://github.com/mitambuch/steaksoap/commit/01b3d93))
* **lint:** add eslint-plugin-jsx-a11y for accessibility checks ([90f7266](https://github.com/mitambuch/steaksoap/commit/90f7266))
* **lint:** add eslint-plugin-simple-import-sort ([0b0e4f1](https://github.com/mitambuch/steaksoap/commit/0b0e4f1))
* **seo:** add seohead component and site config ([56b0b98](https://github.com/mitambuch/steaksoap/commit/56b0b98))
* **ui:** add welcome page and init:project script ([c908d5c](https://github.com/mitambuch/steaksoap/commit/c908d5c))

### 🐛 Bug Fixes

* **build:** remove manual chunks causing empty react-vendor warning ([ad265b4](https://github.com/mitambuch/steaksoap/commit/ad265b4))
* **git:** remove .claude/ from repo and add to .gitignore ([ebc3893](https://github.com/mitambuch/steaksoap/commit/ebc3893))
* **release:** make release scripts cross-platform ([3d833b0](https://github.com/mitambuch/steaksoap/commit/3d833b0))
* **seo:** fix placeholders and add canonical url support ([dba4705](https://github.com/mitambuch/steaksoap/commit/dba4705))
* **styles:** use valid easing value in animations.css ([2f5562a](https://github.com/mitambuch/steaksoap/commit/2f5562a))
* **types:** use inline import for react types in common.ts ([c749210](https://github.com/mitambuch/steaksoap/commit/c749210))

### ♻️  Refactoring

* **config:** centralize aliases via vitest mergeconfig ([c216c53](https://github.com/mitambuch/steaksoap/commit/c216c53))

### 🔧 Chores

* **config:** add .prettierignore ([099083d](https://github.com/mitambuch/steaksoap/commit/099083d))
* **github:** add pr template and issue templates ([a621a8d](https://github.com/mitambuch/steaksoap/commit/a621a8d))
* **quality:** harden gitignore, logging, commitlint, and docs ([8bbfe3e](https://github.com/mitambuch/steaksoap/commit/8bbfe3e))
* **repo:** rename project to starter ([7406383](https://github.com/mitambuch/steaksoap/commit/7406383))
* **seo:** add public/robots.txt ([f080c64](https://github.com/mitambuch/steaksoap/commit/f080c64))
* **structure:** add missing folders (hooks, context, data, lib) ([57cc0e9](https://github.com/mitambuch/steaksoap/commit/57cc0e9))
* **test:** add explicit vitest.config.ts with path aliases ([f049433](https://github.com/mitambuch/steaksoap/commit/f049433))
* **vscode:** add versioned editor config with recommended extensions ([2e3e6db](https://github.com/mitambuch/steaksoap/commit/2e3e6db))
* **vscode:** disable editor as commit input ([5d85b0a](https://github.com/mitambuch/steaksoap/commit/5d85b0a))
* add .gitattributes to enforce lf line endings ([ebf8b8e](https://github.com/mitambuch/steaksoap/commit/ebf8b8e))
* create missing directories referenced in readme ([d7a1ff5](https://github.com/mitambuch/steaksoap/commit/d7a1ff5))

### ✅ Tests

* **utils:** add vitest with tests for cn() and cloudinary ([84e5fe7](https://github.com/mitambuch/steaksoap/commit/84e5fe7))

### 📚 Documentation

* **architecture:** add complete folder structure documentation ([7522155](https://github.com/mitambuch/steaksoap/commit/7522155))
* **changelog:** add initial changelog for v0.1.0 ([f7c1fae](https://github.com/mitambuch/steaksoap/commit/f7c1fae))
* **claude:** add release workflow and semver conventions ([6084045](https://github.com/mitambuch/steaksoap/commit/6084045))
* **claude:** document automated git hooks ([3572ebb](https://github.com/mitambuch/steaksoap/commit/3572ebb))
* **claude:** rewrite claude.md with full agency conventions ([af0a537](https://github.com/mitambuch/steaksoap/commit/af0a537))
* **deps:** add dependencies documentation with justifications ([9208a2f](https://github.com/mitambuch/steaksoap/commit/9208a2f))
* **readme:** update git section to match current conventions ([5eb0e13](https://github.com/mitambuch/steaksoap/commit/5eb0e13))
* **setup:** add step-by-step installation guide ([da7a85d](https://github.com/mitambuch/steaksoap/commit/da7a85d))

## [0.1.0](https://github.com/mitambuch/steaksoap/releases/tag/v0.1.0) (2026-02-20)

### Initial Release

First development release — project scaffold.

### 🔧 Chores

* initial project scaffold ([2bf78d4](https://github.com/mitambuch/steaksoap/commit/2bf78d4))
* add src/assets/ directory to match @assets path alias ([0680298](https://github.com/mitambuch/steaksoap/commit/0680298))
* remove empty barrel exports ([ab56bbb](https://github.com/mitambuch/steaksoap/commit/ab56bbb))
* **deps:** add husky, commitlint, lint-staged ([9f82b8e](https://github.com/mitambuch/steaksoap/commit/9f82b8e))
* **deps:** add release-it and conventional-changelog plugin ([a11dc8f](https://github.com/mitambuch/steaksoap/commit/a11dc8f))
* **commitlint:** add commitlint config with conventional commits rules ([03393f0](https://github.com/mitambuch/steaksoap/commit/03393f0))
* **commitlint:** add merge type to allowed list ([a2adb16](https://github.com/mitambuch/steaksoap/commit/a2adb16))
* **husky:** add pre-commit and commit-msg hooks ([964972a](https://github.com/mitambuch/steaksoap/commit/964972a))
* **release:** add release-it config with conventional changelog ([4717cf2](https://github.com/mitambuch/steaksoap/commit/4717cf2))

### ♻️  Refactoring

* **utils:** replace manual cn() with clsx + tailwind-merge ([37c56a3](https://github.com/mitambuch/steaksoap/commit/37c56a3))

### 🎨 Styles

* **css:** remove redundant reset already handled by Tailwind Preflight ([e74222b](https://github.com/mitambuch/steaksoap/commit/e74222b))

### 🐛 Bug Fixes

* **config:** remove unused VITE_CLOUDINARY_BASE_URL from .env.example ([b08e4df](https://github.com/mitambuch/steaksoap/commit/b08e4df))

> Pre-1.0 — development phase, nothing is stable yet.
