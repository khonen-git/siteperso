import { act, renderHook } from '@testing-library/react';
import { useDistributionStore } from '../distributionStore';
import { normalDistribution } from '@/lib/distributions/normal';
import type { Curve } from '@/hooks/useDistributionCalculator';

const sampleCurve: Curve = {
  id: '1',
  distributionName: 'normal',
  params: { mu: 0, sigma: 1 },
  color: '#000000',
};

describe('distributionStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useDistributionStore());
    act(() => {
      result.current.setCurves([]);
      result.current.setActiveDistribution(null);
      result.current.setFunctionType('pdf');
      result.current.presets.forEach((preset) => {
        result.current.removePreset(preset.id);
      });
    });
  });

  it('sets the active distribution', () => {
    const { result } = renderHook(() => useDistributionStore());

    act(() => {
      result.current.setActiveDistribution(normalDistribution);
    });

    expect(result.current.activeDistribution).toBe(normalDistribution);
  });

  it('adds and removes curves', () => {
    const { result } = renderHook(() => useDistributionStore());

    act(() => {
      result.current.addCurve(sampleCurve);
    });

    expect(result.current.curves).toHaveLength(1);
    expect(result.current.curves[0]).toEqual(sampleCurve);

    act(() => {
      result.current.removeCurve('1');
    });

    expect(result.current.curves).toHaveLength(0);
  });

  it('updates curve parameters', () => {
    const { result } = renderHook(() => useDistributionStore());

    act(() => {
      result.current.addCurve(sampleCurve);
      result.current.updateCurve('1', { mu: 1, sigma: 2 });
    });

    expect(result.current.curves[0].params).toEqual({ mu: 1, sigma: 2 });
    expect(result.current.curves[0].distributionName).toBe('normal');
  });

  it('sets the function type', () => {
    const { result } = renderHook(() => useDistributionStore());

    act(() => {
      result.current.setFunctionType('cdf');
    });

    expect(result.current.functionType).toBe('cdf');
  });

  describe('presets', () => {
    it('saves and loads presets', () => {
      const { result } = renderHook(() => useDistributionStore());

      act(() => {
        result.current.addCurve(sampleCurve);
        result.current.setFunctionType('pdf');
        result.current.savePreset('Test Preset');
      });

      const presetId = result.current.presets[0].id;

      act(() => {
        result.current.setCurves([]);
        result.current.setFunctionType('cdf');
        result.current.loadPreset(presetId);
      });

      expect(result.current.curves).toEqual([sampleCurve]);
      expect(result.current.functionType).toBe('pdf');
    });

    it('removes presets', () => {
      const { result } = renderHook(() => useDistributionStore());

      act(() => {
        result.current.savePreset('Test Preset');
      });

      const presetId = result.current.presets[0].id;

      act(() => {
        result.current.removePreset(presetId);
      });

      expect(result.current.presets).toHaveLength(0);
    });
  });
});
