// ═══════════════════════════════════════════════════
// Accordion — expandable content panels
//
// WHAT: Renders collapsible sections with smooth animation
// WHEN: FAQ, settings panels, grouped content
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';
import { ChevronDown } from 'lucide-react';
import { createContext, type ReactNode, useCallback, useContext, useId, useState } from 'react';

/* ─── Context ──────────────────────────────────────── */

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion compound components must be used within <Accordion>');
  return ctx;
}

/* ─── Accordion Root ───────────────────────────────── */

interface AccordionProps {
  /** 'single' closes others when one opens. 'multiple' allows many open. */
  type?: 'single' | 'multiple';
  /** Item id(s) to open by default */
  defaultOpen?: string | string[];
  children: ReactNode;
  className?: string;
}

/** Root container for accordion items. */
export function Accordion({ type = 'single', defaultOpen, children, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultOpen) return new Set();
    return new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]);
  });

  const toggle = useCallback(
    (id: string) => {
      setOpenItems(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (type === 'single') next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [type],
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn('divide-border divide-y', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

/* ─── AccordionItem ────────────────────────────────── */

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const ItemContext = createContext<string>('');

/** Single accordion panel. Must have AccordionTrigger + AccordionContent as children. */
export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <ItemContext.Provider value={value}>
      <div className={cn('py-0', className)}>{children}</div>
    </ItemContext.Provider>
  );
}

/* ─── AccordionTrigger ─────────────────────────────── */

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

/** Clickable trigger that toggles the accordion content. */
export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { openItems, toggle } = useAccordionContext();
  const value = useContext(ItemContext);
  const contentId = useId();
  const isOpen = openItems.has(value);

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      aria-controls={contentId}
      className={cn(
        'text-fg flex w-full items-center justify-between py-4 text-left text-sm font-medium',
        'transition-colors duration-200',
        'hover:text-accent',
        'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
    >
      {children}
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        className={cn(
          'text-muted shrink-0 transition-transform duration-300',
          isOpen && 'rotate-180',
        )}
        aria-hidden="true"
      />
    </button>
  );
}

/* ─── AccordionContent ─────────────────────────────── */

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

// WHY: grid-rows trick animates height from 0 to auto without JS measurement.
// grid-template-rows: 0fr → 1fr with overflow hidden on the inner div.
/** Collapsible content panel with smooth height animation. */
export function AccordionContent({ children, className }: AccordionContentProps) {
  const { openItems } = useAccordionContext();
  const value = useContext(ItemContext);
  const isOpen = openItems.has(value);

  return (
    <div
      role="region"
      className={cn(
        'grid transition-all duration-300 ease-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="overflow-hidden">
        <div className={cn('text-muted pb-4 text-sm leading-relaxed', className)}>{children}</div>
      </div>
    </div>
  );
}
