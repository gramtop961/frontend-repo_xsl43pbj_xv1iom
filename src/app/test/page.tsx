'use client'

import { useState, useEffect } from 'react'

export default function TestPage() {
  const [status, setStatus] = useState('checking...')
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
      const response = await fetch(`${backendUrl}/api/hello`)
      const data = await response.json()
      setStatus('✅ Connected')
      setMessage(data.message)
    } catch (error) {
      setStatus('❌ Not Connected')
      setMessage('Backend is not reachable')
    }
  }

  return (
    <div>
      <h1>Backend Connection Test</h1>
      <p>Status: {status}</p>
      <p>Message: {message}</p>
      <button onClick={checkConnection}>Test Again</button>
    </div>
  )
}