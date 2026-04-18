import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { LocaleRedirect } from '../LocaleRedirect';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<LocaleRedirect />} />
        <Route path="/playground" element={<LocaleRedirect />} />
        <Route path=":locale" element={<div data-testid="fr-home">FR HOME</div>} />
        <Route path=":locale/playground" element={<div data-testid="fr-playground">FR PLAY</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LocaleRedirect', () => {
  it('redirects / to /:locale landing', () => {
    renderAt('/');
    expect(screen.getByTestId('fr-home')).toBeInTheDocument();
  });

  it('preserves the path when redirecting (/playground → /:locale/playground)', () => {
    renderAt('/playground');
    expect(screen.getByTestId('fr-playground')).toBeInTheDocument();
  });
});
