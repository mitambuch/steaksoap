import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { EmptyState } from '@components/ui/EmptyState';
import { FileX, Inbox, SearchX } from 'lucide-react';

import { Section } from '../shared';

export function EmptyStatesSection() {
  return (
    <Section number="22" title="empty states">
      <div className="grid gap-4 md:grid-cols-3">
        <Card padding="md">
          <EmptyState
            icon={<SearchX size={40} strokeWidth={1} />}
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <Button variant="secondary" size="sm">
                Clear filters
              </Button>
            }
          />
        </Card>
        <Card padding="md">
          <EmptyState
            icon={<Inbox size={40} strokeWidth={1} />}
            title="No items yet"
            description="Get started by creating your first item. It only takes a few seconds."
            action={<Button size="sm">Create first item</Button>}
          />
        </Card>
        <Card padding="md">
          <EmptyState
            icon={<FileX size={40} strokeWidth={1} />}
            title="Something went wrong"
            description="We couldn't load this content. Please try again or contact support."
            action={
              <Button variant="danger" size="sm">
                Retry
              </Button>
            }
          />
        </Card>
      </div>
    </Section>
  );
}
