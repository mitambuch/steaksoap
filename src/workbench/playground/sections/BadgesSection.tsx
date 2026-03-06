import { Badge } from '@components/ui/Badge';

import { Copyable, Section } from '../shared';

export function BadgesSection() {
  return (
    <Section number="04" title="badges">
      <div className="space-y-3">
        {(
          [
            ['default', 'bg-accent text-bg'],
            ['outline', 'border-border'],
            ['success', 'bg-success/15 text-success'],
            ['warning', 'bg-warning/15 text-warning'],
            ['danger', 'bg-danger/15 text-danger'],
            ['info', 'bg-info/15 text-info'],
          ] as const
        ).map(([variant, classes]) => (
          <div
            key={variant}
            className="border-border/50 hover:border-accent/20 duration-base flex flex-wrap items-center gap-4 rounded-lg border p-3 transition-[border-color]"
          >
            <Badge variant={variant}>{variant}</Badge>
            <Copyable text={`variant="${variant}"`} />
            <Copyable text={classes} />
          </div>
        ))}
      </div>
    </Section>
  );
}
