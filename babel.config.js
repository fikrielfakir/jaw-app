process.env.TAMAGUI_TARGET = 'native'

module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  
  const plugins = [
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
        logTimings: true,
      },
    ],
  ];

  const isWeb = api.caller(caller => caller?.name === 'metro') && process.env.EXPO_PLATFORM === 'web';
  
  // Only add reanimated plugin for native platforms, not web
  if (!isWeb) {
    try {
      require.resolve('react-native-reanimated/plugin');
      plugins.push(['react-native-reanimated/plugin']);
    } catch (e) {
      console.warn('react-native-reanimated plugin not available, skipping...');
    }
  }

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          // Disable reanimated for web platform
          disableImportExportTransform: isWeb,
        },
      ],
    ],
    plugins,
  };
};