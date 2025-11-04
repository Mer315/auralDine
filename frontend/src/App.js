import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      setError('Please select an audio file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      setError('Error uploading file: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎵 AuralDine</h1>
        <p>Discover cuisines that match your accent</p>
      </header>

      <main className="App-main">
        <div className="upload-section">
          <h2>Upload Audio File</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <button type="submit" disabled={loading} className="upload-button">
              {loading ? 'Processing...' : 'Upload & Analyze'}
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result-section">
            <h2>Results</h2>
            <div className="result-content">
              <div className="result-item">
                <strong>Detected Accent:</strong>
                <p className="accent">{result.accent}</p>
              </div>
              <div className="result-item">
                <strong>Confidence:</strong>
                <p>{(result.confidence * 100).toFixed(0)}%</p>
              </div>
              <div className="result-item">
                <strong>Recommended Cuisines:</strong>
                <ul className="cuisine-list">
                  {result.cuisines.map((cuisine, index) => (
                    <li key={index}>{cuisine}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
