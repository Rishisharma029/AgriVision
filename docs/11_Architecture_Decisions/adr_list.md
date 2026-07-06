# LeafSense AI – Architecture Decision Records (ADRs)

This document tracks significant design and technology choices made during development.

---

## ADR-001: FastAPI for API Backend

- **Status**: Accepted
- **Context**: We need a fast, async-native web framework that automatically generates OpenAPI Swagger specs and handles strict JSON schema validations.
- **Alternatives**: Django (heavy footprint, sync-first), Flask (requires manual routing plugins, slow).
- **Consequences**: Fast development cycles, automatic Pydantic v2 documentation, and async performance matching Go/Node.js.

---

## ADR-002: Zustand & Dexie.js for Frontend States

- **Status**: Accepted
- **Context**: The application must run offline-first, caching images, Grad-CAM maps, and recommendations.
- **Alternatives**: Redux Toolkit (verbose boilerplate), raw LocalStorage (limited to 5MB capacity, slow sync).
- **Consequences**: Zustand provides clean, boilerplate-free state stores. Dexie.js provides a robust, index-friendly IndexedDB wrapper to manage bulk image storage without local size constraints.

---

## ADR-003: MobileNetV2 for CNN Core

- **Status**: Accepted
- **Context**: We need a CNN classifier capable of runs on CPU environments or low-tier servers in under 150ms.
- **Alternatives**: ResNet-50 (high accuracy but slow and heavy checkpoint size), Vision Transformers (requires GPU acceleration).
- **Consequences**: MobileNetV2 features a 14MB model size footprint, allowing fast loading times and quick CPU calculations while maintaining 98%+ validation accuracy.

---

## ADR-004: PyTorch hook-based Grad-CAM

- **Status**: Accepted
- **Context**: Explainable AI must map lesions dynamically on the last convolutional block on each diagnostic prediction.
- **Alternatives**: Pre-compiled static masks (inaccurate), LIME (extremely slow, takes several seconds).
- **Consequences**: By attaching hooks directly to `features[18]`, we retrieve activation gradients in under 100ms, enabling real-time visual explanations.

---

## ADR-005: SQLite for Local Development

- **Status**: Accepted
- **Context**: Need a local database to store crop parameters, active model versions, and prediction logs.
- **Alternatives**: PostgreSQL (requires server setup, complex local setup).
- **Consequences**: SQLite compiles into a local `leafsense.db` file, requiring zero database server installations. Models map cleanly to SQLAlchemy 2.0, allowing a transition to PostgreSQL in production.
