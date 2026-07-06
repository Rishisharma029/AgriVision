# LeafSense AI – REST API Specification (v1.0)

All endpoints are versioned under the prefix `/api/v1` and return standard JSON payloads.

---

## 1. POST `/api/v1/prediction/detect`

**Purpose**: Runs the CNN classifier and Grad-CAM backpropagation on an uploaded leaf photograph.

### Request
- **Headers**: `Content-Type: multipart/form-data`
- **Body**:
  - `file`: Binary file (Jpeg, Png, Webp, max 5MB).
  - `request_id` (Optional): String UUID tracking correlation.

### Response (`200 OK`)
```json
{
  "request_id": "40a60762-a876-4b84-a05b-7f44f4b0f1b5",
  "version": "1.0",
  "success": true,
  "data": {
    "model": {
      "version": "1.0.0",
      "architecture": "MobileNetV2 (PyTorch)",
      "training_date": "2026-07-06",
      "dataset": "PlantVillage",
      "checksum": "e0d4949a2a90400d"
    },
    "prediction": {
      "class_index": 12,
      "crop": "Tomato",
      "condition": "Early Blight",
      "confidence": 0.9425,
      "healthy": false
    },
    "gradcam": {
      "heatmap_image": "data:image/jpeg;base64,/9j/..."
    },
    "recommendation": {
      "symptoms": "Dark concentric circles on leaves...",
      "causes": "Fungus Alternaria solani...",
      "spread": "Wind and splashing rain...",
      "severity": "High",
      "prevention": "Prune lower leaves...",
      "organic_treatments": ["Apply copper sprays..."],
      "chemical_treatments": ["Apply Chlorothalonil..."],
      "fertilizer": "NPK with high Potassium...",
      "soil_moisture": "Ground level drip irrigation...",
      "action_items": ["Stake plants..."]
    }
  },
  "metadata": {},
  "performance": {
    "upload_ms": 42.12,
    "inference_ms": 120.45,
    "gradcam_ms": 80.12,
    "total_ms": 242.69
  }
}
```

---

## 2. POST `/api/v1/history/sync`

**Purpose**: Synchronizes a batch of scans recorded offline in browser IndexedDB to the backend SQLite tables.

### Request
- **Headers**: `Content-Type: application/json`
- **Body**: Array of history records.

### Response (`200 OK`)
```json
{
  "status": "success",
  "synced_count": 5
}
```

---

## 3. GET `/api/v1/analytics/summary`

**Purpose**: Aggregates statistics of scanned volume, healthy/diseased counts, average confidence, and disease breakdowns for Recharts visualization.

### Response (`200 OK`)
```json
{
  "total_scans": 150,
  "healthy_count": 90,
  "diseased_count": 60,
  "average_confidence": 0.8912,
  "disease_distribution": [
    { "name": "Early Blight", "value": 35 },
    { "name": "Scab", "value": 25 }
  ],
  "crop_distribution": [
    { "name": "Tomato", "value": 75 },
    { "name": "Apple", "value": 75 }
  ]
}
```

---

## 4. GET `/api/v1/health/status`

**Purpose**: Runs telemetry checks on the system, active model weight registry, SQLite connectivity, and seed status.

### Response (`200 OK`)
```json
{
  "status": "healthy",
  "database": {
    "connection": "online",
    "knowledge_seeded": true
  },
  "model_engine": {
    "version": "1.0.0",
    "architecture": "MobileNetV2 (PyTorch)",
    "loaded": true
  },
  "environment": {
    "python_version": "3.14.5",
    "os_platform": "Windows-11"
  },
  "disk": {
    "total_gb": 234.0,
    "free_gb": 18.12,
    "used_percent": 92.3
  }
}
```
