// ═══════════════════════════════════════════════════
// dashboardTool — registers Dashboard as the first Studio tool
// ═══════════════════════════════════════════════════

import { definePlugin } from 'sanity';

import { Dashboard } from '../components/Dashboard';
import { icon } from '../icons';

export const dashboardTool = definePlugin({
  name: 'dashboard',
  tools: [
    {
      name: 'dashboard',
      title: 'Tableau de bord',
      icon: icon('📊'),
      component: Dashboard,
    },
  ],
});
