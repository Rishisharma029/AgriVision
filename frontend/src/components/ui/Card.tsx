import React from 'react'
import { usePerformanceStore } from '../../store/performanceStore'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'interactive'
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const { profile } = usePerformanceStore()
  const isLowPerf = profile === 'low'

  const baseClass = "rounded-2xl transition-all duration-300 overflow-hidden"
  
  let variantClass = ""
  
  if (isLowPerf) {
    // Solid card fallback without glass/blur
    variantClass = "bg-white dark:bg-darkCard border border-slate-200 dark:border-slate-800"
  } else {
    if (variant === 'glass') {
      variantClass = "glass-card"
    } else if (variant === 'interactive') {
      // Interactive card has subtle elevation changes and translation on hover
      variantClass = "glass-card hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-205/5 hover:border-primary/30 dark:hover:border-primary/20 cursor-pointer"
    } else {
      // Static default card
      variantClass = "bg-white dark:bg-darkCard border border-slate-200/60 dark:border-slate-800/80 shadow-sm"
    }
  }

  return (
    <div 
      className={`${baseClass} ${variantClass} ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-5 pb-3 border-b border-slate-100 dark:border-slate-800/40 ${className}`} {...props}>
    {children}
  </div>
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
)

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-5 pt-3 border-t border-slate-100 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-800/10 ${className}`} {...props}>
    {children}
  </div>
)

export default Card
