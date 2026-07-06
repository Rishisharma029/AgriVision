import React from 'react'
import { usePerformanceStore } from '../../store/performanceStore'

interface ScanningLeaf3DProps {
  progressText: string
  progress: number
}

export const ScanningLeaf3D: React.FC<ScanningLeaf3DProps> = ({ progressText, progress }) => {
  const { profile } = usePerformanceStore()

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-slate-950 shadow-inner border border-slate-900">
      
      {/* 2D High-Tech Cyber Scanner UI */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-950 scanner-container">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
        
        {/* Circular scanning radar lines */}
        <div className="absolute w-72 h-72 rounded-full border border-ai/10 animate-ping [animation-duration:3s] pointer-events-none" />
        <div className="absolute w-56 h-56 rounded-full border border-ai/20 animate-pulse pointer-events-none" />
        
        {/* Sky Blue Laser Sweep line */}
        <div className="scanner-line z-10" />

        {/* Cyber leaf graphic */}
        <div className="relative p-8 text-center flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-ai/40 animate-spin [animation-duration:12s]" />
            
            {/* Glowing leaf icon */}
            <svg className="w-16 h-16 text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3C7 6 5 11 5 16C5 19 7 21 12 21C17 21 19 19 19 16C19 11 17 6 12 3Z" fill="url(#scan-leaf-gradient)" />
              <path d="M12 3V21" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <defs>
                <linearGradient id="scan-leaf-gradient" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Futuristic Scan HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between z-20">
        
        {/* Top telemetry HUD */}
        <div className="flex justify-between items-start text-[10px] font-mono text-ai">
          <div className="flex flex-col gap-1">
            <span>SCAN_ENGINE_ACTIVE // TRUE</span>
            <span>FREQ_COEFF: 432.18 GHz</span>
            <span>MODEL: LEAF_NET_V2</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span>SYS_OK: 100%</span>
            <span>INFERENCE_READY: TRUE</span>
            <span>PERF_MODE: {profile.toUpperCase()}</span>
          </div>
        </div>

        {/* Bottom loading progress HUD */}
        <div className="flex flex-col gap-3 w-full bg-slate-950/90 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-sm pointer-events-auto">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-ai flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ai animate-ping" />
              {progressText}
            </span>
            <span className="font-mono text-ai">{progress}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-ai to-ai-light transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default ScanningLeaf3D
