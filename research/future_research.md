# Future Research Directions & Roadmap (v1.0.0)

Planned enhancements to improve the generalization, severity estimation, and runtime efficiency of the LeafSense AI platform.

---

## 1. Unsupervised Domain Adaptation (UDA)

- **Problem**: Model accuracy decreases when shifting from PlantVillage laboratory conditions to real-world fields.
- **Approach**: We plan to implement Unsupervised Domain Adaptation (UDA) using a gradient reversal layer (Adversarial Discriminator). This trains the feature extractor to generate domain-invariant representations, closing the gap between laboratory and field images.

---

## 2. Pre-Inference Leaf Segmentation

- **Problem**: Cluttered backgrounds (soil, weeds, hands) interfere with the model's focus.
- **Approach**: Integrate a lightweight segmentation network (e.g., MobileSAM) to crop the leaf and mask out the background before running the image through the classifier.

---

## 3. Disease Severity Quantization

- **Problem**: Current diagnostics only provide binary predictions (healthy/diseased).
- **Approach**: Train a secondary segmentation model to calculate the ratio of infected leaf area:
  \[\text{Severity Ratio} = \frac{\text{Lesion Area (pixels)}}{\text{Total Leaf Area (pixels)}}\]
  This allows the system to classify infection severity as Low ($< 5\%$), Medium ($5-15\%$), or High ($> 15\%$).

---

## 4. Edge Compilation (ONNX / TensorRT / CoreML)

- **Problem**: Server-side inference requires active network connectivity.
- **Approach**: Compile the calibrated PyTorch model to ONNX, TensorRT, and CoreML formats. This will enable the web client to run inference directly on the user's device using WebAssembly or ONNX Runtime Web.
