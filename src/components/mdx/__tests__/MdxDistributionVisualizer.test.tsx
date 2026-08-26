import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MdxDistributionVisualizer } from '../MdxDistributionVisualizer';
import { normalDistribution } from '@/lib/distributions/normal';

jest.mock('@/components/features/knowledge/visualization/DistributionVisualizer', () => ({
  DistributionVisualizer: jest.fn(() => <div data-testid="distribution-visualizer" />),
}));

jest.mock('@/components/features/knowledge/visualization/PresetManager', () => ({
  PresetManager: jest.fn(() => <div data-testid="preset-manager" />),
}));

describe('MdxDistributionVisualizer', () => {
  it('renders the visualizer', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} />);
    expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();
  });

  it('hides presets by default', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} />);
    expect(screen.queryByTestId('preset-manager')).not.toBeInTheDocument();
  });

  it('shows presets when showPresets is true', () => {
    render(
      <MdxDistributionVisualizer
        distribution={normalDistribution}
        showPresets={true}
      />
    );
    expect(screen.getByTestId('preset-manager')).toBeInTheDocument();
  });

  it('applies base wrapper classes', () => {
    const { container } = render(
      <MdxDistributionVisualizer distribution={normalDistribution} />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-8', 'space-y-6');
  });

  it('applies preset container classes', () => {
    render(
      <MdxDistributionVisualizer
        distribution={normalDistribution}
        showPresets={true}
      />
    );

    const presetContainer = screen.getByRole('heading', {
      name: /presets/i,
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
    it('keeps state across rerenders', () => {
      const { rerender } = render(
        <MdxDistributionVisualizer distribution={normalDistribution} />
      );

      expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();

      rerender(<MdxDistributionVisualizer distribution={normalDistribution} />);
      expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders quickly', () => {
      const start = performance.now();

      render(<MdxDistributionVisualizer distribution={normalDistribution} />);

      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });

    it('handles updates efficiently', () => {
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
      expect(end - start).toBeLessThan(50);
    });
  });
});
