import { create } from 'zustand'

interface ThemeState {
  darkMode: boolean
  toggleTheme: () => void
}

const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    return null
  }
}

const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {}
}

const safeHasItem = (key: string): boolean => {
  try {
    return key in localStorage
  } catch (e) {
    return false
  }
}

const useThemeStore = create<ThemeState>((set) => ({
  darkMode: safeGetItem('theme') === 'dark' || 
            (!safeHasItem('theme') && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
  toggleTheme: () => set((state) => {
    const nextMode = !state.darkMode
    safeSetItem('theme', nextMode ? 'dark' : 'light')
    return { darkMode: nextMode }
  }),
}))

export default useThemeStore
