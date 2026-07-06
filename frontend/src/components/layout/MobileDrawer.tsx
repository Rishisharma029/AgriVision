import React from 'react'
import { NavLink } from 'react-router-dom'
import { X, LayoutDashboard, Scan, History, BarChart3, BookOpen, Settings, Sprout } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Scan Leaf', path: '/detect', icon: Scan },
    { name: 'History Logs', path: '/history', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Encyclopedia', path: '/encyclopedia', icon: BookOpen },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black md:hidden"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white dark:bg-darkBg border-r border-slate-200/50 dark:border-slate-800/40 p-5 md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800/40">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-sm">
                  <Sprout size={18} />
                </div>
                <span className="font-display font-bold text-lg text-slate-850 dark:text-white">
                  LeafSense AI
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-6 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                )
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
export default MobileDrawer
