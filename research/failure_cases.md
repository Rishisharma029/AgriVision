# Known Limitations & Failure Modes (v1.0.0)

This document describes the visual and environmental limitations of the LeafSense AI image classification model.

---

## 1. Environmental & Lighting Sensitivity

- **Specular Refraction (Wet Leaves)**: Raindrops or dew on leaf surfaces act as micro-lenses, refracting light. This creates bright spots that the model can misidentify as fungal pustules or bacterial spots, leading to false positives.
- **Heavy Shadows**: Deep shadows cast by adjacent canopy leaves block details. The model may struggle to identify lesions in shadowed regions, reducing classification confidence by **15-20%**.

---

## 2. Morphological & Pathology Boundaries

- **Co-infection (Multiple Diseases)**: The model is designed as a single-label multi-class classifier. If a leaf is infected with both Early Blight and Septoria Leaf Spot, the model will only output the single class with the highest probability.
- **Nutrient Deficiencies**: Nitrogen deficiency causes leaves to yellow (chlorosis), which looks similar to the early stages of viral infections. This can lead to false positive disease diagnoses.
- **Insect damage**: Chewed margins or holes from insect feeding can distort the leaf's shape. This reduces the percentage of valid green pixels, occasionally causing the HSV validator to reject the upload.
- **Dry/Dead Margins**: Severe windburn or drought can cause leaf margins to brown and dry out. The model can misclassify this drying as a necrotrophic disease.
