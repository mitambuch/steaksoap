import { ArrowRight, Check, Copy, Heart, Moon, Search, Sun, Zap } from 'lucide-react';

import { Copyable, IconItem, Section, SubLabel } from '../shared';

export function IconsSection() {
  return (
    <Section number="10" title="icons">
      <div className="space-y-8">
        <div>
          <SubLabel>common icons — lucide react</SubLabel>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Search', Icon: Search },
              { name: 'ArrowRight', Icon: ArrowRight },
              { name: 'Check', Icon: Check },
              { name: 'Copy', Icon: Copy },
              { name: 'Zap', Icon: Zap },
              { name: 'Heart', Icon: Heart },
              { name: 'Sun', Icon: Sun },
              { name: 'Moon', Icon: Moon },
            ].map(({ name, Icon }) => (
              <IconItem key={name} name={name}>
                <Icon size={18} strokeWidth={1.5} />
              </IconItem>
            ))}
          </div>
        </div>

        <div>
          <SubLabel>sizes</SubLabel>
          <div className="flex flex-wrap gap-3">
            {[
              { size: 14, label: 'inline' },
              { size: 18, label: 'standard' },
              { size: 24, label: 'large' },
            ].map(({ size, label }) => (
              <div
                key={size}
                className="border-border/50 hover:border-accent/20 duration-base flex items-center gap-3 rounded-lg border px-3 py-2 transition-[border-color]"
              >
                <Zap size={size} strokeWidth={1.5} />
                <Copyable text={`size={${size}}`} />
                <span className="text-muted text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SubLabel>stroke weight</SubLabel>
          <div className="flex flex-wrap gap-3">
            <div className="border-border/50 duration-base flex items-center gap-3 rounded-lg border px-3 py-2 transition-[border-color]">
              <Heart size={20} strokeWidth={2} />
              <span className="text-muted font-mono text-[10px]">2 default</span>
            </div>
            <div className="border-accent/30 duration-base flex items-center gap-3 rounded-lg border px-3 py-2 transition-[border-color]">
              <Heart size={20} strokeWidth={1.5} className="text-accent" />
              <span className="text-accent font-mono text-[10px]">1.5 classe2</span>
            </div>
            <div className="border-border/50 duration-base flex items-center gap-3 rounded-lg border px-3 py-2 transition-[border-color]">
              <Heart size={20} strokeWidth={1} />
              <span className="text-muted font-mono text-[10px]">1 thin</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
