import { create } from 'zustand'
import { HistoryRecord } from './historyStore'

interface AnalyticsData {
  totalScans: number
  healthyCount: number
  diseasedCount: number
  averageConfidence: number
  cropDistribution: { name: string; value: number }[]
  diseaseDistribution: { name: string; value: number }[]
  monthlyActivity: { name: string; count: number }[]
  confidenceTrends: { scanIndex: number; confidence: number; label: string }[]
}

interface AnalyticsState {
  data: AnalyticsData
  calculateAnalytics: (items: HistoryRecord[]) => void
}

const emptyData: AnalyticsData = {
  totalScans: 0,
  healthyCount: 0,
  diseasedCount: 0,
  averageConfidence: 0,
  cropDistribution: [],
  diseaseDistribution: [],
  monthlyActivity: [],
  confidenceTrends: []
}

const useAnalyticsStore = create<AnalyticsState>((set) => ({
  data: emptyData,
  calculateAnalytics: (items: HistoryRecord[]) => {
    if (items.length === 0) {
      set({ data: emptyData })
      return
    }

    const totalScans = items.length
    const healthyCount = items.filter(i => i.healthy).length
    const diseasedCount = totalScans - healthyCount
    
    // Avg Confidence
    const sumConf = items.reduce((sum, item) => sum + item.confidence, 0)
    const averageConfidence = sumConf / totalScans

    // Crop distributions
    const cropMap: Record<string, number> = {}
    items.forEach(i => {
      cropMap[i.crop] = (cropMap[i.crop] || 0) + 1
    })
    const cropDistribution = Object.entries(cropMap).map(([name, value]) => ({ name, value }))

    // Disease distributions
    const diseaseMap: Record<string, number> = {}
    items.forEach(i => {
      if (!i.healthy) {
        const key = `${i.crop} (${i.condition})`
        diseaseMap[key] = (diseaseMap[key] || 0) + 1
      }
    })
    const diseaseDistribution = Object.entries(diseaseMap).map(([name, value]) => ({ name, value }))

    // Monthly activity
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthlyMap: Record<string, number> = {}
    
    // Sort items chronologically to build trends
    const chronologicalItems = [...items].reverse()
    
    chronologicalItems.forEach(i => {
      const date = new Date(i.timestamp)
      const monthName = months[date.getMonth()]
      monthlyMap[monthName] = (monthlyMap[monthName] || 0) + 1
    })
    const monthlyActivity = months
      .filter(m => monthlyMap[m] !== undefined || chronologicalItems.length > 0)
      .map(name => ({
        name,
        count: monthlyMap[name] || 0
      }))

    // Confidence trends (last 10 items)
    const confidenceTrends = chronologicalItems.slice(-10).map((item, idx) => ({
      scanIndex: idx + 1,
      confidence: Math.round(item.confidence * 100),
      label: `${item.crop} - ${item.condition}`
    }))

    set({
      data: {
        totalScans,
        healthyCount,
        diseasedCount,
        averageConfidence,
        cropDistribution,
        diseaseDistribution,
        monthlyActivity,
        confidenceTrends
      }
    })
  }
}))

export default useAnalyticsStore
