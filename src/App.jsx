import React, { useState } from 'react'
import Recorder from './components/Recorder'
import Results from './components/Results'

export default function App() {
  const [audioFile, setAudioFile] = useState(null)
  const [model, setModel] = useState('MFCC')
  const [level, setLevel] = useState('sentence')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function sendForPrediction(file) {
    setLoading(true)
    setResult(null)
    try {
      const form = new FormData()
      form.append('audio', file)
      form.append('model', model)
      form.append('level', level)

      const res = await fetch('/api/predict', {
        method: 'POST',
        body: form,
      })

      if (!res.ok) throw new Error('No backend')

      const json = await res.json()
      setResult(json)
    } catch (err) {
      // Fallback simulated prediction when backend not available
      console.warn('Prediction API not reachable, using simulated result:', err.message)
      // Simulate some plausible output
      const simulated = {
        predicted_l1: Math.random() > 0.5 ? 'Telugu' : 'Hindi',
        scores: { Telugu: 0.62, Hindi: 0.34, Tamil: 0.04 },
        model_used: model,
        level: level,
      }
      // small delay to simulate network
      await new Promise((r) => setTimeout(r, 800))
      setResult(simulated)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-root">
      <header>
        <h1>Native Language Identification — Accent Demo</h1>
        <p className="sub">Record or upload English speech (Indian speakers). Select features and get cuisine suggestions based on predicted L1.</p>
      </header>

      <main>
        <section className="controls">
          <div className="control-row">
            <label>Feature:</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option>MFCC</option>
              <option>HuBERT</option>
            </select>

            <label>Speech level:</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="word">word</option>
              <option value="sentence">sentence</option>
            </select>

            <button
              className="info"
              onClick={() => alert('Tip: Use MFCC for a lightweight baseline. HuBERT provides richer embeddings (requires a backend).')}
            >
              ?
            </button>
          </div>

          <Recorder
            onFileReady={(file) => {
              setAudioFile(file)
            }}
            onSend={sendForPrediction}
            audioFile={audioFile}
            loading={loading}
          />
        </section>

        <section className="results">
          <Results result={result} loading={loading} />
        </section>
      </main>

      <footer>
        <small>Built for the NLI project — IndicAccentDb demo frontend. Backend endpoint: POST /api/predict (form-data: audio, model, level)</small>
      </footer>
    </div>
  )
}
