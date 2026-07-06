export const colors = {
  agriculture: {
    primary: '#10B981', // Emerald
    secondary: '#84CC16', // Lime
  },
  ai: {
    primary: '#0EA5E9', // Sky Blue
    accent: '#38BDF8', // Light Sky Blue
    glow: 'rgba(14, 165, 233, 0.15)',
    glowHeavy: 'rgba(14, 165, 233, 0.4)',
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#0EA5E9', // Mapped to Sky Blue for AI and general system status
  }
} as const;
