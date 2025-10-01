const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Tamagui configuration - merge with defaults to preserve 'cjs' and other extensions
const { sourceExts } = config.resolver;
config.resolver.sourceExts = [
  ...sourceExts,
  'tamagui.ts',
  'tamagui.tsx',
  'mjs',
];

module.exports = withNativeWind(config, { input: './global.css' });