import { useState, useEffect } from 'react'
import { API_BASE_URL, APP_NAME, APP_VERSION } from './constants'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState('Checking...')

  useEffect(() => {
    // Test API connection - thử nhiều endpoints
    const testEndpoints = [
      `${API_BASE_URL}/health`,
      `${API_BASE_URL}/`,
      `https://fsidds.onrender.com/`,
      `https://fsidds.onrender.com/api`
    ]

    Promise.allSettled(
      testEndpoints.map(url => 
        fetch(url).then(res => ({ url, status: res.status, ok: res.ok }))
      )
    ).then(results => {
      const working = results.find(r => r.status === 'fulfilled' && r.value.ok)
      if (working) {
        setApiStatus(`✅ Connected to ${working.value.url}`)
      } else {
        setApiStatus('❌ All endpoints failed')
      }
    }).catch(() => {
      setApiStatus('❌ Connection error')
    })
  }, [])

  return (
    <>
      <div>
        <h1>{APP_NAME} - React Frontend</h1>
        <p>Version: {APP_VERSION}</p>
        <p>API URL: {API_BASE_URL}</p>
        <p>API Status: {apiStatus}</p>
        <p>Frontend URL: https://khaidz34.github.io/fsidds/</p>
        <p>🚀 Deployed successfully!</p>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App