import { colors } from '../tokens/colors'
import { typography } from '../tokens/typography'
import { spacing } from '../tokens/spacing'
import { radius } from '../tokens/radius'
import { elevation } from '../tokens/elevation'
import { breakpoints } from '../tokens/breakpoints'

export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.agriculture.primary, // Emerald (#10B981)
          light: '#34D399',
          dark: '#059669',
        },
        secondary: colors.agriculture.secondary, // Lime (#84CC16)
        accent: colors.agriculture.secondary, // Alias for Lime (#84CC16) to support existing gradient/accent styles
        ai: {
          DEFAULT: colors.ai.primary, // Sky Blue (#0EA5E9)
          light: colors.ai.accent,
          dark: '#0284C7',
          glow: colors.ai.glow,
          glowHeavy: colors.ai.glowHeavy,
        },
        darkBg: colors.neutral[900],
        darkCard: colors.neutral[800],
        darkBorder: colors.neutral[700],
        neutral: colors.neutral,
      },
      fontFamily: typography.fontFamily,
      borderRadius: radius,
      boxShadow: elevation.shadows,
      screens: breakpoints,
      spacing: {
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        xxl: spacing.xxl,
        xxxl: spacing.xxxl,
      }
    }
  }
};

export default tailwindPreset;
