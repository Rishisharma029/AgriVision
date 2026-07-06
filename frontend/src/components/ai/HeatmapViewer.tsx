import React, { useState } from 'react'
import { Eye, EyeOff, LayoutGrid, Layers } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

interface HeatmapViewerProps {
  originalImage: string // Base64 or object URL
  heatmapImage: string  // Base64
}

export const HeatmapViewer: React.FC<HeatmapViewerProps> = ({ originalImage, heatmapImage }) => {
  const [opacity, setOpacity] = useState<number>(0.6)
  const [viewMode, setViewMode] = useState<'overlay' | 'split'>('overlay')

  return (
    <Card variant="glass" className="p-4 sm:p-5 border-l-4 border-l-ai">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/40">
        <div>
          <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-200">
            Explainable AI (Grad-CAM)
          </h3>
          <p className="text-xs text-slate-500">
            Visualise which segments of the leaf the CNN model used to predict the diagnosis.
          </p>
        </div>

        {/* View Mode Toggles (Grad-CAM is AI-reserved - uses sky blue) */}
        <div className="flex gap-2 shrink-0">
          <Button
            variant={viewMode === 'overlay' ? 'ai' : 'secondary-glass'}
            size="sm"
            onClick={() => setViewMode('overlay')}
            className="gap-1.5"
          >
            <Layers size={14} />
            Overlay
          </Button>
          <Button
            variant={viewMode === 'split' ? 'ai' : 'secondary-glass'}
            size="sm"
            onClick={() => setViewMode('split')}
            className="gap-1.5"
          >
            <LayoutGrid size={14} />
            Side-by-Side
          </Button>
        </div>
      </div>

      {/* Viewer Panel */}
      <div className="flex flex-col items-center justify-center gap-6">
        {viewMode === 'overlay' ? (
          /* Overlay View Mode */
          <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40">
            {/* Base layer: original crop leaf */}
            <img 
              src={originalImage} 
              alt="Original leaf upload" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay layer: colorized Grad-CAM heatmap */}
            <img 
              src={heatmapImage} 
              alt="Grad-CAM activation overlay" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply pointer-events-none transition-opacity duration-150"
              style={{ opacity }}
            />
          </div>
        ) : (
          /* Split/Side-by-Side View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider">Original Upload</span>
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40">
                <img src={originalImage} alt="Original crop leaf" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider font-mono">Grad-CAM Heatmap</span>
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40">
                <img src={heatmapImage} alt="Grad-CAM activations" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Opacity Slider (only visible in overlay mode) */}
        {viewMode === 'overlay' && (
          <div className="w-full max-w-md flex flex-col gap-2 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/20">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <EyeOff size={12} />
                Original Leaf
              </span>
              <span className="text-ai">Overlay Intensity: {Math.round(opacity * 100)}%</span>
              <span className="flex items-center gap-1">
                <Eye size={12} />
                Heatmap
              </span>
            </div>
            
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-ai"
            />
          </div>
        )}
      </div>
    </Card>
  )
}

export default HeatmapViewer
