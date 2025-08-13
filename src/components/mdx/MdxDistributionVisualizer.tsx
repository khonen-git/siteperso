import { DistributionVisualizer } from '@/components/features/knowledge/visualization/DistributionVisualizer';
import { DistributionConfig } from '@/types/distributions';
import { PresetManager } from '@/components/features/knowledge/visualization/PresetManager';

interface MdxDistributionVisualizerProps {
  distribution: DistributionConfig;
  showPresets?: boolean;
}

export function MdxDistributionVisualizer({ 
  distribution,
  showPresets = false 
}: MdxDistributionVisualizerProps) {
  return (
    <div className="my-8 space-y-6">
      <DistributionVisualizer distribution={distribution} />
      {showPresets && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Presets</h3>
          <PresetManager />
        </div>
      )}
    </div>
  );
} 