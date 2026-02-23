/* ═══════════════════════════════════════════════════════════════
   WIZARD SLIDES — data for the guided setup carousel.
   Each slide is ONE screen that fits in the fixed-size modal.
   All content is designed to be read in one glance — no scroll.
   Slides are grouped so the dot indicators stay manageable (9 dots).
   ═══════════════════════════════════════════════════════════════ */

export interface WizardSlide {
  id: string;
  type: 'welcome' | 'intro' | 'action' | 'verify' | 'done';

  /** Which dot group this slide belongs to */
  group: string;

  /** Main heading */
  title: string;
  /** 2-3 sentences max — must fit in one glance. Use \n for visual paragraphs. */
  body: string;

  /** Large emoji for visual slides */
  emoji?: string;

  /** For 'action' slides */
  actionType?: 'link' | 'copy';
  actionLabel?: string;
  actionValue?: string;

  /** Extra tip shown below the action */
  hint?: string;

  /** For 'verify' slides */
  command?: string;
  expected?: string;
  failHint?: string;

  /** Mark optional steps (extras) */
  optional?: boolean;

  /** Fun micro-message on completion */
  celebration?: string;
}

// WHY: isMac is computed once at module level — navigator.platform is static
const isMac = typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('mac');

// WHY: __PLATFORM_SHORTCUT__ is replaced at render time by the component
// This keeps platform logic out of the data layer
export const PLATFORM_SHORTCUT_PLACEHOLDER = '__PLATFORM_SHORTCUT__';

export const wizardSlides: WizardSlide[] = [
  /* ── 0. Welcome ──────────────────────────────────────────── */
  {
    id: 'welcome',
    type: 'welcome',
    group: 'welcome',
    title: '',
    body: '',
  },

  /* ── 1-2. VS Code ────────────────────────────────────────── */
  {
    id: 'vscode-intro',
    type: 'intro',
    group: 'vscode',
    emoji: '\u{1F4BB}',
    title: 'You need a code editor',
    body: "To work on your project, you need an app to see and edit your files. Think of it like Google Docs, but for websites.\n\nWe use VS Code \u2014 it's free, made by Microsoft, and used by almost every developer on earth. There are others (Cursor, Zed, Sublime) but VS Code is the standard.",
  },
  {
    id: 'vscode-install',
    type: 'action',
    group: 'vscode',
    emoji: '\u2B07\uFE0F',
    title: 'Download VS Code',
    body: 'Click the button, download the installer, and run it like any normal app.',
    actionType: 'link',
    actionLabel: 'Download VS Code',
    actionValue: 'https://code.visualstudio.com',
    hint: 'Once installed, open it. You\'ll see a dark window with a "Welcome" tab. That means it works!',
    celebration: 'Your workspace is ready \u2728',
  },

  /* ── 3-5. Node.js ────────────────────────────────────────── */
  {
    id: 'node-intro',
    type: 'intro',
    group: 'node',
    emoji: '\u26A1',
    title: 'You need a runtime engine',
    body: "Your computer doesn't understand web code by default. Node.js is the engine that teaches it how.\n\nYou install it once and forget about it \u2014 it runs in the background. Every web project needs it.",
  },
  {
    id: 'node-install',
    type: 'action',
    group: 'node',
    emoji: '\u2B07\uFE0F',
    title: 'Download Node.js',
    body: 'Download the LTS version (that means "stable"). Install it and click Next through everything.',
    actionType: 'link',
    actionLabel: 'Download Node.js',
    actionValue: 'https://nodejs.org',
    hint: 'IMPORTANT: after installing, close VS Code completely and reopen it. The terminal needs to restart to find Node.',
  },
  {
    id: 'node-verify',
    type: 'verify',
    group: 'node',
    emoji: '\u2705',
    title: "Let's check",
    body: 'Open the terminal in VS Code and paste this command:',
    command: 'node --version',
    expected: 'A number like v20.x.x or v22.x.x \u2014 any number is good!',
    failHint:
      'If it says "not recognized": close ALL VS Code windows, wait 5 seconds, reopen. Still nothing? Restart your computer.',
    celebration: "Node works! You're past the hardest part \u{1F389}",
  },

  /* ── 6-7. Terminal ───────────────────────────────────────── */
  {
    id: 'terminal-intro',
    type: 'intro',
    group: 'terminal',
    emoji: '\u2328\uFE0F',
    title: 'Meet the terminal',
    body: "The terminal is a text chat with your computer. You type a command, press Enter, it does something.\n\nIt's the dark panel at the bottom of VS Code. Don't worry \u2014 we'll tell you exactly what to type every time.",
  },
  {
    id: 'terminal-open',
    type: 'action',
    group: 'terminal',
    emoji: '\u{1F446}',
    title: 'Open the terminal',
    body: "In VS Code, go to the menu: View \u2192 Terminal.\n\nA dark panel will appear at the bottom with a blinking cursor. That's your terminal!",
    actionType: 'copy',
    actionLabel: 'Shortcut',
    actionValue: PLATFORM_SHORTCUT_PLACEHOLDER,
    hint: 'You\'ll see "PowerShell" or "bash" in the terminal header \u2014 that\'s normal. Both work fine.',
    celebration: 'This is where the magic happens \u26A1',
  },

  /* ── 8-10. pnpm ──────────────────────────────────────────── */
  {
    id: 'pnpm-intro',
    type: 'intro',
    group: 'pnpm',
    emoji: '\u{1F4E6}',
    title: 'You need a package manager',
    body: 'Your project uses code written by other developers (called "packages"). pnpm downloads and organizes them for you.\n\nThink of it like an app store for code libraries. You install pnpm once, and it handles the rest.',
  },
  {
    id: 'pnpm-install',
    type: 'action',
    group: 'pnpm',
    emoji: '\u{1F4CB}',
    title: 'Install pnpm',
    body: 'Copy this command and paste it in the terminal. Press Enter and wait.',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'npm install -g pnpm',
    hint: "When it's done, the cursor comes back. Then close VS Code and reopen it \u2014 same as before.",
  },
  {
    id: 'pnpm-verify',
    type: 'verify',
    group: 'pnpm',
    emoji: '\u2705',
    title: 'Quick check',
    body: 'Paste this in the terminal:',
    command: 'pnpm --version',
    expected: 'A number like 10.x.x',
    failHint:
      'If it says "not recognized": close VS Code, reopen, try again. Still nothing? Restart your computer.',
    celebration: 'Package manager ready \u{1F4AA}',
  },

  /* ── 11-13. Git ──────────────────────────────────────────── */
  {
    id: 'git-intro',
    type: 'intro',
    group: 'git',
    emoji: '\u{1F504}',
    title: 'You need version control',
    body: "Git saves snapshots of your project. If you break something, you can go back to when it worked.\n\nIt's also how you download projects from GitHub (that's where steaksoap lives). Every dev uses Git \u2014 it's been around forever.",
  },
  {
    id: 'git-install',
    type: 'action',
    group: 'git',
    emoji: '\u2B07\uFE0F',
    title: 'Download Git',
    body: "Download and install it. During the setup, keep ALL default options \u2014 don't change anything.",
    actionType: 'link',
    actionLabel: 'Download Git',
    actionValue: 'https://git-scm.com',
    hint: 'After installing: close VS Code, reopen. You know the drill by now \u{1F604}',
  },
  {
    id: 'git-verify',
    type: 'verify',
    group: 'git',
    emoji: '\u2705',
    title: 'Check Git',
    body: 'Terminal, paste:',
    command: 'git --version',
    expected: 'Something like git version 2.x.x',
    failHint: 'Same fix as always: close VS Code, reopen. Or restart your computer.',
    celebration: 'All tools installed! Now the fun part \u{1F680}',
  },

  /* ── 14-16. Clone + open project ─────────────────────────── */
  {
    id: 'project-intro',
    type: 'intro',
    group: 'project',
    emoji: '\u{1F4E5}',
    title: 'Time to get steaksoap',
    body: "Now we're going to download steaksoap to your computer. It creates a folder with all the files you need.\n\nAfter this step, you'll have a real project on your machine that you can customize and make your own.",
  },
  {
    id: 'clone-action',
    type: 'action',
    group: 'project',
    emoji: '\u{1F4CB}',
    title: 'Clone the project',
    body: 'Paste this in the terminal and press Enter:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'git clone https://github.com/Mircooo/steaksoap.git my-project',
    hint: 'Wait until you see "done" in the terminal. It downloads fast!',
  },
  {
    id: 'open-action',
    type: 'action',
    group: 'project',
    emoji: '\u{1F4C2}',
    title: 'Open your project',
    body: 'In VS Code: File \u2192 Open Folder \u2192 find "my-project" in your user folder.\n\nOr paste this in the terminal:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'cd my-project',
    hint: 'If VS Code asks "Do you trust the authors?" click Yes.\nIf it suggests extensions, click "Install All" \u2014 that\'s a good thing!',
  },

  /* ── 17-19. Install + setup ──────────────────────────────── */
  {
    id: 'setup-intro',
    type: 'intro',
    group: 'setup',
    emoji: '\u{1F527}',
    title: 'Almost there!',
    body: 'Two more commands and your project is alive.\n\nFirst, we download all the libraries your project needs (takes ~1 minute). Then we run a quick wizard to give your project a name.',
  },
  {
    id: 'deps-action',
    type: 'action',
    group: 'setup',
    emoji: '\u{1F4CB}',
    title: 'Install dependencies',
    body: 'Make sure the terminal says "my-project" somewhere. Then paste:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'pnpm install',
    hint: "A lot of text will fly by \u2014 that's normal! Wait until the cursor comes back.",
  },
  {
    id: 'setup-action',
    type: 'action',
    group: 'setup',
    emoji: '\u270F\uFE0F',
    title: 'Name your project',
    body: 'This little wizard asks your project name and configures everything:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'pnpm setup',
    hint: 'Just answer the questions. No wrong answers \u2014 you can change everything later.',
    celebration: 'Your project has a name! \u{1F3A8}',
  },

  /* ── 20-21. Launch ───────────────────────────────────────── */
  {
    id: 'launch-intro',
    type: 'intro',
    group: 'launch',
    emoji: '\u{1F680}',
    title: 'Ready for liftoff',
    body: "This is it. One command and your website is running on your computer. For real.\n\nYou're about to see your site in the browser. Exciting, right?",
  },
  {
    id: 'launch-action',
    type: 'action',
    group: 'launch',
    emoji: '\u{1F3AC}',
    title: 'Start your project',
    body: 'Paste this and watch the magic happen:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'pnpm dev',
    hint: 'Open your browser at localhost:5173 \u2014 you should see YOUR site! \u{1F389}',
    celebration: 'YOUR SITE IS RUNNING! Take a screenshot \u2014 you earned it \u{1F4F8}',
  },

  /* ── 22. Extras : intro ──────────────────────────────────── */
  {
    id: 'extras-intro',
    type: 'intro',
    group: 'extras',
    emoji: '\u{1F381}',
    title: 'Bonus round',
    body: 'Your project is running! Everything below is optional.\n\nThese tools will help you save your work online, publish your site, and build faster with AI. You can set them up now or come back later.',
    optional: true,
  },

  /* ── 23-24. GitHub (optional) ────────────────────────────── */
  {
    id: 'github-intro',
    type: 'intro',
    group: 'extras',
    emoji: '\u2601\uFE0F',
    title: 'What is GitHub?',
    body: "GitHub is like Google Drive, but for code. It stores your project in the cloud so you never lose it.\n\nIt's free, and you'll need it if you want to put your site on the internet later. Almost every developer has a GitHub account.",
    optional: true,
  },
  {
    id: 'github-action',
    type: 'action',
    group: 'extras',
    emoji: '\u270D\uFE0F',
    title: 'Create a GitHub account',
    body: 'Sign up with your email. It takes 2 minutes.',
    actionType: 'link',
    actionLabel: 'Create free account',
    actionValue: 'https://github.com/signup',
    optional: true,
    hint: 'Already have one? Just skip to the next step.',
  },

  /* ── 25-26. Vercel (optional) ────────────────────────────── */
  {
    id: 'vercel-intro',
    type: 'intro',
    group: 'extras',
    emoji: '\u{1F310}',
    title: 'What is Vercel?',
    body: 'Vercel puts your site on the internet for free. You connect your GitHub account, and every time you save your work, your live site updates automatically.\n\nIt\'s like pressing "Publish" on a blog, but for your entire website.',
    optional: true,
  },
  {
    id: 'vercel-action',
    type: 'action',
    group: 'extras',
    emoji: '\u270D\uFE0F',
    title: 'Create a Vercel account',
    body: 'Sign up and connect your GitHub when asked.',
    actionType: 'link',
    actionLabel: 'Create Vercel account',
    actionValue: 'https://vercel.com/signup',
    optional: true,
    hint: 'You can always do this later. Your site works locally for now.',
  },

  /* ── 27-28. Git Bash (optional, Windows) ────────────────── */
  {
    id: 'gitbash-intro',
    type: 'intro',
    group: 'extras',
    emoji: '\u{1F5A5}\uFE0F',
    title: 'Windows needs Git Bash',
    body: "Claude Code doesn't run natively on Windows. It needs a Unix-like terminal called Git Bash.\n\nGood news: if you installed Git earlier in this tutorial, you already have it! Git for Windows includes Git Bash automatically.\n\nIf you skipped the Git step or you're on Mac/Linux, you can skip this.",
    optional: true,
  },
  {
    id: 'gitbash-verify',
    type: 'action',
    group: 'extras',
    emoji: '\u2705',
    title: 'Check Git Bash',
    body: 'Search "Git Bash" in your Start menu. If it opens a dark terminal window, you\'re good!\n\nIf not, download Git again and make sure to keep the default options during install:',
    actionType: 'link',
    actionLabel: 'Download Git (includes Git Bash)',
    actionValue: 'https://git-scm.com/downloads/win',
    optional: true,
    hint: "On Mac or Linux? You don't need this \u2014 skip to the next step. Git Bash is a Windows-only requirement.",
    celebration: 'Git Bash ready \u2014 Claude Code will work! \u{1F389}',
  },

  /* ── 29-30. Claude Code (optional) ───────────────────────── */
  {
    id: 'claude-intro',
    type: 'intro',
    group: 'extras',
    emoji: '\u{1F916}',
    title: 'What is Claude Code?',
    body: "Claude Code is an AI that lives in your terminal. It knows steaksoap inside out \u2014 all 22 commands, all the rules.\n\nInstead of writing code yourself, you describe what you want and Claude builds it. It's like having a senior developer sitting next to you.\n\nOn Windows, it requires Git Bash (which you just set up!).",
    optional: true,
  },
  {
    id: 'claude-action',
    type: 'action',
    group: 'extras',
    emoji: '\u2B07\uFE0F',
    title: 'Install Claude Code',
    body: 'Follow the instructions on the page. Once installed, open a terminal in your project and type: claude',
    actionType: 'link',
    actionLabel: 'Install Claude Code',
    actionValue: 'https://claude.ai/code',
    optional: true,
    hint: 'Windows users: if you get a "requires git-bash" error, make sure Git is installed and restart VS Code. Then try typing: /spec "a contact form" \u2014 and watch it plan your first feature.',
    celebration: 'You have an AI co-builder now \u{1F91D}',
  },

  /* ── 31. Done! ───────────────────────────────────────────── */
  {
    id: 'done',
    type: 'done',
    group: 'done',
    title: '',
    body: '',
  },
];

/** Platform-aware shortcut for the terminal slide */
export function getPlatformShortcut(): string {
  return isMac ? 'Cmd + `' : 'Ctrl + `';
}
