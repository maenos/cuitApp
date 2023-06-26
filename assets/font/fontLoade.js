// Font.js
import * as Font from 'expo-font';

// Define your font names and their corresponding font files
const fontAssets = {
  'Inter': require('./Inter-Regular.ttf'),
  // Add more fonts as needed
};

export const loadFonts = async () => {
  await Font.loadAsync(fontAssets);
};
