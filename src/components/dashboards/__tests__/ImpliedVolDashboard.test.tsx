import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ImpliedVolDashboard } from '@/components/dashboards/ImpliedVolDashboard';
import { ImpliedVolStatusBar } from '@/components/dashboards/ImpliedVolStatusBar';
import { ImpliedVolChainPanel } from '@/components/dashboards/ImpliedVolChainPanel';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

const mockReplace = jest.fn();

function renderWithProviders(ui: React.ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
}

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => '/dashboards/implied-vol',
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string, values?: Record<string, string | number>) => {
    if (values) {
      return `${key}:${JSON.stringify(values)}`;
    }
    return key;
  },
}));

jest.mock('@/components/ui/tabs', () => {
  const React = require('react') as typeof import('react');
  const TabsContext = React.createContext<{
    value: string;
    onValueChange?: (value: string) => void;
  }>({ value: 'smile' });

  const Tabs = ({
    value,
    onValueChange,
    children,
    className,
  }: {
    value: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
  }) => (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );

  const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div role="tablist" className={className}>
      {children}
    </div>
  );

  const TabsTrigger = ({
    value: tabValue,
    children,
    className,
  }: {
    value: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const { value, onValueChange } = React.useContext(TabsContext);
    return (
      <button
        type="button"
        role="tab"
        className={className}
        aria-selected={value === tabValue}
        data-state={value === tabValue ? 'active' : 'inactive'}
        onClick={() => onValueChange?.(tabValue)}
      >
        {children}
      </button>
    );
  };

  const TabsContent = ({
    value: tabValue,
    children,
    className,
  }: {
    value: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const { value } = React.useContext(TabsContext);
    if (value !== tabValue) return null;
    return (
      <div role="tabpanel" className={className}>
        {children}
      </div>
    );
  };

  return { Tabs, TabsList, TabsTrigger, TabsContent };
});

jest.mock('lucide-react', () => {
  const MockIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    (props, ref) => <span ref={ref} data-testid="lucide-icon" {...props} />
  );
  MockIcon.displayName = 'MockIcon';
  return {
    ArrowLeft: MockIcon,
    ArrowDown: MockIcon,
    ArrowUp: MockIcon,
    RefreshCw: MockIcon,
    HelpCircle: MockIcon,
    ChevronDown: MockIcon,
    Check: MockIcon,
    Maximize2: MockIcon,
    Minimize2: MockIcon,
    Rotate3d: MockIcon,
    RotateCcw: MockIcon,
  };
});

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recharts">{children}</div>
  ),
  LineChart: () => <div data-testid="line-chart" />,
  CartesianGrid: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Line: () => null,
  ReferenceLine: () => null,
  ReferenceArea: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

jest.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'dark' }),
}));

jest.mock('@/components/dashboards/ImpliedVolSurface3DChart', () => ({
  ImpliedVolSurface3DChart: ({ squarePlot }: { squarePlot?: boolean }) => (
    <div data-testid="iv-surface-3d" data-square-plot={squarePlot ? 'true' : undefined} />
  ),
}));

jest.mock('@/components/dashboards/useDashboardFocusMode', () => ({
  useDashboardFocusMode: () => ({
    isFocused: false,
    toggle: jest.fn(),
    setIsFocused: jest.fn(),
  }),
}));

const mockSnapshot: ImpliedVolSnapshot = {
  metadata: {
    symbol: 'SPY',
    spot: 580,
    asOf: '2026-08-30',
    fetchedAt: '2026-08-30T12:00:00.000Z',
    source: 'Yahoo Finance (delayed)',
    sourceDisclaimer: 'Demo',
  },
  slices: [
    {
      expiry: '2026-09-19',
      daysToExpiry: 20,
      ivPoints: [
        { strike: 550, iv: 0.16, moneyness: 0.95 },
        { strike: 580, iv: 0.14, moneyness: 1.0 },
        { strike: 610, iv: 0.15, moneyness: 1.05 },
      ],
      ssvi: { rho: -0.3, eta: 0.4, gamma: 0.5, m: 0, sigma: 0.14 },
    },
    {
      expiry: '2026-10-17',
      daysToExpiry: 48,
      ivPoints: [{ strike: 580, iv: 0.15, moneyness: 1.0 }],
    },
  ],
};

describe('ImpliedVolDashboard', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('renders shell with tabs, status bar and expiry toolbar', () => {
    renderWithProviders(<ImpliedVolDashboard initialSnapshot={mockSnapshot} />);
    expect(screen.getByTestId('iv-dashboard-shell')).toBeInTheDocument();
    expect(screen.getByTestId('iv-status-bar')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'impliedVol.tabs.overview' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'impliedVol.tabs.smile' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'impliedVol.tabs.term' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'impliedVol.tabs.surface' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'impliedVol.tabs.chain' })).toBeInTheDocument();
    expect(screen.getByTestId('iv-symbol-select')).toBeInTheDocument();
    expect(screen.getByTestId('iv-tab-announcer')).toBeInTheDocument();
  });

  it('shows overview grid by default', () => {
    renderWithProviders(<ImpliedVolDashboard initialSnapshot={mockSnapshot} />);
    expect(screen.getByTestId('iv-overview-smile')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'impliedVol.tabs.overview' })).toHaveAttribute(
      'data-state',
      'active'
    );
  });

  it('renders chain panel when chain tab is active', () => {
    renderWithProviders(<ImpliedVolDashboard initialSnapshot={mockSnapshot} initialTab="chain" />);

    expect(screen.getByTestId('iv-chain-panel')).toBeInTheDocument();
    expect(screen.getByTestId('iv-chain-atm-row')).toBeInTheDocument();
  });

  it('renders overview layout with KPI strip and surface hero', async () => {
    renderWithProviders(
      <ImpliedVolDashboard initialSnapshot={mockSnapshot} initialTab="overview" />
    );

    expect(screen.getByTestId('iv-overview-root')).toBeInTheDocument();
    expect(screen.getByTestId('iv-overview-kpi')).toBeInTheDocument();
    expect(screen.getByTestId('iv-overview-smile')).toBeInTheDocument();
    expect(screen.getByTestId('iv-overview-term')).toBeInTheDocument();
    expect(screen.getByTestId('iv-overview-surface')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('iv-surface-3d')).toBeInTheDocument();
    });
    expect(screen.getByTestId('iv-surface-3d')).toHaveAttribute('data-square-plot', 'true');
  });

  it('navigates to term tab from overview panel click', () => {
    renderWithProviders(
      <ImpliedVolDashboard initialSnapshot={mockSnapshot} initialTab="overview" />
    );

    fireEvent.click(screen.getByTestId('iv-overview-term'));

    expect(screen.getByRole('tab', { name: 'impliedVol.tabs.term' })).toHaveAttribute(
      'data-state',
      'active'
    );
  });

  it('renders focus toggle in toolbar', () => {
    renderWithProviders(<ImpliedVolDashboard initialSnapshot={mockSnapshot} />);
    expect(screen.getByTestId('iv-focus-toggle')).toBeInTheDocument();
  });

  it('renders 3D surface when surface tab is active', async () => {
    renderWithProviders(
      <ImpliedVolDashboard initialSnapshot={mockSnapshot} initialTab="surface" />
    );

    await waitFor(() => {
      expect(screen.getByTestId('iv-surface-3d')).toBeInTheDocument();
    });
  });

  it('syncs tab and expiry to URL', () => {
    renderWithProviders(<ImpliedVolDashboard initialSnapshot={mockSnapshot} />);
    expect(mockReplace).toHaveBeenCalled();
    const url = mockReplace.mock.calls[0][0] as string;
    expect(url).toContain('tab=overview');
    expect(url).toContain('expiry=');
  });
});

describe('ImpliedVolStatusBar', () => {
  it('shows symbol, spot and fetched badge', () => {
    renderWithProviders(<ImpliedVolStatusBar metadata={mockSnapshot.metadata} locale="en" />);
    expect(screen.getByText('SPY')).toBeInTheDocument();
    expect(screen.getByText('580.00')).toBeInTheDocument();
    expect(screen.getByTestId('iv-status-fetched')).toBeInTheDocument();
  });
});

describe('ImpliedVolChainPanel', () => {
  it('highlights ATM row and supports OTM filter', () => {
    renderWithProviders(<ImpliedVolChainPanel slice={mockSnapshot.slices[0]} symbol="SPY" />);
    expect(screen.getByTestId('iv-chain-atm-row')).toBeInTheDocument();
    expect(screen.getByText('580.00')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('iv-chain-filter-otmCall'));
    expect(screen.queryByTestId('iv-chain-atm-row')).not.toBeInTheDocument();
  });
});
