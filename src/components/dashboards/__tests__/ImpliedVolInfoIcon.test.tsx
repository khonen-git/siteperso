import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import { TooltipProvider } from '@/components/ui/tooltip';

function renderWithTooltip(ui: React.ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
}

describe('ImpliedVolInfoIcon', () => {
  it('renders accessible help button', () => {
    renderWithTooltip(
      <ImpliedVolInfoIcon content="Tooltip text" label="Help about moneyness" />
    );
    expect(screen.getByRole('button', { name: 'Help about moneyness' })).toBeInTheDocument();
    expect(screen.getByTestId('help-circle')).toBeInTheDocument();
  });
});

describe('lucide HelpCircle export', () => {
  it('exports HelpCircle (not CircleHelp)', async () => {
    const lucide = await import('lucide-react');
    expect(lucide.HelpCircle).toBeDefined();
    expect('CircleHelp' in lucide).toBe(false);
  });
});
