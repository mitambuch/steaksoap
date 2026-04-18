import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { LocaleProvider, useLocale } from '../LocaleProvider';

function Probe() {
  const { locale, setLocale, localePath } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="path">{localePath('/playground')}</span>
      <button type="button" onClick={() => setLocale('de')}>
        Switch DE
      </button>
    </div>
  );
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path=":locale/*"
          element={
            <LocaleProvider>
              <Probe />
            </LocaleProvider>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LocaleProvider', () => {
  it('exposes the URL :locale param via useLocale', () => {
    renderAt('/en');
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('localePath prefixes with the active locale', () => {
    renderAt('/de');
    expect(screen.getByTestId('path')).toHaveTextContent('/de/playground');
  });

  it('syncs document.documentElement.lang with the active locale', () => {
    renderAt('/en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('setLocale navigates to the same path under the new locale', async () => {
    const user = userEvent.setup();
    renderAt('/fr');
    await user.click(screen.getByRole('button', { name: /Switch DE/i }));
    expect(screen.getByTestId('locale')).toHaveTextContent('de');
  });

  it('useLocale without a provider falls back to the default locale', () => {
    render(
      <MemoryRouter>
        <Probe />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('fr');
  });
});
