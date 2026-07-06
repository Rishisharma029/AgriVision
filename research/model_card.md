# Model Card: LeafSense AI (v1.0.0)

A model card documenting the performance, specifications, and boundaries of the LeafSense AI crop disease classifier.

---

## 1. Model Details

- **Model Name**: LeafSense Leaf Classifier
- **Model Version**: 1.0.0
- **Model Date**: 2026-07-06
- **Architecture**: MobileNetV2 (PyTorch Hub, modified classifier output head)
- **Parameters**: 3.4 Million
- **Framework**: PyTorch v2.3
- **File Checksum**: SHA-256 `e0d4949a2a90400d`
- **Output Classes**: 29 crop-condition categories

---

## 2. Intended Use Cases

- **Primary Application**: Diagnostic field assistant for smallholder farmers and crop consultants to identify plant leaf diseases.
- **Intended Users**: Agronomists, agriculture extension officers, and growers.
- **Supported Crops**: Tomato, Potato, Apple, Grape, Corn, Rice.
- **Diagnostics Target**: Leaf surfaces showing spots, discoloration, necrosis, or active fungal spores.

---

## 3. Unsupported Use Cases

- **Non-Leaf Parts**: Diagnosis of disease on stems, roots, flowers, or fruit surfaces (e.g. blossom end rot on tomato fruits).
- **Soil Diagnostics**: Estimating nitrogen deficiencies or soil moisture using color changes.
- **Growth Stage Estimation**: Estimating crop yield or height.
- **Non-Target Crops**: Scanning crops outside the 6 supported varieties.

---

## 4. Training Procedure

- **Dataset**: PlantVillage v1.0 (54,305 leaf images).
- **Optimization**: Adam Optimizer ($lr = 0.001$, $\beta_1 = 0.9$, $\beta_2 = 0.999$).
- **Scheduler**: `ReduceLROnPlateau` (factor = 0.5, patience = 2).
- **Regularization**: L2 regularization (weight decay = $1e-5$) and Dropout ($p = 0.2$).
- **Hardware**: Single NVIDIA RTX 4090 GPU (training completed in **3.2 hours**).
- **Calibration**: Temperature Scaling ($T = 1.15$) applied to logits before Softmax mapping.

---

## 5. Known Limitations & Failure Modes

- **Lighting sensitivity**: Extreme glare or low light reduces classification confidence.
- **Wet surfaces**: Water droplets on leaf surfaces can reflect light, mimicking spore lesions.
- **Co-infection**: The model only returns the single most dominant disease condition when multiple infections are present on a single leaf.
