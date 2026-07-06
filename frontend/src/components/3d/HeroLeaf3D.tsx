import React from 'react'

export const HeroLeaf3D: React.FC = () => {
  return (
    <div className="w-full h-[280px] sm:h-[360px] md:h-[400px] flex items-center justify-center relative">
      {/* Background glow */}
      <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      
      {/* Styled Neon Leaf Container */}
      <div className="relative p-8 rounded-3xl bg-slate-900/50 dark:bg-slate-900/40 border border-emerald-500/20 backdrop-blur-md shadow-2xl shadow-emerald-500/5 animate-bounce [animation-duration:6s]">
        <svg className="w-40 h-40 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Main leaf outline */}
          <path d="M12 3C7 6 5 11 5 16C5 19 7 21 12 21C17 21 19 19 19 16C19 11 17 6 12 3Z" fill="url(#leaf-gradient)" />
          {/* Leaf stem/veins */}
          <path d="M12 3V21" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 9C10.5 10 9 10.5 7.5 11" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          <path d="M12 13C10.5 14 9 14.5 7.5 15" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          <path d="M12 17C11 17.5 10 18 9 18" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          <path d="M12 9C13.5 10 15 10.5 16.5 11" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          <path d="M12 13C13.5 14 15 14.5 16.5 15" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          <path d="M12 17C13 17.5 14 18 15 18" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="leaf-gradient" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Telemetry accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-500/40" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-emerald-500/40" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-emerald-500/40" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-500/40" />
      </div>
    </div>
  )
}

export default HeroLeaf3D
