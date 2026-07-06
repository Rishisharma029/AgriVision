import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Info, BarChart3, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip, Legend } from 'recharts'
import useHistoryStore from '../store/historyStore'
import useAnalyticsStore from '../store/analyticsStore'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

// Curated SaaS-style color palettes for Recharts
const COLORS_PASTEL = ['#16a34a', '#84cc16', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const Analytics: React.FC = () => {
  const { items, loadHistory } = useHistoryStore()
  const { data, calculateAnalytics } = useAnalyticsStore()

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  useEffect(() => {
    calculateAnalytics(items)
  }, [items, calculateAnalytics])

  const hasData = items.length > 0

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Diagnostics Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visualise crop disease occurrences, average confidence distributions, and scanning trends.
          </p>
        </div>

        {!hasData && (
          <Link to="/detect">
            <Button className="gap-2">
              <PlusCircle size={16} />
              Scan a Leaf
            </Button>
          </Link>
        )}
      </div>

      {hasData ? (
        <div className="flex flex-col gap-6">
          
          {/* Top Numerical Summaries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="glass" className="p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Scan Volume</span>
              <span className="font-display font-black text-3xl text-slate-800 dark:text-white mt-2">{data.totalScans}</span>
              <Badge variant="info" className="mt-2 w-fit">Total Predictions</Badge>
            </Card>

            <Card variant="glass" className="p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Healthy Leaves</span>
              <span className="font-display font-black text-3xl text-green-600 dark:text-green-400 mt-2">{data.healthyCount}</span>
              <Badge variant="success" className="mt-2 w-fit">
                {data.totalScans > 0 ? `${Math.round((data.healthyCount/data.totalScans)*100)}%` : '0%'} Ratio
              </Badge>
            </Card>

            <Card variant="glass" className="p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pathology Warnings</span>
              <span className="font-display font-black text-3xl text-red-500 mt-2">{data.diseasedCount}</span>
              <Badge variant="danger" className="mt-2 w-fit">
                {data.totalScans > 0 ? `${Math.round((data.diseasedCount/data.totalScans)*100)}%` : '0%'} Infested
              </Badge>
            </Card>

            <Card variant="glass" className="p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Avg Model Score</span>
              <span className="font-display font-black text-3xl text-primary mt-2">
                {Math.round(data.averageConfidence * 100)}%
              </span>
              <Badge variant="neutral" className="mt-2 w-fit">Calibrated</Badge>
            </Card>
          </div>

          {/* Charts Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Disease Distribution Pie */}
            <Card variant="glass" className="h-[400px] flex flex-col justify-between">
              <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800/40">
                <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200">Crop Disease Breakdown</h3>
              </CardHeader>
              <CardContent className="p-5 flex-1 relative flex items-center justify-center">
                {data.diseaseDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={data.diseaseDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {data.diseaseDistribution.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS_PASTEL[index % COLORS_PASTEL.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(30, 41, 59, 0.85)', 
                          color: '#fff', 
                          borderRadius: '12px',
                          border: 'none' 
                        }} 
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-2 text-center">
                    <Info size={24} />
                    <span className="text-xs">No active infections detected yet.</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chart 2: Crop Distribution Bar */}
            <Card variant="glass" className="h-[400px] flex flex-col justify-between">
              <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800/40">
                <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200">Scanned Crops Overview</h3>
              </CardHeader>
              <CardContent className="p-5 flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data.cropDistribution}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(22, 163, 74, 0.05)' }}
                      contentStyle={{ 
                        background: 'rgba(30, 41, 59, 0.85)', 
                        color: '#fff', 
                        borderRadius: '12px',
                        border: 'none' 
                      }} 
                    />
                    <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]}>
                      {data.cropDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_PASTEL[index % COLORS_PASTEL.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Chart 3: Monthly Scan Volume */}
            <Card variant="glass" className="lg:col-span-2 h-[380px] flex flex-col justify-between">
              <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800/40">
                <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200">Scan Activity Logs</h3>
              </CardHeader>
              <CardContent className="p-5 flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data.monthlyActivity}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(30, 41, 59, 0.85)', 
                        color: '#fff', 
                        borderRadius: '12px',
                        border: 'none' 
                      }} 
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Chart 4: Confidence trends */}
            <Card variant="glass" className="lg:col-span-2 h-[380px] flex flex-col justify-between">
              <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800/40">
                <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200">Confidence Accuracy Trends</h3>
              </CardHeader>
              <CardContent className="p-5 flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={data.confidenceTrends}>
                    <XAxis dataKey="scanIndex" name="Scan Index" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickLine={false} />
                    <Tooltip 
                      labelStyle={{ color: '#94a3b8' }}
                      contentStyle={{ 
                        background: 'rgba(30, 41, 59, 0.85)', 
                        color: '#fff', 
                        borderRadius: '12px',
                        border: 'none' 
                      }} 
                    />
                    <Legend verticalAlign="top" height={36} iconType="line" />
                    <Line 
                      type="monotone" 
                      dataKey="confidence" 
                      name="Confidence Score (%)" 
                      stroke="#16a34a" 
                      strokeWidth={3} 
                      activeDot={{ r: 6 }} 
                      dot={{ r: 4, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

        </div>
      ) : (
        /* Empty State */
        <Card variant="glass" className="p-16 text-center border-dashed border-2">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full">
              <BarChart3 size={32} />
            </div>
            
            <div>
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-350">
                No Analytics Metrics Available
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                Scan your crop leaves to generate statistics. Plots will automatically update once items populate IndexedDB.
              </p>
            </div>
            
            <Link to="/detect" className="mt-2">
              <Button className="gap-2">
                <TrendingUp size={16} />
                Run First Scan
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

    </div>
  )
}

export default Analytics
