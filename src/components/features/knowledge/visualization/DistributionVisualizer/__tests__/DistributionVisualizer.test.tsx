import React from 'react';
import { renderWithProviders } from '@/components/common/test-utils';
import { DistributionVisualizer } from '..';

const mockDistribution = {
  name: 'Normal',
  range: { min: -3, max: 3 },
  parameters: { mean: 0, std: 1 },
  pdf: (x: number) => Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI),
  cdf: (x: number) => 0.5 * (1 + Math.erf(x / Math.sqrt(2)))
};

describe('DistributionVisualizer', () => {
  it('renders all components', () => {
    const { getByRole } = renderWithProviders(
      <DistributionVisualizer distribution={mockDistribution} />
    );

    expect(getByRole('complementary')).toBeInTheDocument(); // Plot
    expect(getByRole('region', { name: /calculator/i })).toBeInTheDocument();
    expect(getByRole('region', { name: /presets/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithProviders(
      <DistributionVisualizer 
        distribution={mockDistribution} 
        className="test-class" 
      />
    );

    expect(container.firstChild).toHaveClass('test-class');
  });

  it('updates on parameter changes', () => {
    const { rerender, getByText } = renderWithProviders(
      <DistributionVisualizer distribution={mockDistribution} />
    );

    const updatedDistribution = {
      ...mockDistribution,
      parameters: { mean: 1, std: 2 }
    };

    rerender(<DistributionVisualizer distribution={updatedDistribution} />);
    expect(getByText(/mean: 1/i)).toBeInTheDocument();
  });
});