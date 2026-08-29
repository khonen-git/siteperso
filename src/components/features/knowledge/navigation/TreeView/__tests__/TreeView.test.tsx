import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TreeView } from '..';

const mockItems = [
  {
    title: 'Parent',
    children: [
      { title: 'Child 1', href: '/child1' },
      { title: 'Child 2', href: '/child2' },
    ],
  },
];

jest.mock('@/i18n/navigation', () => ({
  usePathname: () => '/child1',
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('TreeView', () => {
  it('renders tree items correctly', () => {
    render(<TreeView items={mockItems} />);
    expect(screen.getByText('Parent')).toBeInTheDocument();
  });

  it('expands/collapses on click', () => {
    render(<TreeView items={mockItems} />);
    const button = screen.getByRole('button');
    const parentGroup = screen.getAllByRole('group')[0];

    expect(parentGroup).not.toHaveClass('hidden');
    expect(screen.getByText('Child 1')).toBeInTheDocument();

    fireEvent.click(button);
    expect(parentGroup).toHaveClass('hidden');

    fireEvent.click(button);
    expect(parentGroup).not.toHaveClass('hidden');
  });

  it('highlights active item', () => {
    render(<TreeView items={mockItems} />);
    const activeLink = screen.getByText('Child 1').closest('a');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });
});
