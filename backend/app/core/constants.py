# Magic Bytes headers for allowed image formats
MAGIC_BYTES_HEADERS = {
    "image/jpeg": [b"\xff\xd8\xff"],
    "image/png": [b"\x89PNG\r\n\x1a\n"],
    "image/webp": [b"RIFF"]  # WEBP requires checking 'WEBP' at offset 8, handled in validators
}

# Image Dimension constraints
MIN_IMAGE_DIMENSION = 128
MAX_IMAGE_DIMENSION = 4096

# Model Performance telemetries
INF_VERSION = "1.0"
SYSTEM_ID = "leafsense-prediction-engine-01"

# Calibrated classification classes
CROP_DISEASES = [
    # Format: (Crop, Condition, Index)
    ("Apple", "Scab", 0),
    ("Apple", "Black Rot", 1),
    ("Apple", "Cedar Rust", 2),
    ("Apple", "Healthy", 3),
    
    ("Corn", "Common Rust", 4),
    ("Corn", "Gray Leaf Spot", 5),
    ("Corn", "Northern Leaf Blight", 6),
    ("Corn", "Healthy", 7),
    
    ("Potato", "Early Blight", 8),
    ("Potato", "Late Blight", 9),
    ("Potato", "Healthy", 10),
    
    ("Tomato", "Bacterial Spot", 11),
    ("Tomato", "Early Blight", 12),
    ("Tomato", "Late Blight", 13),
    ("Tomato", "Leaf Mold", 14),
    ("Tomato", "Septoria Leaf Spot", 15),
    ("Tomato", "Spider Mites", 16),
    ("Tomato", "Target Spot", 17),
    ("Tomato", "Yellow Leaf Curl Virus", 18),
    ("Tomato", "Mosaic Virus", 19),
    ("Tomato", "Healthy", 20),
    
    ("Grape", "Black Rot", 21),
    ("Grape", "Esca (Black Measles)", 22),
    ("Grape", "Leaf Blight", 23),
    ("Grape", "Healthy", 24),
    
    ("Rice", "Brown Spot", 25),
    ("Rice", "Hispa", 26),
    ("Rice", "Leaf Blast", 27),
    ("Rice", "Healthy", 28)
]
