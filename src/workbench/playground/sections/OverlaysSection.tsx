import { Button } from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';
import { Tooltip } from '@components/ui/Tooltip';
import { useState } from 'react';

import { Section, SubLabel } from '../shared';

export function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Section number="08" title="overlays">
      <div className="space-y-8">
        <div>
          <SubLabel>tooltip</SubLabel>
          <div className="flex flex-wrap gap-3">
            {(['top', 'bottom', 'left', 'right'] as const).map(position => (
              <Tooltip key={position} content={`${position} tooltip`} position={position}>
                <Button variant="secondary" size="sm">
                  {position}
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>

        <div>
          <SubLabel>modal</SubLabel>
          <Button onClick={() => setModalOpen(true)}>open modal</Button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="example modal">
            <p className="text-muted text-sm">focus trap, escape to close, backdrop click.</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                cancel
              </Button>
              <Button size="sm" onClick={() => setModalOpen(false)}>
                confirm
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </Section>
  );
}
