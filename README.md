# React NLI Frontend (Accent → Cuisine Demo)

This lightweight React frontend is a demo UI for the Native Language Identification (NLI) project focused on Indian accents.

What it provides

- Record audio via the browser or upload an audio file
- Choose feature type (MFCC or HuBERT) and speech level (word/sentence)
- Send audio to a backend endpoint `POST /api/predict` (form-data: audio, model, level)
- Fallback simulated prediction if no backend available
- Show predicted L1 and recommend regional dishes (illustrative mapping)

How to run (Windows cmd)

1. Open a terminal at this folder:

   cd c:\Users\91879\OneDrive\Desktop\react-frontend

2. Install dependencies:

   npm install

3. Start dev server:

   npm run dev

4. Open the URL printed by Vite (usually http://localhost:5173)

Backend integration

- The frontend will POST to `/api/predict` with form-data fields:
  - `audio`: audio file (File)
  - `model`: string (MFCC or HuBERT)
  - `level`: string (word or sentence)

- Expected JSON response shape (example):
  {
    "predicted_l1": "Telugu",
    "scores": { "Telugu": 0.62, "Hindi": 0.34 },
    "model_used": "HuBERT",
    "level": "sentence"
  }

Notes & next steps

- Currently the app simulates predictions if no backend is reachable. Implement a backend service to run MFCC/HuBERT pipelines and return predictions.
- You can add images for dishes in `public/` and extend `cuisineMap` in `src/components/Results.jsx`.
- For production, transcode/normalize uploaded audio server-side (16 kHz, mono) before feature extraction.

