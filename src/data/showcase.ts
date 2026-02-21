/* ═══════════════════════════════════════════════════════════════
   SHOWCASE DATA — static content for the landing page sections.
   Edit content here, not in component files.
   ═══════════════════════════════════════════════════════════════ */

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface QuickStartStep {
  step: number;
  label: string;
  command: string;
  output?: string;
}

export interface TechItem {
  name: string;
  role: string;
  href: string;
}

export const features: Feature[] = [
  {
    icon: '⚡',
    title: 'Zero config',
    description: 'Clone, install, dev. ESLint, Prettier, Husky, and Vitest are pre-configured.',
  },
  {
    icon: '🤖',
    title: 'AI-ready',
    description: 'CLAUDE.md instructs any AI agent. Vibe code from day one.',
  },
  {
    icon: '🔒',
    title: 'Type-safe',
    description: 'Strict TypeScript. No any. Path aliases everywhere.',
  },
  {
    icon: '🧪',
    title: 'Tested',
    description: 'Vitest + Testing Library. Example tests included as patterns to follow.',
  },
  {
    icon: '📱',
    title: 'Mobile-first',
    description: 'Tailwind CSS 4 with responsive utilities. Every component works on every screen.',
  },
  {
    icon: '🚀',
    title: 'Pro workflow',
    description: 'Conventional commits, automated releases, changelog generation, GitHub Releases.',
  },
];

export const quickStartSteps: QuickStartStep[] = [
  {
    step: 1,
    label: 'Clone the repo',
    command: 'git clone https://github.com/Mircooo/starter.git my-project',
    output: "Cloning into 'my-project'...",
  },
  {
    step: 2,
    label: 'Initialize your project',
    command: 'cd my-project && pnpm install && pnpm setup',
    output: '✓ Dependencies installed\n✓ Project configured',
  },
  {
    step: 3,
    label: 'Start building',
    command: 'pnpm dev',
    output: 'VITE v7 ready in 258ms → http://localhost:5173',
  },
];

export const techStack: TechItem[] = [
  { name: 'React 19', role: 'UI framework', href: 'https://react.dev' },
  {
    name: 'TypeScript',
    role: 'Type safety',
    href: 'https://www.typescriptlang.org',
  },
  { name: 'Vite 7', role: 'Build tool', href: 'https://vitejs.dev' },
  {
    name: 'Tailwind CSS 4',
    role: 'Styling',
    href: 'https://tailwindcss.com',
  },
  { name: 'Vitest', role: 'Testing', href: 'https://vitest.dev' },
  { name: 'ESLint', role: 'Linting', href: 'https://eslint.org' },
  { name: 'Prettier', role: 'Formatting', href: 'https://prettier.io' },
  {
    name: 'Husky',
    role: 'Git hooks',
    href: 'https://typicode.github.io/husky',
  },
  {
    name: 'release-it',
    role: 'Releases',
    href: 'https://github.com/release-it/release-it',
  },
  { name: 'pnpm', role: 'Package manager', href: 'https://pnpm.io' },
];
