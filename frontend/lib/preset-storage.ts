export interface Preset {
  id: string;
  name: string;
  major: string;
  formData: any; // Store the entire form state
  createdAt: string;
}

export class PresetStorage {
  private readonly STORAGE_KEY = 'chancify_presets';

  constructor() {
    if (typeof window !== 'undefined' && !localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  private getRawPresets(): Preset[] {
    if (typeof window === 'undefined') return [];
    const presetsJson = localStorage.getItem(this.STORAGE_KEY);
    return presetsJson ? JSON.parse(presetsJson) : [];
  }

  private saveRawPresets(presets: Preset[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(presets));
    }
  }

  savePreset(name: string, major: string, formData: any): void {
    const presets = this.getRawPresets();
    const newPreset: Preset = {
      id: Date.now().toString(), // Simple unique ID
      name,
      major,
      formData,
      createdAt: new Date().toISOString(),
    };
    presets.push(newPreset);
    this.saveRawPresets(presets);
  }

  getPresets(): Preset[] {
    return this.getRawPresets().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  deletePreset(id: string): void {
    let presets = this.getRawPresets();
    presets = presets.filter(preset => preset.id !== id);
    this.saveRawPresets(presets);
  }
}
