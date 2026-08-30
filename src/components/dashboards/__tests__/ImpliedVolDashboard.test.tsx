import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImpliedVolDashboard } from '@/components/dashboards/ImpliedVolDashboard';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) => {
    if (values) {
      return `${key}:${JSON.stringify(values)}`;
    }
    return key;
  },
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recharts">{children}</div>
  ),
  LineChart: () => <div data-testid="line-chart" />,
  ScatterChart: () => <div data-testid="scatter-chart" />,
  CartesianGrid: () => null,
  XAxis: () => null,
  YAxis: () => null,
  ZAxis: () => null,
  Line: () => null,
  Scatter: () => null,
  ReferenceLine: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

const mockSnapshot: ImpliedVolSnapshot = {
  metadata: {
    symbol: 'SPY',
    spot: 580,
    asOf: '2026-08-30',
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
  it('renders shell with tabs and toolbar', () => {
    render(<ImpliedVolDashboard initialSnapshot={mockSnapshot} />);
    expect(screen.getByTestId('iv-dashboard-shell')).toBeInTheDocument();
    expect(screen.getByText('impliedVol.tabs.overview')).toBeInTheDocument();
    expect(screen.getByText('impliedVol.tabs.smile')).toBeInTheDocument();
    expect(screen.getByText('impliedVol.tabs.term')).toBeInTheDocument();
    expect(screen.getByText('impliedVol.tabs.surface')).toBeInTheDocument();
    expect(screen.getByText('impliedVol.toolbar.refresh')).toBeInTheDocument();
  });

  it('shows smile chart by default', () => {
    render(<ImpliedVolDashboard initialSnapshot={mockSnapshot} />);
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });
});
