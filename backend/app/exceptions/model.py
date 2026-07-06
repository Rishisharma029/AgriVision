from fastapi import HTTPException, status

class ModelException(HTTPException):
    def __init__(self, detail: str, status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR):
        super().__init__(status_code=status_code, detail=detail)

class ModelNotFoundException(ModelException):
    def __init__(self, detail: str = "Requested CNN model weights or structure could not be found."):
        super().__init__(detail=detail, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChecksumMismatchException(ModelException):
    def __init__(self, detail: str = "Model integrity check failed: Checksum mismatch."):
        super().__init__(detail=detail, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ModelInferenceException(ModelException):
    def __init__(self, detail: str = "An error occurred during CNN forward pass or backward grad computation."):
        super().__init__(detail=detail, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
