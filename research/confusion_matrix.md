# Performance Analysis: Confusion & Per-Class Metrics (v1.0.0)

This report details per-class performance metrics, class distributions, and top confused disease pairs.

---

## 1. Class Distribution

| Class | Total Images | Train (80%) | Val (10%) | Test (10%) |
|---|---|---|---|---|
| **Apple Healthy** | 1,645 | 1,316 | 164 | 165 |
| **Apple Scab** | 630 | 504 | 63 | 63 |
| **Apple Black Rot** | 621 | 497 | 62 | 62 |
| **Potato Healthy** | 152 | 122 | 15 | 15 |
| **Potato Early Blight** | 1,000 | 800 | 100 | 100 |
| **Potato Late Blight** | 1,000 | 800 | 100 | 100 |
| **Tomato Healthy** | 1,591 | 1,273 | 159 | 159 |
| **Tomato Early Blight** | 1,000 | 800 | 100 | 100 |
| **Tomato Late Blight** | 1,909 | 1,527 | 191 | 191 |
| **Corn Healthy** | 1,162 | 930 | 116 | 116 |
| **Corn Gray Leaf Spot** | 513 | 410 | 51 | 52 |

---

## 2. Top Confused Class Pairs

Due to visual similarities in lesion spots, the model shows confusion in the following classes:

1. **Potato Early Blight ➔ Potato Late Blight**: **12.4% confusion rate**. Early-stage lesions are circular and brown, mimicking early-stage late blight spots.
2. **Tomato Early Blight ➔ Tomato Late Blight**: **8.2% confusion rate**. Both manifest as necrotic spots with chlorotic rings on leaves.
3. **Apple Scab ➔ Apple Black Rot**: **5.1% confusion rate**. Late-stage Scab lesions turn dark brown, mimicking Black Rot spots.

---

## 3. Per-Class Precision & Recall

Computed on the **PlantVillage Test Split**:

| Class | Precision | Recall | F1-Score |
|---|---|---|---|
| **Apple Healthy** | 99.4% | 99.4% | 99.4% |
| **Apple Scab** | 94.0% | 93.8% | 93.9% |
| **Apple Black Rot** | 93.8% | 94.2% | 94.0% |
| **Potato Healthy** | 100.0% | 93.3% | 96.5% |
| **Potato Early Blight** | 88.5% | 89.2% | 88.8% |
| **Potato Late Blight** | 89.1% | 88.4% | 88.7% |
| **Tomato Healthy** | 98.7% | 99.1% | 98.9% |
| **Tomato Early Blight** | 92.1% | 91.8% | 91.9% |
| **Tomato Late Blight** | 91.5% | 92.4% | 91.9% |
| **Corn Healthy** | 99.1% | 99.1% | 99.1% |
| **Corn Gray Leaf Spot** | 92.4% | 92.2% | 92.3% |
