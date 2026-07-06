import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-darkBg/30 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
        <div>
          <span>&copy; {new Date().getFullYear()} LeafSense AI. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <span>PWA Version 1.0.0</span>
          <span>IndexedDB Storage Active</span>
          <span className="text-primary font-medium">Explainable Crop Health</span>
        </div>
      </div>
    </footer>
  )
}
export default Footer
