// ═══════════════════════════════════════════════════
// LocaleRedirect — root/un-prefixed routes hop to the canonical locale
//
// WHAT: When the user hits `/` or any un-prefixed known path, this
//       component detects their locale and Navigate-s to the
//       `/:locale/...` canonical URL with `replace` (no extra history).
// WHEN: Used in src/app/routes/index.tsx at the top of the router tree.
// ═══════════════════════════════════════════════════

import { getInitialLocale, localePath } from '@config/i18n';
import { Navigate, useLocation } from 'react-router-dom';

export function LocaleRedirect() {
  const { pathname, search, hash } = useLocation();
  const locale = getInitialLocale();
  const target = `${localePath(locale, pathname || '/')}${search}${hash}`;
  return <Navigate to={target} replace />;
}
