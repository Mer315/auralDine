import React, { useEffect, useRef, useState } from 'react'

// Recorder: records via MediaRecorder and allows file upload.
export default function Recorder({ onFileReady, onSend, audioFile, loading }) {
  const [recState, setRecState] = useState('idle') // idle, recording, done
  const [blobUrl, setBlobUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [blobUrl])

  async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Microphone not supported in this browser')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      chunksRef.current = []

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setBlobUrl(url)
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' })
        onFileReady(file)
        setRecState('done')
      }

      mr.start()
      setRecState('recording')
    } catch (err) {
      console.error(err)
      alert('Could not start recording: ' + err.message)
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      const tracks = mediaRecorderRef.current.stream?.getTracks() || []
      tracks.forEach((t) => t.stop())
    }
  }

  function handleFileUpload(e) {
    const f = e.target.files?.[0]
    if (!f) return
    onFileReady(f)
    setBlobUrl(URL.createObjectURL(f))
    setRecState('done')
  }

  return (
    <div className="recorder">
      <div className="rec-controls">
        {recState !== 'recording' ? (
          <button onClick={startRecording} className="primary">Start Recording</button>
        ) : (
          <button onClick={stopRecording} className="danger">Stop</button>
        )}

        <input type="file" accept="audio/*" onChange={handleFileUpload} />

        <button
          disabled={!audioFile || loading}
          onClick={() => onSend(audioFile)}
          className="send"
        >
          {loading ? 'Sending...' : 'Send for prediction'}
        </button>
      </div>

      <div className="preview">
        {blobUrl && (
          <>
            <audio src={blobUrl} controls />
            <div className="meta">Recorded audio preview</div>
          </>
        )}
      </div>
    </div>
  )
}
