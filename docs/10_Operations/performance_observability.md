# LeafSense AI – Performance & Observability (v1.0)

LeafSense AI maintains performance latencies and records structured diagnostics for operations monitoring.

---

## 1. Latency Budgets & SLA Targets

We target the following execution latency limits:

| Stage | Target Duration | Description |
|---|---|---|
| **Foliage Validation** | $< 50\text{ ms}$ | Magic bytes verification and HSV pixel ratios. |
| **CNN Model Inference** | $< 150\text{ ms}$ | MobileNetV2 forward pass. |
| **Grad-CAM Generation** | $< 100\text{ ms}$ | Target hook gradients and colormap blending. |
| **Total API Pipeline** | $< 350\text{ ms}$ | Core execution loop (excluding network transit). |

---

## 2. Telemetry & Metrics Collection

We track live metrics through `metrics_collector`:
- **Prediction Counter**: Tallies predictions grouped by crop type and disease condition.
- **Failure Counter**: Tallies occurrences of prediction exceptions.
- **Inference Latency Tracker**: Computes rolling averages of MobileNetV2 execution times.

Access metrics via:
`GET /api/v1/health/metrics`

---

## 3. Loguru Log Parsing Patterns

Logs are printed as structured lines and routed to `/logs/api.log`, `/logs/prediction.log`, etc.
Example Loguru line:
`2026-07-07 02:04:31.436 | INFO | app.api.v1.prediction:detect_crop_disease:23 - [Req: 1d63cb9a-0e05-4afd-b72d-b017470c5acb] - Received prediction request`

### Log Fields
- **time**: ISO timestamp of the log event.
- **level**: Log level (INFO, WARNING, ERROR, CRITICAL).
- **location**: `module:function:line_number` indicating code file source.
- **request_id**: UUID tracking correlation.
- **message**: Log summary text.
