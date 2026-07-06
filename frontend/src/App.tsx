import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useThemeStore from './store/themeStore'
import usePerformanceStore from './store/performanceStore'
import ErrorBoundary from './components/ui/ErrorBoundary'

// Layouts
import Layout from './layouts/Layout'

// Lazy loaded Pages
const Home = React.lazy(() => import('./pages/Home'))
const Detect = React.lazy(() => import('./pages/Detect'))
const Results = React.lazy(() => import('./pages/Results'))
const History = React.lazy(() => import('./pages/History'))
const Analytics = React.lazy(() => import('./pages/Analytics'))
const CropEncyclopedia = React.lazy(() => import('./pages/CropEncyclopedia'))
const Settings = React.lazy(() => import('./pages/Settings'))

const App: React.FC = () => {
  const { darkMode } = useThemeStore()
  const { profile, detectPerformance } = usePerformanceStore()

  // Auto-detect performance on startup
  useEffect(() => {
    detectPerformance()
  }, [detectPerformance])

  // Apply dark class to html document node for Tailwind dark mode
  useEffect(() => {
    const root = window.document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  // Apply active performance profile class to html document node
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('perf-ultra', 'perf-high', 'perf-medium', 'perf-low')
    root.classList.add(`perf-${profile}`)
  }, [profile])

  return (
    <ErrorBoundary>
      <Router>
        <Toaster 
          position="top-right" 
          toastOptions={{
            className: darkMode ? '!bg-slate-800 !text-slate-100 !border-slate-700' : '!bg-white !text-slate-900',
            duration: 3000
          }}
        />
        <React.Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400 font-sans">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-4 border-t-primary border-slate-800 animate-spin" />
              <p className="text-xs uppercase tracking-widest font-bold">Warming up module...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detect />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/encyclopedia" element={<CropEncyclopedia />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default App
