import { render, screen, fireEvent } from '@testing-library/react';
import { MdxDistributionVisualizer } from '../MdxDistributionVisualizer';
import { normalDistribution } from '@/lib/distributions/normal';

// Mock des composants enfants
jest.mock('@/components/features/knowledge/visualization/DistributionVisualizer', () => ({
  DistributionVisualizer: jest.fn(() => <div data-testid="distribution-visualizer" />)
}));

jest.mock('@/components/features/knowledge/visualization/PresetManager', () => ({
  PresetManager: jest.fn(() => <div data-testid="preset-manager" />)
}));

describe('MdxDistributionVisualizer', () => {
  it('rend correctement le visualisateur', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} />);
    expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();
  });

  it('ne montre pas les presets par défaut', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} />);
    expect(screen.queryByTestId('preset-manager')).not.toBeInTheDocument();
  });

  it('montre les presets quand showPresets est true', () => {
    render(
      <MdxDistributionVisualizer 
        distribution={normalDistribution} 
        showPresets={true} 
      />
    );
    expect(screen.getByTestId('preset-manager')).toBeInTheDocument();
  });

  it('applique les styles de base correctement', () => {
    const { container } = render(
      <MdxDistributionVisualizer distribution={normalDistribution} />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-8', 'space-y-6');
  });

  it('applique les styles du conteneur de presets correctement', () => {
    render(
      <MdxDistributionVisualizer 
        distribution={normalDistribution} 
        showPresets={true} 
      />
    );
    
    const presetContainer = screen.getByRole('heading', { 
      name: /presets/i 
    }).parentElement;
    
    expect(presetContainer).toHaveClass(
      'mt-4',
      'p-4',
      'border',
      'rounded-lg',
      'bg-gray-50'
    );
  });

  describe('Hydration', () => {
    it('maintient l\'état entre les re-rendus', () => {
      const { rerender } = render(
        <MdxDistributionVisualizer distribution={normalDistribution} />
      );

      // Premier rendu
      expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();

      // Re-rendu
      rerender(<MdxDistributionVisualizer distribution={normalDistribution} />);
      expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('se charge rapidement', () => {
      const start = performance.now();
      
      render(<MdxDistributionVisualizer distribution={normalDistribution} />);
      
      const end = performance.now();
      expect(end - start).toBeLessThan(100); // Moins de 100ms pour le rendu initial
    });

    it('gère efficacement les mises à jour', () => {
      const { rerender } = render(
        <MdxDistributionVisualizer distribution={normalDistribution} />
      );

      const start = performance.now();
      
      rerender(
        <MdxDistributionVisualizer 
          distribution={normalDistribution} 
          showPresets={true} 
        />
      );
      
      const end = performance.now();
      expect(end - start).toBeLessThan(50); // Moins de 50ms pour les mises à jour
    });
  });
}); 