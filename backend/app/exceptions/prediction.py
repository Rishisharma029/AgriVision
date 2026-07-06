from fastapi import HTTPException, status

class PredictionException(HTTPException):
    def __init__(self, detail: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        super().__init__(status_code=status_code, detail=detail)

class InvalidImageException(PredictionException):
    def __init__(self, detail: str = "Invalid image file provided."):
        super().__init__(detail=detail, status_code=status.HTTP_400_BAD_REQUEST)

class LeafNotDetectedException(PredictionException):
    def __init__(self, detail: str = "No crop leaf detected in the provided image. Please upload a clear photo of a crop leaf."):
        super().__init__(detail=detail, status_code=status.HTTP_400_BAD_REQUEST)

class LowConfidenceException(PredictionException):
    def __init__(self, detail: str = "The model predicted a disease with very low confidence. Unable to confirm diagnosis."):
        super().__init__(detail=detail, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
