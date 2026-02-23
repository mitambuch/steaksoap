/* ═══════════════════════════════════════════════════════════════
   Troubleshoot — collapsible "Something went wrong?" accordion.
   Closed by default so beginners aren't scared by a wall of problems.
   Opens on click to reveal the most common fixes for each step.
   ═══════════════════════════════════════════════════════════════ */

import { cn } from '@utils/cn';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TroubleshootProps {
  question: string;
  solutions: string[];
}

export function Troubleshoot({ question, solutions }: TroubleshootProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="text-muted hover:text-fg flex w-full items-center gap-2 py-2 text-left text-sm transition-colors"
        aria-expanded={isOpen}
      >
        <ChevronDown
          size={14}
          className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
        {question}
      </button>

      {isOpen && (
        <div className="bg-surface/30 mt-1 rounded-lg p-4">
          <ul className="space-y-2">
            {solutions.map(solution => (
              <li key={solution} className="text-muted flex gap-2 text-sm leading-relaxed">
                <span className="text-accent mt-1 shrink-0">&bull;</span>
                <span>{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
