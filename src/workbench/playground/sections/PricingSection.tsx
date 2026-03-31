import { Button } from '@components/ui/Button';
import { cn } from '@utils/cn';
import { Check } from 'lucide-react';

import { PRICING_PLANS } from '../data';
import { Section } from '../shared';

export function PricingSection() {
  return (
    <Section number="15" title="pricing table">
      <div className="grid gap-4 md:grid-cols-3">
        {PRICING_PLANS.map(plan => (
          <div
            key={plan.name}
            className={cn(
              'border-border duration-base relative flex flex-col rounded-lg border p-6 transition-[border-color,background-color,box-shadow]',
              plan.highlighted
                ? 'border-accent/40 bg-accent/3 shadow-[0_0_40px_color-mix(in_srgb,var(--color-accent)_5%,transparent)]'
                : 'hover:border-accent/15 bg-transparent',
            )}
          >
            {plan.badge && (
              <span className="bg-accent text-bg absolute -top-3 right-4 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                {plan.badge}
              </span>
            )}
            <h3 className="text-fg font-mono text-sm font-medium uppercase">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-fg text-3xl font-bold">{plan.price}</span>
              <span className="text-fg/60 text-sm">{plan.period}</span>
            </div>
            <p className="text-fg/70 mt-2 text-sm">{plan.description}</p>

            <ul className="mt-6 flex-1 space-y-2">
              {plan.features.map(f => (
                <li key={f} className="text-fg/70 flex items-center gap-2 text-sm">
                  <Check
                    size={14}
                    strokeWidth={2}
                    className="text-success shrink-0"
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.highlighted ? 'primary' : 'secondary'}
              className="mt-6 w-full"
              size="md"
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
