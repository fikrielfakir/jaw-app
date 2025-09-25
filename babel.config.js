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

  // Temporarily disable reanimated plugin entirely to fix worklets dependency issue
  // TODO: Re-enable after resolving react-native-worklets compatibility

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