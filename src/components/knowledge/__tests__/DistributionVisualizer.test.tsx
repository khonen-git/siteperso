import { render, screen, fireEvent } from '@testing-library/react';
import { DistributionVisualizer } from '../DistributionVisualizer';
import { normalDistribution } from '@/lib/distributions/normal';

// Mock Recharts pour éviter les erreurs de rendu
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />
}));

declare global {
  namespace NodeJS {
    interface Global {
      innerWidth: number;
      innerHeight: number;
      originalInnerWidth: number;
      originalInnerHeight: number;
    }
  }
}

// Fonction utilitaire pour simuler différentes tailles d'écran
const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

describe('DistributionVisualizer', () => {
  let originalWidth: number;
  let originalHeight: number;

  beforeAll(() => {
    originalWidth = window.innerWidth;
    originalHeight = window.innerHeight;
  });

  afterAll(() => {
    window.innerWidth = originalWidth;
    window.innerHeight = originalHeight;
    window.dispatchEvent(new Event('resize'));
  });

  it('renders with correct layout structure', () => {
    const { container } = render(<DistributionVisualizer distribution={normalDistribution} />);
    
    // Vérifier la structure de base
    expect(container.querySelector('.lg\\:w-1\\/3')).toBeTruthy(); // Panneau de contrôle
    expect(container.querySelector('.lg\\:w-2\\/3')).toBeTruthy(); // Zone de visualisation
  });

  it('renders the graph components correctly', () => {
    render(<DistributionVisualizer distribution={normalDistribution} />);
    
    // Vérifier la présence des composants du graphique
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  it('handles curve management correctly', () => {
    render(<DistributionVisualizer distribution={normalDistribution} />);
    
    // Vérifier la présence d'une courbe initiale
    expect(screen.getByText('Courbe 1')).toBeInTheDocument();
    
    // Ajouter une nouvelle courbe
    const addButton = screen.getByRole('button', { name: /plus/i });
    fireEvent.click(addButton);
    expect(screen.getByText('Courbe 2')).toBeInTheDocument();
    
    // Vérifier la limite de 5 courbes
    for (let i = 0; i < 4; i++) {
      fireEvent.click(addButton);
    }
    expect(screen.queryByText('Courbe 6')).not.toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it('updates parameters correctly', () => {
    render(<DistributionVisualizer distribution={normalDistribution} />);
    
    // Vérifier la présence des paramètres
    normalDistribution.parameters.forEach(param => {
      expect(screen.getByText(param.label)).toBeInTheDocument();
    });
    
    // Vérifier que les valeurs par défaut sont affichées
    normalDistribution.parameters.forEach(param => {
      expect(screen.getByText(param.defaultValue.toFixed(2))).toBeInTheDocument();
    });
  });

  it('switches between PDF and CDF correctly', () => {
    render(<DistributionVisualizer distribution={normalDistribution} />);
    
    // Vérifier la présence du sélecteur
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    // Vérifier les options disponibles
    expect(screen.getByText('Densité de probabilité')).toBeInTheDocument();
    expect(screen.getByText('Fonction de répartition')).toBeInTheDocument();
    
    // Changer de fonction
    fireEvent.change(select, { target: { value: 'cdf' } });
    expect(select).toHaveValue('cdf');
  });

  // Test d'accessibilité
  it('meets accessibility requirements', () => {
    const { container } = render(<DistributionVisualizer distribution={normalDistribution} />);
    
    // Vérifier les rôles ARIA
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toBeTruthy();
    
    // Vérifier les labels
    const labels = screen.getAllByRole('label');
    expect(labels.length).toBeGreaterThan(0);
  });

  describe('Responsive Design', () => {
    it('adapts layout for mobile screens', () => {
      resizeWindow(375, 667); // iPhone SE
      const { container } = render(<DistributionVisualizer distribution={normalDistribution} />);
      
      const controlPanel = container.querySelector('.lg\\:w-1\\/3');
      const visualArea = container.querySelector('.lg\\:w-2\\/3');
      
      expect(controlPanel).toHaveClass('w-full');
      expect(visualArea).toHaveClass('w-full');
    });

    it('adapts layout for tablet screens', () => {
      resizeWindow(768, 1024); // iPad
      const { container } = render(<DistributionVisualizer distribution={normalDistribution} />);
      
      const controlPanel = container.querySelector('.lg\\:w-1\\/3');
      const visualArea = container.querySelector('.lg\\:w-2\\/3');
      
      expect(controlPanel).toHaveClass('md:w-1/2');
      expect(visualArea).toHaveClass('md:w-1/2');
    });

    it('maintains layout for desktop screens', () => {
      resizeWindow(1920, 1080); // Full HD
      const { container } = render(<DistributionVisualizer distribution={normalDistribution} />);
      
      const controlPanel = container.querySelector('.lg\\:w-1\\/3');
      const visualArea = container.querySelector('.lg\\:w-2\\/3');
      
      expect(controlPanel).toHaveClass('lg:w-1/3');
      expect(visualArea).toHaveClass('lg:w-2/3');
    });

    it('ensures minimum height for graph area', () => {
      const { container } = render(<DistributionVisualizer distribution={normalDistribution} />);
      const visualArea = container.querySelector('.lg\\:w-2\\/3');
      
      expect(visualArea).toHaveClass('min-h-[400px]');
    });
  });

  describe('Accessibility for Different Devices', () => {
    it('maintains touch targets for mobile', () => {
      resizeWindow(375, 667);
      render(<DistributionVisualizer distribution={normalDistribution} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const styles = window.getComputedStyle(button);
        const height = parseFloat(styles.height);
        expect(height).toBeGreaterThanOrEqual(44); // Minimum touch target size
      });
    });

    it('preserves keyboard navigation on all screen sizes', () => {
      const { container } = render(<DistributionVisualizer distribution={normalDistribution} />);
      
      const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      expect(focusableElements.length).toBeGreaterThan(0);
      
      focusableElements.forEach(element => {
        expect(element).toHaveAttribute('tabindex');
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA labels', () => {
      render(<DistributionVisualizer distribution={normalDistribution} />);
      
      // Vérifier les labels des boutons
      expect(screen.getByRole('button', { name: /plus/i })).toHaveAttribute('aria-label');
      
      // Vérifier les labels des paramètres
      normalDistribution.parameters.forEach(param => {
        expect(screen.getByLabelText(param.label)).toBeInTheDocument();
      });
    });

    it('maintains keyboard navigation', () => {
      render(<DistributionVisualizer distribution={normalDistribution} />);
      
      const interactiveElements = screen.getAllByRole('button');
      interactiveElements.forEach(element => {
        expect(element).toHaveAttribute('tabindex');
      });
    });
  });
}); 