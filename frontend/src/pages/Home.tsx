import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlusCircle, 
  History, 
  BarChart3, 
  BookOpen, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Search, 
  Eye, 
  CloudLightning 
} from 'lucide-react'
import useHistoryStore from '../store/historyStore'
import useAnalyticsStore from '../store/analyticsStore'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import HeroLeaf3D from '../components/3d/HeroLeaf3D'

const Home: React.FC = () => {
  const { items, loadHistory } = useHistoryStore()
  const { data, calculateAnalytics } = useAnalyticsStore()

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  useEffect(() => {
    calculateAnalytics(items)
  }, [items, calculateAnalytics])

  const recentScans = items.slice(0, 3)

  const supportedCrops = [
    { name: 'Tomato', scientific: 'Solanum lycopersicum', key: 'tomato', color: 'from-red-500/10 to-red-600/5' },
    { name: 'Potato', scientific: 'Solanum tuberosum', key: 'potato', color: 'from-amber-600/10 to-amber-700/5' },
    { name: 'Apple', scientific: 'Malus domestica', key: 'apple', color: 'from-rose-500/10 to-rose-600/5' },
    { name: 'Grape', scientific: 'Vitis vinifera', key: 'grape', color: 'from-purple-500/10 to-purple-600/5' },
    { name: 'Corn', scientific: 'Zea mays', key: 'corn', color: 'from-yellow-500/10 to-yellow-600/5' },
    { name: 'Rice', scientific: 'Oryza sativa', key: 'rice', color: 'from-emerald-500/10 to-emerald-600/5' }
  ]

  return (
    <div className="flex flex-col gap-16 w-full max-w-7xl mx-auto pb-12">
      
      {/* 1. Hero Section & 3D Leaf */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Left Hero Texts */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          <Badge variant="success" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            LeafSense AI Engine v1.0 Active
          </Badge>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-800 dark:text-slate-100 leading-[1.1] tracking-tight">
            Protect your crops with <span className="bg-gradient-to-r from-ai to-ai-light bg-clip-text text-transparent">AI-powered</span> diagnostics.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Upload leaf photos to identify infections in milliseconds, view explainable AI Grad-CAM heatmaps of infected regions, and receive calibrated organic & chemical treatments.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link to="/detect">
              <Button variant="ai" className="gap-2 px-6 py-3 font-semibold">
                <PlusCircle size={18} />
                Launch AI Scanner
              </Button>
            </Link>
            <Link to="/encyclopedia">
              <Button variant="secondary-glass" className="gap-2 px-6 py-3 font-semibold">
                <BookOpen size={18} />
                Crop Encyclopedia
              </Button>
            </Link>
          </div>
        </div>

        {/* Right 3D Rotating Leaf Geometry */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-ai/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <HeroLeaf3D />
        </div>
      </div>

      {/* 2. Upload CTA (AI action styled in Sky Blue) */}
      <Card variant="glass" className="relative p-8 md:p-10 border border-ai/20 dark:border-ai/10 overflow-hidden bg-gradient-to-r from-ai/10 via-ai/5 to-transparent">
        <div className="absolute right-0 top-0 w-96 h-96 bg-ai/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-display font-black text-2xl text-slate-850 dark:text-slate-100">
              Ready to scan your crop foliage?
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Take or upload a close-up photo of infected leaves. Our neural network will analyze the leaf patterns, locate lesions, and outline recommended treatments.
            </p>
          </div>
          <Link to="/detect" className="shrink-0">
            <Button variant="ai" size="lg" className="w-full sm:w-auto gap-2 text-base font-bold shadow-lg shadow-ai/20">
              <PlusCircle size={20} />
              Upload & Analyze
            </Button>
          </Link>
        </div>
      </Card>

      {/* 3. AI Statistics overview */}
      <div className="flex flex-col gap-6">
        <h2 className="font-display font-bold text-xl text-slate-850 dark:text-slate-100">
          Diagnostic System Telemetry
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="glass">
            <CardContent className="p-5 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Scans</span>
              <span className="font-display font-black text-3xl sm:text-4xl text-slate-850 dark:text-slate-100">
                {data.totalScans}
              </span>
              <span className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <History size={10} /> Local IndexedDB records
              </span>
            </CardContent>
          </Card>
          
          <Card variant="glass">
            <CardContent className="p-5 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Healthy Crops</span>
              <span className="font-display font-black text-3xl sm:text-4xl text-green-600 dark:text-green-400">
                {data.healthyCount}
              </span>
              <span className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <Check size={10} className="text-green-500" /> Optimal foliage health
              </span>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-5 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Infections Spotted</span>
              <span className="font-display font-black text-3xl sm:text-4xl text-red-500">
                {data.diseasedCount}
              </span>
              <span className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <AlertTriangle size={10} className="text-red-500" /> Actionable remedies generated
              </span>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-5 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Confidence</span>
              <span className="font-display font-black text-3xl sm:text-4xl text-ai">
                {data.totalScans > 0 ? `${Math.round(data.averageConfidence * 100)}%` : '0%'}
              </span>
              <span className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <BarChart3 size={10} className="text-ai" /> AI calibrated accuracy
              </span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. How It Works */}
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="font-display font-black text-3xl text-slate-850 dark:text-slate-100">
            Explainable AI Diagnosis Workflow
          </h2>
          <p className="text-sm text-slate-500">
            Our cloud-free offline telemetry runs diagnostics securely using modern machine learning models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Upload Image', desc: 'Select or drag a close-up photo of a crop leaf. The application compresses it on-the-fly.', icon: PlusCircle },
            { step: '2', title: '3D AI Scan', desc: 'Our procedural engine performs diagnostic sweeps to inspect visual features.', icon: Cpu },
            { step: '3', title: 'Grad-CAM Heatmap', desc: 'Backpropagation highlights exactly where the CNN detected leaf spots or blight lesions.', icon: Eye },
            { step: '4', title: 'Remedy Sheets', desc: 'Receive immediate chemical, biological, and organic treatments custom tailored to the condition.', icon: ShieldCheck }
          ].map((item, index) => (
            <Card key={index} variant="glass" className="relative p-6">
              <div className="absolute right-4 top-4 text-5xl font-display font-black text-slate-200/40 dark:text-slate-800/30">
                {item.step}
              </div>
              <CardContent className="p-0 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-ai/10 text-ai flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Supported Crops */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <h2 className="font-display font-bold text-xl text-slate-850 dark:text-slate-100">
              Supported Crops
            </h2>
            <p className="text-xs text-slate-500">
              LeafSense AI is optimized for high-accuracy diagnostics on these primary crops.
            </p>
          </div>
          <Link to="/encyclopedia" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            View Encyclopedia <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {supportedCrops.map((crop) => (
            <Card key={crop.key} variant="glass" className={`hover:border-primary/20 dark:hover:border-primary/10 transition-all duration-200 cursor-pointer`}>
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${crop.color} flex items-center justify-center text-primary`}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">
                    {crop.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono italic block mt-0.5">
                    {crop.scientific}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. Dashboard Body: Features & Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Key Features info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h2 className="font-display font-bold text-xl text-slate-850 dark:text-slate-100">
            Core AI Capabilities
          </h2>
          
          <Card variant="glass" className="flex-1 p-5">
            <CardContent className="p-0 flex flex-col gap-6">
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-ai/10 text-ai flex items-center justify-center shrink-0">
                  <Search size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">Explainable AI (Grad-CAM)</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Highlights the exact visual pixels and patches of the leaf that led to the model prediction overlay.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">Offline Secure Storage</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Archived scans are saved locally using IndexedDB. No crop data is shared externally.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <CloudLightning size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">Calibrated Confidence</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Uses temperature-scaled confidence thresholds to prevent false positives in crop diagnostics.
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Scans list */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-xl text-slate-850 dark:text-slate-100">
              Recent Leaf Scans
            </h2>
            <Link to="/history" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View All History <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentScans.length > 0 ? (
              recentScans.map((item) => (
                <Card key={item.id} variant="glass" className="hover:border-primary/30 transition-all duration-200">
                  <CardContent className="p-4 flex items-center gap-4">
                    {/* Leaf thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800">
                      <img src={item.original_image} alt="leaf thumb" className="w-full h-full object-cover" />
                    </div>

                    {/* Scan details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200">
                        {item.crop} - {item.condition}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Scan Date: {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Stats & Link */}
                    <div className="flex items-center gap-3">
                      <Badge variant={item.healthy ? 'success' : 'danger'}>
                        {item.healthy ? 'Healthy' : 'Diseased'}
                      </Badge>
                      <Badge variant="neutral">{Math.round(item.confidence * 100)}%</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card variant="glass" className="p-8 text-center border-dashed border-slate-300 dark:border-slate-800">
                <CardContent className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-slate-100 dark:bg-slate-950 text-slate-400 dark:text-slate-600 rounded-2xl">
                    <History size={24} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-300">No predictions logged yet</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Upload your first crop leaf photo to launch diagnostics. History is saved offline in your browser IndexedDB.
                  </p>
                  <Link to="/detect" className="mt-2">
                    <Button variant="ai" size="sm">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
