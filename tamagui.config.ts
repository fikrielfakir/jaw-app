import { createTamagui } from '@tamagui/core'
import { createInterFont } from '@tamagui/font-inter'
import { createMedia } from '@tamagui/react-native-media-driver'
import { createTokens } from '@tamagui/core'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens as defaultTokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'

const interFont = createInterFont({
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  weight: {
    1: '300',
    2: '400',
    6: '600',
    7: '700',
  },
  letterSpacing: {
    1: 0,
    2: -0.15,
    5: -0.69,
    6: -0.72,
    7: -0.8,
    8: -0.906,
    9: -0.975,
    10: -1.1,
    12: -1.18,
    14: -1.37,
    15: -1.5,
  },
})

const tokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    // JAW Restaurant Dark Theme Colors
    jawBackground: '#000000',
    jawSurface: '#1C1C1C',
    jawPrimary: '#FFD700',
    jawPrimaryLight: '#FFE766',
    jawSuccess: '#4CAF50',
    jawWarning: '#FFC107',
    jawError: '#F44336',
    jawTextPrimary: '#FFFFFF',
    jawTextSecondary: '#B3B3B3',
    jawTextMuted: '#808080',
    jawIcon: '#FFD700',
    jawBorder: '#333333',
  },
})

const jawDarkTheme = {
  ...themes.dark,
  background: tokens.color.jawBackground,
  backgroundHover: tokens.color.jawSurface,
  backgroundPress: tokens.color.jawSurface,
  backgroundFocus: tokens.color.jawSurface,
  backgroundStrong: tokens.color.jawSurface,
  backgroundTransparent: 'rgba(0, 0, 0, 0)',
  color: tokens.color.jawTextPrimary,
  colorHover: tokens.color.jawTextPrimary,
  colorPress: tokens.color.jawTextSecondary,
  colorFocus: tokens.color.jawPrimary,
  colorTransparent: 'rgba(255, 255, 255, 0)',
  borderColor: tokens.color.jawBorder,
  borderColorHover: tokens.color.jawPrimary,
  borderColorFocus: tokens.color.jawPrimary,
  borderColorPress: tokens.color.jawPrimaryLight,
  placeholderColor: tokens.color.jawTextMuted,
  // Primary colors
  blue: tokens.color.jawPrimary,
  blueHover: tokens.color.jawPrimaryLight,
  green: tokens.color.jawSuccess,
  red: tokens.color.jawError,
  yellow: tokens.color.jawWarning,
}

const media = createMedia({
  xs: { maxWidth: 660 },
  sm: { maxWidth: 800 },
  md: { maxWidth: 1020 },
  lg: { maxWidth: 1280 },
  xl: { maxWidth: 1420 },
  xxl: { maxWidth: 1600 },
  gtXs: { minWidth: 660 + 1 },
  gtSm: { minWidth: 800 + 1 },
  gtMd: { minWidth: 1020 + 1 },
  gtLg: { minWidth: 1280 + 1 },
  short: { maxHeight: 820 },
  tall: { minHeight: 820 },
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
})

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
})

const config = createTamagui({
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: interFont,
    heading: interFont,
  },
  tokens,
  themes: {
    jaw_dark: jawDarkTheme,
  },
  media,
})

export type AppConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config