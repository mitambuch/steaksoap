/* ═══════════════════════════════════════════════════════════════
   SHOWCASE DATA — static content for the landing page sections.
   Edit content here, not in component files.
   ═══════════════════════════════════════════════════════════════ */

export interface Feature {
  /** Lucide icon name — resolved and rendered in the component */
  iconName: 'Zap' | 'Terminal' | 'Shield' | 'FlaskConical' | 'Smartphone' | 'GitBranch';
  title: string;
  description: string;
}

export interface FeaturedCommand {
  name: string;
  description: string;
}

export interface QuickStartLine {
  prompt: string;
  command: string;
}

export const features: Feature[] = [
  {
    iconName: 'Zap',
    title: 'Zero config',
    description: 'Clone, install, dev. TypeScript, ESLint, Prettier, Vitest — preconfigured.',
  },
  {
    iconName: 'Terminal',
    title: '22 AI commands',
    description: 'Slash commands, 4 agents, 12 contextual rules. Your AI knows your codebase.',
  },
  {
    iconName: 'Shield',
    title: 'Type-safe',
    description: 'Strict TypeScript. No any, no as. Path aliases everywhere.',
  },
  {
    iconName: 'FlaskConical',
    title: 'Tested by default',
    description: 'Vitest + Testing Library + vitest-axe. Every component ships with tests.',
  },
  {
    iconName: 'Smartphone',
    title: 'Mobile-first',
    description: 'Tailwind 4 CSS-native. Responsive rule enforces dual desktop/mobile variants.',
  },
  {
    iconName: 'GitBranch',
    title: 'Pro workflow',
    description: 'Conventional commits, automated releases, changelog generation, CI/CD.',
  },
];

export const featuredCommands: FeaturedCommand[] = [
  {
    name: '/spec',
    description: 'Plan before you code. Structured thinking, not vibe coding chaos.',
  },
  {
    name: '/new-page',
    description: 'Page + route + lazy loading + test. One command, zero config.',
  },
  {
    name: '/review',
    description: 'Senior-level code review. TypeScript, a11y, performance, security.',
  },
  {
    name: '/migrate',
    description: 'Port an existing project. 6-phase guided migration with before/after report.',
  },
  {
    name: '/lighthouse',
    description:
      'Quality audit. Performance, accessibility, SEO, responsive — scored and actionable.',
  },
  {
    name: '/changelog-client',
    description: 'Human-readable updates for your clients. Zero jargon, ready to send.',
  },
];

export const quickStartLines: QuickStartLine[] = [
  { prompt: '$', command: 'git clone https://github.com/mitambuch/steaksoap.git my-project' },
  { prompt: '$', command: 'cd my-project && pnpm install && pnpm setup' },
  { prompt: '$', command: 'pnpm dev' },
];

/* ─── Extensions ──────────────────────────────────────────── */

export interface ExtensionCard {
  name: string;
  category: string;
  url: string;
}

/** Top 12 extensions displayed in the grid */
export const featuredExtensions: ExtensionCard[] = [
  { name: 'Clerk', category: 'Auth', url: 'https://clerk.com' },
  { name: 'Stripe', category: 'Payments', url: 'https://stripe.com' },
  { name: 'Three.js', category: '3D', url: 'https://threejs.org' },
  { name: 'Motion', category: 'Animation', url: 'https://motion.dev' },
  { name: 'TanStack Query', category: 'Data', url: 'https://tanstack.com/query' },
  { name: 'Zustand', category: 'State', url: 'https://zustand.docs.pmnd.rs' },
  { name: 'Zod', category: 'Validation', url: 'https://zod.dev' },
  { name: 'react-i18next', category: 'Intl', url: 'https://react.i18next.com' },
  { name: 'MDX Blog', category: 'Content', url: 'https://mdxjs.com' },
  { name: 'Resend', category: 'Email', url: 'https://resend.com' },
  { name: 'Plausible', category: 'Analytics', url: 'https://plausible.io' },
  { name: 'React Hook Form', category: 'Forms', url: 'https://react-hook-form.com' },
];

/** Remaining extensions listed as text */
export const moreExtensions = [
  'Playwright',
  'Storybook',
  'Umami',
  'OG Images',
  'Structured Data',
  'date-fns',
];
