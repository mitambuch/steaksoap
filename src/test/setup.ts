/* ═══════════════════════════════════════════════════════════════
   TEST SETUP — loaded before every test file.
   Adds DOM-specific matchers (toBeVisible, toHaveTextContent…).
   ═══════════════════════════════════════════════════════════════ */

import '@testing-library/jest-dom/vitest';

import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

// WHY: jsdom doesn't implement matchMedia — components using useMediaQuery need this mock.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// WHY: jsdom doesn't implement IntersectionObserver — useInView and scroll animations need this mock.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});
