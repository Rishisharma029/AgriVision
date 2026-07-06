import type { Config } from 'tailwindcss'
import tailwindPreset from './src/design-system/presets/tailwind-preset'

export default {
  presets: [tailwindPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'scan': 'scan 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(110%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 5px rgba(14, 165, 233, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(14, 165, 233, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", 'sans-serif'],
        display: ["'Plus Jakarta Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
