import { AvatarGroup } from '@components/ui/AvatarGroup';
import { Divider } from '@components/ui/Divider';
import { Kbd } from '@components/ui/Kbd';
import { Switch } from '@components/ui/Switch';
import { useState } from 'react';

import { Section, SubLabel } from '../shared';

function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="space-y-3">
      <Switch label="Enable notifications" checked={notifications} onChange={setNotifications} />
      <Switch label="Dark mode" checked={darkMode} onChange={setDarkMode} />
      <Switch label="Send analytics" checked={analytics} onChange={setAnalytics} />
      <Switch label="Disabled option" checked={false} disabled />
    </div>
  );
}

export function MiscSection() {
  return (
    <Section number="23" title="misc components">
      <div className="space-y-8">
        <div>
          <SubLabel>switch</SubLabel>
          <SwitchDemo />
        </div>

        <div>
          <SubLabel>avatar group</SubLabel>
          <div className="flex flex-wrap items-center gap-6">
            <AvatarGroup
              avatars={[
                { src: 'https://i.pravatar.cc/150?u=a', alt: 'Alice' },
                { src: 'https://i.pravatar.cc/150?u=b', alt: 'Bob' },
                { src: 'https://i.pravatar.cc/150?u=c', alt: 'Charlie' },
                { src: 'https://i.pravatar.cc/150?u=d', alt: 'Diana' },
                { src: 'https://i.pravatar.cc/150?u=e', alt: 'Eve' },
                { src: 'https://i.pravatar.cc/150?u=f', alt: 'Frank' },
              ]}
              max={4}
            />
            <span className="text-muted text-xs">max=4 — 6 avatars</span>
          </div>
        </div>

        <div>
          <SubLabel>keyboard shortcuts</SubLabel>
          <div className="flex flex-wrap gap-3">
            <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
              <Kbd>&lceil;</Kbd>
              <span className="text-muted text-xs">+</span>
              <Kbd>K</Kbd>
              <span className="text-muted ml-2 text-xs">command palette</span>
            </div>
            <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
              <Kbd>&lceil;</Kbd>
              <span className="text-muted text-xs">+</span>
              <Kbd>S</Kbd>
              <span className="text-muted ml-2 text-xs">save</span>
            </div>
            <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
              <Kbd>Esc</Kbd>
              <span className="text-muted ml-2 text-xs">close</span>
            </div>
            <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
              <Kbd>&uarr;</Kbd>
              <Kbd>&darr;</Kbd>
              <span className="text-muted ml-2 text-xs">navigate</span>
            </div>
          </div>
        </div>

        <div>
          <SubLabel>dividers</SubLabel>
          <div className="max-w-md space-y-0">
            <p className="text-muted text-sm">Content above the divider.</p>
            <Divider />
            <p className="text-muted text-sm">Simple horizontal rule.</p>
            <Divider label="or" />
            <p className="text-muted text-sm">With a centered label.</p>
            <Divider label="section break" />
            <p className="text-muted text-sm">Content below.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
