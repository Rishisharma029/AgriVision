import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  ...props
}) => {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors"
  
  const variantClasses = {
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200/40 dark:border-green-800/30",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/40 dark:border-amber-800/30",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200/40 dark:border-red-800/30",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/30",
    neutral: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/40 dark:border-slate-700/30"
  }

  return (
    <span 
      className={`${baseClass} ${variantClasses[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  )
}
