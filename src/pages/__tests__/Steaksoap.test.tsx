import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import Steaksoap from '../Steaksoap';

afterEach(cleanup);

function renderSteaksoap() {
  return render(
    <MemoryRouter>
      <Steaksoap />
    </MemoryRouter>,
  );
}

describe('Steaksoap', () => {
  it('renders without crashing', () => {
    expect(() => renderSteaksoap()).not.toThrow();
  });

  it('renders the hero heading', () => {
    renderSteaksoap();
    expect(screen.getByText(/100% free/i)).toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    renderSteaksoap();
    const links = screen.getAllByRole('link', { name: /view on github/i });
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders all five section labels', () => {
    renderSteaksoap();
    expect(screen.getByText('// features')).toBeInTheDocument();
    expect(screen.getByText('// ai workflow')).toBeInTheDocument();
    expect(screen.getByText('// extensions')).toBeInTheDocument();
    expect(screen.getByText('// why free')).toBeInTheDocument();
    expect(screen.getByText('// get started')).toBeInTheDocument();
  });

  it('renders the FAQ accordion', () => {
    renderSteaksoap();
    expect(screen.getByText('Why is it free?')).toBeInTheDocument();
    expect(screen.getByText("What's the catch?")).toBeInTheDocument();
  });

  it('renders the stat boxes', () => {
    renderSteaksoap();
    expect(screen.getByText('22')).toBeInTheDocument();
    expect(screen.getByText('commands')).toBeInTheDocument();
  });

  it('opens the setup wizard on button click', async () => {
    const user = userEvent.setup();
    renderSteaksoap();
    const button = screen.getAllByRole('button', { name: /start the guided setup/i }).at(0);
    expect(button).toBeDefined();
    if (button) await user.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens the setup wizard via custom event', () => {
    renderSteaksoap();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new Event('open-setup-wizard'));
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the version badge', () => {
    renderSteaksoap();
    expect(screen.getByText(/^v/)).toBeInTheDocument();
  });

  it('has copy buttons for quick start commands', () => {
    renderSteaksoap();
    const copyButtons = screen.getAllByRole('button', { name: /copy:/i });
    expect(copyButtons.length).toBeGreaterThan(0);
  });
});
