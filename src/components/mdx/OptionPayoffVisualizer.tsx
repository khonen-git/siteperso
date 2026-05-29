'use client';

import { OptionPayoffVisualizer as OptionPayoffVisualizerCore } from '@/components/features/knowledge/finance/OptionPayoffVisualizer';

export function OptionPayoffVisualizer(): React.JSX.Element {
  return (
    <div className="my-6">
      <OptionPayoffVisualizerCore />
    </div>
  );
}
