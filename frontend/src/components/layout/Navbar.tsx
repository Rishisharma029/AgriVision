import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Sun, Moon, Wifi, WifiOff, Sprout } from 'lucide-react'
import useThemeStore from '../../store/themeStore'

interface NavbarProps {
  toggleSidebar: () => void
  toggleMobileMenu: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, toggleMobileMenu }) => {
  const { darkMode, toggleTheme } = useThemeStore()
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full glass-panel-light dark:glass-panel-dark border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left section: Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <Menu size={20} />
          </button>
          
          <button 
            onClick={toggleSidebar} 
            className="hidden md:block p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <Menu size={20} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-sm shadow-primary/30">
              <Sprout size={18} />
            </div>
            <span className="font-display text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LeafSense AI
            </span>
          </Link>
        </div>

        {/* Right section: System Status & Theme Toggler */}
        <div className="flex items-center gap-4">
          {/* Online/Offline indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-slate-50/50 dark:bg-slate-800/20 border-slate-200/50 dark:border-slate-700/20">
            {isOnline ? (
              <>
                <Wifi size={14} className="text-green-500 animate-pulse" />
                <span className="text-slate-600 dark:text-slate-400">Cloud Online</span>
              </>
            ) : (
              <>
                <WifiOff size={14} className="text-amber-500" />
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Offline Mode</span>
              </>
            )}
          </div>

          {/* Theme toggler */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

      </div>
    </header>
  )
}
export default Navbar
