import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs';

function renderTabs() {
  return render(
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">First</TabsTrigger>
        <TabsTrigger value="two">Second</TabsTrigger>
        <TabsTrigger value="three">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content 1</TabsContent>
      <TabsContent value="two">Content 2</TabsContent>
      <TabsContent value="three">Content 3</TabsContent>
    </Tabs>,
  );
}

describe('Tabs', () => {
  it('renders default tab content', () => {
    renderTabs();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByText('Second'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup();
    renderTabs();

    const firstTab = screen.getByText('First');
    firstTab.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Content 3')).toBeInTheDocument();

    // WHY: Arrow right from last tab wraps to first
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('navigates with arrow left and wraps', async () => {
    const user = userEvent.setup();
    renderTabs();

    const firstTab = screen.getByText('First');
    firstTab.focus();

    // WHY: Arrow left from first tab wraps to last
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('Content 3')).toBeInTheDocument();
  });

  it('has correct ARIA roles', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('sets aria-selected on active tab', async () => {
    const user = userEvent.setup();
    renderTabs();

    expect(screen.getByText('First')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Second')).toHaveAttribute('aria-selected', 'false');

    await user.click(screen.getByText('Second'));
    expect(screen.getByText('First')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('Second')).toHaveAttribute('aria-selected', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderTabs();
    expect(await axe(container)).toHaveNoViolations();
  });
});
