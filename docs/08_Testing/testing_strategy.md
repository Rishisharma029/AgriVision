# LeafSense AI – Testing Strategy & Specification (v1.0)

Quality assurance spans React vitests, backend pytest coverage on transactional SQLite fixtures, and ML validation checks.

---

## 1. Backend Testing Framework (`pytest`)

All backend tests are run inside isolated transactions on an in-memory SQLite engine to keep development database files clean.

### Test Database Override (`conftest.py`)
We override FastAPI's `get_db` session dependency globally within the test environment:

```python
@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
```

- **Transactional Rollback**: Each test runs inside a nested transaction that is rolled back upon test completion, ensuring a pristine state for the next test execution.
- **Auto-Seeding**: The test database runs seed procedures on session startup, so crop profiles are populated before tests commence.

---

## 2. API End-to-End Tests (`test_api.py`)

- **test_health_status**: Confirms the health status endpoint queries both the SQLite system database and Model Registry.
- **test_list_crops**: Verifies that the database successfully lists the crop encyclopedia.
- **test_image_validation_empty_upload**: Validates that 0-byte image files are blocked with a `400 Bad Request` payload error.
- **test_image_validation_invalid_type**: Asserts that text files (e.g. 240 bytes of repeating characters) bypass the size limit check but are caught by the magic bytes validation filter.

---

## 3. Running the Test Suite

Run the tests inside the `backend` directory using:
```bash
cd backend
python -m pytest -v
```
The test execution logs show individual test passes and capture stdout logs including model warming timelines.
