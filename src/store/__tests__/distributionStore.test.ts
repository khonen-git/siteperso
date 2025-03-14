import { act, renderHook } from '@testing-library/react';
import { useDistributionStore } from '../distributionStore';
import { normalDistribution } from '@/lib/distributions/normal';

describe('distributionStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useDistributionStore());
    act(() => {
      result.current.setCurves([]);
      result.current.setActiveDistribution(null);
      result.current.setFunctionType('pdf');
    });
  });

  it('gère correctement la distribution active', () => {
    const { result } = renderHook(() => useDistributionStore());
    
    act(() => {
      result.current.setActiveDistribution(normalDistribution);
    });
    
    expect(result.current.activeDistribution).toBe(normalDistribution);
  });

  it('gère correctement les courbes', () => {
    const { result } = renderHook(() => useDistributionStore());
    const curve = { id: '1', params: { mu: 0, sigma: 1 } };
    
    act(() => {
      result.current.addCurve(curve);
    });
    
    expect(result.current.curves).toHaveLength(1);
    expect(result.current.curves[0]).toEqual(curve);
    
    act(() => {
      result.current.removeCurve('1');
    });
    
    expect(result.current.curves).toHaveLength(0);
  });

  it('met à jour correctement les paramètres des courbes', () => {
    const { result } = renderHook(() => useDistributionStore());
    const curve = { id: '1', params: { mu: 0, sigma: 1 } };
    
    act(() => {
      result.current.addCurve(curve);
      result.current.updateCurve('1', { mu: 1, sigma: 2 });
    });
    
    expect(result.current.curves[0].params).toEqual({ mu: 1, sigma: 2 });
  });

  it('gère correctement le type de fonction', () => {
    const { result } = renderHook(() => useDistributionStore());
    
    act(() => {
      result.current.setFunctionType('cdf');
    });
    
    expect(result.current.functionType).toBe('cdf');
  });

  describe('Gestion des presets', () => {
    it('sauvegarde et charge correctement les presets', () => {
      const { result } = renderHook(() => useDistributionStore());
      const curve = { id: '1', params: { mu: 0, sigma: 1 } };
      
      act(() => {
        result.current.addCurve(curve);
        result.current.setFunctionType('pdf');
        result.current.savePreset('Test Preset');
      });
      
      const presetId = result.current.presets[0].id;
      
      act(() => {
        result.current.setCurves([]);
        result.current.setFunctionType('cdf');
        result.current.loadPreset(presetId);
      });
      
      expect(result.current.curves).toEqual([curve]);
      expect(result.current.functionType).toBe('pdf');
    });

    it('supprime correctement les presets', () => {
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

  describe('Persistance', () => {
    it('persiste les données entre les sessions', () => {
      const { result, rerender } = renderHook(() => useDistributionStore());
      const curve = { id: '1', params: { mu: 0, sigma: 1 } };
      
      act(() => {
        result.current.addCurve(curve);
        result.current.setFunctionType('cdf');
      });
      
      // Simuler un rechargement de page
      rerender();
      
      expect(result.current.curves).toEqual([curve]);
      expect(result.current.functionType).toBe('cdf');
    });
  });
}); 