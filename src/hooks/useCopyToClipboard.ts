import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCopyToClipboardReturn {
  /** Copy text to the clipboard. Returns `true` on success. */
  copy: (text: string) => Promise<boolean>;
  /** `true` for 2 seconds after a successful copy. */
  copied: boolean;
}

/**
 * Copy text to the clipboard with a temporary "copied" indicator.
 *
 * @example
 * const { copy, copied } = useCopyToClipboard();
 * <button onClick={() => copy('hello')}>{copied ? 'Copied!' : 'Copy'}</button>
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);

      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, []);

  return { copy, copied };
}
