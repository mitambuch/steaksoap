import { Card } from '@components/ui/Card';
import { ProgressBar } from '@components/ui/ProgressBar';
import { Stat } from '@components/ui/Stat';

import { Section, SubLabel } from '../shared';

export function StatsSection() {
  return (
    <Section number="20" title="stats">
      <div className="space-y-8">
        <div>
          <SubLabel>inline stats</SubLabel>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card padding="md">
              <Stat label="Total users" value="12,847" trend={{ value: '14.2%', positive: true }} />
            </Card>
            <Card padding="md">
              <Stat label="Revenue" value="$48.2k" trend={{ value: '7.1%', positive: true }} />
            </Card>
            <Card padding="md">
              <Stat label="Bounce rate" value="24.3%" trend={{ value: '3.2%', positive: false }} />
            </Card>
            <Card padding="md">
              <Stat label="Avg. session" value="4m 32s" trend={{ value: '12s', positive: true }} />
            </Card>
          </div>
        </div>

        <div>
          <SubLabel>progress bars</SubLabel>
          <div className="max-w-md space-y-4">
            <ProgressBar value={78} variant="accent" showLabel />
            <ProgressBar value={92} variant="success" showLabel />
            <ProgressBar value={45} variant="warning" showLabel />
            <ProgressBar value={15} variant="danger" showLabel />
          </div>
        </div>
      </div>
    </Section>
  );
}
