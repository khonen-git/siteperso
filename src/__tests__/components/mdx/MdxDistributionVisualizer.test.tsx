import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MdxDistributionVisualizer } from '@/components/mdx/MdxDistributionVisualizer';
import { normalDistribution } from '@/lib/distributions/normal';
import { useDistributionStore } from '@/store/distributionStore';
import type { Curve } from '@/hooks/useDistributionCalculator';

jest.mock('@/components/features/knowledge/visualization/DistributionVisualizer', () => ({
  DistributionVisualizer: () => (
    <div data-testid="distribution-visualizer">
      <div data-testid="distribution-plot" />
      <div data-testid="curve-calculator" />
      <div data-testid="embedded-preset-manager" />
    </div>
  ),
}));

const sampleCurve: Curve = {
  id: '1',
  distributionName: 'normal',
  params: { mu: 0, sigma: 1 },
};

describe('MdxDistributionVisualizer', () => {
  beforeEach(() => {
    act(() => {
      const store = useDistributionStore.getState();
      store.setCurves([]);
      store.setFunctionType('pdf');
      store.presets.forEach((preset) => store.removePreset(preset.id));
    });
  });

  it('renders the distribution visualizer shell', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} />);

    expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('distribution-plot')).toBeInTheDocument();
    expect(screen.getByTestId('curve-calculator')).toBeInTheDocument();
  });

  it('does not render the optional MDX preset panel by default', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} />);
    expect(screen.queryByRole('heading', { name: /^presets$/i })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Nom du preset')).not.toBeInTheDocument();
  });

  it('renders the optional MDX preset panel when showPresets is true', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} showPresets={true} />);
    expect(screen.getByRole('heading', { name: /^presets$/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nom du preset')).toBeInTheDocument();
  });

  it('persists presets through the shared store', () => {
    render(<MdxDistributionVisualizer distribution={normalDistribution} showPresets={true} />);

    act(() => {
      useDistributionStore.getState().addCurve(sampleCurve);
    });

    const input = screen.getByPlaceholderText('Nom du preset');
    fireEvent.change(input, { target: { value: 'Normal preset' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sauvegarder' }));

    expect(useDistributionStore.getState().presets).toHaveLength(1);
    expect(useDistributionStore.getState().presets[0].name).toBe('Normal preset');
  });
});
