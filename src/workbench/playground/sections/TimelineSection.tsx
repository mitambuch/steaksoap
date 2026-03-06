import { Timeline } from '@components/ui/Timeline';

import { TIMELINE_ITEMS } from '../data';
import { Section } from '../shared';

export function TimelineSection() {
  return (
    <Section number="21" title="timeline">
      <div className="max-w-lg">
        <Timeline items={[...TIMELINE_ITEMS]} />
      </div>
    </Section>
  );
}
