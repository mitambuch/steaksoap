import { Avatar } from '@components/ui/Avatar';
import { Badge } from '@components/ui/Badge';
import { Card } from '@components/ui/Card';

import { Copyable, Section } from '../shared';

export function CardsSection() {
  return (
    <Section number="06" title="cards & widgets">
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card hover padding="lg">
            <p className="text-fg text-sm font-medium">hover card</p>
            <p className="text-muted mt-1 text-xs">scale + glow on hover</p>
            <Copyable text="hover padding='lg'" className="mt-3" />
          </Card>
          <Card padding="md">
            <p className="text-fg text-sm font-medium">default card</p>
            <p className="text-muted mt-1 text-xs">glass + backdrop-blur</p>
            <Copyable text="padding='md'" className="mt-3" />
          </Card>
          <Card padding="sm">
            <p className="text-fg text-sm font-medium">compact card</p>
            <p className="text-muted mt-1 text-xs">small padding</p>
            <Copyable text="padding='sm'" className="mt-3" />
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card hover padding="lg">
            <span className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">
              total users
            </span>
            <p className="text-fg mt-2 text-3xl font-bold">12,847</p>
            <p className="text-success mt-1 text-xs font-medium">+14.2% from last month</p>
          </Card>
          <Card hover padding="lg">
            <div className="flex items-center gap-4">
              <Avatar src="https://i.pravatar.cc/150?u=profile" alt="profile" size="lg" />
              <div>
                <p className="text-fg font-medium">jane doe</p>
                <p className="text-muted text-sm">product designer</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Badge>design</Badge>
              <Badge variant="outline">figma</Badge>
              <Badge variant="outline">css</Badge>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
