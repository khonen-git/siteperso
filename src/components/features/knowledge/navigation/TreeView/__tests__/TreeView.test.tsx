import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TreeView } from '..';

const mockItems = [
  {
    title: "Parent",
    children: [
      { title: "Child 1", href: "/child1" },
      { title: "Child 2", href: "/child2" }
    ]
  }
];

jest.mock('next/navigation', () => ({
  usePathname: () => '/child1'
}));

describe('TreeView', () => {
  it('renders tree items correctly', () => {
    render(<TreeView items={mockItems} />);
    expect(screen.getByText('Parent')).toBeInTheDocument();
  });

  it('expands/collapses on click', () => {
    render(<TreeView items={mockItems} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.queryByText('Child 1')).not.toBeVisible();
  });

  it('highlights active item', () => {
    render(<TreeView items={mockItems} />);
    const activeLink = screen.getByText('Child 1').closest('a');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });
});