const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure for Replit environment
config.server = {
  port: 5000,
  host: '0.0.0.0',
  useGlobalHotkeys: false,
};

module.exports = config;