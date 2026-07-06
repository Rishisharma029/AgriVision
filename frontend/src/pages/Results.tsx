import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Download, RotateCcw, AlertTriangle, CheckCircle, ShieldCheck, Cpu, Printer } from 'lucide-react'
import usePredictionStore from '../store/predictionStore'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import ConfidenceMeter from '../components/ai/ConfidenceMeter'
import HeatmapViewer from '../components/ai/HeatmapViewer'
import TreatmentCard from '../components/ai/TreatmentCard'

const Results: React.FC = () => {
  const { previewUrl, result, reset } = usePredictionStore()

  // If no result is loaded, redirect to scan home
  if (!result || !previewUrl) {
    return <Navigate to="/detect" replace />
  }

  const { prediction, model, recommendation, performance } = result
  const isHealthy = prediction.healthy

  // Client-side markdown report generator
  const downloadReport = () => {
    const status = isHealthy ? 'HEALTHY' : 'DISEASED'
    
    let treatmentsText = '### Organic Treatments\n'
    recommendation.organic_treatments.forEach(t => { treatmentsText += `- ${t}\n` })
    if (recommendation.organic_treatments.length === 0) treatmentsText += '- N/A\n'

    treatmentsText += '\n### Chemical Controls\n'
    recommendation.chemical_treatments.forEach(t => { treatmentsText += `- ${t}\n` })
    if (recommendation.chemical_treatments.length === 0) treatmentsText += '- N/A\n'

    let actionItemsText = ''
    recommendation.action_items.forEach((item, idx) => { actionItemsText += `${idx + 1}. ${item}\n` })
    if (recommendation.action_items.length === 0) actionItemsText += '- No immediate actions needed.\n'

    const reportContent = `# LeafSense AI Crop Diagnostic Report
**Request ID:** ${result.request_id}
**Analysis Engine:** ${model.architecture} (v${model.version})
**Timestamp:** ${new Date().toLocaleString()}

---

## 📋 Diagnostic Summary
- **Target Crop:** ${prediction.crop}
- **Identified Condition:** ${prediction.condition}
- **Foliage Status:** ${status}
- **Accuracy Confidence:** ${(prediction.confidence * 100).toFixed(2)}%

---

## 🔬 Pathology Details
- **Severity Level:** ${recommendation.severity}
- **Observed Symptoms:** ${recommendation.symptoms}
- **Root Causes:** ${recommendation.causes}
- **Spread Rate:** ${recommendation.spread}
- **Preventative Practices:** ${recommendation.prevention}

---

## 🛠️ Actionable Treatments & Remedies

${treatmentsText}

### 🧪 Fertilizer & Irrigation Recommendations
- **Fertilizer:** ${recommendation.fertilizer}
- **Moisture/Watering:** ${recommendation.soil_moisture}

### 📝 Step-by-Step Action Items
${actionItemsText}

---

## ⚡ Performance Profiling
- **Server Upload:** ${performance.upload_ms} ms
- **CNN Inference:** ${performance.inference_ms} ms
- **Grad-CAM Calculation:** ${performance.gradcam_ms} ms
- **Total Pipeline Duration:** ${performance.total_ms} ms

*This report is compiled and archived locally in LeafSense IndexedDB.*
`

    const blob = new Blob([reportContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `leafsense-report-${result.request_id.slice(0, 8)}.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Interactive Desktop / Mobile View (Hidden when printing) */}
      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto py-2 print:hidden">
        {/* Back & Export buttons header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/detect" onClick={reset} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-350 transition-colors">
            <ArrowLeft size={16} />
            Scan Another Leaf
          </Link>
          
          <div className="flex gap-2">
            <Button variant="secondary-glass" size="sm" onClick={downloadReport} className="gap-2">
              <Download size={14} />
              MD Report
            </Button>
            <Button variant="secondary-glass" size="sm" onClick={() => window.print()} className="gap-2">
              <Printer size={14} />
              Print PDF
            </Button>
            <Link to="/detect" onClick={reset}>
              <Button size="sm" variant="ai" className="gap-2">
                <RotateCcw size={14} />
                New Scan
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card variant="glass">
              <CardContent className="p-4 flex flex-col items-center">
                <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider mb-2 self-start">
                  Prediction Accuracy
                </h3>
                <ConfidenceMeter value={prediction.confidence} />
              </CardContent>
            </Card>

            <HeatmapViewer 
              originalImage={previewUrl} 
              heatmapImage={result.gradcam.heatmap_image} 
            />
          </div>

          {/* Right Column (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card variant="glass" className="p-5 sm:p-6 border-l-4 border-l-primary">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge variant={isHealthy ? 'success' : 'danger'} className="mb-2">
                    {isHealthy ? 'Healthy Specimen' : 'Infection Detected'}
                  </Badge>
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-850 dark:text-slate-100">
                    {prediction.crop} – {prediction.condition}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Request ID: {result.request_id} // Pipeline time: {performance.total_ms.toFixed(0)}ms
                  </p>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-mono text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/10">
                  <Cpu size={14} className="text-ai" />
                  <span>{model.architecture}</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/40">
                <div className="flex gap-3">
                  <div className="p-2 h-fit bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-450 rounded-xl">
                    {isHealthy ? <CheckCircle size={16} className="text-green-500" /> : <AlertTriangle size={16} className="text-red-500" />}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Symptoms</h4>
                    <p className="text-sm text-slate-650 dark:text-slate-300 mt-0.5">{recommendation.symptoms}</p>
                  </div>
                </div>
                
                {!isHealthy && (
                  <div className="flex gap-3">
                    <div className="p-2 h-fit bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-450 rounded-xl">
                      <ShieldCheck size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Severity & Cause</h4>
                      <p className="text-sm text-slate-650 dark:text-slate-300 mt-0.5">
                        <span className="font-bold text-amber-600 dark:text-amber-450">[{recommendation.severity}]</span> {recommendation.causes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card variant="glass" className="p-5 border-l-4 border-l-ai bg-gradient-to-tr from-ai/5 via-transparent to-transparent">
              <CardHeader className="p-0 pb-3 border-b-0 flex items-center gap-2">
                <Cpu size={16} className="text-ai" />
                <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-200">
                  Explainable AI Diagnostics Explanation
                </h3>
              </CardHeader>
              <CardContent className="p-0 pt-1">
                <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed">
                  The neural network completed inference on the leaf specimen image using the {model.architecture} model. 
                  {isHealthy ? (
                    ` The model detected high structural leaf regularity and clean foliage veins, suggesting optimal agricultural health. The calibrated confidence of ${(prediction.confidence * 100).toFixed(1)}% confirms no remediation is necessary.`
                  ) : (
                    ` The model identified localized lesions and cellular abnormalities corresponding to ${prediction.condition}. The explainable Grad-CAM heatmap highlights active focus coordinates on the leaf surface, indicating where the model spotted necrotic tissue. Follow the prevention and treatment care sheets below to mitigate infection spread.`
                  )}
                </p>
              </CardContent>
            </Card>

            <TreatmentCard
              organicTreatments={recommendation.organic_treatments}
              chemicalTreatments={recommendation.chemical_treatments}
              fertilizer={recommendation.fertilizer}
              soilMoisture={recommendation.soil_moisture}
            />
            
            {recommendation.action_items.length > 0 && (
              <Card variant="glass" className="p-5">
                <CardHeader className="p-0 pb-3 border-b-0">
                  <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-200">
                    Recommended Crop Action Items
                  </h3>
                </CardHeader>
                <CardContent className="p-0 pt-2 flex flex-col gap-3">
                  {recommendation.action_items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/10">
                      <div className="flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary text-xs font-mono shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Printable Report Layout (Hidden on screen, styled specifically for PDF paper print) */}
      <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto">
        {/* Printable Header */}
        <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900">
              🌿 LeafSense AI
            </h1>
            <p className="text-sm text-slate-600 font-semibold mt-1">
              Crop Disease Diagnostics Report
            </p>
          </div>
          {/* Mock QR Code SVG */}
          <div className="w-16 h-16 border-2 border-black p-1">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
              <rect x="0" y="0" width="20" height="20" />
              <rect x="0" y="80" width="20" height="20" />
              <rect x="80" y="0" width="20" height="20" />
              <rect x="40" y="40" width="20" height="20" />
              <rect x="20" y="20" width="10" height="10" />
              <rect x="70" y="70" width="20" height="20" />
              <rect x="50" y="10" width="10" height="10" />
              <rect x="10" y="50" width="10" height="10" />
            </svg>
          </div>
        </div>

        {/* Diagnosis Parameters */}
        <div className="grid grid-cols-2 gap-6 my-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Crop</p>
            <p className="text-lg font-black text-slate-900">{prediction.crop}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Identified Condition</p>
            <p className="text-lg font-black text-slate-900">{prediction.condition}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Calibrated Accuracy</p>
            <p className="text-lg font-black text-slate-900">{(prediction.confidence * 100).toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis Date</p>
            <p className="text-sm font-semibold text-slate-700">{new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* side by side images */}
        <div className="grid grid-cols-2 gap-8 my-6">
          <div className="flex flex-col items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Original Specimen</h4>
            <img src={previewUrl} className="w-full h-48 object-cover rounded-md border border-slate-200" alt="Specimen" />
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Grad-CAM Infection Heatmap</h4>
            <img src={result.gradcam.heatmap_image} className="w-full h-48 object-cover rounded-md border border-slate-200" alt="Heatmap" />
          </div>
        </div>

        {/* Pathology Details */}
        <div className="my-6 space-y-4">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider border-b border-slate-200 pb-1 text-slate-800">
              Pathology & Symptoms
            </h3>
            <p className="text-sm text-slate-700 mt-2"><strong className="text-black">Observed Symptoms:</strong> {recommendation.symptoms}</p>
            <p className="text-sm text-slate-700 mt-1"><strong className="text-black">Root Causes:</strong> {recommendation.causes}</p>
            <p className="text-sm text-slate-700 mt-1"><strong className="text-black">Transmission Vectors:</strong> {recommendation.spread}</p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider border-b border-slate-200 pb-1 text-slate-800">
              Actionable Remedies
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs font-bold text-slate-500">Organic Treatments</p>
                <ul className="list-disc list-inside text-xs text-slate-700 mt-1">
                  {recommendation.organic_treatments.map((t, idx) => <li key={idx}>{t}</li>)}
                  {recommendation.organic_treatments.length === 0 && <li>N/A</li>}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500">Chemical Control</p>
                <ul className="list-disc list-inside text-xs text-slate-700 mt-1">
                  {recommendation.chemical_treatments.map((t, idx) => <li key={idx}>{t}</li>)}
                  {recommendation.chemical_treatments.length === 0 && <li>N/A</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Model Meta Footer */}
        <div className="mt-8 pt-4 border-t border-slate-350 flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <div>
            <p>Engine: {model.architecture} (v{model.version})</p>
            <p>Checksum: {model.checksum}</p>
            <p>Request ID: {result.request_id}</p>
          </div>
          <p className="text-right">
            LeafSense Diagnostics Verification<br />
            © {new Date().getFullYear()} LeafSense AI
          </p>
        </div>
      </div>
    </>
  )
}

export default Results
