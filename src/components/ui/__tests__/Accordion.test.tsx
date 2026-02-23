import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../Accordion';

describe('Accordion', () => {
  it('toggles content visibility on click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Question</AccordionTrigger>
          <AccordionContent>Answer</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: /question/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes others in single mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single">
        <AccordionItem value="a">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: /first/i }));
    expect(screen.getByRole('button', { name: /first/i })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: /second/i }));
    expect(screen.getByRole('button', { name: /first/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByRole('button', { name: /second/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('allows multiple open in multiple mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple">
        <AccordionItem value="a">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: /first/i }));
    await user.click(screen.getByRole('button', { name: /second/i }));

    expect(screen.getByRole('button', { name: /first/i })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /second/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('respects defaultOpen', () => {
    render(
      <Accordion defaultOpen="a">
        <AccordionItem value="a">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole('button', { name: /first/i })).toHaveAttribute('aria-expanded', 'true');
  });
});
