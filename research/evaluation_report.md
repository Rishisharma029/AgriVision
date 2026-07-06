# Evaluation Report: Validation & Calibration (v1.0.0)

This report documents our validation metrics and calibration parameters across different test environments.

---

## 1. Test Environments & Accuracy Ratings

We evaluated the model across three separate datasets:

| Dataset Profile | Size | Accuracy | Description |
|---|---|---|---|
| **PlantVillage Test Split** | 5,430 images | **97.2%** | Controlled laboratory background lighting. |
| **Held-Out Internal Test Set** | 1,200 images | **93.6%** | Scraped from public forums; contains varied background clutter. |
| **Real Field Dataset** | 450 images | **84.0%** | Internally collected field photos under natural lighting. |

---

## 2. Real-World Field Diagnostics Analysis

The **84.0% real-world accuracy** was measured on 450 field images collected under the following conditions:
- **Crops Evaluated**: Potato (150 images), Tomato (200 images), Rice (100 images).
- **Lighting Conditions**: Sunny (250 images), Overcast (150 images), Shadowed (50 images).
- **Performance Gap**: Sunlight glare and shadows on leaves reduce early-stage disease classification accuracy by approximately **12%**. Overcast lighting yields the highest real-world accuracy (**89.5%**).

---

## 3. Confidence Calibration & Calibration Error

Due to standard Softmax overconfidence, we optimized temperature scaling on the validation set:

- **Expected Calibration Error (ECE) Before Calibration**: **5.4%**
- **Expected Calibration Error (ECE) After Calibration ($T = 1.15$)**: **1.1%**

The calibration reduces ECE by **4.3%**, aligning predicted confidence levels with empirical accuracy rates.

---

## 4. Referrals & Decision Boundaries

- **Threshold**: We define a safety threshold of **$65\%$** confidence.
- **Action**: If a prediction falls below $65\%$ confidence, the UI displays a warning recommending that the user consult a local agricultural extension officer to verify the diagnosis.
