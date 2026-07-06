import { create } from 'zustand'
import Dexie, { type Table } from 'dexie'
import { PredictionResult } from './predictionStore'

// 1. Define IndexedDB Schema
export interface HistoryRecord {
  id?: number
  timestamp: number
  crop: string
  condition: string
  confidence: number
  healthy: boolean
  original_image: string // Base64 encoded JPEG
  heatmap_image: string  // Base64 encoded PNG
  recommendation: any
  performance: any
  model_info: any
}

class LeafSenseDB extends Dexie {
  history!: Table<HistoryRecord>

  constructor() {
    super('LeafSenseDB')
    this.version(1).stores({
      history: '++id, timestamp, crop, condition, healthy, confidence'
    })
  }
}

export const db = new LeafSenseDB()

// 2. Define Zustand Store wrapping Dexie operations
interface HistoryState {
  items: HistoryRecord[]
  loading: boolean
  searchQuery: string
  cropFilter: string
  conditionFilter: string
  loadHistory: () => Promise<void>
  addRecord: (result: PredictionResult, originalImageBase64: string, heatmapBase64: string) => Promise<void>
  deleteRecord: (id: number) => Promise<void>
  clearHistory: () => Promise<void>
  setSearchQuery: (query: string) => void
  setCropFilter: (filter: string) => void
  setConditionFilter: (filter: string) => void
  getFilteredItems: () => HistoryRecord[]
}

const useHistoryStore = create<HistoryState>((set, get) => ({
  items: [],
  loading: false,
  searchQuery: '',
  cropFilter: '',
  conditionFilter: '',
  
  loadHistory: async () => {
    set({ loading: true })
    try {
      const records = await db.history.orderBy('timestamp').reverse().toArray()
      set({ items: records, loading: false })
    } catch (e) {
      console.error("Failed to load history from IndexedDB", e)
      set({ loading: false })
    }
  },
  
  addRecord: async (result: PredictionResult, originalImageBase64: string, heatmapBase64: string) => {
    const record: HistoryRecord = {
      timestamp: Date.now(),
      crop: result.prediction.crop,
      condition: result.prediction.condition,
      confidence: result.prediction.confidence,
      healthy: result.prediction.healthy,
      original_image: originalImageBase64,
      heatmap_image: heatmapBase64,
      recommendation: result.recommendation,
      performance: result.performance,
      model_info: result.model
    }
    
    try {
      await db.history.add(record)
      await get().loadHistory()
    } catch (e) {
      console.error("Failed to add prediction to history", e)
    }
  },
  
  deleteRecord: async (id: number) => {
    try {
      await db.history.delete(id)
      await get().loadHistory()
    } catch (e) {
      console.error(`Failed to delete record ${id}`, e)
    }
  },
  
  clearHistory: async () => {
    try {
      await db.history.clear()
      set({ items: [] })
    } catch (e) {
      console.error("Failed to clear database history", e)
    }
  },
  
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setCropFilter: (filter: string) => set({ cropFilter: filter }),
  setConditionFilter: (filter: string) => set({ conditionFilter: filter }),
  
  getFilteredItems: () => {
    const { items, searchQuery, cropFilter, conditionFilter } = get()
    return items.filter(item => {
      const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.condition.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCrop = cropFilter === '' || item.crop === cropFilter
      const matchesCondition = conditionFilter === '' || 
                               (conditionFilter === 'Healthy' && item.healthy) ||
                               (conditionFilter === 'Diseased' && !item.healthy)
      return matchesSearch && matchesCrop && matchesCondition
    })
  }
}))

export default useHistoryStore
export type { HistoryState }
