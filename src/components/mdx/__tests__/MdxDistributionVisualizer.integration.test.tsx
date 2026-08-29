import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MDXProvider } from '@mdx-js/react';
import { MdxDistributionVisualizer } from '../MdxDistributionVisualizer';
import { normalDistribution } from '@/lib/distributions/normal';
import { useDistributionStore } from '@/store/distributionStore';
import type { Curve } from '@/hooks/useDistributionCalculator';

function TestMdxContent() {
  return (
    <MDXProvider>
      <div>
        <h1>Normal Distribution Test</h1>
        <p>Normal distribution description</p>
        <MdxDistributionVisualizer distribution={normalDistribution} showPresets={true} />
      </div>
    </MDXProvider>
  );
}

const sampleCurve: Curve = {
  id: '1',
  distributionName: 'normal',
  params: { mu: 0, sigma: 1 },
};

describe('MdxDistributionVisualizer Integration', () => {
  beforeEach(() => {
    const store = useDistributionStore.getState();
    act(() => {
      store.setCurves([]);
      store.setFunctionType('pdf');
    });
  });

  it('integrates in an MDX-like context', () => {
    render(<TestMdxContent />);

    expect(screen.getByText('Normal Distribution Test')).toBeInTheDocument();
    expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();
  });

  it('keeps store state across MDX navigation rerenders', () => {
    const { rerender } = render(<TestMdxContent />);

    const store = useDistributionStore.getState();
    act(() => {
      store.addCurve(sampleCurve);
    });

    rerender(<TestMdxContent />);

    expect(store.curves).toHaveLength(1);
    expect(store.curves[0].params).toEqual({ mu: 0, sigma: 1 });
  });

  it('handles preset interactions', async () => {
    render(<TestMdxContent />);

    const input = screen.getByPlaceholderText('Nom du preset');
    const saveButton = screen.getByText('Sauvegarder');

    fireEvent.change(input, { target: { value: 'My Preset' } });
    fireEvent.click(saveButton);

    const store = useDistributionStore.getState();
    expect(store.presets).toHaveLength(1);
    expect(store.presets[0].name).toBe('My Preset');
  });

  it('exposes distribution math functions on the store', () => {
    render(<TestMdxContent />);

    const store = useDistributionStore.getState();
    expect(store.activeDistribution).toBeDefined();
    expect(typeof store.activeDistribution?.functions.pdf).toBe('function');
    expect(typeof store.activeDistribution?.functions.cdf).toBe('function');
  });

  describe('Performance in MDX context', () => {
    it('stays fast across repeated updates', () => {
      const { rerender } = render(<TestMdxContent />);

      const start = performance.now();

      for (let i = 0; i < 10; i++) {
        act(() => {
          const store = useDistributionStore.getState();
          store.setFunctionType(i % 2 === 0 ? 'pdf' : 'cdf');
        });
        rerender(<TestMdxContent />);
      }

      const end = performance.now();
      const averageUpdateTime = (end - start) / 10;

      expect(averageUpdateTime).toBeLessThan(50);
    });
  });
});
