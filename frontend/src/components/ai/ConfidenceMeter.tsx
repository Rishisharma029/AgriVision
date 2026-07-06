import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePerformanceStore } from '../../store/performanceStore'

interface ConfidenceMeterProps {
  value: number // 0.0 to 1.0
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ value }) => {
  const percent = Math.round(value * 100)
  const [animatedValue, setAnimatedValue] = useState(0)
  const { profile } = usePerformanceStore()
  const disableAnimations = profile === 'low'

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percent)
    }, 300)
    return () => clearTimeout(timer)
  }, [percent])

  // Under the color system rules, ConfidenceMeter is reserved exclusively for AI interactions (Sky Blue #0EA5E9)
  const theme = { 
    stroke: '#0ea5e9', 
    text: 'text-ai dark:text-ai-light', 
    label: value >= 0.85 ? 'High Calibrated Confidence' : value >= 0.60 ? 'Moderate Calibrated Confidence' : 'Low Calibrated Confidence' 
  }

  // Radial parameters
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center w-40 h-40">
        
        {/* Background Track Arc */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Animated Progress Arc */}
          {!disableAnimations ? (
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              stroke={theme.stroke}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          ) : (
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={theme.stroke}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Center Text Indicator */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          {!disableAnimations ? (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-display font-extrabold text-3xl text-slate-800 dark:text-slate-100"
            >
              {animatedValue}%
            </motion.span>
          ) : (
            <span className="font-display font-extrabold text-3xl text-slate-800 dark:text-slate-100">
              {animatedValue}%
            </span>
          )}
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-450 dark:text-slate-500 mt-0.5">
            calibrated
          </span>
        </div>

      </div>

      <div className="text-center mt-2">
        <span className={`font-display font-bold text-xs uppercase tracking-wider ${theme.text}`}>
          {theme.label}
        </span>
      </div>
    </div>
  )
}

export default ConfidenceMeter
