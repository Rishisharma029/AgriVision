from fastapi import status
from fastapi.testclient import TestClient

def test_health_status(client: TestClient):
    """Verifies system health status endpoint pings database and registries successfully."""
    response = client.get("/api/v1/health/status")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] in ("healthy", "degraded")
    assert "database" in data
    assert data["database"]["connection"] == "online"
    assert data["database"]["knowledge_seeded"] is True

def test_list_crops(client: TestClient):
    """Verifies crop encyclopedia list routes."""
    response = client.get("/api/v1/crops")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "Tomato" in data
    assert "Potato" in data
    assert data["Tomato"]["growing_temp"] != ""

def test_get_crop_details(client: TestClient):
    """Verifies individual crop specifications queries."""
    response = client.get("/api/v1/crops/Potato")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "soil" in data
    assert "tuberosum" in data["description"] or "tuberous" in data["description"]

def test_get_nonexistent_crop(client: TestClient):
    """Verifies 404 error triggers for missing crops."""
    response = client.get("/api/v1/crops/Mango")
    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_list_diseases(client: TestClient):
    """Verifies disease catalog matches standard schema rules."""
    response = client.get("/api/v1/diseases")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) > 0
    # Assert fields are correctly populated
    assert "crop" in data[0]
    assert "condition" in data[0]
    assert "organic_treatments" in data[0]

def test_image_validation_empty_upload(client: TestClient):
    """Verifies empty image payload throws bad request exception."""
    files = {"file": ("empty.jpg", b"", "image/jpeg")}
    response = client.post("/api/v1/prediction/detect", files=files)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "small" in response.json()["message"].lower()

def test_image_validation_invalid_type(client: TestClient):
    """Verifies invalid format uploads (like text files) are blocked by magic bytes."""
    files = {"file": ("document.txt", b"Hello World " * 20, "text/plain")}
    response = client.post("/api/v1/prediction/detect", files=files)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "format" in response.json()["message"].lower()
