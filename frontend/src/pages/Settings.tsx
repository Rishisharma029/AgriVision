import React, { useEffect } from 'react'
import { Trash2, Sun, Moon, Database, Info, Cpu, Sliders, Eye } from 'lucide-react'
import useThemeStore from '../store/themeStore'
import useHistoryStore from '../store/historyStore'
import usePerformanceStore, { PerformanceProfile } from '../store/performanceStore'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import toast from 'react-hot-toast'

const Settings: React.FC = () => {
  const { darkMode, toggleTheme } = useThemeStore()
  const { clearHistory, items } = useHistoryStore()
  const { profile, autoDetectedProfile, setProfile, detectPerformance } = usePerformanceStore()

  useEffect(() => {
    detectPerformance()
  }, [detectPerformance])

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear your local database history? This will delete all saved predictions and heatmaps permanently!")) {
      await clearHistory()
      toast.success("Prediction history deleted successfully.")
    }
  }

  // System telemetry data
  const cores = navigator.hardwareConcurrency || 'Unknown'
  const memory = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown'
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Enabled' : 'Disabled'

  const profilesInfo = {
    ultra: {
      name: 'Ultra',
      desc: 'Full glassmorphism, 150 particles, StarField background, animated gradients, and 3D interactions. Best for high-end systems.',
    },
    high: {
      name: 'High',
      desc: 'Standard glassmorphism, 75 particles, standard StarField background, and 3D interactions. Default profile.',
    },
    medium: {
      name: 'Medium',
      desc: 'Medium glassmorphism, no particles, reduced background star density, and 3D interactions. Balanced setting.',
    },
    low: {
      name: 'Low',
      desc: 'Solid cards, no blurs, disabled particle fields, and a 2D fallback scanner. Fits low-end or battery-saving mode.',
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          Settings & Preferences
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customise interface themes, adaptive performance profiles, and manage local offline databases.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Appearance Theme */}
        <Card variant="glass" className="p-5">
          <CardHeader className="p-0 pb-3 flex items-center justify-between border-b-0">
            <h3 className="font-display font-bold text-base text-slate-800 dark:text-slate-200">
              Appearance Theme
            </h3>
            {darkMode ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
          </CardHeader>
          <CardContent className="p-0 pt-2 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-650 dark:text-slate-350">
                Switch between Light Mode and Dark Mode layouts.
              </p>
            </div>
            <Button variant="secondary-glass" onClick={toggleTheme} size="sm">
              Toggle Theme
            </Button>
          </CardContent>
        </Card>

        {/* Performance Profile Settings */}
        <Card variant="glass" className="p-5">
          <CardHeader className="p-0 pb-3 flex items-center justify-between border-b-0">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-display font-bold text-base text-slate-800 dark:text-slate-200">
                Adaptive Rendering Profile
              </h3>
              <p className="text-xs text-slate-500">
                Configures graphical fidelity and animation speeds to match your hardware profile.
              </p>
            </div>
            <Sliders size={18} className="text-ai" />
          </CardHeader>
          <CardContent className="p-0 pt-2 flex flex-col gap-4">
            
            {/* Telemetry diagnostics */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/40 dark:border-slate-800/10 text-xs text-slate-500">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-slate-400">CPU Cores</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{cores} Cores</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-slate-400">Device RAM</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{memory}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-slate-400">Reduced Motion</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{reducedMotion}</span>
              </div>
            </div>

            {/* Profile togglers */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {(['ultra', 'high', 'medium', 'low'] as PerformanceProfile[]).map((p) => {
                  const isActive = profile === p
                  const isAuto = autoDetectedProfile === p
                  return (
                    <Button 
                      key={p}
                      variant={isActive ? 'ai' : 'secondary-glass'}
                      size="sm"
                      onClick={() => setProfile(p)}
                      className="gap-1.5"
                    >
                      {profilesInfo[p].name}
                      {isAuto && <span className="text-[9px] bg-slate-900/20 px-1 py-0.5 rounded uppercase">Auto</span>}
                    </Button>
                  )
                })}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                <strong>Active profile:</strong> {profilesInfo[profile].desc}
              </p>
            </div>

          </CardContent>
        </Card>

        {/* Database Management */}
        <Card variant="glass" className="p-5">
          <CardHeader className="p-0 pb-3 flex items-center justify-between border-b-0">
            <h3 className="font-display font-bold text-base text-slate-800 dark:text-slate-200">
              Offline Storage (IndexedDB)
            </h3>
            <Database size={18} className="text-primary" />
          </CardHeader>
          <CardContent className="p-0 pt-2 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-650 dark:text-slate-350">
                  Total saved diagnostic predictions: <strong className="text-primary">{items.length}</strong>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Saved predictions, original images, and heatmaps are stored locally on your device's IndexedDB.
                </p>
              </div>
              
              {items.length > 0 && (
                <Button variant="danger" size="sm" onClick={handleClearHistory} className="gap-2 shrink-0">
                  <Trash2 size={14} />
                  Clear Data
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System & Model specs */}
        <Card variant="glass" className="p-5">
          <CardHeader className="p-0 pb-3 flex items-center justify-between border-b-0">
            <h3 className="font-display font-bold text-base text-slate-800 dark:text-slate-200">
              System Specifications
            </h3>
            <Info size={18} className="text-slate-450" />
          </CardHeader>
          <CardContent className="p-0 pt-2 text-sm text-slate-650 dark:text-slate-350 flex flex-col gap-3">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Cpu size={14} className="text-ai" /> Inference Core:
              </span>
              <span className="font-mono text-xs font-semibold">MobileNetV2 (Calibrated)</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Sliders size={14} className="text-primary" /> Model Calibration:
              </span>
              <span className="font-mono text-xs font-semibold">Temperature Scaling Enabled</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Eye size={14} className="text-amber-500" /> Explainable AI Overlay:
              </span>
              <span className="font-mono text-xs font-semibold">Grad-CAM (Gradient Class Activation Map)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Development Build:</span>
              <span className="font-mono text-xs text-slate-400">v1.0.0 (Production Edition)</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Settings
