import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

const appConfig = createTamagui({
  ...config,
  settings: {
    ...config.settings,
    allowedStyleValues: 'somewhat-strict',
    autocompleteSpecificTokens: 'except-special',
  },
  themes: {
    ...config.themes,
    // Custom theme for ZuzSports with vibrant colors
    zuzuLight: {
      background: '#ffffff',
      backgroundHover: '#f8f9fa',
      backgroundPress: '#f1f3f4',
      backgroundFocus: '#e8f0fe',
      color: '#1a1a1a',
      colorHover: '#333333',
      colorPress: '#000000',
      colorFocus: '#1976d2',
      borderColor: '#e0e0e0',
      borderColorHover: '#bdbdbd',
      borderColorPress: '#9e9e9e',
      borderColorFocus: '#2196f3',
      placeholderColor: '#757575',
      // ZuzSports brand colors
      primary: '#ff6b35', // Orange
      primaryHover: '#ff5722',
      secondary: '#e91e63', // Pink
      secondaryHover: '#c2185b',
      accent: '#9c27b0', // Purple
      accentHover: '#7b1fa2',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
    },
    zuzuDark: {
      background: '#121212',
      backgroundHover: '#1e1e1e',
      backgroundPress: '#2a2a2a',
      backgroundFocus: '#1a237e',
      color: '#ffffff',
      colorHover: '#f5f5f5',
      colorPress: '#e0e0e0',
      colorFocus: '#64b5f6',
      borderColor: '#424242',
      borderColorHover: '#616161',
      borderColorPress: '#757575',
      borderColorFocus: '#42a5f5',
      placeholderColor: '#9e9e9e',
      // ZuzSports brand colors for dark mode
      primary: '#ff8a65',
      primaryHover: '#ff7043',
      secondary: '#f06292',
      secondaryHover: '#ec407a',
      accent: '#ba68c8',
      accentHover: '#ab47bc',
      success: '#66bb6a',
      warning: '#ffb74d',
      error: '#ef5350',
      info: '#42a5f5',
    },
  },
  fonts: {
    ...config.fonts,
    // Hebrew-friendly fonts
    hebrew: {
      family: 'Heebo, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
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
      lineHeight: {
        1: 16,
        2: 17,
        3: 18,
        4: 19,
        true: 19,
        5: 22,
        6: 24,
        7: 26,
        8: 29,
        9: 36,
        10: 52,
        11: 61,
        12: 68,
        13: 78,
        14: 98,
        15: 120,
        16: 140,
      },
      weight: {
        1: '300',
        2: '400',
        3: '500',
        4: '600',
        true: '400',
        5: '700',
        6: '800',
        7: '900',
      },
      letterSpacing: {
        1: 0,
        2: -0.5,
        3: -1,
        4: -1.5,
        true: 0,
        5: -2,
        6: -2.5,
        7: -3,
      },
    },
  },
})

export type AppConfig = typeof appConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig

