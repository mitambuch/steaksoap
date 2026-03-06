// ═══════════════════════════════════════════════════
// Tooltip — hover/focus information popup
//
// WHAT: Displays additional context on hover or focus
// WHEN: Use for icons, truncated text, or actions needing explanation
// CHANGE COLORS: Edit design tokens in src/index.css
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const positionStyles: Record<NonNullable<TooltipProps['position']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/** Tooltip that appears on hover and focus. */
export const Tooltip = ({ content, children, position = 'top', className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  // WHY: aria-describedby must be on the interactive element, not a wrapper div.
  // cloneElement injects the attribute directly onto the child (e.g. <button>).
  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        'aria-describedby': isVisible ? tooltipId : undefined,
      })
    : children;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {child}
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'text-accent bg-surface absolute z-50 rounded-md px-2.5 py-1.5 text-xs whitespace-nowrap',
            'pointer-events-none',
            positionStyles[position],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
