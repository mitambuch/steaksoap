import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // App renders providers + router — should not throw
    expect(document.getElementById('root') ?? document.body).toBeTruthy();
  });

  it('renders the header navigation', async () => {
    render(<App />);
    // Header should be in the DOM after providers mount
    const nav = await screen.findByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders the toast container for notifications', async () => {
    render(<App />);
    const toastContainer = await screen.findByLabelText(/notifications/i);
    expect(toastContainer).toBeInTheDocument();
  });
});
