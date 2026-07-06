import { colors } from '../tokens/colors'

export const semanticTheme = {
  colors: {
    brand: {
      primary: colors.agriculture.primary,
      secondary: colors.agriculture.secondary,
      ai: colors.ai.primary,
      aiAccent: colors.ai.accent,
      aiGlow: colors.ai.glow,
    },
    interactive: {
      primary: colors.agriculture.primary,
      primaryHover: '#059669', // slightly darker emerald
      primaryPressed: '#047857',
      primaryDisabled: '#A7F3D0',
      
      ai: colors.ai.primary,
      aiHover: '#0284C7', // slightly darker sky blue
      aiPressed: '#0369A1',
      aiDisabled: '#7DD3FC',
    },
    feedback: {
      success: colors.semantic.success,
      error: colors.semantic.error,
      warning: colors.semantic.warning,
      info: colors.semantic.info,
    }
  }
} as const;
