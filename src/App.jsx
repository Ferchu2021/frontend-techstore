import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [backendStatus, setBackendStatus] = useState('No probado')
  const [backendResponse, setBackendResponse] = useState('')

  // Función para probar la conectividad con el backend en producción
  const testBackendConnection = async () => {
    setBackendStatus('Probando...')
    setBackendResponse('')
    
    try {
      // URL del backend en producción
      const response = await fetch('https://backend-techstore.vercel.app/api/producto', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      })
      
      if (response.ok) {
        const data = await response.json()
        setBackendStatus('✅ Conectado')
        setBackendResponse(`Status: ${response.status}\nProductos: ${data.data ? data.data.length : 0}`)
      } else {
        setBackendStatus('❌ Error HTTP')
        setBackendResponse(`Error ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setBackendStatus('❌ Error de conexión')
      setBackendResponse(`Error: ${error.message}`)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TechStore - Prueba de Producción</h1>
      
      {/* Sección de prueba del backend */}
      <div className="card">
        <h3>Estado del Backend: {backendStatus}</h3>
        <button onClick={testBackendConnection} style={{ marginBottom: '10px' }}>
          Probar Conexión Backend (Producción)
        </button>
        
        {backendResponse && (
          <div style={{ 
            textAlign: 'left', 
            backgroundColor: '#f0f0f0', 
            padding: '10px', 
            borderRadius: '5px',
            marginTop: '10px',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
            <strong>Respuesta:</strong><br/>
            {backendResponse}
          </div>
        )}
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
