# Placeholder for model load and predict utilities
# Implement HuBERT feature extraction and model inference here.

_model = None

def load_model(path: str):
    global _model
    # load your PyTorch model
    _model = "loaded"  # replace with actual loading
    return _model


def infer(audio_bytes: bytes):
    # convert bytes -> waveform -> features -> model
    # return dict with keys: accent, confidence, recommendations
    return {
        "accent": "Tamil-English",
        "confidence": 0.9,
        "recommendations": ["Idli", "Sambar"]
    }
