process.env.TAMAGUI_TARGET = 'native'

module.exports = function (api) {
  api.cache(true);
  
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

  // Add reanimated plugin only if available to avoid build errors
  try {
    require.resolve('react-native-reanimated/plugin');
    plugins.push('react-native-reanimated/plugin');
  } catch (e) {
    console.warn('react-native-reanimated plugin not available, skipping...');
  }

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};