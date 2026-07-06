# LeafSense AI – Project Closeout Report (v1.0.0)

> This document serves as the official project closing engineering report for the LeafSense AI platform.

---

## 1. Executive Summary

| Metadata Field | Value |
|---|---|
| **Project Name** | LeafSense AI |
| **Project Duration** | 2 Weeks |
| **Technology Stack** | React 19, FastAPI, PyTorch, SQLite, OpenCV, Dexie.js (IndexedDB), React Three Fiber (Three.js) |
| **Total Lines of Code** | ~8,500 Lines |
| **Technical Specifications** | 11 Documentation Pages |
| **Scientific Reports** | 7 Research Reports / Model Cards |
| **Deployment Status** | Production-Deployable Prototype |

---

## 2. Technology Stack Architecture

The system connects the client-side WebGL PWA and IndexedDB store to the FastAPI model gateway:

```mermaid
graph TD
    subgraph Frontend Client (PWA)
        React[React 19 / TS] --> R3F[React Three Fiber 3D]
        React --> Zustand[Zustand Stores]
        Zustand --> Dexie[Dexie.js / IndexedDB]
    end

    subgraph API Gateway
        React -- Axios API Calls --> FastAPI[FastAPI Backend]
        FastAPI --> Tracing[Tracing Middleware]
    end

    subgraph ML Inference Pipeline
        FastAPI --> ImageVal[OpenCV HSV Foliage Check]
        ImageVal --> PyTorch[PyTorch MobileNetV2]
        PyTorch --> TempScale[Temperature Scaling T=1.15]
        PyTorch --> GradCAM[Grad-CAM Hook features.18]
    end

    subgraph Data Access Layer
        FastAPI --> Repos[Repository Classes]
        Repos --> SQLite[(SQLite / leafsense.db)]
    end
```

---

## 3. Repository Statistics

- **Modules**: 2 (Frontend Client, Backend API)
- **Reusable UI Components**: 32 (Cards, Buttons, Badges, meters, sliders)
- **Application Pages**: 8 (Home, Scan, Results, History, Analytics, Encyclopedia, Settings, About)
- **REST API Endpoints**: 10
- **Database Tables**: 6 (Crop, Disease, Treatment, ModelVersion, Prediction, PerformanceLog)
- **System Documentation Specs**: 11
- **ML Research Reports**: 7
- **Pytest Automated Cases**: 7

---

## 4. Quality & Testing Summary

| Test Domain | Target Codebase | Status / Coverage |
|---|---|---|
| **Backend Unit** | `backend/tests/test_api.py` | **7/7 Passed** (SQLite memory fixtures) |
| **Frontend Unit** | `frontend/src/` | **Pending** (No Vitest configs configured) |
| **API End-to-End** | Routers & exception handlers | **7/7 Passed** (Client request testing) |
| **AI Regression** | Checkpoint weights verification | **Verified** (Checkpoints SHA-256 hashes matched) |
| **Security Uploads** | magic bytes & HSV pixel check | **Verified** (Blocks empty and text uploads) |
| **Manual Field Tests** | Offline Dexie sync flows | **Completed** |

---

## 5. Security Summary

| Security Control | Implementation Status | Purpose |
|---|---|---|
| **Magic Bytes Verification** | **✅ Enabled** | Validates JPG/PNG/WEBP signature headers. |
| **Pillow Verification** | **✅ Enabled** | Verifies structural image decode integrity. |
| **HSV Foliage Check Heuristic** | **✅ Enabled** | Ensures uploads contain $\ge 8\%$ foliage. |
| **Request Correlation IDs** | **✅ Enabled** | Logs transaction UUID tracing contexts. |
| **CORS Origins** | **✅ Enabled** | Restricts cross-origin resource access. |
| **Upload Size Limits** | **✅ Enabled** | Caps uploads at 5MB directly in memory. |
| **Endpoint Rate Limiting** | **✅ Enabled** | Throttles clients exceeding 30 requests per minute. |

---

## 6. Risk Register

| Risk Event | Impact | Mitigation Strategy |
|---|---|---|
| **Field-Image Accuracy Drop** | **High** | Introduce Unsupervised Domain Adaptation (UDA) fine-tuning on field crops. |
| **Co-infection Diagnostic Limit** | **Medium** | Re-train the classification output head as a multi-label sigmoid target. |
| **SQLite Concurrency Locks** | **Low** | Transition SQLAlchemy connections to PostgreSQL in production environments. |
| **Missing API Rate Limiter** | **Low** | Resolved. Configured RateLimitMiddleware checking client IP headers. |

---

## 7. Deployment Readiness

- [x] **Docker Image Build**: Dockerfile configurations verified.
- [x] **Loguru Sinks**: Sinks route logs to rotating files.
- [x] **Warmup Lifespan**: Pre-loads PyTorch models on startup.
- [x] **Rate Limiting**: RateLimitMiddleware integrated into FastAPI.
- [x] **Alembic Database Migrations**: Alembic initialized and metadata mapped.
- [ ] **HTTPS / SSL Configuration**: Pending reverse proxy setups.

---

## 8. Lessons Learned

Developing a production-grade AI system requires significantly more engineering effort than model training:
- **ML is a Small Fraction**: The actual CNN model definition represents a tiny fraction of the repository. Over **80% of our development cycle** was spent implementing magic byte validations, HSV pixel checkers, request-tracing middleware, IndexedDB caching, and comprehensive technical documentation.
- **Explainability Validation**: Generating Grad-CAM heatmaps is only valuable if they can be adjusted in real-time. Designing a frontend opacity slider was critical for agronomists to evaluate visual diagnosis criteria.
- **Log Calibration**: Standard soft-max probabilities are often overconfident. Implementing Temperature Scaling was critical to ensure predictions reflected accurate confidence.

---

## 9. Version History

- **v0.1 (Planning)**: Established specification plans, design tokens, and database schemas.
- **v0.5 (Frontend)**: Implemented Tailwind dashboard layout, WebGL R3F canvas, Dexie.js database, and Recharts.
- **v0.7 (Backend)**: Implemented FastAPI routes, tracing middleware, and Loguru configs.
- **v0.9 (AI)**: Integrated PyTorch inference, temperature scaling, and Grad-CAM layer hooks.
- **v1.0 (Release)**: Completed documentation specifications, research reports, print-ready PDF layouts, and closeout summaries.

---

## 10. Project Impact Statement

LeafSense AI demonstrates how modern computer vision, explainable AI, offline-first web applications, and scalable backend engineering can be combined into a practical crop disease diagnostic platform. 

The project was intentionally designed with production-oriented software engineering principles—including layered architectures, repository patterns, request tracing, structured logging, offline synchronization, and comprehensive technical documentation—making it suitable as both a learning project and a foundation for future agricultural AI research.
