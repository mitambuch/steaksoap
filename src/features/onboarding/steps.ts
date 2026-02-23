/* ═══════════════════════════════════════════════════════════════
   WIZARD SLIDES — data for the guided setup carousel.
   Each slide is ONE screen that fits in the fixed-size modal.
   Slides are grouped so the dot indicators stay manageable (11 dots).
   ═══════════════════════════════════════════════════════════════ */

export interface WizardSlide {
  id: string;
  type: 'welcome' | 'explain' | 'action' | 'verify' | 'done';

  /** Which dot group this slide belongs to */
  group: string;

  /** Main heading */
  title: string;
  /** 2-3 sentences max — must fit in one glance */
  body: string;

  /** Large emoji for 'explain' slides */
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

export const wizardSlides: WizardSlide[] = [
  /* ── 0. Welcome ──────────────────────────────────────────── */
  {
    id: 'welcome',
    type: 'welcome',
    group: 'welcome',
    title: 'Welcome to steaksoap',
    body: '',
  },

  /* ── 1-2. VS Code ────────────────────────────────────────── */
  {
    id: 'vscode-explain',
    type: 'explain',
    group: 'vscode',
    emoji: '\u{1F4BB}',
    title: 'What is VS Code?',
    body: "VS Code is a free app made by Microsoft. It's where you'll write and manage your project. Think of it like Google Docs, but for code.",
  },
  {
    id: 'vscode-install',
    type: 'action',
    group: 'vscode',
    title: 'Download VS Code',
    body: "Click the button below. It'll open the download page. Pick your system (Windows/Mac) and install it like any normal app.",
    actionType: 'link',
    actionLabel: 'Download VS Code',
    actionValue: 'https://code.visualstudio.com',
    hint: "Once installed, open it. You should see a dark window with a Welcome tab. That's it!",
    celebration: 'Your workspace is ready',
  },

  /* ── 3-5. Node.js ────────────────────────────────────────── */
  {
    id: 'node-explain',
    type: 'explain',
    group: 'node',
    emoji: '\u26A1',
    title: 'What is Node.js?',
    body: "Node.js is the engine that makes your project run. Your computer doesn't understand web code by default \u2014 Node teaches it how. You install it once and forget about it.",
  },
  {
    id: 'node-install',
    type: 'action',
    group: 'node',
    title: 'Download Node.js',
    body: 'Click the big green button on the Node website. It says "LTS" which just means "stable version". Install it and click Next through everything.',
    actionType: 'link',
    actionLabel: 'Download Node.js',
    actionValue: 'https://nodejs.org',
    hint: 'IMPORTANT: After installing, close VS Code completely and reopen it. The terminal needs to restart to find Node.',
  },
  {
    id: 'node-verify',
    type: 'verify',
    group: 'node',
    title: 'Did it work?',
    body: `Open VS Code, press ${isMac ? 'Cmd' : 'Ctrl'}+\` to open the terminal, and paste this:`,
    command: 'node --version',
    expected: 'You should see a number like v20.x.x or v22.x.x',
    failHint:
      'Nothing? Close ALL VS Code windows, wait 5 seconds, reopen. If that fails: restart your computer.',
    celebration: "Node works! You're past the hardest part",
  },

  /* ── 6-7. Terminal ───────────────────────────────────────── */
  {
    id: 'terminal-explain',
    type: 'explain',
    group: 'terminal',
    emoji: '\u2328\uFE0F',
    title: 'What is the terminal?',
    body: "The terminal is a text chat with your computer. You type a command, it does something. It's the dark panel at the bottom of VS Code. All the next steps happen here.",
  },
  {
    id: 'terminal-open',
    type: 'action',
    group: 'terminal',
    title: 'Open the terminal',
    body: 'In VS Code, go to View \u2192 Terminal in the top menu. A dark panel will appear at the bottom.',
    actionType: 'copy',
    actionLabel: 'Keyboard shortcut',
    actionValue: `${isMac ? 'Cmd' : 'Ctrl'} + \``,
    hint: "You should see a dark panel with a blinking cursor at the bottom of VS Code. You're in!",
    celebration: 'This is where the magic happens',
  },

  /* ── 8-10. pnpm ──────────────────────────────────────────── */
  {
    id: 'pnpm-explain',
    type: 'explain',
    group: 'pnpm',
    emoji: '\u{1F4E6}',
    title: 'What is pnpm?',
    body: 'Your project uses code written by other people (libraries). pnpm downloads and manages all of them for you. Think of it like an app store for code.',
  },
  {
    id: 'pnpm-install',
    type: 'action',
    group: 'pnpm',
    title: 'Install pnpm',
    body: 'Paste this in the terminal and press Enter:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'npm install -g pnpm',
    hint: 'Wait until the cursor comes back. Then close and reopen VS Code (same as before \u2014 it needs a restart).',
  },
  {
    id: 'pnpm-verify',
    type: 'verify',
    group: 'pnpm',
    title: 'Check pnpm',
    body: 'Open the terminal again and paste:',
    command: 'pnpm --version',
    expected: 'You should see a number like 10.x.x',
    failHint:
      'If it says "pnpm is not recognized": close VS Code, reopen, try again. Still nothing? Restart your computer.',
    celebration: 'Almost there, keep going',
  },

  /* ── 11-13. Git ──────────────────────────────────────────── */
  {
    id: 'git-explain',
    type: 'explain',
    group: 'git',
    emoji: '\u{1F504}',
    title: 'What is Git?',
    body: "Git saves snapshots of your work. If you break something, you can go back to when it worked. It's also how you download projects from GitHub.",
  },
  {
    id: 'git-install',
    type: 'action',
    group: 'git',
    title: 'Download Git',
    body: "Download the installer and run it. Keep ALL default options \u2014 don't change anything during setup.",
    actionType: 'link',
    actionLabel: 'Download Git',
    actionValue: 'https://git-scm.com',
    hint: 'After installing: close VS Code, reopen. You know the drill by now',
  },
  {
    id: 'git-verify',
    type: 'verify',
    group: 'git',
    title: 'Check Git',
    body: 'Terminal, paste:',
    command: 'git --version',
    expected: 'Something like git version 2.x.x',
    failHint: 'Same fix as always: close VS Code, reopen. If still nothing: restart computer.',
    celebration: 'All tools installed! Now the fun part',
  },

  /* ── 14-16. Clone + open project ─────────────────────────── */
  {
    id: 'clone-explain',
    type: 'explain',
    group: 'project',
    emoji: '\u{1F4E5}',
    title: 'Get steaksoap',
    body: "Now we're going to download steaksoap to your computer. This creates a folder with all the files you need to start building your project.",
  },
  {
    id: 'clone-action',
    type: 'action',
    group: 'project',
    title: 'Clone the project',
    body: 'Paste this in the terminal:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'git clone https://github.com/mitambuch/steaksoap.git my-project',
    hint: 'Wait for "done" to appear. Then paste the next command to enter the folder.',
  },
  {
    id: 'open-project',
    type: 'action',
    group: 'project',
    title: 'Open your project',
    body: 'In VS Code, go to File \u2192 Open Folder and select the "my-project" folder. Or type this in the terminal:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'cd my-project',
    hint: 'If VS Code asks "Do you trust the authors?" \u2014 click Yes. If it suggests extensions \u2014 click Install All.',
  },

  /* ── 17-19. Install + setup ──────────────────────────────── */
  {
    id: 'deps-explain',
    type: 'explain',
    group: 'setup',
    emoji: '\u{1F527}',
    title: 'One last download',
    body: 'Your project needs a bunch of small tools and libraries to work. This command downloads all of them in one go. Takes about a minute.',
  },
  {
    id: 'deps-action',
    type: 'action',
    group: 'setup',
    title: 'Install everything',
    body: 'Make sure your terminal says "my-project" somewhere. Then paste:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'pnpm install',
    hint: "A lot of text will fly by. That's normal. Wait until the cursor comes back.",
  },
  {
    id: 'setup-action',
    type: 'action',
    group: 'setup',
    title: 'Make it yours',
    body: 'This asks your project name and sets everything up. Just answer the questions:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'pnpm setup',
    hint: "It'll ask a few things. Don't stress \u2014 there are no wrong answers and you can change everything later.",
    celebration: 'Your project has a name now!',
  },

  /* ── 20-21. Launch ───────────────────────────────────────── */
  {
    id: 'launch-explain',
    type: 'explain',
    group: 'launch',
    emoji: '\u{1F680}',
    title: 'Ready for liftoff',
    body: 'This is it. One last command and your website is running on your computer. For real.',
  },
  {
    id: 'launch-action',
    type: 'action',
    group: 'launch',
    title: 'Start your project',
    body: 'Paste this and watch the magic:',
    actionType: 'copy',
    actionLabel: 'Copy command',
    actionValue: 'pnpm dev',
    hint: 'Open your browser and go to localhost:5173 \u2014 you should see your site!',
    celebration: 'YOUR SITE IS RUNNING',
  },

  /* ── 22-23. GitHub (optional) ────────────────────────────── */
  {
    id: 'github-explain',
    type: 'explain',
    group: 'extras',
    emoji: '\u2601\uFE0F',
    title: 'Save your work online',
    body: "GitHub is like Google Drive but for code. It's free and it backs up your project. You'll also need it to put your site on the internet later.",
    optional: true,
  },
  {
    id: 'github-action',
    type: 'action',
    group: 'extras',
    title: 'Create a GitHub account',
    body: 'Sign up with your email. Skip this if you already have one.',
    actionType: 'link',
    actionLabel: 'Sign up for free',
    actionValue: 'https://github.com/signup',
    optional: true,
  },

  /* ── 24. Vercel (optional) ───────────────────────────────── */
  {
    id: 'vercel-action',
    type: 'action',
    group: 'extras',
    title: 'Put your site on the internet',
    body: 'Vercel hosts your site for free. Create an account and connect your GitHub. You can do this anytime later.',
    actionType: 'link',
    actionLabel: 'Create Vercel account',
    actionValue: 'https://vercel.com/signup',
    optional: true,
  },

  /* ── 25. Claude Code (optional) ──────────────────────────── */
  {
    id: 'claude-action',
    type: 'action',
    group: 'extras',
    title: 'Add your AI assistant',
    body: 'Claude Code is the AI that knows steaksoap inside out. Tell it what you want to build, and it builds it.',
    actionType: 'link',
    actionLabel: 'Install Claude Code',
    actionValue: 'https://claude.ai/code',
    optional: true,
    hint: 'Once installed, open a terminal in your project and type: claude',
  },

  /* ── 26. Done! ───────────────────────────────────────────── */
  {
    id: 'done',
    type: 'done',
    group: 'done',
    title: 'You did it!',
    body: 'Your development environment is ready. You have everything you need to start building.',
  },
];
