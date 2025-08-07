import { render, screen } from '@testing-library/react';
import { BackButton } from '..';

const mockProps = {
  href: '/test',
  label: 'Back to Test'
};

describe('BackButton', () => {
  it('renders with correct label and href', () => {
    render(<BackButton {...mockProps} />);
    
    const link = screen.getByRole('link', { name: mockProps.label });
    expect(link).toHaveAttribute('href', mockProps.href);
  });

  it('renders arrow icon', () => {
    render(<BackButton {...mockProps} />);
    
    // Vérifie que l'icône est présente
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <BackButton {...mockProps} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('maintains button styling', () => {
    render(<BackButton {...mockProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});