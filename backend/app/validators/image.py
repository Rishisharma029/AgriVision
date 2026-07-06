import io
import cv2
import numpy as np
from PIL import Image
from typing import Tuple
from ..core.constants import MAGIC_BYTES_HEADERS, MIN_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION
from ..exceptions.prediction import InvalidImageException, LeafNotDetectedException
from ..core.logging_config import logger_security, logger_error

class ImageValidator:
    @staticmethod
    def validate_magic_bytes(file_bytes: bytes) -> str:
        """Inspects file headers to assert they match jpeg, png, or webp magic signatures."""
        if len(file_bytes) < 12:
            logger_security.warning("Upload rejected: File payload too short.")
            raise InvalidImageException("File payload is too small to be an image.")
            
        # Check standard headers
        for mime_type, signatures in MAGIC_BYTES_HEADERS.items():
            for sig in signatures:
                if file_bytes.startswith(sig):
                    return mime_type
                    
        # WebP check (RIFF header + WEBP identifier)
        if file_bytes.startswith(b"RIFF") and file_bytes[8:12] == b"WEBP":
            return "image/webp"
            
        logger_security.warning("Upload rejected: Invalid magic bytes header.")
        raise InvalidImageException("Unsupported image format. Only JPEG, PNG, and WebP are allowed.")

    @staticmethod
    def verify_image_integrity(file_bytes: bytes) -> Tuple[int, int]:
        """Tries to open image with Pillow to assert it is uncorrupted and within dimension limits."""
        try:
            img = Image.open(io.BytesIO(file_bytes))
            img.verify()
            
            # Reopen for size/dimensions check as verify() closes the file handles
            img = Image.open(io.BytesIO(file_bytes))
            width, height = img.size
            
            if width < MIN_IMAGE_DIMENSION or height < MIN_IMAGE_DIMENSION:
                raise InvalidImageException(
                    f"Image dimensions are too small ({width}x{height}). Minimum required size is {MIN_IMAGE_DIMENSION}x{MIN_IMAGE_DIMENSION}px."
                )
            if width > MAX_IMAGE_DIMENSION or height > MAX_IMAGE_DIMENSION:
                raise InvalidImageException(
                    f"Image dimensions exceed maximum limits ({width}x{height}). Maximum allowed size is {MAX_IMAGE_DIMENSION}x{MAX_IMAGE_DIMENSION}px."
                )
                
            return width, height
        except Exception as e:
            if isinstance(e, InvalidImageException):
                raise e
            logger_error.error(f"Pillow verification error: {str(e)}")
            raise InvalidImageException("Image file appears to be corrupted or invalid.")

    @classmethod
    def detect_leaf_heuristic(cls, file_bytes: bytes) -> bool:
        """
        Analyzes the image with OpenCV to check if it contains typical foliage color distributions
        (healthy greens or diseased yellows/browns) to ensure it is actually a leaf.
        """
        try:
            # Decode file bytes to OpenCV format
            nparr = np.frombuffer(file_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if img is None:
                raise InvalidImageException("Failed to decode image bytes into OpenCV format.")
                
            # Convert to HSV color space
            hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
            
            # Green foliage range (Hue: 35-85, Saturation: 30-255, Value: 30-255)
            lower_green = np.array([35, 30, 30])
            upper_green = np.array([85, 255, 255])
            
            # Yellow/Brown diseased range (Hue: 10-35, Saturation: 25-255, Value: 25-255)
            lower_yellow_brown = np.array([10, 25, 25])
            upper_yellow_brown = np.array([35, 255, 255])
            
            # Create masks
            green_mask = cv2.inRange(hsv, lower_green, upper_green)
            yellow_brown_mask = cv2.inRange(hsv, lower_yellow_brown, upper_yellow_brown)
            
            # Calculate pixel ratios
            total_pixels = img.shape[0] * img.shape[1]
            green_pixels = cv2.countNonZero(green_mask)
            yellow_brown_pixels = cv2.countNonZero(yellow_brown_mask)
            
            foliage_ratio = (green_pixels + yellow_brown_pixels) / total_pixels
            
            # Log the Heuristic metrics
            logger_security.info(f"Foliage check results: Green={green_pixels/total_pixels:.2%}, Yellow/Brown={yellow_brown_pixels/total_pixels:.2%}, Combined={foliage_ratio:.2%}")
            
            # Assert a minimum of 8% leaf-like color profile in the image
            if foliage_ratio < 0.08:
                logger_security.warning(f"Foliage check failed: COMBINED={foliage_ratio:.2%} (< 8%). Non-leaf rejected.")
                raise LeafNotDetectedException()
                
            return True
        except Exception as e:
            if isinstance(e, LeafNotDetectedException) or isinstance(e, InvalidImageException):
                raise e
            logger_error.error(f"Error in OpenCV leaf detector heuristic: {str(e)}")
            # Fail-safe to avoid blocking users if color spaces fail unexpectedly
            return True
