import { COLOR_SWATCHES } from '../data';
import { Section, Swatch } from '../shared';

export function ColorsSection() {
  return (
    <Section number="02" title="colors">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COLOR_SWATCHES.map(swatch => (
          <Swatch key={swatch.token} {...swatch} />
        ))}
      </div>
    </Section>
  );
}
