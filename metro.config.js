const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure for Replit environment
config.server = {
  port: 5000,
  host: '0.0.0.0',
  useGlobalHotkeys: false,
};

// Tamagui configuration - merge with defaults to preserve 'cjs' and other extensions
const { sourceExts } = config.resolver;
config.resolver.sourceExts = [
  ...sourceExts,
  'tamagui.ts',
  'tamagui.tsx',
  'mjs',
];

module.exports = config;