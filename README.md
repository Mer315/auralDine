# auralDine

AuralDine is an AI speech analytics system that detects a speaker's native language from their English accent and recommends regional cuisines reflecting their cultural roots. Powered by HuBERT and personalization, it bridges language and flavor — helping diners find the taste of home.

## Project Structure

```
auralDine/
├── frontend/          # React app (port 3000)
├── backend/           # Spring Boot API (port 8080)
├── ml_service/        # FastAPI ML service (port 5000)
└── docker-compose.yml # Docker orchestration
```

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Java 17+ (for local backend development)
- Python 3.11+ (for local ML service development)

## Quick Start with Docker

1. **Build and run all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/health
   - ML Service: http://localhost:5000

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Local Development

### Frontend (React)

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

Or with Maven installed:
```bash
cd backend
mvn spring-boot:run
```

### ML Service (FastAPI)

```bash
cd ml_service
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

## API Endpoints

### Backend API
- `POST /api/upload` - Upload audio file for analysis
- `GET /api/health` - Health check

### ML Service
- `POST /predict` - Predict accent from audio file
- `GET /` - Service status

## How It Works

1. User uploads an audio file through the React frontend
2. Frontend sends the file to the Spring Boot backend (`/api/upload`)
3. Backend forwards the file to the FastAPI ML service (`/predict`)
4. ML service returns predicted accent and recommended cuisines
5. Results are displayed in the frontend

## Features

- 🎵 Audio file upload interface
- 🌍 Accent detection (currently returns dummy data)
- 🍽️ Cuisine recommendations based on accent
- 🐳 Docker containerization for easy deployment
- 🔄 Microservices architecture

## Technology Stack

- **Frontend**: React 18, Axios, CSS3
- **Backend**: Spring Boot 3.1.5, Java 17
- **ML Service**: FastAPI, Python 3.11
- **Containerization**: Docker, Docker Compose

## Future Enhancements

- Integrate real ML model (HuBERT) for accent detection
- Add user authentication
- Store analysis history
- Expand cuisine database
- Add restaurant recommendations
