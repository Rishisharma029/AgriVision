import React from 'react'
import { motion } from 'framer-motion'
import { usePerformanceStore } from '../../store/performanceStore'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ai' | 'secondary-glass' | 'ghost' | 'danger' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const { profile } = usePerformanceStore()
  const disableAnimations = profile === 'low'

  const baseClass = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark text-white shadow-sm shadow-primary/20 focus:ring-primary/45",
    ai: "bg-ai hover:bg-ai-dark text-white shadow-sm shadow-ai/20 focus:ring-ai/45",
    'secondary-glass': "glass-card hover:bg-slate-100/55 dark:hover:bg-slate-850/55 text-slate-850 dark:text-slate-100 focus:ring-slate-400/40",
    ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 focus:ring-slate-200/40",
    danger: "bg-red-650 hover:bg-red-700 text-white shadow-sm shadow-red-650/20 focus:ring-red-500/40",
    // Compatibility aliases
    secondary: "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 focus:ring-slate-300/40",
    outline: "border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-300/40"
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs sm:text-sm",
    md: "px-4 py-2 text-sm sm:text-base",
    lg: "px-6 py-3 text-base sm:text-lg"
  }

  const hoverScale = disableAnimations ? 1 : 1.02
  const tapScale = disableAnimations ? 1 : 0.98

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: hoverScale }}
      whileTap={disabled || isLoading ? {} : { scale: tapScale }}
      className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props as any}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </motion.button>
  )
}

export default Button
