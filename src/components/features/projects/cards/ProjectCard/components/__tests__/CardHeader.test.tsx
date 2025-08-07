import { render, screen } from '@testing-library/react';
import { ProjectCardHeader } from '../CardHeader';

const mockProps = {
  title: 'Test Project',
  tags: ['React', 'TypeScript']
};

describe('ProjectCardHeader', () => {
  it('renders title correctly', () => {
    render(<ProjectCardHeader {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
  });

  it('renders all tags', () => {
    render(<ProjectCardHeader {...mockProps} />);
    
    mockProps.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders arrow icon', () => {
    render(<ProjectCardHeader {...mockProps} />);
    
    // Vérifie que l'icône est présente (via le rôle SVG)
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});