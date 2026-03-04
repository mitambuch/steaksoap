/* ═══════════════════════════════════════════════════════════════
   Footer — site-wide footer with GitHub link, version, and credit.
   Rendered in RootLayout, shared across all pages.
   ═══════════════════════════════════════════════════════════════ */

import { siteConfig } from '@config/site';

import { GitHubIcon } from './Header';

export const Footer = () => {
  return (
    <footer className="bg-bg border-border border-t">
      <div className="mx-auto flex w-full max-w-[2440px] items-center justify-between gap-3 px-6 py-3">
        {/* Credit */}
        <p className="text-muted font-mono text-xs">
          Made with{' '}
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg/50 hover:text-accent focus-visible:ring-accent rounded-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
          >
            Claude Code
          </a>
        </p>

        {/* Version */}
        <a
          href={`${siteConfig.repo}/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted/50 hover:text-accent font-mono text-[10px] underline-offset-2 transition-colors"
        >
          v{__APP_VERSION__}
        </a>

        {/* GitHub */}
        <a
          href={siteConfig.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent focus-visible:ring-accent flex items-center gap-2 rounded-sm font-mono text-xs transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
        >
          <GitHubIcon size={16} />
          GitHub
        </a>
      </div>
    </footer>
  );
};
