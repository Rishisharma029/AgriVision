import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, RotateCcw, ShieldCheck, ArrowRight, X } from 'lucide-react'
import usePredictionStore from '../store/predictionStore'
import useHistoryStore from '../store/historyStore'
import { fileToBase64 } from '../utils/imageCompressor'
import ImageUploader from '../components/ai/ImageUploader'
import ScanningLeaf3D from '../components/3d/ScanningLeaf3D'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const Detect: React.FC = () => {
  const navigate = useNavigate()
  
  const { 
    file, 
    previewUrl,
    status, 
    progress, 
    progressText, 
    result, 
    error, 
    setFile,
    runPrediction, 
    reset 
  } = usePredictionStore()
  
  const { addRecord } = useHistoryStore()

  // Auto-redirect to results page once scanning is completed and results are saved in local DB
  useEffect(() => {
    const saveAndRedirect = async () => {
      if (status === 'completed' && result && file) {
        try {
          // Convert file to Base64 for offline IndexedDB archiving
          const originalBase64 = await fileToBase64(file)
          await addRecord(result, originalBase64, result.gradcam.heatmap_image)
          
          // Brief pause for visual feedback
          setTimeout(() => {
            navigate('/results')
          }, 800)
        } catch (e) {
          console.error("Error archiving prediction in IndexedDB", e)
          navigate('/results') // Fallback redirect anyway
        }
      }
    }
    saveAndRedirect()
  }, [status, result, file, addRecord, navigate])

  const handleImageSelected = (selectedFile: File) => {
    setFile(selectedFile) // Pushes page to 'preview' stage
  }

  const isScanning = ['validating', 'compressing', 'uploading', 'inferring', 'gradcam', 'reporting'].includes(status)

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto py-6">
      
      {/* Page Title & Header */}
      <div className="text-center mb-2">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-800 dark:text-slate-100">
          Leaf Health Diagnosis
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 max-w-lg mx-auto">
          Scan your crop leaves to diagnose health issues, locate lesions, and view explainable Grad-CAM overlays instantly.
        </p>
      </div>

      {/* STAGE 1: Upload (idle) */}
      {status === 'idle' && (
        <ImageUploader onImageSelected={handleImageSelected} />
      )}

      {/* STAGE 2: Preview */}
      {status === 'preview' && previewUrl && (
        <Card variant="glass" className="p-6 border border-slate-200/50 dark:border-slate-800/20">
          <CardContent className="p-0 flex flex-col gap-6 items-center">
            
            {/* Image Preview Window */}
            <div className="relative w-full max-h-[380px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
              <img 
                src={previewUrl} 
                alt="Selected leaf preview" 
                className="w-full h-full object-contain max-h-[380px] mx-auto"
              />
              {/* Close Button */}
              <button 
                onClick={reset}
                className="absolute top-3 right-3 p-2 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full transition-colors"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>

            {/* Stage Actions */}
            <div className="flex flex-wrap justify-between items-center w-full gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/40">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={16} className="text-primary" />
                <span>Ready for local offline telemetry</span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button 
                  variant="secondary-glass" 
                  onClick={reset}
                  className="flex-1 sm:flex-initial"
                >
                  Cancel
                </Button>
                <Button 
                  variant="ai" // Blue button for AI triggers
                  onClick={() => runPrediction()}
                  className="flex-1 sm:flex-initial gap-2 font-bold shadow-lg shadow-ai/20"
                >
                  Analyze Leaf Health
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>
      )}

      {/* STAGE 3: 3D Scan / Telemetry Timeline */}
      {isScanning && (
        <ScanningLeaf3D progressText={progressText} progress={progress} />
      )}

      {/* STAGE 4: Completion Loading Redirect state */}
      {status === 'completed' && (
        <Card variant="glass" className="p-8 text-center bg-gradient-to-tr from-emerald-500/5 to-ai/5 border-emerald-500/20">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">
                Diagnostics Completed!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Saving report data to IndexedDB. Preparing explainable view...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STAGE 5: Failed State */}
      {status === 'failed' && (
        <Card className="border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 p-6 text-center">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
              <AlertCircle size={28} />
            </div>
            
            <div>
              <h3 className="font-display font-bold text-lg text-red-800 dark:text-red-300">
                Scan Telemetry Failed
              </h3>
              <p className="text-sm text-red-650 dark:text-red-450 mt-1 max-w-md mx-auto leading-relaxed">
                {error || 'An unexpected error occurred during prediction. Please verify the backend is running and try again.'}
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <Button onClick={reset} className="gap-2 bg-red-600 hover:bg-red-700 shadow-red-600/20">
                <RotateCcw size={16} />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}

export default Detect
