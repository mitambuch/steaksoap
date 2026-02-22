// ═══════════════════════════════════════════════════
// Tabs — switchable content panels
//
// WHAT: Renders a tabbed interface with accessible keyboard navigation
// WHEN: Use to organize content into switchable sections (settings, categories, etc.)
// CHANGE STYLE: Modify the active underline color (accent) in TabsTrigger below
// CHANGE FONT: Edit the font-mono text-[10px] classes in TabsTrigger
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';
import {
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

/* ─── Context ──────────────────────────────────────── */

interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>');
  return ctx;
}

/* ─── Tabs Root ────────────────────────────────────── */

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

/** Root container for the tabbed interface. */
export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

/* ─── TabsList ─────────────────────────────────────── */

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

/** Container for tab triggers. Provides keyboard navigation. */
export function TabsList({ children, className }: TabsListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const list = listRef.current;
    if (!list) return;

    const triggers = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const currentIndex = triggers.findIndex(t => t === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex: number | undefined;

    // WHY: Arrow keys cycle through tabs per WAI-ARIA Tabs pattern
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = triggers.length - 1;
    }

    if (nextIndex !== undefined) {
      e.preventDefault();
      const target = triggers[nextIndex];
      if (target) {
        target.focus();
        target.click();
      }
    }
  }, []);

  return (
    <div
      ref={listRef}
      role="tablist"
      tabIndex={-1}
      className={cn('border-border flex gap-0 border-b', className)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

/* ─── TabsTrigger ──────────────────────────────────── */

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

/** A single tab trigger button. */
export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { activeValue, setActiveValue } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        'relative px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300',
        isActive ? 'text-accent' : 'text-muted hover:text-fg',
        className,
      )}
      onClick={() => setActiveValue(value)}
    >
      {children}
      {isActive && (
        <span className="bg-accent absolute right-0 bottom-0 left-0 h-0.5 transition-all duration-300" />
      )}
    </button>
  );
}

/* ─── TabsContent ──────────────────────────────────── */

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

/** Panel content shown when its tab is active. */
export function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeValue } = useTabsContext();
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn('pt-4', className)}
    >
      {children}
    </div>
  );
}
