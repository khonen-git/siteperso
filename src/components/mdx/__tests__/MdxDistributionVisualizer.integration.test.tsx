import { render, screen, fireEvent, act } from '@testing-library/react';
import { MDXProvider } from '@mdx-js/react';
import { MdxDistributionVisualizer } from '../MdxDistributionVisualizer';
import { normalDistribution } from '@/lib/distributions/normal';
import { useDistributionStore } from '@/store/distributionStore';

// Composant de test qui simule un fichier MDX
function TestMdxContent() {
  return (
    <MDXProvider>
      <div>
        <h1>Test de la Loi Normale</h1>
        <p>Description de la loi normale</p>
        <MdxDistributionVisualizer 
          distribution={normalDistribution} 
          showPresets={true} 
        />
      </div>
    </MDXProvider>
  );
}

describe('MdxDistributionVisualizer Integration', () => {
  beforeEach(() => {
    // Réinitialiser le store avant chaque test
    const store = useDistributionStore.getState();
    act(() => {
      store.setCurves([]);
      store.setFunctionType('pdf');
    });
  });

  it('s\'intègre correctement dans le contexte MDX', () => {
    render(<TestMdxContent />);
    
    // Vérifier que le composant est rendu dans le contexte MDX
    expect(screen.getByText('Test de la Loi Normale')).toBeInTheDocument();
    expect(screen.getByTestId('distribution-visualizer')).toBeInTheDocument();
  });

  it('maintient l\'état lors de la navigation MDX', () => {
    const { rerender } = render(<TestMdxContent />);
    
    // Ajouter une courbe
    const store = useDistributionStore.getState();
    act(() => {
      store.addCurve({ id: '1', params: { mu: 0, sigma: 1 } });
    });
    
    // Simuler une navigation MDX
    rerender(<TestMdxContent />);
    
    // Vérifier que l'état est maintenu
    expect(store.curves).toHaveLength(1);
    expect(store.curves[0].params).toEqual({ mu: 0, sigma: 1 });
  });

  it('gère correctement les interactions utilisateur', async () => {
    render(<TestMdxContent />);
    
    // Ajouter un preset
    const input = screen.getByPlaceholderText('Nom du preset');
    const saveButton = screen.getByText('Sauvegarder');
    
    fireEvent.change(input, { target: { value: 'Mon Preset' } });
    fireEvent.click(saveButton);
    
    // Vérifier que le preset est sauvegardé
    const store = useDistributionStore.getState();
    expect(store.presets).toHaveLength(1);
    expect(store.presets[0].name).toBe('Mon Preset');
  });

  it('charge correctement les ressources mathématiques', () => {
    render(<TestMdxContent />);
    
    // Vérifier que les fonctions mathématiques sont disponibles
    const store = useDistributionStore.getState();
    expect(store.activeDistribution).toBeDefined();
    expect(typeof store.activeDistribution?.functions.pdf).toBe('function');
    expect(typeof store.activeDistribution?.functions.cdf).toBe('function');
  });

  describe('Performance dans le contexte MDX', () => {
    it('maintient de bonnes performances lors des mises à jour', () => {
      const { rerender } = render(<TestMdxContent />);
      
      const start = performance.now();
      
      // Simuler plusieurs mises à jour
      for (let i = 0; i < 10; i++) {
        act(() => {
          const store = useDistributionStore.getState();
          store.setFunctionType(i % 2 === 0 ? 'pdf' : 'cdf');
        });
        rerender(<TestMdxContent />);
      }
      
      const end = performance.now();
      const averageUpdateTime = (end - start) / 10;
      
      expect(averageUpdateTime).toBeLessThan(50); // Moins de 50ms par mise à jour
    });
  });
}); 