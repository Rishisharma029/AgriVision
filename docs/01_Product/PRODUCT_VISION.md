# LeafSense AI – Product Vision & Requirements (v1.0)

LeafSense AI is a premium, offline-capable Progressive Web Application (PWA) that empowers farmers and agronomists to diagnose crop leaf diseases instantly using deep learning classifiers.

---

## 1. Product Vision Statement

To bridge the gap between advanced computer vision and field-level agricultural diagnostics by delivering a high-fidelity, secure, and offline-capable diagnostic application. LeafSense AI enables growers to upload leaf photographs, inspect localized infection heatmaps (Grad-CAM), and receive organic and chemical remediation checklists instantly, even in zero-bandwidth environments.

---

## 2. User Personas

### 🧑‍🌾 Persona A: Rajesh, Smallholder Farmer
- **Context**: Cultivates potato and tomato crops on a 4-acre field. Often experiences unstable mobile connectivity in remote fields.
- **Needs**: Quick, visual answers about spots on leaves. Easy-to-follow organic sprays.
- **Pain Points**: Heavy apps fail to load; cannot afford complex hardware; chemical sprays are expensive, so organic methods are preferred.

### 🧑‍🔬 Persona B: Dr. Elena, Agronomist & Field Inspector
- **Context**: Travels between cooperative farms advising growers.
- **Needs**: Accurate diagnostic metrics, CSV prediction history exports, and explainable heatmap (Grad-CAM) overlays to confirm classification reasoning.
- **Pain Points**: Needs data transparency (how does the AI model decide?); requires historical trend analytics to monitor local pathology spreads.

---

## 3. Core Functional Requirements

| ID | Feature | Description | Priority |
|---|---|---|---|
| **FR-1** | Image Diagnostics | Drag-and-drop or camera uploads triggering CNN classifier inference. | CRITICAL |
| **FR-2** | Calibrated Confidence | Returns normalized probabilities corrected by temperature scaling. | HIGH |
| **FR-3** | Explainable AI | Visualizes Grad-CAM backpropagation heatmaps overlaying leaf lesions. | CRITICAL |
| **FR-4** | Local Storage | Stores images and treatment cards in browser IndexedDB. | CRITICAL |
| **FR-5** | Analytics Charts | Renders scan volume and confidence logs using Recharts. | HIGH |
| **FR-6** | Encyclopedia | Houses growing coordinates, soil requirements, and disease details. | MEDIUM |
| **FR-7** | CSV Export | Generates local CSV data logs of history records. | MEDIUM |

---

## 4. Non-Functional Requirements

- **Performance**: API responses completed in under 1.5 seconds.
- **Offline Availability**: PWA service worker precaches all application files and supports offline database insertions.
- **Security**: Strict image file checks (verifying magic byte signatures and OpenCV HSV foliage checks).
- **Aesthetics**: Glassmorphism SaaS interfaces featuring responsive Dark/Light mode designs.
