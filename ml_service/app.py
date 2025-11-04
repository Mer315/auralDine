from fastapi import FastAPI, UploadFile, File
from typing import List

app = FastAPI(title="auralDine ML Service")

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    # Placeholder: load model and run inference
    # You can implement model loading in `predict.py` and call it here.
    return {
        "accent": "Telugu-English",
        "confidence": 0.92,
        "recommendations": ["Pesarattu", "Pulihora"]
    }
