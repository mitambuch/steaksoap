/* ═══════════════════════════════════════════════════════════════
   cn() — merge de classes Tailwind sans conflit
   Utilise clsx (concaténation conditionnelle) + tailwind-merge (résolution des conflits).
   Usage : className={cn('px-4', condition && 'px-8', props.className)}
   ═══════════════════════════════════════════════════════════════ */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
