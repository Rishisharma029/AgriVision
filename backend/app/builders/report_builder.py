from typing import Dict, Any

class ReportBuilder:
    @staticmethod
    def build_markdown_report(data: Dict[str, Any]) -> str:
        """
        Builds a structured Markdown document from a prediction response dictionary,
        which can be downloaded by the user as a physical file.
        """
        pred = data.get("prediction", {})
        rec = data.get("recommendation", {})
        perf = data.get("performance", {})
        model = data.get("model", {})
        
        status = "HEALTHY" if pred.get("healthy") else "DISEASED"
        
        report = f"""# LeafSense AI Diagnostic Report
**Request ID:** {data.get("request_id")}
**Model Engine:** {model.get("architecture")} (v{model.get("version")})

---

## 📋 Prediction Details
- **Target Crop:** {pred.get("crop")}
- **Condition Status:** {pred.get("condition")} ({status})
- **Classification Confidence:** {pred.get("confidence", 0.0):.2%}
- **Model Checksum:** {model.get("checksum", "N/A")}

---

## 🔬 Diagnostic Information
- **Severity Level:** {rec.get("severity")}
- **Observed Symptoms:** {rec.get("symptoms")}
- **Underlying Causes:** {rec.get("causes")}
- **Transmission/Spread:** {rec.get("spread")}

---

## 🛠️ Actionable Recommendations

### Organic Treatment Options
"""
        for item in rec.get("organic_treatments", []):
            report += f"- {item}\n"
        if not rec.get("organic_treatments"):
            report += "- None requested/necessary.\n"
            
        report += "\n### Chemical Treatment Options\n"
        for item in rec.get("chemical_treatments", []):
            report += f"- {item}\n"
        if not rec.get("chemical_treatments"):
            report += "- None requested/necessary.\n"
            
        report += f"""
### 🧪 Crop Nutrition & Care
- **Fertilizer Guidance:** {rec.get("fertilizer")}
- **Watering & Moisture:** {rec.get("soil_moisture")}

### 📝 Key Step-by-Step Action Items
"""
        for i, item in enumerate(rec.get("action_items", []), 1):
            report += f"{i}. {item}\n"
        if not rec.get("action_items"):
            report += "- No urgent action items necessary.\n"
            
        report += f"""
---

## ⚡ Performance Summary
- **Network Inference Time:** {perf.get("inference_ms")} ms
- **Explainability (Grad-CAM) Generation:** {perf.get("gradcam_ms")} ms
- **Total Pipeline Execution:** {perf.get("total_ms")} ms

*Report generated automatically by LeafSense AI crop health system.*
"""
        return report
