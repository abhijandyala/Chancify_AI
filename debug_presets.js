// Debug script to check and clear localStorage presets
console.log('=== PRESET DEBUG ===');

// Check what's in localStorage
const presets = localStorage.getItem('chancify_presets');
console.log('Raw presets data:', presets);

if (presets) {
  try {
    const parsed = JSON.parse(presets);
    console.log('Parsed presets:', parsed);
    
    // Check each preset's createdAt
    parsed.forEach((preset, index) => {
      console.log(`Preset ${index}:`, {
        name: preset.name,
        createdAt: preset.createdAt,
        date: new Date(preset.createdAt),
        isValid: !isNaN(new Date(preset.createdAt).getTime())
      });
    });
  } catch (e) {
    console.error('Error parsing presets:', e);
  }
}

// Clear presets
console.log('Clearing all presets...');
localStorage.removeItem('chancify_presets');
console.log('Presets cleared!');

console.log('=== END DEBUG ===');
