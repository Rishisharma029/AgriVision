import cv2
import numpy as np
import torch
import torch.nn as nn
import io
import base64
import threading
from PIL import Image
from ..core.logging_config import logger_error, logger_prediction
from ..exceptions.model import ModelInferenceException

class GradCAMService:
    _lock = threading.Lock()  # Prevent concurrent hook collisions on singleton model

    @classmethod
    def generate_heatmap(cls, model: nn.Module, input_tensor: torch.Tensor, class_idx: int, original_image: Image.Image) -> str:
        """
        Calculates the Grad-CAM heatmap for the specified class index,
        applies CV2 JET colormap, and returns a Base64 encoded PNG.
        """
        # Select target layer: the final conv layer of features in MobileNetV2
        # In torchvision MobileNetV2, backbone.features is a Sequential block, layer 18 is the last Conv2dNormActivation layer
        try:
            target_layer = model.backbone.features[18]
        except Exception as e:
            logger_error.error(f"Failed to resolve MobileNetV2 target feature layer: {str(e)}")
            # Fallback to the whole features sequential block
            target_layer = model.backbone.features
            
        gradients = []
        activations = []

        def save_gradient(module, grad_input, grad_output):
            gradients.append(grad_output[0].detach())

        def save_activation(module, input, output):
            activations.append(output.detach())

        # Register hooks under a thread lock to ensure safety
        with cls._lock:
            h1 = target_layer.register_forward_hook(save_activation)
            
            if hasattr(target_layer, "register_full_backward_hook"):
                h2 = target_layer.register_full_backward_hook(save_gradient)
            else:
                h2 = target_layer.register_backward_hook(save_gradient)
                
            try:
                # Enable gradients explicitly for Grad-CAM backpropagation
                with torch.enable_grad():
                    input_tensor = input_tensor.clone().requires_grad_(True)
                    model.zero_grad()
                    output = model(input_tensor)
                    
                    if class_idx is None:
                        class_idx = int(output.argmax(dim=1).item())
                        
                    score = output[0, class_idx]
                    score.backward()
                    
                # Clean up hooks immediately
                h1.remove()
                h2.remove()
                
                if not gradients or not activations:
                    raise ModelInferenceException("Failed to capture gradients or activations for Grad-CAM.")
                    
                # Compute weighted combination
                grads = gradients[0].cpu().numpy()[0]          # Shape: [C, H, W]
                acts = activations[0].cpu().numpy()[0]          # Shape: [C, H, W]
                
                # Global average pooling of gradients
                weights = np.mean(grads, axis=(1, 2))           # Shape: [C]
                
                # Weighted activation map
                cam = np.zeros(acts.shape[1:], dtype=np.float32)
                for i, w in enumerate(weights):
                    cam += w * acts[i, :, :]
                    
                # ReLU and Normalization
                cam = np.maximum(cam, 0)
                cam_max = np.max(cam)
                if cam_max > 0:
                    cam = cam / cam_max
                    
                # Resize to original image size
                width, height = original_image.size
                cam_resized = cv2.resize(cam, (width, height))
                
                # Convert to color map
                heatmap = np.uint8(255 * cam_resized)
                color_heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
                
                # Convert BGR to RGB
                color_heatmap_rgb = cv2.cvtColor(color_heatmap, cv2.COLOR_BGR2RGB)
                
                # Write to PNG and Base64 encode
                pil_heatmap = Image.fromarray(color_heatmap_rgb)
                
                buffered = io.BytesIO()
                # Use PNG for alpha channel transparency support on frontend if needed
                pil_heatmap.save(buffered, format="PNG")
                img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
                
                logger_prediction.info(f"Grad-CAM heatmap generated successfully for class index {class_idx}.")
                return f"data:image/png;base64,{img_str}"
                
            except Exception as e:
                # Make sure hooks are removed even in failure scenarios
                h1.remove()
                h2.remove()
                logger_error.error(f"Failed to compute Grad-CAM backprop: {str(e)}")
                raise ModelInferenceException(f"Error generating explainable AI heatmap: {str(e)}")
        
        # Fallback empty transparency
        return ""
