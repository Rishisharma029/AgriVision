import { create } from 'zustand'
import axios from 'axios'
import imageCompression from 'browser-image-compression'

const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return ''
  const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname) || window.location.hostname.startsWith('192.168.')
  return isLocal ? '' : 'http://127.0.0.1:8050'
}

interface PredictionResult {
  request_id: string
  version: string
  model: {
    version: string
    architecture: string
    training_date: string
    dataset: string
    checksum: string
  }
  prediction: {
    class_index: number
    crop: string
    condition: string
    confidence: number
    healthy: boolean
  }
  gradcam: {
    heatmap_image: string
  }
  recommendation: {
    symptoms: string
    causes: string
    spread: string
    severity: string
    prevention: string
    organic_treatments: string[]
    chemical_treatments: string[]
    fertilizer: string
    soil_moisture: string
    action_items: string[]
  }
  performance: {
    upload_ms: number
    inference_ms: number
    gradcam_ms: number
    total_ms: number
  }
}

interface PredictionState {
  file: File | null
  previewUrl: string | null
  status: 'idle' | 'preview' | 'validating' | 'compressing' | 'uploading' | 'inferring' | 'gradcam' | 'reporting' | 'completed' | 'failed'
  progress: number
  progressText: string
  result: PredictionResult | null
  error: string | null
  setFile: (file: File) => void
  reset: () => void
  runPrediction: () => Promise<void>
}

export const usePredictionStore = create<PredictionState>((set, get) => ({
  file: null,
  previewUrl: null,
  status: 'idle',
  progress: 0,
  progressText: '',
  result: null,
  error: null,
  
  setFile: (file: File) => {
    const previewUrl = URL.createObjectURL(file)
    set({ file, previewUrl, status: 'preview', result: null, error: null, progress: 0, progressText: '' })
  },
  
  reset: () => {
    const { previewUrl } = get()
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    set({ file: null, previewUrl: null, status: 'idle', result: null, error: null, progress: 0, progressText: '' })
  },
  
  runPrediction: async () => {
    const { file } = get()
    if (!file) {
      set({ status: 'failed', error: 'No leaf image has been selected.' })
      return
    }

    try {
      // Stage 1: Validating
      set({ status: 'validating', progress: 5, progressText: 'Validating leaf image telemetry...' })
      await new Promise(resolve => setTimeout(resolve, 500))

      if (!file.type.startsWith('image/')) {
        set({ status: 'failed', error: 'The selected file is not a valid image format.' })
        return
      }

      // Stage 2: Compressing
      set({ status: 'compressing', progress: 15, progressText: 'Compressing image payload...' })
      
      let compressedFile = file
      try {
        const options = {
          maxSizeMB: 0.4,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          onProgress: (p: number) => {
            set({ progress: 15 + Math.round(p * 20), progressText: 'Compressing image...' })
          }
        }
        compressedFile = await imageCompression(file, options)
      } catch (compErr) {
        console.warn("Image compression failed, using original file", compErr)
      }

      // Stage 3: Uploading
      set({ status: 'uploading', progress: 40, progressText: 'Uploading crop data to CNN engine...' })
      await new Promise(resolve => setTimeout(resolve, 800))

      // Stage 4: Running CNN
      set({ status: 'inferring', progress: 60, progressText: 'Analyzing leaf structure & lesions...' })

      const formData = new FormData()
      formData.append('file', compressedFile, file.name)

      const response = await axios.post<PredictionResult>(`${getApiBaseUrl()}/api/v1/prediction/detect`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Stage 5: Generating Grad-CAM
      set({ status: 'gradcam', progress: 80, progressText: 'Mapping gradients & disease heatmaps...' })
      await new Promise(resolve => setTimeout(resolve, 800))

      // Stage 6: Preparing Report
      set({ status: 'reporting', progress: 95, progressText: 'Compiling care sheets & treatment remedies...' })
      await new Promise(resolve => setTimeout(resolve, 600))

      const rawData = response.data as any
      const resultData: PredictionResult = rawData.success ? {
        request_id: rawData.request_id,
        version: rawData.version,
        model: rawData.data.model,
        prediction: rawData.data.prediction,
        gradcam: rawData.data.gradcam,
        recommendation: rawData.data.recommendation,
        performance: rawData.performance
      } : rawData

      set({ progress: 100, progressText: 'Diagnostics complete!', status: 'completed', result: resultData })
    } catch (err: any) {
      console.error(err)
      let msg = 'Failed to execute leaf diagnostics.'
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message
      } else if (err.message) {
        msg = err.message
      }
      set({ status: 'failed', error: msg, progress: 0 })
    }
  }
}))

export default usePredictionStore
export type { PredictionResult }
