import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DistributionConfig } from '@/types/distributions';
import { Curve } from '@/hooks/useDistributionCalculator';

interface PresetConfig {
  id: string;
  name: string;
  curves: Curve[];
  functionType: 'pdf' | 'cdf';
}

interface DistributionState {
  activeDistribution: DistributionConfig | null;
  curves: Curve[];
  functionType: 'pdf' | 'cdf';
  presets: PresetConfig[];
  setActiveDistribution: (distribution: DistributionConfig) => void;
  setCurves: (curves: Curve[]) => void;
  setFunctionType: (type: 'pdf' | 'cdf') => void;
  addCurve: (curve: Curve) => void;
  removeCurve: (id: string) => void;
  updateCurve: (id: string, params: Record<string, number>) => void;
  savePreset: (name: string) => void;
  loadPreset: (id: string) => void;
  removePreset: (id: string) => void;
}

export const useDistributionStore = create<DistributionState>()(
  persist(
    (set: (fn: (state: DistributionState) => Partial<DistributionState>) => void) => ({
      activeDistribution: null,
      curves: [],
      functionType: 'pdf',
      presets: [],

      setActiveDistribution: (distribution: DistributionConfig) => 
        set(() => ({ activeDistribution: distribution })),
      
      setCurves: (curves: Curve[]) => 
        set(() => ({ curves })),
      
      setFunctionType: (type: 'pdf' | 'cdf') => 
        set(() => ({ functionType: type })),
      
      addCurve: (curve: Curve) => 
        set((state: DistributionState) => ({
          curves: [...state.curves, curve]
        })),
      
      removeCurve: (id: string) => 
        set((state: DistributionState) => ({
          curves: state.curves.filter((c: Curve) => c.id !== id)
        })),
      
      updateCurve: (id: string, params: Record<string, number>) => 
        set((state: DistributionState) => ({
          curves: state.curves.map((c: Curve) => 
            c.id === id ? { ...c, params } : c
          )
        })),
      
      savePreset: (name: string) => 
        set((state: DistributionState) => {
          const newPreset: PresetConfig = {
            id: crypto.randomUUID(),
            name,
            curves: state.curves,
            functionType: state.functionType
          };
          return {
            presets: [...state.presets, newPreset]
          };
        }),
      
      loadPreset: (id: string) => 
        set((state: DistributionState) => {
          const preset = state.presets.find((p: PresetConfig) => p.id === id);
          if (!preset) return state;
          return {
            curves: preset.curves,
            functionType: preset.functionType
          };
        }),
      
      removePreset: (id: string) => 
        set((state: DistributionState) => ({
          presets: state.presets.filter((p: PresetConfig) => p.id !== id)
        }))
    }),
    {
      name: 'distribution-store',
      version: 1,
    }
  )
); 