import { Badge } from '@components/ui/Badge';

export const TIMELINE_ITEMS = [
  {
    title: 'v3.0 — Major redesign',
    date: 'Mar 2026',
    badge: (
      <Badge variant="success" size="sm">
        latest
      </Badge>
    ),
    description:
      'Complete UI overhaul with new design system, 10 new components, and improved performance.',
  },
  {
    title: 'v2.0 — API integration',
    date: 'Jan 2026',
    badge: (
      <Badge variant="info" size="sm">
        major
      </Badge>
    ),
    description: 'Added REST API support, authentication, and real-time notifications.',
  },
  {
    title: 'v1.0 — Initial release',
    date: 'Oct 2025',
    description: 'Core features, user management, and basic dashboard.',
  },
] as const;
