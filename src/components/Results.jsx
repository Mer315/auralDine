import React from 'react'

const cuisineMap = {
  Malayalam: ['Appam', 'Puttu', 'Avial'],
  Punjabi: ['Butter Chicken', 'Amritsari Kulcha'],
  Telugu: ['Pesarattu', 'Gongura Pachadi'],
  Hindi: ['Chole Bhature', 'Dal Makhani'],
  Tamil: ['Dosa', 'Idli', 'Sambar'],
}

export default function Results({ result, loading }) {
  if (loading) return <div className="card">Processing audio... please wait.</div>
  if (!result) return <div className="card">No prediction yet. Record or upload an audio sample.</div>

  const l1 = result.predicted_l1
  const scores = result.scores || {}
  const cuisines = cuisineMap[l1] || ['Indian Thali']

  return (
    <div className="card results-card">
      <h2>Prediction</h2>
      <p>
        <strong>Predicted L1:</strong> {l1} <small>({result.model_used || 'N/A'} — {result.level})</small>
      </p>

      <h3>Confidence scores</h3>
      <ul className="scores">
        {Object.entries(scores).map(([k, v]) => (
          <li key={k}>{k}: {(v * 100).toFixed(1)}%</li>
        ))}
      </ul>

      <h3>Recommended dishes (based on accent)</h3>
      <div className="cuisines">
        {cuisines.map((d) => (
          <div key={d} className="dish">
            <div className="dish-name">{d}</div>
            <div className="dish-desc">A tasty {d} option related to {l1} region.</div>
          </div>
        ))}
      </div>

      <div className="notes">
        <small>Note: cuisine mapping is illustrative. For production, tune mapping and provide images/links.</small>
      </div>
    </div>
  )
}
