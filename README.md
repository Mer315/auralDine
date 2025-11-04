# auralDine

Minimal scaffold for an Accent→Cuisine full-stack prototype.

Structure
- `frontend/` — React app (file upload UI)
- `backend/` — Spring Boot API (accepts audio at `/api/upload`)
- `ml_service/` — FastAPI microservice (`POST /predict` placeholder)
- `docker-compose.yml` — compose to bring up all services

Quick start (local, requires Docker):

```powershell
docker-compose build
docker-compose up
```

Then open http://localhost:3000 to try the basic UI. The backend currently returns placeholder predictions; wire the backend to the ML service in `UploadController.java` and implement model inference in `ml_service/predict.py`.
AuralDine is an AI speech analytics system that detects a speaker’s native language from their English accent and recommends regional cuisines reflecting their cultural roots. Powered by HuBERT and personalization, it bridges language and flavor — helping diners find the taste of home.
