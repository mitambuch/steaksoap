/* ═══════════════════════════════════════════════════════════════
   WIZARD STEPS — data for the guided setup wizard.
   Each step walks a complete beginner through setting up their
   dev environment and launching their first steaksoap project.
   ═══════════════════════════════════════════════════════════════ */

export interface WizardStep {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  /** Plain-language explanation of what this step does */
  body: string;
  action: {
    type: 'link' | 'copy';
    label: string;
    /** URL for 'link' or command string for 'copy' */
    value: string;
  };
  /** Instruction shown after the user takes the action */
  afterAction?: string;
  verify?: {
    /** Command the user pastes to verify the step worked */
    command: string;
    /** What the output should look like */
    expected: string;
  };
  troubleshoot?: {
    question: string;
    solutions: string[];
  };
  /** Mark optional steps (shown with reduced emphasis) */
  optional?: boolean;
  /** Encouraging message shown when the user moves to the next step */
  celebration?: string;
}

export const wizardSteps: WizardStep[] = [
  /* ── 1. VS Code ──────────────────────────────────────────── */
  {
    id: 'vscode',
    number: 1,
    title: 'Install VS Code',
    subtitle: 'Your workspace',
    body: "VS Code is the app where you'll work on your project. It's free. Think of it like Word, but for code.",
    action: {
      type: 'link',
      label: 'Download VS Code',
      value: 'https://code.visualstudio.com',
    },
    afterAction: 'Download it, install it like any app, and open it once.',
    troubleshoot: {
      question: 'Something went wrong?',
      solutions: [
        'Make sure you download the right version for your system (Windows/Mac/Linux)',
        "If your antivirus blocks it: it's safe, allow it through",
        'If the download is slow: try a different browser',
      ],
    },
    celebration: 'Nice! You have your workspace ready.',
  },

  /* ── 2. Node.js ──────────────────────────────────────────── */
  {
    id: 'node',
    number: 2,
    title: 'Install Node.js',
    subtitle: 'The engine behind everything',
    body: 'Node.js is what makes your project actually run on your computer. Without it, nothing works.',
    action: {
      type: 'link',
      label: 'Download Node.js',
      value: 'https://nodejs.org',
    },
    afterAction:
      'Click the big green button on the site (it says "LTS" — that means "stable version"). Run the installer and click Next through everything. When it\'s done, CLOSE VS Code completely and reopen it.',
    verify: {
      command: 'node --version',
      expected: 'You should see something like v20.x.x or v22.x.x. Any number is good.',
    },
    troubleshoot: {
      question: 'The terminal says "node is not recognized"?',
      solutions: [
        'Did you close and reopen VS Code after installing? This is required — the terminal needs to restart to find Node.',
        'Try closing ALL VS Code windows, wait 5 seconds, reopen.',
        "If it still doesn't work: restart your computer. Seriously, it fixes this 90% of the time.",
      ],
    },
    celebration: "Node is running. You're already past the hardest part.",
  },

  /* ── 3. Terminal ─────────────────────────────────────────── */
  {
    id: 'terminal',
    number: 3,
    title: 'Open the terminal',
    subtitle: 'Where you type commands',
    body: "The terminal is the text panel at the bottom of VS Code. It's where you'll paste the commands from the next steps. Think of it as a chat with your computer — you type, it does.",
    action: {
      type: 'copy',
      label: 'Keyboard shortcut',
      value: 'Ctrl + `',
    },
    afterAction:
      "Press Ctrl and the backtick key (`) at the same time. That's the key above Tab on most keyboards. A panel should appear at the bottom of VS Code. That's your terminal.",
    troubleshoot: {
      question: "I don't see the terminal?",
      solutions: [
        'Try the menu: View \u2192 Terminal',
        'The backtick key (`) is usually above Tab and left of 1 on your keyboard',
        'On Mac it\u2019s Cmd + ` instead of Ctrl + `',
        'If you see "PowerShell" or "bash" in the terminal header, you\u2019re good \u2014 that\u2019s normal',
      ],
    },
    celebration: 'You found the terminal. This is where the magic happens.',
  },

  /* ── 4. pnpm ─────────────────────────────────────────────── */
  {
    id: 'pnpm',
    number: 4,
    title: 'Install pnpm',
    subtitle: "Your project's package manager",
    body: 'pnpm downloads all the code libraries your project needs. You install it once and never think about it again.',
    action: {
      type: 'copy',
      label: 'Paste this in the terminal',
      value: 'npm install -g pnpm',
    },
    afterAction:
      "Paste this command in the terminal and press Enter. Wait for it to finish (you'll see the cursor come back). Then close and reopen VS Code.",
    verify: {
      command: 'pnpm --version',
      expected: 'You should see a version number like 10.x.x',
    },
    troubleshoot: {
      question: 'It says "npm is not recognized"?',
      solutions: [
        "Node.js wasn't installed properly. Go back to step 2 and reinstall it.",
        'Did you close and reopen VS Code after installing Node? The terminal needs a restart.',
        'Try restarting your computer, then come back here.',
      ],
    },
    celebration: 'pnpm is ready. Almost there.',
  },

  /* ── 5. Git ──────────────────────────────────────────────── */
  {
    id: 'git',
    number: 5,
    title: 'Install Git',
    subtitle: 'Track your work, never lose anything',
    body: 'Git saves snapshots of your project so you can go back in time if something breaks. It also lets you download steaksoap.',
    action: {
      type: 'link',
      label: 'Download Git',
      value: 'https://git-scm.com',
    },
    afterAction:
      'Click "Download for Windows" (or your OS). During installation, keep ALL default options \u2014 don\'t change anything. When it asks about the default editor, pick VS Code if you see it. After it\'s done, close and reopen VS Code.',
    verify: {
      command: 'git --version',
      expected: 'You should see something like git version 2.x.x',
    },
    troubleshoot: {
      question: 'It says "git is not recognized"?',
      solutions: [
        'Close ALL VS Code windows and reopen. The terminal must restart after installing Git.',
        "If that doesn't work: restart your computer.",
        'If it still fails: reinstall Git, and during setup, make sure "Git from the command line" is checked.',
      ],
    },
    celebration: 'Git works. You now have everything you need.',
  },

  /* ── 6. Clone ────────────────────────────────────────────── */
  {
    id: 'clone',
    number: 6,
    title: 'Download steaksoap',
    subtitle: 'Get the project on your computer',
    body: 'This copies the entire steaksoap project into a new folder on your computer.',
    action: {
      type: 'copy',
      label: 'Paste in terminal',
      value: 'git clone https://github.com/mitambuch/steaksoap.git my-project',
    },
    afterAction:
      'Wait until you see "done" in the terminal. Then open the folder: in VS Code, go to File \u2192 Open Folder, find "my-project" in your user folder, and open it.',
    troubleshoot: {
      question: 'Something went wrong?',
      solutions: [
        'If it says "git is not recognized": go back to step 5.',
        'If it says "Permission denied": try running VS Code as administrator.',
        'If it says "folder already exists": delete the "my-project" folder and try again.',
        "Make sure you're connected to the internet.",
      ],
    },
    celebration: 'The project is on your computer!',
  },

  /* ── 7. Open project ─────────────────────────────────────── */
  {
    id: 'open',
    number: 7,
    title: 'Open the project in VS Code',
    subtitle: 'Switch to your new workspace',
    body: 'Now we need to open the project folder so the terminal and VS Code both know where your files are.',
    action: {
      type: 'copy',
      label: 'Or type this in the terminal',
      value: 'cd my-project',
    },
    afterAction:
      'Either use File \u2192 Open Folder \u2192 select "my-project", OR type the command above in the terminal. If VS Code shows a popup saying "Do you trust the authors?" \u2014 click Yes. If it asks to install recommended extensions \u2014 click Install All.',
    troubleshoot: {
      question: "I don't see the folder?",
      solutions: [
        'The folder was created wherever your terminal was pointing. Usually in C:\\Users\\YourName\\',
        'Try typing: dir my-project (Windows) or ls my-project (Mac) to check it exists',
        'If you used File \u2192 Open Folder, you might need to navigate to your home folder first',
      ],
    },
    celebration: "You're in. Look at all those files \u2014 that's your project.",
  },

  /* ── 8. Install deps ─────────────────────────────────────── */
  {
    id: 'install',
    number: 8,
    title: 'Install project files',
    subtitle: 'Download everything steaksoap needs',
    body: "This downloads all the libraries and tools the project uses. It takes 1\u20132 minutes depending on your internet speed. You'll see a progress bar.",
    action: {
      type: 'copy',
      label: 'Paste in terminal',
      value: 'pnpm install',
    },
    afterAction:
      'Wait for it to finish. You\'ll know it\'s done when the cursor comes back and you can type again. If VS Code shows a popup about recommended extensions, click "Install All".',
    troubleshoot: {
      question: 'It failed or shows errors?',
      solutions: [
        'If it says "pnpm is not recognized": go back to step 4. Close and reopen VS Code.',
        'If you see red errors: try running it again. Sometimes the first attempt fails on slow connections.',
        'If it says "EACCES" or "Permission denied": on Mac, try: sudo pnpm install',
        'Make sure the terminal shows "my-project" in the path. If not, type: cd my-project',
      ],
    },
    celebration: 'All dependencies installed. Your project is ready.',
  },

  /* ── 9. Setup wizard ─────────────────────────────────────── */
  {
    id: 'setup',
    number: 9,
    title: 'Make it yours',
    subtitle: 'Personalize your project',
    body: 'This little wizard will ask your project name and configure everything. Just answer the questions \u2014 there are no wrong answers.',
    action: {
      type: 'copy',
      label: 'Paste in terminal',
      value: 'pnpm setup',
    },
    afterAction:
      "Follow the prompts. It'll ask for a project name and a few options. Pick whatever you want \u2014 you can change everything later.",
    troubleshoot: {
      question: 'The wizard crashed or I made a mistake?',
      solutions: [
        "Just run pnpm setup again. It's safe to run multiple times.",
        "If it asks about git remote and you don't have a GitHub repo yet, just skip it.",
      ],
    },
    celebration: "Your project has a name. It's real now.",
  },

  /* ── 10. Launch ──────────────────────────────────────────── */
  {
    id: 'launch',
    number: 10,
    title: 'See it live',
    subtitle: 'Your site is running',
    body: 'This starts your project on your computer. A browser window should open automatically. If not, go to localhost:5173',
    action: {
      type: 'copy',
      label: 'Paste in terminal',
      value: 'pnpm dev',
    },
    afterAction:
      'Your site is now running! Open http://localhost:5173 in your browser if it didn\u2019t open automatically. Try editing a file in VS Code \u2014 the browser updates in real-time.',
    verify: {
      command: 'http://localhost:5173',
      expected: 'You should see your site in the browser with the steaksoap landing page.',
    },
    troubleshoot: {
      question: 'The browser shows nothing?',
      solutions: [
        "Make sure the terminal still shows pnpm dev running (it shouldn't show the cursor \u2014 it's busy serving your site).",
        'Try opening http://localhost:5173 manually in your browser.',
        'If port 5173 is busy, the terminal will show a different port number. Use that one.',
        'If everything fails: press Ctrl+C in the terminal to stop, then run pnpm dev again.',
      ],
    },
    celebration: "YOUR SITE IS RUNNING. You did it. Take a screenshot, you've earned it.",
  },

  /* ── 11. GitHub (optional) ───────────────────────────────── */
  {
    id: 'github',
    number: 11,
    title: 'Create a GitHub account',
    subtitle: 'Save your work in the cloud',
    body: "GitHub stores your code online so you never lose it. It's free. You'll also need it if you want to put your site on the internet later.",
    action: {
      type: 'link',
      label: 'Create a free account',
      value: 'https://github.com/signup',
    },
    optional: true,
    afterAction: 'Sign up with your email. You can skip this for now and come back later.',
    celebration: 'Smart move. Your code has a home now.',
  },

  /* ── 12. Deploy (optional) ───────────────────────────────── */
  {
    id: 'deploy',
    number: 12,
    title: 'Put it on the internet',
    subtitle: 'So anyone can see it',
    body: 'Vercel hosts your site for free. Connect your GitHub account and your site goes live with a real URL.',
    action: {
      type: 'link',
      label: 'Create Vercel account',
      value: 'https://vercel.com/signup',
    },
    optional: true,
    afterAction:
      "Create an account, connect your GitHub, and follow Vercel's import wizard. Or skip this \u2014 your site works locally and that's enough to start.",
    celebration: 'Your site is on the internet. Send the link to your friends.',
  },

  /* ── 13. Claude Code (optional) ──────────────────────────── */
  {
    id: 'claude',
    number: 13,
    title: 'Add your AI assistant',
    subtitle: 'Build faster with Claude Code',
    body: 'Claude Code is the AI that understands steaksoap. It knows all 22 commands and can build features for you. Just describe what you want.',
    action: {
      type: 'link',
      label: 'Install Claude Code',
      value: 'https://claude.ai/code',
    },
    optional: true,
    afterAction:
      'Once installed, open a terminal in your project folder and type: claude. Then tell it what you want to build.',
    celebration: 'You now have an AI co-builder. Tell it what you want.',
  },

  /* ── 14. Done ────────────────────────────────────────────── */
  {
    id: 'done',
    number: 14,
    title: "You're all set",
    subtitle: 'Everything is installed and ready',
    body: "You now have a complete development environment. Here's what to remember:",
    action: {
      type: 'copy',
      label: 'Start your project anytime',
      value: 'pnpm dev',
    },
    celebration: 'Welcome to steaksoap. Now go build something.',
  },
];
