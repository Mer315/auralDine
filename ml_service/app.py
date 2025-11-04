from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ML Service is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict accent and recommend cuisines based on audio file.
    Returns dummy data for now.
    """
    # Read file (for future processing)
    contents = await file.read()
    
    # Return dummy accent and cuisines
    return {
        "accent": "Indian",
        "cuisines": [
            "Indian Cuisine",
            "Pakistani Cuisine",
            "Bangladeshi Cuisine"
        ],
        "confidence": 0.87,
        "filename": file.filename
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
