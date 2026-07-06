import React, { useState } from 'react'
import { Leaf, FlaskConical, Droplet, CheckCircle } from 'lucide-react'
import { Card } from '../ui/Card'

interface TreatmentCardProps {
  organicTreatments: string[]
  chemicalTreatments: string[]
  fertilizer: string
  soilMoisture: string
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  organicTreatments,
  chemicalTreatments,
  fertilizer,
  soilMoisture
}) => {
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'care'>('organic')

  return (
    <Card variant="glass" className="w-full">
      {/* Navigation tabs header */}
      <div className="flex border-b border-slate-200/50 dark:border-slate-800/40">
        <button
          onClick={() => setActiveTab('organic')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all duration-200 border-b-2
            ${activeTab === 'organic'
              ? 'border-primary text-primary bg-primary/[0.02]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }
          `}
        >
          <Leaf size={16} />
          Organic Remediation
        </button>
        <button
          onClick={() => setActiveTab('chemical')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all duration-200 border-b-2
            ${activeTab === 'chemical'
              ? 'border-primary text-primary bg-primary/[0.02]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }
          `}
        >
          <FlaskConical size={16} />
          Chemical Control
        </button>
        <button
          onClick={() => setActiveTab('care')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all duration-200 border-b-2
            ${activeTab === 'care'
              ? 'border-primary text-primary bg-primary/[0.02]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }
          `}
        >
          <Droplet size={16} />
          Soil & Nutrition
        </button>
      </div>

      {/* Content panel */}
      <div className="p-5 min-h-[180px]">
        {activeTab === 'organic' && (
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-1">
              Natural & Biological Options
            </h4>
            {organicTreatments.length > 0 ? (
              <ul className="flex flex-col gap-2.5">
                {organicTreatments.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-650 dark:text-slate-300">
                    <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-500 italic">No organic treatments necessary.</p>
            )}
          </div>
        )}

        {activeTab === 'chemical' && (
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-1">
              Synthetic & Mineral Options
            </h4>
            {chemicalTreatments.length > 0 ? (
              <ul className="flex flex-col gap-2.5">
                {chemicalTreatments.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-650 dark:text-slate-300">
                    <CheckCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-500 italic">No chemical applications recommended.</p>
            )}
          </div>
        )}

        {activeTab === 'care' && (
          <div className="flex flex-col gap-4">
            {/* Fertilization advice */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                Fertilization & Silicates
              </h5>
              <p className="text-sm text-slate-650 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/20 p-3 rounded-xl border border-slate-100 dark:border-slate-800/10">
                {fertilizer}
              </p>
            </div>
            
            {/* Irrigation advice */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                Irrigation & Moisture
              </h5>
              <p className="text-sm text-slate-650 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/20 p-3 rounded-xl border border-slate-100 dark:border-slate-800/10">
                {soilMoisture}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
export default TreatmentCard
