Backend (Spring Boot)

- Run with Maven: `mvn spring-boot:run` (from backend/)
- Exposes `POST /api/upload` which accepts multipart form `file` and returns JSON.
- Replace placeholder logic in `UploadController` to forward audio to ML service (http://ml_service:8000/predict).
