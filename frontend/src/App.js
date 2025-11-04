import React, { useState } from 'react';

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h2>auralDine — Accent→Cuisine (dev)</h2>
      <form onSubmit={submit}>
        <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" disabled={!file || loading} style={{ marginLeft: 10 }}>Send</button>
      </form>

      {loading && <p>Detecting accent…</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          {result.error && <div style={{ color: 'red' }}>{result.error}</div>}
          {result.accent && <div><strong>Accent:</strong> {result.accent} ({result.confidence})</div>}
          {result.recommendations && (
            <div>
              <strong>Recommended: </strong>
              {result.recommendations.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
