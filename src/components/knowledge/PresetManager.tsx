import { useState } from 'react';
import { useDistributionStore } from '@/store/distributionStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PresetManager() {
  const [newPresetName, setNewPresetName] = useState('');
  const { presets, savePreset, loadPreset, removePreset } = useDistributionStore();

  const handleSavePreset = () => {
    if (newPresetName.trim()) {
      savePreset(newPresetName.trim());
      setNewPresetName('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={newPresetName}
          onChange={(e) => setNewPresetName(e.target.value)}
          placeholder="Nom du preset"
          className="flex-1"
        />
        <Button onClick={handleSavePreset} disabled={!newPresetName.trim()}>
          Sauvegarder
        </Button>
      </div>

      {presets.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Presets sauvegardés</h4>
          <div className="space-y-2">
            {presets.map((preset) => (
              <div key={preset.name} className="flex items-center gap-2">
                <span className="flex-1">{preset.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadPreset(preset.name)}
                >
                  Charger
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removePreset(preset.name)}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 