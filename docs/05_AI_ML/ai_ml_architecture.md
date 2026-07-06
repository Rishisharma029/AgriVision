# LeafSense AI – AI/ML Pipeline Specification (v1.0)

LeafSense AI utilizes a pre-trained PyTorch MobileNetV2 model calibrated using Temperature Scaling, and explains predictions using Grad-CAM backpropagation overlays.

---

## 1. Preprocessing Pipeline

Every uploaded image file undergoes normalization and sizing transformations before model inference:
- **Resizing**: Rescaled to $224 \times 224$ pixels using bilinear interpolation.
- **Normalization**: Normalized using the ImageNet channel statistics:
  - **Mean**: $\mu = [0.485, 0.456, 0.406]$
  - **Standard Deviation**: $\sigma = [0.229, 0.224, 0.225]$
- **Tensor Format**: Converted to a float tensor shape of `(1, 3, 224, 224)` (batch size = 1).

---

## 2. Model Architecture & Inference

- **Classifier Core**: `MobileNetV2` (29-class output head). Chosen for its lightweight footprint (ideal for fast CPU/mobile execution).
- **Logits**: The model outputs raw float logits $z_i$ for each class $i$.

---

## 3. Confidence Calibration (Temperature Scaling)

Deep learning classifiers are often overconfident. To correct this, we apply **Temperature Scaling** to logits before calculating the Softmax probabilities. The scaled probability $P_i$ for class $i$ is calculated as:

\[P_i = \frac{e^{z_i / T}}{\sum_{j=1}^{C} e^{z_j / T}}\]

Where:
- $z_i$ is the raw logit output for class $i$
- $T$ is the temperature parameter (calibrated to $T = 1.15$ in our model configuration)
- $C$ is the total number of classes (29)

By setting $T > 1.0$, the Softmax curve is softened, reducing overconfident predictions and producing more reliable probabilities for field agronomists.

---

## 4. Explainable AI: Grad-CAM Heuristics

Grad-CAM (Gradient-weighted Class Activation Mapping) calculates feature maps based on target gradients backpropagated to the last convolutional layer:

```text
Input Tensor ──> Forward Pass ──> Get Logit for Class C
                                          │
Feature Map A <── Backpropagate <─────────┘
      │
Compute Weights (Gradients Average)
      │
Activation Map (ReLU of Weighted Sum) ──> Resize to 224x224 ──> Blend Colormap
```

1. **Target Layer**: We register forward and backward hooks on the last convolutional layer (`features[18]` in MobileNetV2).
2. **Gradient weights**: Compute weights $\alpha_k^c$ by global average pooling the gradients of the score for class $c$ with respect to feature map activation $A^k$:
   \[\alpha_k^c = \frac{1}{Z} \sum_{i} \sum_{j} \frac{\partial y^c}{\partial A_{i, j}^k}\]
3. **Activation Map**: We perform a weighted combination of forward activation maps and apply a ReLU to obtain the heatmap:
   \[L_{\text{Grad-CAM}}^c = \text{ReLU}\left(\sum_{k} \alpha_k^c A^k\right)\]
4. **Heatmap blending**: The $7 \times 7$ activation map is upscaled to the original image dimensions, converted using OpenCV's `COLORMAP_JET` (blue ➔ cold, red ➔ hot lesions), and blended with the source image using an opacity weight of $\beta = 0.5$.
5. **Output**: Returned to the client as a Base64-encoded JPEG.
