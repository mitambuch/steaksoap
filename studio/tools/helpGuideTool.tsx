// ═══════════════════════════════════════════════════
// helpGuideTool — registers the Help Guide as the last Studio tool
// ═══════════════════════════════════════════════════

import { definePlugin } from 'sanity';

import { HelpGuide } from '../components/HelpGuide';
import { icon } from '../icons';

export const helpGuideTool = definePlugin({
  name: 'help-guide',
  tools: [
    {
      name: 'guide',
      title: 'Guide',
      icon: icon('📖'),
      component: HelpGuide,
    },
  ],
});
