import React, { useEffect } from 'react'
import { Search, Trash2, Calendar, Download, ExternalLink, RefreshCw } from 'lucide-react'
import useHistoryStore, { HistoryRecord } from '../store/historyStore'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import usePredictionStore from '../store/predictionStore'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const History: React.FC = () => {
  const navigate = useNavigate()
  const { 
    items, 
    loading, 
    searchQuery, 
    cropFilter, 
    conditionFilter, 
    loadHistory, 
    deleteRecord, 
    clearHistory,
    setSearchQuery,
    setCropFilter,
    setConditionFilter,
    getFilteredItems
  } = useHistoryStore()
  
  
  // No-op triggers to ensure store mounts

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const filteredItems = getFilteredItems()

  // Generate CSV of history log entries
  const exportToCSV = () => {
    if (items.length === 0) {
      toast.error("No scans to export.")
      return
    }
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Timestamp,Crop,Condition,Healthy,Confidence,Model Architecture,Model Version,Total Duration (ms)\n"
      
    items.forEach((item) => {
      const date = new Date(item.timestamp).toISOString()
      const row = `"${item.id}","${date}","${item.crop}","${item.condition}","${item.healthy}","${item.confidence}","${item.model_info.architecture}","${item.model_info.version}","${item.performance.total_ms}"`
      csvContent += row + "\n"
    })
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `leafsense-history-export.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("CSV exported successfully!")
  }

  // Load a historic record back into the predictionStore to view in Results.tsx
  const viewFullRecord = async (record: HistoryRecord) => {
    try {
      // Re-initialize predictionStore values so the Results page loads this record
      const mockFile = new File([], "restored_leaf.jpg", { type: "image/jpeg" })
      
      // Update store directly
      usePredictionStore.setState({
        file: mockFile,
        previewUrl: record.original_image, // Base64 JPEG acts as preview
        status: 'completed',
        result: {
          request_id: `restored-${record.id}`,
          version: "1.0",
          model: record.model_info,
          prediction: {
            class_index: 0,
            crop: record.crop,
            condition: record.condition,
            confidence: record.confidence,
            healthy: record.healthy
          },
          gradcam: {
            heatmap_image: record.heatmap_image
          },
          recommendation: record.recommendation,
          performance: record.performance
        }
      })
      
      navigate('/results')
    } catch (e) {
      toast.error("Failed to restore history record details.")
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      {/* Header and export controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-slate-100">
            Offline Scan History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse and manage your past diagnostic logs stored locally inside IndexedDB.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
            <Download size={14} />
            Export CSV
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => {
              if (window.confirm("Are you sure you want to clear your local history database? This action is permanent!")) {
                clearHistory()
                toast.success("IndexedDB prediction database cleared.")
              }
            }} 
            className="gap-2"
          >
            <Trash2 size={14} />
            Clear All
          </Button>
        </div>
      </div>

      {/* Filter panel */}
      <Card variant="glass" className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by crop or disease..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-darkCard focus:outline-none focus:ring-2 focus:ring-primary/45"
            />
          </div>

          {/* Crop Selector */}
          <div>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-darkCard focus:outline-none focus:ring-2 focus:ring-primary/45"
            >
              <option value="">All Crops</option>
              <option value="Apple">Apple</option>
              <option value="Corn">Corn</option>
              <option value="Potato">Potato</option>
              <option value="Tomato">Tomato</option>
              <option value="Grape">Grape</option>
              <option value="Rice">Rice</option>
            </select>
          </div>

          {/* Status selector */}
          <div>
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-darkCard focus:outline-none focus:ring-2 focus:ring-primary/45"
            >
              <option value="">All Health Statuses</option>
              <option value="Healthy">Healthy</option>
              <option value="Diseased">Diseased</option>
            </select>
          </div>
        </div>
      </Card>

      {/* History Grid/List view */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-500">
          <RefreshCw size={32} className="animate-spin text-primary mb-3" />
          <span>Querying IndexedDB record tables...</span>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col justify-between h-[360px]">
              
              {/* Card Header & Preview Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-850">
                <img src={item.original_image} alt={item.crop} className="w-full h-full object-cover" />
                
                {/* Crop & date tags overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3.5">
                  <div className="text-white">
                    <h3 className="font-display font-bold text-sm leading-none">{item.crop}</h3>
                    <span className="text-[10px] text-slate-300 mt-1 flex items-center gap-1">
                      <Calendar size={10} /> {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge variant={item.healthy ? 'success' : 'danger'}>
                    {item.healthy ? 'Healthy' : 'Diseased'}
                  </Badge>
                </div>
              </div>

              {/* Card body */}
              <CardContent className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Diagnosis</span>
                    <Badge variant="neutral">{Math.round(item.confidence * 100)}% Confidence</Badge>
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-800 dark:text-slate-200 truncate">
                    {item.condition}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.recommendation.symptoms}
                  </p>
                </div>

                {/* Foot card actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => viewFullRecord(item)}
                    className="flex-1 gap-1 text-xs"
                  >
                    <ExternalLink size={12} />
                    View Details
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => {
                      if (item.id !== undefined) {
                        deleteRecord(item.id)
                        toast.success("Record deleted.")
                      }
                    }}
                    className="px-3"
                    aria-label="Delete record"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </CardContent>

            </Card>
          ))}
        </div>
      ) : (
        <Card variant="glass" className="p-16 text-center border-dashed border-2">
          <CardContent className="flex flex-col items-center gap-3">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full">
              <Search size={28} />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-300">
              No History Matches Found
            </h3>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Try adjusting your query, filters, or crop types. If you haven't uploaded any leaf scans yet, head over to the Scan page.
            </p>
            <Link to="/detect" className="mt-2">
              <Button size="sm">New Leaf Scan</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default History
