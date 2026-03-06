/* ═══════════════════════════════════════════════════════════════
   Footer — site-wide footer with version display.
   Rendered in RootLayout, shared across all pages.
   ═══════════════════════════════════════════════════════════════ */

import { siteConfig } from '@config/site';

export const Footer = () => {
  return (
    <footer className="bg-bg border-border border-t">
      <div className="mx-auto flex w-full max-w-[2440px] items-center justify-between gap-3 px-6 py-3">
        <p className="text-muted font-mono text-xs">{siteConfig.name}</p>

        <span className="text-muted/50 font-mono text-[10px]">v{__APP_VERSION__}</span>
      </div>
    </footer>
  );
};
