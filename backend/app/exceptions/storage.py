from fastapi import HTTPException, status

class StorageException(HTTPException):
    def __init__(self, detail: str, status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR):
        super().__init__(status_code=status_code, detail=detail)

class FileTooLargeException(StorageException):
    def __init__(self, detail: str = "Uploaded file exceeds the maximum allowed size."):
        super().__init__(detail=detail, status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)

class StorageWriteException(StorageException):
    def __init__(self, detail: str = "Failed to save the image to disk."):
        super().__init__(detail=detail, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
