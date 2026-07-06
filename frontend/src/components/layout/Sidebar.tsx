import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Scan, History, BarChart3, BookOpen, Settings } from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Scan Leaf', path: '/detect', icon: Scan },
    { name: 'History Logs', path: '/history', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Encyclopedia', path: '/encyclopedia', icon: BookOpen },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  return (
    <aside className={`hidden md:flex flex-col bg-white dark:bg-darkCard border-r border-slate-200/50 dark:border-slate-800/40 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex-1 py-6 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary text-white shadow-sm shadow-primary/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
                }
              `}
            >
              <Icon size={18} className="shrink-0 transition-transform group-hover:scale-105" />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}
export default Sidebar
