import React, { useState } from 'react'
import { Search, Sprout, Thermometer, ShieldAlert, Sparkles, Compass } from 'lucide-react'
import useEncyclopediaStore, { EncyclopediaCrop } from '../store/encyclopediaStore'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

const CropEncyclopedia: React.FC = () => {
  const { crops } = useEncyclopediaStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCrop, setSelectedCrop] = useState<EncyclopediaCrop | null>(crops[0])

  const filteredCrops = crops.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSeverityVariant = (severity: string) => {
    const s = severity.toLowerCase()
    if (s.includes('critical')) return 'danger'
    if (s.includes('high')) return 'danger'
    if (s.includes('medium')) return 'warning'
    return 'info'
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          Crop Encyclopedia
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore botanical specifications, ideal soil parameters, seasonal care tips, and diagnostic guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Crop search list */}
        <div className="flex flex-col gap-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search crops (e.g. Potato)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-darkCard focus:outline-none focus:ring-2 focus:ring-primary/45"
            />
          </div>

          {/* List items */}
          <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto custom-scrollbar">
            {filteredCrops.map((crop) => (
              <button
                key={crop.name}
                onClick={() => setSelectedCrop(crop)}
                className={`flex items-center gap-3.5 p-4 rounded-2xl text-left border transition-all duration-200 w-full
                  ${selectedCrop?.name === crop.name
                    ? 'border-primary bg-primary/[0.03] dark:bg-primary/[0.05] dark:border-primary'
                    : 'border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-darkCard hover:bg-slate-50 dark:hover:bg-slate-800/25'
                  }
                `}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors
                  ${selectedCrop?.name === crop.name
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }
                `}>
                  <Sprout size={20} />
                </div>
                
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 leading-none">
                    {crop.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 italic mt-1 block truncate">
                    {crop.scientificName}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Columns: Active Selected Crop Details */}
        <div className="lg:col-span-2">
          {selectedCrop ? (
            <div className="flex flex-col gap-6">
              
              {/* Crop Main Intro */}
              <Card variant="glass" className="p-5 sm:p-6 border-l-4 border-l-primary">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-display font-black text-2xl text-slate-850 dark:text-white">
                    {selectedCrop.name}
                  </h2>
                  <Badge variant="neutral" className="italic">{selectedCrop.scientificName}</Badge>
                </div>
                <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                  {selectedCrop.description}
                </p>

                {/* Grow Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/40">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl">
                      <Compass size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-550 uppercase tracking-wider">Soil pH & Texture</h4>
                      <p className="text-sm text-slate-650 dark:text-slate-200 mt-0.5">{selectedCrop.soilRequirements}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl">
                      <Thermometer size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-550 uppercase tracking-wider">Growing Temperature</h4>
                      <p className="text-sm text-slate-650 dark:text-slate-200 mt-0.5">{selectedCrop.temperatureRange}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Seasonal Care guidelines */}
              <Card variant="glass" className="p-5">
                <CardHeader className="p-0 pb-3 border-b-0 flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 uppercase tracking-wider">
                    Seasonal Care & Growing Tips
                  </h3>
                </CardHeader>
                <CardContent className="p-0 pt-2 text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                  {selectedCrop.seasonalCare}
                </CardContent>
              </Card>

              {/* Disease Gallery list */}
              <div className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-100 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-red-500" />
                  Pathology & Disease Gallery
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCrop.diseases.map((disease) => (
                    <Card key={disease.name} className="hover:border-red-200/50 dark:hover:border-red-900/30 transition-colors">
                      <CardContent className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200">
                            {disease.name}
                          </h4>
                          <Badge variant={getSeverityVariant(disease.severity)}>
                            {disease.severity} Severity
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                          <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px] block mb-0.5">Symptoms</span>
                          {disease.symptoms}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <Card variant="glass" className="p-12 text-center border-dashed">
              <CardContent>
                <p className="text-sm text-slate-500">No crop selected. Please choose a crop from the sidebar list.</p>
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  )
}

export default CropEncyclopedia
