# LeafSense AI – Security Architecture Specification (v1.0)

LeafSense AI prioritizes safety against malicious uploads, denial-of-service attempts, and data corruption.

---

## 1. Image Validation Pipeline

Upload endpoints enforce a strict validation sequence to avoid running deep inference or loading malicious payloads:

```text
Request ──> Size Check (<5MB) ──> Magic Bytes (JPEG/PNG/WEBP) ──> Pillow Verify ──> HSV Foliage Check
```

### Stage 1: File Size Check
Blocks uploads exceeding `5MB` directly in FastAPI memory to prevent heap exhaustion.

### Stage 2: Magic Byte Signature Check
We inspect the first 12 bytes of the file stream to verify file type signatures (MIME headers can be easily spoofed):
- **JPEG**: Starts with `FF D8 FF`
- **PNG**: Starts with `89 50 4E 47 0D 0A 1A 0A`
- **WEBP**: Starts with `52 49 46 46` (RIFF) and `57 41 56 45` / `57 45 42 50` (WEBP)

### Stage 3: Pillow Image Integrity Decode
Calls `Image.open(io.BytesIO(file_bytes)).verify()` to verify the file structure is not corrupted or malformed.

### Stage 4: HSV Foliage Heuristics
To prevent users from uploading photos of cars, faces, or text, we run a color check in HSV space:
1. Convert the image from BGR to HSV color space.
2. Define green/yellow/brown pixel ranges:
   - **Green range**: $[35, 40, 40]$ to $[85, 255, 255]$
   - **Yellow/Brown range**: $[10, 40, 40]$ to $[30, 255, 255]$
3. Calculate the percentage of pixels falling in these ranges:
   \[\text{Foliage Ratio} = \frac{\text{Green Pixels} + \text{Brown Pixels}}{\text{Total Pixels}}\]
4. **Threshold**: If $\text{Foliage Ratio} < 0.08$ (less than 8% of the image contains plant foliage), the upload is rejected.

---

## 2. API Security

- **CORS**: Origins are restricted to trusted domains in the production settings.
- **Request Tracing**: All API responses contain the tracing header `X-Request-ID`.
- **Input Sanitization**: Database inputs are sanitized using SQLAlchemy parameter bindings, preventing SQL injection vulnerabilities.
