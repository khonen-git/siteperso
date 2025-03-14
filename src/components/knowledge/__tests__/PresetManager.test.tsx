import { render, screen, fireEvent } from '@testing-library/react';
import { PresetManager } from '../PresetManager';
import { useDistributionStore } from '@/store/distributionStore';

// Mock du store
jest.mock('@/store/distributionStore', () => ({
  useDistributionStore: jest.fn()
}));

describe('PresetManager', () => {
  const mockSavePreset = jest.fn();
  const mockLoadPreset = jest.fn();
  const mockRemovePreset = jest.fn();

  beforeEach(() => {
    (useDistributionStore as jest.Mock).mockImplementation(() => ({
      presets: [
        { id: '1', name: 'Test Preset 1' },
        { id: '2', name: 'Test Preset 2' }
      ],
      savePreset: mockSavePreset,
      loadPreset: mockLoadPreset,
      removePreset: mockRemovePreset
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('affiche correctement le formulaire de création de preset', () => {
    render(<PresetManager />);
    
    expect(screen.getByPlaceholderText('Nom du preset')).toBeInTheDocument();
    expect(screen.getByText('Sauvegarder')).toBeInTheDocument();
  });

  it('affiche la liste des presets existants', () => {
    render(<PresetManager />);
    
    expect(screen.getByText('Test Preset 1')).toBeInTheDocument();
    expect(screen.getByText('Test Preset 2')).toBeInTheDocument();
  });

  it('gère correctement la sauvegarde d\'un nouveau preset', () => {
    render(<PresetManager />);
    
    const input = screen.getByPlaceholderText('Nom du preset');
    const saveButton = screen.getByText('Sauvegarder');
    
    fireEvent.change(input, { target: { value: 'Nouveau Preset' } });
    fireEvent.click(saveButton);
    
    expect(mockSavePreset).toHaveBeenCalledWith('Nouveau Preset');
    expect(input).toHaveValue(''); // Le champ doit être vidé après la sauvegarde
  });

  it('désactive le bouton de sauvegarde si le nom est vide', () => {
    render(<PresetManager />);
    
    const saveButton = screen.getByText('Sauvegarder');
    expect(saveButton).toBeDisabled();
    
    const input = screen.getByPlaceholderText('Nom du preset');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(saveButton).not.toBeDisabled();
    
    fireEvent.change(input, { target: { value: '' } });
    expect(saveButton).toBeDisabled();
  });

  it('gère correctement le chargement d\'un preset', () => {
    render(<PresetManager />);
    
    const loadButtons = screen.getAllByText('Charger');
    fireEvent.click(loadButtons[0]);
    
    expect(mockLoadPreset).toHaveBeenCalledWith('1');
  });

  it('gère correctement la suppression d\'un preset', () => {
    render(<PresetManager />);
    
    const deleteButtons = screen.getAllByText('Supprimer');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockRemovePreset).toHaveBeenCalledWith('1');
  });

  it('respecte les critères d\'accessibilité', () => {
    render(<PresetManager />);
    
    // Vérifier les labels ARIA
    expect(screen.getByLabelText('Nom du nouveau preset')).toBeInTheDocument();
    expect(screen.getByLabelText('Sauvegarder le preset')).toBeInTheDocument();
    expect(screen.getByLabelText('Charger le preset Test Preset 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Supprimer le preset Test Preset 1')).toBeInTheDocument();
  });
}); 